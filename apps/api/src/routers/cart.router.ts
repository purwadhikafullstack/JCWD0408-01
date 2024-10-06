import { CartController } from "@/controllers/cart.controller";
import { Router } from "express";

export class CartRouter {
    private router: Router;
    private cartController: CartController;

    constructor() {
        this.cartController = new CartController();
        this.router = Router();
        this.initializeRouter();
    }


    private initializeRouter() {
        this.router.post('/add', this.cartController.addToCart);
        this.router.post('/addnav', this.cartController.addToCartNav);
        this.router.put('/update', this.cartController.updateCart);
        this.router.delete('/remove', this.cartController.removeFromCart);
        this.router.get('/count/:user_id', this.cartController.getCartCount);
    }
    getRouter() {
        return this.router;
    }
}
