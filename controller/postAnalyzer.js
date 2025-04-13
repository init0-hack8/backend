import { client, modelName } from './openaiCreds.js';
import { postAnalyzerData } from './prompt.js';

export async function analyzePosts(imageUrl) {
  let userPrompt;
  if (imageUrl) {
    userPrompt = [
        { type: "text", text: "Please give me what you have been asked!" },
        { type: "image_url", image_url: { url: imageUrl } }
      ];
  } else {
    userPrompt = [
        { type: "text", text: "Please give me what you have been asked!" },
      ];
  }

  const response = await client.chat.completions.create({
    model: modelName,
    messages: [
      { role: "system", content: postAnalyzerData },
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
