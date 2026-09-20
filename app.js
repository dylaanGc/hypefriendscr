const products = [
  {
    id: 1,
    name: "ESSENTIAL HOODIE BLACK",
    price: 45000,
    stock: 12,
    category: "hoodie",
    class: "hoodie",
   image: "img/hoodie-black.jpg.jpeg",
    desc: "Hoodie heavyweight de edición limitada."
  },
  {
    id: 2,
    name: "HYPE TEE WHITE",
    price: 28000,
    stock: 20,
    category: "tee",
    class: "tee",
    image: "img/tee-white.jpg.jpeg",
    desc: "Camiseta premium con corte urbano."
  },
  {
    id: 3,
    name: "HF CAP 001",
    price: 25000,
    stock: 8,
    category: "cap",
    class: "cap",
    image: "img/cap-001.jpg.jpeg",
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
    image: "img/tee-drop-001.jpg.jpeg",
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
    image: "img/tee-mono.jpg.jpeg",
    desc: "Camiseta minimalista Hypefriends."
  }
];

let currentFilter = "all";
let selectedProduct = null;
let selectedSize = "M";

let cart = JSON.parse(
  localStorage.getItem("hypefriends-cart") || "[]"
);

const money = n =>
  "₡" + new Intl.NumberFormat("es-CR").format(n);


// ===============================
// PRODUCTOS
// ===============================

function renderProducts(list = products) {

  const grid = document.getElementById("productGrid");

  grid.innerHTML =
    list
      .filter(
        p =>
          currentFilter === "all" ||
          p.category === currentFilter
      )
      .map(
        p => `
          <article class="product" data-id="${p.id}">

            <div class="product-img ${p.class}">
              <img
                src="${p.image}"
                alt="${p.name}"
                loading="lazy"
              >
            </div>

            <div class="product-info">
              <p class="product-name">${p.name}</p>

              <p class="product-price">
                ${money(p.price)}
              </p>

              <p class="product-stock">
                ${p.stock} unidades disponibles
              </p>
            </div>

          </article>
        `
      )
      .join("") ||
    "<p>No encontramos productos.</p>";

  grid
    .querySelectorAll(".product")
    .forEach(el => {

      el.addEventListener("click", () => {

        openProduct(
          Number(el.dataset.id)
        );

      });

    });
}


// ===============================
// MODAL DEL PRODUCTO
// ===============================

function openProduct(id) {

  selectedProduct =
    products.find(p => p.id === id);

  selectedSize = "M";

  document.getElementById(
    "modalName"
  ).textContent = selectedProduct.name;

  document.getElementById(
    "modalDescription"
  ).textContent = selectedProduct.desc;

  document.getElementById(
    "modalPrice"
  ).textContent = money(
    selectedProduct.price
  );


  // Imagen del producto

  const modalImage =
    document.getElementById("modalImage");

  modalImage.className =
    "modal-image";

  modalImage.innerHTML = `
    <img
      src="${selectedProduct.image}"
      alt="${selectedProduct.name}"
    >
  `;


  // Tallas

  document.getElementById(
    "sizes"
  ).innerHTML = ["S", "M", "L", "XL"]
    .map(
      s => `
        <button
          class="size ${
            s === "M" ? "selected" : ""
          }"
          data-size="${s}"
        >
          ${s}
        </button>
      `
    )
    .join("");


  document
    .querySelectorAll(".size")
    .forEach(button => {

      button.onclick = () => {

        selectedSize =
          button.dataset.size;

        document
          .querySelectorAll(".size")
          .forEach(x =>
            x.classList.remove("selected")
          );

        button.classList.add("selected");

      };

    });


  document
    .getElementById("productModal")
    .classList.add("open");
}


// ===============================
// CARRITO
// ===============================

function saveCart() {

  localStorage.setItem(
    "hypefriends-cart",
    JSON.stringify(cart)
  );

}


function renderCart() {

  document.getElementById(
    "cartCount"
  ).textContent =
    cart.reduce(
      (a, i) => a + i.qty,
      0
    );


  const area =
    document.getElementById(
      "cartItems"
    );


  area.innerHTML =
    cart.length

      ? cart
          .map(
            (item, i) => `
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
                    item.price * item.qty
                  )}
                </p>

                <button
                  onclick="removeItem(${i})"
                >
                  ELIMINAR
                </button>

              </div>
            `
          )
          .join("")

      : `
        <p style="color:#777;margin-top:25px">
          Tu bolsa está vacía.
        </p>
      `;


  document.getElementById(
    "cartTotal"
  ).textContent = money(
    cart.reduce(
      (a, i) =>
        a + i.price * i.qty,
      0
    )
  );

}


