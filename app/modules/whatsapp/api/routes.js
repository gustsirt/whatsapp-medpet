import { Router } from "express";
import controller from "./controller.js";

const router = Router();

// http://localhost:8080/webhook/
router
  .get('/webhook', controller.verifyWebhook)
  .post('/webhook', controller.handleIncoming)

// accepts GET requests at the /webhook endpoint. You need this URL to setup webhook initially.
// info on verification request payload: https://developers.facebook.com/docs/graph-api/webhooks/getting-started#verification-requests


export default router
