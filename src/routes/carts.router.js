import express from "express";

const cartsRouter = express.Router();

cartsRouter.get('/', getAllCarts)
cartsRouter.get('/:id', getCartById)

//inversion de control. Lo uso para poder hacer el Testing lo mas desacoplado posible.
export default (app) => { app.use('/api/carts', cartsRouter)}

function getAllCarts(req,res){
    res.status(200).json([]);
};

function getCartById(req,res){
    res.status(200).json([{"id": "1"}]);
};