import ErrorManager from "./ErrorManager";
import { readJsonFile, writeJsonFile } from "../utils/fileHandler"
import paths from "../utils/paths.js";

export default class ProductManager {
    #jsonFilename;
    #products;

    constructor() {
        this.#jsonFilename = "productos.json";
    }

    // Busca un producto por su ID
    async #findOneById(id) {
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
            const { title, description, code, price, status, stock, category } = data;

            if (!title || !description || !code || !price || !status || !stock || !category) {
                throw new ErrorManager("Faltan datos obligatorios", 400);
            }

            const product = {
                id: generateId(await this.getAll()),
                title,
                description,
                code,
                price: Number(price),
                status,
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
            const { firstName, lastName, age, email, country } = data;
            const productFound = await this.#findOneById(id);

            const product = {
                id: productFound.id,
                firstName: firstName || productFound.firstName,
                lastName: lastName || productFound.lastName,
                age: age ? Number(age) : productFound.age,
                email: email || productFound.email,
                country: country || productFound.country,
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