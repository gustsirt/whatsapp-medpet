# API WHATSAPP - MEDPET

Basada en: [Platzi](https://platzi.com/cursos/whatsapp-api/)


En la configuración de la APP en Meta Developer:

* Identificador de acceso: se suele vencer
* PASO 1: ver que esta el celular sin el 0 ni el 15
* PASO 3 previo: --> Activar el PORT en Visual Studio Code y la visibilidad ponerla como Publica
* PASO 3:
  * tomar la URL del paso previo, y colocarlo ene l paso 3 de la forma URL/webhook
  * agregar: WEBHOOK_VERIFY_TOKEN
  * habilitar:
    * messages
    * message_template_status_update
    * message_template_quality_update