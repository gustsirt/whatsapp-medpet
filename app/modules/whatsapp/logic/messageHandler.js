import service from "./service.js";

class MessageHandler {

  // Recibe Mensaje
  async handleIncomingMessage(message, senderInfo) {
    if (message?.type === 'text') {

      const incomingMessage = message.text.body.toLowerCase().trim(); // limpia el mensaje

      if (this.isGreeting(incomingMessage)) { // es saludo de apertura ??
        await this.sendWelcomeMessage(message.from, message.id) // manda bienvenida
      } else {
        const response = `Echo: ${message.text.body}`;
        await service.sendMessage(message.from, response, message.id); // manda mensaje ECHO
      }

      await service.markAsRead(message.id); // marca como leido
    }
  }

  // Si es saludo de apertura
  isGreeting(message) {
    const greetings = ["hola", "holas", "buenas", "buenas tardes", "buenas días"];
    return greetings.includes(message);
  }

  // Mensaje de bienvenida
  async sendWelcomeMessage(to, messageId) {
    const welcomeMessage = "Hola, Bienvenido a nuestro servicio de Veterinaria online." +
      "¿En Qué puedo ayudarte Hoy?";
    await service.sendMessage(to, welcomeMessage, messageId);
  }
}

export default new MessageHandler();