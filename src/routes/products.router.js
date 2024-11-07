import express from "express";

const productsRouter = express.Router();

productsRouter.get('/', getAllProducts)

//inversion de control. Lo uso para poder hacer el Testing lo mas desacoplado posible.
export default (app) => { app.use('/products', productsRouter)}

function getAllProducts(req,res){
    res.status(200).json([]);
};