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
            const limit = 6;
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
}