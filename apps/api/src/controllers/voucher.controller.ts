import { responseError } from '@/helpers/responseError';
import prisma from '@/prisma';
import { Request, Response } from 'express';

export class VoucherController {
  async getVoucherByUser(req: Request, res: Response) {
    try {
      const userVoucher = await prisma.voucher.findMany({
        where: {
          user_id: req.user.id,
          discount: {
            NOT: {
              OR: [
                { discount_code: { startsWith: 'USEDCODE' } },
                { discount_code: { startsWith: 'REFCODE' } },
              ],
            },
          },
        },
        include: {
          discount: true,
        },
      });
      return res.status(200).send({
        status: 'ok',
        userVoucher,
      });
    } catch (error) {
      responseError(res, error);
    }
  }

  async getVoucherRefCode(req: Request, res: Response) {
    try {
      const userVoucher = await prisma.voucher.findMany({
        where: { user_id: req.user.id },
      });

      const discountCodes = [];

      for (const voucher of userVoucher) {
        const discount = await prisma.discount.findUnique({
          where: {
            discount_id: voucher.discount_id,
          },
        });

        if (discount) {
          discountCodes.push(discount);
        }
      }
      return res.status(200).send({
        status: 'ok',
        discountCodes,
      });
    } catch (error) {
      responseError(res, error);
    }
  }
}
