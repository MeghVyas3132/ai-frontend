import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from './db';
import bcrypt from 'bcrypt';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'GET':
      return handleGet(req, res);
    case 'POST':
      return handlePost(req, res);
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

// GET /api/v1/users - Fetches all users
async function handleGet(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { rows } = await db.query(
      'SELECT id, email, full_name, created_at FROM users ORDER BY created_at DESC'
    );
    return res.status(200).json(rows);
  } catch (error) {
    console.error('Error fetching users:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}

// POST /api/v1/users - Creates a new user
async function handlePost(req: NextApiRequest, res: NextApiResponse) {
  const { email, password, fullName } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: 'Email and password are required.' });
  }

  try {
    // Hash the password for security
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const query = `
      INSERT INTO users (email, password_hash, full_name)
      VALUES ($1, $2, $3)
      RETURNING id, email, full_name, created_at;
    `;
    const values = [email, passwordHash, fullName];

    const { rows } = await db.query(query, values);

    return res.status(201).json(rows[0]);
  } catch (error: any) {
    console.error('Error creating user:', error);
    // Check for unique constraint violation (duplicate email)
    if (error.code === '23505') {
      return res.status(409).json({ message: 'Email already exists.' });
    }
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}