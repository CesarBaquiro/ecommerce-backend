import { Router } from "express";
import { productModel } from "../models/product.model.js";

const router = Router();

//-----------------------GET------------------------
router.get("/", async (req, res) => {
    //res.json(await ProductManager.getProducts());
    try {
        const products = await productModel.find();
        res.json(products);
    } catch (error) {
        res.statud(500).json({ error });
    }
});

// ------------------- POST---------------------

router.post("/", async (req, res) => {
    const {
        title,
        description,
        code,
        price,
        stock,
        category,
        thumbnails,
        status,
    } = req.body;
    const newProduct = new productModel({
        title,
        description,
        code,
        price,
        stock,
        category,
        thumbnails,
        status,
    });

    try {
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

//---------------------PUT------------------------

router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    try {
        const updatedProduct = await productModel.findByIdAndUpdate(
            id,
            updates,
            { new: true }
        );
        if (!updatedProduct) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }
        res.json(updatedProduct);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

//------------------------DELETE--------------------------

router.delete("/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const deletedProduct = await productModel.findByIdAndDelete(id);
        if (!deletedProduct) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }
        res.json({ message: "Producto eliminado con éxito" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
