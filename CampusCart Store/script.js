// ==========================
// CAMPUSCART APP SCRIPT
// ==========================

const initialProducts = [
  { id: 1, name: "Notebook", price: 50, category: "School Supplies", stock: 100, icon: "📓" },
  { id: 2, name: "Scientific Calculator", price: 850, category: "Electronics", stock: 25, icon: "🧮" },
  { id: 3, name: "USB Flash Drive 32GB", price: 350, category: "Electronics", stock: 40, icon: "💾" },
  { id: 4, name: "Green Campus Lanyard", price: 75, category: "Accessories", stock: 150, icon: "🏷️" },
  { id: 5, name: "Organic Plant Fertilizer 1kg", price: 200, category: "Accessories", stock: 60, icon: "🌱" },
  { id: 6, name: "Ballpen Pack (5pcs)", price: 45, category: "School Supplies", stock: 200, icon: "✏️" },
  { id: 7, name: "Mouse Pad", price: 65, category: "Electronics", stock: 99, icon: "🧮" },
  { id: 8, name: "Type C Charger", price: 99, category: "Electronics", stock: 101, icon: "🧮"},
  { id: 9, name: "Iphone 11 Phone Case", price: 105, category: "Electronics", stock: 324, icon: "🧮"},
  { id: 10, name: "Wireless Earbuds", price: 99, category: "Electronics", stock: 1092, icon: "🧮"},
  { id: 11, name: "Pencil", price: 21, category: "School Supplies", stock: 121, icon: "📓"},
  { id: 12, name: "Blush On", price: 350, category: "Make Up", stock: 1296, icon: "💄"},
  { id: 13, name: "Lippie", price: 200, category: "Make Up", stock: 567, icon: "💄"},
  { id: 14, name: "Eyeliner", price: 99, category: "Make Up", stock: 849, icon: "💄"},
  { id: 15, name: "Foundation", price: 499, category: "Make Up", stock: 435, icon: "💄"},
  { id: 16, name: "Concealer", price: 249, category: "Make Up", stock: 637, icon: "💄"},
  { id: 17, name: "Mascara", price: 79, category: "Make Up", stock: 836, icon: "💄"},
  { id: 18, name: "Eyebrows Pen", price: 59, category: "Make Up", stock: 134, icon: "💄"},
  { id: 19, name: "Curler", price: 69, category: "Make Up", stock: 4789, icon: "💄"},
  { id: 20, name: "Contact Lens", price: 299, category: "Make Up", stock: 947, icon: "💄"},
  { id: 21, name: "Lip Gloss", price: 220, category: "Make Up", stock: 637, icon: "💄"},
  { id: 22, name: "Contour", price: 399, category: "Make Up", stock: 946, icon: "💄"},
  { id: 23, name: "Sling Bag", price: 689, category: "Purse", stock: 7665, icon: "👜"},
  { id: 24, name: "Tote Bag", price: 299, category: "Purse", stock: 6778, icon: "👜"},
  { id: 25, name: "Laptop Bag", price: 591, category: "Purse", stock: 1281, icon: "👜"},
  { id: 26, name: "Make Up Pouch", price: 290, category: "Purse", stock: 1281, icon: "👜"},
  { id: 27, name: "Wallet", price: 99, category: "Purse", stock: 1291, icon: "👜"},
  { id: 28, name: "Dress", price: 499, category: "Fashion", stock: 5621, icon: "👗"},
  { id: 29, name: "Pants", price: 249, category: "Fashion", stock: 981, icon: "👗"},
  { id: 30, name: "Skirt", price: 199, category: "Fashion", stock: 234, icon: "👗"},
  { id: 31, name: "Shoes", price: 499, category: "Fashion", stock: 234, icon: "👠"},
  { id: 32, name: "Heels", price: 659, category: "Fashion", stock: 234, icon: "👠"},
  { id: 33, name: "Flat Sandals", price: 159, category: "Fashion", stock: 234, icon: "👠"},
  { id: 34, name: "Doll Shoes", price: 199, category: "Fashion", stock: 234, icon: "👠"},
  { id: 35, name: "Loafers", price: 499, category: "Fashion", stock: 234, icon: "👠"},
];

