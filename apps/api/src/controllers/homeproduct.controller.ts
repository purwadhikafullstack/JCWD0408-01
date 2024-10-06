import { calculateDistance } from '@/helpers/calculatedistance';
import { responseError } from '@/helpers/responseError';
import prisma from '@/prisma';
import { Request, Response } from 'express';

export class HomeProdController {
  async getClosestProduct(req: Request, res: Response) {
    const { latitude, longitude } = req.body;
  
    try {
      const stores = await prisma.store.findMany({
        include: {
          Product: {
            include: {
              ProductImage: true, 
            },
          },
        },
      });
  
      const filteredStores = stores
        .map((store) => {
          const distance = calculateDistance(
            latitude,
            longitude,
            store.latitude,
            store.longitude,
          );
          return {
            ...store,
            distance,
          };
        })
        .filter((store) => store.distance <= 300)
        .sort((a, b) => a.distance - b.distance);
  
      const closestProducts = filteredStores.flatMap((store) => store.Product);
  
      return res.status(200).send({
        status: 'ok',
        closestProducts,
      });
    } catch (error) {
      responseError(res, error);
    }
  }
  

  async getDiscountedProduct(req: Request, res: Response) {
    try {
      const products = await prisma.product.findMany({
        include: {
          Discount: true
        }
      })
      return res.status(200).send({
        status: 'ok',
        products
      })
    } catch (error) {
      responseError(res, error)
    }
  }

  async getCategoryHome(req: Request, res: Response) {
    try {
      const categoryHome = await prisma.category.findMany({
          take: 7
      })

      return res.status(200).send({
        categoryHome
      })
    } catch (error) {
      responseError(res, error)
    }
  }
}
