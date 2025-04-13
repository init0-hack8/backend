const scrapingPrompt = `
                You are a social intelligence AI analyzing online audience reactions.

                Search across platforms (X/Twitter, Reddit, news articles, and forums) for posts and user discussions related to the following user-generated content:

                ---
                📝 POST CONTEXT:

                - **Keywords**: Valentine's Day, love, celebration, NVIDIA
                - **Tone**: Joyful, Affectionate
                - **Category**: Entertainment
                - **Emotional Depth**: 3/5
                - **Target Age Groups**: 18-25, 25-34
                also the age group can be varying or dynamic depending upon post
                healthcare related posts are good for older people or newborn baby!
                ---
                Ensure the analysis considers **seasonal and current relevance**. For example, a Valentine's Day post in February is timely, but one in July is not. If the post is **not relevant to current trends**, explain that briefly.
                Your task is to extract and return detailed, structured insights about audience reactions, engagement styles, and platform-specific patterns based on the above context.

                🎯 Please return the following sections as JSON:

                1. **Trending Hashtags and Topics**
                - From Twitter, Reddit, or news headlines related to the given keywords and tone.
                - Include associated engagement metrics (likes, retweets, upvotes if available).

                2. **Public Reactions Summary**
                - Summarize the general sentiment and emotional tone of audience responses across platforms.
                - Capture quotes or paraphrased patterns (e.g. “Users say NVIDIA’s post felt authentic and wholesome”).

                3. **Platform Engagement Styles**
                - Describe how different platforms respond to this theme:
                    - e.g., “Reddit users prefer deeper discussion”, “Twitter users amplify with memes”
                - Note whether responses are image-heavy, video-heavy, sarcastic, poetic, meme-based, etc.

                4. **Audience Demographics**
                - Try mapping responses to age groups, e.g.:
                    - “18-24 respond well to tech-brand humor and memes”
                    - “25-34 respond emotionally to nostalgia and celebration posts”

                5. **Emotional Resonance Score**
                - From 1 to 5, how deeply emotional the public response is.
                - Optionally include if certain tones (affection, joy) were more prominent.

                6. **Cultural and Seasonal Relevance**
                - Is this trending due to current events? (e.g., Valentine’s Day)
                - Is it culturally specific (e.g., specific country demographics)?

                7. **Suggested Enhancements**
                - Based on grounded data, suggest 2–3 ways the user can improve post impact (hashtags, call-to-actions, tone shifts, meme styles).

                8. **Sentiment Distribution**
                - Return breakdown of sentiment based on found data:
                    {
                    "positive": 72,
                    "neutral": 20,
                    "negative": 8
                    }

                Please respond in the following **JSON format** :
                {
                "trending_hashtags": ["#LoveFromNVIDIA", "#ValentinesDay2025", "#GamingAndLove"],
                "public_reactions": [
                    "Users appreciated the blend of tech and emotional storytelling",
                    "Some joked about falling in love with GPUs",
                    "Redditors shared stories of how gaming bonded their relationships"
                ],
                "platform_engagement": {
                    "twitter": "High engagement with memes and short reactions",
                    "reddit": "Long-form emotional stories with nostalgic tone",
                    "news": "Coverage on NVIDIA's brand campaign success"
                },
                "audience_demographics": {
                    "18-25": ["engaged via humor and light memes"],
                    "25-34": ["shared heartfelt experiences and commented on nostalgia"],
                    "35-44": ["appreciated brand values and legacy references"]
                },
                "emotional_resonance": 4,
                "cultural_seasonality": {
                    "active": true,
                    "reason": "Valentine's Day campaigns and brand moments",
                    "regions": ["US", "India", "UK"]
                },
                "recommendations": [
                    "Add a themed giveaway hashtag like #LoveFromNVIDIA",
                    "Include a poll or meme template to increase engagement"
                ],
                "sentiment_distribution": {
                    "positive": 78,
                    "neutral": 15,
                    "negative": 7
                }
                }
`

