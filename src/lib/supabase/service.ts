import { createClient } from './client';

export interface Tenant {
  id: string;
  name: string;
  owner_name?: string | null;
  owner_phone?: string | null;
  niche: string;
  plan: string;
  subscription_status: string;
  onboarding_status: string;
  onboarding_notes?: string | null;
  billing_provider: string;
  monthly_price: number;
  setup_fee?: number;
  billing_due_day?: number;
  ai_cost_current_month?: number;
  leads_count_current_month?: number;
  referred_by_tenant_id?: string | null;
  whatsapp_instance_name?: string | null;
  whatsapp_connected: boolean;
  ai_name?: string | null;
  ai_system_prompt?: string | null;
  notification_phone?: string | null;
  created_at: string;
}

export interface Lead {
  id: string;
  tenant_id: string;
  name: string;
  phone: string;
  stage: string;
  ai_active: boolean;
  summary: string | null;
  followup_count: number;
  next_followup_at: string | null;
  last_message_at: string;
  created_at: string;
}

export interface Message {
  id: string;
  tenant_id: string;
  lead_id: string;
  sender_type: 'lead' | 'ai' | 'human';
  content: string;
  media_type: 'text' | 'audio' | 'document' | 'image';
  created_at: string;
}

export interface SaasExpense {
  id: string;
  title: string;
  category: string;
  amount: number;
  balance_remaining: number | null;
  alert_threshold: number | null;
  due_day: number | null;
  status: string;
  whatsapp_alert_sent: boolean;
  updated_at: string;
}

export interface SaasAdminSettings {
  id: string;
  ceo_whatsapp_phone: string;
  alert_on_new_sale: boolean;
  alert_on_new_onboarding: boolean;
  alert_on_low_openai_balance: boolean;
  alert_on_expense_due: boolean;
  alert_on_instance_disconnect: boolean;
  openai_current_balance_usd: number;
  openai_low_alert_usd: number;
}

export interface Invoice {
  id: string;
  tenant_id: string;
  amount: number;
  status: string;
  billing_provider: string;
  due_date: string;
  paid_at: string | null;
  sicredi_nosso_numero: string | null;
  pix_copia_e_cola: string | null;
  boleto_pdf_url: string | null;
  stripe_invoice_id: string | null;
  created_at: string;
}

export interface FollowupRule {
  id: string;
  tenant_id: string;
  step_number: number;
  delay_hours: number;
  prompt_instruction: string;
  is_active: boolean;
}

// ==========================================
// 1. TENANTS (EMPRESAS / CLIENTES)
// ==========================================
export async function getTenants(): Promise<Tenant[]> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('tenants')
      .select('*')
      .order('created_at', { ascending: false });

    if (error || !data) return [];
    return data as Tenant[];
  } catch {
    return [];
  }
}

export async function updateTenantPrompt(tenantId: string, systemPrompt: string, aiName?: string) {
  try {
    const supabase = createClient();
    const updatePayload: Record<string, unknown> = { ai_system_prompt: systemPrompt };
    if (aiName) updatePayload.ai_name = aiName;

    const { data, error } = await supabase
      .from('tenants')
      .update(updatePayload)
      .eq('id', tenantId)
      .select();

    return { data, error };
  } catch (err) {
    return { data: null, error: err };
  }
}

export async function updateTenantOnboardingStatus(tenantId: string, status: string) {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('tenants')
      .update({ onboarding_status: status })
      .eq('id', tenantId)
      .select();

    return { data, error };
  } catch (err) {
    return { data: null, error: err };
  }
}

// ==========================================
// 2. LEADS & CRM KANBAN
// ==========================================
export async function getLeads(tenantId?: string): Promise<Lead[]> {
  try {
    const supabase = createClient();
    let query = supabase.from('leads').select('*').order('last_message_at', { ascending: false });

    if (tenantId) {
      query = query.eq('tenant_id', tenantId);
    }

    const { data, error } = await query;
    if (error || !data) return [];
    return data as Lead[];
  } catch {
    return [];
  }
}

