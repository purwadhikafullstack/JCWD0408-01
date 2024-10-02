import { responseError } from "@/helpers/responseError";
import prisma from "@/prisma";
import { Request, Response } from "express";

export class InventoryController {
    async SummaryInventory(req: Request, res: Response){
        try {
            const product_id = Number(req.params.product_id);
            const limit = Number(req.query.limit) || 5;
            const page = Number(req.query.page) || 1;

            const inventory = await prisma.inventory.findMany({
                where: {
                    product_id,
                    created_at: {
                        gte: new Date(new Date().setMonth(new Date().getMonth() - 1))
                    }
                }, orderBy: {
                    created_at: 'desc'
                }, take: limit, skip: (page - 1) * limit
            });

            const historyInventory = await prisma.inventory.count({})

            return res.status(200).send({
                status: 'ok',
                inventory,
                inventoryCount: historyInventory,
                currentPage: page,
                totalPage: Math.ceil(historyInventory / limit)
            })
        } catch (error) {
            responseError(res, error);
        }
    }

    async UpdateInventory(req: Request, res: Response){
        try {
            const product_id = Number(req.params.product_id);

            const inventory = await prisma.inventory.findFirst({
                where: {
                    product_id
                }, orderBy: {
                    created_at: 'desc'
                }
            });

            const inventoryUpdate = await prisma.inventory.create({
                data: {
                    store_id: inventory!.store_id, 
                    product_id,
                    qty: req.body.qty,
                    total_qty: inventory!.total_qty + req.body.qty
                }
            });

            return res.status(200).send({
                status: 'ok',
                msg: 'Inventory updated',
                inventoryUpdate
            })

        } catch (error) {
            responseError(res, error);
        }
    }
}