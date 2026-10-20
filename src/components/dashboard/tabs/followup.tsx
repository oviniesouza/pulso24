'use client';

import { useState } from 'react';
import { Timer, MessageCircle, CheckCircle2, Edit3 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const DEFAULT_TOUCHES = [
  {
    id: 1,
    delay: '4h',
    label: '1º Toque — 4 horas',
    template: 'Olá {nome}! 👋 Só passando para ver se você recebeu as informações que compartilhei. Tem alguma dúvida que posso esclarecer?',
    sent: 47,
    replied: 12,
  },
  {
    id: 2,
    delay: '24h',
    label: '2º Toque — 24 horas',
    template: 'Oi {nome}, tudo bem? Queria saber se você teve a chance de pensar sobre o que conversamos. Ainda temos horários disponíveis para {semana_atual}.',
    sent: 38,
    replied: 9,
  },
  {
    id: 3,
    delay: '72h',
    label: '3º Toque — 72 horas',
    template: '{nome}, não quero ser insistente, mas sei que sua situação precisa de atenção. Vou deixar a porta aberta. Quando quiser, é só me chamar. 🙏',
    sent: 29,
    replied: 6,
  },
];

export function FollowupTab() {
  const [touches, setTouches] = useState(DEFAULT_TOUCHES);
  const [editing, setEditing] = useState<number | null>(null);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-semibold text-white">Régua de Follow-up 24/7</h3>
          <p className="text-sm text-gray-500">Mensagens automáticas para leads que pararam de responder</p>
        </div>
        <Badge variant="default" className="gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Ativa
        </Badge>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-[22px] top-0 bottom-0 w-px bg-[#1F2937]" />

        <div className="space-y-4">
          {touches.map((touch) => (
            <div key={touch.id} className="flex gap-4 pl-0">
              {/* Timeline dot */}
              <div className="flex-shrink-0 relative z-10">
                <div className="h-11 w-11 border border-emerald-500/30 bg-emerald-500/5 flex items-center justify-center">
                  <span className="text-xs font-bold text-emerald-400">{touch.delay}</span>
                </div>
              </div>

              {/* Card */}
              <Card className="flex-1">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Timer className="h-4 w-4 text-cyan-400" />
                      {touch.label}
                    </CardTitle>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setEditing(editing === touch.id ? null : touch.id)}
                    >
                      <Edit3 className="h-3.5 w-3.5" />
                      Editar
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {editing === touch.id ? (
                    <textarea
                      value={touch.template}
                      onChange={(e) => {
                        const newTouches = touches.map((t) =>
                          t.id === touch.id ? { ...t, template: e.target.value } : t
                        );
                        setTouches(newTouches);
                      }}
                      className="w-full h-24 bg-[#0B0F19] border border-[#1F2937] p-3 text-sm text-gray-300 focus:outline-none focus:border-emerald-500 resize-none"
                    />
                  ) : (
                    <div className="border border-[#1F2937] bg-[#0B0F19] p-3">
                      <p className="text-sm text-gray-400 leading-relaxed">{touch.template}</p>
                    </div>
                  )}

                  <div className="flex gap-4">
                    <div className="flex items-center gap-1.5 text-xs text-gray-500">
                      <MessageCircle className="h-3.5 w-3.5" />
                      {touch.sent} enviados
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-emerald-400">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      {touch.replied} responderam ({Math.round((touch.replied / touch.sent) * 100)}%)
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
