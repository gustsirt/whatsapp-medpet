import { Router } from "express";
import configEnv from "../../services/env.js";
import axios from "axios";

const router = Router();

const {
  wpVersion, // API_VERSION
  wpPhone, // BUSINESS_PHONE
  wpChatToken, // WEBHOOK_VERIFY_TOKEN
  wpToken // API_TOKEN
} = configEnv;

// http://localhost:8080/webhook/
router
  .get("/", (req, res) => {
    const mode = req.query["hub.mode"];
    const token = req.query["hub.verify_token"];
    const challenge = req.query["hub.challenge"];

    // check the mode and token sent are correct
    if (mode === "subscribe" && token === wpChatToken) {
      // respond with 200 OK and challenge token from the request
      res.status(200).send(challenge);
      console.log("Webhook verified successfully!");
    } else {
      // respond with '403 Forbidden' if verify tokens do not match
      res.sendStatus(403);
    }
  })

  .post("/", async (req, res) => {
    // log incoming messages
    console.log("Incoming webhook message:", JSON.stringify(req.body, null, 2));

    // check if the webhook request contains a message
    // details on WhatsApp text message payload: https://developers.facebook.com/docs/whatsapp/cloud-api/webhooks/payload-examples#text-messages
    const message = req.body.entry?.[0]?.changes[0]?.value?.messages?.[0];

    // check if the incoming message contains text
    if (message?.type === "text") {
      // send a reply message as per the docs here https://developers.facebook.com/docs/whatsapp/cloud-api/reference/messages
      await axios({
        method: "POST",
        url: `https://graph.facebook.com/${wpVersion}/${wpPhone}/messages`,
        headers: {
          Authorization: `Bearer ${wpToken}`,
        },
        data: {
          messaging_product: "whatsapp",
          // to: message.from, // version original que daba error
          to: message.from.replace(/^549/, "54"), // Corrige el formato si es necesario
          text: { body: "Echo: " + message.text.body },
          context: {
            message_id: message.id, // shows the message as a reply to the original user message
          },
        },
      });

      console.log("celular: ", message.from);

      // mark incoming message as read
      await axios({
        method: "POST",
        url: `https://graph.facebook.com/${wpVersion}/${wpPhone}/messages`,
        headers: {
          Authorization: `Bearer ${wpToken}`,
        },
        data: {
          messaging_product: "whatsapp",
          status: "read",
          message_id: message.id,
        },
      });
    }

    res.sendStatus(200);
  })

// accepts GET requests at the /webhook endpoint. You need this URL to setup webhook initially.
// info on verification request payload: https://developers.facebook.com/docs/graph-api/webhooks/getting-started#verification-requests


export default router
