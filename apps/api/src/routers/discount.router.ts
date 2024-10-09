import { DiscountController } from "@/controllers/discount.controller";
import { Router } from "express";

export class DiscountRouter {
    private router: Router;
    private discountRouter: DiscountController;

    constructor() {
        this.discountRouter = new DiscountController();
        this.router = Router()
        this.initializeRouter();
    }

    private initializeRouter() {
        this.router.get(`/:id`, this.discountRouter.getDiscountByProduct)
        this.router.post('/create', this.discountRouter.createDiscount)
        this.router.delete('/delete/:discount_code', this.discountRouter.deleteDiscount)
    }

    getRouter() {
        return this.router;
    }
}