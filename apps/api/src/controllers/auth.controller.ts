import { createToken, Ipayload } from '@/helpers/createToken';
import { hashPass } from '@/helpers/hashPassword';
import { sendVerificationEmail, transporter } from '@/helpers/nodemailer';
import { responseError } from '@/helpers/responseError';
import prisma from '@/prisma';
import { compare } from 'bcrypt';
import { Request, Response } from 'express';

export class AuthController {
  async createBuyerData(req: Request, res: Response) {
    try {
      const buyerEmail = await prisma.user.findUnique({
        where: {email: req.body.email}
      })
       
      if (buyerEmail) throw ("Email address has already been used");
       

      const newBuyerData = await prisma.user.create({
        data: {email: req.body.email, role: 'buyer', first_name: '', password: '', phone: ''}
      })

      const token = createToken({
        id: newBuyerData.user_id,
        role: (newBuyerData.role = 'buyer'),
      });

      await sendVerificationEmail(req.body.email, token)

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
      const buyer = await prisma.user.findUnique({
        where: {email: req.body.email}
      })
      
      if (!buyer) throw 'User Not Found';
      const validPass = await compare(req.body.password, buyer.password);
      if (!validPass) throw 'Password Incorrect';
      const token = createToken({
        id: buyer.user_id,
        role: (buyer.role = 'buyer'),
      });
      return res
        .status(201)
        .send({ status: 'ok', msg: 'Login Success', token, buyer });
    } catch (error) {
      responseError(res, error);
    }
  }

  async createStoreAdmin(req: Request, res: Response) {
    try {
      const strAdminData = await prisma.user.findFirst({
        where: {
          OR: [{ first_name: req.body.first_name }, { email: req.body.email }],
        },
      });

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
          OR: [{ first_name: req.body.first_name }, { email: req.body.email }],
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
      const { first_name, password, phone } = req.body;
  
      if (!first_name || !password || !phone) throw 'All fields are required';

      const user = await prisma.user.findUnique({
        where: { user_id: req.user.id },
      });
  
      if (!user) throw 'User not found';
      if (user.verified) throw 'User is already verified';

      const fullName = first_name.split(' ')  
      const hashedPassword = await hashPass(password);
  
      await prisma.user.update({
        where: { user_id: user.user_id },
        data: {
          first_name: fullName[0],
          last_name: fullName.slice(1).join(' '),
          password: hashedPassword,
          phone,
          verified: true,
        },
      });
  
      return res.status(200).send({
        status: 'ok',
        msg: "Your account is now active!",
      });
    } catch (error) {
      responseError(res, error);
    }
  }
}
