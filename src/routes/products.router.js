import express from "express";
import ProductManager from "../managers/ProductManager";

const productsRouter = express.Router();
const productManager = new ProductManager();

productsRouter.get('/', getAllProducts)
productsRouter.get('/:id', getProductById)

productsRouter.post('/', postProduct)

productsRouter.put('/:id', putProduct)

//inversion de control. Lo uso para poder hacer el Testing lo mas desacoplado posible.
export default (app) => { app.use('/api/products', productsRouter)}

async function getAllProducts(req,res){
    try {
        const products = await productManager.getAll();
        res.status(200).json({ status: "success", payload: products });

    } catch (error) {
        res.status(error.code || 500).json({ status: "error", message: error.message });
    }
};

async function getProductById(req,res){
    try {
        const { id } = req.params;
        const product = await productManager.getOneById(id);
        res.status(200).json({ status: "success", payload: product });

    } catch (error) {
        res.status(error.code || 500).json({ status: "error", message: error.message });
    }
};

async function postProduct(req,res){
    try {
        const product = await productManager.insertOne(req.body);
        res.status(201).json({ status: "success", payload: product });

    } catch (error) {
        res.status(error.code || 500).json({ status: "error", message: error.message });
    }
};

async function putProduct(req,res){
    try {
        const { id } = req.params;
        const product = await productManager.updateOneById(id, req.body);
        res.status(200).json({ status: "success", payload: product });

    } catch (error) {
        res.status(error.code || 500).json({ status: "error", message: error.message });
    }
};