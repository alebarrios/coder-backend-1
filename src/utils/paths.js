// Módulo 'path': sirve para trabajar con rutas de archivos y directorios
import path from "path";

// Define la ruta raíz del proyecto
const ROOT_PATH = path.resolve(); // Devuelve la ruta absoluta al directorio actual

// Define la ruta 'src' del proyecto
const SRC_PATH = path.join(ROOT_PATH, "src");

// Define las rutas claves del proyecto
const paths = {
    root: ROOT_PATH, // Ruta de la raíz del proyecto
    src: SRC_PATH, // Ruta del directorio "src"
    files: path.join(SRC_PATH, "files"), // Ruta del directorio de archivos privados
    managers: path.join(SRC_PATH, "managers"), // Ruta de managers
    routes: path.join(SRC_PATH, "routes"), // Ruta de routes de Express
    utils: path.join(SRC_PATH, "utils"), // Ruta de utils
    views: path.join(SRC_PATH, "views"), // Ruta del vistas de Handlebars
};

export default paths;