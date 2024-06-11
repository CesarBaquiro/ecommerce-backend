import { Router } from "express";
import ProductManager from "../ProductManager.js";

const router = Router();

//-----------------------GET------------------------

//--------------Get pantalla main
router.get("/", async (req, res) => {
    try {
        const productos = await ProductManager.getProducts();
        res.render("home.handlebars.hbs", { productos, style: "/style.css" });
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).send("Error fetching products");
    }
});

//----------------Get con websocket
router.get("/realtimeproducts", async (req, res) => {
    try {
        const productos = await ProductManager.getProducts();
        res.render("realTimeProducts.handlebars.hbs", {
            productos,
            style: "/style.css",
        });
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).send("Error fetching products");
    }
});

//-----------------------POST------------------------
router.post("/", async (req, res) => {
    try {
        const {
            title,
            description,
            code,
            price,
            stock,
            category,
            thumbnails, // Es el único campo que no es obligatorio
        } = req.body;

        const product = {
            title,
            description,
            code,
            price,
            stock,
            category,
            thumbnails: thumbnails || [], // Asegurar que thumbnails no sea obligatorio
        };

        await ProductManager.addProduct(product);

        res.status(201).json({ product });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

//----------------------DELETE----------------------
router.delete("/:pid", async (req, res) => {
    const { pid } = req.params;

    if (isNaN(Number(pid))) {
        return res.status(400).json({
            error: "El parámetro 'pid' debe ser un número",
        });
    }

    try {
        await ProductManager.deleteProduct(Number(pid));
        res.json({
            mensaje: `El producto con ID ${pid} se ha eliminado`,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
