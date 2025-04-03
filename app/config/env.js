import dotenv from 'dotenv';

dotenv.config()

const configEnv = {
  PORT: process.env.PORT,

  // Whatsapp
  API_VERSION: process.env.API_VERSION, // version de la api en Meta
  API_TOKEN: process.env.API_TOKEN, // Identificador de acceso
  BUSINESS_PHONE: process.env.BUSINESS_PHONE, // Identificador del número de teléfono
  WEBHOOK_VERIFY_TOKEN: process.env.WEBHOOK_VERIFY_TOKEN, // Contraseña ìnventada
}

export default configEnv