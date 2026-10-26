import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { syncLeadWhatsAppLabel } from '@/lib/services/whatsapp-labels';

const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://egmxgdvnxrjlrfajufdf.supabase.co';
const SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  'sb_publishable_O1F3u_HUBtSHmu24N8Up9A_FOcQ083d';
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { leadId, newStage, previousStage } = body;

    if (!leadId || !newStage) {
      return NextResponse.json(
        { success: false, message: 'leadId e newStage são obrigatórios' },
        { status: 400 }
      );
    }

    // 1. Buscar dados do Lead e Tenant
    const { data: lead, error: leadError } = await supabase
      .from('leads')
      .select('id, name, phone, stage, tenant_id')
      .eq('id', leadId)
      .single();

    if (leadError || !lead) {
      return NextResponse.json(
        { success: false, message: 'Lead não encontrado' },
        { status: 404 }
      );
    }

    const prevStage = previousStage || lead.stage;

    // 2. Atualizar o estágio no Supabase
    const { error: updateError } = await supabase
      .from('leads')
      .update({
        stage: newStage,
        last_message_at: new Date().toISOString(),
      })
      .eq('id', leadId);

    if (updateError) {
      console.error('[update-stage] Erro ao atualizar lead no Supabase:', updateError);
      return NextResponse.json(
        { success: false, error: updateError.message },
        { status: 500 }
      );
    }

    // 3. Buscar instância do Tenant para aplicar no WhatsApp Business
    let instance = 'pulso24_oficial';
    if (lead.tenant_id) {
      const { data: tenant } = await supabase
        .from('tenants')
        .select('whatsapp_instance_name')
        .eq('id', lead.tenant_id)
        .single();
      if (tenant?.whatsapp_instance_name) {
        instance = tenant.whatsapp_instance_name;
      }
    }

    // 4. Sincronizar etiqueta no WhatsApp Business de forma assíncrona/segura
    const labelResult = await syncLeadWhatsAppLabel({
      instance,
      phone: lead.phone,
      newStage,
      previousStage: prevStage,
    });

    return NextResponse.json({
      success: true,
      leadId,
      newStage,
      previousStage: prevStage,
      labelResult,
    });
  } catch (error) {
    console.error('[update-stage] Erro inesperado:', error);
    return NextResponse.json(
      { success: false, error: String(error) },
      { status: 500 }
    );
  }
}
