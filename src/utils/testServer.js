import express from "express";
import supertest from "supertest";

// Server de Test liviano. Recibe una ruta y devuelve instancia de supertest
// con app cargada con SOLO esa ruta.
function testServer(route){
    const app = express();
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    route(app);
    return supertest(app);
}

export default testServer;