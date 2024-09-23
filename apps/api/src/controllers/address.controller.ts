import { responseError } from "@/helpers/responseError";
import prisma from "@/prisma";
import { Request, Response } from "express";

export class AddrController {
    async createAddress(req: Request, res: Response) {
      try {
        const newAddress = await prisma.address.create({
          data: {...req.body, user_id: req.user.id}
        })
        
        return res.status(200).send({
          status: 'ok',
          newAddress
        })
      } catch (error) {
        responseError(res, error)
      }
    }
}