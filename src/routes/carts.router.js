import express from "express";

const cartsRouter = express.Router();

cartsRouter.get('/', getAllCarts)

//inversion de control. Lo uso para poder hacer el Testing lo mas desacoplado posible.
export default (app) => { app.use('/carts', cartsRouter)}

function getAllCarts(req,res){
    res.status(200).json([]);
};