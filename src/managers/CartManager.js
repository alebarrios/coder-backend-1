import ErrorManager from "./ErrorManager.js";
import { isValidID } from "../config/mongoose.config.js";
import CartModel from "../models/cart.model.js";

export default class CartManager {
    #cartModel;

    constructor() {
        this.#cartModel = CartModel;
    }

    // Busca un carrito por su ID
    async #findOneById(id) {

        if (!isValidID(id)) {
            throw new ErrorManager("ID inválido", 400);
        }

        const cartFound = await this.#cartModel.findById(id).populate("products.product");

        if (!cartFound) {
            throw new ErrorManager("ID no encontrado", 404);
        }

        return cartFound;
    }

    // Obtiene una lista de carritos
    async getAll(params) {
        try {
            const paginationOptions = {
                limit: params?.limit || 10, // Número de documentos por página (por defecto 10)
                page: params?.page || 1, // Página actual (por defecto 1)
                populate: "products.product", // Poblar el campo virtual 'products'
                lean: true, // Convertir los resultados en objetos planos
            };

            return await this.#cartModel.paginate({}, paginationOptions);
        } catch (error) {
            throw ErrorManager.handleError(error);
        }
    }

    // Obtiene un carrito específico por su ID
    async getOneById(id) {
        try {
            return await this.#findOneById(id);
        } catch (error) {
            throw ErrorManager.handleError(error);
        }
    }

    // Inserta un carrito con productos
    async insertOne(data) {
        try {
            const cart = await this.#cartModel.create(data);
            return cart;
        } catch (error) {
            throw ErrorManager.handleError(error);
        }
    }

    // Actualiza un producto específico dentro de un carrito
    async addProductToCart(id, productId) {
        try {
            const cartFound = await this.#findOneById(id);
            const productIndex =
                cartFound.products.findIndex((item) => item.product._id.toString() === productId);

            if (productIndex >= 0) {
                cartFound.products[productIndex].quantity++;
            } else {
                cartFound.products.push({ product: productId, quantity: 1 });
            }

            await cartFound.save();

            return cartFound;
        } catch (error) {
            throw ErrorManager.handleError(error);
        }
    }

    // Elimina un producto específico dentro de un carrito
    async delProductFromCart(id, productId) {
        try {
            const result = await this.#cartModel.findByIdAndUpdate(
                id,
                { $pull: { products: { product: { $eq: productId } } } })

            return result;
        } catch (error) {
            throw ErrorManager.handleError(error);
        }
    }

}