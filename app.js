/* ==================================================
   PRODUCTOS
   ================================================== */

const products = [

  {
    id: 1,
    name: "ESSENTIAL HOODIE BLACK",
    price: 45000,
    stock: 12,
    category: "hoodie",
    class: "hoodie",
    image: "img/polo.jpg.jpeg",
    desc: "Hoodie heavyweight de edición limitada."
  },

  {
    id: 2,
    name: "HYPE TEE WHITE",
    price: 28000,
    stock: 20,
    category: "tee",
    class: "tee",
    image: "img/camisa-ch-azul.jpg.jpeg",
    desc: "Camiseta premium con corte urbano."
  },

  {
    id: 3,
    name: "HF CAP 001",
    price: 25000,
    stock: 8,
    category: "cap",
    class: "cap",
    image: "img/short-corteiz.jpeg",
    desc: "Gorra estructurada para uso diario."
  },

  {
    id: 4,
    name: "ESSENTIAL HOODIE GREY",
    price: 45000,
    stock: 6,
    category: "hoodie",
    class: "hoodie",
    image: "img/hoodie-grey.jpg.jpeg",
    desc: "Edición Essentials con unidades limitadas."
  },

  {
    id: 5,
    name: "DROP TEE 001",
    price: 30000,
    stock: 15,
    category: "tee",
    class: "tee",
    image: "img/camisa-ch.jpg.jpeg",
    desc: "Drop limitado Hypefriends 001."
  },

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
    id: 7,
    name: "CORE HOODIE",
    price: 48000,
    stock: 5,
    category: "hoodie",
    class: "hoodie",
    image: "img/hoodie-core.jpg.jpeg",
    desc: "Hoodie premium de gramaje pesado."
  },

  {
    id: 8,
    name: "MONO TEE",
    price: 29000,
    stock: 18,
    category: "tee",
    class: "tee",
    image: "img/supreme-ducati.jpg.jpeg",
    desc: "Camiseta minimalista Hypefriends."
  }

];


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
   FORMATO DE DINERO
   ================================================== */

const money = n =>
  "₡" +
  new Intl.NumberFormat("es-CR").format(n);


/* ==================================================
   PRODUCTOS
   ================================================== */

function renderProducts(list = products) {

  const grid =
    document.getElementById("productGrid");


  const filteredProducts =
    list.filter(
      p =>
        currentFilter === "all" ||
        p.category === currentFilter
    );


  grid.innerHTML =
    filteredProducts.length

      ? filteredProducts
          .map(
            p => `

              <article
                class="product"
                data-id="${p.id}"
              >

                <div
                  class="product-img ${p.class}"
                >

                  <img
                    src="${p.image}"
                    alt="${p.name}"
                    loading="lazy"
                  >

                </div>


                <div class="product-info">

                  <p class="product-name">
                    ${p.name}
                  </p>

                  <p class="product-price">
                    ${money(p.price)}
                  </p>

                  <p class="product-stock">
                    ${p.stock}
                    unidades disponibles
                  </p>

                </div>

              </article>

            `
          )
          .join("")

      : `
          <p>
            No encontramos productos.
          </p>
        `;


  /* CLICK EN PRODUCTOS */

  grid
    .querySelectorAll(".product")
    .forEach(el => {

      el.addEventListener(
        "click",
        () => {

          openProduct(
            Number(el.dataset.id)
          );

        }
      );

    });

}


/* ==================================================
   MODAL DEL PRODUCTO
   ================================================== */

