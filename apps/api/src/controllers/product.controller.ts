import { responseError } from "@/helpers/responseError";
import prisma from "@/prisma";
import { Request, response, Response } from "express";
import { create } from "handlebars";

const baseUrl = process.env.BASE_URL;

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
                    Inventory: {
                        orderBy: { created_at: 'desc' },
                    },
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
                totalProducts
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

                const files: Express.Multer.File[] = req.files as Express.Multer.File[];
                const image = files.map((file) => `${baseUrl}/public/product/${file.filename}`)

                const data = await prisma.product.findFirst({
                    where: { name: req.body.name }
                })

                if (data) throw ("Product already exists");

                const createProduct = await prisma.product.create({
                    data: {
                        name: req.body.name,
                        description: req.body.description,
                        store_id: store.store_id,
                        category_id: +req.body.category_id,
                        price: +req.body.price,
                        Inventory: {
                            create: {
                                qty: +req.body.qty,
                                store_id: store.store_id,
                                total_qty: +req.body.qty
                            }
                        },
                        ProductImage: {
                            create: image.map((url) => {
                                return {
                                    url
                                }
                            })
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
                    Inventory: {
                        select: {
                            qty: true,
                            total_qty: true,
                            created_at: true
                        },
                        orderBy: { created_at: 'desc' }
                    },
                    ProductImage: {
                        select: {
                            url: true
                        }
                    },
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
                    category: true,
                    ProductImage: true
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

    async updateProduct(req: Request, res: Response) {
        try {
            const product_id = +req.params.product_id;

            const updatedProduct = await prisma.$transaction(async (prismaTransaction) => {
                const product = await prismaTransaction.product.findUnique({
                    where: { product_id }
                });

                await prismaTransaction.productImage.deleteMany({
                    where: { product_id: product?.product_id }
                })

                if (!product) {
                    throw new Error('Product not found');
                }

                const files: Express.Multer.File[] = req.files as Express.Multer.File[];
                const image = files.map((file) => `${baseUrl}/public/product/${file.filename}`);

                const updateProduct = await prismaTransaction.product.update({
                    where: { product_id: product.product_id },
                    data: {
                        name: req.body.name,
                        description: req.body.description,
                        price: +req.body.price,
                        category_id: +req.body.category_id,
                        updated_at: new Date(),
                        ProductImage: {
                            create: image.map((url) => ({
                                url,
                            })),
                        },
                        Inventory: {
                            create: {
                                qty: +req.body.qty,
                                store_id: product.store_id,
                                total_qty: +req.body.qty,
                            },
                        },
                    },
                });
                return updateProduct;
            });
            return res.status(200).send({
                status: 'ok',
                msg: 'Product updated successfully',
                updatedProduct,
            });
        } catch (error) {
            if (error instanceof Error && error.message === 'Product not found') {
                return res.status(404).send({
                    status: 'error',
                    msg: 'Product not found',
                });
            }
            return responseError(res, error);
        }
    }

    async deleteProduct(req: Request, res: Response) {
        try {
            const product_id = +req.params.product_id;

            const deleteProductId = await prisma.$transaction(async (prismaTransaction) => {
                const product = await prismaTransaction.product.findUnique({
                    where: { product_id },
                });

                if (!product) {
                    throw new Error('Product not found');
                }

                await prismaTransaction.productImage.deleteMany({
                    where: { product_id: product.product_id },
                });

                await prismaTransaction.inventory.deleteMany({
                    where: { product_id: product.product_id },
                });

                await prismaTransaction.cartItem.deleteMany({
                    where: { product_id: product.product_id },
                })

                await prismaTransaction.orderItem.deleteMany({
                    where: { product_id: product.product_id },
                })

                await prismaTransaction.discount.deleteMany({
                    where: { product_id: product.product_id }
                })

                await prismaTransaction.product.delete({
                    where: { product_id },
                });

                return product.product_id;
            })
            return res.status(200).send({
                status: 'ok',
                msg: 'Product deleted successfully',
                deleteProductId,
            })
        } catch (error) {
            responseError(res, error);
        }
    }

    async getProductRandom(req: Request, res : Response){
        try {
            const product = await prisma.product.findMany({
                include: {
                    Inventory: true,
                    category: true,
                    ProductImage: true
                }
            })
            
            const randomProduct = product.sort(() => Math.random() - Math.random());

            return res.status(200).send({
                status: 'ok',
                msg : 'Success get random product',
                randomProduct

            })
        } catch (error) {
            responseError(res, error);
        }
    }

    async getAllProduct(req: Request, res: Response){
        try {
            const product = await prisma.product.findMany({})

            return res.status(200).send({
                status: 'ok',
                msg: 'Success get all product',
                product
            })
        } catch (error) {
            responseError(res, error);
        }
    }
}