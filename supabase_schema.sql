-- ==============================================================
-- PULSO 24 — SCHEMA SUPABASE OFICIAL (MULTI-TENANT REAL)
-- Slogan: "Seu atendimento comercial batendo 24/7 no WhatsApp"
-- ==============================================================

-- 1. Tabela de Empresas Clientes (Multi-tenant + Fila de Implementação + Financeiro)
CREATE TABLE IF NOT EXISTS public.tenants (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    owner_name TEXT,
    owner_phone TEXT,
    niche TEXT DEFAULT 'advocacia',
    plan TEXT DEFAULT 'pro',
    subscription_status TEXT DEFAULT 'active',
    onboarding_status TEXT DEFAULT 'pending_setup',
    onboarding_notes TEXT,
    billing_provider TEXT DEFAULT 'sicredi',
    monthly_price DECIMAL(10,2) DEFAULT 497.00,
    setup_fee DECIMAL(10,2) DEFAULT 0.00,
    billing_due_day INT DEFAULT 10,
    ai_cost_current_month DECIMAL(10,2) DEFAULT 0.00,
    leads_count_current_month INT DEFAULT 0,
    referred_by_tenant_id UUID REFERENCES public.tenants(id),
    whatsapp_instance_name TEXT UNIQUE,
    whatsapp_connected BOOLEAN DEFAULT false,
    ai_name TEXT DEFAULT 'Clara',
    ai_system_prompt TEXT,
    notification_phone TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Tabela de Perfis de Acesso (Com flag de Super Admin para o CEO)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    tenant_id UUID REFERENCES public.tenants(id) ON DELETE CASCADE,
    full_name TEXT,
    role TEXT DEFAULT 'owner',
    is_super_admin BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Tabela de Leads dos Clientes (Kanban + Chat + Follow-up)
CREATE TABLE IF NOT EXISTS public.leads (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    tenant_id UUID REFERENCES public.tenants(id) ON DELETE CASCADE NOT NULL,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    stage TEXT DEFAULT 'novo',
    ai_active BOOLEAN DEFAULT true,
    summary TEXT,
    followup_count INT DEFAULT 0,
    next_followup_at TIMESTAMPTZ,
    last_message_at TIMESTAMPTZ DEFAULT now(),
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 4. Tabela de Mensagens (Histórico de Chat ao Vivo)
CREATE TABLE IF NOT EXISTS public.messages (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    tenant_id UUID REFERENCES public.tenants(id) ON DELETE CASCADE NOT NULL,
    lead_id UUID REFERENCES public.leads(id) ON DELETE CASCADE NOT NULL,
    sender_type TEXT NOT NULL,
    content TEXT NOT NULL,
    media_type TEXT DEFAULT 'text',
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 5. Tabela de Regras de Follow-up 24/7
CREATE TABLE IF NOT EXISTS public.followup_rules (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    tenant_id UUID REFERENCES public.tenants(id) ON DELETE CASCADE NOT NULL,
    step_number INT NOT NULL,
    delay_hours INT NOT NULL,
    prompt_instruction TEXT NOT NULL,
    is_active BOOLEAN DEFAULT true
);

-- 6. Tabela de Faturas dos Clientes (Sicredi Pix/Boleto & Stripe)
CREATE TABLE IF NOT EXISTS public.invoices (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    tenant_id UUID REFERENCES public.tenants(id) ON DELETE CASCADE NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    status TEXT DEFAULT 'pending',
    billing_provider TEXT DEFAULT 'sicredi',
    due_date DATE NOT NULL,
    paid_at TIMESTAMPTZ,
    sicredi_nosso_numero TEXT,
    pix_copia_e_cola TEXT,
    boleto_pdf_url TEXT,
    stripe_invoice_id TEXT,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 7. Tabela de Custos Internos do SaaS (OpenAI, VPS, Domínio)
CREATE TABLE IF NOT EXISTS public.saas_expenses (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    category TEXT DEFAULT 'infra',
    amount DECIMAL(10,2) NOT NULL,
    balance_remaining DECIMAL(10,2),
    alert_threshold DECIMAL(10,2),
    due_day INT,
    status TEXT DEFAULT 'ok',
    whatsapp_alert_sent BOOLEAN DEFAULT false,
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- 8. Configurações de Alerta Pessoal do Dono do SaaS (Bot do CEO)
CREATE TABLE IF NOT EXISTS public.saas_admin_settings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    ceo_whatsapp_phone TEXT NOT NULL,
    alert_on_new_sale BOOLEAN DEFAULT true,
    alert_on_new_onboarding BOOLEAN DEFAULT true,
    alert_on_low_openai_balance BOOLEAN DEFAULT true,
    alert_on_expense_due BOOLEAN DEFAULT true,
    alert_on_instance_disconnect BOOLEAN DEFAULT true,
    openai_current_balance_usd DECIMAL(10,2) DEFAULT 10.00,
    openai_low_alert_usd DECIMAL(10,2) DEFAULT 3.00
);

-- 9. Ativar Políticas de Acesso
ALTER TABLE public.tenants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.followup_rules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saas_expenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saas_admin_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Acesso Demo e Auth Tenants" ON public.tenants FOR ALL USING (true);
CREATE POLICY "Acesso Demo e Auth Profiles" ON public.profiles FOR ALL USING (true);
CREATE POLICY "Acesso Demo e Auth Leads" ON public.leads FOR ALL USING (true);
CREATE POLICY "Acesso Demo e Auth Messages" ON public.messages FOR ALL USING (true);
CREATE POLICY "Acesso Demo e Auth Followups" ON public.followup_rules FOR ALL USING (true);
CREATE POLICY "Acesso Demo e Auth Invoices" ON public.invoices FOR ALL USING (true);
CREATE POLICY "Acesso Demo e Auth Expenses" ON public.saas_expenses FOR ALL USING (true);
CREATE POLICY "Acesso Demo e Auth Settings" ON public.saas_admin_settings FOR ALL USING (true);
