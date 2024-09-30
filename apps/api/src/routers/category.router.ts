import { CategoryController } from "@/controllers/category.controller";
import { Router } from "express";

export class CategoryRouter {
    private router: Router;
    private categoryRouter: CategoryController;

    constructor() {
        this.categoryRouter = new CategoryController();
        this.router = Router()
        this.initializeRouter();
    }

    private initializeRouter() {
        this.router.get('/', this.categoryRouter.getAllCategoryQuery)
        this.router.get('/all', this.categoryRouter.getAllCategory)
        this.router.post('/create', this.categoryRouter.createCategory)
        this.router.delete('/:id', this.categoryRouter.deleteCategory)
    }

    getRouter() {
        return this.router;
    }
}