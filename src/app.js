import express from "express";
import productsRouter from "./routes/products.router.js";

const app = express();
const PORT = 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

productsRouter(app);
cartsRouter(app);

// Control de rutas inexistentes
app.use("*", (req, res) => {
    res.status(404).json({ status: "error", message: "Ruta desconocida" });
});

app.listen(PORT, () => {
    console.log(`server running at http://localhost:${PORT}`);
});

export default app;