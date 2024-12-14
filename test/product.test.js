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

  const updatedData = {
    title: "Quesos Actualizados",
    description: "Quesos campesinos frescos",
    code: "CER-002",
    price: 4000,
    stock: 200,
    category: "Food",
    thumbnails: ["https://example.com/quesos.jpg"],
    status: true,
  };

  // Test para crear un producto
  it("Creando un producto", async () => {
    const response = await requester.post("/products").send(data);
    const { _body, statusCode } = response;
    productId = _body._id; // Guarda el ID del producto creado
    expect(statusCode).to.be.equals(201);
    expect(_body).to.have.property("_id");
    expect(_body.title).to.be.equals(data.title);
  });

  // Test para traer todos los productos
  it("Traer todos los productos", async () => {
    const response = await requester.get("/products");
    const { _body, statusCode } = response;
    expect(statusCode).to.be.equals(200);
    expect(_body).to.be.an("array");
    expect(_body.length).to.be.greaterThan(0);
    const createdProduct = _body.find((product) => product._id === productId);
    expect(createdProduct).to.not.be.undefined;
  });

  // Test para actualizar un producto
  it("Actualizar el producto", async () => {
    const response = await requester
      .put(`/products/${productId}`)
      .send(updatedData);
    const { _body, statusCode } = response;
    expect(statusCode).to.be.equals(200);
    expect(_body).to.have.property("_id", productId);
    expect(_body.title).to.be.equals(updatedData.title);
  });

  // Test para eliminar un producto
  it("Eliminar el producto", async () => {
    const response = await requester.delete(`/products/${productId}`);
    const { statusCode } = response;
    expect(statusCode).to.be.equals(200);
  });

  // Test para comprobar que el producto fue eliminado
  it("Comprobar que el producto fue eliminado", async () => {
    const response = await requester.get(`/products/${productId}`);
    const { statusCode } = response;
    expect(statusCode).to.be.equals(404); // Debería devolver un 404 si el producto no existe
  });
});
