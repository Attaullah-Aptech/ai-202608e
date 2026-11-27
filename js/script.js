
// =========================
// DISPLAY BLOGS
// =========================

const blogContainer = document.getElementById("blogContainer");

if (blogContainer) {
    blogContainer.innerHTML = blogs.map(blog => `
        <article class="blog-card">

            <div class="blog-image">
                <img src="${blog.image}" alt="${blog.title}">
            </div>

            <div class="blog-info">

                <span class="blog-category">
                    ${blog.category}
                </span>

                <h3>${blog.title}</h3>

                <p>${blog.description}</p>

                <span class="read-more">
                    Read More →
                </span>

            </div>

        </article>
    `).join("");
}


// =========================
// DISPLAY PRODUCTS
// =========================

const productContainer = document.getElementById("productContainer");

if (productContainer) {
    productContainer.innerHTML = products.map(product => `
        <article class="product-card">

            <div class="product-image">

                <img src="${product.image}" alt="${product.name}">

                <span class="product-tag">
                    ${product.tag}
                </span>

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

                    <button
                        class="add-cart"
                        data-id="${product.id}"
                    >
                        + Add
                    </button>

                </div>

            </div>

        </article>
    `).join("");
}


// =========================
// SHOPPING CART
// =========================

let cart = JSON.parse(localStorage.getItem("blogifyCart")) || [];

function updateCartCount() {

    const cartCount = document.getElementById("cartCount");

    if (cartCount) {
        cartCount.textContent = cart.reduce(
            (total, item) => total + item.quantity,
            0
        );
    }
}

function saveCart() {
    localStorage.setItem("blogifyCart", JSON.stringify(cart));
    updateCartCount();
}

document.addEventListener("click", function(event) {

    const button = event.target.closest(".add-cart");

    if (!button) return;

    const productId = Number(button.dataset.id);

    const selectedProduct = products.find(
        product => product.id === productId
    );

    if (!selectedProduct) return;

    const existingItem = cart.find(
        item => item.id === productId
    );

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            id: selectedProduct.id,
            name: selectedProduct.name,
            price: selectedProduct.price,
            image: selectedProduct.image,
            quantity: 1
        });
    }

    saveCart();

    button.textContent = "Added ✓";

    setTimeout(() => {
        button.textContent = "+ Add";
    }, 1000);

});

updateCartCount();


// =========================
// MOBILE NAVIGATION
// =========================

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

if (menuBtn && navLinks) {

    menuBtn.addEventListener("click", function() {
        navLinks.classList.toggle("show");
    });

    navLinks.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("show");
        });
    });
}


// =========================
// NEWSLETTER
// =========================

const newsletterForm = document.getElementById("newsletterForm");

if (newsletterForm) {

    newsletterForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const email = document.getElementById("newsletterEmail").value;

        const message = document.getElementById("newsletterMessage");

        message.textContent = "Thank you! " + email + " has been submitted.";

        newsletterForm.reset();

    });

}
