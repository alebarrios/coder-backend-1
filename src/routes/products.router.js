import express from "express";

const productsRouter = express.Router();

productsRouter.get('/', getAllProducts)
productsRouter.get('/:id', getProductById)

//inversion de control. Lo uso para poder hacer el Testing lo mas desacoplado posible.
export default (app) => { app.use('/api/products', productsRouter)}

function getAllProducts(req,res){
    res.status(200).json([]);
};

function getProductById(req,res){
    res.status(200).json([{"id": "1"}]);
};