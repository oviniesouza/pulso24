'use client';

import { useState, useEffect } from 'react';
import { Brain, Shield, FileText, Wand2, Save, Cloud, CheckCircle2, Bot } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { updateTenantPrompt } from '@/lib/supabase/service';
import { useTenant } from '@/contexts/tenant-context';

const NICHE_CONFIGS: Record<string, { questions: string[]; safeties: string[] }> = {
  saas_b2b: {
    questions: [
      'Qual é o nome da sua empresa e o seu nicho comercial?',
      'Quantas mensagens você recebe aproximadamente por dia no WhatsApp?',
      'Mande um áudio de até 1 minuto contando seu maior gargalo de atendimento para testar minha resposta!',
      'Podemos agendar uma demonstração de 10 minutos com o Vinícius para ativar seu painel?',
    ],
    safeties: [
      'Proibido prometer preços diferentes dos planos oficiais (Start R$ 297, Pro R$ 497, Scale R$ 897)',
      'Sempre enfatizar que o atendimento atual já está sendo feito 100% por IA em menos de 10s',
      'Incentivar o lead a mandar áudio ou foto para experimentar a tecnologia multimodal',
      'Direcionar reuniões para a agenda oficial do fundador',
    ],
  },
  advocacia: {
    questions: [
      'Qual é a área do seu caso? (trabalhista, família, cível, etc.)',
      'Poderia me mandar um áudio de até 2 minutos ou texto resumindo o ocorrido?',
      'Possui documentos comprobatórios ou contracheques em PDF?',
      'Qual o melhor turno para agendarmos com o Dr. Marcos (manhã ou tarde)?',
    ],
    safeties: [
      'Proibido dar pareceres ou consultoria jurídica privativa de advogado',
      'Proibido citar artigos de lei como conselho definitivo',
      'Proibido garantir ganho de causa ou valores de indenização',
      'Sempre esclarecer que a análise técnica caberá ao advogado',
    ],
  },
  moveis_planejados: {
    questions: [
      'Quais ambientes você pretende mobiliar? (cozinha, dormitórios, closet, etc.)',
      'O imóvel é novo na planta ou reforma?',
      'Você já possui a planta baixa com medidas para nos enviar em PDF?',
      'Qual a expectativa de investimento aproximado para o projeto?',
    ],
    safeties: [
      'Não passar orçamentos fechados sem visita técnica ou análise de projeto',
      'Não prometer prazos de montagem sem consulta prévia à fábrica',
      'Solicitar envio de fotos ou plantas para enriquecer o briefing do projetista',
    ],
  },
};

