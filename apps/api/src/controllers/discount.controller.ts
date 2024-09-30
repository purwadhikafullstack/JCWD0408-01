import { responseError } from "@/helpers/responseError";
import prisma from "@/prisma";
import { Request, Response } from "express";

export class DiscountController {
    async createDiscount(req: Request, res: Response){
        try {
            const data = await prisma.discount.findFirst({
                where: {
                    discount_code: req.body.discount_code
                }
            })
            if(data){
                return res.status(400).send({
                    status: 'error',
                    message: 'Discount code already exists'
                })
            }


            const createDiscount = await prisma.discount.create({
                data : {
                    product_id: req.body.product_id,
                    discount_code: req.body.discount_code,
                    discount_type: req.body.discount_type,
                    discount_value: req.body.discount_value,
                    minimum_order: req.body.minimum_order,
                    expires_at: `${req.body.expires_at}T23:59:59.000Z`
                }
            })

            return res.status(201).send({
                status: 'success',
                message: 'Discount created successfully',
                data: createDiscount
            })
        } catch (error) {
            responseError(res, error)
        }
    }

    async getDiscountByProduct(req: Request, res: Response){
        try {
            const page = Number(req.query.page) || 1
            const perPage = Number(req.query.perPage) || 5

            const dataDiscount = await prisma.discount.findMany({
                where: {
                    product_id: Number(req.params.id)
                }, orderBy: {
                    created_at: 'desc'
                }, 
                take: perPage, 
                skip: (page - 1) * perPage
            })

            const totalData = await prisma.discount.count({})

            const totalPage = Math.ceil(totalData / perPage)

            res.status(200).send({
                status: 'success',
                message: 'Discount found',
                data: dataDiscount,
                currentPage: page,
                totalPage
            })
        } catch (error) {
            responseError(res, error)   
        }
    }
}