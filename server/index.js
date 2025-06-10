// Basic Express server for mofl
// Handles magic link authentication and transaction CRUD
const express = require('express');
const jwt = require('jsonwebtoken');
const { Pool } = require('pg');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const pool = new Pool(); // uses environment variables for config

app.use(bodyParser.json());

// Middleware to authenticate requests with JWT token in Authorization header
function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'Missing token' });
  const token = authHeader.replace('Bearer ', '');
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload;
    next();
  } catch (e) {
    res.status(401).json({ error: 'Invalid token' });
  }
}

// POST /api/auth/login - generate magic link token (in real app email would be sent)
app.post('/api/auth/login', async (req, res) => {
  const { email, name } = req.body;
  if (!email || !name) return res.status(400).json({ error: 'Missing fields' });
  // In a real implementation we would create user if not exists and email a magic link
  const token = jwt.sign({ email, name }, process.env.JWT_SECRET, { expiresIn: '1h' });
  console.log(`Magic link for ${email}: http://localhost:${process.env.PORT}/api/auth/verify?token=${token}`);
  res.json({ message: 'Magic link generated. Check server log for token.' });
});

// GET /api/auth/verify - verify magic link token and return JWT for session
app.get('/api/auth/verify', (req, res) => {
  const { token } = req.query;
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    // Issue a new token used for authenticated requests
    const sessionToken = jwt.sign({ email: payload.email }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token: sessionToken });
  } catch (e) {
    res.status(400).json({ error: 'Invalid or expired token' });
  }
});

// Transactions CRUD
app.get('/api/transactions', authMiddleware, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM transactions WHERE user_email = $1 ORDER BY date DESC', [req.user.email]);
    res.json(result.rows);
  } catch (e) {
    res.status(500).json({ error: 'Database error' });
  }
});

app.post('/api/transactions', authMiddleware, async (req, res) => {
  const { amount, date, category, source, description } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO transactions (user_email, amount, date, category, source, description) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *',
      [req.user.email, amount, date, category, source, description]
    );
    res.json(result.rows[0]);
  } catch (e) {
    res.status(500).json({ error: 'Database error' });
  }
});

app.put('/api/transactions/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  const { amount, date, category, source, description } = req.body;
  try {
    const result = await pool.query(
      'UPDATE transactions SET amount=$1, date=$2, category=$3, source=$4, description=$5 WHERE id=$6 AND user_email=$7 RETURNING *',
      [amount, date, category, source, description, id, req.user.email]
    );
    res.json(result.rows[0]);
  } catch (e) {
    res.status(500).json({ error: 'Database error' });
  }
});

app.delete('/api/transactions/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM transactions WHERE id=$1 AND user_email=$2', [id, req.user.email]);
    res.json({ id });
  } catch (e) {
    res.status(500).json({ error: 'Database error' });
  }
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
