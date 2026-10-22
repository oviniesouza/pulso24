import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const audioBase64 = body.audioBase64 || body.base64 || '';
    const apiKey =
      process.env.OPENAI_API_KEY ||
      body.apiKey ||
      body.api_key ||
      '';

    if (!audioBase64) {
      return NextResponse.json(
        { success: false, message: 'Nenhum áudio fornecido em base64' },
        { status: 400 }
      );
    }

    // Remover prefixo data URI se houver
    const cleanBase64 = String(audioBase64).replace(/^data:[^;]+;base64,/, '').trim();
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
