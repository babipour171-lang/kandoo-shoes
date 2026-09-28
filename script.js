const filterButtons = document.querySelectorAll('.filter-btn');
const productCards = document.querySelectorAll('.product-card');
const cartCount = document.getElementById('cartCount');
const addToCartButtons = document.querySelectorAll('.add-cart');
const toast = document.getElementById('toast');
const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');
const newsletterForm = document.querySelector('.newsletter-form');

let cartItems = 0;

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    filterButtons.forEach((btn) => btn.classList.remove('active'));
    button.classList.add('active');

    const filter = button.dataset.filter;

    productCards.forEach((card) => {
      const category = card.dataset.category;
      const matches = filter === 'all' || category === filter;
      card.style.display = matches ? 'block' : 'none';
    });
  });
});

addToCartButtons.forEach((button) => {
  button.addEventListener('click', () => {
    cartItems += 1;
    cartCount.textContent = String(cartItems);

    toast.classList.add('show');
    clearTimeout(window.toastTimer);
    window.toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 1800);
  });
});

if (menuToggle && mainNav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('is-open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  mainNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('is-open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

if (newsletterForm) {
  newsletterForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const emailInput = newsletterForm.querySelector('input');
    if (!emailInput.value.trim()) {
      emailInput.focus();
      return;
    }

    emailInput.value = '';
    toast.textContent = 'ثبت‌نام شما با موفقیت انجام شد.';
    toast.classList.add('show');
    clearTimeout(window.toastTimer);
    window.toastTimer = setTimeout(() => {
      toast.classList.remove('show');
      toast.textContent = 'محصول به سبد خرید اضافه شد.';
    }, 2000);
  });
}
