import { SuperAdminController } from "@/controllers/superadmin.controller";
import { AuthMiddleware } from "@/middleware/auth.middleware";
import { Router } from "express";

export class SuperAdminRouter {
    private router : Router;
    private superAdminController : SuperAdminController;
    private authMiddleware: AuthMiddleware

    constructor(){
        this.authMiddleware = new AuthMiddleware()
        this.superAdminController = new SuperAdminController();
        this.router = Router();
        this.initializeRouter();
    }

    private initializeRouter(){
        this.router.get(`/`, this.superAdminController.getAllUser)
        this.router.get(`/product`, this.superAdminController.allProductList)
        this.router.get('/store', this.superAdminController.allStoreList)
        this.router.post('/store', this.authMiddleware.checkSuperAdmin, this.superAdminController.createStore)
        this.router.patch('/store', this.authMiddleware.checkSuperAdmin, this.superAdminController.editStore)
        this.router.delete('/store', this.authMiddleware.checkSuperAdmin, this.superAdminController.deleteStore)
    }

    getRouter(){
        return this.router;
    }
}