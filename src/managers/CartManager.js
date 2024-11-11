import ErrorManager from "./ErrorManager";
import { readJsonFile, writeJsonFile } from "../utils/fileHandler"
import paths from "../utils/paths.js";
import generateId from "../utils/collectionHandler.js"

export default class CartManager {
    #jsonFilename;
    #carts;

    constructor() {
        this.#jsonFilename = "carrito.json";
    }

    // Busca un carrito por su ID
    async #findOneById(id) {

        if(isNaN(id)) {
            throw new ErrorManager("ID no numérico", 400);
        }
        this.#carts = await this.getAll();
        const productFound = this.#carts.find((item) => item.id === Number(id));

        if (!productFound) {
            throw new ErrorManager("ID no encontrado", 404);
        }

        return productFound;
    }

    // Obtiene una lista de productos
    async getAll() {
        try {
            this.#carts = await readJsonFile(paths.files, this.#jsonFilename);
            return this.#carts;
        } catch (error) {
            throw new ErrorManager(error.message, error.code);
        }
    }

    // Obtiene un producto específico por su ID
    async getOneById(id) {
        try {
            const productFound = await this.#findOneById(id);
            return productFound;
        } catch (error) {
            throw new ErrorManager(error.message, error.code);
        }
    }

    // Inserta un producto
    async insertOne(data) {
        try {

            if (data == undefined || !('products' in data) || !Array.isArray(data.products)
            || !(data.products.length > 0)) {
                throw new ErrorManager("Faltan datos obligatorios", 400);
            }

            if(Object.keys(data).length > 1){
                throw new ErrorManager("El request tiene formato inválido", 400);
            }

            const newProducts = [];
            data.products.forEach(item => {
                if(Object.keys(item).length > 2){
                    throw new ErrorManager("products tiene formato inválido", 400);
                }
                if(!('productId' in item) || !('quantity' in item)){
                    throw new ErrorManager("Faltan datos obligatorios", 400);
                }
                if( isNaN(item.productId)){
                    throw new ErrorManager("productId debe ser numérico", 400);
                }
                if( isNaN(item.quantity) || item.quantity < 0){
                    throw new ErrorManager("quantity debe ser numérico y no negativo", 400);
                }

                const productFound = newProducts.find((item2) => item2.productId === Number(item.productId));
                if(!productFound) {
                    newProducts.push({productId: item.productId, quantity: item.quantity});
                }else{
                    throw new ErrorManager("productId duplicado", 400);
                }
            });

            const cart = {
                id: generateId(await this.getAll()),
                products: newProducts
            };

            this.#carts.push(cart);
            await writeJsonFile(paths.files, this.#jsonFilename, this.#carts);

            return cart;
        } catch (error) {
            throw new ErrorManager(error.message, error.code);
        }
    }

    // Actualiza un producto en específico
    async updateOneById(id, data) {
        try {

            if (id == undefined || data == undefined || Object.keys(data).length === 0) {
                throw new ErrorManager("Faltan datos obligatorios", 400);
            }

            const productFound = await this.#findOneById(id);
            const { title, description, code, price, status, stock, category } = data;

            const product = {
                id: productFound.id,
                title: title || productFound.title,
                description: description || productFound.description,
                code: code || productFound.code,
                price: price ? Number(price) : productFound.price, //0 no es válido
                status: status ?? productFound.status,
                stock: Number(stock) ?? productFound.stock,   //o es válido
                category: category || productFound.category,
            };

            const index = this.#carts.findIndex((item) => item.id === Number(id));
            this.#carts[index] = product;
            await writeJsonFile(paths.files, this.#jsonFilename, this.#carts);

            return product;
        } catch (error) {
            throw new ErrorManager(error.message, error.code);
        }
    }

    // Elimina un producto en específico
    async deleteOneById (id) {
        try {
            await this.#findOneById(id);

            const index = this.#carts.findIndex((item) => item.id === Number(id));
            this.#carts.splice(index, 1);
            await writeJsonFile(paths.files, this.#jsonFilename, this.#carts);
        } catch (error) {
            throw new ErrorManager(error.message, error.code);
        }
    }
}