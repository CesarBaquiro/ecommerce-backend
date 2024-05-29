import { Router } from "express";

const router = Router();

const products = [];

router.get("/", (req, res, next) => {
    // return next("Error");
    res.json(products);
});

router.post("/", (req, res) => {
    const {
        id,
        title,
        description,
        code,
        price,
        status,
        stock,
        category,
        thumbnails, //Es el unico campo que no es obligatorio
    } = req.body;

    if (!title || !description) {
        // next("Los campos username y password son requeridos")
        return res.status(400).json({
            error: "Los campos title y description son requeridos",
        });
    }

    products.push({
        id,
        title,
        description,
        code,
        price,
        status,
        stock,
        category,
        thumbnails,
    });

    res.status(201).json({
        product: {
            title,
            description,
            code,
            price,
            status,
            stock,
            category,
            thumbnails,
        },
    });
});

export default router;
