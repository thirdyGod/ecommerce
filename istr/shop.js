
/* =========================================
   VAULT STORE — shop.js
   ========================================= */

// Size filter buttons
document.querySelectorAll('.size-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
    this.classList.add('active');
  });
});

// View toggle (grid / list)
const viewBtns = document.querySelectorAll('.view-btn');
const grid     = document.getElementById('shopGrid');
viewBtns.forEach(btn => {
  btn.addEventListener('click', function() {
    viewBtns.forEach(b => b.classList.remove('active'));
    this.classList.add('active');
    if (this.title === 'List' && grid) {
      grid.style.gridTemplateColumns = '1fr';
    } else if (grid) {
      grid.style.gridTemplateColumns = 'repeat(auto-fill, minmax(210px, 1fr))';
    }
  });
});

// Pagination
document.querySelectorAll('.page-btn').forEach(btn => {
  if (!btn.classList.contains('page-next')) {
    btn.addEventListener('click', function() {
      document.querySelectorAll('.page-btn').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
    });
  }
});