// ===============================
// SEARCH PRODUCTS
// ===============================

function searchProducts() {
    let search = document.getElementById("searchInput").value.toLowerCase();
    let products = document.querySelectorAll(".product-card");

    products.forEach(function(product) {
        let name = product.querySelector("h3").innerText.toLowerCase();

        if (name.includes(search)) {
            product.style.display = "block";
        } else {
            product.style.display = "none";
        }
    });
}


// ===============================
// SELL PRODUCT
// ===============================

let sellForm = document.getElementById("sellForm");

if (sellForm) {

    sellForm.addEventListener("submit", function(event) {

        event.preventDefault();

        let productName = document.getElementById("productName").value;
        let category = document.getElementById("category").value;
        let price = document.getElementById("price").value;
        let condition = document.getElementById("condition").value;
        let location = document.getElementById("location").value;
        let description = document.getElementById("description").value;
        let imageFile = document.getElementById("image").files[0];

        if (!imageFile) {
            alert("Please select a product image.");
            return;
        }

        let reader = new FileReader();

        reader.onload = function() {

            let product = {
                name: productName,
                category: category,
                price: price,
                condition: condition,
                location: location,
                description: description,
                image: reader.result
            };

            let products = JSON.parse(localStorage.getItem("techBazaarProducts")) || [];

            products.push(product);

            localStorage.setItem(
                "techBazaarProducts",
                JSON.stringify(products)
            );

            alert("Product posted successfully!");

            window.location.href = "index.html";
        };

        reader.readAsDataURL(imageFile);
    });
}


// ===============================
// DISPLAY SELLER PRODUCTS
// ===============================

function loadProducts() {

    let productGrid = document.getElementById("productGrid");

    if (!productGrid) {
        return;
    }

    let products = JSON.parse(
        localStorage.getItem("techBazaarProducts")
    ) || [];

    products.forEach(function(product) {

        let card = document.createElement("div");

        card.className = "product-card";

        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}">

            <div class="product-info">

                <h3>${product.name}</h3>

                <h2>₹${product.price}</h2>

                <p>${product.condition}</p>

                <p>📍 ${product.location}</p>

                <button onclick="viewProduct('${product.name}')">
                    View Details
                </button>

            </div>
        `;

        productGrid.appendChild(card);
    });
}


// ===============================
// VIEW PRODUCT
// ===============================

function viewProduct(name) {

    let products = JSON.parse(
        localStorage.getItem("techBazaarProducts")
    ) || [];

    let product = products.find(function(item) {
        return item.name === name;
    });

    if (product) {
        localStorage.setItem(
            "selectedProduct",
            JSON.stringify(product)
        );

        window.location.href = "product.html";
    }
}


// Load products when page opens

loadProducts();
function loadProductDetails() {

    let detailName = document.getElementById("detailName");

    if (!detailName) {
        return;
    }

    let product = JSON.parse(
        localStorage.getItem("selectedProduct")
    );

    if (!product) {
        return;
    }

    document.getElementById("detailImage").src = product.image;
    document.getElementById("detailName").innerText = product.name;
    document.getElementById("detailPrice").innerText = "₹" + product.price;
    document.getElementById("detailCategory").innerText = product.category;
    document.getElementById("detailCondition").innerText = product.condition;
    document.getElementById("detailLocation").innerText = product.location;
    document.getElementById("detailDescription").innerText = product.description;
}

loadProductDetails();
function filterCategory(category) {

    let products = document.querySelectorAll(".product-card");

    products.forEach(function(product) {

        let productName = product.querySelector("h3").innerText.toLowerCase();
        let productText = product.innerText.toLowerCase();

        if (category === "Mobile Phones") {
            product.style.display =
                productText.includes("mobile") ||
                productName.includes("iphone") ||
                productName.includes("samsung") ||
                productName.includes("phone")
                ? "block" : "none";
        }

        else if (category === "Chargers") {
            product.style.display =
                productText.includes("charger")
                ? "block" : "none";
        }

        else if (category === "Accessories") {
            product.style.display =
                productText.includes("earphone") ||
                productText.includes("power bank") ||
                productText.includes("accessor")
                ? "block" : "none";
        }
    });
}
function contactSeller() {
    alert("📞 Seller Contact Number: 9876543210");
}
function openChat() {
    document.getElementById("chatBox").style.display = "block";
}

function closeChat() {
    document.getElementById("chatBox").style.display = "none";
}

function sendMessage() {

    let input = document.getElementById("messageInput");
    let message = input.value.trim();

    if (message === "") {
        return;
    }

    let chatMessages = document.getElementById("chatMessages");

    let newMessage = document.createElement("div");

    newMessage.className = "user-message";
    newMessage.innerText = message;

    chatMessages.appendChild(newMessage);

    input.value = "";

    chatMessages.scrollTop = chatMessages.scrollHeight;
}