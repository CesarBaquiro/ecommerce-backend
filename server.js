import express from "express";
import handlebars from "express-handlebars";
import __dirname from "./src/dirname.js";
import productRoutes from "./src/routes/product.routes.js";
import cartRoutes from "./src/routes/cart.routes.js";
import viewsRoutes from "./src/routes/views.routes.js";
import { logger } from "./src/middlewares/logger.js";
import path from "path";

const app = express();

// PORT
const PORT = 8080;

// App configuration
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, "../public")));

// Handlebars configuration
app.engine(
    "hbs",
    handlebars.engine({
        extname: "hbs",
        defaultLayout: "main",
    })
);

app.set("view engine", "hbs");
app.set("views", `${__dirname}/views`);

//Implementacion de middelwares
app.use(logger);

//Implementacion de las rutas
//app.use("/api/products", productRoutes);
//app.use("/api/carts", cartRoutes);
app.use("/api", viewsRoutes);

app.listen(PORT, () => {
    console.log(`Server running on Port http://localhost:${PORT}`);
});
