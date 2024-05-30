import fs from "fs";

// Clase Product
class Product {
    constructor(title, description, price, thumbnail, code, stock) {
        this.id = 0;
        this.title = title;
        this.description = description;
        this.price = price;
        this.thumbnail = thumbnail;
        this.code = code;
        this.stock = stock;
    }
}

// Clase Product Manager
class ProductManager {
    constructor(path) {
        this.path = path;
        this.products = [];
        this.init();
    }

    async init() {
        try {
            const data = await fs.promises.readFile(this.path, "utf-8");
            this.products = JSON.parse(data);
        } catch (error) {
            this.products = [];
        }
    }

    async saveProducts() {
        try {
            await fs.promises.writeFile(
                this.path,
                JSON.stringify(this.products, null, "\t")
            );
        } catch (error) {
            console.error("Error al guardar los productos", error);
        }
    }

    async addProduct(product) {
        if (
            !product.title ||
            !product.description ||
            !product.price ||
            !product.code ||
            !product.stock
        ) {
            throw new Error("Todos los campos son obligatorios");
        }

        product.id =
            this.products.length > 0
                ? this.products[this.products.length - 1].id + 1
                : 1;

        product.status = true;
        this.products.push(product);
        await this.saveProducts();
    }

    getProducts() {
        return this.products;
    }

    getProductById(idProduct) {
        return this.products.find(
            (product) => product.id === Number(idProduct)
        );
    }

    async deleteProduct(idProduct) {
        const productIndex = this.products.findIndex(
            (product) => product.id === idProduct
        );
        if (productIndex === -1) throw new Error("No se encontró el producto");
        this.products.splice(productIndex, 1);
        await this.saveProducts();
    }

    async updateProduct(idProduct, updatedFields) {
        const productIndex = this.products.findIndex(
            (product) => product.id === idProduct
        );
        if (productIndex === -1) throw new Error("No se encontró el producto");

        // Mantener los datos que no sean modificados
        this.products[productIndex] = {
            ...this.products[productIndex],
            ...updatedFields,
        };
        await this.saveProducts();
    }
}

export default new ProductManager("./data/products.json");
