import { calculateDistance } from '@/helpers/calculatedistance';
import { responseError } from '@/helpers/responseError';
import prisma from '@/prisma';
import { Request, Response } from 'express';

export class HomeProdController {
  async getClosestProduct(req: Request, res: Response) {
    const { latitude, longitude } = req.body;

    try {
    //   console.log("received coord", {latitude, longitude});
      
      const stores = await prisma.store.findMany({
        include: {
          Product: true, // Fetch associated products
        },
      });

    //   console.log("Fetched stores with products:", stores);

      const filteredStores = stores
        .map((store) => {
          const distance = calculateDistance(
            latitude,
            longitude,
            store.latitude,
            store.longitude,
          );
        //   console.log(`Store ${store.store_name} is ${distance} km away`);
          return {
            ...store,
            distance,
          };
        })
        .filter((store) => store.distance <= 150) 
        .sort((a, b) => a.distance - b.distance);

        // console.log("Filtered stores:", filteredStores);

      const closestProducts = filteredStores.flatMap((store) => store.Product);
        // console.log(closestProducts);
        
      return res.status(200).send({
        status: 'ok',
        closestProducts
      })
    } catch (error) {
      responseError(res, error)
    }
  }
}
