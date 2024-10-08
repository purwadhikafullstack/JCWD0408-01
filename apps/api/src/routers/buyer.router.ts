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
        this.router.get('/code', this.authMiddleware.verifyToken, this.buyerController.getCode)
        this.router.post('/code', this.authMiddleware.verifyToken, this.buyerController.useCode)
        this.router.post('/changemail', this.authMiddleware.verifyToken, this.buyerController.changeMail)
        this.router.patch('/', this.authMiddleware.verifyToken, uploader('avatar', '/avatar').single('avatar'), this.buyerController.buyerAvatar)  
        this.router.patch('/reverify/:token', this.buyerController.newEmailAddr)
        this.router.patch('/changephone', this.authMiddleware.verifyToken, this.buyerController.editPhone)
        this.router.patch('/changedob', this.authMiddleware.verifyToken, this.buyerController.editDateOB)    
    }

    getRouter(): Router {
        return this.router
    }
}