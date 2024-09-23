import { BuyerController } from "@/controllers/buyer.controller";
import { uploader } from "@/helpers/uploader";
import { AuthMiddleware } from "@/middleware/auth.middleware";
import { Router } from "express";

export class BuyerRouter {
    private router: Router
    private authMiddleware: AuthMiddleware
    private buyerController: BuyerController

    constructor() {
        this.authMiddleware = new AuthMiddleware()
        this.buyerController = new BuyerController()
        this.router = Router()
        this.initializeRouters()
    }

    private initializeRouters(): void {
        this.router.get('/details', this.authMiddleware.verifyToken, this.buyerController.getBuyerByID)
        this.router.patch('/', this.authMiddleware.verifyToken, uploader('avatar', '/avatar').single('avatar'), this.buyerController.buyerAvatar)        
    }

    getRouter(): Router {
        return this.router
    }
}