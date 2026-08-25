"use strict";

function calculateItemAmount(price, quantity) {
    return price * quantity;
}

function calculateDiscount(subtotal) {
    if (subtotal >= 5000) {
        return subtotal * 0.10;
    } else if (subtotal >= 3000) {
        return subtotal * 0.07;
    } else if (subtotal >= 1000) {
        return subtotal * 0.05;
    } else {
        return 0;
    }
}

function getDeliveryFee(option) {
    switch (option) {
        case "1":
            return 0;
        case "2":
            return 80;
        case "3":
            return 150;
        default:
            return 0;
    }
}

const productCount = document.getElementById("productCount");

productCount.addEventListener("input", function () {

    const count = Number(this.value);
    const container = document.getElementById("productsContainer");

    container.innerHTML = "";

    if (count <= 0 || !Number.isInteger(count)) {
        return;
    }

    for (let i = 0; i < count; i++) {

        container.innerHTML += `
            <div class="product-box">

                <h3>Product ${i + 1}</h3>

                <label for="productName-${i}">
                    Product Name:
                </label>

                <input
                    type="text"
                    id="productName-${i}"
                    placeholder="Product Name"
                >

                <label for="productPrice-${i}">
                    Price:
                </label>

                <input
                    type="number"
                    id="productPrice-${i}"
                    placeholder="Price"
                    min="0"
                    step="0.01"
                >

                <label for="productQuantity-${i}">
                    Quantity:
                </label>

                <input
                    type="number"
                    id="productQuantity-${i}"
                    placeholder="Quantity"
                    min="1"
                    step="1"
                >

            </div>
        `;
    }
});

document.getElementById("calculateBtn").addEventListener("click", function () {

    const customerName =
        document.getElementById("customerName").value.trim();

    const count =
        Number(document.getElementById("productCount").value);

    const deliveryOption =
        document.getElementById("deliveryOption").value;

    const validationMessage =
        document.getElementById("validationMessage");

    const orderSummary =
        document.getElementById("orderSummary");

    validationMessage.innerHTML = "";
    orderSummary.innerHTML = "";

    if (customerName === "") {
        validationMessage.innerHTML =
            "Please enter the customer name.";
        return;
    }

    if (count <= 0 || !Number.isInteger(count)) {
        validationMessage.innerHTML =
            "Please enter a valid number of products.";
        return;
    }

    if (deliveryOption === "") {
        validationMessage.innerHTML =
            "Please select a delivery option.";
        return;
    }

    let subtotal = 0;
    let productDetails = "";

    for (let i = 0; i < count; i++) {

        const name =
            document.getElementById(`productName-${i}`).value.trim();

        const price =
            Number(document.getElementById(`productPrice-${i}`).value);

        const quantity =
            Number(document.getElementById(`productQuantity-${i}`).value);

        if (name === "") {
            validationMessage.innerHTML =
                `Please enter Product ${i + 1} name.`;
            return;
        }

        if (isNaN(price) || price <= 0) {
            validationMessage.innerHTML =
                `Please enter a valid price for Product ${i + 1}.`;
            return;
        }

        if (
            isNaN(quantity) ||
            quantity <= 0 ||
            !Number.isInteger(quantity)
        ) {
            validationMessage.innerHTML =
                `Please enter a valid quantity for Product ${i + 1}.`;
            return;
        }

        const amount = calculateItemAmount(price, quantity);

        subtotal += amount;

        productDetails += `
            <p>
                <strong>${i + 1}. ${name}</strong><br>
                Price: ₱${price.toFixed(2)}<br>
                Quantity: ${quantity}<br>
                Amount: ₱${amount.toFixed(2)}
            </p>
        `;
    }

    const discountAmount =
        calculateDiscount(subtotal);

    let discountRate = 0;

    if (subtotal >= 5000) {
        discountRate = 10;
    } else if (subtotal >= 3000) {
        discountRate = 7;
    } else if (subtotal >= 1000) {
        discountRate = 5;
    }

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
    }

    const finalAmount =
        subtotal - discountAmount + deliveryFee;

    orderSummary.innerHTML = `
        <h3>MINI STORE CHECKOUT SYSTEM</h3>

        <p>
            <strong>Customer:</strong> ${customerName}
        </p>

        <hr>

        ${productDetails}

        <hr>

        <h3>ORDER SUMMARY</h3>

        <p>Subtotal: ₱${subtotal.toFixed(2)}</p>

        <p>Discount Rate: ${discountRate}%</p>

        <p>Discount Amount: ₱${discountAmount.toFixed(2)}</p>

        <p>Delivery Type: ${deliveryType}</p>

        <p>Delivery Fee: ₱${deliveryFee.toFixed(2)}</p>

        <h3>Final Amount: ₱${finalAmount.toFixed(2)}</h3>
    `;
});