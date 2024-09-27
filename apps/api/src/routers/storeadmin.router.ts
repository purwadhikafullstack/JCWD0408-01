import { StoreAdminController } from "@/controllers/storeadmin.controller";
import { Router } from "express";

export class StoreAdminRouter {
    private router : Router;
    private storeAdmin : StoreAdminController;

    constructor(){
        this.storeAdmin = new StoreAdminController();
        this.router = Router();
        this.initializeRouter();
    }

    private initializeRouter() {
        this.router.get('/', this.storeAdmin.getAllStoreAdmin)
        this.router.post('/create', this.storeAdmin.createStoreAdmin)
        this.router.delete('/:id', this.storeAdmin.deleteStoreAdmin)
    }

    getRouter() {
        return this.router;
    }
}
