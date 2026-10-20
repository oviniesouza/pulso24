# 🫀 Pulso 24 — Atendimento Comercial 24/7 no WhatsApp com IA

> **Slogan:** *Seu atendimento comercial batendo 24/7 no WhatsApp*

O **Pulso 24** é um SaaS B2B completo desenvolvido em **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, **Lucide React** e **Supabase**, com foco em alta conversão para **Escritórios de Advocacia**, **Móveis Planejados** e **Empresas Locais**.

---

## 🎨 Identidade Visual & Design System

- **Filosofia:** *Surgical Brutalism Digital* — bordas sólidas de 1-2px, alto contraste, sem bordas suaves genéricas e sem clichés de IA.
- **Background Base:** `#0B0F19`
- **Cards & Superfícies:** `#111827`
- **Bordas & Linhas:** `#1F2937`
- **Cor Primária (WhatsApp / Conversão):** Verde Esmeralda `#10B981`
- **Cor Secundária (IA Ativa):** Ciano Elétrico `#06B6D4` *(em estrito cumprimento ao Purple Ban do kit de design)*
- **Logo SVG Próprio:** `src/components/logo.tsx` — Combinação de balão de chat moderno geométrico com linha de monitor cardíaco (pulso) animada via Framer Motion e indicador ativo de IA.

---

## 🚀 Estrutura de Rotas e Telas

### 1. Landing Page Comercial (`/`)
- **Hero Massivo & Não Convencional:** Tipografia assimétrica em camadas, linha de batimento cardíaco atravessando a tela e micro-sinais de confiança.
- **4 Capacidades da IA em Destaque:**
  - 🎙️ Transcrição e resposta a áudios longos (Speech-to-Text).
  - 🖼️ Visão computacional para análise de fotos de ambientes ou documentos.
  - 📄 Leitura, extração e qualificação a partir de PDFs (contratos, laudos, plantas).
  - ⚡ Resposta instantânea em menos de 10 segundos 24 horas por dia.
- **Segmentação Estratégica:**
  - ⚖️ *Escritórios de Advocacia:* Triagem jurídica, trava ética para não dar parecer e agendamento de consultas.
  - 🛋️ *Lojas de Móveis Planejados:* Briefing de ambientes, análise de fotos e filtro de orçamento mínimo.
  - 🏢 *Empresas Locais:* Escala de atendimento com custo inferior a um funcionário.
- **Tabela de Planos:**
  - **Pulso Start:** R$ 297/mês
  - **Pulso Pro:** R$ 497/mês (*Mais Vendido*)
  - **Pulso Scale:** R$ 897/mês
- **Checkout Híbrido:** Botão direto para demonstração ao vivo da IA no WhatsApp e Modal de Checkout com suporte visual a Pix/Boleto Sicredi e Cartão de Crédito Stripe.

### 2. Painel do Cliente (`/dashboard`)
Seletor rápido no topo para alternar entre:
- *Cliente 1: Escritório de Advocacia*
- *Cliente 2: Loja de Móveis Planejados*

Contém **5 Abas Operacionais**:
1. **Visão Geral:** KPIs de leads atendidos, qualificados, recuperados no follow-up e tempo médio de resposta (<10s), gráfico de fluxo horário e leads recentes com pontuação de score.
2. **CRM Kanban & Chat ao Vivo:** Colunas de funil (*Novo Lead*, *Qualificando*, *Lead Quente*, *Consulta Agendada*, *Convertido*), painel de conversa com transcrição, balão de resumo gerado pela IA e botão **Pausar IA / Assumir Atendimento**.
3. **Cérebro da IA:** Editor visual de Prompt, perguntas de triagem personalizadas e travas de segurança com templates prontos para Advocacia e Móveis.
4. **Régua de Follow-up 24/7:** Linha do tempo configurável para toques automáticos (4h, 24h e 72h) com mensagens de recuperação e taxas de resposta.
5. **Conexão WhatsApp & Faturas:** Leitura do QR Code via Evolution API, status da instância e histórico de faturas Sicredi e Stripe.

### 3. Painel Super Admin do Dono do SaaS (`/admin`)
Torre de comando central para o CEO com **5 Abas de Gestão**:
1. **Fila de Implementação (Onboarding):** Clientes que compraram pelo site ou WhatsApp, visualização do briefing coletado, status (*Aguardando Setup*, *Configurando*, *No Ar*) e checklist de 4 passos (*Criar Instância -> Ajustar Prompt -> Ler QR Code -> Concluir*).
2. **Meus Custos & Recargas (Cofre de Operação):** Saldo da OpenAI API com barra de progresso, alerta de saldo baixo (< US$ 3.00), vencimento da VPS e domínio com botões de *Registrar Recarga de Tokens* e *Marcar como Pago*.
3. **Alertas no Meu WhatsApp (Bot do CEO):** Configuração do número de WhatsApp pessoal do fundador e ativação de avisos em tempo real (*Nova Venda*, *Novo Cliente na Fila*, *OpenAI Baixo*, *VPS a Vencer*, *Queda de Conexão*) com botão de disparo de teste.
4. **Gestão de Clientes & Modo Espelho:** Listagem de todas as empresas clientes, tag de *Cliente Fundador (R$ 347)*, controle de indicações e botão **Modo Espelho** (para acessar o painel com a visão exata do cliente).
5. **Financeiro Recebimentos (Sicredi & Stripe):** Cálculo em tempo real de MRR bruto, custos operacionais da OpenAI e VPS, Lucro Líquido do CEO e margem real, além de lista de faturas com botão de **Cobrança no WhatsApp**.

---

## 🛠️ Como Executar Localmente

```bash
cd pulso24

# Instalar dependências (já executado)
npm install

# Rodar servidor de desenvolvimento
npm run dev
```

Acesse no navegador:
- **Landing Page:** [http://localhost:3000](http://localhost:3000)
- **Painel do Cliente:** [http://localhost:3000/dashboard](http://localhost:3000/dashboard)
- **Super Admin do CEO:** [http://localhost:3000/admin](http://localhost:3000/admin)
- **Tela de Login:** [http://localhost:3000/login](http://localhost:3000/login)

---

## 🗄️ Banco de Dados (Supabase)
O arquivo `supabase_schema.sql` na raiz do projeto contém todo o esquema PostgreSQL pronto para ser executado no SQL Editor do Supabase, com suporte a RLS (*Row Level Security*), tabelas de organizações, leads, mensagens, prompts e custos do SaaS.