let state = {
  currentUser: null,
  products: JSON.parse(localStorage.getItem('cc_products')) || initialProducts,
  cart: JSON.parse(localStorage.getItem('cc_cart')) || [],
  wishlist: JSON.parse(localStorage.getItem('cc_wishlist')) || [],
  orders: JSON.parse(localStorage.getItem('cc_orders')) || []
};

function persistData() {
  localStorage.setItem('cc_products', JSON.stringify(state.products));
  localStorage.setItem('cc_cart', JSON.stringify(state.cart));
  localStorage.setItem('cc_wishlist', JSON.stringify(state.wishlist));
  localStorage.setItem('cc_orders', JSON.stringify(state.orders));
}

document.addEventListener('DOMContentLoaded', () => {
  setupAuth();
  setupNavigation();
  setupCustomerActions();
  setupSellerActions();
});

// ==========================
// AUTHENTICATION LOGIC
// ==========================
function setupAuth() {
  const loginForm = document.getElementById('login-form');
  const loginSection = document.getElementById('login-section');
  const appContainer = document.getElementById('app-container');
  const errorMsg = document.getElementById('login-error');

  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('email').value.trim();
      const password = document.getElementById('password').value.trim();

      errorMsg.textContent = '';

      if (email === 'user@gmail.com' && password === 'user123') {
        state.currentUser = 'customer';
        loginSection.classList.add('hidden');
        appContainer.classList.remove('hidden');
        initCustomerApp();
      } else if (email === 'seller@gmail.com' && password === 'seller123') {
        state.currentUser = 'seller';
        loginSection.classList.add('hidden');
        appContainer.classList.remove('hidden');
        initSellerApp();
      } else {
        errorMsg.textContent = 'Invalid email or password. Please check demo credentials.';
      }
    });
  }

  document.querySelectorAll('.logout-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      state.currentUser = null;
      document.getElementById('email').value = '';
      document.getElementById('password').value = '';
      appContainer.classList.add('hidden');
      loginSection.classList.remove('hidden');
    });
  });
}

// ==========================
// NAVIGATION SYSTEM
// ==========================
function setupNavigation() {
  const customerNavItems = document.querySelectorAll('#customer-nav .nav-item[data-page]');
  const sellerNavItems = document.querySelectorAll('#seller-nav .nav-item[data-page]');

  customerNavItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const page = item.getAttribute('data-page');
      switchCustomerPage(page);
      customerNavItems.forEach(nav => nav.classList.remove('active'));
      item.classList.add('active');
    });
  });

  sellerNavItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const page = item.getAttribute('data-page');
      switchSellerPage(page);
      sellerNavItems.forEach(nav => nav.classList.remove('active'));
      item.classList.add('active');
    });
  });
}

function switchCustomerPage(pageName) {
  document.querySelectorAll('#app-container .page-section').forEach(sec => sec.classList.add('hidden'));
  const target = document.getElementById(`page-${pageName}`);
  if (target) target.classList.remove('hidden');

  if (pageName === 'home') renderFeaturedProducts();
  if (pageName === 'products') renderAllProducts();
  if (pageName === 'categories') renderCategories();
  if (pageName === 'cart') renderCartTable();
  if (pageName === 'wishlist') renderWishlistGrid();
  if (pageName === 'orders') renderCustomerOrders();
}

function switchSellerPage(pageName) {
  document.querySelectorAll('#app-container .page-section').forEach(sec => sec.classList.add('hidden'));
  const target = document.getElementById(`page-${pageName}`);
  if (target) target.classList.remove('hidden');

  if (pageName === 'seller-dashboard') renderSellerDashboard();
  if (pageName === 'manage-products') renderSellerProductsTable();
  if (pageName === 'seller-orders') renderSellerOrders();
  if (pageName === 'add-product') {
    document.getElementById('form-title').textContent = 'Add New Product';
    document.getElementById('product-form').reset();
    document.getElementById('prod-id').value = '';
  }
}

// ==========================
// CUSTOMER APP LOGIC
// ==========================
function initCustomerApp() {
  document.getElementById('customer-nav').classList.remove('hidden');
  document.getElementById('seller-nav').classList.add('hidden');
  switchCustomerPage('home');
  updateBadges();
}

