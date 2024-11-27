import testServer from "../../src/utils/testServer.js";
import cartsRouter from "../../src/routes/carts.router.js";

const request = testServer(cartsRouter)

describe('GET /api/carts/:cid', () => {

    it("should return 404", async () => {
        const { status, body } = await request.get('/api/carts');

        expect(status).toEqual(404);
        expect(body.status).toBe("error");  // Ruta desconocida
    });

    it("should return 404", async () => {
        const { status, body } = await request.get('/api/carts/777');

        expect(status).toEqual(404);
        expect(body.status).toBe("error");   //Id no encontrado
    });

    it("should return 200", async () => {
        const { status, body } = await request.get('/api/carts/2');

        expect(status).toEqual(200);
        expect(body.status).toBe("success");
        expect(body.payload.id).toEqual(2);
    });

});

describe('POST /api/carts/', () => {

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

        expect(status).toEqual(400);
        expect(body.status).toBe("error");   //quantity debe ser numérico y no negativo
    });

    it("should return 400", async () => {
        const { status, body } = await request.post('/api/carts')
        .send({products: [{productId: 55, quantity: 5}, {productId: 55, quantity: 6} ]});

        expect(status).toEqual(400);
        expect(body.status).toBe("error");  //productId duplicado
    });

    it("should return 201", async () => {
        const { status, body } = await request.post('/api/carts')
        .send({products: [{productId: 44, quantity: 4}]});

        expect(status).toEqual(201);
        expect(body.status).toBe("success");
    });

    it("should return 201", async () => {
        const { status, body } = await request.post('/api/carts')
        .send({products: [{productId: 55, quantity: 5}, {productId: 66, quantity: 6} ]});

        expect(status).toEqual(201);
        expect(body.status).toBe("success");
    });

});

describe('POST /api/carts/:cid/product/:pid', () => {

    it("should return 404", async () => {
        const { status, body } = await request.post('/api/carts/25/product/1');

        expect(status).toEqual(404);
        expect(body.status).toBe("error");  //Id no encontrado
    });

    it("should return 400", async () => {
        const { status, body } = await request.post('/api/carts/basura/product/1');

        expect(status).toEqual(400);
        expect(body.status).toBe("error");  //Id no numérico
    });

    it("should return 400", async () => {
        const { status, body } = await request.post('/api/carts/1/product/basura');

        expect(status).toEqual(400);
        expect(body.status).toBe("error");  //Id no numérico
    });

    it("should return 200", async () => {
        const { status, body } = await request.post('/api/carts/1/product/3');

        expect(status).toEqual(200);
        expect(body.status).toBe("success");
    });

    it("should return 200", async () => {
        const { status, body } = await request.post('/api/carts/2/product/10');
        expect(status).toEqual(200);
        expect(body.status).toBe("success");
        let productos = body.payload.products.length;

        const { status: status2, body: body2 } = await request.post('/api/carts/2/product/10');
        expect(status2).toEqual(200);
        expect(body2.status).toBe("success");
        expect(body2.payload.products.length).toBe(productos);
    });

});