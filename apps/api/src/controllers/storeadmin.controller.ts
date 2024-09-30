import { hashPass } from "@/helpers/hashPassword";
import { responseError } from "@/helpers/responseError";
import prisma from "@/prisma";
import { Request, Response } from "express";

export class StoreAdminController {
    async getAllStoreAdmin(req: Request, res: Response) {
        try {
            const allStoreAdmin = await prisma.user.findMany({
                where: {role: 'store_admin'}
            })

            return res.status(200).send({
                status: 'success',
                allStoreAdmin
            })
        } catch (error) {
            responseError(res, error)
        }
    }

    async createStoreAdmin(req : Request, res : Response){
        try {
            const storeAdminEmail = await prisma.user.findUnique({
                where: {email: req.body.email}
            })
            if (storeAdminEmail) throw ("Email address has already been used");

            const password = await hashPass(req.body.password);

            const newStoreAdmin = await prisma.user.create({
                data: { ...req.body, role: 'store_admin', password, verified: true }
            })

            return res.status(201).send({
                status: 'ok',
                msg: "You've Successfully Signing up the Admin!",
                newStoreAdmin,
            });
        }
        catch (error) {
            responseError(res, error);
        }
    }

    async deleteStoreAdmin(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const deleteStoreAdmin = await prisma.user.delete({
                where : { user_id: parseInt(id) }
            })

            return res.status(200).send({
                status: 'success',
                msg: 'Store Admin has been deleted',
                deleteStoreAdmin
            })
        } catch (error) {
            responseError(res, error)
        }
    }

    async getAdminAuthorizeStore(req : Request, res : Response){
        try {

            const userLogin = await prisma.user.findUnique({
                where: { user_id: req.user.id }
            })

            const store = await prisma.store.findMany({
                where: { user_id: userLogin?.user_id }
            })

            return res.status(200).send({
                status: 'success',
                store
            })
        } catch (error) {
            responseError(res, error)
        }
    }
}