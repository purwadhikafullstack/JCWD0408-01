import { InventoryController } from "@/controllers/inventory.controller";
import { Router } from "express";

export class InventoryRouter {
    private router : Router;
    private inventoryRouter : InventoryController;

    constructor(){
        this.inventoryRouter = new InventoryController();
        this.router = Router();
        this.initializeRouter();
    }

    private initializeRouter(){
        this.router.get('/summary/:product_id', this.inventoryRouter.SummaryInventory);
        this.router.post('/update/:product_id', this.inventoryRouter.UpdateInventory);
    }

    getRouter(){
        return this.router;
    }
}