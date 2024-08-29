// Smooth scrolling for navigation
document.querySelectorAll('nav a').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');

    // Check if the link is an internal anchor link (starts with #)
    if (href.startsWith('#')) {
      e.preventDefault();
      document.querySelector(href).scrollIntoView({
        behavior: 'smooth'
      });
    } else {
      // For external links or links to different pages, allow the default behavior
      window.location.href = href;
    }
  });
});

// Example of dynamic product display enhancement
function loadProducts() {
  const products = [
    { name: 'Sell Spent Layers (Birds)', img: 'layer-birds.jpg', description: 'Maximize profits for your hens.' },
    { name: 'Sell Fresh Cassava', img: 'cassava.jpg', description: 'Skip middlemen, get the best price.' },
    { name: 'Sell Market-Ready Pigs', img: 'mature-pig.jpg', description: 'Secure top dollar with ease.' }
  ];

  const container = document.querySelector('.product-container');
  products.forEach(product => {
    const productDiv = document.createElement('div');
    productDiv.className = 'product';
    productDiv.innerHTML = `
      <img src="${product.img}" alt="${product.name}" class="responsive-image">
      <h3>${product.name}</h3>
      <p>${product.description}</p>`;
    container.appendChild(productDiv);
  });
}

document.addEventListener('DOMContentLoaded', loadProducts);

