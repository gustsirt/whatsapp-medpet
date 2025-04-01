import dotenv from 'dotenv';

dotenv.config()

const configEnv = {
  port: process.env.PORT,

  // Whatsapp
  wpVersion: process.env.API_VERSION, // version de la api en Meta
  wpToken: process.env.API_TOKEN, // Identificador de acceso
  wpPhone: process.env.BUSINESS_PHONE, // Identificador del número de teléfono
  wpChatToken: process.env.WEBHOOK_VERIFY_TOKEN, // Contraseña ìnventada
}

export default configEnv