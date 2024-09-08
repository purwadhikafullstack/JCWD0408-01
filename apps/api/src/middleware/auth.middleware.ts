import { responseError } from '@/helpers/responseError';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

export class AuthMiddleware {
  verifyToken(req: Request, res: Response, next: NextFunction) {
    try {
      let token = req.headers.authorization?.replace('Bearer ', '');

      if (!token) throw 'Token empty';

      const user = verify(token, process.env.SECRET_KEY!);

      req.user = user as User;
      
    } catch (error) {
      responseError(res, error);
    }
  }

  checkStrAdmin(req: Request, res: Response, next: NextFunction) {
    try {
      if (req.user.role !== 'store_admin') throw 'You Are Not a Store Admin!';

      next();
    } catch (error) {
      responseError(res, error);
    }
  }

  checkSuperAdmin(req: Request, res: Response, next: NextFunction) {
    try {
      if (req.user.role !== 'super_admin') throw 'You Are Not a Super Admin!';

      next();
    } catch (error) {
      responseError(res, error);
    }
  }
}
