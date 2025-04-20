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

  // Doc Mensajes: https://developers.facebook.com/docs/whatsapp/cloud-api/reference/messages

  /** Manda mensaje como leido:
   *    messageId: indica que mensaje es
  */
  async markAsRead(messageId) {
    try {
      await axios({
        method: 'PUT',
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

  /** Manda un mensaje
   *   to: a quien
   *   body: mensaje
   *   messageId: indica que "responde" a este mensaje
  */
  async sendMessage(to, body, messageId = "") {
    try {
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
          // context: {
          //   message_id: messageId, // shows the message as a reply to the original user message
          // },
        },
      });
    } catch (error) {
      console.error('Error sending message:', error);
    }
  }

  /** Manda mensaje con botones apra seleccionar
   *   to: a quien
   *   menuTitle: titulo de menu
   *   buttons: botone
   *    ejemplo: [{ type: 'reply', reply: { id: 'option_1', title: 'Agendar' } },]
  */
  async sendIntereactiveButtonds(to, menuTitle, buttons) {
    try {
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
          type: "interactive",
          interactive: {
            type: "button",
            body: { text: menuTitle },
            action: {
              buttons: buttons
            }
          }
        },
      });
    } catch (error) {
      console.error('Error sending Buttons:', error);
    }
  }
}

export default new Service()