window.removeItem = i => {

  cart.splice(i, 1);

  saveCart();

  renderCart();

};


// ===============================
// AGREGAR AL CARRITO
// ===============================

function addSelected() {

  if (!selectedProduct) return;


  const found =
    cart.find(
      i =>
        i.id === selectedProduct.id &&
        i.size === selectedSize
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

  document
    .getElementById("productModal")
    .classList.remove("open");

  toast("AGREGADO A TU BOLSA");

}


// ===============================
// MENSAJE
// ===============================

function toast(msg) {

  const t =
    document.getElementById("toast");

  t.textContent = msg;

  t.classList.add("show");

  setTimeout(
    () => t.classList.remove("show"),
    2400
  );

}


// ===============================
// MENÚ
// ===============================

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


document.getElementById(
  "menuBtn"
).onclick = () => {

  drawer.classList.add("open");

  overlay.classList.add("show");

};


document.getElementById(
  "closeMenu"
).onclick = closePanels;


overlay.onclick = closePanels;


document
  .querySelectorAll(".nav-link")
  .forEach(
    x => x.onclick = closePanels
  );


function closePanels() {

  drawer.classList.remove("open");

  cartElement.classList.remove("open");

  overlay.classList.remove("show");

}


// ===============================
// BÚSQUEDA
// ===============================

document.getElementById(
  "searchBtn"
).onclick = () => {

  searchPanel.classList.add("open");

  searchInput.focus();

};


document.getElementById(
  "closeSearch"
).onclick = () =>
  searchPanel.classList.remove("open");


searchInput.oninput = e => {

  const q =
    e.target.value.toLowerCase();


  renderProducts(
    products.filter(
      p =>
        p.name
          .toLowerCase()
          .includes(q) ||
        p.category
          .includes(q)
    )
  );

};


// ===============================
// FILTROS
// ===============================

document
  .querySelectorAll(".filter")
  .forEach(button => {

    button.onclick = () => {

      currentFilter =
        button.dataset.filter;

      document
        .querySelectorAll(".filter")
        .forEach(x =>
          x.classList.remove("active")
        );

      button.classList.add("active");

      renderProducts();

    };

  });


// ===============================
// CARRITO
// ===============================

document.getElementById(
  "cartBtn"
).onclick = () => {

  cartElement.classList.add("open");

  overlay.classList.add("show");

};


document.getElementById(
  "closeCart"
).onclick = closePanels;


// ===============================
// MODAL
// ===============================

document.getElementById(
  "modalClose"
).onclick = () =>
  document
    .getElementById("productModal")
    .classList.remove("open");


document.getElementById(
  "modalAddBtn"
).onclick = addSelected;


// ===============================
// DROP
// ===============================

document.getElementById(
  "notifyBtn"
).onclick = () =>
  toast(
    "TE AVISAREMOS DEL PRÓXIMO DROP"
  );


// ===============================
// NEWSLETTER
// ===============================

document.getElementById(
  "newsletterForm"
).onsubmit = e => {

  e.preventDefault();

  toast("SUSCRIPCIÓN RECIBIDA");

  e.target.reset();

};


// ===============================
// CHECKOUT
// ===============================

document.getElementById(
  "checkoutBtn"
).onclick = () => {

  cart.length
    ? toast(
        "PRÓXIMO PASO: CONECTAR PASARELA DE PAGO REAL"
      )
    : toast(
        "TU BOLSA ESTÁ VACÍA"
      );

};


// ===============================
// CUENTA REGRESIVA
// ===============================

function countdown() {

  const target =
    new Date(
      "2026-10-01T18:00:00-06:00"
    ).getTime();

  const now = Date.now();

  const d =
    Math.max(
      0,
      target - now
    );


  document.getElementById(
    "days"
  ).textContent =
    String(
      Math.floor(
        d / 86400000
      )
    ).padStart(2, "0");


  document.getElementById(
    "hours"
  ).textContent =
    String(
      Math.floor(
        d / 3600000
      ) % 24
    ).padStart(2, "0");


  document.getElementById(
    "minutes"
  ).textContent =
    String(
      Math.floor(
        d / 60000
      ) % 60
    ).padStart(2, "0");

}


setInterval(
  countdown,
  1000
);

countdown();

renderProducts();

renderCart();
