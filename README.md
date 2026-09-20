# Hypefriends

Página web estática de Hypefriends.

## Publicarla en internet

La forma más rápida es usar Netlify Drop:

1. Abre [app.netlify.com/drop](https://app.netlify.com/drop).
2. Inicia sesión o crea una cuenta gratuita.
3. Arrastra esta carpeta completa (`hypefreinds`) al área de carga.
4. Netlify generará una URL pública `netlify.app` para abrirla desde cualquier dispositivo.

También puedes subir estos archivos a un repositorio de GitHub y activar **Settings > Pages > Deploy from a branch** seleccionando la rama principal y la carpeta `/ (root)`.

## Importante

- La página funciona como sitio estático y no necesita servidor propio.
- El carrito usa `localStorage`, por lo que cada dispositivo tendrá su propio carrito.
- El botón de pago y el formulario de suscripción son demostrativos; para recibir pedidos reales hace falta conectar un backend y una pasarela de pago.
