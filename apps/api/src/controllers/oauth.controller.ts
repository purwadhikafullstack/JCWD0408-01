import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { hashPass } from '@/helpers/hashPassword';
import { createToken } from '@/helpers/createToken';
import { compare } from 'bcrypt';

const prisma = new PrismaClient();

export class OAuthController {
  async signUp(req: Request, res: Response) {
    const { email, password, first_name, last_name, phone } = req.body;

    try {
      const hashedPassword = await hashPass(password);

      const newUser = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          phone,
          first_name,
          last_name,
          role: 'buyer',
          verified: false,
        },
      });

      const token = createToken({ id: newUser.user_id, role: newUser.role });

      res.cookie('sessionToken', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 7,
      });

      return res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
      console.error('Error signing up:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async signIn(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
      const user = await prisma.user.findUnique({ where: { email } });

      if (!user) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      const isValid = await compare(password, user.password);

      if (!isValid) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      const token = createToken({ id: user.user_id, role: user.role });

      res.cookie('sessionToken', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 7,
      });

      return res.status(200).json({ message: 'User signed in successfully', user });
    } catch (error) {
      console.error('Error signing in:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}
