import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { hashPass } from '@/helpers/hashPassword';
import { createToken } from '@/helpers/createToken';
import { compare } from 'bcrypt';

const prisma = new PrismaClient();

export class OAuthController {
  // Function to handle user registration
  async signUp(req: Request, res: Response) {
    const { email, password, first_name, last_name, phone } = req.body;

    try {
      // Hash the password
      const hashedPassword = await hashPass(password);

      // Create a new user in the database
      const newUser = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          phone,
          first_name,
          last_name, // last_name is optional
          role: 'buyer', // Default role, adjust as needed
          verified: false, // Assuming a default value for verification
        },
      });

      // Create JWT token
      const token = createToken({ id: newUser.user_id, role: newUser.role });

      // Set the token in a cookie
      res.cookie('sessionToken', token, {
        httpOnly: true, // Mitigates XSS
        secure: process.env.NODE_ENV === 'production', // Set to true in production
        maxAge: 60 * 60 * 24 * 7, // 1 week
      });

      return res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
      console.error('Error signing up:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  // Function to handle user sign-in
  async signIn(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
      // Find user by email
      const user = await prisma.user.findUnique({ where: { email } });

      if (!user) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      // Implement password comparison (assuming you have a comparePass function)
      const isValid = await compare(password, user.password); // Implement comparePass in helpers

      if (!isValid) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      // Create JWT token
      const token = createToken({ id: user.user_id, role: user.role });

      // Set the token in a cookie
      res.cookie('sessionToken', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 7, // 1 week
      });

      return res.status(200).json({ message: 'User signed in successfully', user });
    } catch (error) {
      console.error('Error signing in:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}
