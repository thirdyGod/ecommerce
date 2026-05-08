const STORAGE_KEY = 'vault-cart';

export const products = [
  {
    id: 'tri-logo-hoodie',
    name: 'Tri-Logo Hoodie',
    price: 148,
    image: '#0d0d1a',
    category: 'TOPS',
    badge: 'NEW',
    description:
      'Heavyweight 400gsm fleece. Embroidered Vault tri-logo on chest, printed on back. Dropped shoulder. Ribbed cuffs and hem.',
    brand: 'VAULT',
    sku: 'VLT-H001-CYN',
    colors: ['Cyan', 'Magenta', 'Orange', 'White'],
    sizes: ['XS', 'S', 'M', 'L', 'XL']
  },
  {
    id: 'tri-logo-tee-magenta',
    name: 'Tri-Logo Tee — Magenta',
    price: 58,
    image: '#1a0d14',
    category: 'TOPS',
    badge: '',
    description:
      'Lightweight cotton tee with printed tri-logo at chest. Relaxed fit and soft hand feel.',
    brand: 'VAULT',
    sku: 'VLT-T002-MAG',
    colors: ['Magenta', 'Dark'],
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    id: 'five-panel-cap',
    name: '5-Panel Cap',
    price: 62,
    image: '#0f1a12',
    category: 'ACCESSORIES',
    badge: 'NEW',
    description:
      'Structured 5-panel cap with embroidered logo and adjustable closure. One size fits most.',
    brand: 'VAULT',
    sku: 'VLT-C003-ORC',
    colors: ['Forest', 'Navy'],
    sizes: ['ONE SIZE']
  },
  {
    id: 'cord-jacket-stone',
    name: 'Cord Jacket — Stone',
    price: 210,
    image: '#1a100d',
    category: 'OUTERWEAR',
    badge: 'SALE',
    description:
      'Corduroy jacket with boxy fit, snap closure, and patch pockets. Washed stone finish for lived-in style.',
    brand: 'VAULT',
    sku: 'VLT-O004-STN',
    colors: ['Stone', 'Black'],
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    id: 'wide-leg-cargo',
    name: 'Wide Leg Cargo',
    price: 188,
    image: '#0d0d1a',
    category: 'BOTTOMS',
    badge: 'NEW',
    description:
      'Relaxed cargo pants with oversize leg and multiple pockets. Durable cotton blend with contrast stitching.',
    brand: 'VAULT',
    sku: 'VLT-B005-NVY',
    colors: ['Navy', 'Dark', 'Tan'],
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    id: 'tri-logo-deck-cyan',
    name: 'Tri-Logo Deck — Cyan',
    price: 95,
    image: '#0d1a0d',
    category: 'SKATE',
    badge: '',
    description:
      'Artist-series skate deck with tri-logo graphic. 7-ply maple construction and durable urethane topcoat.',
    brand: 'VAULT',
    sku: 'VLT-S006-CYN',
    colors: ['Cyan', 'Magenta', 'Dark'],
    sizes: ['8.0', '8.25']
  },
  {
    id: 'script-logo-crewneck',
    name: 'Script Logo Crewneck',
    price: 128,
    image: '#1a0d14',
    category: 'TOPS',
    badge: 'NEW',
    description:
      'Soft loopback fleece crewneck with raised script logo. Designed for everyday wear and easy layering.',
    brand: 'VAULT',
    sku: 'VLT-T007-WHT',
    colors: ['Magenta', 'Dark'],
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    id: 'ripstop-tote',
    name: 'Ripstop Tote',
    price: 48,
    image: '#10100a',
    category: 'ACCESSORIES',
    badge: '',
    description:
      'Lightweight ripstop tote with reinforced handles and internal pocket. Perfect for daily carry.',
    brand: 'VAULT',
    sku: 'VLT-A008-TAN',
    colors: ['Tan', 'Dark'],
    sizes: ['ONE SIZE']
  }
];

export function getAllProducts() {
  return [...products];
}

export function getProductById(id) {
  return products.find(product => product.id === id);
}

export function formatPrice(value) {
  return `$${Number(value).toFixed(2).replace('.00', '')}`;
}

export function getCartData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (error) {
    console.warn('Unable to read cart from localStorage', error);
    return [];
  }
}

export function saveCartData(cart) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
}

function getCartItemKey(productId, options = {}) {
  return `${productId}:${JSON.stringify(options)}`;
}

export function getCartItems() {
  return getCartData();
}

export function getCartItemsWithProduct() {
  return getCartData()
    .map(item => ({ ...item, product: getProductById(item.productId) }))
    .filter(item => item.product);
}

export function getCartCount() {
  return getCartData().reduce((sum, item) => sum + item.quantity, 0);
}

export function getCartTotal() {
  return getCartData().reduce((total, item) => {
    const product = getProductById(item.productId);
    return product ? total + product.price * item.quantity : total;
  }, 0);
}

export function addToCart(productId, quantity = 1, options = {}) {
  const cart = getCartData();
  const key = getCartItemKey(productId, options);
  const existing = cart.find(item => getCartItemKey(item.productId, item.options) === key);

  if (existing) {
    existing.quantity = Math.max(1, existing.quantity + quantity);
  } else {
    cart.push({ productId, quantity: Math.max(1, quantity), options });
  }

  saveCartData(cart);
  return cart;
}

export function updateCartQuantity(productId, quantity, options = {}) {
  const cart = getCartData();
  const key = getCartItemKey(productId, options);
  const item = cart.find(item => getCartItemKey(item.productId, item.options) === key);
  if (!item) return cart;

  item.quantity = Math.max(1, quantity);
  if (item.quantity === 0) {
    return removeFromCart(productId, options);
  }

  saveCartData(cart);
  return cart;
}

export function removeFromCart(productId, options = {}) {
  const cart = getCartData().filter(
    item => getCartItemKey(item.productId, item.options) !== getCartItemKey(productId, options)
  );
  saveCartData(cart);
  return cart;
}

export function clearCart() {
  saveCartData([]);
}
