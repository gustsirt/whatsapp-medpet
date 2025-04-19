import service from "./service.js";

class MessageHandler {

  // Recibe Mensaje
  async handleIncomingMessage(message, senderInfo) {
    if (message?.type === 'text') {
      const response = `Echo: ${message.text.body}`;
      await service.sendMessage(message.from, response, message.id); // mandamensaje
      await service.markAsRead(message.id); // marca como leido
    }
  }

  // Si es saludo de apertura
  isGreeting(message) {
    const greetings = ["hola", "buenas", "buenas tardes", "buenas días"];
    const cleanMessage = message.toLowerCase().trim()
    return greetings.includes(cleanMessage);
  }


}

export default new MessageHandler();