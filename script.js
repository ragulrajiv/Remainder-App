// Sample products data
const products = [
  {
    id: 1,
    name: "Laptop",
    price: 999,
    details: "High-performance laptop",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 2,
    name: "Phone",
    price: 599,
    details: "Smartphone with camera",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 3,
    name: "Headphones",
    price: 199,
    details: "Noise-cancelling headphones",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 4,
    name: "Tablet",
    price: 399,
    details: "Portable tablet",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 5,
    name: "Mouse",
    price: 49,
    details: "Wireless mouse",
    image: "https://via.placeholder.com/150",
  },
];

// DOM elements
const authSection = document.getElementById("auth-section");
const homeSection = document.getElementById("home-section");
const cartSection = document.getElementById("cart-section");
const checkoutSection = document.getElementById("checkout-section");
const authForm = document.getElementById("auth-form");
const productsDiv = document.getElementById("products");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");

// Load user data from localStorage
let users = JSON.parse(localStorage.getItem("users")) || [];
let currentUser = JSON.parse(localStorage.getItem("currentUser")) || null;
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Auth logic
authForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const user = users.find((u) => u.email === email && u.password === password);
  if (user) {
    currentUser = user;
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
    showHome();
  } else {
    alert("Invalid credentials");
  }
});

document.getElementById("register-btn").addEventListener("click", () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  if (email && password) {
    users.push({ email, password });
    localStorage.setItem("users", JSON.stringify(users));
    alert("Registered! Now login.");
  } else {
    alert("Fill all fields");
  }
});

// Show home page with products
function showHome() {
  authSection.style.display = "none";
  homeSection.style.display = "block";
  productsDiv.innerHTML = "";
  products.forEach((product) => {
    const div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>$${product.price}</p>
            <p>${product.details}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
    productsDiv.appendChild(div);
  });
}

// Add to cart
function addToCart(id) {
  const product = products.find((p) => p.id === id);
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Added to cart");
}

// View cart
document.getElementById("view-cart-btn").addEventListener("click", () => {
  homeSection.style.display = "none";
  cartSection.style.display = "block";
  updateCart();
});

function updateCart() {
  cartItems.innerHTML = "";
  let total = 0;
  cart.forEach((item, index) => {
    total += item.price;
    const li = document.createElement("li");
    li.innerHTML = `${item.name} - $${item.price} <button onclick="removeFromCart(${index})">Remove</button>`;
    cartItems.appendChild(li);
  });
  cartTotal.textContent = total;
}

function removeFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCart();
}

// Checkout
document.getElementById("checkout-btn").addEventListener("click", () => {
  if (cart.length === 0) return alert("Cart is empty");
  cartSection.style.display = "none";
  checkoutSection.style.display = "block";
});

document.getElementById("payment-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const method = document.getElementById("payment-method").value;
  alert(`Order placed with ${method}! Total: $${cartTotal.textContent}`);
  cart = [];
  localStorage.setItem("cart", JSON.stringify(cart));
  showHome();
});

// Navigation
document.getElementById("back-to-home-btn").addEventListener("click", () => {
  cartSection.style.display = "none";
  homeSection.style.display = "block";
});

document.getElementById("back-to-cart-btn").addEventListener("click", () => {
  checkoutSection.style.display = "none";
  cartSection.style.display = "block";
});

// Initialize
if (currentUser) showHome();
