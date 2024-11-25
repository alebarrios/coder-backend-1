import { Router } from "express";
import ProductManager from "../managers/ProductManager.js";

const productsViewRouter = Router();
const productManager = new ProductManager();

productsViewRouter.get("/", async (req, res) => {
    try {
        const products = await productManager.getAll();
        res.status(200)
        .render("home", { layout : 'index', style: 'index.css', js: 'index.js', title: "Productos", products });
    } catch (error) {
        res.status(error.code || 500).send(`<h1>Error</h1><h3>${error.message}</h3>`);
    }
});

productsViewRouter.get("/realtimeproducts", async (req, res) => {
    try {
        res.status(200)
        .render("realTimeProducts", { layout: 'index', style: 'index.css', js: 'products.socket.js', title: "RTP" });
    } catch (error) {
        res.status(500).send(`<h1>Error</h1><h3>${error.message}</h3>`);
    }
});

export default productsViewRouter;