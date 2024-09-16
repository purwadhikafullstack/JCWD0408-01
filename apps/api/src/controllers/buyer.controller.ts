import { responseError } from '@/helpers/responseError';
import prisma from '@/prisma';
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
}
