import { createToken, createTokenEmail, verifyEmailToken } from '@/helpers/createToken';
import { hashPass } from '@/helpers/hashPassword';
import { sendResetPassEmail, sendReverificationEmail, sendVerificationEmail } from '@/helpers/nodemailer';
import { generateReferralCode } from '@/helpers/referralcode';
import { responseError } from '@/helpers/responseError';
import prisma from '@/prisma';
import { compare } from 'bcrypt';
import { Request, Response } from 'express';

const base_url = process.env.BASE_URL


export class BuyerController {
  async getBuyerByID(req: Request, res: Response) {
    try {
      const buyerData = await prisma.user.findUnique({
        where: {
          user_id: req.user.id,
        },
      });
      return res.status(200).send(buyerData);
    } catch (error) {
        responseError(res, error)
    }
  }

  async buyerAvatar(req: Request, res: Response) {
    try {
      const avatar = `${base_url}/public/avatar/${req.file?.filename}`
      
      await prisma.user.update({
        where: {user_id: req.user.id},
        data: {
          avatar: avatar
        }
      })
      
      return res.status(200).send({
        status: 'success',
        msg: 'avatar updated'
      })
    } catch (error) {
      
    }
  }

  async getCode(req: Request, res: Response) {
    try {
      const refCode = await prisma.referral.findUnique({
        where: {referrer_id: req.user.id}
      })

      return res.status(200).send(
      
        refCode
      )
    } catch (error) {
      responseError(res, error)
    }
  }
  
  async useCode(req: Request, res: Response) {
    try {
      const referredCode = await prisma.referral.findUnique({
        where: {referral_code: req.body.code}
      })

      if (referredCode) {
        const userData = await prisma.referral.update({
          where: {referrer_id: req.user.id},
          data: {
            referred_id: referredCode.referrer_id
          }
        })

        const referredDisc = await prisma.discount.create({
          data: {
            discount_code: `REFCODE${referredCode.referral_code}${userData.referral_code}`,
            discount_type: 'percentage',
            discount_value: 10,
            expires_at: new Date(Date.now() + 3 * 30 * 24 * 60 * 60 * 1000),
          }
        })

        const userDataDisc = await prisma.discount.create({
          data: {
            discount_code: `USEDCODE${referredCode.referral_code}${userData.referral_code}`,
            discount_type: 'percentage',
            discount_value: 10,
            expires_at: new Date(Date.now() + 3 * 30 * 24 * 60 * 60 * 1000),
          }
        })

        await prisma.voucher.create({
          data: {
            user_id: referredCode.referrer_id!,
            discount_id: referredDisc.discount_id,
            expires_at: referredDisc.expires_at
          }
        })

        const userDataVoucher =await prisma.voucher.create({
          data: {
            user_id: userData.referrer_id!,
            discount_id: userDataDisc.discount_id,
            expires_at: userDataDisc.expires_at
          }
        })

        await prisma.referral.update({
          where: {referrer_id: req.user.id},
          data: {
            reward_id: userDataVoucher.voucher_id
          }
        })
      } else throw 'Code not found'

      return res.status(200).send({
        status: 'ok',
        message: 'referral code has been applied'
      })

    } catch (error) {
      responseError(res, error)
    }
  }

  async changeMail(req: Request, res: Response) {
    try {
      const userdata = await prisma.user.findUnique({
        where: {user_id: req.user.id}
      })
      const newMail = req.body.email
      const token = createTokenEmail({
        id: userdata!.user_id,
        role: userdata!.role,
        email: newMail
      })
      
      sendReverificationEmail(newMail, token)

      return res.status(200).send({
        status: 'ok',
        msg: 'Please check your new email'
      })
    } catch (error) {
      responseError(res, error)
    }
  }

  async newEmailAddr(req: Request, res: Response) {
    const {token} = req.params
    try {
      const decoded = verifyEmailToken(token)
      
      await prisma.user.update({
        where: {user_id: decoded.id},
        data: {email: decoded.email}
      })

      return res.status(200).send({
        status: 'ok',
        msg: 'Email has been changed'
      })
    } catch (error) {
      responseError(res, error)
    }
  }
}
