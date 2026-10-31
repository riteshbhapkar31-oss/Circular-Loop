
const products = [
  {
    name: "Engineering Mathematics",
    category: "Books",
    price: 180,
    condition: "Good",
    college: "VTU Campus",
    icon: "📚"
  },
  {
    name: "Scientific Calculator",
    category: "Calculators",
    price: 450,
    condition: "Like New",
    college: "Engineering College",
    icon: "🧮"
  },
  {
    name: "Wireless Headphones",
    category: "Electronics",
    price: 650,
    condition: "Good",
    college: "VTU Campus",
    icon: "🎧"
  },
  {
    name: "Single-Speed Bicycle",
    category: "Cycles",
    price: 2200,
    condition: "Used",
    college: "Engineering College",
    icon: "🚲"
  },
  {
    name: "Study Table",
    category: "Furniture",
    price: 800,
    condition: "Good",
    college: "VTU Campus",
    icon: "🪑"
  },
  {
    name: "Hostel Desk Lamp",
    category: "Hostel Essentials",
    price: 250,
    condition: "Like New",
    college: "Engineering College",
    icon: "💡"
  }
];

const productGrid = document.querySelector("#product-grid");
const searchInput = document.querySelector("#search-input");
const categoryFilters = document.querySelector("#category-filters");
const resultCount = document.querySelector("#result-count");
const emptyState = document.querySelector("#empty-state");

let selectedCategory = "All";

function renderProducts() {
  const searchTerm = searchInput.value.trim().toLowerCase();

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm) ||
      product.category.toLowerCase().includes(searchTerm) ||
      product.college.toLowerCase().includes(searchTerm);

    const matchesCategory =
      selectedCategory === "All" ||
      product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  resultCount.textContent =
    `${filteredProducts.length} item${filteredProducts.length === 1 ? "" : "s"}`;

  emptyState.hidden = filteredProducts.length > 0;

  productGrid.innerHTML = filteredProducts.map((product) => `
    <article class="product-card">
      <div class="product-image" aria-hidden="true">
        ${product.icon}
      </div>
      <div class="product-info">
        <span class="product-category">${product.category}</span>
        <h3>${product.name}</h3>
        <p class="product-meta">${product.college}</p>
        <div class="product-bottom">
          <span class="price">₹${product.price.toLocaleString("en-IN")}</span>
          <span class="condition">${product.condition}</span>
        </div>
      </div>
    </article>
  `).join("");
}

searchInput.addEventListener("input", renderProducts);

categoryFilters.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-category]");

  if (!button) return;

  selectedCategory = button.dataset.category;

  categoryFilters.querySelectorAll(".filter").forEach((filter) => {
    filter.classList.toggle("active", filter === button);
  });

  renderProducts();
});

renderProducts();
