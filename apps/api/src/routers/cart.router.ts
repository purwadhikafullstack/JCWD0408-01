import { CartController } from "@/controllers/cart.controller";
import { AuthMiddleware } from "@/middleware/auth.middleware";
import { Router } from "express";

export class CartRouter {
    private router: Router;
    private cartController: CartController;
    private authMiddleware: AuthMiddleware;

    constructor() {
        this.cartController = new CartController();
        this.authMiddleware = new AuthMiddleware();
        this.router = Router();
        this.initializeRouter();
    }

    private initializeRouter() {
        this.router.post('/add', this.cartController.addToCart);
        this.router.post('/addnav', this.authMiddleware.verifyToken ,  this.cartController.addToCartNav);
        this.router.put('/update', this.cartController.updateCart);
        this.router.delete('/remove', this.cartController.removeFromCart);
        this.router.get('/count/:user_id', this.cartController.getCartCount);
    }
    getRouter() {
        return this.router;
    }
}
