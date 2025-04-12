import { fetchPosts } from './firebaseSetting.js';
import { client, modelName } from './openaiCreds.js';

export async function analyzePosts(imageUrl) {
    const response = await client.chat.completions.create({
        messages: [
            { role:"system", content: `
                You are an advanced sentiment analysis and social trend detection AI.
                You will be given a user post containing the following:
                - A caption (textual content that may contain hashtags, opinions, or emotional expression)
                - An optional backstory (extra user context)
                - An image (represented via URL)

                Your job is to analyze the post and extract the following information in detail:

                1. **Sentiment**: Analyze overall sentiment — is it Positive, Negative, Neutral, or Mixed? Include sentiment confidence scores if available.

                2. **Tone**: Identify the tone — e.g., Joyful, Sarcastic, Nostalgic, Critical, Humorous, Motivational, Emotional, etc.

                3. **Keywords**: Extract key topics or hashtags, such as “mental health”, “startups”, “AI”, “friendship”, “fashion”, “graduation”, etc.

                4. **Category/Topic**: What category does this post fall under? (e.g., Personal Life, Technology, Mental Health, Career, Love, Entertainment)

                5. **Emotional Depth**: Does this post carry any emotionally strong or deep elements (like vulnerability, inspiration, heartbreak)? Rate it from 1–5.

                6. **Target Audience Age Group**: Based on the tone and content, which age groups are most likely to relate to it? (e.g., 13–17, 18–25, 25–34, 35–50)

                7. **Optional Recommendation**: Based on current trends, suggest 1–2 improvements to make this post more impactful or engaging.

                Return the result in the following ** JSON format** Only return the JSON object. Do not include markdown, explanation, or any additional text.:
                {
                "sentiment": "Positive",
                "sentiment_score": 0.91,
                "tone": ["Joyful", "Nostalgic"],
                "keywords": ["graduation", "farewell", "friends"],
                "category": "Personal Life",
                "emotional_depth": 4,
                "audience_age_group": ["18-25", "25-34"],
                "recommendations": [
                    "Add a relevant hashtag like #GraduationVibes",
                    "Include a quote to make the post more relatable"
                ]
                }
            ` },
            { role:"user", content: [
                { type: "text", text: "Please give me what you have been asked!" },
                { type: "image_url", image_url: { url: imageUrl } }
            ] }
        ],
            max_tokens: 4096,
            temperature: 1,
            top_p: 1,
            model: modelName
        });
        
        if (response?.error !== undefined && response.status !== "200") {
        throw response.error;
    }
    return response.choices[0].message.content;
}