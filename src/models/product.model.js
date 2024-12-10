import { Schema, model } from "mongoose";
import paginate from "mongoose-paginate-v2";

const productSchema = new Schema({
    title: {
        index: { name: "idx_title" },
        type: String,
        required: [ true, "El título es obligatorio" ],
        trim: true,
        minLength: [ 3, "El título debe tener al menos 3 caracteres" ],
        maxLength: [ 25, "El título debe tener como máximo 25 caracteres" ],
    },
    description: {
        type: String,
        required: [ true, "La descripción es obligatoria" ],
        trim: true,
        minLength: [ 3, "La descripción debe tener al menos 3 caracteres" ],
        maxLength: [ 255, "La descripción debe tener como máximo 255 caracteres" ],
    },
    code: {
        type: String,
        required: [ true, "El código es obligatorio" ],
        trim: true,
        minLength: [ 3, "El código debe tener al menos 3 caracteres" ],
        maxLength: [ 7, "El código debe tener como máximo 7 caracteres" ],
    },
    price: {
        type: Number,
        required: [ true, "El precio es obligatorio" ],
        min: [ 0.1, "El precio debe ser un valor positivo" ],
    },
    status: {
        type: Boolean,
        required: [ true, "El estado es obligatorio" ],
    },
    stock: {
        type: Number,
        required: [ true, "El stock es obligatorio" ],
        min: [ 0, "El stock debe ser un valor positivo" ],
    },
    category: {
        type: String,
        required: [ true, "La categoría es obligatoria" ],
        trim: true,
        minLength: [ 3, "La categoría debe tener al menos 3 caracteres" ],
        maxLength: [ 25, "La categoría debe tener como máximo 25 caracteres" ],
    },
}, {
    timestamps: true, // Añade timestamps para generar createdAt y updatedAt
    versionKey: false, // Elimina el campo __v de versión
});

// Agrega mongoose-paginate-v2 para habilitar las funcionalidades de paginación.
productSchema.plugin(paginate);

const ProductModel = model("products", productSchema);

export default ProductModel;