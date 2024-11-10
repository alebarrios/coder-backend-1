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
            if (data == undefined || !('products' in data) ) {
                throw new ErrorManager("Faltan datos obligatorios", 400);
            }

            const { title, description, code, price, status, stock, category } = data;

            if(price == 0) {
                throw new ErrorManager("El precio no puede ser 0", 400);
            }

            const product = {
                id: generateId(await this.getAll()),
                title,
                description,
                code,
                price: Number(price),
                status: true,
                stock: Number(stock),
                category
            };

            this.#carts.push(product);
            await writeJsonFile(paths.files, this.#jsonFilename, this.#carts);

            return product;
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