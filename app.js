/* ==================================================
   HYPEFRIENDS
   APP.JS
   CATÁLOGO COMPLETO
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
      image: "img/polo.jpg.jpeg",
      desc: "Polo de edición limitada."
    },

    {
      id: 2,
      name: "CAMISETA CHROME HEARTS",
      price: 28000,
      stock: 20,
      category: "tee",
      class: "tee",
      image: "img/camisa-ch-azul.jpg.jpeg",
      desc: "Camiseta de béisbol Chrome Hearts CH en blanco y azul."
    },

    {
      id: 5,
      name: "CAMISETA CHROME HEARTS",
      price: 30000,
      stock: 15,
      category: "tee",
      class: "tee",
      image: "img/camisa-ch.jpg.jpeg",
      desc: "Chrome Hearts Multicolor Long-Sleeve Black."
    },

    {
      id: 8,
      name: "CAMISA SUPREME DUCATI",
      price: 29000,
      stock: 18,
      category: "tee",
      class: "tee",
      image: "img/supreme-ducati.jpg.jpeg",
      desc: "Jersey de fútbol Supreme Ducati en negro."
    },


    /* =========================
       HOODIES
       ========================= */

    {
      id: 4,
      name: "ESSENTIAL HOODIE GREY",
      price: 45000,
      stock: 6,
      category: "hoodie",
      class: "hoodie",
      image: "img/hoodie-core.jpeg",
      desc: "Edición Essentials con unidades limitadas."
    },

    {
      id: 7,
      name: "CORE HOODIE",
      price: 48000,
      stock: 5,
      category: "hoodie",
      class: "hoodie",
      image: "img/hoodie-core.jpg.jpeg",
      desc: "Hoodie premium de gramaje pesado."
    },


    /* =========================
       GORRAS
       ========================= */

    {
      id: 6,
      name: "SIGNATURE CAP",
      price: 26000,
      stock: 9,
      category: "cap",
      class: "cap",
      image: "img/cap-signature.jpg.jpeg",
      desc: "Gorra Signature Hypefriends."
    },

    {
      id: 9,
      name: "HYPEFRIENDS CAP BLACK",
      price: 25000,
      stock: 10,
      category: "cap",
      class: "cap",
      image: "img/cap-black.jpeg",
      desc: "Gorra Hypefriends en color negro."
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
      image: "img/short-corteiz.jpg.jpeg",
      desc: "Corteiz Baggy Denim Shorts Stonewash."
    },

    {
      id: 10,
      name: "ESSENTIAL SHORT BLACK",
      price: 24000,
      stock: 10,
      category: "short",
      class: "short",
      image: "img/short-essential.jpeg",
      desc: "Short Essential de corte relajado en negro."
    },

    {
      id: 11,
      name: "DENIM BAGGY SHORT",
      price: 26000,
      stock: 7,
      category: "short",
      class: "short",
      image: "img/short-denim.jpeg",
      desc: "Short denim baggy de estilo urbano."
    },


    /* =========================
       ACCESORIOS
       ========================= */

    {
      id: 12,
      name: "HYPEFRIENDS TENNIS CHAIN",
      price: 35000,
      stock: 8,
      category: "accessory",
      class: "accessory",
      image: "img/cadena-tennis.jpeg",
      desc: "Cadena Tennis plateada con diseño premium Hypefriends."
    },

    {
      id: 13,
      name: "HYPEFRIENDS PENDANT",
      price: 30000,
      stock: 6,
      category: "accessory",
      class: "accessory",
      image: "img/collar-hypefriends.jpeg",
      desc: "Dije Hypefriends de tamaño compacto."
    },

    {
      id: 14,
      name: "HYPEFRIENDS CROSSBODY BAG",
      price: 32000,
      stock: 9,
      category: "accessory",
      class: "accessory",
      image: "img/bolso-hypefriends.jpeg",
      desc: "Bolso Crossbody Hypefriends para uso diario."
    }

  ];


  /* ==================================================
     VARIABLES
     ================================================== */

  let currentFilter = "all";

  let selectedProduct = null;

  let selectedSize = "M";


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


  /* ==================================================
     MOSTRAR PRODUCTOS
     ================================================== */

  function renderProducts(list = products) {

    const filteredProducts =
      list.filter(product => {

        return (
          currentFilter === "all" ||
          product.category === currentFilter
        );

      });


    if (!filteredProducts.length) {

      productGrid.innerHTML = `

        <div class="no-products">

          <p>
            No encontramos productos
            en esta categoría.
          </p>

        </div>

      `;

      return;

    }


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
                  ${product.stock}
                  unidades disponibles
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


    /* NOMBRE */

    if (modalName) {

      modalName.textContent =
        selectedProduct.name;

    }


    /* DESCRIPCIÓN */

    if (modalDescription) {

      modalDescription.textContent =
        selectedProduct.desc;

    }


    /* PRECIO */

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

      if (
        selectedProduct.category === "accessory" ||
        selectedProduct.category === "cap"
      ) {

        sizes.innerHTML = `

          <p class="no-size">
            Talla única
          </p>

        `;

        selectedSize = "ÚNICA";

      } else {

        sizes.innerHTML =
          ["S", "M", "L", "XL"]
            .map(size => {

              return `

                <button
                  type="button"
                  class="size ${
                    size === "M"
                      ? "selected"
                      : ""
                  }"
                  data-size="${size}"
                >

                  ${size}

                </button>

              `;

            })
            .join("");


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

              }
            );

          });

      }

    }


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

    /* CONTADOR */

    if (cartCount) {

      cartCount.textContent =
        cart.reduce(
          (total, item) =>
            total + item.qty,
          0
        );

    }


    /* PRODUCTOS */

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


    /* TOTAL */

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


    const found =
      cart.find(
        item =>
          item.id ===
            selectedProduct.id &&
          item.size ===
            selectedSize
      );


    if (found) {

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


          /* BOTÓN ACTIVO */

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


          /* MOSTRAR PRODUCTOS */

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


  const modalAddBtn =
    document.getElementById(
      "modalAddBtn"
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
     DROP
     ================================================== */

  const notifyBtn =
    document.getElementById(
      "notifyBtn"
    );


  if (notifyBtn) {

    notifyBtn.addEventListener(
      "click",
      () => {

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
      () => {

        if (cart.length) {

          toast(
            "PRÓXIMO PASO: CONECTAR PASARELA DE PAGO REAL"
          );

        } else {

          toast(
            "TU BOLSA ESTÁ VACÍA"
          );

        }

      }
    );

  }


  /* ==================================================
     CUENTA REGRESIVA
     ================================================== */

  function countdown() {

    const target =
      new Date(
        "2026-10-01T18:00:00-06:00"
      ).getTime();


    const now =
      Date.now();


    const difference =
      Math.max(
        0,
        target - now
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

  }


  setInterval(
    countdown,
    1000
  );


  countdown();


  /* ==================================================
     INICIAR
     ================================================== */

  renderProducts();

  renderCart();

});
