const searchInput = document.getElementById("search");
const priceValue = document.getElementById("priceValue");
const priceRange = document.getElementById("priceRange");
const categoryFilter = document.getElementById("categoryFilter");
const productsContainer = document.getElementById("products");

let allProducts = [];

async function getProducts() {
    try {
        let response = await fetch("https://fakestoreapi.com/products");
        allProducts = await response.json();
        displayProducts(allProducts);
    } catch (error) {
        console.error("Xatolik:", error);
    }
}

function displayProducts(products) {
    productsContainer.innerHTML = "";

    products.forEach(product => {
        let productDiv = document.createElement("div");
        productDiv.classList.add("product");
        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.title}" class="product-image">
            <h3>${product.title}</h3>
            <p>Price: $${product.price}</p>
            <p>Category: ${product.category}</p>
        `;
        productsContainer.appendChild(productDiv);
    });
}

priceRange.addEventListener("input", function() {
    let maxPrice = parseFloat(priceRange.value);
    priceValue.textContent = maxPrice;
    filterProducts();
});

searchInput.addEventListener("input", function() {
    filterProducts();
});

categoryFilter.addEventListener("change", function () {
    let selectedCategory = categoryFilter.value;
    let maxPrice = parseFloat(priceRange.value);

    let filteredProducts = allProducts.filter(product => 
        (selectedCategory === "all" || product.category === selectedCategory) &&
        product.price <= maxPrice
    );

    displayProducts(filteredProducts);
});

function filterProducts() {
    let maxPrice = parseFloat(priceRange.value);
    let searchText = searchInput.value.toLowerCase();
    let selectedCategory = categoryFilter.value;

    let filteredProducts = allProducts.filter(product => {
        let priceMatch = product.price <= maxPrice;
        let textMatch = product.title.toLowerCase().includes(searchText);
        let categoryMatch = selectedCategory === "all" || product.category === selectedCategory;
        return priceMatch && textMatch && categoryMatch;
    });

    displayProducts(filteredProducts);
}

getProducts();
