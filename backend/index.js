const {Firestore} = require('@google-cloud/firestore');
const functions = require('@google-cloud/functions-framework');

const db = new Firestore();

functions.http('submitFeedback', async (req, res) => {
  if (req.method !== 'POST') return res.status(405).send('Only POST allowed');

  const { message } = req.body;
  if (!message) return res.status(400).send('Message is required');

  await db.collection('feedbacks').add({
    message,
    timestamp: new Date().toISOString()
  });

  res.status(200).send('Feedback saved');
});
