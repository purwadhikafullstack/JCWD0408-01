import { responseError } from "@/helpers/responseError";
import prisma from "@/prisma";
import { Request, Response } from "express";

export class SuperAdminController {
    async getAllUser(req : Request, res : Response){
        try {
            const { role, page = 1 } = req.query;
            let typeRole = {};
            if (role == 'buyer') {
                typeRole = { role: 'buyer' };
            } else if (role == 'store_admin') {
                typeRole = { role: 'store_admin' };
            }

            const limit = 5;
            const offset = (Number(page) - 1) * limit;

            const data = await prisma.user.findMany({
                where: typeRole,
                skip: offset,
                take: limit,
                include: {
                    Store: true
                }
            });

            const totalData = await prisma.user.count({
                where: typeRole
            });

            res.status(200).send({
                status: 'ok',
                data,
                totalData,
                totalPages: Math.ceil(totalData / limit),
            });

        } catch (error) {
            responseError(res, error)
        }
    }

    async allProductList(req: Request, res : Response){
        try {
            const { page = 1 } = req.query;
            const limit = 5;
            const offset = (Number(page) - 1) * limit;

            const product = await prisma.product.findMany({
                include: {
                    Inventory: {
                        orderBy: {
                            created_at: 'desc'
                        }
                    }
                },
                skip: offset,
                take: limit
            });

            const totalProducts = await prisma.product.count();

            return res.status(200).send({
                status: 'ok',
                product,
                totalPages: Math.ceil(totalProducts / limit),
                currentPage: page
            });
        } catch (error) {
            responseError(res, error);
        }
    }

    async allStoreList(req: Request, res : Response){
        try {
            const { page = 1 } = req.query;
            const limit = 10;
            const offset = (Number(page) - 1) * limit;

            const store = await prisma.store.findMany({
                skip: offset,
                take: limit,
                include: {
                    User: true
                }
            });

            const totalStores = await prisma.store.count();

            return res.status(200).send({
                status: 'ok',
                store,
                totalPages: Math.ceil(totalStores / limit),
                currentPage: page
            });
        } catch (error) {
            responseError(res, error);
        }
    }

    async createStore(req: Request, res: Response) {
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
          const newStore = await prisma.store.create({
            data: {
              ...req.body,
              address: filteredAddress,
              latitude: parseFloat(req.body.latitude),
              longitude: parseFloat(req.body.longitude),
            },
          });
    
          return res.status(200).send({
            status: 'ok',
            newStore,
          });
        } catch (error) {
          responseError(res, error);
        }
      }

      async editStore(req: Request, res: Response) {
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
            const editedStore = await prisma.store.update({
              data: {
                ...req.body,
                address: filteredAddress,
                latitude: parseFloat(req.body.latitude),
                longitude: parseFloat(req.body.longitude),
              },
              where: {
                store_id: req.body.store_id
              }
            });
      
            return res.status(200).send({
              status: 'ok',
              editedStore,
            });
          } catch (error) {
            responseError(res, error);
          }
      }

      async deleteStore(req: Request, res: Response) {
        try {
            await prisma.store.delete({
                where: {
                    store_id: req.body.store_id
                }
            })
            
            return res.status(200).send('Deletion Success')
        } catch (error) {
            responseError(res, error)
        }
      }
}