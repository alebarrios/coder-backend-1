import express from "express";
import productsRouter from "./routes/products.router.js";

const app = express();
const PORT = 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req,res) => {
    res.send("<h1>Hello World</h1>");
});

productsRouter(app);

app.listen(PORT, () => {
    console.log(`server running at http://localhost:${PORT}`);
});

export default app;