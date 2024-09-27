import { responseError } from "@/helpers/responseError";
import prisma from "@/prisma";
import { Request, response, Response } from "express";

const baseUrl = 'https://localhost:8000/api'

export class ProductController {
    async getProductbyStoreId(req: Request, res: Response) {
        try {
            const page = parseInt(req.query.page as string) || 1;
            const limit = 5;
            const offset = (page - 1) * limit;

            const product = await prisma.product.findMany({
                where: { store_id: +req.params.store_id },
                skip: offset,
                take: limit
            });

            const totalProducts = await prisma.product.count({
                where: { store_id: +req.params.store_id }
            });

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

    async createProduct(req: Request, res: Response) {
        try {

            const store = await prisma.store.findUnique({
                where: { store_id: +req.params.store_id }
            });

            if (!store) {
                return res.status(404).send({
                    status: 'error',
                    msg: 'Store not found'
                });
            }

            let image = null
            if (req.file) {
                image = `${baseUrl}/public/product/${req.file?.filename}`
            }

            const createProduct = await prisma.product.create({
                data: { store_id: store.store_id, image: image, ...req.body, category_id: +req.body.category_id, price: +req.body.price }
            });

            return res.status(201).send({
                status: 'ok',
                msg: 'Product created successfully',
                createProduct
            })
        } catch (error) {
            responseError(res, error);
        }
    }
}