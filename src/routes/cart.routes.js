import { Router } from "express";
import { validate } from "../middlewares/validation.middleware.js";
import { cartDto } from "../dtos/cart.dto.js";
import { CartController } from "../controller/cart.controller.js";

const router = Router();

// Mostrar un carrito
router.get("/:id", CartController.getById);

// Crear un carrito, debe estar validado
router.post("/", validate(cartDto), CartController.create);

// Añadir un producto a un carrito
router.post("/:id/products", CartController.addProduct);

// Borrar un carrito
router.delete("/:id", CartController.delete);

// Borrar un producto del carrito
router.delete("/:id/products/:productId", CartController.deleteProduct);

// Borrar todos los productos del carrito
router.delete("/:id/products", CartController.deleteAllProducts);

// Confirmar compra
router.post("/:id/purchase", CartController.purchase);

export default router;
