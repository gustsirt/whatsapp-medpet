import dotenv from 'dotenv';

dotenv.config()

const configEnv = {
  port: process.env.PORT,

  // Whatsapp
  wpVersion: process.env.API_VERSION,
  wpPhone: process.env.BUSINESS_PHONE,
  wpToken: process.env.API_TOKEN,

  wpWebhookToken: process.env.WEBHOOK_VERIFY_TOKEN,
}

export default configEnv