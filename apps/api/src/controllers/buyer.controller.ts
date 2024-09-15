import { responseError } from '@/helpers/responseError';
import prisma from '@/prisma';
import { Request, Response } from 'express';

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
}
