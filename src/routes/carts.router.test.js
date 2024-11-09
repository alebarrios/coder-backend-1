import testServer from "../utils/testServer.js";
import cartsRouter from "./carts.router.js";

const request = testServer(cartsRouter)

describe('GET /carts', () => {
    it("should return 200", async () => {
        const { status } = await request.get('/carts');
        expect(status).toEqual(200);
    });

   // it("should return 201", async () => {
   //     await 
   // });

});