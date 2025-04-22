import service from "./service.js";

class MessageHandler {
  constructor() {
    this.appointmentState = {};
  }

  // Recibe Mensaje
  async handleIncomingMessage(message, senderInfo) {

    if (message?.type === 'text') { // Si manda un texto

      const incomingMessage = message.text.body.toLowerCase().trim(); // limpia el mensaje
      const mediaFile = ['audio', 'video', 'image', 'document']

      if (this.isGreeting(incomingMessage)) { // es saludo de apertura ??
        await this.sendWelcomeMessage(message.from, message.id, senderInfo) // manda bienvenida
        await this.sendWelcomeMenu(message.from) // manda menu bienvenida

      } else if (mediaFile.includes(incomingMessage)) { // si una alabra pidiendo media
        await this.sendMedia(message.from, incomingMessage);

      } else if (this.appointmentState[message.from]) { // Captura FLujo agendar cita
        await this.handleAppointmentFlow(message.from, incomingMessage);

      } else {
        const response = `Echo: ${message.text.body}`;
        await service.sendMessage(message.from, response, message.id); // manda mensaje ECHO
      }

      await service.markAsRead(message.id); // marca como leido

    } else if (message?.type === 'interactive') { // Si elije una opcion interactiva
      // console.log(message);
      const optionTitle = message?.interactive?.button_reply?.title.toLowerCase().trim(); // en ves de "title" se puede eligir "id"
      await this.handleMenuOption(message.from, optionTitle) // maneja la opcion elegida
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

  // Manejar opcion Elegida (del menu)
  async handleMenuOption(to, optionTitle) {
    let response;
    switch (optionTitle) {
      case 'agendar': // respuesta a la eleccion del menu
        this.appointmentState[to] = { step: 'name' }
        response = "Por favor, ingresa tu nombre: "
        break;
      case 'consultar': // respuesta a la eleccion del menu
        response = "Realiza tu consulta"
        break;
      case 'ubicación': // respuesta a la eleccion del menu
        response = 'Esta es nuestra ubicación.';
        break;
      default:
        response = 'Lo siento, no entendí tu selección. Por favor, elige una de las opciones del menú.';
        break;
    }
    await service.sendMessage(to, response);
  }

  // Enviar mensaje multimedia
  async sendMedia(to, typeSelected) {
    let mediaUrl;
    let caption;
    let type;

    switch (typeSelected) {
      case 'audio':

        mediaUrl = 'https://s3.amazonaws.com/gndx.dev/medpet-audio.aac';
        caption = 'Bienvenida';
        type = 'audio';
        break;

      case 'image':
        mediaUrl = 'https://s3.amazonaws.com/gndx.dev/medpet-imagen.png';
        caption = '¡Esto es una Imagen!';
        type = 'image';
        break;

      case 'video':
        mediaUrl = 'https://s3.amazonaws.com/gndx.dev/medpet-video.mp4';
        caption = '¡Esto es una video!';
        type = 'video';
        break;

      case 'document':
        mediaUrl = 'https://s3.amazonaws.com/gndx.dev/medpet-file.pdf';
        caption = '¡Esto es un PDF!';
        type = 'document';
        break;
      default:
        break;
    }

    await service.sendMediaMessage(to, type, mediaUrl, caption)
  }

  // Opciones AGENDAR CITA
  async handleAppointmentFlow(to, message) {
    const state = this.appointmentState[to];
    let response;

    switch (state.step) {
      case 'name':
        state.name = message;
        state.step = 'petName';
        response = "Gracias, Ahora, ¿Cuál es el nombre de tu Mascota?";
        break;

      case 'petName':
        state.petName = message;
        state.step = 'petType';
        response = '¿Qué tipo de mascota es? (por ejemplo: perro, gato, huron, etc.)';
        break;

      case 'petType':
        state.petType = message;
        state.step = 'reason';
        response = '¿Cuál es el motivo de la Consulta?';
        break;

      case 'reason':
        state.reason = message;
        // state.step = 'end';
        response = 'Gracias por agendar tu cita.';
        break;

      default:
        break;
    }

    await service.sendMessage(to, response);
  }
}

export default new MessageHandler();