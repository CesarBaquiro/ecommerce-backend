import express from "express";
import handlebars from "express-handlebars";
import __dirname from "./src/dirname.js";
import productRoutes from "./src/routes/product.routes.js";
import viewsRoutes from "./src/routes/views.routes.js";
import authRoutes from "./src/routes/auth.routes.js";
import { logger } from "./src/middlewares/logger.js";
import path from "path";
import { Server } from "socket.io";
import mongoose from "mongoose";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import passport from "passport";
import { initializePassport } from "./src/config/passport.config.js";

const app = express();

// PORT
const PORT = 8080;

// Contectar a mongoose
// Conexión a la base de datos ecommerceDB
mongoose
    .connect("mongodb://localhost:27017/ecommerceDB")
    .then(() => {
        console.log("DB conectada");
    })
    .catch((error) => {
        console.log(error);
    });

// App configuration
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, "../public")));

// Passport Config
initializePassport();
app.use(passport.initialize());

// Handlebars configuration
app.engine(
    "hbs",
    handlebars.engine({
        extname: "hbs",
        defaultLayout: "main",
        runtimeOptions: {
            allowProtoPropertiesByDefault: true,
            allowProtoMethodsByDefault: true,
        },
    })
);

app.set("view engine", "hbs");
app.set("views", `${__dirname}/views`);

//Implementacion de middelwares
app.use(logger);

//Implementacion de las rutas
app.use("/api/products", productRoutes);
//app.use("/api/carts", cartRoutes);
app.use("/api", viewsRoutes);
//app.use("/api/auth", authRoutes);
app.use("/api/auth", authRoutes);

const httpServer = app.listen(PORT, () => {
    console.log(`Server running on Port http://localhost:${PORT}`);
});

// Socket.io configuration
const io = new Server(httpServer);

io.on("connection", (socket) => {
    console.log("Nuevo cliente contectado", socket.id);

    // Esperamos el evento "message" enviado por el cliente
    socket.on("message", (data) => {
        console.log("Mensaje recibido", data);
    });
});
