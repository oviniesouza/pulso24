'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WhatsAppIcon } from '@/components/icons/whatsapp-icon';
import { getWhatsAppUrl } from '@/lib/constants';

const WHATSAPP_URL = getWhatsAppUrl('Olá! Quero testar a IA do Pulso 24 ao vivo no WhatsApp');

export function FloatingWhatsApp() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const demoElement = document.getElementById('demonstracao');
    if (!demoElement) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Oculta o botão flutuante quando a seção de demonstração está na viewport para não poluir com 3 CTAs concorrentes
        setVisible(!entry.isIntersecting);
      },
      { threshold: 0.15 }
    );

    observer.observe(demoElement);
    return () => observer.disconnect();
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
          <motion.a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Testar IA ao Vivo no WhatsApp"
            className="flex items-center gap-2 px-3 py-2.5 sm:px-4 sm:py-3 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs sm:text-sm rounded-full shadow-[0_4px_25px_rgba(37,211,102,0.45)] border border-[#34e277] transition-all group cursor-pointer"
          >
            <div className="relative flex items-center justify-center shrink-0">
              <WhatsAppIcon size={18} className="text-white" />
              <span className="absolute -top-1 -right-1 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-200" />
              </span>
            </div>
            <span className="tracking-tight whitespace-nowrap hidden sm:inline">
              Testar IA ao Vivo no WhatsApp
            </span>
            <span className="tracking-tight whitespace-nowrap sm:hidden font-semibold">
              Falar com IA
            </span>
          </motion.a>
        </div>
      )}
    </AnimatePresence>
  );
}
