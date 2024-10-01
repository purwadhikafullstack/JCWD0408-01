import { responseError } from "@/helpers/responseError";
import prisma from "@/prisma";
import { Request, response, Response } from "express";
import { create } from "handlebars";

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
                take: limit,
                include: {
                    Inventory: true,
                }
            });

            const totalProducts = await prisma.product.count({
                where: { store_id: +req.params.store_id }
            });

            return res.status(200).send({
                status: 'ok',
                product,
                totalPages: Math.ceil(totalProducts / limit),
                currentPage: page,
            });
        } catch (error) {
            responseError(res, error);
        }
    }

    async createProduct(req: Request, res: Response) {
        try {
            await prisma.$transaction(async (prisma) => {
                const store = await prisma.store.findUnique({
                    where: { store_id: +req.params.store_id }
                });

                if (!store) {
                    return res.status(404).send({
                        status: 'error',
                        msg: 'Store not found'
                    });
                }

                let image = null;
                if (req.file) {
                    image = `${baseUrl}/public/product/${req.file?.filename}`;
                }

                const createProduct = await prisma.product.create({
                    data: {
                        name: req.body.name,
                        description: req.body.description,
                        store_id: store.store_id,
                        image: image,
                        category_id: +req.body.category_id,
                        price: +req.body.price,
                        Inventory: {
                            create: {
                                qty: +req.body.qty,
                                store_id: store.store_id
                            }
                        }
                    }
                });

                return res.status(201).send({
                    status: 'ok',
                    msg: 'Product created successfully',
                    createProduct,
                });
            })
        } catch (error) {
            responseError(res, error);
        }
    }

    async getProductDetail(req: Request, res: Response) {
        try {
            const product = await prisma.product.findUnique({
                where: { product_id: +req.params.product_id },
                include: {
                    Inventory: { select: { qty: true } },
                    category: { select: { category_name: true } }
                }
            });

            if (!product) {
                return res.status(404).send({
                    status: 'error',
                    msg: 'Product not found'
                });
            }

            return res.status(200).send({
                status: 'ok',
                product
            });
        } catch (error) {
            responseError(res, error);
        }
    }

    async getProductBySearchBar(req: Request, res: Response) {
        try {
            interface FilterSearch {
                OR?: [{ name: { contains: string } }]
            }

            const { search, page: pageQuery } = req.query;
            const page = parseInt(pageQuery as string) || 1;
            const filterQ: FilterSearch = {}
            if (search) {
                filterQ.OR = [
                    { name: { contains: search as string } },
                ]
            }
            const limit = 24;
            const offset = (page - 1) * limit;

            const product = await prisma.product.findMany({
                where: filterQ,
                skip: offset,
                take: limit,
                include: {
                    Inventory: true,
                    category: true
                }
            });

            const totalProducts = await prisma.product.count({
                where: filterQ
            });

            return res.status(200).send({
                status: 'ok',
                product,
                totalPages: Math.ceil(totalProducts / limit),
                currentPage: page,
            });
        } catch (error) {
            responseError(res, error);
        }
    }
}