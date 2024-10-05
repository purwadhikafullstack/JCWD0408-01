import { Router } from "express";
import { CartController } from "@/controllers/cart.controller";
import { AuthMiddleware } from "@/middleware/auth.middleware";


class CartRouter {
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
    this.router.post(
      "/add",
      this.authMiddleware.verifyToken,
      this.cartController.addToCart
    );
    this.router.patch(
      "/update",
      this.authMiddleware.verifyToken,
      this.cartController.updateCart
    );
    this.router.delete(
      "/remove",
      this.authMiddleware.verifyToken,
      this.cartController.removeFromCart
    );
    this.router.get(
      "/count/:user_id",
      this.authMiddleware.verifyToken,
      this.cartController.getCartCount
    );
  }
}

export default new CartRouter().router;
