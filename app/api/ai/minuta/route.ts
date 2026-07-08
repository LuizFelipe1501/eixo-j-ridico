import { createClient } from "@/lib/supabase/server";

export const maxDuration = 60;

const SYSTEM = `Você é o assistente jurídico do Eixo Jurídico, plataforma de elaboração de peças para escritórios do Distrito Federal.

Sua função é redigir MINUTAS de peças processuais em português jurídico brasileiro, com atenção especial à prática dos tribunais que atendem o DF: TJDFT, TRF1, TRT10 e tribunais superiores.

Regras de elaboração:
- Estruture a peça no padrão forense: endereçamento, qualificação das partes (use colchetes como [NOME DA PARTE] quando o dado não for informado), dos fatos, do direito, dos pedidos, fechamento com local e data.
- Fundamente com a legislação aplicável e, quando pertinente, mencione entendimentos consolidados dos tribunais, sem inventar números de julgados. Se citar jurisprudência, indique apenas o tribunal e a tese, marcando com [VERIFICAR JULGADO].
- Use colchetes para todo dado que precise ser confirmado pelo advogado.
- Escreva de forma objetiva, sem retórica vazia.
- Nunca afirme que a peça está pronta para protocolo: ela é uma minuta que exige revisão obrigatória por advogado.

Responda apenas com o texto da minuta, sem comentários antes ou depois.`;

const MODELO = process.env.GEMINI_MODEL || "gemini-2.5-flash";

export async function POST(req: Request) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return new Response("Não autorizado.", { status: 401 });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return new Response(
      "A variável GEMINI_API_KEY não está configurada no servidor.",
      { status: 500 }
    );
  }

  const { titulo, tipo, area, tribunal, numeroProcesso, fatos, orientacoes } =
    await req.json();

  const prompt = [
    `Elabore a seguinte peça:`,
    `Tipo de peça: ${tipo}`,
    `Área do direito: ${area}`,
    `Tribunal/órgão: ${tribunal}`,
    titulo ? `Título interno do caso: ${titulo}` : "",
    numeroProcesso ? `Número do processo: ${numeroProcesso}` : "",
    ``,
    `Resumo dos fatos:`,
    fatos || "(não informado, use colchetes para os fatos essenciais)",
    ``,
    `Orientações da tese e do escritório:`,
    orientacoes || "(sem orientações adicionais)",
  ]
    .filter((l) => l !== "")
    .join("\n");

  const upstream = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${MODELO}:streamGenerateContent?alt=sse`,
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-goog-api-key": apiKey,
      },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: SYSTEM }] },
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        generationConfig: {
          maxOutputTokens: 8192,
          temperature: 0.4,
        },
      }),
    }
  );

  if (!upstream.ok || !upstream.body) {
    const detalhe = await upstream.text().catch(() => "");
    return new Response(`Erro na API de IA: ${detalhe}`, { status: 502 });
  }

  const encoder = new TextEncoder();
  const decoder = new TextDecoder();
  const reader = upstream.body.getReader();

  const stream = new ReadableStream({
    async start(controller) {
      let buffer = "";
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });

          const linhas = buffer.split("\n");
          buffer = linhas.pop() ?? "";

          for (const linha of linhas) {
            if (!linha.startsWith("data:")) continue;
            const payload = linha.slice(5).trim();
            if (!payload || payload === "[DONE]") continue;
            try {
              const evento = JSON.parse(payload);
              const texto =
                evento?.candidates?.[0]?.content?.parts
                  ?.map((p: { text?: string }) => p.text ?? "")
                  .join("") ?? "";
              if (texto) {
                controller.enqueue(encoder.encode(texto));
              }
            } catch {
              // linha parcial de SSE, ignorada
            }
          }
        }
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "no-store",
    },
  });
}