export function AiBrainTab() {
  const { tenants, activeTenant, setActiveTenant } = useTenant();

  const [prompt, setPrompt] = useState(activeTenant.ai_system_prompt);
  const [aiName, setAiName] = useState(activeTenant.ai_name);
  const [questions, setQuestions] = useState<string[]>(
    NICHE_CONFIGS[activeTenant.niche]?.questions || NICHE_CONFIGS.saas_b2b.questions
  );
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  // Sincroniza quando activeTenant muda
  useEffect(() => {
    setPrompt(activeTenant.ai_system_prompt);
    setAiName(activeTenant.ai_name);
    const config = NICHE_CONFIGS[activeTenant.niche] || NICHE_CONFIGS.saas_b2b;
    setQuestions(config.questions);
  }, [activeTenant]);

  const handleSave = async () => {
    setSaving(true);
    setFeedback(null);

    await updateTenantPrompt(activeTenant.id, prompt, aiName);

    setSaving(false);
    setFeedback(`Prompt da IA (${aiName}) para '${activeTenant.name}' salvo com sucesso no Supabase!`);
    setTimeout(() => setFeedback(null), 3500);
  };

  const currentSafeties =
    NICHE_CONFIGS[activeTenant.niche]?.safeties || NICHE_CONFIGS.saas_b2b.safeties;

  return (
    <div className="space-y-4">
      {/* Toast Feedback */}
      {feedback && (
        <div className="border border-emerald-500/40 bg-emerald-500/10 px-4 py-2.5 text-xs text-emerald-400 font-medium flex items-center gap-2 rounded-lg">
          <CheckCircle2 className="h-4 w-4 shrink-0" />
          <span>{feedback}</span>
        </div>
      )}

      {/* Seletor Rápido de Robô / Operação */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-gray-400 uppercase tracking-wider">Configurando:</span>
          {tenants.map((t) => {
            const isSelected = activeTenant.id === t.id;
            return (
              <Button
                key={t.id}
                variant={isSelected ? 'default' : 'outline'}
                size="sm"
                className="text-xs h-8"
                onClick={() => setActiveTenant(t)}
              >
                {t.isOwnBot ? <Bot className="h-3.5 w-3.5" /> : t.niche === 'advocacia' ? <FileText className="h-3.5 w-3.5" /> : <Wand2 className="h-3.5 w-3.5" />}
                {t.shortLabel}
              </Button>
            );
          })}
        </div>

        <div className="flex items-center gap-1.5 text-xs text-cyan-400 border border-cyan-500/30 bg-cyan-500/10 px-2.5 py-1 font-mono rounded">
          <Cloud className="h-3.5 w-3.5" />
          Tabela: <code>public.tenants.ai_system_prompt</code>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Editor de Prompt */}
        <Card className="border-[#1F2937] bg-[#111827]">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-base text-white">
                <Brain className="h-4 w-4 text-cyan-400" />
                Prompt Mestre da IA
              </CardTitle>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400">Nome:</span>
                <input
                  value={aiName}
                  onChange={(e) => setAiName(e.target.value)}
                  className="bg-[#0B0F19] border border-[#1F2937] px-2.5 py-1 text-xs text-emerald-400 font-semibold focus:outline-none focus:border-emerald-500 rounded w-44"
                  placeholder="Nome do Robô"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full h-80 bg-[#0B0F19] border border-[#1F2937] p-3 text-xs text-gray-300 font-mono leading-relaxed resize-none focus:outline-none focus:border-emerald-500 rounded"
              placeholder="Instruções completas do comportamento da IA..."
            />
            <p className="text-[11px] text-gray-500 mt-2">
              Esse prompt dita como a IA recebe áudios, lê documentos e conduz o lead para o agendamento comercial.
            </p>
          </CardContent>
        </Card>

        {/* Perguntas + Travas */}
        <div className="space-y-4">
          <Card className="border-[#1F2937] bg-[#111827]">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-white">Perguntas de Triagem Comercial</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {questions.map((q, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold text-xs mt-1 w-4 shrink-0">{i + 1}.</span>
                  <input
                    value={q}
                    onChange={(e) => {
                      const newQ = [...questions];
                      newQ[i] = e.target.value;
                      setQuestions(newQ);
                    }}
                    className="flex-1 bg-[#0B0F19] border border-[#1F2937] px-2.5 py-1.5 text-xs text-gray-300 focus:outline-none focus:border-emerald-500 rounded"
                  />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-[#1F2937] bg-[#111827]">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-sm text-white">
                <Shield className="h-4 w-4 text-red-400" />
                Travas de Segurança & Compliance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {currentSafeties.map((s, i) => (
                <div key={i} className="flex items-start gap-2 text-xs">
                  <div className="h-1.5 w-1.5 rounded-full bg-red-400 shrink-0 mt-1.5" />
                  <span className="text-gray-300 leading-snug">{s}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
        <p className="text-xs text-gray-500">
          Modificações são gravadas diretamente na tabela <code>public.tenants</code> para a instância{' '}
          <strong className="text-emerald-400 font-mono">{activeTenant.whatsapp_instance_name}</strong>.
        </p>
        <Button
          variant="default"
          onClick={handleSave}
          disabled={saving}
          className="w-full sm:w-auto font-semibold px-6"
        >
          <Save className="h-4 w-4" />
          {saving ? 'Gravando no Supabase...' : `Salvar Configuração de ${aiName}`}
        </Button>
      </div>
    </div>
  );
}
