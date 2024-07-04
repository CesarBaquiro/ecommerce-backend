import { Schema, model } from "mongoose";

const productSchema = new Schema({
    id: String,
    title: String,
    description: String,
    code: String,
    price: Number,
    stock: Number,
    category: String,
    thumbnails: Array,
    status: Boolean,
});

export const productModel = model("products", productSchema);
