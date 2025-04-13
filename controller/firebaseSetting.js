import fs from 'fs';
import admin from 'firebase-admin';

const serviceAccount = JSON.parse(fs.readFileSync('./firebase_key.json', 'utf-8'));

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

const db = admin.firestore();

async function fetchPosts() {
  const snapshot = await db.collection("post").get();
  const posts = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
  return posts;
}

async function checkPostIdExist(postId){
    const analysisRef = db.collection('result').doc(postId);
    const doc = await analysisRef.get();
    if (doc.exists) {
        console.log('Analysis already exists for post:', postId);
        return true;
    }
    return false;
}


async function saveAnalysisResult(postId, sentimentData) {
    try {
      const analysisRef = db.collection('result').doc(postId);
      const doc = await analysisRef.get();
  
      if (doc.exists) {
        console.log('Analysis already exists for post:', postId);
        return false;
      }
  
      // If sentimentData is already an object, don't parse it again!
      await analysisRef.set({
        ...sentimentData, // This is the fullResult object
      });
  
      console.log('Analysis saved successfully for post:', postId);
      return true;
    } catch (error) {
      console.error('Error saving analysis:', error);
      throw error;
    }
  }
  

export { db, fetchPosts, saveAnalysisResult, checkPostIdExist };