function openProduct(id) {

  selectedProduct =
    products.find(
      p => p.id === id
    );


  if (!selectedProduct) {
    return;
  }


  selectedSize = "M";


  /* NOMBRE */

  document.getElementById(
    "modalName"
  ).textContent =
    selectedProduct.name;


  /* DESCRIPCIÓN */

  document.getElementById(
    "modalDescription"
  ).textContent =
    selectedProduct.desc;


  /* PRECIO */

  document.getElementById(
    "modalPrice"
  ).textContent =
    money(
      selectedProduct.price
    );


  /* ==================================================
     IMAGEN
     ================================================== */

  const modalImage =
    document.getElementById(
      "modalImage"
    );


  modalImage.className =
    "modal-image";


  modalImage.innerHTML = `
    <img
      src="${selectedProduct.image}"
      alt="${selectedProduct.name}"
      class="modal-product-img"
    >
  `;


  /* ==================================================
     TALLAS
     ================================================== */

  document.getElementById(
    "sizes"
  ).innerHTML =

    ["S", "M", "L", "XL"]

      .map(
        size => `

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

        `
      )
      .join("");


  /* ==================================================
     SELECCIÓN DE TALLAS
     ================================================== */

  document
    .querySelectorAll(".size")
    .forEach(button => {

      button.onclick = () => {

        selectedSize =
          button.dataset.size;


        document
          .querySelectorAll(".size")
          .forEach(
            x =>
              x.classList.remove(
                "selected"
              )
          );


        button.classList.add(
          "selected"
        );

      };

    });


  /* ==================================================
     ABRIR MODAL
     ================================================== */

  const modal =
    document.getElementById(
      "productModal"
    );


  modal.classList.add("open");

  modal.setAttribute(
    "aria-hidden",
    "false"
  );


  document.body.classList.add(
    "modal-open"
  );

}


/* ==================================================
   CERRAR MODAL
   ================================================== */

function closeProductModal() {

  const modal =
    document.getElementById(
      "productModal"
    );


  modal.classList.remove(
    "open"
  );


  modal.setAttribute(
    "aria-hidden",
    "true"
  );


  document.body.classList.remove(
    "modal-open"
  );

}


/* ==================================================
   CERRAR MODAL CON ESC
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
   CERRAR AL HACER CLICK FUERA
   ================================================== */

document
  .getElementById("productModal")
  .addEventListener(
    "click",
    event => {

      if (
        event.target.id ===
        "productModal"
      ) {

        closeProductModal();

      }

    }
  );


/* ==================================================
   CARRITO
   ================================================== */

function saveCart() {

  localStorage.setItem(
    "hypefriends-cart",
    JSON.stringify(cart)
  );

}


