document.addEventListener('DOMContentLoaded', () => {

  const products = [

    {
      id: 1,
      title: 'Shoes',
      description: 'Comfortable running shoes',
      price: 300,
      image: 'https://m.media-amazon.com/images/I/61muVCIy-uL._AC_UY327_FMwebp_QL65_.jpg'
    },

    {
      id: 2,
      title: 'Laptop',
      description: 'High performance laptop',
      price: 499,
      image: 'https://m.media-amazon.com/images/G/31/img24/Laptops_Ayesha/LaptopsRevamp/HP-Laptops-CLP-PoP.png'
    },

    {
      id: 3,
      title: 'Watch',
      description: 'Stylish smartwatch',
      price: 99,
      image: 'https://m.media-amazon.com/images/I/51aDwuCqdHL._AC_UL480_FMwebp_QL65_.jpg'
    }

  ];

  const productCarousel =
    document.getElementById('product-carousel');

  const productTitle =
    document.getElementById('product-title');

  const productDescription =
    document.getElementById('product-description');

  const productPrice =
    document.getElementById('product-price');

  const addToCartButton =
    document.getElementById('add-to-cart');

  const cartItems =
    document.getElementById('cart-items');

  const cartCount =
    document.getElementById('cart-count');

  const cartTotal =
    document.getElementById('cart-total');

  const checkoutButton =
    document.getElementById('checkout');

  let selectedProduct = null;

  let cart = [];

  // Create Product Images

  products.forEach(product => {

    const img = document.createElement('img');

    img.src = product.image;

    img.alt = product.title;

    img.addEventListener('click', () => {

      selectedProduct = product;

      productTitle.textContent = product.title;

      productDescription.textContent =
        product.description;

      productPrice.textContent =
        `$${product.price}`;

      addToCartButton.disabled = false;
    });

    productCarousel.appendChild(img);
  });

  // Scroll Buttons

  document.querySelectorAll('.scroll-btn')
    .forEach(button => {

      button.addEventListener('click', () => {

        const container =
          document.getElementById(
            button.dataset.target
          );

        const amount =
          button.classList.contains('left')
            ? -200
            : 200;

        container.scrollBy({
          left: amount,
          behavior: 'smooth'
        });

      });

    });

  // Add To Cart

  addToCartButton.addEventListener('click', () => {

    if (!selectedProduct) return;

    const existingItem = cart.find(
      item => item.id === selectedProduct.id
    );

    if (existingItem) {

      existingItem.quantity++;

    } else {

      cart.push({
        ...selectedProduct,
        quantity: 1
      });

    }

    updateCart();
  });

  // Update Cart

  function updateCart() {

    cartItems.innerHTML = '';

    let total = 0;

    let count = 0;

    cart.forEach(item => {

      const li = document.createElement('li');

      li.textContent =
        `${item.title} x ${item.quantity} - $${item.price * item.quantity}`;

      cartItems.appendChild(li);

      total += item.price * item.quantity;

      count += item.quantity;
    });

    cartTotal.textContent =
      `Total: $${total.toFixed(2)}`;

    cartCount.textContent = count;

    checkoutButton.disabled = cart.length === 0;
  }

  // Checkout

  checkoutButton.addEventListener('click', () => {

    alert('Order placed successfully!');

    cart = [];

    updateCart();
  });

});