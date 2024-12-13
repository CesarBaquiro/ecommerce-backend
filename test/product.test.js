import { expect } from "chai";
import supertest from "supertest";
import "dotenv/config.js";

const requester = supertest(`http://localhost:${process.env.PORT}/api`);

describe("Testeando productos", () => {
  let productId = "";
  const data = {
    title: "Quesos",
    description: "Quesos campesinos",
    code: "CER-001",
    price: 3500,
    stock: 150,
    category: "Food",
    thumbnails: [],
    status: true,
  };
  it("Creando un producto", async () => {
    const response = await requester.post("/products").send(data);
    const { _body, statusCode } = response;
    productId = _body._id;
    expect(statusCode).to.be.equals(201);
  });
  it("Leyendo un producto", async () => {});
  it(`Eliminando el producto`, async () => {
    const response = await requester.delete("/products/" + productId);
    const { statusCode } = response;
    expect(statusCode).to.be.equals(200);
  });
});
