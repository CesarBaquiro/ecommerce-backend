import { Router } from "express";
import CartManager from "../CartManager.js";

const router = Router();

//----------------------GET cart por id------------------
router.get("/:cid", async (req, res) => {
    const { cid } = req.params;
    const cart = await CartManager.getCartById(cid);
    /**
 * 
if (isNaN(Number(cid))) {
    return res.status(400).json({
        error: "El parámetro 'pid' debe ser un número",
    });
}

if (Number(cid) < 0 || Number(cid) > carts.length) {
    return res.status(400).json({
            error: "No hay productos registrados con ese id",
        });
    }
    */

    res.json(cart);
});

//----------------------GET producto por id------------------
router.get("/:cid/product/:pid", (req, res) => {
    const { cid } = req.params;
    const { pid } = req.params;

    if (isNaN(Number(cid))) {
        return res.status(400).json({
            error: "El parámetro 'cid' debe ser un número",
        });
    } else if (isNaN(Number(pid))) {
        return res.status(400).json({
            error: "El parámetro 'pid' debe ser un número",
        });
    }

    if (Number(cid) < 0 || Number(cid) > carts.length) {
        return res.status(400).json({
            error: "No hay carritos registrados con ese id",
        });
    }

    if (Number(pid) < 0 || Number(pid) > carts.length) {
        return res.status(400).json({
            error: "No hay productos registrados con ese id",
        });
    }

    res.json({
        Carrito: carts[Number(cid) - 1],
    });
});

//-----------------------POST------------------------
router.post("/", async (req, res) => {
    try {
        const {
            product, //Id de l producto
            quantity,
        } = req.body;

        const cart = {
            //product contiene el id del producto, segun lo que se solicita en la consigna
            product,
            quantity,
        };

        await CartManager.addCart(cart);

        res.status(201).json({ cart });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

export default router;
