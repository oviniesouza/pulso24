/**
 * Serviço de Gerenciamento e Sincronização de Etiquetas (Labels) no WhatsApp Business
 * via Evolution API (Baileys)
 */

const EVOLUTION_API_URL =
  process.env.NEXT_PUBLIC_EVOLUTION_API_URL ||
  'https://pulso24-evolution-api.xdm0dg.easypanel.host';
const EVOLUTION_API_KEY =
  process.env.EVOLUTION_API_KEY || '429683C4C977415CAAFCCE10F7D57E11';

export interface WhatsAppLabel {
  id: string;
  name: string;
  color?: string;
}

export const STAGE_CONFIG = [
  {
    id: 'novo',
    name: '1. Novo Lead',
    aliases: ['novo lead', 'novo cliente', 'novo', '1. novo lead', '1'],
    color: '1',
  },
  {
    id: 'qualificado',
    name: '2. Lead Quente',
    aliases: ['lead quente', 'quente', 'qualificado', '2. lead quente', '2'],
    color: '2',
  },
  {
    id: 'agendado',
    name: '3. Agendado',
    aliases: ['agendado', 'reunião', 'visita', 'consulta agendada', '3. agendado', '3'],
    color: '3',
  },
  {
    id: 'follow_up',
    name: '4. Aguardando Retorno',
    aliases: ['aguardando retorno', 'aguardando', 'follow-up', 'follow up', '4. aguardando', '4'],
    color: '4',
  },
  {
    id: 'ganho',
    name: '5. Fechado',
    aliases: ['fechado', 'ganho', 'convertido', 'pago', 'pedido finalizado', '5. fechado', '5'],
    color: '5',
  },
] as const;

export type StageId = (typeof STAGE_CONFIG)[number]['id'];

/**
 * Busca todas as etiquetas existentes na instância do WhatsApp
 */
export async function getEvolutionLabels(instance: string): Promise<WhatsAppLabel[]> {
  try {
    const res = await fetch(`${EVOLUTION_API_URL}/label/findLabels/${instance}`, {
      method: 'GET',
      headers: {
        apikey: EVOLUTION_API_KEY,
      },
      next: { revalidate: 30 },
    });

    if (!res.ok) {
      console.warn(`[whatsapp-labels] Não foi possível buscar etiquetas para ${instance}:`, res.status);
      return [];
    }

    const data = await res.json();
    if (Array.isArray(data)) {
      return data;
    }
    if (Array.isArray(data.value)) {
      return data.value;
    }
    return [];
  } catch (err) {
    console.error(`[whatsapp-labels] Erro ao buscar etiquetas de ${instance}:`, err);
    return [];
  }
}

/**
 * Encontra a etiqueta correspondente a um estágio do funil
 */
function findLabelForStage(stageId: string, availableLabels: WhatsAppLabel[]): WhatsAppLabel | null {
  const config = STAGE_CONFIG.find((s) => s.id === stageId);
  if (!config || availableLabels.length === 0) return null;

  const aliases = config.aliases.map((a) => a.toLowerCase());

  // 1. Busca por correspondência exata de nome ou alias
  for (const label of availableLabels) {
    const labelLower = label.name.toLowerCase();
    if (aliases.some((alias) => labelLower === alias || labelLower.includes(alias))) {
      return label;
    }
  }

  // 2. Busca pelo número do prefixo (ex: "1.", "2.", "3.", etc.)
  const prefix = config.name.split('.')[0] + '.';
  for (const label of availableLabels) {
    if (label.name.startsWith(prefix)) {
      return label;
    }
  }

  return null;
}

/**
 * Aplica ou remove etiqueta em um contato no WhatsApp via Evolution API
 */
export async function handleContactLabel(
  instance: string,
  phone: string,
  labelId: string,
  action: 'add' | 'remove'
): Promise<boolean> {
  try {
    const cleanPhone = phone.replace(/\D/g, '');
    if (!cleanPhone) return false;

    const res = await fetch(`${EVOLUTION_API_URL}/label/handleLabel/${instance}`, {
      method: 'POST',
      headers: {
        apikey: EVOLUTION_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        number: cleanPhone,
        labelId: String(labelId),
        action,
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.warn(`[whatsapp-labels] Falha ao ${action} etiqueta ${labelId} para ${cleanPhone}:`, errText);
      return false;
    }

    const json = await res.json();
    return Boolean(json.add || json.remove || json.numberJid);
  } catch (err) {
    console.error(`[whatsapp-labels] Exceção ao ${action} etiqueta:`, err);
    return false;
  }
}

/**
 * Sincroniza o estágio do lead com o WhatsApp Business do dono da empresa:
 * 1. Remove qualquer etiqueta de estágio anterior para não poluir o contato com múltiplas tags
 * 2. Adiciona a etiqueta correspondente ao novo estágio
 */
export async function syncLeadWhatsAppLabel({
  instance,
  phone,
  newStage,
  previousStage,
}: {
  instance?: string;
  phone: string;
  newStage: string;
  previousStage?: string;
}): Promise<{ success: boolean; labelApplied?: string; labelId?: string }> {
  const targetInstance = instance || 'pulso24_oficial';
  const cleanPhone = phone.replace(/\D/g, '');

  if (!cleanPhone) {
    return { success: false };
  }

  try {
    // 1. Busca todas as etiquetas do WhatsApp da empresa
    const labels = await getEvolutionLabels(targetInstance);
    if (!labels || labels.length === 0) {
      return { success: false };
    }

    // 2. Identifica a etiqueta de destino
    const targetLabel = findLabelForStage(newStage, labels);

    // 3. Remover etiquetas dos outros estágios do funil para manter apenas 1 etiqueta limpa
    //    (Evita acúmulo de tags desatualizadas no celular do empresário)
    for (const stage of STAGE_CONFIG) {
      if (stage.id !== newStage) {
        const otherLabel = findLabelForStage(stage.id, labels);
        if (otherLabel && otherLabel.id !== targetLabel?.id) {
          // Se previousStage foi informado, prioriza remover a anterior
          if (!previousStage || previousStage === stage.id) {
            await handleContactLabel(targetInstance, cleanPhone, otherLabel.id, 'remove');
          }
        }
      }
    }

    // 4. Adiciona a nova etiqueta
    if (targetLabel) {
      const applied = await handleContactLabel(targetInstance, cleanPhone, targetLabel.id, 'add');
      return {
        success: applied,
        labelApplied: targetLabel.name,
        labelId: targetLabel.id,
      };
    }

    return { success: false };
  } catch (err) {
    console.error('[whatsapp-labels] Erro na sincronização de etiqueta:', err);
    return { success: false };
  }
}
