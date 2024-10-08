import { AuthController } from "@/controllers/auth.controller";
import { AuthMiddleware } from "@/middleware/auth.middleware";
import { Router } from "express";

export class AuthRouter {
  private router: Router;
  private authController: AuthController;
  private authMiddleware: AuthMiddleware;

  constructor() {
    this.authController = new AuthController();
    this.authMiddleware = new AuthMiddleware();
    this.router = Router();
    this.initialization();
  }

  private initialization(): void {
    this.router.post("/register", this.authController.createBuyerData);
    this.router.post("/login", this.authController.loginBuyer);
    this.router.post("/reqchangepass", this.authMiddleware.verifyToken, this.authController.changePassMail)
    this.router.patch("/resetpassword", this.authMiddleware.verifyToken, this.authController.changePassword)
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
