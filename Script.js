const products = [
  { id: 1, name: "Shirt", price: 1000 },
  { id: 2, name: "Shoes", price: 2500 }
];

let cart = [];

const productsDiv = document.getElementById("products");
const cartDiv = document.getElementById("cart");
const totalDiv = document.getElementById("total");

// Render products (name + price + add button)
function renderProducts() {
  productsDiv.innerHTML = ""; // clear first
  products.forEach(product => {
    productsDiv.innerHTML += `
      <div>
        <h4>${product.name}</h4>
        <p>Price: ${product.price}</p>
        <button onclick="addToCart(${product.id})">Add</button>
      </div>
    `;
  });
}

// Add to cart
function addToCart(id) {
  const item = cart.find(p => p.id === id);

  if (item) {
    item.quantity++;
  } else {
    const product = products.find(p => p.id === id);
    cart.push({ ...product, quantity: 1 });
  }

  renderCart();
}

// Render cart + total
function renderCart() {
  cartDiv.innerHTML = "";

  cart.forEach(item => {
    cartDiv.innerHTML += `
      <div>
        <h4>${item.name}</h4>
        <p>${item.price} x ${item.quantity}</p>
        <button onclick="changeQty(${item.id}, 1)">+</button>
        <button onclick="changeQty(${item.id}, -1)">-</button>
      </div>
    `;
  });

  updateTotal();
}

// Change quantity + remove if 0
function changeQty(id, amount) {
  const item = cart.find(p => p.id === id);
  item.quantity += amount;

  if (item.quantity <= 0) {
    cart = cart.filter(p => p.id !== id);
  }

  renderCart();
}

// Update total
function updateTotal() {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  totalDiv.textContent = "Total: " + total;
}

// Initial render
renderProducts();
