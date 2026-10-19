require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./db');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.get('/', (_req, res) => res.json({ message: 'Portfolio API is running', endpoints: ['/api/portfolio', '/api/portfolio/:id'] }));

c;
function validate(body) {
  if (!body.owner_name || !String(body.owner_name).trim()) return 'owner_name is required';
  if (!body.headline || !String(body.headline).trim()) return 'headline is required';
  if (!body.bio || !String(body.bio).trim()) return 'bio is required';
  return null;
}

// GET all portfolio records
app.get('/api/portfolio', (_req, res) => {
  res.json(db.prepare('SELECT * FROM portfolio ORDER BY id DESC').all());
});

// GET one portfolio record
app.get('/api/portfolio/:id', (req, res) => {
  const record = db.prepare('SELECT * FROM portfolio WHERE id = ?').get(Number(req.params.id));
  if (!record) return res.status(404).json({ error: 'Portfolio record not found' });
  res.json(record);
});

// POST create a record
app.post('/api/portfolio', (req, res) => {
  const error = validate(req.body);
  if (error) return res.status(400).json({ error });
  const data = Object.fromEntries(fields.map((f) => [f, req.body[f] == null ? '' : String(req.body[f])]));
  const result = db.prepare(`INSERT INTO portfolio (${fields.join(', ')}) VALUES (${fields.map(() => '?').join(', ')})`).run(fields.map(f => data[f]));
  const record = db.prepare('SELECT * FROM portfolio WHERE id = ?').get(result.lastInsertRowid);
  res.status(201).json(record);
});

// PUT update a record
app.put('/api/portfolio/:id', (req, res) => {
  const id = Number(req.params.id);
  const existing = db.prepare('SELECT * FROM portfolio WHERE id = ?').get(id);
  if (!existing) return res.status(404).json({ error: 'Portfolio record not found' });
  const merged = { ...existing, ...req.body };
  const error = validate(merged);
  if (error) return res.status(400).json({ error });
  const data = Object.fromEntries(fields.map((f) => [f, merged[f] == null ? '' : String(merged[f])]));
  db.prepare(`UPDATE portfolio SET ${fields.map(f => `${f} = @${f}`).join(', ')}, updated_at = CURRENT_TIMESTAMP WHERE id = @id`).run({ ...data, id });
  res.json(db.prepare('SELECT * FROM portfolio WHERE id = ?').get(id));
});

// DELETE a record
app.delete('/api/portfolio/:id', (req, res) => {
  const result = db.prepare('DELETE FROM portfolio WHERE id = ?').run(Number(req.params.id));
  if (!result.changes) return res.status(404).json({ error: 'Portfolio record not found' });
  res.json({ message: 'Portfolio record deleted successfully', id: Number(req.params.id) });
});

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});
app.listen(PORT, () => console.log(`Portfolio API running at http://localhost:${PORT}`));
