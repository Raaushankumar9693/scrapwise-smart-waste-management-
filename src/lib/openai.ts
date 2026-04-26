export interface ScrapAnalysisResult {
  material: string;
  quality: string;
  estimatedWeight: string;
  predictedPrice: string;
  confidence: number;
  description: string;
}

export async function analyzeScrapImage(base64DataUrl: string): Promise<ScrapAnalysisResult> {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  if (!apiKey) throw new Error('OpenAI API key not configured');

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o',
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'image_url',
              image_url: { url: base64DataUrl, detail: 'high' },
            },
            {
              type: 'text',
              text: `You are a scrap material valuation expert for the Indian market. Analyze this image and respond ONLY with a valid JSON object in this exact format, no extra text:
{
  "material": "Material type (e.g. Copper, Aluminum, Iron, Steel, Brass, E-Waste, Paper, Plastic, Glass, Mixed Metal)",
  "quality": "Grade A, Grade B, Grade C, or Mixed",
  "estimatedWeight": "Estimated weight (e.g. 10-15 kg)",
  "predictedPrice": "Price range in INR (e.g. ₹5,000 - ₹7,000)",
  "confidence": <integer 0-100>,
  "description": "1-2 sentences on material condition and price basis"
}
Use current Indian scrap market rates. If image does not show scrap material, set confidence to 0.`,
            },
          ],
        },
      ],
      max_tokens: 350,
    }),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.error?.message ?? `OpenAI error ${response.status}`);
  }

  const data = await response.json();
  const content: string = data.choices?.[0]?.message?.content ?? '';
  const match = content.match(/\{[\s\S]*\}/);
  if (!match) throw new Error('Unexpected AI response format');

  return JSON.parse(match[0]) as ScrapAnalysisResult;
}
