import { OAuthController } from "@/controllers/oauth.controller";
import { AuthMiddleware } from "@/middleware/auth.middleware";
import { Router } from "express";

export class OAuthRouter {
  static getRouter(): import("express-serve-static-core").RequestHandler<{}, any, any, import("qs").ParsedQs, Record<string, any>> {
    throw new Error('Method not implemented.');
  }
  private router: Router;
  private authMiddleware: AuthMiddleware;
  private oAuthController: OAuthController

  constructor() {
    this.authMiddleware = new AuthMiddleware();
    this.oAuthController = new OAuthController()
    this.router = Router();
    this.initialization();
  }

  private initialization(): void {
    this.router.post('/google', this.oAuthController.LoginGoogle)
  }

  getRouter(): Router {
    return this.router;
  }
}
