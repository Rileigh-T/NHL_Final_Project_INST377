// routes.js
import express from 'express';
import { supabase } from './supabasesampleApp/index.js';

const router = express.Router();

router.get('/api/player', async (req, res) => {
  const { name } = req.query;
  const { data, error } = await supabase
    .from('player comparison') // Replace with your player stats table
    .select('Player, G, A, P')
    .ilike('Player', `%${name}%`);

  if (error) return res.status(500).json({ error: error.message });
  if (!data || data.length === 0) return res.status(404).json({ message: 'Player not found' });

  res.json(data[0]);
});

router.post('/api/review', async (req, res) => {
  const { player_name, review_text } = req.body;
  const { error } = await supabase
    .from('player_reviews')  // Replace with your review table name
    .insert([{ player_name, review_text }]);

  if (error) return res.status(500).json({ error: error.message });
  res.json({ message: 'Review successfully added.' });
});

export default router;
