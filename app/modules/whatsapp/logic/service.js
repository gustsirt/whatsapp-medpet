import sendToWhatsApp from "../../../pkg/api/whatsappService.js";

class Service {
  constructor() { }

  /** Manda mensaje como leido:
   *    messageId: indica que mensaje es
  */
  async markAsRead(messageId) {
    const data = {
      messaging_product: 'whatsapp',
      status: 'read',
      message_id: messageId,
    };
    await sendToWhatsApp(data);
  }

  /** Manda un mensaje
   *   to: a quien
   *   body: mensaje
   *   messageId: indica que "responde" a este mensaje
  */
  async sendMessage(to, body, messageId) {
    const data = {
      messaging_product: "whatsapp",
      to,
      text: { body },
    }

    if (messageId) { data.context = { message_id: messageId } }

    await sendToWhatsApp(data)
  }

  /** Manda mensaje con botones apra seleccionar
   *   to: a quien
   *   menuTitle: titulo de menu
   *   buttons: botone
   *    ejemplo: [{ type: 'reply', reply: { id: 'option_1', title: 'Agendar' } },]
  */
  async sendIntereactiveButtonds(to, menuTitle, buttons) {
    const data = {
      messaging_product: "whatsapp",
      to,
      type: "interactive",
      interactive: {
        type: "button",
        body: { text: menuTitle },
        action: {
          buttons: buttons
        }
      }
    }

    await sendToWhatsApp(data)
  }

  /** Manda un mensaje multimedia
   *   to: a quien
   *   type: tipo de mutimedia
   *   mediaUrl: url del recuerso
   *   caption: nombre del recurso
  */
  async sendMediaMessage(to, type, mediaUrl, caption) {
    const mediaObject = {}
    switch (type) {

      case 'image':
        mediaObject.image = { link: mediaUrl, caption: caption }
        break;

      case 'audio':
        mediaObject.audio = { link: mediaUrl }
        break;

      case 'video':
        mediaObject.video = { link: mediaUrl, caption: caption }
        break;

      case 'document':
        mediaObject.document = { link: mediaUrl, caption: caption, filename: 'medpet.pdf' }
        break;

      default:
        throw new Error('Not Soported Media Type');
    }

    const data = {
      messaging_product: 'whatsapp',
      recipient_type: 'individual',
      to,
      type: type,
      ...mediaObject,
    }

    await sendToWhatsApp(data)
  }

  /** Manda un contacto
   *   to: a quien
   *   contact: contacto predefinido
   */
  async sendContactMessage(to, contact) {
    const data = {
      messaging_product: 'whatsapp',
      to,
      type: 'contacts',
      contacts: [contact],
    };

    await sendToWhatsApp(data);
  }


  /** Manda una ubicacion
   *   to: a quien
   *   location: ubicación predefinida
   */
  async sendLocationMessage(to, location) {
    const data = {
      messaging_product: 'whatsapp',
      to,
      type: 'location',
      location
    };

    await sendToWhatsApp(data);
  }
}

export default new Service()