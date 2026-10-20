import { Mail, Globe } from 'lucide-react';
import { Logo } from '@/components/logo';
import { WhatsAppIcon } from '@/components/icons/whatsapp-icon';

export function Footer() {
  return (
    <footer className="border-t border-[#1F2937] bg-[#0B0F19] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2">
            <Logo size="lg" className="mb-4" />
            <p className="text-sm text-gray-500 max-w-xs leading-relaxed">
              IA comercial para WhatsApp. Atende, qualifica e converte leads 24 horas por dia, 7 dias por semana.
            </p>
            <div className="flex gap-3 mt-4">
              <a
                href="https://wa.me/5511999999999"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 text-xs text-[#25D366] hover:text-white transition-colors"
              >
                <WhatsAppIcon size={16} />
                WhatsApp
              </a>
              <a
                href="mailto:contato@pulso24.com.br"
                className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-white transition-colors"
              >
                <Mail className="h-4 w-4" />
                E-mail
              </a>
              <a
                href="https://pulso24.com.br"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-white transition-colors"
              >
                <Globe className="h-4 w-4" />
                pulso24.com.br
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-xs tracking-widest uppercase text-gray-600 mb-4">Produto</h4>
            <ul className="space-y-2">
              {['Funcionalidades', 'Para Advocacia', 'Para Móveis', 'Planos e Preços', 'FAQ'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-gray-500 hover:text-white transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs tracking-widest uppercase text-gray-600 mb-4">Legal</h4>
            <ul className="space-y-2">
              {['Termos de Uso', 'Política de Privacidade', 'LGPD'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-gray-500 hover:text-white transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-[#1F2937] pt-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-gray-600">
            © 2026 Pulso 24. Todos os direitos reservados.
          </p>
          <p className="text-xs text-gray-700">
            CNPJ: 00.000.000/0000-00
          </p>
        </div>
      </div>
    </footer>
  );
}
