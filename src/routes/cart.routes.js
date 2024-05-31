import { Router } from "express";
import CartManager from "../CartManager.js";

const router = Router();

//----------------------GET cart por id------------------
router.get("/:cid", async (req, res) => {
    const { cid } = req.params;
    const cart = await CartManager.getCartById(cid);

    if (isNaN(Number(cid))) {
        return res.status(400).json({
            error: "El parámetro 'cid' debe ser un número",
        });
    }

    res.json(cart);
});

//----------------------GET producto por id------------------
router.get("/:cid/product/:pid", async (req, res) => {
    const { cid, pid } = req.params;
    const producto = await CartManager.getProductByIdInCartById(cid, pid);

    if (isNaN(Number(cid))) {
        return res.status(400).json({
            error: "El parámetro 'cid' debe ser un número",
        });
    } else if (isNaN(Number(pid))) {
        return res.status(400).json({
            error: "El parámetro 'pid' debe ser un número",
        });
    }

    res.json(producto);
});

//-----------------------POST para crear carrito------------------------
router.post("/", async (req, res) => {
    try {
        const { product, quantity } = req.body;

        if (typeof product !== "number" || typeof quantity !== "number") {
            return res.status(400).json({
                error: "El 'producto' y 'quantity' deben ser números",
            });
        }

        await CartManager.addCart(product, quantity);

        res.status(201).json({ message: "Carrito creado exitosamente" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

//-----------------------POST para agregar producto a carrito existente------------------------
router.post("/:cid/product", async (req, res) => {
    try {
        const { cid } = req.params;
        const { product, quantity } = req.body;

        if (isNaN(Number(cid))) {
            return res.status(400).json({
                error: "El parámetro 'cid' debe ser un número",
            });
        }

        if (typeof product !== "number" || typeof quantity !== "number") {
            return res.status(400).json({
                error: "El 'producto' y 'quantity' deben ser números",
            });
        }

        const producto = { product, quantity };
        await CartManager.addProductToCart(Number(cid), producto);

        res.status(201).json({
            message: "Producto agregado al carrito exitosamente",
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

export default router;
