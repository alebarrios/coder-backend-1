import testServer from "../utils/testServer.js";
import productsRouter from "./products.router.js";

const request = testServer(productsRouter)

describe('GET /api/products', () => {

    it("should return 200", async () => {
        const { status } = await request.get('/api/products');
        expect(status).toEqual(200);
    });

    it("should return 200", async () => {
        const { status, body } = await request.get('/api/products');
        expect(status).toEqual(200);
        expect(body.status).toBe("success");
        expect(body.payload.length).toEqual(3);
    });
});

describe('GET /api/products/:id', () => {

    it("should return 200", async () => {
        const { status, body } = await request.get('/api/products/2');
        expect(status).toEqual(200);
        expect(body.status).toBe("success");
        expect(body.payload.id).toEqual(2);
    });

    it("should return 404", async () => {
        const { status, body } = await request.get('/api/products/867');
        expect(status).toEqual(404);
        expect(body.status).toEqual("error");
    });

    it("should return 404", async () => {
        const { status, body } = await request.get('/api/products/bla');
        expect(status).toEqual(404);
        expect(body.status).toEqual("error");
    });

});

describe('POST /api/products', () => {

    it("should return 400", async () => {
        const { status, body } = await request.post('/api/products');
        expect(status).toEqual(400);
        expect(body.status).toBe("error");
    });

    it("should return 400", async () => {
        const { status, body } = await request.post('/api/products')
        .send({title: "productoX"});

        expect(status).toEqual(400);
        expect(body.status).toBe("error");
    });

    it("should return 201", async () => {
        const { status, body } = await request.post('/api/products')
        .send({
            title:      "producto 4",
            description: "Descripción producto 4",
            code:       "Código 4",
            price:      444,
            status:     true,
            stock:      4,
            category:   "Categoría Producto 4"
        });

        expect(status).toEqual(201);
        expect(body.status).toBe("success");
    });

});

describe('PUT /api/products/:id', () => {

    it("should return 400", async () => {
        const { status, body } = await request.put('/api/products/2')

        expect(status).toEqual(400);
        expect(body.status).toEqual("error");
    });

    it("should return 400", async () => {
        const { status, body } = await request.put('/api/products/555')

        expect(status).toEqual(400);
        expect(body.status).toEqual("error");
    });

    it("should return 400", async () => {
        const { status, body } = await request.put('/api/products/555')
        .send({});

        expect(status).toEqual(400);
        expect(body.status).toEqual("error");
    });

    it("should return 404", async () => {
        const { status, body } = await request.put('/api/products/555')
        .send({title: "Un nuevo título"});

        expect(status).toEqual(404);
        expect(body.status).toEqual("error");
    });

    it("should return 200", async () => {
        const { status, body } = await request.put('/api/products/3')
        .send({
            title:      "producto 3 NUEVO",
            description: "Descripción NUEVA producto 3",
            code:       "Código 3",
            price:      334,
            status:     true,
            stock:      1,
            category:   "Categoría Producto 3"
        });

        expect(status).toEqual(200);
        expect(body.status).toBe("success");
    });

    it("should return 200", async () => {
        const { status, body } = await request.put('/api/products/2')
        .send({
            description: "Descripción NUEVA producto 2",
            status:     false,
            stock:      0
        });

        expect(status).toEqual(200);
        expect(body.status).toBe("success");
        expect(body.payload.id).toBe(2);
        expect(body.payload.status).toBe(false);
        expect(body.payload.stock).toBe(0);
    });

    it("should return 200", async () => {
        const { status, body } = await request.put('/api/products/2')
        .send({
            description: "",
            price:      0,
            stock:      1
        });

        expect(status).toEqual(200);
        expect(body.status).toBe("success");
        expect(body.payload.id).toBe(2);
        expect(body.payload.stock).toBe(1);
        expect(body.payload.price).not.toBe(0);
    });
})