import testServer from "../utils/testServer.js";
import productsRouter from "./products.router.js";

const request = testServer(productsRouter)

describe('GET /products', () => {
    it("should return 200", async () => {
        const { status } = await request.get('/products');
        expect(status).toEqual(200);
    });

   // it("should return 201", async () => {
   //     await 
   // });

});