function renderCart() {

  /* CONTADOR */

  document.getElementById(
    "cartCount"
  ).textContent =

    cart.reduce(
      (total, item) =>
        total + item.qty,
      0
    );


  /* ÁREA DEL CARRITO */

  const area =
    document.getElementById(
      "cartItems"
    );


  area.innerHTML =

    cart.length

      ? cart
          .map(
            (item, index) => `

              <div class="cart-item">

                <h4>
                  ${item.name}
                </h4>

                <small>
                  Talla: ${item.size}
                  · Cantidad: ${item.qty}
                </small>

                <p>
                  ${money(
                    item.price *
                    item.qty
                  )}
                </p>

                <button
                  onclick="removeItem(${index})"
                >
                  ELIMINAR
                </button>

              </div>

            `
          )
          .join("")

      : `

          <p
            style="
              color:#777;
              margin-top:25px;
            "
          >
            Tu bolsa está vacía.
          </p>

        `;


  /* TOTAL */

  document.getElementById(
    "cartTotal"
  ).textContent =

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


/* ==================================================
   ELIMINAR DEL CARRITO
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

  const toastElement =
    document.getElementById(
      "toast"
    );


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
   MENÚ
   ================================================== */

const drawer =
  document.getElementById(
    "drawer"
  );


const overlay =
  document.getElementById(
    "overlay"
  );


const cartElement =
  document.getElementById(
    "cart"
  );


const searchPanel =
  document.getElementById(
    "searchPanel"
  );


const searchInput =
  document.getElementById(
    "searchInput"
  );


/* ABRIR MENÚ */

document.getElementById(
  "menuBtn"
).onclick = () => {

  drawer.classList.add(
    "open"
  );

  overlay.classList.add(
    "show"
  );

};


/* CERRAR MENÚ */

document.getElementById(
  "closeMenu"
).onclick =
  closePanels;


/* OVERLAY */

overlay.onclick =
  closePanels;


/* LINKS DEL MENÚ */

document
  .querySelectorAll(".nav-link")
  .forEach(
    link =>
      link.onclick =
        closePanels
  );


function closePanels() {

  drawer.classList.remove(
    "open"
  );

  cartElement.classList.remove(
    "open"
  );

  overlay.classList.remove(
    "show"
  );

}


/* ==================================================
   BÚSQUEDA
   ================================================== */

document.getElementById(
  "searchBtn"
).onclick = () => {

  searchPanel.classList.add(
    "open"
  );

  searchInput.focus();

};


document.getElementById(
  "closeSearch"
).onclick = () => {

  searchPanel.classList.remove(
    "open"
  );

};


searchInput.oninput = event => {

  const query =
    event.target.value
      .toLowerCase()
      .trim();


  const results =
    products.filter(
      product =>

        product.name
          .toLowerCase()
          .includes(query)

        ||

        product.category
          .toLowerCase()
          .includes(query)

    );


  renderProducts(
    results
  );

};


/* ==================================================
   FILTROS
   ================================================== */

document
  .querySelectorAll(".filter")
  .forEach(button => {

    button.onclick = () => {

      currentFilter =
        button.dataset.filter;


      document
        .querySelectorAll(".filter")
        .forEach(
          element =>
            element.classList.remove(
              "active"
            )
        );


      button.classList.add(
        "active"
      );


      renderProducts();

    };

  });


/* ==================================================
   CARRITO
   ================================================== */

document.getElementById(
  "cartBtn"
).onclick = () => {

  cartElement.classList.add(
    "open"
  );

  overlay.classList.add(
    "show"
  );

};


document.getElementById(
  "closeCart"
).onclick =
  closePanels;


/* ==================================================
   MODAL
   ================================================== */

document.getElementById(
  "modalClose"
).onclick =
  closeProductModal;


document.getElementById(
  "modalAddBtn"
).onclick =
  addSelected;


/* ==================================================
   VER COLECCIÓN
   ================================================== */

document.getElementById(
  "collectionBtn"
).onclick = () => {

  document
    .getElementById(
      "catalogo"
    )
    .scrollIntoView({
      behavior: "smooth"
    });

};


/* ==================================================
   DROP
   ================================================== */

document.getElementById(
  "notifyBtn"
).onclick = () => {

  toast(
    "TE AVISAREMOS DEL PRÓXIMO DROP"
  );

};


/* ==================================================
   NEWSLETTER
   ================================================== */

document.getElementById(
  "newsletterForm"
).onsubmit = event => {

  event.preventDefault();


  toast(
    "SUSCRIPCIÓN RECIBIDA"
  );


  event.target.reset();

};


/* ==================================================
   CHECKOUT
   ================================================== */

document.getElementById(
  "checkoutBtn"
).onclick = () => {

  if (cart.length) {

    toast(
      "PRÓXIMO PASO: CONECTAR PASARELA DE PAGO REAL"
    );

  } else {

    toast(
      "TU BOLSA ESTÁ VACÍA"
    );

  }

};


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


  /* DÍAS */

  document.getElementById(
    "days"
  ).textContent =

    String(
      Math.floor(
        difference /
        86400000
      )
    ).padStart(
      2,
      "0"
    );


  /* HORAS */

  document.getElementById(
    "hours"
  ).textContent =

    String(
      Math.floor(
        difference /
        3600000
      ) % 24
    ).padStart(
      2,
      "0"
    );


  /* MINUTOS */

  document.getElementById(
    "minutes"
  ).textContent =

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
