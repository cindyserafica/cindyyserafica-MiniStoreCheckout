"use strict";

// Required calculation function
function calculateItemAmount(price, quantity) {
    return price * quantity;
}

// Required discount function
function calculateDiscount(subtotal) {
    let discountRate = 0;

    if (subtotal >= 5000) {
        discountRate = 0.10;
    } else if (subtotal >= 3000) {
        discountRate = 0.07;
    } else if (subtotal >= 1000) {
        discountRate = 0.05;
    } else {
        discountRate = 0;
    }

    return subtotal * discountRate;
}

// Required delivery function using switch
function getDeliveryFee(option) {
    let fee = 0;

    switch (option) {
        case "1":
            fee = 0;
            break;

        case "2":
            fee = 80;
            break;

        case "3":
            fee = 150;
            break;

        default:
            fee = 0;
    }

    return fee;
}

// Generate product input fields
document.getElementById("productCount").addEventListener("input", function () {

    const productCount = Number(this.value);
    const productsContainer = document.getElementById("productsContainer");

    productsContainer.innerHTML = "";

    if (productCount <= 0 || !Number.isInteger(productCount)) {
        return;
    }

    for (let i = 0; i < productCount; i++) {

        const productBox = document.createElement("div");
        productBox.className = "product-box";

        productBox.innerHTML = `
            <h3>Product ${i + 1}</h3>

            <label for="productName-${i}">Product Name:</label>
            <input
                type="text"
                id="productName-${i}"
                placeholder="Product Name"
            >

            <label for="productPrice-${i}">Price:</label>
            <input
                type="number"
                id="productPrice-${i}"
                placeholder="Price"
                min="0.01"
                step="0.01"
            >

            <label for="productQuantity-${i}">Quantity:</label>
            <input
                type="number"
                id="productQuantity-${i}"
                placeholder="Quantity"
                min="1"
                step="1"
            >
        `;

        productsContainer.appendChild(productBox);
    }
});

// Calculate Order button
document.getElementById("calculateBtn").addEventListener("click", function () {

    const customerName =
        document.getElementById("customerName").value.trim();

    const productCount =
        Number(document.getElementById("productCount").value);

    const validationMessage =
        document.getElementById("validationMessage");

    const orderSummary =
        document.getElementById("orderSummary");

    const deliveryOption =
        document.getElementById("deliveryOption").value;

    validationMessage.innerHTML = "";
    orderSummary.innerHTML = "";

    // Validate customer name
    if (customerName === "") {
        validationMessage.innerHTML =
            "Please enter the customer name.";
        return;
    }

    // Validate product count
    if (
        productCount <= 0 ||
        !Number.isInteger(productCount)
    ) {
        validationMessage.innerHTML =
            "Please enter a valid number of products.";
        return;
    }

    // Validate delivery option
    if (deliveryOption === "") {
        validationMessage.innerHTML =
            "Please select a delivery option.";
        return;
    }

    let subtotal = 0;
    let productDetails = "";

    // Required for-loop
    for (let i = 0; i < productCount; i++) {

        const productName =
            document.getElementById(`productName-${i}`).value.trim();

        const productPrice =
            Number(document.getElementById(`productPrice-${i}`).value);

        const productQuantity =
            Number(document.getElementById(`productQuantity-${i}`).value);

        // Validate product inputs
        if (productName === "") {
            validationMessage.innerHTML =
                `Please enter the name for Product ${i + 1}.`;
            return;
        }

        if (
            isNaN(productPrice) ||
            productPrice <= 0
        ) {
            validationMessage.innerHTML =
                `Please enter a valid positive price for Product ${i + 1}.`;
            return;
        }

        if (
            isNaN(productQuantity) ||
            productQuantity <= 0 ||
            !Number.isInteger(productQuantity)
        ) {
            validationMessage.innerHTML =
                `Please enter a valid positive quantity for Product ${i + 1}.`;
            return;
        }

        // Calculate item amount
        const itemAmount =
            calculateItemAmount(productPrice, productQuantity);

        // Add to subtotal
        subtotal += itemAmount;

        // Build product details
        productDetails += `
            <p>
                <strong>${i + 1}. ${productName}</strong><br>
                Price: ₱${productPrice.toFixed(2)}<br>
                Quantity: ${productQuantity}<br>
                Amount: ₱${itemAmount.toFixed(2)}
            </p>
        `;
    }

    // Calculate discount
    const discountAmount =
        calculateDiscount(subtotal);

    // Determine discount rate
    let discountRate = 0;

    if (subtotal >= 5000) {
        discountRate = 10;
    } else if (subtotal >= 3000) {
        discountRate = 7;
    } else if (subtotal >= 1000) {
        discountRate = 5;
    } else {
        discountRate = 0;
    }

    // Calculate delivery
    const deliveryFee =
        getDeliveryFee(deliveryOption);

    let deliveryType = "";

    switch (deliveryOption) {
        case "1":
            deliveryType = "Store Pickup";
            break;

        case "2":
            deliveryType = "Standard Delivery";
            break;

        case "3":
            deliveryType = "Express Delivery";
            break;

        default:
            deliveryType = "Unknown";
    }

    // Final amount
    const finalAmount =
        subtotal - discountAmount + deliveryFee;

    // Display complete order summary
    orderSummary.innerHTML = `
        <h3>MINI STORE CHECKOUT SYSTEM</h3>

        <p>
            <strong>Customer:</strong> ${customerName}
        </p>

        <hr>

        ${productDetails}

        <hr>

        <h3>ORDER SUMMARY</h3>

        <p>
            Subtotal: ₱${subtotal.toFixed(2)}
        </p>

        <p>
            Discount Rate: ${discountRate}%
        </p>

        <p>
            Discount Amount: ₱${discountAmount.toFixed(2)}
        </p>

        <p>
            Delivery Type: ${deliveryType}
        </p>

        <p>
            Delivery Fee: ₱${deliveryFee.toFixed(2)}
        </p>

        <h2>
            Final Amount: ₱${finalAmount.toFixed(2)}
        </h2>
    `;
});