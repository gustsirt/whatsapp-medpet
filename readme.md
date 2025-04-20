# API WHATSAPP - MEDPET

Basada en: [Platzi](https://platzi.com/cursos/whatsapp-api/) Whatsapp

En la configuración de la APP en Meta Developer:

* PASO 0: Identificador de acceso - se suele vencer cada 3hs mas o menos
* PASO 1: ver que esta el celular sin el 0 ni el 15
* PASO 2: Configurar Webhooks
  * en VSC: activar PORTS --> Mismo PORT ENV
  * Poner puerto como Publico
* PASO 3:
  * tomar la URL del paso previo, y colocarlo ene l paso 3 de la forma "https://...devyunnels.ms"+"/webhook"
  * agregar: WEBHOOK_VERIFY_TOKEN
  * habilitar:
    * messages
    * message_template_status_update
    * message_template_quality_update

Se implementa modelo vista controlador.

armar predeterminados

preparar como modelo

no olvidarse de pensarlo para soluciones externas
ver recolectar información y ponerlo en una tabla

pensar para reutilizar en negocios!

## Agregar colección de Whatsapp para postman

[Postman](https://elements.getpostman.com/view/fork?collection=13382743-84d01ff8-4253-4720-b454-af661f36acc2&referrer=https%3A%2F%2Fdevelopers.facebook.com%2Fapp%2Fdashboard#)

INICIO: Examples --> Send Sample Text Message
MENSAJES: AOI Reference --> Messages