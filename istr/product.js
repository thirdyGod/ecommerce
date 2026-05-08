import { getProductById, getAllProducts, addToCart, getCartCount, formatPrice } from './products.js';

let selectedQty = 1;
let selectedColor = 'Cyan';
let selectedSize = 'S';

const params = new URLSearchParams(window.location.search);
const productId = params.get('id');
const product = getProductById(productId) || getAllProducts()[0];

function updateQtyDisplay() {
  const qtyEl = document.getElementById('qty');
  if (qtyEl) qtyEl.textContent = selectedQty;
}

function updateCartBadge() {
  const count = getCartCount();
  document.querySelectorAll('.cart-count').forEach(el => {
    el.textContent = count;
  });
}

function updateProductDetails() {
  if (!product) return;

  const titleEl = document.querySelector('.product-info__title');
  const priceEl = document.querySelector('.product-info__price');
  const descEl = document.querySelector('.product-info__desc p');
  const skuEl = document.querySelector('.meta-row .meta-val');
  const brandEl = document.querySelector('.product-info__brand');
  const breadcrumbCurrent = document.querySelector('.breadcrumb__current');
  const mainImg = document.getElementById('mainImg');
  const colorLabel = document.getElementById('colorLabel');

  if (titleEl) titleEl.textContent = product.name;
  if (priceEl) priceEl.textContent = formatPrice(product.price);
  if (descEl) descEl.textContent = product.description;
  if (skuEl) skuEl.textContent = product.sku;
  if (brandEl) brandEl.textContent = product.brand;
  if (breadcrumbCurrent) breadcrumbCurrent.textContent = product.name;
  if (mainImg) mainImg.style.background = product.image;
  if (colorLabel) colorLabel.textContent = selectedColor.toUpperCase();

  document.querySelectorAll('.product-info__colors button').forEach(button => {
    button.classList.toggle('active', button.title.toLowerCase() === selectedColor.toLowerCase());
  });

  document.querySelectorAll('.product-info__sizes .size-btn').forEach(button => {
    button.classList.toggle('active', button.textContent === selectedSize);
  });
}

window.setColor = (color, button) => {
  selectedColor = color;
  document.querySelectorAll('.gallery__thumb, .product-info__colors button').forEach(el => el.classList.remove('active'));
  if (button) button.classList.add('active');
  const colorLabel = document.getElementById('colorLabel');
  if (colorLabel) colorLabel.textContent = color.toUpperCase();
};

window.changeQty = delta => {
  selectedQty = Math.max(1, selectedQty + delta);
  updateQtyDisplay();
};

window.addToCart = () => {
  if (!product) return;
  addToCart(product.id, selectedQty, { color: selectedColor, size: selectedSize });
  updateCartBadge();
  const message = `${selectedQty} × ${product.name} added to bag.`;
  console.info(message);
};

function setupSizeButtons() {
  document.querySelectorAll('.product-info__sizes .size-btn').forEach(button => {
    button.addEventListener('click', () => {
      document.querySelectorAll('.product-info__sizes .size-btn').forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      selectedSize = button.textContent;
    });
  });
}

function initializePage() {
  updateQtyDisplay();
  updateProductDetails();
  updateCartBadge();
  setupSizeButtons();
}

initializePage();
