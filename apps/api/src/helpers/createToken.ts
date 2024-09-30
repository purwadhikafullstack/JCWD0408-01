import { sign, verify } from 'jsonwebtoken';

export interface Ipayload {
  id: number;
  role: string;
}

export interface IpayloadMail {
  id: number,
  role: string,
  email: string
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

export const createLoginToken = (payload: Ipayload) => {
  try {
    const token = sign(payload, key, { expiresIn: '24h' });
    return token;
  } catch (error) {
    console.error("Error creating token:", error);
    throw new Error("Token generation failed");
  }
};


export const createTokenEmail = (payload: IpayloadMail) => {
  try {
    const token = sign(payload, key, {expiresIn: '24h'})
    return token
  } catch (error) {
    console.error("Error creating token:", error);
    throw new Error("Token generation failed");
  }
}

export const verifyEmailToken = (token: string) => {
  try {
    const decoded = verify(token, key) as IpayloadMail;
    return decoded
  } catch (error) {
    console.error("Error verifying email token:", error);
    throw new Error("Email token verification failed");
  }
};
