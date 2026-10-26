import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { syncLeadWhatsAppLabel } from '@/lib/services/whatsapp-labels';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://egmxgdvnxrjlrfajufdf.supabase.co';
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_O1F3u_HUBtSHmu24N8Up9A_FOcQ083d';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const tenantId = body.tenant_id || '00000000-0000-0000-0000-000000000000';
    const phone = String(body.phone || '').trim().replace(/\D/g, '');
    const rawName = String(body.name || '').trim();
    const name = rawName && rawName !== 'Cliente' ? rawName : (phone ? `WhatsApp +${phone}` : 'Lead WhatsApp');
    const clientMessage = body.client_message || body.clientMessage || '';
    const aiMessage = body.ai_message || body.aiMessage || '';
    const mediaType = body.media_type || body.mediaType || 'text';

    if (!phone) {
      return NextResponse.json({ success: false, message: 'Telefone obrigatório' }, { status: 400 });
    }

    // 1. Verificar se o Lead já existe
    const { data: existingLeads, error: findError } = await supabase
      .from('leads')
      .select('id, name, stage')
      .eq('tenant_id', tenantId)
      .eq('phone', phone)
      .limit(1);

    if (findError) {
      console.error('Erro ao buscar lead:', findError);
    }

    let leadId: string;

    if (existingLeads && existingLeads.length > 0) {
      const existing = existingLeads[0];
      leadId = existing.id;

      const updatePayload: Record<string, unknown> = {
        last_message_at: new Date().toISOString(),
      };

      // Atualiza o nome se antes era genérico e agora veio o nome real
      if (rawName && rawName !== 'Cliente' && (!existing.name || existing.name.startsWith('WhatsApp +'))) {
        updatePayload.name = rawName;
      }

      await supabase
        .from('leads')
        .update(updatePayload)
        .eq('id', leadId);
    } else {
      // 2. Criar novo Lead
      const { data: newLead, error: insertError } = await supabase
        .from('leads')
        .insert({
          tenant_id: tenantId,
          name,
          phone,
          stage: 'novo',
          ai_active: true,
          summary: clientMessage ? `Primeiro contato via WhatsApp: "${clientMessage.slice(0, 120)}..."` : 'Contato iniciado pelo WhatsApp',
          last_message_at: new Date().toISOString(),
        })
        .select('id')
        .single();

      if (insertError || !newLead) {
        console.error('Erro ao criar lead:', insertError);
        return NextResponse.json({ success: false, error: insertError }, { status: 500 });
      }

      leadId = newLead.id;

      // Sincroniza etiqueta inicial "1. Novo Lead" no WhatsApp Business
      syncLeadWhatsAppLabel({
        phone,
        newStage: 'novo',
      }).catch((err) => console.warn('[leads/record] Erro ao sincronizar etiqueta inicial:', err));
    }

    // 3. Registrar Mensagens
    const messagesToInsert = [];

    if (clientMessage) {
      messagesToInsert.push({
        tenant_id: tenantId,
        lead_id: leadId,
        sender_type: 'lead',
        content: String(clientMessage),
        media_type: mediaType,
      });
    }

    if (aiMessage) {
      messagesToInsert.push({
        tenant_id: tenantId,
        lead_id: leadId,
        sender_type: 'ai',
        content: String(aiMessage),
        media_type: 'text',
      });
    }

    if (messagesToInsert.length > 0) {
      const { error: msgError } = await supabase
        .from('messages')
        .insert(messagesToInsert);

      if (msgError) {
        console.error('Erro ao registrar mensagens:', msgError);
      }

      // Se teve resposta da IA, debitar o custo real estimado em tokens (~$0.00025)
      if (aiMessage) {
        try {
          const { data: exp } = await supabase
            .from('saas_expenses')
            .select('id, balance_remaining')
            .eq('category', 'openai')
            .single();

          if (exp && exp.balance_remaining !== null) {
            const newBal = Math.max(0, Number(exp.balance_remaining) - 0.00025);
            await supabase
              .from('saas_expenses')
              .update({ balance_remaining: newBal, updated_at: new Date().toISOString() })
              .eq('id', exp.id);
          }
        } catch (err) {
          console.warn('Erro ao atualizar saldo de tokens da OpenAI:', err);
        }
      }
    }

    return NextResponse.json({
      success: true,
      lead_id: leadId,
      phone,
      tenant_id: tenantId,
    });
  } catch (error) {
    console.error('Erro geral no endpoint /api/leads/record:', error);
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