const groupingData = `

    You are an Audience Behavior Modeling AI trained to analyze online reactions and match content with the most likely engaged age groups.

    You will be given structured analysis of a social media post that includes tone, emotional depth, keywords, category, and public sentiment distribution. Your job is to map which audience segments (by age group) are most likely to respond to it and how.

    ---

    🧠 POST INSIGHTS:

    - **Tone**: Joyful, Affectionate  
    - **Keywords**: Valentine's Day, love, NVIDIA, celebration  
    - **Category**: Corporate Celebration  
    - **Emotional Depth**: 3/5  
    - **Audience Age Groups (Step 2)**:  
    - 18-25: Engage with humor and graphics  
    - 25-34: Appreciate design and tech-linked memories  
    - 35-50: Comment on brand and product capabilities  
    - **Platform Observations**:  
    - Twitter: Light memes, fast engagement  
    - Reddit: Long emotional threads and project showcases  
    - News: Discusses campaign effectiveness  

    ---

    🎯 Your Task:

    Use this information to perform **audience reaction modeling**. Please return the result in the following JSON format:

    {
    "audience_model": {
        "13-17": {
        "reaction_type": "Light meme engagement",
        "interest_keywords": ["humor", "graphics"],
        "likelihood": "low"
        },
        "18-25": {
        "reaction_type": "Strong humor and tech-meme response",
        "interest_keywords": ["Valentine's Day", "NVIDIA", "memes", "visuals"],
        "likelihood": "high"
        },
        "25-34": {
        "reaction_type": "Emotional + nostalgic tech/design appreciation",
        "interest_keywords": ["love", "graphic design", "personal tech stories"],
        "likelihood": "high"
        },
        "35-50": {
        "reaction_type": "Brand-focused, technical engagement",
        "interest_keywords": ["NVIDIA", "performance", "graphic tools"],
        "likelihood": "moderate"
        }
    },
    "general_observations": [
        "Humor and visual content performs best with 18-25",
        "Emotional nostalgia resonates with 25-34 through design and storytelling",
        "Technical validation and brand affinity matter more to 35-50"
    ],
    "content_strategy_recommendations": [
        "Use relatable humor and meme-friendly formats for younger demographics",
        "Include emotionally-resonant visuals with light storytelling to engage 25-34",
        "Provide behind-the-scenes tech/design breakdowns to draw in older enthusiasts"
    ]
    }

    💡 Be realistic and context-aware: if the post’s theme is out of season (e.g., Valentine's Day in August), reduce engagement likelihood accordingly, and mention it.


`

const postAnalyzerData = `
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
`

