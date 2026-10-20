import { Mail } from 'lucide-react';
import { Logo } from '@/components/logo';
import { WhatsAppIcon } from '@/components/icons/whatsapp-icon';

function InstagramIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-[#1F2937] bg-[#0B0F19] py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div className="sm:col-span-2">
            <Logo size="md" className="mb-3 sm:mb-4" />
            <p className="text-xs sm:text-sm text-gray-400 max-w-sm leading-relaxed">
              Atendimento comercial 24/7 no WhatsApp com Inteligência Artificial. Triagem, áudios, leitura de documentos e agendamento automático.
            </p>
            <div className="flex flex-wrap gap-3 sm:gap-4 mt-4 sm:mt-5">
              <a
                href="https://wa.me/5511999999999?text=Olá!+Quero+conhecer+o+Pulso+24"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 text-xs text-[#25D366] hover:text-white transition-colors font-medium"
              >
                <WhatsAppIcon size={16} />
                WhatsApp Oficial
              </a>
              <a
                href="mailto:contato@pulso24.com.br"
                className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors"
              >
                <Mail className="h-4 w-4" />
                contato@pulso24.com.br
              </a>
              <a
                href="https://instagram.com/pulso24"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors"
              >
                <InstagramIcon className="h-4 w-4" />
                @pulso24
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-xs tracking-widest uppercase text-gray-500 font-bold mb-4">Navegação</h4>
            <ul className="space-y-2">
              {[
                { label: 'Demonstração Prática', href: '#demonstracao' },
                { label: 'Calculadora de Economia', href: '#economia' },
                { label: 'Como Funciona', href: '#como-funciona' },
                { label: 'Depoimentos', href: '#depoimentos' },
                { label: 'Planos & Preços', href: '#planos' },
              ].map((item) => (
                <li key={item.label}>
                  <a href={item.href} className="text-sm text-gray-400 hover:text-emerald-400 transition-colors">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs tracking-widest uppercase text-gray-500 font-bold mb-4">Legal & Segurança</h4>
            <ul className="space-y-2">
              {[
                { label: 'Termos de Uso', href: '#' },
                { label: 'Política de Privacidade', href: '#' },
                { label: 'Conformidade LGPD', href: '#' },
                { label: 'API Oficial WhatsApp', href: '#' },
              ].map((item) => (
                <li key={item.label}>
                  <a href={item.href} className="text-sm text-gray-400 hover:text-white transition-colors">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-[#1F2937] pt-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-gray-500">
            © 2026 Pulso 24 — Todos os direitos reservados.
          </p>
          <p className="text-xs text-gray-600">
            Tecnologia comercial de alta conversão para WhatsApp.
          </p>
        </div>
      </div>
    </footer>
  );
}
