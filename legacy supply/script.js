// script.js

// Products data for modal (images and details)
const products = [
  {
    id: 1,
    name: "Classic Chronograph Watch",
    price: "2495 birr",
    description: "A timeless chronograph watch featuring a stainless steel case, genuine leather strap, and precision quartz movement.",
    specs: [
      { icon: "fas fa-globe-americas", label: "Origin", value: "Made in USA" },
      { icon: "fas fa-layer-group", label: "Materials", value: "Stainless steel, leather" },
      { icon: "fas fa-tint", label: "Water Resistance", value: "50 meters" },
      { icon: "fas fa-battery-full", label: "Battery Life", value: "3 years" },
      { icon: "fas fa-ruler", label: "Size", value: "42mm diameter" },
      { icon: "fas fa-weight", label: "Weight", value: "85g" },
      { icon: "fas fa-palette", label: "Colors", value: "Silver, Black, Rose Gold" },
    ],
    images: [
      "Classic Chronograph Watch.webp",
      "Classic Chronograph Watch2.webp",
      "Classic Chronograph Watch3.avif",
    ],
  },
  {
    id: 2,
    name: "Heritage Leather Boots",
    price: "1899 birr",
    description: "Premium leather boots with comfort insole technology and durable rubber sole.",
    specs: [
      { icon: "fas fa-globe-americas", label: "Origin", value: "Made in USA" },
      { icon: "fas fa-layer-group", label: "Materials", value: "Premium Leather & Rubber" },
      { icon: "fas fa-shoe-prints", label: "Features", value: "Comfort Insole Technology" },
    ],
    images: [
      "Heritage Leather Boots1.webp",
      "Heritage Leather Boots2.webp",
      "Heritage Leather Boots3.webp",
    ],
  },
  {
    id: 3,
    name: "Vintage Denim Jacket",
    price: "1299 birr",
    description: "Classic denim jacket made from 100% organic cotton, breathable and durable.",
    specs: [
      { icon: "fas fa-globe-americas", label: "Origin", value: "Made in USA" },
      { icon: "fas fa-layer-group", label: "Materials", value: "100% Organic Cotton" },
      { icon: "fas fa-wind", label: "Features", value: "Breathable & Durable" },
    ],
    images: [
      "Vintage Denim Jacket.webp",
      "Vintage Denim Jacket2.webp",
      "Vintage Denim Jacket3.jpg",
    ],
  },
];

// Elements
const modal = document.getElementById("productModal");
const mainImage = document.getElementById("mainImage");
const thumbnailsContainer = modal.querySelector(".thumbnails");
const productName = modal.querySelector(".product-details-content h2");
const productPrice = modal.querySelector(".product-details-content .price");
const productDesc = modal.querySelector(".product-details-content p");
const specsList = modal.querySelector(".specs");
const closeModalBtn = modal.querySelector(".close-modal");

let currentProduct = null;
let currentImageIndex = 0;

// Open modal with selected product
window.openModal = function(productId) {
  currentProduct = products.find(p => p.id === productId);
  if (!currentProduct) return;

  currentImageIndex = 0;

  // Set main image
  mainImage.src = currentProduct.images[currentImageIndex];
  mainImage.alt = currentProduct.name;

  // Set product details
  productName.textContent = currentProduct.name;
  productPrice.textContent = currentProduct.price;
  productDesc.textContent = currentProduct.description;

  // Render specs
  specsList.innerHTML = currentProduct.specs.map(spec => `
    <li><i class="${spec.icon}"></i> <span><strong>${spec.label}:</strong> ${spec.value}</span></li>
  `).join("");

  // Render thumbnails
  thumbnailsContainer.innerHTML = currentProduct.images.map((img, index) => `
    <div class="thumbnail ${index === 0 ? "active" : ""}" data-index="${index}">
      <img src="${img}" alt="Thumbnail ${index + 1}">
    </div>
  `).join("");

  // Add click events for thumbnails
  thumbnailsContainer.querySelectorAll(".thumbnail").forEach(thumb => {
    thumb.addEventListener("click", () => {
      changeImage(Number(thumb.dataset.index));
    });
  });

  // Show modal
  modal.style.display = "block";
};

// Close modal function
window.closeModal = function() {
  modal.style.display = "none";
};

// Change main image when clicking thumbnails or nav buttons
window.changeImage = function(index) {
  if (!currentProduct) return;

  if (index < 0) index = currentProduct.images.length - 1;
  if (index >= currentProduct.images.length) index = 0;

  currentImageIndex = index;

  mainImage.src = currentProduct.images[currentImageIndex];
  mainImage.alt = currentProduct.name;

  // Update active thumbnail
  thumbnailsContainer.querySelectorAll(".thumbnail").forEach((thumb, i) => {
    thumb.classList.toggle("active", i === index);
  });
};

// Next / Prev image
window.nextImage = function() {
  changeImage(currentImageIndex + 1);
};

window.prevImage = function() {
  changeImage(currentImageIndex - 1);
};

// Close modal when clicking outside modal-content
window.onclick = function(event) {
  if (event.target === modal) {
    closeModal();
  }
};
