import { sign } from 'jsonwebtoken';

export interface Ipayload {
  id: number;
  role: string;
}

const key = process.env.SECRET_KEY || 'Temporarykey';

export const createToken = (payload: Ipayload) => {
  try {
    const token = sign(payload, key, { expiresIn: '1h' });
    return token;
  } catch (error) {
    console.error("Error creating token:", error);
    throw new Error("Token generation failed");
  }
};