const pushDataModelPrompt = `
You are a highly skilled Social Media Content Analyst AI.

You will be given audience modeling and platform behavior data for a user-generated post. This includes how different age groups react, content preferences, sentiment distribution, and public reaction summaries.

🎯 Your task is to **enrich this data** by generating a **comprehensive content impact analysis**, formatted in structured JSON. You are expected to evaluate and summarize the post's success potential, audience resonance, and engagement behavior.

--- 
🧠 Input data includes:
- audience_model: contains how each age group reacts (their tone, interests, likelihood)
- general platform engagement behavior (Twitter, Reddit, Instagram, LinkedIn, YouTube Shorts)
- sentiment_distribution
- user reactions (paraphrased)
- hashtag metadata
- summary of strategy (should_post_now, seasonal fit, status, etc.)
- recommendations (improvements, content strategy tips)

---

🎯 Output format (fill in the values accurately from the data):

{
  "audience_segmentation": {
    "13-17": {
      "reaction_type": "Describe the nature of engagement from this age group",
      "interest_keywords": ["Extract key interests"],
      "preferred_content": ["What format works best (memes, GIFs, polls, etc.)"],
      "likelihood": "low | moderate | high"
    },
    "18-25": {
      "reaction_type": "e.g., humor, memes, light storytelling",
      "interest_keywords": ["Pull from user interests like memes, gaming, tech"],
      "preferred_content": ["reels", "threads", "graphics"],
      "likelihood": "low | moderate | high"
    },
    "25-34": {
      "reaction_type": "Describe their emotional/tech-driven engagement",
      "interest_keywords": ["e.g., nostalgia, product reviews, life milestones"],
      "preferred_content": ["quotes", "design carousels", "video breakdowns"],
      "likelihood": "low | moderate | high"
    },
    "35-50": {
      "reaction_type": "Brand validation or professional insight",
      "interest_keywords": ["e.g., design quality, technical metrics, reliability"],
      "preferred_content": ["professional posts", "infographics"],
      "likelihood": "low | moderate | high"
    }
  },
  "platform_engagement_styles": {
    "twitter": "What type of engagement style is seen (memes, trends, fast replies)",
    "reddit": "Summarize deeper discussion style and how sentiment is expressed",
    "instagram": "Describe visual engagement – reels, carousels, stories",
    "linkedin": "Tone/style of professional or story-based posts",
    "youtube_shorts": "Humor, trend-based content, short clips"
  },
  "sentiment_distribution": {
    "positive": "% derived from audience tone and reaction",
    "neutral": "neutral share",
    "negative": "negative share"
  },
  "public_reactions": [
    "Paraphrased or quoted summaries of public response across platforms",
    "e.g., 'Users joked about loving their GPU', 'Redditors shared nostalgic stories'..."
  ],
  "hashtag_intelligence": {
    "#RelevantHashtag": {
      "type": "seasonal | brand | niche | creative",
      "popularity": "low | moderate | high | very high"
    }
  },
  "post_strategy_summary": {
    "should_post_now": "true | false (based on trend + cultural timing)",
    "seasonal_fit": "Explain if the content fits the time/season",
    "ideal_audience": ["age groups most aligned with reactions"],
    "enhancement_needed": "String (e.g., 'Add humor and use trending CTA')",
    "status": "Descriptive (e.g., '✅ Great timing with Valentine's campaign')"
  },
  "recommended_actions": [
    "Short actionable strategies (add poll, use certain hashtags, visual tweak)",
    "Platform-specific ideas (Reddit AMA, meme challenge, etc.)"
  ]
}

📌 Please return ONLY the JSON output. No commentary, no markdown.
`


const sentimentPrompt = `

    You are an intelligent social sentiment evaluator AI.

    Below is user-generated content analysis from Step 3 of a social media analysis pipeline. It includes audience reactions by age group, general insights, and content strategy recommendations.

    Your task is to analyze it and assign **universal emotional and performance scores** across five key content dimensions. These will be used to visually evaluate the strength of the content.

    ---

    🎯 Please return scores on a 0–100 scale or 0–10 scale (either is acceptable) for the following:

    1. **Emotional Impact**  
    - How emotionally resonant is the content based on public reactions?
    - Consider empathy, nostalgia, inspiration, humor, vulnerability, etc.

    2. **Engagement Level**  
    - How actively is the audience interacting? (likes, shares, comments)
    - Use mentions of “strong engagement”, “active responses”, or “polls”.

    3. **Virality Potential**  
    - How shareable, meme-able, or replicable is the post?
    - Look for phrases like “tech memes”, “meme templates”, “humor”, or viral cues.

    4. **Topical Relevance**  
    - How relevant is the post to ongoing trends, holidays, or events?
    - Look for seasonal moments (e.g., Valentine’s Day) or current brand campaigns.

    5. **Content Richness**  
    - How complete is the post? Does it tell a story or include visuals/multimedia?
    - Check for storytelling, visuals, backstory, call-to-action, design.

    I only need json and nothing else!
    ---

    📌 Example output format:
    {
    "emotional_impact": 80,
    "engagement_level": 85,
    "virality_potential": 90,
    "topical_relevance": 92,
    "content_richness": 78
    }
`


export { scrapingPrompt, groupingData, postAnalyzerData, sentimentPrompt, pushDataModelPrompt };