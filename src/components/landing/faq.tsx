'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    q: 'Como a IA é treinada para o meu negócio?',
    a: 'Após a contratação, fazemos uma sessão de onboarding onde você nos passa informações sobre sua empresa, serviços, preços e perguntas frequentes. Configuramos o prompt da IA, as perguntas de triagem e as travas de segurança (o que a IA pode e não pode falar). Em média, o setup leva 48h úteis.',
  },
  {
    q: 'A IA pode dar parecer jurídico?',
    a: 'Não. Para escritórios de advocacia, configuramos uma trava de segurança que proíbe a IA de dar qualquer tipo de parecer ou conselho jurídico. Ela apenas coleta informações, qualifica o caso e agenda a consulta com o advogado. A responsabilidade técnica fica sempre com o profissional.',
  },
  {
    q: 'O que acontece quando o cliente manda um áudio?',
    a: 'A IA transcreve o áudio usando tecnologia de Speech-to-Text e responde normalmente, como se tivesse lido uma mensagem de texto. O processo leva menos de 5 segundos. Isso funciona para áudios de até 10 minutos.',
  },
  {
    q: 'Posso assumir o atendimento manualmente?',
    a: 'Sim! No painel do cliente, há um botão "Pausar IA / Assumir Atendimento" para cada conversa. Quando você ativa, a IA para de responder naquela conversa e você assume pelo WhatsApp normal. Quando terminar, é só reativar.',
  },
  {
    q: 'Qual a diferença do Pulso 24 para um chatbot simples?',
    a: 'Chatbots simples seguem fluxos fixos ("Digite 1 para..."). O Pulso 24 usa IA generativa (GPT-4), que entende linguagem natural, contexto, áudios, imagens e documentos. Ela tem uma conversa real, não um menu de opções — o cliente nem percebe que é uma IA.',
  },
  {
    q: 'E se meu WhatsApp for banido?',
    a: 'Usamos a Evolution API com práticas recomendadas pelo WhatsApp Business. Configuramos a IA para se comportar humanamente (delays entre mensagens, sem spam). Em mais de 200 clientes implementados, nunca tivemos um caso de ban por uso do Pulso 24.',
  },
  {
    q: 'Como funciona o follow-up automático?',
    a: 'Quando um lead para de responder, a IA detecta e agenda toques automáticos: 4h depois, 24h depois e 72h depois (configurável). As mensagens são naturais e personalizadas, não parecem disparo em massa. A taxa média de recuperação de leads é de 23%.',
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="py-14 sm:py-24 bg-[#111827]/40 border-t border-[#1F2937]/50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 sm:mb-12 text-center sm:text-left"
        >
          <div className="inline-flex items-center gap-2 border border-emerald-500/30 bg-emerald-500/5 px-3 py-1 text-xs text-emerald-400 tracking-wider uppercase mb-3 rounded-full">
            Dúvidas Frequentes
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tight">Perguntas & Respostas</h2>
        </motion.div>

        <div className="space-y-2">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              className="border border-[#1F2937] bg-[#111827] rounded-lg overflow-hidden"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between p-3.5 sm:p-4 text-left hover:bg-[#1F2937]/50 transition-colors"
              >
                <span className="text-xs sm:text-sm font-medium text-white pr-3">{faq.q}</span>
                <ChevronDown
                  className={`h-4 w-4 text-gray-400 flex-shrink-0 transition-transform duration-200 ${
                    open === i ? 'rotate-180 text-emerald-400' : ''
                  }`}
                />
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <p className="px-3.5 sm:px-4 pb-3.5 sm:pb-4 text-xs sm:text-sm text-gray-400 leading-relaxed border-t border-[#1F2937] pt-3">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
