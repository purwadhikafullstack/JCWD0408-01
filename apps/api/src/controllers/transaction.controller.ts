import { responseError } from "@/helpers/responseError";
import prisma from "@/prisma";
import { Request, Response } from "express";

export class TransactionController {
    async findTransaction(req: Request, res: Response) {
        try {
            const { category_id, product_id, page } = req.query

            const limit = 5
            const pageNumber = page ? parseInt(page as string, 10) : 1;
            const offset = (pageNumber - 1) * limit


            if ( category_id && product_id) {
                const transaction = await prisma.order.findMany({
                    where: {
                        order_status: 'completed',
                        created_at: {
                            gte: new Date(new Date().setDate(new Date().getDate() - 30))
                        },
                        OrderItem: {
                            some: {
                                product: {
                                    category_id: +category_id,
                                    product_id: +product_id
                                },
                            },
                        },
                    },
                    select: {
                        user_id: true,
                        total_price: true,
                        OrderItem: {
                            select: {
                                product: {
                                    select: {
                                        product_id: true,
                                        name: true,
                                        category_id: true,
                                    },
                                },
                            },
                        },
                    },
                    take: limit,
                    skip: offset
                });

                const totalRavenue = transaction.reduce((acc, curr) => acc + curr.total_price, 0)

                return res.status(200).send({
                    status: 'success',
                    msg : 'Successfully get transaction',
                    order : transaction,
                    totalRavenue,
                    totalItem: transaction.length,
                    totalPage: Math.ceil(transaction.length / limit)
                })
            }

            if (category_id) {
                const transaction = await prisma.order.findMany({
                    where: {
                        order_status: 'completed',
                        created_at: {
                            gte: new Date(new Date().setDate(new Date().getDate() - 30))
                        },
                        OrderItem: {
                            some: {
                                product: {
                                    category_id: +category_id,
                                },
                            },
                        },
                    },
                    select: {
                        user_id: true,
                        user: {
                            select: {
                                email: true,
                                first_name: true,
                                last_name: true,
                                avatar: true
                            }
                        },
                        total_price: true,
                        OrderItem: {
                            select: {
                                product: {
                                    select: {
                                        product_id: true,
                                        name: true,
                                        category_id: true,
                                    },
                                },
                            },
                        },
                    },
                    take: limit,
                    skip: offset
                });

                const totalRavenue = transaction.reduce((acc, curr) => acc + curr.total_price, 0)

                return res.status(200).send({
                    status: 'success',
                    msg: 'Successfully get transaction',
                    order :transaction,
                    totalRavenue,
                    totalItem: transaction.length,
                    totalPage: Math.ceil(transaction.length / limit)
                })
            }

            if (product_id) {
                const transaction = await prisma.order.findMany({
                    where: {
                        order_status: 'completed',
                        created_at: {
                            gte: new Date(new Date().setDate(new Date().getDate() - 30))
                        },
                        OrderItem: {
                            some: {
                                product: {
                                    product_id: +product_id,
                                },
                            },
                        },
                    },
                    select: {
                        user_id: true,
                        total_price: true,
                        OrderItem: {
                            select: {
                                product: {
                                    select: {
                                        product_id: true,
                                        name: true,
                                        category_id: true,
                                    },
                                },
                                },
                            },
                            user: {
                                select: {
                                    email: true,
                                    first_name: true,
                                    last_name: true,
                                    avatar: true
                                }
                            },
                        },
                        take: limit,
                        skip: offset
                    });
                const totalRavenue = transaction.reduce((acc, curr) => acc + curr.total_price, 0)
                const totalItem = await prisma.order.count({
                    where: {
                        order_status: 'completed',
                        OrderItem: {
                            some: {
                                product_id: +product_id,
                            },
                        }
                    },
                })

                return res.status(200).send({
                    status: 'success',
                    msg: 'Successfully get transaction',
                    order: transaction,
                    totalRavenue,
                    totalItem: transaction.length,
                    totalPage: Math.ceil(totalItem / limit)
                })
            }

            const order = await prisma.order.findMany({
                where: {
                    order_status: 'completed',
                    created_at: {
                        gte: new Date(new Date().setDate(new Date().getDate() - 30))
                    },
                    OrderItem: {}
                },
                select: {
                    user_id: true,
                    total_price: true,
                    user :{
                        select: {
                            email: true,
                            first_name: true,
                            last_name: true,
                            avatar: true
                        }
                    },
                    OrderItem: {
                        select: {
                            product: {
                                select: {
                                    product_id: true,
                                    name: true,
                                    category_id: true,
                                },
                            },
                        },
                    },
                },
                take: limit,
                skip: offset
            })

            const totalRavenue = order.reduce((acc, curr) => acc + curr.total_price, 0)
            const totalItem = await prisma.order.count({
                where: {
                    order_status: 'completed',
                }
            })

            return res.status(200).send({
                status: 'success',
                msg: 'Successfully get transaction',
                order,
                totalRavenue,
                totalItem: order.length,
                currentPage: pageNumber,
                totalPage: Math.ceil(totalItem / limit)
            })

        } catch (error) {
            responseError(res, error);
        }
    }

    async findTransactionByStore(req: Request, res: Response) {
        try {
            const store_id = req.params.store_id

            const order = await prisma.order.findMany({
                where: {
                    order_status: 'completed',
                    OrderItem: {
                        some: {
                            product: {
                                store_id: +store_id,
                            },
                        },
                    },
                },
                select: {
                    user_id: true,
                    total_price: true,
                    created_at: true,
                    OrderItem: {
                        select: {
                            product: {
                                select: {
                                    product_id: true,
                                    name: true,
                                    category_id: true,
                                },
                            },
                            qty: true,
                        },
                    },
                }, orderBy : {
                    created_at: 'desc'
                }
            });

            const totalRavenue = order.reduce((acc, curr) => acc + curr.total_price, 0)
            const totalQty = order.reduce((acc, curr) => acc + curr.OrderItem.reduce((acc, curr) => acc + curr.qty, 0), 0)

            return res.status(200).send({
                status: 'success',
                msg: 'Successfully get transaction',
                order,
                totalRavenue,
                totalItem: order.length,
                totalQty
            })
        } catch (error) {
            responseError(res, error);
        }
    }
}