import { Router, Request, Response } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const login = async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body;

  try {
    // Find the user
    const user = await User.findOne({ where: { username } });
    
    if (!user) {
      res.status(401).json({ message: 'Invalid username or password' });
      return;
    }

    // Check password
    const validPassword = await bcrypt.compare(password, user.password);
    
    if (!validPassword) {
      res.status(401).json({ message: 'Invalid username or password' });
      return;
    }

    // Generate JWT
    const token = jwt.sign(
      { username: user.username },
      process.env.JWT_SECRET_KEY as string,
      { expiresIn: '24h' } // Token expires in 24 hours
    );

    // Return token
    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        username: user.username
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const router = Router();

// POST /login - Login a user
router.post('/login', login);

export default router;
