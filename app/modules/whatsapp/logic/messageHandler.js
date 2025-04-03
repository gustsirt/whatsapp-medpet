import service from "./service.js";

class MessageHandler {
  async handleIncomingMessage(message) {
    if (message?.type === 'text') {
      const response = `Echo: ${message.text.body}`;
      await service.sendMessage(message.from, response, message.id);
      await service.markAsRead(message.id);
    }
  }
}

export default new MessageHandler();