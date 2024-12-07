import ErrorManager from "./ErrorManager.js";
import { readJsonFile, writeJsonFile } from "../utils/fileHandler.js"
import paths from "../utils/paths.js";
import generateId from "../utils/collectionHandler.js"

export default class ProductManager {
    #jsonFilename;
    #products;

    constructor() {
        this.#jsonFilename = "productos.json";
    }

    // Busca un producto por su ID
    async #findOneById(id) {

        if(isNaN(id)) {
            throw new ErrorManager("ID no numérico", 400);
        }
        this.#products = await this.getAll();
        const productFound = this.#products.find((item) => item.id === Number(id));

        if (!productFound) {
            throw new ErrorManager("ID no encontrado", 404);
        }

        return productFound;
    }

    // Obtiene una lista de productos
    async getAll() {
        try {
            this.#products = await readJsonFile(paths.files, this.#jsonFilename);
            return this.#products;
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
            if (data == undefined || !('title' in data) || !('description' in data) || !('code' in data) ||
            !('price' in data) || !('stock' in data) ||
            !('category' in data)) {
                throw new ErrorManager("Faltan datos obligatorios", 400);
            }

            const { title, description, code, price, stock, category } = data;

            if (typeof title === "string" && title.trim().length === 0) {
                throw new ErrorManager("El título no puede ser vacío", 400);
            }
            if (typeof description === "string" && description.trim().length === 0) {
                throw new ErrorManager("La descripción no puede ser vacía", 400);
            }
            if (typeof code === "string" && code.trim().length === 0) {
                throw new ErrorManager("El código no puede ser vacío", 400);
            }
            if(!Number.isInteger(parseFloat(price)) || price == 0) {
                throw new ErrorManager("El precio no puede ser 0", 400);
            }
            if(!Number.isInteger(parseInt(stock))) {
                throw new ErrorManager("El stock debe ser numérico", 400);
            }
            if (typeof category === "string" && category.trim().length === 0) {
                throw new ErrorManager("La categoría no puede ser vacía", 400);
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

            this.#products.push(product);
            await writeJsonFile(paths.files, this.#jsonFilename, this.#products);

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

            const index = this.#products.findIndex((item) => item.id === Number(id));
            this.#products[index] = product;
            await writeJsonFile(paths.files, this.#jsonFilename, this.#products);

            return product;
        } catch (error) {
            throw new ErrorManager(error.message, error.code);
        }
    }

    // Elimina un producto en específico
    async deleteOneById (id) {
        try {
            await this.#findOneById(id);

            const index = this.#products.findIndex((item) => item.id === Number(id));
            this.#products.splice(index, 1);
            await writeJsonFile(paths.files, this.#jsonFilename, this.#products);
        } catch (error) {
            throw new ErrorManager(error.message, error.code);
        }
    }
}