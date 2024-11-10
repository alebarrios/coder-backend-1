import express from "express";
import CartManager from "../managers/CartManager";

const cartsRouter = express.Router();
const cartManager = new CartManager();

cartsRouter.get('/:cid', getProductsByCartId)

cartsRouter.post('/', postCart)
cartsRouter.post('/:cid/product/:pid', postProductInCart)

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
        
    } catch (error) {
        
    }
    res.status(200).json([]);
};

async function postProductInCart(req,res){
    try {
        
    } catch (error) {
        
    }
    res.status(200).json([]);
};
