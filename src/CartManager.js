import fs from "fs";

// Clase Cart
class Cart {
    constructor() {
        this.id = 0; // Id del carrito
        this.products = []; // Array de productos
    }
}

// Clase Cart Manager
class CartManager {
    constructor(path) {
        this.path = path;
        this.carts = [];
        this.init();
    }

    async init() {
        try {
            const data = await fs.promises.readFile(this.path, "utf-8");
            this.carts = JSON.parse(data);
        } catch (error) {
            this.carts = [];
        }
    }

    async saveCarts() {
        try {
            await fs.promises.writeFile(
                this.path,
                JSON.stringify(this.carts, null, "\t")
            );
        } catch (error) {
            console.error("Error al guardar el carrito", error);
        }
    }

    async addCart(product, quantity) {
        const cart = new Cart();
        cart.id =
            this.carts.length > 0
                ? this.carts[this.carts.length - 1].id + 1
                : 1;
        cart.products.push({ product, quantity });
        this.carts.push(cart);
        await this.saveCarts();
    }

    getCartById(idCart) {
        return this.carts.find((cart) => cart.id === Number(idCart));
    }

    getProductByIdInCartById(idCart, idProduct) {
        const cart = this.carts.find((cart) => cart.id === Number(idCart));
        if (cart) {
            return cart.products.find(
                (producto) => producto.product === Number(idProduct)
            );
        }
        return null;
    }

    async addProductToCart(cartId, product) {
        const cart = this.getCartById(cartId);
        if (cart) {
            cart.products.push(product);
            await this.saveCarts();
        }
    }
}

export default new CartManager("./data/carts.json");
