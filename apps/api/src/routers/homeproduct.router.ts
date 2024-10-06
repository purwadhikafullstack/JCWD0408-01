import { HomeProdController } from "@/controllers/homeproduct.controller";
import { Router } from "express";


export class HomeProdRouter {
    private router: Router;
    private homeProdController: HomeProdController

    constructor(){
        this.homeProdController = new HomeProdController()
        this.router = Router();
        this.initializeRouter();
    }

    private initializeRouter() {
        this.router.get('/disc', this.homeProdController.getDiscountedProduct)
        this.router.get('/category', this.homeProdController.getCategoryHome)
        this.router.post('/', this.homeProdController.getClosestProduct)
    }

    getRouter(){
        return this.router;
    } 
}