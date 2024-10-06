import { createLoginToken, createToken, Ipayload } from "@/helpers/createToken";
import { hashPass } from "@/helpers/hashPassword";
import {
  sendResetPassEmail,
  sendVerificationEmail,
  transporter,
} from "@/helpers/nodemailer";
import { generateReferralCode } from "@/helpers/referralcode";
import { responseError } from "@/helpers/responseError";
import prisma from "@/prisma";
import { compare } from "bcrypt";
import { Request, Response } from "express";

export class AuthController {
  async createBuyerData(req: Request, res: Response) {
    try {
      const buyerEmail = await prisma.user.findUnique({
        where: { email: req.body.email },
      });

      if (buyerEmail) throw "Email address has already been used";

      const newBuyerData = await prisma.user.create({
        data: {
          email: req.body.email,
          role: "buyer",
          first_name: "",
          password: "",
          phone: "",
          ...req.body,
        },
      });

      const token = createToken({
        id: newBuyerData.user_id,
        role: newBuyerData.role,
      });

      await sendVerificationEmail(req.body.email, token);

      return res.status(201).send({
        status: "ok",
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
        where: { email: req.body.email },
      });

      if (!buyer) throw "User Not Found";
      const validPass = await compare(req.body.password, buyer.password);
      if (!validPass) throw "Password Incorrect";
      const token = createLoginToken({
        id: buyer.user_id,
        role: buyer.role,
      });
      return res
        .status(201)
        .send({ status: "ok", msg: "Login Success", token, buyer });
    } catch (error) {
      responseError(res, error);
    }
  }

  async userVerification(req: Request, res: Response) {
    try {
      const { first_name, password, phone } = req.body;

      if (!first_name || !password || !phone) throw "All fields are required";

      const user = await prisma.user.findUnique({
        where: { user_id: req.user.id },
      });

      if (!user) throw "User not found";
      if (user.verified) throw "User is already verified";

      const fullName = first_name.split(" ");
      const hashedPassword = await hashPass(password);

      await prisma.user.update({
        where: { user_id: user.user_id },
        data: {
          first_name: fullName[0],
          last_name: fullName.slice(1).join(" "),
          password: hashedPassword,
          phone,
          verified: true,
        },
      });

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
          referrer_id: req.user.id,
          referral_code: refCode,
        },
      });

      return res.status(200).send({
        status: "ok",
        msg: "Your account is now active!",
      });
    } catch (error) {
      responseError(res, error);
    }
  }

  async changePassMail(req: Request, res: Response) {
    try {
      const userData = await prisma.user.findUnique({
        where: { email: req.body.email },
      });

      if (!userData) throw "No Email Found";

      const token = createToken({
        id: userData!.user_id,
        role: userData!.role,
      });

      await sendResetPassEmail(userData!.email, token);
      return res.status(200).send({
        msg: "Please check your email",
      });
    } catch (error) {
      responseError(res, error);
    }
  }

  async changePassword(req: Request, res: Response) {
    try {
      const userData = await prisma.user.findUnique({
        where: {
          user_id: req.user.id,
        },
      });
      const validPass = await compare(req.body.password, userData!.password);

      if (!validPass) throw "Password Incorrect";

      const newPassword = req.body.newPassword;

      const isSamePass = await compare(newPassword, userData!.password);

      if (isSamePass) throw "Can't use similar password";

      const hashedPassword = await hashPass(newPassword);

      await prisma.user.update({
        where: { user_id: req.user.id },
        data: { password: hashedPassword },
      });

      return res.status(200).send({
        status: "ok",
        msg: "Password has been changed",
      });
    } catch (error) {
      responseError(res, error);
    }
  }
}
