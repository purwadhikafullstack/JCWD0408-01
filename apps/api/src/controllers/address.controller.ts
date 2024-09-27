import { responseError } from '@/helpers/responseError';
import prisma from '@/prisma';
import { Request, Response } from 'express';

export class AddrController {
  async getAllAddress(req: Request, res: Response) {
    try {
      const allAddress = await prisma.address.findMany({
        where: { user_id: req.user.id },
      });

      return res.status(200).send({
        status: 'success',
        allAddress,
      });
    } catch (error) {
      responseError(res, error);
    }
  }

  async createAddress(req: Request, res: Response) {
    try {
      const { address, city, postcode, subdistrict, province } = req.body;

      const partsToRemove = [subdistrict, city, province, postcode]
        .filter((part) => part)
        .map((part) => part.toLowerCase());

      const filteredAddress = address
        .split(', ')
        .map((part: string) => part.trim())
        .filter((part: string) => !partsToRemove.includes(part.toLowerCase()))
        .join(', ');

      const newAddress = await prisma.address.create({
        data: {
          ...req.body,
          address: filteredAddress,
          user_id: req.user.id,
          latitude: parseFloat(req.body.latitude),
          longitude: parseFloat(req.body.longitude),
        },
      });

      return res.status(200).send({
        status: 'ok',
        newAddress,
      });
    } catch (error) {
      responseError(res, error);
    }
  }

  async editAddress(req: Request, res: Response) {
    try {
      const { address, city, postcode, subdistrict, province } = req.body;

      const partsToRemove = [subdistrict, city, province, postcode]
        .filter((part) => part)
        .map((part) => part.toLowerCase());

      const filteredAddress = address
        .split(', ')
        .map((part: string) => part.trim())
        .filter((part: string) => !partsToRemove.includes(part.toLowerCase()))
        .join(', ');

      const updatedAddress = await prisma.address.update({
        data: {
          ...req.body,
          address: filteredAddress,
          user_id: req.user.id,
          latitude: parseFloat(req.body.latitude),
          longitude: parseFloat(req.body.longitude),
        },
        where: {
          address_id: req.body.address_id,
        },
      });

      return res.status(200).send({
        status: 'update success',
        updatedAddress
      })
    } catch (error) {}
  }

  async deleteAddress(req: Request, res: Response) {
    try {
      await prisma.address.delete({
        where: { address_id: req.body.address_id },
      });

      return res.status(200).send({
        status: 'deletion success',
      });
    } catch (error) {
      responseError(res, error);
    }
  }
}
