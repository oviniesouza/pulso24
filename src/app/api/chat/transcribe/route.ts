import { NextResponse } from 'next/server';

const EVOLUTION_API_URL =
  process.env.NEXT_PUBLIC_EVOLUTION_API_URL ||
  'https://pulso24-evolution-api.xdm0dg.easypanel.host';
const EVOLUTION_API_KEY =
  process.env.EVOLUTION_API_KEY || '429683C4C977415CAAFCCE10F7D57E11';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    let audioBase64 = body.audioBase64 || body.base64 || '';
    const messageId = body.messageId || body.id || body.keyId || '';
    const instance = body.instance || 'pulso24_oficial';
    const apiKey =
      process.env.OPENAI_API_KEY ||
      body.apiKey ||
      body.api_key ||
      '';

    // Se o base64 não veio direto no webhook, busca na Evolution API usando o messageId
    if (!audioBase64 && messageId) {
      try {
        const evoRes = await fetch(
          `${EVOLUTION_API_URL}/chat/getBase64FromMediaMessage/${instance}`,
          {
            method: 'POST',
            headers: {
              apikey: EVOLUTION_API_KEY,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              message: { key: { id: messageId } },
              convertToMp4: false,
            }),
          }
        );

        if (evoRes.ok) {
          const evoData = await evoRes.json();
          if (evoData.base64) {
            audioBase64 = evoData.base64;
          }
        } else {
          console.error(
            'Evolution getBase64FromMediaMessage failed:',
            evoRes.status,
            await evoRes.text()
          );
        }
      } catch (err) {
        console.error('Erro ao buscar base64 na Evolution API:', err);
      }
    }

    if (!audioBase64) {
      return NextResponse.json(
        {
          success: false,
          message:
            'Nenhum áudio fornecido em base64 e nenhum messageId válido para download na Evolution API',
        },
        { status: 400 }
      );
    }

    // Remover prefixo data URI se houver
    const cleanBase64 = String(audioBase64)
      .replace(/^data:[^;]+;base64,/, '')
      .trim();
    const buffer = Buffer.from(cleanBase64, 'base64');

    const form = new FormData();
    const blob = new Blob([buffer], { type: 'audio/ogg' });
    form.append('file', blob, 'audio.ogg');
    form.append('model', 'whisper-1');
    form.append('language', 'pt');

    const res = await fetch('https://api.openai.com/v1/audio/transcriptions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
      body: form,
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error('OpenAI Whisper error:', res.status, errText);
      return NextResponse.json(
        { success: false, error: errText },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json({
      success: true,
      text: data.text || '',
    });
  } catch (error) {
    console.error('Erro na transcrição de áudio:', error);
    return NextResponse.json(
      { success: false, error: String(error) },
      { status: 500 }
    );
  }
}
