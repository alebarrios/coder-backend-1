import express from "express";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import productsViewRouter from "./routes/products.view.router.js";
import cartsViewRouter from "./routes/carts.view.router.js";
import { config as configHandlebars } from "./config/handlebars.config.js";
import { config as configWebsocket } from "./config/websocket.config.js";
import { connectDB } from "./config/mongoose.config.js";

const app = express();
const PORT = 8080;
// Conexión con la Base de Datos del Cloud de MongoDB
connectDB();

app.use("/api/public", express.static("./src/public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

configHandlebars(app);

app.use('/', productsViewRouter);
app.use('/carts', cartsViewRouter);

productsRouter(app);
cartsRouter(app);

app.use("*", (req, res) => {
    res.status(404).render('error404', {layout : 'index', style: 'index.css', title: 'Error 404'});
});

const httpServer = app.listen(PORT, () => {
    console.log(`server running at http://localhost:${PORT}`);
});

configWebsocket(httpServer);

export default app;