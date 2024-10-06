import express, {
  json,
  urlencoded,
  Express,
  Request,
  Response,
  NextFunction,
  Router,
} from 'express';
import cors from 'cors';
import { PORT } from './config';
import { AuthRouter } from './routers/auth.router';
import dotenv from 'dotenv';
import { BuyerRouter } from './routers/buyer.router';
import path from 'path'
import { AddrRouter } from './routers/address.router';
import { StoreAdminRouter } from './routers/storeadmin.router';
import { CategoryRouter } from './routers/category.router';
import { ProductRouter } from './routers/product.router';
import { SuperAdminRouter } from './routers/superadmin.router';
import { OAuthRouter } from './routers/oauth.router';
import { DiscountRouter } from './routers/discount.router';
import { InventoryRouter } from './routers/inventory.router';
import { CartRouter } from './routers/cart.router';
import { VoucherRouter } from './routers/voucher.router';
import { TransactionRouter } from './routers/transaction.router';




export default class App {
  private app: Express;

  constructor() {
    this.app = express();
    this.configure();
    this.routes();
    this.handleError();
  }

  private configure(): void {
    this.app.use(cors());
    this.app.use(json());
    this.app.use(urlencoded({ extended: true }));
    this.app.use('/api/public', express.static(path.join(__dirname, '../public')))
  }

  private handleError(): void {
    // not found
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      if (req.path.includes('/api/')) {
        res.status(404).send('Not found !');
      } else {
        next();
      }
    });

    // error
    this.app.use(
      (err: Error, req: Request, res: Response, next: NextFunction) => {
        if (req.path.includes('/api/')) {
          console.error('Error : ', err.stack);
          res.status(500).send('Error !');
        } else {
          next();
        }
      },
    );
  }

  private routes(): void {
    const authRouter = new AuthRouter()
    const buyerRouter = new BuyerRouter()
    const addressRouter = new AddrRouter()
    const adminRouter = new StoreAdminRouter()
    const categoryRouter = new CategoryRouter()
    const productRouter = new ProductRouter()
    const superAdminRouter = new SuperAdminRouter()
    const oAuthRouter = new OAuthRouter()
    const discountRouter = new DiscountRouter()
    const inventoryRouter = new InventoryRouter()
    const cartRouter = new CartRouter()
    const voucherRouter = new VoucherRouter()
    const transactionRouter = new TransactionRouter()


    this.app.get('/api', (req: Request, res: Response) => {
      res.send(`Hello, Purwadhika Student API!`);
    });

    this.app.use('/api/auth', authRouter.getRouter())
    this.app.use('/api/oauth', oAuthRouter.getRouter())
    this.app.use('/api/user', buyerRouter.getRouter())
    this.app.use('/api/address', addressRouter.getRouter())
    this.app.use('/api/admin', adminRouter.getRouter())
    this.app.use('/api/category', categoryRouter.getRouter())
    this.app.use('/api/product', productRouter.getRouter())
    this.app.use('/api/superadmin', superAdminRouter.getRouter())
    this.app.use('/api/discount', discountRouter.getRouter())
    this.app.use('/api/inventory', inventoryRouter.getRouter())
    this.app.use('/api/cart', cartRouter.getRouter())
    this.app.use('/api/voucher', voucherRouter.getRouter())
    this.app.use('/api/transaction', transactionRouter.getRouter())
  }

  public start(): void {
    this.app.listen(PORT, () => {
      console.log(`  ➜  [API] Local:   http://localhost:${PORT}/`);
    });
  }
}
