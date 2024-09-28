import { AuthController } from "@/controllers/auth.controller";
import { BuyerController } from "@/controllers/buyer.controller";
import { AuthMiddleware } from "@/middleware/auth.middleware";
import { Router } from "express";

export class AuthRouter {
  private router: Router;
  private authController: AuthController;
  private authMiddleware: AuthMiddleware;
  private buyerController: BuyerController

  constructor() {
    this.authController = new AuthController();
    this.authMiddleware = new AuthMiddleware();
    this.buyerController = new BuyerController()
    this.router = Router();
    this.initialization();
  }

  private initialization(): void {
    this.router.post("/register", this.authController.createBuyerData);
    this.router.post("/login", this.authController.loginBuyer);
    this.router.post("/registerstoreadm", this.authController.createStoreAdmin);
    this.router.post("/loginstoreadm", this.authController.loginStoreAdmin);
    this.router.patch("/changepass", this.authMiddleware.verifyToken, this.buyerController.changePassword)
    this.router.patch(
      "/verification",
      this.authMiddleware.verifyToken,
      this.authController.userVerification
    );
  }

  getRouter(): Router {
    return this.router;
  }
}
