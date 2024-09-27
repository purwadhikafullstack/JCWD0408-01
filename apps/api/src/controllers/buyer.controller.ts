import { hashPass } from '@/helpers/hashPassword';
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

  async changePassword(req: Request, res: Response) {
    try {
      const userData = await prisma.user.findUnique({
        where: {user_id: req.user.id}
      })
  
      const validPass = await compare(req.body.password, userData!.password)
  
      if (!validPass) throw 'Password Incorrect!'
  
      const newPassword = req.body.newPassword

      const isSamePass = await compare(newPassword, userData!.password)

      if (isSamePass) throw "Can't use similar password"

      const hashedPassword = await hashPass(newPassword)
  
      await prisma.user.update({
        where: {user_id: req.user.id},
        data: {password: hashedPassword}
      })
  
      return res.status(200).send({
        msg: 'Password has been changed'
      })
    } catch (error) {
      responseError(res, error)
    }
  }
}
