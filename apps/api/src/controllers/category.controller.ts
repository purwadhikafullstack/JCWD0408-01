import { responseError } from "@/helpers/responseError";
import prisma from "@/prisma";
import { Request, Response } from "express";

const baseUrl = process.env.BASE_URL

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

            if (category?.category_name && category.category_name.length > 30) throw ("Category name is too long");
            if (category) throw ("Category already exists");

            const category_url = `${baseUrl}/public/category_url/${req.file?.filename}`


            const newCategory = await prisma.category.create({
                data: { ...req.body, category_url: category_url }
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
            const deleteCategory = await prisma.category.delete({
                where: { category_id: +req.params.id }
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

    async updateCategory(req: Request, res: Response) {
        try {
            const updateCategory = await prisma.category.findUnique({
                where: { category_id: +req.params.id }
            })
            if (!updateCategory) throw ("Category not found");

            const category_url = `${baseUrl}/public/category_url/${req.file?.filename}`

            const category = await prisma.category.update({
                where: { category_id: +req.params.id },
                data: { ...req.body , category_url: category_url}
            })

            if (!category) throw ("Category not found");
            if (category?.category_name && category.category_name.length > 30) throw ("Category name is too long");

            return res.status(200).send({
                status: 'ok',
                msg: 'Category updated successfully',
                category
            })
        } catch (error) {
            responseError(res, error)
        }
    }
}