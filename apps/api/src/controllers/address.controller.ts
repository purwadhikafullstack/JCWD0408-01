import { responseError } from "@/helpers/responseError";
import prisma from "@/prisma";
import { Request, Response } from "express";
import opencage from 'opencage-api-client'

export class AddrController {
    async createAddress(req: Request, res: Response) {
       try {
          const openCageRes = await opencage.geocode({
            q: req.body.address,
            key: process.env.OPENCAGE_API_KEY
          })

          const {lat, lng} = openCageRes.results[0].geometry 

          const userAddress = await prisma.address.create({
            data: {
              user_id: req.user.id,
              longitude: lng,
              latitude: lat,
              ...req.body
            }
          })
          
          res.status(200).send({
            status: "ok",
            userAddress
          })           
       } catch (error) {
        responseError(res, error)
       }
    }
}