function updateBadges() {
  const totalCartCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);
  document.getElementById('cart-count').textContent = totalCartCount;
  document.getElementById('wishlist-count').textContent = state.wishlist.length;
}

function renderFeaturedProducts() {
  const container = document.getElementById('featured-products');
  const featured = state.products.slice(0, 4);
  container.innerHTML = featured.map(p => createProductCardHTML(p)).join('');
  attachProductCardEvents();
}

function renderAllProducts() {
  const container = document.getElementById('all-products');
  container.innerHTML = state.products.map(p => createProductCardHTML(p)).join('');
  attachProductCardEvents();
}

function createProductCardHTML(p) {
  const isWishlisted = state.wishlist.some(item => item.id === p.id);
  return `
    <div class="product-card">
      <div>
        <div class="product-img-placeholder">📦</div>
        <h3 class="product-title">${escapeHTML(p.name)}</h3>
        <p class="product-price">₱${Number(p.price).toFixed(2)}</p>
        <p class="product-category">${escapeHTML(p.category)} | Stock: ${p.stock}</p>
      </div>
      <div class="card-actions">
        <button class="btn btn-primary btn-sm add-to-cart" data-id="${p.id}" ${p.stock <= 0 ? 'disabled' : ''}>${p.stock > 0 ? 'Add to Cart' : 'Out of Stock'}</button>
        <button class="btn ${isWishlisted ? 'btn-danger' : 'btn-warning'} btn-sm toggle-wishlist" data-id="${p.id}">
          ${isWishlisted ? '♥' : '♡'}
        </button>
      </div>
    </div>
  `;
}

function attachProductCardEvents() {
  document.querySelectorAll('.add-to-cart').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = parseInt(e.target.getAttribute('data-id'));
      addToCart(id);
    });
  });

  document.querySelectorAll('.toggle-wishlist').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = parseInt(e.currentTarget.getAttribute('data-id'));
      toggleWishlist(id);
    });
  });
}

function addToCart(productId) {
  const product = state.products.find(p => p.id === productId);
  if (!product || product.stock <= 0) return;

  const cartItem = state.cart.find(item => item.id === productId);
  if (cartItem) {
    if (cartItem.quantity < product.stock) {
      cartItem.quantity++;
    } else {
      alert('Cannot add more than available stock.');
      return;
    }
  } else {
    state.cart.push({ ...product, quantity: 1 });
  }

  persistData();
  updateBadges();
  alert(`${product.name} added to cart!`);
}

function toggleWishlist(productId) {
  const index = state.wishlist.findIndex(item => item.id === productId);
  if (index > -1) {
    state.wishlist.splice(index, 1);
  } else {
    const product = state.products.find(p => p.id === productId);
    if (product) state.wishlist.push(product);
  }
  persistData();
  updateBadges();
  
  if (!document.getElementById('page-home').classList.contains('hidden')) renderFeaturedProducts();
  if (!document.getElementById('page-products').classList.contains('hidden')) renderAllProducts();
  if (!document.getElementById('page-wishlist').classList.contains('hidden')) renderWishlistGrid();
}

function renderWishlistGrid() {
  const container = document.getElementById('wishlist-grid');
  if (state.wishlist.length === 0) {
    container.innerHTML = '<p>Your wishlist is empty.</p>';
    return;
  }
  container.innerHTML = state.wishlist.map(p => createProductCardHTML(p)).join('');
  attachProductCardEvents();
}

function renderCategories() {
  const container = document.getElementById('categories-list');
  const categories = [...new Set(state.products.map(p => p.category))];
  container.innerHTML = categories.map(cat => `
    <div class="category-card" style="cursor: pointer;" onclick="filterByCategory('${cat}')">
      📁 ${escapeHTML(cat)}
    </div>
  `).join('');
}

window.filterByCategory = function(category) {
  switchCustomerPage('products');
  document.querySelectorAll('#customer-nav .nav-item').forEach(n => n.classList.remove('active'));
  document.querySelector('#customer-nav .nav-item[data-page="products"]').classList.add('active');
  
  const container = document.getElementById('all-products');
  const filtered = state.products.filter(p => p.category === category);
  container.innerHTML = filtered.map(p => createProductCardHTML(p)).join('');
  attachProductCardEvents();
}

