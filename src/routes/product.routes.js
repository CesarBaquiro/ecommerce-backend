import { Router } from "express";
import __dirname from "../dirname.js"; // Importar __dirname

const router = Router();

const products = [];
let id = 1;

//Funcion para usar el archivo de persistencia

//-----------------------GET------------------------
router.get("/", (req, res, next) => {
    res.json(products);
});

//----------------------GET producto por id------------------
router.get("/:pid", (req, res) => {
    const { pid } = req.params;

    if (isNaN(Number(pid))) {
        return res.status(400).json({
            error: "El parámetro 'pid' debe ser un número",
        });
    }

    if (Number(pid) < 0 || Number(pid) > products.length) {
        return res.status(400).json({
            error: "No hay productos registrados con ese id",
        });
    }

    res.json({
        Producto: products[Number(pid) - 1],
    });
});

//-----------------------POST------------------------
router.post("/", (req, res) => {
    const {
        title,
        description,
        code,
        price,
        status,
        stock,
        category,
        thumbnails, //Es el unico campo que no es obligatorio
    } = req.body;

    const product = {
        id: id,
        title,
        description,
        code,
        price,
        status: true,
        stock,
        category,
        thumbnails: thumbnails || [], // Asegurar que thumbnails no sea obligatorio, //Es el unico campo que no es obligatorio
    };

    //Se autoincrementa el valor de id
    id++;

    if (!title || !description) {
        // next("Los campos username y password son requeridos")
        return res.status(400).json({
            error: "Los campos title y description son requeridos",
        });
    }

    products.push(product);

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

//-----------------------PUT------------------------
router.put("/:pid", (req, res) => {
    const { pid } = req.params;
    const {
        title,
        description,
        code,
        price,
        status,
        stock,
        category,
        thumbnails, //Es el unico campo que no es obligatorio
    } = req.body;

    if (isNaN(Number(pid))) {
        return res.status(400).json({
            error: "El parámetro 'pid' debe ser un número",
        });
    }

    if (Number(pid) < 0 || Number(pid) > products.length) {
        return res.status(400).json({
            error: "No hay productos registrados con ese id",
        });
    }
    // Busco el producto a actualizar
    const product = products.find((product) => product.id === Number(pid));

    if (!product) {
        return res.status(404).json({
            message: "Product not found",
        });
    }

    // Actualizo el producto
    product.title = title || product.title;
    product.description = description || product.description;
    product.code = code || product.code;
    product.price = price || product.price;
    product.status = status === undefined ? product.status : status;
    product.stock = stock || product.stock;
    product.category = category || product.category;
    product.thumbnails = thumbnails || product.thumbnails;

    // Actualizo el producto dentro del array
    products[Number(pid) - 1] = product;
    res.json({
        message: "User updated successfully",
    });
});

//----------------------DELETE----------------------

router.delete("/:pid", (req, res) => {
    const { pid } = req.params;

    if (isNaN(Number(pid))) {
        return res.status(400).json({
            error: "El parámetro 'pid' debe ser un número",
        });
    }

    if (Number(pid) < 0 || Number(pid) > products.length) {
        return res.status(400).json({
            error: "No hay productos registrados con ese id",
        });
    }

    delete products[pid - 1];

    res.json({
        mensaje: `El producto de la posicion ${pid} se ha eliminado`,
    });
});

export default router;
