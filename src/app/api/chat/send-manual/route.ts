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
    const tenantId = body.tenant_id || '00000000-0000-0000-0000-000000000000';
    const leadId = body.lead_id;
    const phone = String(body.phone || '').trim().replace(/\D/g, '');
    const content = String(body.content || '').trim();
    const instance = body.instance || 'pulso24_oficial';

    if (!leadId || !phone || !content) {
      return NextResponse.json({ success: false, message: 'Dados incompletos (lead_id, phone, content)' }, { status: 400 });
    }

    // 1. Gravar no Supabase
    const { data: savedMsg, error: dbError } = await supabase
      .from('messages')
      .insert({
        tenant_id: tenantId,
        lead_id: leadId,
        sender_type: 'human',
        content,
        media_type: 'text',
      })
      .select()
      .single();

    if (dbError) {
      console.error('Erro ao salvar mensagem manual no banco:', dbError);
    }

    // 2. Disparar no WhatsApp via Evolution API
    let whatsappSent = false;
    try {
      const evoRes = await fetch(`${EVOLUTION_API_URL}/message/sendText/${instance}`, {
        method: 'POST',
        headers: {
          apikey: EVOLUTION_API_KEY,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          number: phone,
          text: content,
          delay: 500,
        }),
      });

      if (evoRes.ok) {
        whatsappSent = true;
      } else {
        console.error('Erro Evolution API sendText manual:', evoRes.status, await evoRes.text());
      }
    } catch (evoErr) {
      console.error('Falha na requisição Evolution sendText manual:', evoErr);
    }

    // 3. Atualizar last_message_at no lead
    await supabase
      .from('leads')
      .update({ last_message_at: new Date().toISOString() })
      .eq('id', leadId);

    return NextResponse.json({
      success: true,
      whatsappSent,
      message: savedMsg,
    });
  } catch (error) {
    console.error('Erro em /api/chat/send-manual:', error);
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
