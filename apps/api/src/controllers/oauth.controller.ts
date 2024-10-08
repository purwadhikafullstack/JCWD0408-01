import { generateReferralCode } from '@/helpers/referralcode';
import { responseError } from '@/helpers/responseError';
import { LoginGoogleServices } from '@/helpers/supabase';
import prisma from '@/prisma';
import { NextFunction, Request, Response } from 'express';

export class OAuthController {
  async LoginGoogle(req: Request, res: Response) {
    try {
      const { email, avatar, first_name } = req.body;
      const { userData, token } = await LoginGoogleServices(
        email,
        avatar,
        first_name,
      );

      const userRef = await prisma.referral.findUnique({
        where: { referrer_id: userData.user_id },
      });

      if (!userRef) {
        let refCode: string;
        let isUnique = false;

        do {
          refCode = generateReferralCode();

          const currentRef = await prisma.referral.findUnique({
            where: { referral_code: refCode },
          });

          if (!currentRef) {
            isUnique = true;
          }
        } while (!isUnique);

        await prisma.referral.create({
          data: {
            referrer_id: userData.user_id,
            referral_code: refCode,
          },
        });
      }

      return res.status(200).send({ userData, token });
    } catch (error) {
      responseError(res, error);
    }
  }
}
