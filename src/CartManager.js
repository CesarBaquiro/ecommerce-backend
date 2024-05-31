import fs from "fs";

// Clase Cart
class Cart {
    constructor(producto, quantity) {
        this.id = 0; //Id del carrito
        this.producto = producto; //Id del producto
        this.quantity = quantity;
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

    async addCart(cart) {
        /** 
         * 
        if (!cart.product || cart.quantity) {
            throw new Error("Todos los campos son obligatorios");
        }
        */

        cart.id =
            this.carts.length > 0
                ? this.carts[this.carts.length - 1].id + 1
                : 1;

        this.carts.push(cart);
        await this.saveCarts();
    }

    getCartById(idCart) {
        return this.carts.find((cart) => cart.id === Number(idCart));
    }
}

export default new CartManager("./data/carts.json");
