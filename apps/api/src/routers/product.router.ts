import { ProductController } from "@/controllers/product.controller";
import { uploader } from "@/helpers/uploader";
import { Router } from "express";

export class ProductRouter {
    private router: Router;
    private productController : ProductController;

    constructor(){
        this.productController = new ProductController();
        this.router = Router();
        this.initializeRouter();
    }

    private initializeRouter() {
        this.router.get('/products-catalogue', this.productController.getProductBySearchBar)
        this.router.get(`/:store_id`, this.productController.getProductbyStoreId)
        this.router.get(`/details/:product_id`, this.productController.getProductDetail)
        this.router.post(`/create/:store_id`, uploader("product", "/product").array("product"), this.productController.createProduct)
    }

    getRouter(){
        return this.router;
    } 
}