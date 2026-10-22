export const OFFICIAL_WHATSAPP_NUMBER = '555384450964';
export const OFFICIAL_WHATSAPP_DISPLAY = '+55 (53) 8445-0964';

export function getWhatsAppUrl(customMessage = 'Olá! Quero conhecer o Pulso 24'): string {
  const encoded = encodeURIComponent(customMessage);
  return `https://wa.me/${OFFICIAL_WHATSAPP_NUMBER}?text=${encoded}`;
}
