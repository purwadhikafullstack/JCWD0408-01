import { Request, Response } from "express";
import prisma from "@/prisma";
import { responseError } from "@/helpers/responseError";

export class CartController {
  async addToCart(req: Request, res: Response) {
    try {
      const { product_id, user_id } = req.body;

      if (!product_id || !user_id) {
        return res
          .status(400)
          .json({ message: "Product ID and User ID are required" });
      }

      const product = await prisma.product.findUnique({
        where: { product_id },
      });
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      const existingCartItem = await prisma.cartItem.findFirst({
        where: { product_id, user_id },
      });

      if (existingCartItem) {
        const updatedCartItem = await prisma.cartItem.update({
          where: { cartitem_id: existingCartItem.cartitem_id },
          data: { quantity: existingCartItem.quantity + 1 },
        });
        return res.status(200).json(updatedCartItem);
      } else {
        const newCartItem = await prisma.cartItem.create({
          data: {
            quantity: 1,
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

      if (quantity === 0) {
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

      await prisma.cartItem.deleteMany({
        where: { product_id, user_id },
      });

      return res.status(204).end();
    } catch (error) {
      console.error("Error removing from cart:", error);
      responseError(res, error);
    }
  }
}
