import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user';
import Role from '../models/role';

const JWT_SECRET = process.env.JWT_SECRET || 'super_secret_key_123';


export const register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const defaultRole = await Role.findOne({ name: 'user' });
  try {
    const { email, username, password, fullname, phone } = req.body;

    if (!email || !password || !username || !fullname) {
      res.status(400).json({ message: 'Semua field wajib diisi' });
      return;
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400).json({ message: 'Email sudah terdaftar' });
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      fullname,
      username,
      email,
      password: hashedPassword,
      role_id: DEFAULT_USER_ROLE_ID, // hardcode, bukan dari req.body
      phone
    });

    res.status(201).json({
      message: 'Registrasi berhasil',
      userId: newUser._id
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ message: 'Email atau password salah' });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ message: 'Email atau password salah' });
      return;
    }

    const token = jwt.sign(
      { userId: user._id, role_id: user.role_id },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({
      message: 'Login berhasil',
      token,
      user: {
        userId: user._id,
        fullname: user.fullname,
        username: user.username,
        email: user.email,
        role_id: user.role_id
      }
    });
  } catch (error) {
    next(error);
  }
};