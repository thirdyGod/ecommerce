/* =========================================
   VAULT STORE — cart.js
   ========================================= */

const prices = [148, 210, 62];
const qtys   = [1, 1, 1];

function getSubtotal() {
  return prices.reduce((sum, p, i) => sum + p * qtys[i], 0);
}

function updateTotals() {
  const sub   = getSubtotal();
  const subEl = document.getElementById('subtotal');
  const totEl = document.getElementById('total');
  if (subEl) subEl.textContent = `$${sub}`;
  if (totEl) totEl.textContent = `$${sub}`;
  // Update nav cart count
  const count = document.querySelector('.cart-count');
  if (count) count.textContent = qtys.reduce((s, q) => s + q, 0);
}

function changeQty(btn, delta) {
  const item  = btn.closest('.cart-item');
  const items = [...document.querySelectorAll('.cart-item')];
  const idx   = items.indexOf(item);
  if (idx === -1) return;

  qtys[idx] = Math.max(1, qtys[idx] + delta);
  const valEl = btn.parentElement.querySelector('.qty-val');
  if (valEl) valEl.textContent = qtys[idx];
  updateTotals();
}

function removeItem(btn) {
  const item  = btn.closest('.cart-item');
  const items = [...document.querySelectorAll('.cart-item')];
  const idx   = items.indexOf(item);
  if (idx === -1) return;

  // Animate out
  item.style.opacity   = '0';
  item.style.transform = 'translateX(-20px)';
  item.style.transition = 'all 0.3s ease';
  setTimeout(() => {
    item.remove();
    prices[idx] = 0;
    qtys[idx]   = 0;
    updateTotals();
    // Update subtitle
    const remaining = document.querySelectorAll('.cart-item').length;
    const sub = document.querySelector('.cart-subtitle');
    if (sub) sub.textContent = `${remaining} ITEM${remaining !== 1 ? 'S' : ''}`;
  }, 320);
}

updateTotals();