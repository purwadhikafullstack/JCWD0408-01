import { responseError } from "@/helpers/responseError";
import prisma from "@/prisma";
import { Request, Response } from "express";

export class CategoryController {
    async getAllCategoryQuery(req: Request, res: Response) {
        try {
            const { page = 1 } = req.query;
            const limit = 5;
            const offset = (Number(page) - 1) * limit;

            const allCategories = await prisma.category.findMany({
                include: {
                    Product: true
                },
                skip: offset,
                take: limit
            });

            const totalPages = await prisma.category.count();

            return res.status(200).send({
                status: 'success',
                allCategories,
                totalPages: Math.ceil(totalPages / limit),
                currentPage: page
            })
        } catch (error) {
            responseError(res, error)
        }
    }

    async createCategory(req: Request, res: Response) {
        try {
            const category = await prisma.category.findFirst({
                where: { category_name: req.body.category_name }
            })
            if (category) throw ("Category already exists");
            const newCategory = await prisma.category.create({
                data: { ...req.body }
            })
            return res.status(201).send({
                status: 'ok',
                msg: "Category created successfully",
                newCategory
            })
        } catch (error) {
            responseError(res, error);
        }
    }

    async deleteCategory(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const deleteCategory = await prisma.category.delete({
                where: { category_id: parseInt(id) }
            })
            return res.status(200).send({
                status: 'success',
                msg: 'Category has been deleted',
                deleteCategory
            })
        } catch (error) {
            responseError(res, error)
        }
    }

    async getAllCategory(req: Request, res: Response) {
        try {
            const allCategories = await prisma.category.findMany({
                include: {
                    Product: true
                }
            });

            return res.status(200).send({
                status: 'success',
                allCategories,

            })
        } catch (error) {
            responseError(res, error)
        }
    }

}