import axios from "axios";
import configEnv from "../../../config/env.js";

const {
  API_VERSION, // API_VERSION
  BUSINESS_PHONE, // BUSINESS_PHONE
  WEBHOOK_VERIFY_TOKEN, // WEBHOOK_VERIFY_TOKEN
  API_TOKEN // API_TOKEN
} = configEnv;

class Service {
  constructor() { }

  /* Manda un mensaje: ""
      to: a quien
      body: mensaje
      messageId: indica que "responde" a este mensaje
  */
  async sendMessage(to, body, messageId) {
    try {
      // send a reply message as per the docs here https://developers.facebook.com/docs/whatsapp/cloud-api/reference/messages
      await axios({
        method: "POST",
        url: `https://graph.facebook.com/${API_VERSION}/${BUSINESS_PHONE}/messages`,
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
        },
        data: {
          messaging_product: "whatsapp",
          // to: to, // version original que daba error
          to: to.replace(/^549/, "54"), // Corrige el formato si es necesario
          text: { body },
          context: {
            message_id: messageId, // shows the message as a reply to the original user message
          },
        },
      });
    } catch (error) {
      console.error('Error sending message:', error);
    }
  }

  async markAsRead(messageId) {
    try {
      await axios({
        method: 'POST',
        url: `https://graph.facebook.com/${API_VERSION}/${BUSINESS_PHONE}/messages`,
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
        },
        data: {
          messaging_product: 'whatsapp',
          status: 'read',
          message_id: messageId,
        },
      });
    } catch (error) {
      console.error('Error marking message as read:', error);
    }
  }
}

export default new Service()