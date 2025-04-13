import express from 'express';
const router = express.Router();
import { fetchPosts, saveAnalysisResult, checkPostIdExist } from '../controller/firebaseSetting.js';
import { analyzePosts } from '../controller/postAnalyzer.js';
import { mapScrapedDataToAudience } from '../controller/mappingData.js';
import getScrapedData from '../controller/GetScrapingData.js';
import { groupingData, sentimentPrompt, pushDataModelPrompt } from '../controller/prompt.js';

router.get('/api/image-info', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date() });
});

router.get('/api/posts', async (req, res) => {
    const posts = await fetchPosts();
    res.json(posts);
});

router.get('/api/analyze-post', async (req, res) => {
  try {
    const posts = await fetchPosts();
    let results = [];

    for (const post of posts) {

      if(checkPostIdExist(post.id) == true){
        continue;
      }

      let combinedAnalysis = '';

      // Handle multiple images per post safely
      for (const imgURL of post.imageUrls) {
        const singleAnalysis = await analyzePosts(imgURL);
        if (singleAnalysis) {
          combinedAnalysis += singleAnalysis + '\n';
        }
      }


      const scrapedData = await getScrapedData(combinedAnalysis);
      const mappingData = await mapScrapedDataToAudience(scrapedData, groupingData);

      let newData = await mapScrapedDataToAudience(mappingData, pushDataModelPrompt);
      newData = newData.replace(/```json|```/g, '').trim();

      let sentimentData = await mapScrapedDataToAudience(mappingData, sentimentPrompt);
      sentimentData = sentimentData.replace(/```json|```/g, '').trim();

      const parsedNewData = JSON.parse(newData);
      const parsedSentiment = JSON.parse(sentimentData);

      const fullResult = {
        postId: post.id,
        ...parsedNewData,
        sentiment_summary: parsedSentiment,
        analyzedAt: new Date().toISOString()
      };

      // Save to Firebase (skips if already analyzed)
      await saveAnalysisResult(post.id, fullResult);
      console.log(`✅ Analysis saved for post: ${post.id}`);
      results.push(fullResult);
    }

    res.json(results);
  } catch (error) {
    console.error('❌ Error in analyze-post:', error);
    res.status(500).json({ error: 'Analysis failed', details: error.message });
  }
});


export default router;