import { Router } from "express";

const router = Router();

const carts = [];
let id = 1;

//----------------------GET producto por id------------------
router.get("/:cid", (req, res) => {
    const { cid } = req.params;

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

    res.json({
        Carrito: carts[Number(cid) - 1],
    });
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
router.post("/", (req, res) => {
    const { product, quantity } = req.body;

    const producto = {
        //product contiene el id del producto, segun lo que se solicita en la consigna
        product: product,
        quantity,
    };

    const cart = {
        id: id,
        products: producto || [],
    };

    //Se autoincrementa el valor de id
    id++;

    carts.push(cart);

    res.status(201).json({
        cart: {
            id,
            product: product,
            quantity,
        },
    });
});

export default router;
