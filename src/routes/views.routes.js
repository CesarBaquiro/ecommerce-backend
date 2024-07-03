import { Router } from "express";

import { productModel } from "../models/product.model.js";

const router = Router();

//-----------------------GET------------------------
router.get("/index", async (req, res) => {
    res.render("index.hbs", { style: "/style.css" });
});

//----------------Get con websocket
router.get("/realtimeproducts", async (req, res) => {
    try {
        const products = await productModel.find().lean();

        res.render("realTimeProducts.hbs", {
            products,
            style: "/style.css",
        });
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).send("Error fetching products");
    }
});

//-----------------------POST------------------------

//----------------------DELETE----------------------

export default router;
