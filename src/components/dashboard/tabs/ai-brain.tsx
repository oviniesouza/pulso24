'use client';

import { useState, useEffect } from 'react';
import { Brain, Shield, FileText, Wand2, Save, Cloud, CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { getTenants, updateTenantPrompt } from '@/lib/supabase/service';

const TEMPLATES = {
  advocacia: {
    tenantId: '11111111-1111-1111-1111-111111111111',
    name: 'Clara (Jurídico)',
    prompt: `Você é a assistente virtual do escritório Silva & Associados. Faça a triagem empática do cliente, pergunte a área do direito, peça um resumo do caso (áudio ou texto) e agende a consulta com o advogado. Nunca dê parecer jurídico.`,
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
    tenantId: '22222222-2222-2222-2222-222222222222',
    name: 'Sofia (Projetos)',
    prompt: `Você é a consultora de atendimento da Arte & Design Móveis Planejados. Descubra quais ambientes o cliente quer planejar, se já possui planta ou medidas e agende uma reunião com o projetista.`,
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

type TemplateKey = keyof typeof TEMPLATES;

export function AiBrainTab() {
  const [activeKey, setActiveKey] = useState<TemplateKey>('advocacia');
  const [prompt, setPrompt] = useState(TEMPLATES.advocacia.prompt);
  const [aiName, setAiName] = useState(TEMPLATES.advocacia.name);
  const [questions, setQuestions] = useState(TEMPLATES.advocacia.questions);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  // Carregar dados reais do Supabase (tabela tenants)
  useEffect(() => {
    async function loadTenantData() {
      const tenants = await getTenants();
      const current = tenants.find((t) => t.id === TEMPLATES[activeKey].tenantId);

      if (current) {
        if (current.ai_system_prompt) setPrompt(current.ai_system_prompt);
        if (current.ai_name) setAiName(current.ai_name);
      } else {
        setPrompt(TEMPLATES[activeKey].prompt);
        setAiName(TEMPLATES[activeKey].name);
      }
      setQuestions(TEMPLATES[activeKey].questions);
    }
    loadTenantData();
  }, [activeKey]);

  const handleSelectTemplate = (key: TemplateKey) => {
    setActiveKey(key);
  };

  const handleSave = async () => {
    setSaving(true);
    setFeedback(null);

    const tenantId = TEMPLATES[activeKey].tenantId;
    await updateTenantPrompt(tenantId, prompt, aiName);

    setSaving(false);
    setFeedback(`Prompt da IA (${aiName}) atualizado com sucesso no Supabase!`);
    setTimeout(() => setFeedback(null), 3500);
  };

  return (
    <div className="space-y-4">
      {/* Toast Feedback */}
      {feedback && (
        <div className="border border-emerald-500/40 bg-emerald-500/10 px-4 py-2.5 text-xs text-emerald-400 font-medium flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4" />
          {feedback}
        </div>
      )}

      {/* Seletor de Templates Reais */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-400 uppercase tracking-wider">Cliente / Nicho:</span>
          <Button
            variant={activeKey === 'advocacia' ? 'default' : 'outline'}
            size="sm"
            onClick={() => handleSelectTemplate('advocacia')}
          >
            <FileText className="h-3.5 w-3.5" />
            Silva & Associados Advocacia
          </Button>
          <Button
            variant={activeKey === 'moveis_planejados' ? 'default' : 'outline'}
            size="sm"
            onClick={() => handleSelectTemplate('moveis_planejados')}
          >
            <Wand2 className="h-3.5 w-3.5" />
            Arte & Design Móveis
          </Button>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-cyan-400 border border-cyan-500/30 bg-cyan-500/10 px-2.5 py-1 font-mono">
          <Cloud className="h-3.5 w-3.5" />
          Tabela: <code>public.tenants.ai_system_prompt</code>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Editor de Prompt */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-base">
                <Brain className="h-4 w-4 text-cyan-400" />
                Prompt Mestre da IA
              </CardTitle>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400">Nome:</span>
                <input
                  value={aiName}
                  onChange={(e) => setAiName(e.target.value)}
                  className="bg-[#0B0F19] border border-[#1F2937] px-2 py-0.5 text-xs text-emerald-400 font-bold focus:outline-none focus:border-emerald-500 w-32"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full h-72 bg-[#0B0F19] border border-[#1F2937] p-3 text-sm text-gray-300 font-mono leading-relaxed resize-none focus:outline-none focus:border-emerald-500"
            />
          </CardContent>
        </Card>

        {/* Perguntas de Triagem + Travas de Segurança */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Perguntas de Triagem no WhatsApp</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {questions.map((q, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold text-xs mt-2 w-4 flex-shrink-0">{i + 1}.</span>
                  <input
                    value={q}
                    onChange={(e) => {
                      const newQ = [...questions];
                      newQ[i] = e.target.value;
                      setQuestions(newQ);
                    }}
                    className="flex-1 bg-[#0B0F19] border border-[#1F2937] px-2.5 py-1.5 text-sm text-gray-200 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Shield className="h-4 w-4 text-red-400" />
                Travas de Segurança Éticas & Jurídicas
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {TEMPLATES[activeKey].safeties.map((s, i) => (
                <div key={i} className="flex items-center gap-2 text-xs">
                  <div className="h-1.5 w-1.5 rounded-full bg-red-500 flex-shrink-0" />
                  <span className="text-gray-300">{s}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Button variant="default" onClick={handleSave} disabled={saving} className="w-full sm:w-auto">
          <Save className="h-4 w-4" />
          {saving ? 'Gravando no Supabase...' : 'Salvar no Supabase (Tabela public.tenants)'}
        </Button>
      </div>
    </div>
  );
}
