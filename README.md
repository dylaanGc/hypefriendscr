# Hypefriends

Tienda estática de HYPEFRIENDS, con carrito y checkout conectado a Supabase.

## Cómo funciona el checkout

GitHub Pages solo sirve los archivos estáticos; nunca aloja la clave privada de Supabase. El sitio llama a la función `create-web-order` desplegada en Supabase. Esa función verifica precios, tallas, existencias reservadas y dirección en el servidor, registra un pedido idempotente y, opcionalmente, guarda el comprobante en almacenamiento privado.

Los productos del sitio se inicializan en `web_store_catalog` con los precios y cantidades de este catálogo. Los pedidos web reservan esas cantidades sin duplicar las solicitudes repetidas; cancelar el pedido libera la reserva. El inventario del sitio y el inventario de la app financiera **aún no están vinculados**. Antes de aceptar pedidos en producción, sincroniza las existencias de `web_store_catalog.stock_snapshot` con la disponibilidad real del negocio. No registres además estas órdenes como ventas manuales ni descuentes su stock una segunda vez.

## Configuración y despliegue

1. En el proyecto financiero de Supabase, ejecuta primero `supabase.sql` y después `supabase-web-orders.sql`, que se encuentra en el repositorio financiero `HYPEFRIENDS-BUSINESS`. La segunda migración crea el catálogo inicial, el historial, las tablas de compras, los permisos RLS, las reservas por compra y el bucket privado de comprobantes.
2. Crea un sitio en Cloudflare Turnstile para `dylaangc.github.io`. Copia su clave pública en el `meta[name="turnstile-site-key"]` de `index.html`.
3. En Supabase Dashboard → **Project Settings → Edge Functions → Secrets**, configura:
   - `TURNSTILE_SECRET_KEY`: clave secreta del sitio Turnstile.
   - `WEB_ORDER_SHIPPING_GAM_CRC`: `2000` para entrega dentro del GAM.
   - `WEB_ORDER_SHIPPING_OUTSIDE_GAM_CRC`: `3500` para entrega fuera del GAM.
   - Las compras superiores a `₡50.000` reciben envío gratis; el umbral estricto se valida en la Edge Function.
   - `WEB_ORDER_BANK_DETAILS`: instrucciones de transferencia bancaria, si la habilitas.
   - `WEB_ORDER_SINPE_PHONE`: número SINPE Móvil del negocio, si lo habilitas.
   - `ALLOWED_ORIGINS`: opcional, lista separada por comas de orígenes de preview autorizados; `https://dylaangc.github.io` ya está permitido.

   Supabase proporciona `SUPABASE_URL` y `SUPABASE_SERVICE_ROLE_KEY` automáticamente al ejecutar Edge Functions. No copies la clave `service_role` a la tienda, al repositorio ni al frontend. Configura secretos solo desde el dashboard o un gestor de secretos, nunca como variables públicas `VITE_*`/`NEXT_PUBLIC_*`.
4. Instala Supabase CLI, enlaza el directorio `supabase/` con el proyecto financiero (`supabase link --project-ref ynowgseafcpcfgvsmkub`) y despliega las funciones desde este repositorio con `supabase functions deploy create-web-order` y `supabase functions deploy send-web-order-push`. El checkout público exige un origen permitido y una verificación Turnstile válida antes de crear pedidos. El emisor push desactiva la verificación JWT del gateway porque recibe webhooks de base de datos; en su lugar, exige el secreto `x-webhook-secret`.
5. Revisa el catálogo semilla, precios, tallas y cantidades frente al inventario real. La migración no reemplaza valores ya existentes al volver a ejecutarse. Corrige el catálogo de forma explícita en Supabase SQL Editor antes de publicar.
6. Para activar las notificaciones con la app cerrada, genera un par VAPID y configura en Edge Function Secrets `VAPID_PUBLIC_KEY`, `VAPID_PRIVATE_KEY` y `VAPID_SUBJECT` (por ejemplo, `mailto:soporte@tu-dominio`). Pega solo la clave VAPID pública en `meta[name="web-push-vapid-public-key"]` del `index.html` financiero. Genera un secreto aleatorio de al menos 32 caracteres y guárdalo como `WEB_ORDER_PUSH_WEBHOOK_SECRET`. En Supabase Dashboard → **Database → Webhooks**, crea un webhook para `public.web_orders`, evento **INSERT**, método POST y URL `https://ynowgseafcpcfgvsmkub.supabase.co/functions/v1/send-web-order-push`; agrega la cabecera `x-webhook-secret` con el mismo secreto. La migración crea un registro idempotente por pedido y dispositivo y el emisor elimina las suscripciones que el servicio push marque como caducadas.
7. En Supabase → **Edge Functions → Secrets**, configura `WEB_ORDER_BANK_DETAILS` con los datos BAC del negocio y `WEB_ORDER_SINPE_PHONE` con el número SINPE proporcionado al propietario. Mantén ambos valores solo como secretos de servidor; la función los muestra al comprador al elegir ese medio de pago.
8. Antes de publicar, valida el catálogo y stock, aplica la migración, despliega las funciones y prueba compra, comprobante, reintento, notificación y gestión desde la app con pedidos de prueba. Después publica el sitio en GitHub Pages. No publiques el frontend de checkout antes de desplegar y configurar el backend.

El checkout registra pagos mediante transferencia, SINPE Móvil o contra entrega; no procesa pagos con tarjeta ni confirma transferencias automáticamente. Un comprobante permanece pendiente de revisión en la app financiera.

## Publicarla en internet

También puedes subir estos archivos a un repositorio de GitHub y activar **Settings > Pages > Deploy from a branch** seleccionando la rama principal y la carpeta `/ (root)`.

## Importante

- La página funciona como sitio estático; el checkout seguro requiere la Supabase Edge Function descrita arriba.
- El carrito usa `localStorage`, por lo que cada dispositivo tendrá su propio carrito.
- La clave pública de Supabase, la clave pública de Turnstile y la clave VAPID pública pueden mostrarse en el navegador. La clave `service_role`, la clave Turnstile privada, la clave VAPID privada, el secreto del webhook y los datos de cuenta se guardan solo en secretos de Edge Functions.