function renderCartTable() {
  const tbody = document.getElementById('cart-table-body');
  const totalPriceEl = document.getElementById('cart-total-price');

  if (state.cart.length === 0) {
    tbody.innerHTML = '<tr><td colspan="5" style="text-align: center;">Your cart is empty.</td></tr>';
    totalPriceEl.textContent = '0.00';
    return;
  }

  let total = 0;
  tbody.innerHTML = state.cart.map((item, index) => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;
    return `
      <tr>
        <td>${escapeHTML(item.name)}</td>
        <td>₱${Number(item.price).toFixed(2)}</td>
        <td>
          <button class="btn btn-sm btn-warning" onclick="changeQty(${index}, -1)">-</button>
          <span style="margin: 0 8px;">${item.quantity}</span>
          <button class="btn btn-sm btn-warning" onclick="changeQty(${index}, 1)">+</button>
        </td>
        <td>₱${itemTotal.toFixed(2)}</td>
        <td><button class="btn btn-danger btn-sm" onclick="removeFromCart(${index})">Remove</button></td>
      </tr>
    `;
  }).join('');

  totalPriceEl.textContent = total.toFixed(2);
}

window.changeQty = function(index, delta) {
  const item = state.cart[index];
  const product = state.products.find(p => p.id === item.id);
  const newQty = item.quantity + delta;

  if (newQty > 0 && newQty <= product.stock) {
    item.quantity = newQty;
  } else if (newQty > product.stock) {
    alert('Exceeds available stock.');
  } else {
    state.cart.splice(index, 1);
  }

  persistData();
  updateBadges();
  renderCartTable();
}

window.removeFromCart = function(index) {
  state.cart.splice(index, 1);
  persistData();
  updateBadges();
  renderCartTable();
}

function setupCustomerActions() {
  const checkoutBtn = document.getElementById('btn-checkout');
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      if (state.cart.length === 0) {
        alert('Your cart is empty!');
        return;
      }

      state.cart.forEach(cartItem => {
        const prod = state.products.find(p => p.id === cartItem.id);
        if (prod) prod.stock -= cartItem.quantity;
      });

      const orderTotal = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      const newOrder = {
        id: 'ORD-' + Math.floor(100000 + Math.random() * 900000),
        items: [...state.cart],
        total: orderTotal,
        status: 'Pending'
      };

      state.orders.push(newOrder);
      state.cart = [];
      persistData();
      updateBadges();
      alert('Order successfully checked out!');
      switchCustomerPage('orders');
    });
  }
}

function renderCustomerOrders() {
  const tbody = document.getElementById('customer-orders-body');
  if (state.orders.length === 0) {
    tbody.innerHTML = '<tr><td colspan="3" style="text-align: center;">No order history found.</td></tr>';
    return;
  }

  tbody.innerHTML = state.orders.map(o => `
    <tr>
      <td>${o.id}</td>
      <td><span style="color: #d97706; font-weight: bold;">${o.status}</span></td>
      <td>₱${Number(o.total).toFixed(2)}</td>
    </tr>
  `).join('');
}

// ==========================
// SELLER APP LOGIC
// ==========================
function initSellerApp() {
  document.getElementById('seller-nav').classList.remove('hidden');
  document.getElementById('customer-nav').classList.add('hidden');
  switchSellerPage('seller-dashboard');
}

function renderSellerDashboard() {
  const totalProducts = state.products.length;
  const totalOrders = state.orders.length;
  const totalSales = state.orders.reduce((sum, o) => sum + o.total, 0);

  document.getElementById('dash-total-products').textContent = totalProducts;
  document.getElementById('dash-total-orders').textContent = totalOrders;
  document.getElementById('dash-total-sales').textContent = `₱${totalSales.toFixed(2)}`;
}

