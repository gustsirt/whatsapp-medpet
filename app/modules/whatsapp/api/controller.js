import service from "../logic/service.js";
import messageHandler from "../logic/messageHandler.js";

class Controller {
  constructor() { }

  verifyWebhook(req, res) { // GET
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    if (mode === 'subscribe' && token === config.WEBHOOK_VERIFY_TOKEN) {
      res.status(200).send(challenge);
      console.log('Webhook verified successfully!');
    } else {
      res.sendStatus(403);
    }
  }

  async handleIncoming(req, res) { // POST
    const message = req.body.entry?.[0]?.changes[0]?.value?.messages?.[0];
    if (message) {
      await messageHandler.handleIncomingMessage(message);
    }
    res.sendStatus(200);
  }


}

export default new Controller();