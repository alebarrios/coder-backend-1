import express from "express";
import ProductManager from "../managers/ProductManager";

const productsRouter = express.Router();
const productManager = new ProductManager();

productsRouter.get('/', getAllProducts)
productsRouter.get('/:id', getProductById)

//inversion de control. Lo uso para poder hacer el Testing lo mas desacoplado posible.
export default (app) => { app.use('/api/products', productsRouter)}

async function getAllProducts(req,res){
    res.status(200).json(await productManager.getAll());
};

async function getProductById(req,res){
    const { id } = req.params;
    res.status(200).json(await productManager.getOneById(id));
};