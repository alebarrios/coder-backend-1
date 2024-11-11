import testServer from "../utils/testServer.js";
import cartsRouter from "./carts.router.js";

const request = testServer(cartsRouter)

describe('GET /api/carts/:cid', () => {

    it("should return 404", async () => {
        const { status, body } = await request.get('/api/carts');

        expect(status).toEqual(404);
        expect(body.status).toBe("error");  // Ruta desconocida
    });

    it("should return 404", async () => {
        const { status, body } = await request.get('/api/carts/5');

        expect(status).toEqual(404);
        expect(body.status).toBe("error");   //Id no encontrado
    });

    it("should return 200", async () => {
        const { status, body } = await request.get('/api/carts/2');
        console.log(body.payload);

        expect(status).toEqual(200);
        expect(body.status).toBe("success");
        expect(body.payload.id).toEqual(2);
    });

});

describe.only('POST /api/carts/', () => {

    it("should return 400", async () => {
        const { status, body } = await request.post('/api/carts');

        expect(status).toEqual(400);
        expect(body.status).toBe("error");  //Faltan datos obligatorios
    });

    it("should return 400", async () => {
        const { status, body } = await request.post('/api/carts')
        .send({});

        expect(status).toEqual(400);
        expect(body.status).toBe("error");   //Faltan datos obligatorios
    });

    it("should return 400", async () => {
        const { status, body } = await request.post('/api/carts')
        .send({basura: "bla"});

        expect(status).toEqual(400);
        expect(body.status).toBe("error");   //Faltan datos obligatorios
    });

    it("should return 400", async () => {
        const { status, body } = await request.post('/api/carts')
        .send({products: [], basura: "bla"});

        expect(status).toEqual(400);
        expect(body.status).toBe("error");   //El request tiene formato inválido
    });

    it("should return 400", async () => {
        const { status, body } = await request.post('/api/carts')
        .send({products: []});
        console.log(body);

        expect(status).toEqual(400);
        expect(body.status).toBe("error");   //Faltan datos obligatorios
    });

    it("should return 400", async () => {
        const { status, body } = await request.post('/api/carts')
        .send({products: [{productId: 55, quantity: 5, basura: "basura"}]});

        expect(status).toEqual(400);
        expect(body.status).toBe("error");   //products tiene formato inválido
    });

    it("should return 400", async () => {
        const { status, body } = await request.post('/api/carts')
        .send({products: [{productId: 55, quantity: 5}, {quantity: 6} ]});
        console.log(body);

        expect(status).toEqual(400);
        expect(body.status).toBe("error");   //Faltan datos obligatorios
    });

    it("should return 400", async () => {
        const { status, body } = await request.post('/api/carts')
        .send({products: [{productId: "bla", quantity: 5}, {productId: 55, quantity: 6} ]});

        expect(status).toEqual(400);
        expect(body.status).toBe("error");   //productId debe ser numérico
    });

    it("should return 400", async () => {
        const { status, body } = await request.post('/api/carts')
        .send({products: [{productId: 55, quantity: 5}, {productId: 66, quantity: -1} ]});
        console.log(body);

        expect(status).toEqual(400);
        expect(body.status).toBe("error");   //quantity debe ser numérico y no negativo
    });

});