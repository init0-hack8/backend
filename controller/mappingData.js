import { client, modelName } from './openaiCreds.js';

export async function mapScrapedDataToAudience(scrapedData, systemData) {
  if (!scrapedData) throw new Error("Scraped data is required");

  const userPrompt = [
    {
      type: "text",
      text: `Use this to give me what is asked to do : ${scrapedData}`
    }
  ];

  const response = await client.chat.completions.create({
    model: modelName,
    messages: [
      { role: "system", content: systemData },
      { role: "user", content: userPrompt }
    ],
    max_tokens: 4096,
    temperature: 1,
    top_p: 1
  });

  if (response?.error !== undefined && response.status !== "200") {
    throw response.error;
  }

  return response.choices?.[0]?.message?.content;
}
