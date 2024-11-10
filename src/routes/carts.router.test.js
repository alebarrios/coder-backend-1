import testServer from "../utils/testServer.js";
import cartsRouter from "./carts.router.js";

const request = testServer(cartsRouter)

describe.only('GET /api/carts/:cid', () => {

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

    it.only("should return 200", async () => {
        const { status, body } = await request.get('/api/carts/2');
        console.log(body.payload);

        expect(status).toEqual(200);
        expect(body.status).toBe("success");
        expect(body.payload.id).toEqual(2);
    });

});