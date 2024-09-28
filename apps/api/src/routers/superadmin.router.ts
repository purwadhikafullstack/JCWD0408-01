import { SuperAdminController } from "@/controllers/superadmin.controller";
import { Router } from "express";

export class SuperAdminRouter {
    private router : Router;
    private superAdminController : SuperAdminController;

    constructor(){
        this.superAdminController = new SuperAdminController();
        this.router = Router();
        this.initializeRouter();
    }

    private initializeRouter(){
        this.router.get(`/`, this.superAdminController.getAllUser)
        this.router.get(`/product`, this.superAdminController.allProductList)
        this.router.get('/store', this.superAdminController.allStoreList)
    }

    getRouter(){
        return this.router;
    }
}