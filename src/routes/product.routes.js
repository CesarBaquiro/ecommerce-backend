import { Router } from "express";
import ProductManager from "../ProductManager.js";

const router = Router();

//-----------------------GET------------------------
router.get("/", async (req, res) => {
    res.json(await ProductManager.getProducts());
});

//----------------------GET producto por id------------------
router.get("/:pid", async (req, res) => {
    const { pid } = req.params;
    const product = await ProductManager.getProductById(pid);

    if (isNaN(Number(pid))) {
        return res.status(400).json({
            error: "El parámetro 'pid' debe ser un número",
        });
    }

    if (!product) {
        return res.status(404).json({
            error: "No se encontró el producto",
        });
    }

    res.json(product);
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

//-----------------------PUT------------------------
router.put("/:pid", async (req, res) => {
    const { pid } = req.params;
    const updatedFields = req.body;

    if (isNaN(Number(pid))) {
        return res.status(400).json({
            error: "El parámetro 'pid' debe ser un número",
        });
    }

    const product = await ProductManager.getProductById(pid);
    if (!product) {
        return res.status(404).json({
            message: "Product not found",
        });
    }

    try {
        await ProductManager.updateProduct(Number(pid), updatedFields);

        res.json({ message: "Product updated successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//----------------------DELETE----------------------
router.delete("/:pid", async (req, res) => {
    const { pid } = req.params;

    if (isNaN(Number(pid))) {
        return res.status(400).json({
            error: "El parámetro 'pid' debe ser un número",
        });
    }

    try {
        await ProductManager.deleteProduct(Number(pid));
        res.json({
            mensaje: `El producto de la posición ${pid} se ha eliminado`,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
