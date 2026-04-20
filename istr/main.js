/* =========================================
   VAULT STORE — main.js (shared)
   ========================================= */

// Category strip active state
document.querySelectorAll('.cat-strip__item').forEach(item => {
  item.addEventListener('click', function(e) {
    document.querySelectorAll('.cat-strip__item').forEach(i => i.classList.remove('active'));
    this.classList.add('active');
  });
});

// Nav search — enter key
const navInput = document.querySelector('.nav__search input');
const navBtn   = document.querySelector('.nav__search button');
if (navInput && navBtn) {
  navInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      const q = navInput.value.trim();
      if (q) window.location.href = `shop.html?q=${encodeURIComponent(q)}`;
    }
  });
  navBtn.addEventListener('click', () => {
    const q = navInput.value.trim();
    if (q) window.location.href = `shop.html?q=${encodeURIComponent(q)}`;
  });
}