import { createToken } from '@/helpers/createToken';
import { hashPass } from '@/helpers/hashPassword';
import { responseError } from '@/helpers/responseError';
import prisma from '@/prisma';
import { compare } from 'bcrypt';
import { Request, Response } from 'express';

export class AuthController {
  async createBuyerData(req: Request, res: Response) {
    try {
      const buyerData = await prisma.user.findFirst({
        where: {
          OR: [{ username: req.body.username }, { email: req.body.email }],
        },
      });

      if (buyerData?.username == req.body.username) throw 'username is taken';
      if (buyerData?.email == req.body.email)
        throw 'email address has been used';

      const password = await hashPass(req.body.password);

      const newBuyerData = await prisma.user.create({
        data: { ...req.body, password, role: 'buyer' },
      });

      // const token = createToken({
      //   id: newBuyerData.user_id,
      //   role: (newBuyerData.role = 'buyer'),
      // });

      return res.status(201).send({
        status: 'ok',
        msg: "You've Successfully Signed Up!",
        newBuyerData,
      });
    } catch (error) {
      responseError(res, error);
    }
  }

  async loginBuyer(req: Request, res: Response) {
    try {
      const buyer = await prisma.user.findFirst({
        where: { OR: [{ username: req.body.data }, { email: req.body.data }] },
      });
      if (!buyer) throw 'User Not Found';
      const validPass = await compare(req.body.password, buyer.password);
      if (!validPass) throw 'Password Incorrect';
      const token = createToken({
        id: buyer.user_id,
        role: (buyer.role = 'buyer'),
      });
      return res
        .status(201)
        .send({ status: 'ok', msg: 'login success', token, buyer });
    } catch (error) {
      responseError(res, error);
    }
  }

  async createStoreAdmin(req: Request, res: Response) {
    try {
      const strAdminData = await prisma.user.findFirst({
        where: {
          OR: [{ username: req.body.username }, { email: req.body.email }],
        },
      });

      if (strAdminData?.username == req.body.username)
        throw 'username is taken';
      if (strAdminData?.email == req.body.email)
        throw 'email address has been used';

      const password = await hashPass(req.body.password);

      const newStrAdminData = await prisma.user.create({
        data: { ...req.body, password, role: 'store_admin' },
      });

      const token = createToken({
        id: newStrAdminData.user_id,
        role: (newStrAdminData.role = 'store_admin'),
      });

      return res.status(201).send(newStrAdminData);
    } catch (error) {
      responseError(res, error);
    }
  }

  async loginStoreAdmin(req: Request, res: Response) {
    try {
      const strAdmin = await prisma.user.findFirst({
        where: {
          OR: [{ username: req.body.username }, { email: req.body.email }],
        },
      });

      if (!strAdmin) throw 'User Not Found';

      const validPass = await compare(req.body.password, strAdmin.password);
      if (!validPass) throw 'Password Incorrect';

      const token = createToken({
        id: strAdmin.user_id,
        role: (strAdmin.role = 'store_admin'),
      });

      res.status(200).send({
        status: 'ok',
        msg: 'login success',
        token,
        strAdmin,
      });
    } catch (error) {
      responseError(res, error);
    }
  }

  async userVerification(req: Request, res: Response) {
    try {
      const userData = await prisma.user.findUnique({
        where: {
          user_id: req.user.id,
        },
      });
    } catch (error) {}
  }
}
