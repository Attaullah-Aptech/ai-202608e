
const shopContainer = document.getElementById("shopProductContainer");
const searchInput = document.getElementById("searchInput");
const sortSelect = document.getElementById("sortProducts");
const priceRange = document.getElementById("priceRange");
const priceValue = document.getElementById("priceValue");
const productCount = document.getElementById("productCount");
const emptyMessage = document.getElementById("emptyMessage");

let selectedCategory = "All";
let maximumPrice = 10000;


// DISPLAY PRODUCTS

function displayShopProducts() {

    let filteredProducts = [...products];

    // Search filter
    const searchText = searchInput.value.toLowerCase().trim();

    filteredProducts = filteredProducts.filter(product =>
        product.name.toLowerCase().includes(searchText) ||
        product.category.toLowerCase().includes(searchText)
    );

    // Category filter
    if (selectedCategory !== "All") {
        filteredProducts = filteredProducts.filter(product =>
            product.category === selectedCategory
        );
    }

    // Price filter
    filteredProducts = filteredProducts.filter(product =>
        product.price <= maximumPrice
    );

    // Sorting
    const sortValue = sortSelect.value;

    if (sortValue === "low") {
        filteredProducts.sort((a, b) => a.price - b.price);
    }

    if (sortValue === "high") {
        filteredProducts.sort((a, b) => b.price - a.price);
    }

    if (sortValue === "name") {
        filteredProducts.sort((a, b) =>
            a.name.localeCompare(b.name)
        );
    }

    // Product count
    productCount.textContent =
        `Showing ${filteredProducts.length} products`;

    // Empty state
    emptyMessage.hidden = filteredProducts.length !== 0;

    shopContainer.innerHTML = filteredProducts.map(product => `

        <article class="product-card">

            <div class="product-image">

                <img src="${product.image}" alt="${product.name}">

                <span class="product-tag">${product.tag}</span>

            </div>

            <div class="product-info">

                <span class="product-category">
                    ${product.category}
                </span>

                <h3>${product.name}</h3>

                <div class="product-bottom">

                    <span class="product-price">
                        Rs. ${product.price.toLocaleString("en-PK")}
                    </span>

                    <button class="add-cart" data-id="${product.id}">
                        + Add
                    </button>

                </div>

            </div>

        </article>

    `).join("");

}


// SEARCH
searchInput.addEventListener("input", displayShopProducts);


// CATEGORY FILTER
document.querySelectorAll('input[name="category"]').forEach(input => {

    input.addEventListener("change", function() {

        selectedCategory = this.value;

        displayShopProducts();

    });

});


// SORT PRODUCTS
sortSelect.addEventListener("change", displayShopProducts);


// PRICE RANGE
priceRange.addEventListener("input", function() {

    maximumPrice = Number(this.value);

    priceValue.textContent =
        maximumPrice.toLocaleString("en-PK");

    displayShopProducts();

});


// RESET FILTERS
document.getElementById("resetFilters").addEventListener("click", function() {

    searchInput.value = "";

    sortSelect.value = "default";

    priceRange.value = 10000;

    priceValue.textContent = "10,000";

    selectedCategory = "All";

    document.querySelector(
        'input[name="category"][value="All"]'
    ).checked = true;

    maximumPrice = 10000;

    displayShopProducts();

});


// INITIAL DISPLAY
displayShopProducts();