export async function updateLeadAiStatus(leadId: string, aiActive: boolean) {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('leads')
      .update({ ai_active: aiActive })
      .eq('id', leadId)
      .select();

    return { data, error };
  } catch (err) {
    return { data: null, error: err };
  }
}

export async function updateLeadStage(leadId: string, stage: string) {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('leads')
      .update({ stage })
      .eq('id', leadId)
      .select();

    return { data, error };
  } catch (err) {
    return { data: null, error: err };
  }
}

// ==========================================
// 3. MENSAGENS / CHAT AO VIVO
// ==========================================
export async function getMessages(leadId: string): Promise<Message[]> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .eq('lead_id', leadId)
      .order('created_at', { ascending: true });

    if (error || !data) return [];
    return data as Message[];
  } catch {
    return [];
  }
}

export async function sendMessage(tenantId: string, leadId: string, content: string, senderType: 'human' | 'ai' = 'human') {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('messages')
      .insert({
        tenant_id: tenantId,
        lead_id: leadId,
        sender_type: senderType,
        content,
        media_type: 'text',
      })
      .select();

    return { data, error };
  } catch (err) {
    return { data: null, error: err };
  }
}

// ==========================================
// 4. CUSTOS INTERNOS DO SAAS (EXPENSES)
// ==========================================
export async function getSaasExpenses(): Promise<SaasExpense[]> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('saas_expenses')
      .select('*')
      .order('updated_at', { ascending: false });

    if (error || !data) return [];
    return data as SaasExpense[];
  } catch {
    return [];
  }
}

export async function rechargeOpenAiBalance(amount: number) {
  try {
    const supabase = createClient();
    const expenses = await getSaasExpenses();
    const openai = expenses.find((e) => e.category === 'openai');

    if (openai) {
      const current = Number(openai.balance_remaining || 0);
      const { data, error } = await supabase
        .from('saas_expenses')
        .update({
          balance_remaining: current + amount,
          updated_at: new Date().toISOString(),
        })
        .eq('id', openai.id)
        .select();

      return { data, error };
    }
    return { data: null, error: null };
  } catch (err) {
    return { data: null, error: err };
  }
}

export async function markExpensePaid(expenseId: string) {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('saas_expenses')
      .update({
        status: 'paid',
        updated_at: new Date().toISOString(),
      })
      .eq('id', expenseId)
      .select();

    return { data, error };
  } catch (err) {
    return { data: null, error: err };
  }
}

// ==========================================
// 5. CONFIGURAÇÕES DO CEO (BOT DO WHATSAPP)
// ==========================================
export async function getAdminSettings(): Promise<SaasAdminSettings | null> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('saas_admin_settings')
      .select('*')
      .limit(1)
      .maybeSingle();

    if (error || !data) return null;
    return data as SaasAdminSettings;
  } catch {
    return null;
  }
}

export async function saveAdminSettings(settings: Partial<SaasAdminSettings>) {
  try {
    const supabase = createClient();
    const current = await getAdminSettings();

    if (current?.id) {
      const { data, error } = await supabase
        .from('saas_admin_settings')
        .update(settings)
        .eq('id', current.id)
        .select();
      return { data, error };
    } else {
      const { data, error } = await supabase
        .from('saas_admin_settings')
        .insert({
          ceo_whatsapp_phone: settings.ceo_whatsapp_phone || '+5553999990000',
          ...settings,
        })
        .select();
      return { data, error };
    }
  } catch (err) {
    return { data: null, error: err };
  }
}

// ==========================================
// 6. FATURAS (INVOICES)
// ==========================================
export async function getInvoices(): Promise<Invoice[]> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('invoices')
      .select('*')
      .order('due_date', { ascending: false });

    if (error || !data) return [];
    return data as Invoice[];
  } catch {
    return [];
  }
}

// ==========================================
// 7. FOLLOW-UP RULES
// ==========================================
export async function getFollowupRules(tenantId: string): Promise<FollowupRule[]> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('followup_rules')
      .select('*')
      .eq('tenant_id', tenantId)
      .order('step_number', { ascending: true });

    if (error || !data) return [];
    return data as FollowupRule[];
  } catch {
    return [];
  }
}
