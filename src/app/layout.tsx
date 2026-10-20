import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Pulso 24 — Atendimento Comercial 24/7 no WhatsApp com IA',
    template: '%s | Pulso 24',
  },
  description:
    'Seu negócio atendendo, qualificando e fechando clientes no WhatsApp 24 horas por dia, 7 dias por semana. IA treinada para Advocacia, Móveis Planejados e Empresas Locais.',
  keywords: ['whatsapp', 'ia', 'atendimento', 'chatbot', 'advocacia', 'móveis planejados', 'saas'],
  openGraph: {
    title: 'Pulso 24 — Atendimento Comercial 24/7 no WhatsApp com IA',
    description: 'Seu negócio nunca para. IA que atende, qualifica e fecha vendas no WhatsApp.',
    type: 'website',
    locale: 'pt_BR',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="dark">
      <body className={`${inter.variable} font-sans antialiased grain`}>
        {children}
      </body>
    </html>
  );
}