function renderSellerProductsTable() {
  const tbody = document.getElementById('seller-products-table');
  if (state.products.length === 0) {
    tbody.innerHTML = '<tr><td colspan="5" style="text-align: center;">No products available.</td></tr>';
    return;
  }

  tbody.innerHTML = state.products.map(p => `
    <tr>
      <td>${escapeHTML(p.name)}</td>
      <td>₱${Number(p.price).toFixed(2)}</td>
      <td>${escapeHTML(p.category)}</td>
      <td>${p.stock}</td>
      <td>
        <button class="btn btn-warning btn-sm" onclick="editProduct(${p.id})">Edit</button>
        <button class="btn btn-danger btn-sm" onclick="deleteProduct(${p.id})">Delete</button>
      </td>
    </tr>
  `).join('');
}

function setupSellerActions() {
  const productForm = document.getElementById('product-form');
  if (productForm) {
    productForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const id = document.getElementById('prod-id').value;
      const name = document.getElementById('prod-name').value.trim();
      const price = parseFloat(document.getElementById('prod-price').value);
      const category = document.getElementById('prod-category').value;
      const stock = parseInt(document.getElementById('prod-stock').value);

      if (id) {
        const prod = state.products.find(p => p.id === parseInt(id));
        if (prod) {
          prod.name = name;
          prod.price = price;
          prod.category = category;
          prod.stock = stock;
        }
      } else {
        const newProd = {
          id: state.products.length > 0 ? Math.max(...state.products.map(p => p.id)) + 1 : 1,
          name,
          price,
          category,
          stock
        };
        state.products.push(newProd);
      }

      persistData();
      alert('Product saved successfully!');
      switchSellerPage('manage-products');
      
      document.querySelectorAll('#seller-nav .nav-item').forEach(n => n.classList.remove('active'));
      document.querySelector('#seller-nav .nav-item[data-page="manage-products"]').classList.add('active');
    });
  }
}

window.editProduct = function(id) {
  const prod = state.products.find(p => p.id === id);
  if (!prod) return;

  document.getElementById('prod-id').value = prod.id;
  document.getElementById('prod-name').value = prod.name;
  document.getElementById('prod-price').value = prod.price;
  document.getElementById('prod-category').value = prod.category;
  document.getElementById('prod-stock').value = prod.stock;
  document.getElementById('form-title').textContent = 'Edit Product';

  switchSellerPage('add-product');
  document.querySelectorAll('#seller-nav .nav-item').forEach(n => n.classList.remove('active'));
  document.querySelector('#seller-nav .nav-item[data-page="add-product"]').classList.add('active');
}

window.deleteProduct = function(id) {
  if (confirm('Are you sure you want to delete this product?')) {
    state.products = state.products.filter(p => p.id !== id);
    persistData();
    renderSellerProductsTable();
  }
}

function renderSellerOrders() {
  const tbody = document.getElementById('seller-orders-body');
  if (state.orders.length === 0) {
    tbody.innerHTML = '<tr><td colspan="4" style="text-align: center;">No customer orders yet.</td></tr>';
    return;
  }

  tbody.innerHTML = state.orders.map(o => {
    const productNames = o.items.map(i => `${i.name} (x${i.quantity})`).join(', ');
    return `
      <tr>
        <td>${o.id}</td>
        <td>${escapeHTML(productNames)}</td>
        <td>₱${Number(o.total).toFixed(2)}</td>
        <td>
          <select onchange="updateOrderStatus('${o.id}', this.value)">
            <option value="Pending" ${o.status === 'Pending' ? 'selected' : ''}>Pending</option>
            <option value="Processing" ${o.status === 'Processing' ? 'selected' : ''}>Processing</option>
            <option value="Completed" ${o.status === 'Completed' ? 'selected' : ''}>Completed</option>
            <option value="Cancelled" ${o.status === 'Cancelled' ? 'selected' : ''}>Cancelled</option>
          </select>
        </td>
      </tr>
    `;
  }).join('');
}

window.updateOrderStatus = function(orderId, newStatus) {
  const order = state.orders.find(o => o.id === orderId);
  if (order) {
    order.status = newStatus;
    persistData();
    alert(`Order ${orderId} status updated to ${newStatus}`);
  }
}

function escapeHTML(str) {
  return str.replace(/[&<>'"]/g, 
    tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
  );
}