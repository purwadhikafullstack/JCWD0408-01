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
        this.router.get('/prov', this.authMiddleware.verifyToken, this.addressController.listOfProvince)
        this.router.post('/city', this.authMiddleware.verifyToken, this.addressController.chooseCity)
        this.router.post('/user', this.authMiddleware.verifyToken ,this.addressController.createAddress)
        this.router.patch('/user', this.authMiddleware.verifyToken, this.addressController.editAddress)
        this.router.patch('/userdef', this.authMiddleware.verifyToken, this.addressController.setDefaultAddr)
        this.router.delete('/user', this.authMiddleware.verifyToken, this.addressController.deleteAddress)
    }

    getRouter(): Router {
        return this.router;
      }
}