import { Request, Response } from "express";
import prisma from "@/prisma";
import { responseError } from "@/helpers/responseError";

export class CartController {
  
  async addToCart(req: Request, res: Response) {
    try {
      const { product_id, user_id, quantity = 1 } = req.body;

      if (!product_id || !user_id) {
        return res
          .status(400)
          .json({ message: "Product ID and User ID are required" });
      }

      const user = await prisma.user.findUnique({ where: { user_id } });
      if (!user || !user.verified) {
        return res.status(403).json({ message: "User not registered or verified" });
      }

      const product = await prisma.product.findUnique({ where: { product_id } });
      if (!product) {
        return res.status(400).json({ message: "Product not available" });
      }

      const inventory = await prisma.inventory.findFirst({
        where: { product_id },
      });

      if (!inventory || inventory.qty < quantity) {
        return res.status(400).json({ message: "Insufficient stock" });
      }

      const existingCartItem = await prisma.cartItem.findFirst({
        where: { product_id, user_id },
      });

      if (existingCartItem) {
        const updatedCartItem = await prisma.cartItem.update({
          where: { cartitem_id: existingCartItem.cartitem_id },
          data: { quantity: existingCartItem.quantity + quantity },
        });
        return res.status(200).json(updatedCartItem);
      } else {
        const newCartItem = await prisma.cartItem.create({
          data: {
            quantity,
            product_id,
            user_id,
          },
        });
        return res.status(201).json(newCartItem);
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      responseError(res, error);
    }
  }

  async updateCart(req: Request, res: Response) {
    try {
      const { product_id, user_id, quantity } = req.body;

      if (!product_id || !user_id || quantity === undefined) {
        return res
          .status(400)
          .json({ message: "Product ID, User ID, and Quantity are required" });
      }

      if (quantity <= 0) {
        await prisma.cartItem.deleteMany({
          where: { product_id, user_id },
        });
        return res.status(204).end();
      }

      const updatedCartItem = await prisma.cartItem.updateMany({
        where: { product_id, user_id },
        data: { quantity },
      });

      return res.status(200).json(updatedCartItem);
    } catch (error) {
      console.error("Error updating cart:", error);
      responseError(res, error);
    }
  }

  async removeFromCart(req: Request, res: Response) {
    try {
      const { product_id, user_id } = req.body;

      if (!product_id || !user_id) {
        return res
          .status(400)
          .json({ message: "Product ID and User ID are required" });
      }

      await prisma.cartItem.deleteMany({
        where: { product_id, user_id },
      });

      return res.status(204).end();
    } catch (error) {
      console.error("Error removing from cart:", error);
      responseError(res, error);
    }
  }

  async getCartCount(req: Request, res: Response) {
    try {
      const { user_id } = req.params;

      if (!user_id) {
        return res
          .status(400)
          .json({ message: "User ID is required" });
      }

      const userIdNumber = Number(user_id);

      const cartCount = await prisma.cartItem.count({
        where: { user_id: userIdNumber }
      });

      return res.status(200).json({ cartCount });
    } catch (error) {
      console.error("Error getting cart count:", error);
      responseError(res, error);
    }
  }
}

export default new CartController();