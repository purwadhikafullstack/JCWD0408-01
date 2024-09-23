import { AddrController } from "@/controllers/address.controller";
import { AuthMiddleware } from "@/middleware/auth.middleware";
import { Router } from "express";

export class AddrRouter {
    private router: Router
    private addressController: AddrController
    private authMiddleware: AuthMiddleware

    constructor() {
        this.addressController = new AddrController()
        this.authMiddleware = new AuthMiddleware()
        this.router = Router()
        this.initialization()
    }

    private initialization(): void {
        this.router.get('/user', this.authMiddleware.verifyToken, this.addressController.getAllAddress)
        this.router.post('/user', this.authMiddleware.verifyToken ,this.addressController.createAddress)
    }

    getRouter(): Router {
        return this.router;
      }
}