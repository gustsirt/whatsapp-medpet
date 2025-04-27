import service from "../logic/service.js";
import messageHandler from "../logic/messageHandler.js";
import configEnv from "../../../config/env.js";
import { normalizePhoneNumber } from "../../../pkg/utils/normalizePhoneNumber.js";

class Controller {
  constructor() { }

  // Recibe mensaje
  async handleIncoming(req, res) { // POST
    const message = req.body.entry?.[0]?.changes[0]?.value?.messages?.[0];
    const senderInfo = req.body.entry?.[0]?.changes[0]?.value?.contacts?.[0]; // Quien lo envio

    if (message) {
      message.from = normalizePhoneNumber(message.from)
      await messageHandler.handleIncomingMessage(message, senderInfo);
    }
    res.sendStatus(200);
  }

  // Se usa para verificar que funcione esta conexión
  verifyWebhook(req, res) { // GET
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    if (mode === 'subscribe' && token === configEnv.WEBHOOK_VERIFY_TOKEN) {
      console.log('Webhook verified successfully!');
      res.status(200).send(challenge);
    } else {
      res.sendStatus(403);
    }
  }




}

export default new Controller();