import express from 'express';

import db from '../db/connection.js';

import { ObjectId } from 'mongodb';

const router = express.Router();

router.get('/', async (req, res) => {
  res.send('Hello World!');
});

router.get('/:id', async (req, res) => {
  let query = { _id: ObjectId(req.params.id) };
  res.send(`getting ${query}`);
});

router.post('/', async (req, res) => {
  let record = req.body;
  res.send(`posting ${record}`);
});

router.delete('/:id', async (req, res) => {
  let query = { _id: ObjectId(req.params.id) };
  res.send(`deleting ${query}`);
});

export default router;
