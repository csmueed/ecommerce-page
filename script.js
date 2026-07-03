const productsList = document.querySelector("#product-list");
const cartItems = document.querySelector("#cart-items");
const emptyCartDisplayMsg = document.querySelector("#empty-cart");
const cartTotalDisplayMsg = document.querySelector("#cart-total");
const totalPrice = document.querySelector("#total-price");
const checkoutBtn = document.querySelector(".checkout-btn");
const container = document.querySelector(".container");
let myPrice = "";

const productArray = [
  { id: crypto.randomUUID(), name: "iPhone 17 Pro Max", price: 1400 },
  { id: crypto.randomUUID(), name: "Macbook Air", price: 1600 },
  { id: crypto.randomUUID(), name: "Samsung S26 Ultra", price: 1200 },
];

const cart = [];

productArray.forEach((product) => {
  productDiv = document.createElement("div");
  productDiv.classList.add("product");
  productDiv.dataset.id = product.id;
  productDiv.innerHTML = `<span> ${product.name} - $${product.price} </span> <button class = "add-btn"> Add to Cart </button>`;
  productsList.appendChild(productDiv);
});

container.addEventListener("click", (e) => {
  if (e.target.classList.contains("add-btn")) {
    let htmlId = e.target.parentElement.dataset.id;
    let matchedProduct = productArray.find((item) => {
      return htmlId === item.id;
    });
    addToCart(matchedProduct);
    cartTotalDisplayMsg.innerHTML = "";
    displayCart();
    calculateTotalPrice();
  } else if (e.target.classList.contains("btn-del")) {
    let htmlId = e.target.parentElement.dataset.id;
    let matchedProduct = cart.find((item) => {
      return htmlId === item.id;
    });
    let IndexArr = cart.findIndex((item) => {
      return item.id === matchedProduct.id;
    });
    cart.splice(IndexArr, 1);
    console.log(cart);
    cartTotalDisplayMsg.innerHTML = "";
    displayCart();
    calculateTotalPrice();
  } else if (e.target.classList.contains("checkout-btn")) {
    setTimeout(() => {
      alert(`Your Checkout is Successful.`);
      window.location.reload();
    }, 100);
  }
});

function addToCart(item) {
  cart.push(item);
}

function displayCart() {
  if (cart.length === 0) {
    emptyCartDisplayMsg.classList.remove("hidden");
  }
  else {
    cart.forEach((item) => {
    emptyCartDisplayMsg.classList.add("hidden");
    cartTotalDisplayMsg.classList.remove("hidden");
    let cartDiv = document.createElement("div");
    cartDiv.classList.add("product");
    cartDiv.dataset.id = item.id;
    cartDiv.innerHTML = `<span> ${item.name} - $${item.price} </span> <button class = "btn-del"> Remove </button>`;
    cartTotalDisplayMsg.appendChild(cartDiv);
  });
  }
}

function calculateTotalPrice() {
  let finalPrice = cart.reduce((acc, value) => {
    return acc + value.price;
  }, 0);
  totalPrice.textContent = `$${finalPrice}`;
}

