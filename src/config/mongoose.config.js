import { connect, Types } from "mongoose";
import { config } from "dotenv";

config();

const username = process.env.MONGO_USERNAME;
const password = process.env.MONGO_PASSWORD;
const dbName = process.env.MONGO_DBNAME;
const clusterUrl = process.env.MONGO_CLUSTER_URL;

export const connectDB = async () => {
    const URI = `mongodb+srv://${username}:${password}@${clusterUrl}/${dbName}`;

    try {
        await connect(URI);
        console.log("Conectado a MongoDB");
    } catch (error) {
        console.log("Error al conectar con MongoDB", error.message);
    }
};

// Verifica que un ID sea válido con el formato de ObjectId de MongoDB
export const isValidID = (id) => {
    return Types.ObjectId.isValid(id);
};