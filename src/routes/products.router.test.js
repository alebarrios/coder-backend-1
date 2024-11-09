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
        //console.log(body);
        expect(status).toEqual(200);
        expect(body.length).toEqual(3);
    });
});

describe('GET /api/products/:id', () => {
    it("should return 200", async () => {
        const { status, body : product } = await request.get('/api/products/2');
        expect(status).toEqual(200);
        expect(product.id).toEqual(2);
    });

});