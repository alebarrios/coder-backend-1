import express from "express";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import { config as configHandlebars } from "./config/handlebars.config.js";

const app = express();
const PORT = 8080;

app.use("/api/public", express.static("./src/public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

configHandlebars(app);

productsRouter(app);
cartsRouter(app);

// Control de rutas inexistentes
app.use("*", (req, res) => {
    res.status(404).render('error404', {layout : 'index', title: 'Error 404'});
});

app.listen(PORT, () => {
    console.log(`server running at http://localhost:${PORT}`);
});

export default app;