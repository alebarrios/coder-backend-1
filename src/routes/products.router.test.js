import testServer from "../utils/testServer.js";
import productsRouter from "./products.router.js";

const request = testServer(productsRouter)

describe('GET /api/products', () => {
    it("should return 200", async () => {
        const { status } = await request.get('/api/products');
        expect(status).toEqual(200);
    });
});

describe('GET /api/products/:id', () => {
    it("should return 200", async () => {
        const { status , body } = await request.get('/api/products/1');
        expect(status).toEqual(200);
        console.log(body);
        expect(body[0].id).toEqual('1');
    });

});