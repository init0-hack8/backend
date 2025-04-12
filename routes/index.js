import express from 'express';
const router = express.Router();
import { fetchPosts } from '../controller/firebaseSetting.js';
import { analyzePosts } from '../controller/postAnalyzer.js';

router.get('/api/image-info', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date() });
});

router.get('/api/posts', async (req, res) => {
    const posts = await fetchPosts();
    res.json(posts);
});

router.get('/api/analyze-post', async (req, res) => {
  const posts = await fetchPosts();
  let analysis = await analyzePosts(posts[0].imageUrls[0]);
  analysis = analysis.replace(/```json|```/g, '').trim()
  res.json(JSON.parse(analysis));
});

export default router; 