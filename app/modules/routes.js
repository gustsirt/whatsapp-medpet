import { Router } from "express";
import whatsappRouter from "./whatsapp/routes.js"

const router = Router()

router.get("/", (req, res) => {
  res.send(`
    <h3>Server online</h3>
    <pre>Nothing to see here.
Checkout README.md to start.</pre>`);
});

// http://localhost:8080/
router.get('/webhook', whatsappRouter)

router.get('/v1/pruebas', async (req, res, next) => { res.send("Prueba Pruebas") });
router.all('*', (req, res, next) => { next(new AppError(`No se encuentra la url: ${req.originalUrl} en este servidor`, 404)); });

// giveRole(['PUBLIC']), authMiddleware(), securityMiddleware(users)
export default router