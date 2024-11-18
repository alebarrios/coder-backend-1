import { Router } from "express";
import ProductManager from "../managers/ProductManager.js";

const productsViewRouter = Router();
const productManager = new ProductManager();

productsViewRouter.get("/", async (req, res) => {
    try {
        const products = await productManager.getAll();
        res.status(200).render("home", { layout : 'index', style: 'index.css', title: "Productos", products });
    } catch (error) {
        res.status(error.code || 500).send(`<h1>Error</h1><h3>${error.message}</h3>`);
    }
});

export default productsViewRouter;