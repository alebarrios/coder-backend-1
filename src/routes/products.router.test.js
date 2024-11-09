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