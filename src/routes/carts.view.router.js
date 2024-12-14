import { Router } from "express";
import CartManager from "../managers/CartManager.js";

const cartsViewRouter = Router();
const cartManager = new CartManager();

cartsViewRouter.get("/:cid", async (req, res) => {
    try {
        const { cid } = req.params;
        const cart = await cartManager.getOneById(cid);

        res.status(200)
        .render("cartDetail", { layout : 'index', style: 'index.css', js: 'cartDetail.js', id : cid, products: cart.toJSON().products });
    } catch (error) {
        res.status(error.code || 500).send(`<h1>Error</h1><h3>${error.message}</h3>`);
    }
});


export default cartsViewRouter;