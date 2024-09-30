import { BuyerController } from "@/controllers/buyer.controller";
import { OAuthController } from "@/controllers/oauth.controller";
import { AuthMiddleware } from "@/middleware/auth.middleware";
import { Router } from "express";

export class OAuthRouter {
  static getRouter(): import("express-serve-static-core").RequestHandler<{}, any, any, import("qs").ParsedQs, Record<string, any>> {
    throw new Error('Method not implemented.');
  }
  private router: Router;
  private oAuthController: OAuthController;
  private authMiddleware: AuthMiddleware;

  constructor() {
    this.oAuthController = new OAuthController();
    this.authMiddleware = new AuthMiddleware();
    this.router = Router();
    this.initialization();
  }

  private initialization(): void {
    this.router.get('/profile', this.authMiddleware.verifyToken)
    this.router.post("/signup", this.oAuthController.signUp);
    this.router.post("/signin", this.oAuthController.signIn);
  }

  getRouter(): Router {
    return this.router;
  }
}
