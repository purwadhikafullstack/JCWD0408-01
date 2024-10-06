import { TransactionController } from "@/controllers/transaction.controller";
import { Router } from "express";

export class TransactionRouter {
    private router: Router;
    private transactionController: TransactionController;

    constructor() {
        this.transactionController = new TransactionController();
        this.router = Router();
        this.initializeRouter();
    }

    private initializeRouter(){
        this.router.get('/', this.transactionController.findTransaction);
    }

    getRouter(){
        return this.router;
    }
}