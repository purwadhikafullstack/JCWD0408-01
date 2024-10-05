import { Router } from "express";
import { CartController } from "@/controllers/cart.controller";
import { AuthMiddleware } from "@/middleware/auth.middleware";

export class CartRouter {
    public router: Router;
    private cartController: CartController;
    private authMiddleware: AuthMiddleware;

    constructor() {
        this.router = Router();
        this.cartController = new CartController();
        this.authMiddleware = new AuthMiddleware();
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post('/add', this.authMiddleware.verifyToken, this.cartController.addToCart);
        this.router.post(`/addnav`, this.authMiddleware.verifyToken, this.cartController.addToCartNav);
        this.router.patch('/update', this.authMiddleware.verifyToken, this.cartController.updateCart);
        this.router.delete('/remove', this.authMiddleware.verifyToken, this.cartController.removeFromCart);
    }

    getRouter() {
        return this.router;
    }
}