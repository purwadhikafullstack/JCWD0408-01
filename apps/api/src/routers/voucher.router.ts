import { VoucherController } from "@/controllers/voucher.controller";
import { AuthMiddleware } from "@/middleware/auth.middleware";
import { Router } from "express";

export class VoucherRouter {
    private router: Router
    private authMiddleware: AuthMiddleware
    private voucherController: VoucherController

    constructor() {
        this.authMiddleware = new AuthMiddleware()
        this.voucherController = new VoucherController()
        this.router = Router()
        this.initializeRouter()
    }

    private initializeRouter(){
        this.router.get('/', this.authMiddleware.verifyToken, this.voucherController.getVoucherByUser)
        this.router.get('/ref', this.authMiddleware.verifyToken, this.voucherController.getVoucherRefCode)
    }

    getRouter(): Router{
       return this.router
    }
}