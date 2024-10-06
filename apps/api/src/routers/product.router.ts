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
        this.router.get('/products/random', this.productController.getProductRandom)
        this.router.get('/products/all', this.productController.getAllProduct)
        this.router.get(`/:store_id`, this.productController.getProductbyStoreId)
        this.router.get(`/details/:product_id`, this.productController.getProductDetail)
        this.router.post(`/create/:store_id`, uploader("product", "/product").array("product"), this.productController.createProduct)
        this.router.patch(`/update/:product_id`, uploader("product", "/product").array("product"), this.productController.updateProduct)
        this.router.delete(`/delete/:product_id`, this.productController.deleteProduct)
    
    }

    getRouter(){
        return this.router;
    } 
}