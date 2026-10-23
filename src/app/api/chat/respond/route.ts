import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://egmxgdvnxrjlrfajufdf.supabase.co';
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_O1F3u_HUBtSHmu24N8Up9A_FOcQ083d';
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const EVOLUTION_API_URL = process.env.NEXT_PUBLIC_EVOLUTION_API_URL || 'https://pulso24-evolution-api.xdm0dg.easypanel.host';
const EVOLUTION_API_KEY = process.env.EVOLUTION_API_KEY || '429683C4C977415CAAFCCE10F7D57E11';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const tenantId = body.tenant_id || body.tenantId || '00000000-0000-0000-0000-000000000000';
    const rawPhone = String(body.phone || body.remoteJid || '').trim();
    const phone = rawPhone.replace(/\D/g, '').replace(/^(\d{2})0(\d{8,9})$/, '$1$2'); // remove dígito 0 extra se houver
    const rawName = String(body.name || body.pushName || '').trim();
    const name = rawName && rawName !== 'Cliente' ? rawName : (phone ? `WhatsApp +${phone}` : 'Lead WhatsApp');
    const messageId = body.messageId || body.id || body.keyId || '';
    const instance = body.instance || 'pulso24_oficial';
    const apiKey =
      process.env.OPENAI_API_KEY ||
      body.apiKey ||
      body.api_key ||
      '';

    let userText = String(body.message || body.text || '').trim();
    let isAudio = Boolean(body.isAudio || (messageId && !userText));
    let mediaType: 'text' | 'audio' = isAudio ? 'audio' : 'text';

    if (!phone) {
      return NextResponse.json({ success: false, message: 'Telefone (phone) é obrigatório' }, { status: 400 });
    }

    // 1. Transcrição de Áudio se for áudio
    if (isAudio) {
      let audioBase64 = body.audioBase64 || body.base64 || '';

      // Se não veio base64 direto, busca na Evolution API
      if (!audioBase64 && messageId) {
        try {
          const evoRes = await fetch(`${EVOLUTION_API_URL}/chat/getBase64FromMediaMessage/${instance}`, {
            method: 'POST',
            headers: {
              apikey: EVOLUTION_API_KEY,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              message: { key: { id: messageId } },
              convertToMp4: false,
            }),
          });

          if (evoRes.ok) {
            const evoData = await evoRes.json();
            if (evoData.base64) {
              audioBase64 = evoData.base64;
            }
          }
        } catch (err) {
          console.error('Erro ao buscar base64 na Evolution:', err);
        }
      }

      if (audioBase64) {
        try {
          const cleanBase64 = String(audioBase64).replace(/^data:[^;]+;base64,/, '').trim();
          const buffer = Buffer.from(cleanBase64, 'base64');
          const form = new FormData();
          const blob = new Blob([buffer], { type: 'audio/ogg' });
          form.append('file', blob, 'audio.ogg');
          form.append('model', 'whisper-1');
          form.append('language', 'pt');

          const whisperRes = await fetch('https://api.openai.com/v1/audio/transcriptions', {
            method: 'POST',
            headers: { Authorization: `Bearer ${apiKey}` },
            body: form,
          });

          if (whisperRes.ok) {
            const whisperData = await whisperRes.json();
            userText = whisperData.text || '';
          } else {
            console.error('Whisper error:', await whisperRes.text());
          }
        } catch (err) {
          console.error('Erro no Whisper:', err);
        }
      }
    }

    if (!userText) {
      return NextResponse.json({ success: false, message: 'Nenhuma mensagem recebida ou transcrita' }, { status: 400 });
    }

    // 2. Buscar ou Criar Lead no Supabase
    const { data: existingLeads } = await supabase
      .from('leads')
      .select('id, name, stage, ai_active')
      .eq('tenant_id', tenantId)
      .eq('phone', phone)
      .limit(1);

    let leadId: string;
    let aiActive = true;

    if (existingLeads && existingLeads.length > 0) {
      const existing = existingLeads[0];
      leadId = existing.id;
      aiActive = existing.ai_active;

      const updatePayload: Record<string, unknown> = {
        last_message_at: new Date().toISOString(),
      };
      if (rawName && rawName !== 'Cliente' && (!existing.name || existing.name.startsWith('WhatsApp +'))) {
        updatePayload.name = rawName;
      }
      await supabase.from('leads').update(updatePayload).eq('id', leadId);
    } else {
      const { data: newLead } = await supabase
        .from('leads')
        .insert({
          tenant_id: tenantId,
          name,
          phone,
          stage: 'novo',
          ai_active: true,
          summary: `Contato iniciado via WhatsApp: "${userText.slice(0, 100)}..."`,
          last_message_at: new Date().toISOString(),
        })
        .select('id, ai_active')
        .single();

      if (!newLead) {
        return NextResponse.json({ success: false, message: 'Erro ao registrar lead' }, { status: 500 });
      }
      leadId = newLead.id;
      aiActive = newLead.ai_active;
    }

    // Se o dono pausou a IA para este lead no Painel, salva a mensagem mas NÃO responde
    if (!aiActive) {
      await supabase.from('messages').insert({
        tenant_id: tenantId,
        lead_id: leadId,
        sender_type: 'lead',
        content: userText,
        media_type: mediaType,
      });

      return NextResponse.json({
        success: true,
        ai_active: false,
        reply: null,
        message: 'Modo humano ativo (IA pausada no Painel). Mensagem gravada sem resposta automática.',
      });
    }

    // 3. Buscar Prompt do Robô no Supabase
    const { data: tenantData } = await supabase
      .from('tenants')
      .select('ai_name, ai_system_prompt, niche')
      .eq('id', tenantId)
      .single();

    const aiName = tenantData?.ai_name || 'Bia';
    const basePrompt =
      tenantData?.ai_system_prompt ||
      `Você é a ${aiName}, consultora comercial do Pulso 24. Você atende no WhatsApp de forma leve, humana e objetiva.`;

    // 4. Buscar Histórico de Mensagens Recentes do Lead (MEMÓRIA DE CONTEXTO)
    const { data: historyData } = await supabase
      .from('messages')
      .select('sender_type, content, media_type, created_at')
      .eq('lead_id', leadId)
      .order('created_at', { ascending: false })
      .limit(8);

    const history = (historyData || []).reverse();

    // 5. Montar Instruções Inteligentes (sem "Oi" repetitivo)
    let systemInstructions = basePrompt;

    if (history.length > 0) {
      systemInstructions += `\n\n[INSTRUÇÃO CRÍTICA DE CONTINUIDADE E FORMATO]:
Esta conversa JÁ ESTÁ EM ANDAMENTO com este cliente. As mensagens anteriores estão no histórico acima.
- PROIBIDO começar a mensagem com saudações repetitivas como 'Oi', 'Olá', 'Oi [Nome]', 'Tudo bem?'. Comece direto com a resposta de forma natural (ex: 'Com certeza!', 'Sim, Vinícius!', 'Exatamente!', 'Com relação a isso...').
- NUNCA se reapresente ('Sou a Bia', 'Sou consultora...').
- NUNCA pergunte coisas que o cliente já informou (nome, segmento, etc.).
- ESTRUTURA OBRIGATÓRIA EM PARÁGRAFOS (para envio em bolhas separadas no WhatsApp):
  Pule SEMPRE uma linha em branco entre cada ideia (use 2 a 3 parágrafos curtos):
  1º Bloco: Gancho ou confirmação direta rápida (ex: "Exatamente, Vinícius! 😊")
  2º Bloco: Explicação objetiva da dúvida dele (1 a 2 frases claras).
  3º Bloco: Pergunta única ou convite claro para o próximo passo.`;
    } else {
      systemInstructions += `\n\n[INSTRUÇÃO DE PRIMEIRO CONTATO]:
Este é o primeiro contato do cliente. Acolha com simpatia e dinamismo, apresente-se como ${aiName} do Pulso 24 e pergunte com quem tem o prazer de falar e qual o segmento do negócio.`;
    }

    const messagesPayload = [
      { role: 'system', content: systemInstructions },
      ...history.map((m) => ({
        role: m.sender_type === 'ai' ? ('assistant' as const) : ('user' as const),
        content: m.content,
      })),
      { role: 'user', content: userText },
    ];

    // 6. Chamar OpenAI GPT-4o-mini
    const openAiRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: messagesPayload,
        temperature: 0.7,
        max_tokens: 300,
      }),
    });

    if (!openAiRes.ok) {
      const err = await openAiRes.text();
      console.error('OpenAI Chat error:', openAiRes.status, err);
      return NextResponse.json({ success: false, error: err }, { status: openAiRes.status });
    }

    const openAiData = await openAiRes.json();
    const aiReply = openAiData.choices?.[0]?.message?.content || '';

    // Dividir a resposta em parágrafos para envio humanizado (bolhas separadas)
    const paragraphs = aiReply
      .split(/\n\s*\n/)
      .map((p: string) => p.trim())
      .filter(Boolean);

    // Se solicitado envio direto (sendDirect: true), envia cada parágrafo com delay de digitação
    const sendDirect = body.sendDirect === true;
    if (sendDirect && paragraphs.length > 0) {
      for (let i = 0; i < paragraphs.length; i++) {
        const textChunk = paragraphs[i];
        try {
          await fetch(`${EVOLUTION_API_URL}/message/sendText/${instance}`, {
            method: 'POST',
            headers: {
              apikey: EVOLUTION_API_KEY,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              number: phone,
              text: textChunk,
              delay: 1200,
            }),
          });
        } catch (err) {
          console.error(`Erro ao enviar chunk ${i + 1} para Evolution API:`, err);
        }

        // Intervalo natural de 1.2 segundos entre as mensagens
        if (i < paragraphs.length - 1) {
          await new Promise((r) => setTimeout(r, 1200));
        }
      }
    }

    // 7. Gravar no Supabase (Lead + IA com media_type correto)
    await supabase.from('messages').insert([
      {
        tenant_id: tenantId,
        lead_id: leadId,
        sender_type: 'lead',
        content: userText,
        media_type: mediaType,
      },
      {
        tenant_id: tenantId,
        lead_id: leadId,
        sender_type: 'ai',
        content: aiReply,
        media_type: 'text',
      },
    ]);

    // Atualizar Lead (resumo e estágio)
    const lower = userText.toLowerCase();
    let newStage: string | undefined;
    if (lower.includes('agendar') || lower.includes('reunião') || lower.includes('horário') || lower.includes('demonstração')) {
      newStage = 'agendado';
    } else if (lower.includes('preço') || lower.includes('plano') || lower.includes('quanto custa') || lower.includes('contratar')) {
      newStage = 'qualificado';
    }

    const leadUpdate: Record<string, unknown> = {
      summary: `Último assunto: "${userText.slice(0, 90)}..."`,
      last_message_at: new Date().toISOString(),
    };
    if (newStage) leadUpdate.stage = newStage;
    await supabase.from('leads').update(leadUpdate).eq('id', leadId);

    // 8. Deduzir custo estimado dos tokens em saas_expenses
    try {
      const { data: exp } = await supabase
        .from('saas_expenses')
        .select('id, balance_remaining')
        .eq('category', 'openai')
        .single();

      if (exp && exp.balance_remaining !== null) {
        const cost = isAudio ? 0.005 : 0.0008; // em USD
        const nextBal = Math.max(0, Number(exp.balance_remaining) - cost);
        await supabase.from('saas_expenses').update({ balance_remaining: nextBal }).eq('id', exp.id);
      }
    } catch {
      // ignore
    }

    return NextResponse.json({
      success: true,
      reply: aiReply,
      alreadySent: sendDirect,
      chunks: paragraphs,
      transcription: isAudio ? userText : null,
      mediaType,
      leadId,
      phone,
    });
  } catch (error) {
    console.error('Erro em /api/chat/respond:', error);
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
