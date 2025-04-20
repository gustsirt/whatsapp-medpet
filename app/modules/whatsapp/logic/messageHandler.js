import service from "./service.js";

class MessageHandler {

  // Recibe Mensaje
  async handleIncomingMessage(message, senderInfo) {
    if (message?.type === 'text') {

      const incomingMessage = message.text.body.toLowerCase().trim(); // limpia el mensaje

      if (this.isGreeting(incomingMessage)) { // es saludo de apertura ??
        await this.sendWelcomeMessage(message.from, message.id, senderInfo) // manda bienvenida
        await this.sendWelcomeMenu(message.from) // manda menu bienvenida
      } else {
        const response = `Echo: ${message.text.body}`;
        await service.sendMessage(message.from, response, message.id); // manda mensaje ECHO
      }

      await service.markAsRead(message.id); // marca como leido
    }
  }

  // Obtiene nombre
  getSenderName(senderInfo) {
    // console.log("senderInfo: ", senderInfo); // { profile: { name: 'Gustavo Andrés' }, wa_id: '5493541xxxxxx' }

    const name = senderInfo.profile?.name ? senderInfo.profile?.name.split(" ")[0] : null;

    const sendName = name || senderInfo.wa_id || "";
    return sendName == "" ? "" : " " + sendName
  }

  // Si es saludo de apertura
  isGreeting(message) {
    const greetings = ["hola", "holas", "buenas", "buenas tardes", "buenas días"];
    return greetings.includes(message);
  }

  // Mensaje de bienvenida
  async sendWelcomeMessage(to, messageId, senderInfo) {
    const name = this.getSenderName(senderInfo);
    const welcomeMessage = `Hola${name}, Bienvenido a MEDPET, Tu tienda de mascotas en línea. ¿En qué puedo ayudarte hoy?`;
    await service.sendMessage(to, welcomeMessage, messageId);
  }

  // Menu Bienvenida
  async sendWelcomeMenu(to) {
    const menuTitle = "Elige una Opción"
    const buttons = [
      { type: 'reply', reply: { id: 'option_1', title: 'Agendar' } },
      { type: 'reply', reply: { id: 'option_2', title: 'Consultar' } },
      { type: 'reply', reply: { id: 'option_3', title: 'Ubicación' } },
    ]
    await service.sendIntereactiveButtonds(to, menuTitle, buttons)
  }
}

export default new MessageHandler();