import express from "express";
import CartManager from "../managers/CartManager.js";

const cartsRouter = express.Router();
const cartManager = new CartManager();

cartsRouter.get('/:cid', getProductsByCartId)

cartsRouter.post('/', postCart)
cartsRouter.post('/:cid/product/:pid', postProductInCart)

cartsRouter.put('/:cid', putProductsInCart)
cartsRouter.put('/:cid/products/:pid', setQuantityOfProductsInCart)


cartsRouter.delete('/:cid/products/:pid', deleteProductFromCart)
cartsRouter.delete('/:cid', deleteAllProductsFromCart)

//inversion de control. Lo uso para poder hacer el Testing lo mas desacoplado posible.
export default (app) => { app.use('/api/carts', cartsRouter)}

async function getProductsByCartId(req,res){
    try {
        const { cid } = req.params;
        const cart = await cartManager.getOneById(cid);
        res.status(200).json({ status: "success", payload: cart });

    } catch (error) {
        res.status(error.code || 500).json({ status: "error", message: error.message });
    }
};

async function postCart(req,res){
    try {
        const cart = await cartManager.insertOne(req.body);
        res.status(201).json({ status: "success", payload: cart });
    } catch (error) {
        res.status(error.code || 500).json({ status: "error", message: error.message });
    }
};

async function putProductsInCart(req,res){
    try {
        const { cid } = req.params;
        const cart = await cartManager.updateProductsInCart(cid, req.body);
        res.status(200).json({ status: "success", payload: cart });
    } catch (error) {
        res.status(error.code || 500).json({ status: "error", message: error.message });
    }
};

async function setQuantityOfProductsInCart(req,res){
    try {
        const { cid, pid } = req.params;
        const cart = await cartManager.setQuantOfProductsInCart(cid, pid, req.body);
        res.status(200).json({ status: "success", payload: cart });
    } catch (error) {
        res.status(error.code || 500).json({ status: "error", message: error.message });
    }
};

async function postProductInCart(req,res){
    try {
        const { cid, pid } = req.params;
        const cart = await cartManager.addProductToCart(cid,pid);
        res.status(200).json({ status: "success", payload: cart });
    } catch (error) {
        res.status(error.code || 500).json({ status: "error", message: error.message });
    }
};

async function deleteProductFromCart(req,res){
    try {
        const { cid, pid } = req.params;
        const cart = await cartManager.delProductFromCart(cid,pid);
        res.status(200).json({ status: "success", payload: cart });
    } catch (error) {
        res.status(error.code || 500).json({ status: "error", message: error.message });
    }
};

async function deleteAllProductsFromCart(req,res){
    try {
        const { cid } = req.params;
        const cart = await cartManager.updateProductsInCart(cid);
        res.status(200).json({ status: "success", payload: cart });
    } catch (error) {
        res.status(error.code || 500).json({ status: "error", message: error.message });
    }
};
