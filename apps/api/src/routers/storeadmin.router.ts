import { StoreAdminController } from "@/controllers/storeadmin.controller";
import { AuthMiddleware } from "@/middleware/auth.middleware";
import { Router } from "express";
import { verify } from "jsonwebtoken";

export class StoreAdminRouter {
    private router : Router;
    private storeAdmin : StoreAdminController;
    private authMiddleware: AuthMiddleware;

    constructor(){
        this.storeAdmin = new StoreAdminController();
        this.authMiddleware = new AuthMiddleware();
        this.router = Router();
        this.initializeRouter();
    }

    private initializeRouter() {
        this.router.get('/', this.storeAdmin.getAllStoreAdmin)
        this.router.get('/authorizestore', this.authMiddleware.verifyToken, this.storeAdmin.getAdminAuthorizeStore)
        this.router.post('/create', this.storeAdmin.createStoreAdmin)
        this.router.delete('/:id', this.storeAdmin.deleteStoreAdmin)
    }

    getRouter() {
        return this.router;
    }
}
