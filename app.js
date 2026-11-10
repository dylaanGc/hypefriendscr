/* ==================================================
   HYPEFRIENDS
   APP.JS
   CATÁLOGO COMPLETO + DROP 001
   ================================================== */

document.addEventListener("DOMContentLoaded", () => {


  /* ==================================================
     PRODUCTOS
     ================================================== */

  const products = [

    /* =========================
       CAMISETAS
       ========================= */

    {
      id: 1,
      name: "POLO RALPH LAUREN",
      price: 18000,
      stock: 12,
      category: "tee",
      class: "tee",
      image: "img/polo.rp.jpg",
      desc: "Polo de edición limitada.",
      drop: false
    },

    {
      id: 2,
      name: "CAMISETA CHROME HEARTS",
      price: 28000,
      stock: 20,
      category: "tee",
      class: "tee",
      image: "img/camisach-azul.jpg",
      desc: "Camiseta de béisbol Chrome Hearts CH en blanco y azul.",
      drop: false
    },

    {
      id: 5,
      name: "CAMISETA CHROME HEARTS",
      price: 25000,
      stock: 15,
      category: "tee",
      class: "tee",
      image: "img/camisach-negra.jpg",
      desc: "Chrome Hearts Multicolor Long-Sleeve Black.",
      drop: false
    },

    {
      id: 8,
      name: "CAMISA SUPREME DUCATI",
      price: 25000,
      stock: 18,
      category: "tee",
      class: "tee",
      image: "img/ducatixsupreme.jpg",
      desc: "Jersey de fútbol Supreme Ducati en negro.",
      drop: false
    },


    /* =========================
       HOODIES
       ========================= */

    {
      id: 4,
      name: "HOODIE SUPREME MAISON MARGIELA",
      price: 20000,
      stock: 6,
      category: "hoodie",
      class: "hoodie",
      image: "img/maison.jpg",
      desc: "Supreme Maison Margiela Hoodie.",

      /* =========================
         DROP 001
         ========================= */

      drop: true
    },

    {
      id: 7,
      name: "CORE HOODIE",
      price: 48000,
      stock: 5,
      category: "hoodie",
      class: "hoodie",
      image: "img/hoodie-core.jpg.jpeg",
      desc: "Hoodie premium de gramaje pesado.",

      /* =========================
         DROP 001
         ========================= */

      drop: true
    },


    /* =========================
       GORRAS
       ========================= */

    {
      id: 6,
      name: "CAP CHROME HEARTS",
      price: 15000,
      stock: 9,
      category: "cap",
      class: "cap",
      image: "img/cap-ch.jpg",
      desc: "Gorra estilo urbano Chrome Hearts.",
      drop: false
    },

    {
      id: 9,
      name: "HYPEFRIENDS CAP BLACK",
      price: 25000,
      stock: 10,
      category: "cap",
      class: "cap",
      image: "img/cap-black.jpeg",
      desc: "Gorra Hypefriends en color negro.",
      drop: false
    },


    /* =========================
       SHORTS
       ========================= */

    {
      id: 3,
      name: "SHORT CORTEIZ",
      price: 25000,
      stock: 8,
      category: "short",
      class: "short",
      image: "img/short-corteizz.jpg",
      desc: "Corteiz Baggy Denim Shorts Stonewash.",
      drop: false
    },

    {
      id: 10,
      name: "ESSENTIAL SHORT BLACK",
      price: 24000,
      stock: 10,
      category: "short",
      class: "short",
      image: "img/short-essential.jpeg",
      desc: "Short Essential de corte relajado en negro.",
      drop: false
    },

    {
      id: 11,
      name: "DENIM BAGGY SHORT",
      price: 26000,
      stock: 7,
      category: "short",
      class: "short",
      image: "img/short-denim.jpeg",
      desc: "Short denim baggy de estilo urbano.",
      drop: false
    },


    /* =========================
       ACCESORIOS
       ========================= */

    {
      id: 12,
      name: "SHOULDER BAG GOYAR",
      price: 35000,
      stock: 8,
      category: "accessory",
      class: "accessory",
      image: "img/bolso.goyar.jpeg",
      desc: "Shoulder bag Goyar color verde.",
      drop: false
    },

    {
      id: 13,
      name: "HYPEFRIENDS PENDANT",
      price: 30000,
      stock: 6,
      category: "accessory",
      class: "accessory",
      image: "img/collar-hypefriends.jpeg",
      desc: "Dije Hypefriends de tamaño compacto.",

      /* =========================
         DROP 001
         ========================= */

      drop: true
    },

    {
      id: 14,
      name: "HYPEFRIENDS CROSSBODY BAG",
      price: 32000,
      stock: 9,
      category: "accessory",
      class: "accessory",
      image: "img/bolso-hypefriends.jpeg",
      desc: "Bolso Crossbody Hypefriends para uso diario.",
      drop: false
    }

  ];


  /* ==================================================
     DROP 001
     ================================================== */

  /*
     FECHA DEL LANZAMIENTO

     29 DE NOVIEMBRE DE 2026
     6:00 PM
     HORA DE COSTA RICA (-06:00)
  */

  const DROP_DATE =
    new Date(
      "2026-11-29T18:00:00-06:00"
    ).getTime();


  /*
     CONTROL PARA SABER SI YA SE MOSTRÓ
     EL DROP
  */

  let dropReleased = false;


  /* ==================================================
     VARIABLES
     ================================================== */

  let currentFilter = "all";

  let selectedProduct = null;

  let selectedSize = "M";


  /* ==================================================
     SABER SI EL DROP YA ESTÁ DISPONIBLE
     ================================================== */

  function dropIsLive() {

    return Date.now() >= DROP_DATE;

  }

  function productReleaseTime(product) {
    if (product.dropAvailableAt) {
      const releaseTime = Date.parse(product.dropAvailableAt);
      return Number.isNaN(releaseTime) ? null : releaseTime;
    }
    return product.drop === true && !dropIsLive() ? DROP_DATE : null;
  }

  function formatReleaseDate(timestamp) {
    return new Intl.DateTimeFormat("es-CR", {
      day: "numeric",
      month: "short",
      year: "numeric",
      timeZone: "America/Costa_Rica",
    }).format(new Date(timestamp));
  }

  function normalizeStoreCategory(category) {
    const value = String(category || "").trim().toLowerCase()
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const aliases = {
      camiseta: "tee",
      camisetas: "tee",
      tees: "tee",
      hoodies: "hoodie",
      sudaderas: "hoodie",
      shorts: "short",
      gorras: "cap",
      caps: "cap",
      accesorios: "accessory",
      accessories: "accessory",
      general: "accessory",
    };
    return aliases[value] || value || "accessory";
  }


  /* ==================================================
     CARRITO
     ================================================== */

  let cart = JSON.parse(
    localStorage.getItem("hypefriends-cart") || "[]"
  );


  /* ==================================================
     DINERO
     ================================================== */

  const money = number => {

    return "₡" +
      new Intl.NumberFormat("es-CR").format(number);

  };


  /* ==================================================
     ELEMENTOS
     ================================================== */

  const productGrid =
    document.getElementById("productGrid");

  const productModal =
    document.getElementById("productModal");

  const modalName =
    document.getElementById("modalName");

  const modalDescription =
    document.getElementById("modalDescription");

  const modalAvailability =
    document.getElementById("modalAvailability");

  const modalAddBtn =
    document.getElementById("modalAddBtn");

  const modalPrice =
    document.getElementById("modalPrice");

  const modalImage =
    document.getElementById("modalImage");

  const sizes =
    document.getElementById("sizes");

  const cartCount =
    document.getElementById("cartCount");

  const cartItems =
    document.getElementById("cartItems");

  const cartTotal =
    document.getElementById("cartTotal");

  const toastElement =
    document.getElementById("toast");

  const drawer =
    document.getElementById("drawer");

  const overlay =
    document.getElementById("overlay");

  const cartElement =
    document.getElementById("cart");

  const searchPanel =
    document.getElementById("searchPanel");

  const searchInput =
    document.getElementById("searchInput");

  const checkoutModal = document.getElementById("checkoutModal");
  const checkoutForm = document.getElementById("checkoutForm");
  const checkoutError = document.getElementById("checkoutError");
  const checkoutSubmit = document.getElementById("checkoutSubmit");
  const checkoutQuote = document.getElementById("checkoutQuote");
  const catalogSyncStatus = document.getElementById("catalogSyncStatus");
  const checkoutEndpoint = `${document.querySelector('meta[name="supabase-url"]')?.content.replace(/\/+$/, "")}/functions/v1/create-web-order`;
  const supabasePublishableKey = document.querySelector('meta[name="supabase-publishable-key"]')?.content.trim() || "";
  const turnstileSiteKey = document.querySelector('meta[name="turnstile-site-key"]')?.content.trim() || "";
  let checkoutQuoteData = null;
  let checkoutQuoteRequestId = 0;
  let checkoutTurnstileId = null;
  let checkoutTurnstileToken = "";
  let checkoutBusy = false;
  let catalogRefreshInFlight = false;


  /* ==================================================
     MOSTRAR PRODUCTOS
     ================================================== */

  function renderProducts(list = products) {

    const availableProducts =
      list.filter(product => {
        if (product.storeActive === false) return false;
        return true;

      });


    /* ==================================================
       APLICAR FILTRO
       ================================================== */

    const filteredProducts =
      availableProducts.filter(product => {

        return currentFilter === "all" ||
          normalizeStoreCategory(product.category) === currentFilter;

      });


    /* ==================================================
       SI NO HAY PRODUCTOS
       ================================================== */

    if (!filteredProducts.length) {

      productGrid.innerHTML = `

        <div class="no-products">

          <p>No hay productos publicados en esta categoría.</p>

        </div>

      `;

      return;

    }


    /* ==================================================
       CREAR PRODUCTOS
       ================================================== */

    productGrid.innerHTML =
      filteredProducts
        .map(product => {

          return `

            <article
              class="product"
              data-id="${product.id}"
            >

              <div
                class="product-img ${product.class}"
              >

                <img
                  src="${product.image}"
                  alt="${product.name}"
                  loading="lazy"
                  onerror="
                    this.style.display='none';
                  "
                >

              </div>


              <div class="product-info">

                <p class="product-name">
                  ${product.name}
                </p>

                <p class="product-price">
                  ${money(product.price)}
                </p>

                <p class="product-stock">
                  ${Number(product.stock) <= 0
                    ? "AGOTADO"
                    : productReleaseTime(product) > Date.now()
                      ? `PRÓXIMAMENTE · ${formatReleaseDate(productReleaseTime(product))} · ${product.stock} disponibles`
                      : `${product.stock} unidades disponibles`}
                </p>

              </div>

            </article>

          `;

        })
        .join("");


    /* ==================================================
       CLICK PRODUCTO
       ================================================== */

    productGrid
      .querySelectorAll(".product")
      .forEach(productCard => {

        productCard.addEventListener(
          "click",
          () => {

            const id =
              Number(
                productCard.dataset.id
              );

            openProduct(id);

          }
        );

      });

  }


  /* ==================================================
     ABRIR PRODUCTO
     ================================================== */

  function openProduct(id) {

    selectedProduct =
      products.find(
        product =>
          product.id === id
      );


    if (!selectedProduct) {
      return;
    }


    selectedSize = "M";
    const releaseTime = productReleaseTime(selectedProduct);
    if (modalAvailability) {
      modalAvailability.textContent = Number(selectedProduct.stock) <= 0
        ? "Actualmente agotado."
        : releaseTime && releaseTime > Date.now()
          ? `Disponible desde el ${formatReleaseDate(releaseTime)}.`
          : `${selectedProduct.stock} unidades disponibles.`;
    }


    /* ==================================================
       NOMBRE
       ================================================== */

    if (modalName) {

      modalName.textContent =
        selectedProduct.name;

    }


    /* ==================================================
       DESCRIPCIÓN
       ================================================== */

    if (modalDescription) {

      modalDescription.textContent =
        selectedProduct.desc;

    }


    /* ==================================================
       PRECIO
       ================================================== */

    if (modalPrice) {

      modalPrice.textContent =
        money(
          selectedProduct.price
        );

    }


    /* ==================================================
       IMAGEN
       ================================================== */

    if (modalImage) {

      modalImage.className =
        "modal-image";


      modalImage.innerHTML = `

        <img
          src="${selectedProduct.image}"
          alt="${selectedProduct.name}"
          class="modal-product-img"
        >

      `;

    }


    /* ==================================================
       TALLAS
       ================================================== */

    if (sizes) {

      /*
       * Para accesorios y gorras
       * no necesitamos seleccionar talla.
       */

      const sizeStock = selectedProduct.sizeStock || {};
      const hasSizeStock = Object.keys(sizeStock).length > 0;
      const stockSizes = (selectedProduct.availableSizes || [])
        .filter(size => !hasSizeStock || Number(sizeStock[size] || 0) > 0);

      if (
        selectedProduct.category === "accessory" ||
        selectedProduct.category === "cap"
      ) {
        selectedSize = stockSizes[0] || (hasSizeStock ? "" : "ÚNICA");
        sizes.innerHTML = `<p class="no-size">${selectedSize || "Agotado"}${selectedSize && !["ÚNICA","UNSIZE"].includes(selectedSize.toUpperCase()) ? ` · ${selectedSize}` : ""}</p>`;

      } else {

        const availableSizes = stockSizes.length
          ? stockSizes
          : hasSizeStock
            ? []
            : selectedProduct.availableSizes?.length
              ? selectedProduct.availableSizes
              : ["S", "M", "L", "XL"];
        selectedSize =
          availableSizes.includes("M")
            ? "M"
            : availableSizes[0] || "";

        sizes.innerHTML = availableSizes.length
          ? availableSizes
            .map(size => {

              return `

                <button
                  type="button"
                  class="size ${
                    size === selectedSize
                      ? "selected"
                      : ""
                  }"
                  data-size="${size}"
                >

                  ${size}

                </button>

              `;

            })
            .join("")
          : `<p class="no-size">Agotado</p>`;


        sizes
          .querySelectorAll(".size")
          .forEach(button => {

            button.addEventListener(
              "click",
              () => {

                selectedSize =
                  button.dataset.size;


                sizes
                  .querySelectorAll(".size")
                  .forEach(
                    sizeButton => {

                      sizeButton
                        .classList
                        .remove(
                          "selected"
                        );

                    }
                  );


                button.classList.add(
                  "selected"
                );
                updateProductAvailability(selectedProduct, selectedSize);

              }
            );

          });

      }

    }
    updateProductAvailability(selectedProduct, selectedSize);


    /* ==================================================
       ABRIR MODAL
       ================================================== */

    if (productModal) {

      productModal.classList.add(
        "open"
      );


      productModal.setAttribute(
        "aria-hidden",
        "false"
      );


      document.body.classList.add(
        "modal-open"
      );

    }

  }

  function updateProductAvailability(product, size) {
    if (!modalAddBtn) return;
    const releaseTime = productReleaseTime(product);
    const sizeStock = product.sizeStock || {};
    const availableForSize = Object.keys(sizeStock).length
      ? Number(sizeStock[size] || 0)
      : Number(product.stock);
    const soldOut = !size || availableForSize <= 0;
    const upcoming = releaseTime && releaseTime > Date.now();
    modalAddBtn.disabled = Boolean(soldOut || upcoming);
    modalAddBtn.textContent = soldOut
      ? "AGOTADO"
      : upcoming
        ? "DISPONIBLE PRÓXIMAMENTE"
        : "AGREGAR A LA BOLSA";
    if (modalAvailability) {
      modalAvailability.textContent = soldOut
        ? "Actualmente agotado."
        : upcoming
          ? `Disponible desde el ${formatReleaseDate(releaseTime)}.`
          : `${availableForSize} unidades disponibles en esta talla.`;
    }
  }


  /* ==================================================
     CERRAR MODAL
     ================================================== */

  function closeProductModal() {

    if (!productModal) {
      return;
    }


    productModal.classList.remove(
      "open"
    );


    productModal.setAttribute(
      "aria-hidden",
      "true"
    );


    document.body.classList.remove(
      "modal-open"
    );

  }


  /* ==================================================
     ESC PARA CERRAR
     ================================================== */

  document.addEventListener(
    "keydown",
    event => {

      if (
        event.key === "Escape"
      ) {

        closeProductModal();

      }

    }
  );


  /* ==================================================
     CLICK AFUERA DEL MODAL
     ================================================== */

  if (productModal) {

    productModal.addEventListener(
      "click",
      event => {

        if (
          event.target ===
          productModal
        ) {

          closeProductModal();

        }

      }
    );

  }


  /* ==================================================
     GUARDAR CARRITO
     ================================================== */

  function saveCart() {

    localStorage.setItem(
      "hypefriends-cart",
      JSON.stringify(cart)
    );

  }


  /* ==================================================
     MOSTRAR CARRITO
     ================================================== */

  function renderCart() {

    /* ==================================================
       CONTADOR
       ================================================== */

    if (cartCount) {

      cartCount.textContent =
        cart.reduce(
          (total, item) =>
            total + item.qty,
          0
        );

    }


    /* ==================================================
       PRODUCTOS
       ================================================== */

    if (cartItems) {

      if (!cart.length) {

        cartItems.innerHTML = `

          <p
            style="
              color:#777;
              margin-top:25px;
            "
          >

            Tu bolsa está vacía.

          </p>

        `;

      } else {

        cartItems.innerHTML =
          cart
            .map(
              (item, index) => `

                <div
                  class="cart-item"
                >

                  <h4>
                    ${item.name}
                  </h4>

                  <small>
                    Talla:
                    ${item.size}
                    · Cantidad:
                    ${item.qty}
                  </small>

                  <p>
                    ${money(
                      item.price *
                      item.qty
                    )}
                  </p>

                  <button
                    type="button"
                    onclick="
                      removeItem(${index})
                    "
                  >

                    ELIMINAR

                  </button>

                </div>

              `
            )
            .join("");

      }

    }


    /* ==================================================
       TOTAL
       ================================================== */

    if (cartTotal) {

      cartTotal.textContent =
        money(
          cart.reduce(
            (total, item) =>
              total +
              item.price *
              item.qty,
            0
          )
        );

    }

  }

  async function callCheckoutApi(payload, proof = null) {
    if (!supabasePublishableKey || !checkoutEndpoint.startsWith("https://")) {
      throw new Error("El sitio todavía no tiene configurado el endpoint de pedidos.");
    }
    const headers = {
      apikey: supabasePublishableKey,
      Authorization: 'Bearer ' + supabasePublishableKey,
    };
    let body = JSON.stringify(payload);
    if (proof) {
      const form = new FormData();
      form.append("order", JSON.stringify(payload));
      form.append("proof", proof);
      body = form;
    }
    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), payload.action === "quote" ? 15000 : 30000);
    let response;
    try {
      response = await fetch(checkoutEndpoint, {
        method: "POST",
        headers,
        body,
        cache: "no-store",
        signal: controller.signal,
      });
    } catch (error) {
      if (error.name === "AbortError") {
        throw new Error("La conexión tardó demasiado. Revisa tu Internet y vuelve a intentarlo.");
      }
      throw new Error("No se pudo conectar con el servidor de pedidos. Revisa tu Internet.");
    } finally {
      window.clearTimeout(timeoutId);
    }
    let result;
    try {
      result = await response.json();
    } catch {
      throw new Error("El checkout no respondió correctamente. Vuelve a intentarlo.");
    }
    if (!response.ok) {
      throw new Error(result.error || "No se pudo procesar el pedido.");
    }
    return result;
  }

  function cartLines() {
    return cart.map(item => ({
      id: Number(item.id),
      size: String(item.size || ""),
      qty: Number(item.qty),
    }));
  }

  function escapeHtml(value) {
    return String(value ?? "").replace(/[&<>'"]/g, character => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "'": "&#39;",
      "\"": "&quot;",
    })[character]);
  }

  function renderCheckoutQuote(quote) {
    const rows = (quote.items || []).map(item =>
      `<div class="checkout-quote-row"><span>${item.qty} × ${escapeHtml(item.productName)} · ${escapeHtml(item.size)}</span><b>${money(item.unitPrice * item.qty)}</b></div>`
    ).join("");
    checkoutQuote.innerHTML = `${rows}<div class="checkout-quote-row"><span>Envío</span><b>${money(quote.shippingAmount)}</b></div><div class="checkout-quote-row checkout-quote-total"><span>Total</span><b>${money(quote.total)}</b></div>`;
  }

  function updateCheckoutPaymentHint() {
    const method = document.getElementById("checkoutPaymentMethod")?.value;
    const proofLabel = document.getElementById("checkoutProofLabel");
    const hint = document.getElementById("checkoutPaymentHint");
    if (proofLabel) proofLabel.hidden = method === "cash_on_delivery";
    if (hint) {
      hint.textContent = method === "cash_on_delivery"
        ? "El pago quedará pendiente hasta confirmar la entrega y el cobro."
        : "El pago quedará pendiente hasta verificar la transferencia o el SINPE. Puedes adjuntar un comprobante; enviarlo no confirma el pago.";
    }
  }

  async function refreshCheckoutQuote() {
    const requestId = ++checkoutQuoteRequestId;
    checkoutQuoteData = null;
    updateCheckoutSubmit();
    checkoutQuote.textContent = "Calculando disponibilidad y envío…";
    checkoutError.textContent = "";
    for (let attempt = 1; attempt <= 3; attempt += 1) {
      if (requestId !== checkoutQuoteRequestId) return;
      try {
        if (attempt > 1) checkoutQuote.textContent = `Reintentando cotización (${attempt}/3)…`;
        const quote = await callCheckoutApi({
          action: "quote",
          deliveryZone: document.getElementById("checkoutDeliveryZone").value,
          items: cartLines(),
        });
        if (requestId !== checkoutQuoteRequestId) return;
        checkoutQuoteData = quote;
        renderCheckoutQuote(quote);
        updateCheckoutSubmit();
        return;
      } catch (error) {
        if (requestId !== checkoutQuoteRequestId) return;
        if (attempt < 3) {
          await new Promise(resolve => window.setTimeout(resolve, attempt * 700));
          continue;
        }
        checkoutQuote.textContent = "";
        checkoutError.textContent = `${error.message} Puedes cambiar la zona o cerrar y volver a abrir el checkout.`;
        updateCheckoutSubmit();
      }
    }
  }

  function updateCheckoutSubmit() {
    checkoutSubmit.disabled = checkoutBusy || !checkoutQuoteData || !checkoutTurnstileToken;
    if (checkoutBusy) {
      checkoutSubmit.textContent = "PROCESANDO PEDIDO…";
    } else if (!checkoutQuoteData) {
      checkoutSubmit.textContent = "ACTUALIZANDO COTIZACIÓN…";
    } else if (!checkoutTurnstileToken) {
      checkoutSubmit.textContent = "COMPLETA LA VERIFICACIÓN";
    } else {
      checkoutSubmit.textContent = "CONFIRMAR PEDIDO";
    }
  }

  function prepareCheckoutTurnstile() {
    const widget = document.getElementById("turnstileWidget");
    if (!turnstileSiteKey) {
      checkoutError.textContent = "Falta configurar la clave pública de Cloudflare Turnstile para aceptar pedidos.";
      return;
    }
    const renderWidget = () => {
      if (!window.turnstile) return false;
      if (checkoutTurnstileId !== null) {
        window.turnstile.reset(checkoutTurnstileId);
        checkoutTurnstileToken = "";
        updateCheckoutSubmit();
        return true;
      }
      checkoutTurnstileId = window.turnstile.render(widget, {
        sitekey: turnstileSiteKey,
        action: "checkout",
        callback(token) {
          checkoutTurnstileToken = token;
          checkoutError.textContent = "";
          updateCheckoutSubmit();
        },
        "expired-callback"() {
          checkoutTurnstileToken = "";
          updateCheckoutSubmit();
        },
        "error-callback"() {
          checkoutTurnstileToken = "";
          checkoutError.textContent = "No se pudo cargar la verificación anti-robots.";
          updateCheckoutSubmit();
        },
      });
      return true;
    };
    if (renderWidget()) return;
    let attempts = 0;
    const timer = window.setInterval(() => {
      attempts += 1;
      if (renderWidget() || attempts >= 40) {
        window.clearInterval(timer);
        if (attempts >= 40 && !window.turnstile) {
          checkoutError.textContent = "No se pudo cargar Cloudflare Turnstile. Recarga la página.";
        }
      }
    }, 250);
  }

  async function openCheckout() {
    if (!cart.length) {
      toast("TU BOLSA ESTÁ VACÍA");
      return;
    }
    closePanels();
    checkoutModal.classList.add("open");
    checkoutModal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    document.getElementById("checkoutFormView").hidden = false;
    document.getElementById("checkoutSuccessView").hidden = true;
    checkoutError.textContent = "";
    checkoutTurnstileToken = "";
    checkoutSubmit.disabled = true;
    updateCheckoutPaymentHint();
    prepareCheckoutTurnstile();
    await refreshCheckoutQuote();
  }

  function closeCheckout() {
    if (checkoutBusy) return;
    checkoutModal.classList.remove("open");
    checkoutModal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
  }

  function checkoutIdentity() {
    const storageKey = "hypefriends-checkout-attempt";
    try {
      const saved = JSON.parse(localStorage.getItem(storageKey) || "null");
      if (validUuid(saved?.orderId) && validUuid(saved?.checkoutReference)) return saved;
      const identity = {
        orderId: crypto.randomUUID(),
        checkoutReference: crypto.randomUUID(),
      };
      localStorage.setItem(storageKey, JSON.stringify(identity));
      return identity;
    } catch {
      throw new Error("Activa el almacenamiento del navegador para proteger el pedido contra duplicados.");
    }
  }

  function validUuid(value) {
    return typeof value === "string" &&
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
  }

  async function submitCheckout(event) {
    event.preventDefault();
    if (checkoutBusy || !checkoutQuoteData) return;
    if (!checkoutTurnstileToken) {
      checkoutError.textContent = "Completa la verificación anti-robots.";
      return;
    }
    const form = event.currentTarget;
    const formData = new FormData(form);
    const proof = document.getElementById("checkoutProof").files?.[0] || null;
    const allowedProofTypes = ["image/jpeg", "image/png", "image/webp", "application/pdf"];
    if (proof && (!allowedProofTypes.includes(proof.type) || proof.size > 10 * 1024 * 1024)) {
      checkoutError.textContent = "El comprobante debe ser JPG, PNG, WebP o PDF de hasta 10 MB.";
      return;
    }
    const paymentMethod = String(formData.get("paymentMethod"));
    if (paymentMethod === "cash_on_delivery" && proof) {
      checkoutError.textContent = "No adjuntes un comprobante para el pago contra entrega.";
      return;
    }
    checkoutBusy = true;
    checkoutError.textContent = "";
    updateCheckoutSubmit();
    try {
      const identity = checkoutIdentity();
      const response = await callCheckoutApi({
        action: "create",
        ...identity,
        items: cartLines(),
        deliveryZone: String(formData.get("deliveryZone")),
        customerName: String(formData.get("name") || "").trim(),
        customerPhone: String(formData.get("phone") || "").trim(),
        customerEmail: String(formData.get("email") || "").trim(),
        shippingAddress: String(formData.get("address") || "").trim(),
        customerNotes: String(formData.get("notes") || "").trim(),
        paymentMethod,
        turnstileToken: checkoutTurnstileToken,
      }, proof);
      localStorage.removeItem("hypefriends-checkout-attempt");
      cart = [];
      saveCart();
      renderCart();
      document.getElementById("checkoutFormView").hidden = true;
      document.getElementById("checkoutSuccessView").hidden = false;
      document.getElementById("checkoutSuccessNumber").textContent = `Número de pedido: ${response.orderNumber}`;
      document.getElementById("checkoutSuccessInstructions").textContent = response.paymentInstructions ||
        "HYPEFRIENDS se pondrá en contacto para coordinar la entrega y el pago.";
      document.getElementById("checkoutSuccessTitle").textContent = response.alreadyCreated
        ? "TU PEDIDO YA ESTABA REGISTRADO"
        : "GRACIAS POR TU COMPRA";
    } catch (error) {
      checkoutError.textContent = error.message;
      checkoutTurnstileToken = "";
      if (checkoutTurnstileId !== null && window.turnstile) {
        window.turnstile.reset(checkoutTurnstileId);
      }
    } finally {
      checkoutBusy = false;
      updateCheckoutSubmit();
    }
  }

  async function refreshStoreCatalog() {
    if (catalogRefreshInFlight) return;
    catalogRefreshInFlight = true;
    if (catalogSyncStatus) catalogSyncStatus.textContent = "Sincronizando inventario…";
    try {
      const response = await callCheckoutApi({ action: "catalog" });
      const syncedProducts = [];
      for (const remoteProduct of response.products || []) {
        const productId = Number(remoteProduct.store_product_id);
        const existing = products.find(row => String(row.id) === remoteProduct.store_product_id);
        const sameProduct = existing?.name === remoteProduct.product_name;
        const product = existing
          ? { ...existing }
          : {
              id: productId,
              category: remoteProduct.category || "accessory",
              class: remoteProduct.category || "accessory",
              image: "img/icon.svg",
              desc: "",
              drop: false
            };
        product.id = productId;
        product.name = remoteProduct.product_name;
        product.price = Number(remoteProduct.unit_price);
        product.stock = Number(remoteProduct.available_stock);
        product.availableSizes = remoteProduct.available_sizes || [];
        product.sizeStock = remoteProduct.size_stock || {};
        product.inStock = Boolean(remoteProduct.in_stock);
        product.storeActive = Boolean(remoteProduct.active);
        product.dropAvailableAt = remoteProduct.drop_available_at;
        product.category = normalizeStoreCategory(remoteProduct.category || product.category);
        product.class = product.category;
        product.image = remoteProduct.image_url || (sameProduct ? product.image : "img/icon.svg");
        product.desc = remoteProduct.description || (sameProduct ? product.desc : "");
        syncedProducts.push(product);
      }
      products.splice(0, products.length, ...syncedProducts);
      renderProducts();
      renderCart();
      if (catalogSyncStatus) {
        const publishedCount = syncedProducts.filter(product => product.storeActive).length;
        const soldOutCount = syncedProducts.filter(product => product.storeActive && Number(product.stock) <= 0).length;
        catalogSyncStatus.textContent = `Catálogo sincronizado · ${publishedCount} productos · ${soldOutCount} agotados`;
      }
    } catch (error) {
      console.error("Store catalog refresh:", error);
      if (catalogSyncStatus) catalogSyncStatus.textContent = "No se pudo actualizar el inventario. Revisa tu conexión e inténtalo de nuevo.";
    } finally {
      catalogRefreshInFlight = false;
    }
  }


  /* ==================================================
     ELIMINAR
     ================================================== */

  window.removeItem = index => {

    cart.splice(
      index,
      1
    );


    saveCart();

    renderCart();

  };


  /* ==================================================
     AGREGAR AL CARRITO
     ================================================== */

  function addSelected() {

    if (!selectedProduct) {
      return;
    }


    /* ==================================================
       SEGURIDAD DROP
       ================================================== */

    if (
      selectedProduct.drop === true &&
      !dropIsLive()
    ) {

      toast(
        "ESTE DROP TODAVÍA NO ESTÁ DISPONIBLE"
      );

      return;

    }

    if (!selectedSize) {
      toast("ESTE PRODUCTO NO TIENE TALLAS DISPONIBLES");
      return;
    }

    const sizeStock = selectedProduct.sizeStock || {};
    const hasSizeStock = Object.keys(sizeStock).length > 0;
    const availableForSize = hasSizeStock
      ? Number(sizeStock[selectedSize] || 0)
      : Number(selectedProduct.stock);
    if (availableForSize <= 0) {
      toast("ESTE PRODUCTO ESTÁ AGOTADO");
      return;
    }

    const found =
      cart.find(
        item =>
          item.id ===
            selectedProduct.id &&
          item.size ===
            selectedSize
      );


    if (found) {

      if (found.qty >= availableForSize) {
        toast("NO HAY SUFICIENTES UNIDADES DISPONIBLES");
        return;
      }

      found.qty++;

    } else {

      cart.push({

        ...selectedProduct,

        size: selectedSize,

        qty: 1

      });

    }


    saveCart();

    renderCart();

    closeProductModal();

    toast(
      "AGREGADO A TU BOLSA"
    );

  }


  /* ==================================================
     TOAST
     ================================================== */

  function toast(message) {

    if (!toastElement) {
      return;
    }


    toastElement.textContent =
      message;


    toastElement.classList.add(
      "show"
    );


    setTimeout(
      () => {

        toastElement.classList.remove(
          "show"
        );

      },
      2400
    );

  }


  /* ==================================================
     CERRAR PANELES
     ================================================== */

  function closePanels() {

    if (drawer) {

      drawer.classList.remove(
        "open"
      );

    }


    if (cartElement) {

      cartElement.classList.remove(
        "open"
      );

    }


    if (overlay) {

      overlay.classList.remove(
        "show"
      );

    }

  }


  /* ==================================================
     MENÚ
     ================================================== */

  const menuBtn =
    document.getElementById(
      "menuBtn"
    );

  const closeMenu =
    document.getElementById(
      "closeMenu"
    );


  if (menuBtn) {

    menuBtn.addEventListener(
      "click",
      () => {

        if (drawer) {

          drawer.classList.add(
            "open"
          );

        }


        if (overlay) {

          overlay.classList.add(
            "show"
          );

        }

      }
    );

  }


  if (closeMenu) {

    closeMenu.addEventListener(
      "click",
      closePanels
    );

  }


  if (overlay) {

    overlay.addEventListener(
      "click",
      closePanels
    );

  }


  /* ==================================================
     LINKS DEL MENÚ
     ================================================== */

  document
    .querySelectorAll(".nav-link")
    .forEach(link => {

      link.addEventListener(
        "click",
        closePanels
      );

    });


  /* ==================================================
     BÚSQUEDA
     ================================================== */

  const searchBtn =
    document.getElementById(
      "searchBtn"
    );

  const closeSearch =
    document.getElementById(
      "closeSearch"
    );


  if (searchBtn) {

    searchBtn.addEventListener(
      "click",
      () => {

        if (searchPanel) {

          searchPanel.classList.add(
            "open"
          );

        }


        if (searchInput) {

          searchInput.focus();

        }

      }
    );

  }


  if (closeSearch) {

    closeSearch.addEventListener(
      "click",
      () => {

        if (searchPanel) {

          searchPanel.classList.remove(
            "open"
          );

        }

      }
    );

  }


  /* ==================================================
     BÚSQUEDA DE PRODUCTOS
     ================================================== */

  if (searchInput) {

    searchInput.addEventListener(
      "input",
      event => {

        const query =
          event.target.value
            .toLowerCase()
            .trim();


        const results =
          products.filter(
            product => {

              if (product.storeActive === false) return false;


              return (

                product.name
                  .toLowerCase()
                  .includes(query)

                ||

                product.category
                  .toLowerCase()
                  .includes(query)

                ||

                product.desc
                  .toLowerCase()
                  .includes(query)

              );

            }
          );


        renderProducts(
          results
        );

      }
    );

  }


  /* ==================================================
     FILTROS DEL CATÁLOGO
     ================================================== */

  document
    .querySelectorAll(".filter")
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          let filter =
            button.dataset.filter;


          /* ==================================================
             EQUIVALENCIAS
             ================================================== */

          const aliases = {

            "todo": "all",
            "todos": "all",

            "hoodies": "hoodie",

            "camisetas": "tee",
            "tees": "tee",

            "gorras": "cap",
            "caps": "cap",

            "shorts": "short",

            "accesorios": "accessory",
            "accessories": "accessory"

          };


          if (
            aliases[filter]
          ) {

            filter =
              aliases[filter];

          }


          currentFilter =
            filter;


          /* ==================================================
             BOTÓN ACTIVO
             ================================================== */

          document
            .querySelectorAll(".filter")
            .forEach(
              element => {

                element.classList.remove(
                  "active"
                );

              }
            );


          button.classList.add(
            "active"
          );


          /* ==================================================
             MOSTRAR PRODUCTOS
             ================================================== */

          renderProducts();

        }
      );

    });


  /* ==================================================
     CARRITO
     ================================================== */

  const cartBtn =
    document.getElementById(
      "cartBtn"
    );

  const closeCart =
    document.getElementById(
      "closeCart"
    );


  if (cartBtn) {

    cartBtn.addEventListener(
      "click",
      () => {

        if (cartElement) {

          cartElement.classList.add(
            "open"
          );

        }


        if (overlay) {

          overlay.classList.add(
            "show"
          );

        }

      }
    );

  }


  if (closeCart) {

    closeCart.addEventListener(
      "click",
      closePanels
    );

  }


  /* ==================================================
     MODAL
     ================================================== */

  const modalClose =
    document.getElementById(
      "modalClose"
    );





  if (modalClose) {

    modalClose.addEventListener(
      "click",
      closeProductModal
    );

  }


  if (modalAddBtn) {

    modalAddBtn.addEventListener(
      "click",
      addSelected
    );

  }


  /* ==================================================
     VER COLECCIÓN
     ================================================== */

  const collectionBtn =
    document.getElementById(
      "collectionBtn"
    );


  if (collectionBtn) {

    collectionBtn.addEventListener(
      "click",
      () => {

        const catalog =
          document.getElementById(
            "catalogo"
          );


        if (catalog) {

          catalog.scrollIntoView({
            behavior: "smooth"
          });

        }

      }

    );

  }


  /* ==================================================
     DROP - RECORDARME
     ================================================== */

  const notifyBtn =
    document.getElementById(
      "notifyBtn"
    );


  if (notifyBtn) {

    notifyBtn.addEventListener(
      "click",
      () => {

        if (dropIsLive()) {

          /*
             Si ya llegó la fecha,
             llevamos al usuario al catálogo.
          */

          const catalog =
            document.getElementById(
              "catalogo"
            );


          if (catalog) {

            catalog.scrollIntoView({
              behavior: "smooth"
            });

          }

          toast(
            "DROP 001 DISPONIBLE AHORA"
          );

          return;

        }


        toast(
          "TE AVISAREMOS DEL PRÓXIMO DROP"
        );

      }
    );

  }


  /* ==================================================
     NEWSLETTER
     ================================================== */

  const newsletterForm =
    document.getElementById(
      "newsletterForm"
    );


  if (newsletterForm) {

    newsletterForm.addEventListener(
      "submit",
      event => {

        event.preventDefault();


        toast(
          "SUSCRIPCIÓN RECIBIDA"
        );


        event.target.reset();

      }

    );

  }


  /* ==================================================
     CHECKOUT
     ================================================== */

  const checkoutBtn =
    document.getElementById(
      "checkoutBtn"
    );

  if (checkoutBtn) {
    checkoutBtn.addEventListener(
      "click",
      openCheckout
    );
  }

  checkoutForm.addEventListener("submit", submitCheckout);
  document.getElementById("checkoutClose").addEventListener("click", closeCheckout);
  document.getElementById("checkoutBack").addEventListener("click", closeCheckout);
  document.getElementById("checkoutDone").addEventListener("click", closeCheckout);
  document.getElementById("checkoutPaymentMethod").addEventListener("change", updateCheckoutPaymentHint);
  document.getElementById("checkoutDeliveryZone").addEventListener("change", refreshCheckoutQuote);
  checkoutModal.addEventListener("click", event => {
    if (event.target === checkoutModal) closeCheckout();
  });
  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && checkoutModal.classList.contains("open")) closeCheckout();
  });


  /* ==================================================
     CUENTA REGRESIVA
     ================================================== */

  function countdown() {

    const now =
      Date.now();


    const difference =
      Math.max(
        0,
        DROP_DATE - now
      );


    const days =
      document.getElementById(
        "days"
      );

    const hours =
      document.getElementById(
        "hours"
      );

    const minutes =
      document.getElementById(
        "minutes"
      );


    /* ==================================================
       DÍAS
       ================================================== */

    if (days) {

      days.textContent =
        String(
          Math.floor(
            difference /
            86400000
          )
        ).padStart(
          2,
          "0"
        );

    }


    /* ==================================================
       HORAS
       ================================================== */

    if (hours) {

      hours.textContent =
        String(
          Math.floor(
            difference /
            3600000
          ) % 24
        ).padStart(
          2,
          "0"
        );

    }


    /* ==================================================
       MINUTOS
       ================================================== */

    if (minutes) {

      minutes.textContent =
        String(
          Math.floor(
            difference /
            60000
          ) % 60
        ).padStart(
          2,
          "0"
        );

    }


    /* ==================================================
       LANZAMIENTO
       ================================================== */

    if (
      difference === 0 &&
      !dropReleased
    ) {

      dropReleased = true;


      /*
         Volvemos a mostrar el catálogo.
         Los productos con drop:true
         aparecerán automáticamente.
      */

      renderProducts();

      refreshStoreCatalog();


      toast(
        "DROP 001 YA ESTÁ DISPONIBLE"
      );

    }

  }


  /* ==================================================
     INICIAR CUENTA REGRESIVA
     ================================================== */

  setInterval(
    countdown,
    1000
  );


  countdown();


  /* ==================================================
     INICIAR CATÁLOGO
     ================================================== */

  renderProducts();


  /* ==================================================
     INICIAR CARRITO
     ================================================== */

  renderCart();
  refreshStoreCatalog();
  window.setInterval(() => {
    if (!document.hidden) refreshStoreCatalog();
  }, 60000);
  window.addEventListener("focus", refreshStoreCatalog);
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) refreshStoreCatalog();
  });


});
