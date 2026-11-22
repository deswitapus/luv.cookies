
let cart = [];

function addToCart(name, price) {
    let item = cart.find(product => product.name === name);

    if (item) {
        item.quantity++;
    } else {
        cart.push({
            name: name,
            price: price,
            quantity: 1
        });
    }

    updateCart();
    alert(name + " berhasil ditambahkan ke keranjang!");
}

function updateCart() {
    let cartItems = document.getElementById("cart-items");
    let total = 0;
    let count = 0;

    cartItems.innerHTML = "";

    cart.forEach((item, index) => {
        let subtotal = item.price * item.quantity;

        total += subtotal;
        count += item.quantity;

        cartItems.innerHTML += `
            <div class="cart-item">
                <div>
                    <strong>${item.name}</strong><br>
                    Rp${item.price.toLocaleString("id-ID")}<br>
                    Subtotal: Rp${subtotal.toLocaleString("id-ID")}
                </div>

                <div class="cart-controls">
                    <button onclick="changeQuantity(${index}, -1)">−</button>
                    <span>${item.quantity}</span>
                    <button onclick="changeQuantity(${index}, 1)">+</button>
                    <button onclick="removeItem(${index})">✕</button>
                </div>
            </div>
        `;
    });

    document.getElementById("cart-count").innerText = count;

    document.getElementById("total").innerText =
        "Rp" + total.toLocaleString("id-ID");
}

function changeQuantity(index, amount) {
    cart[index].quantity += amount;

    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }

    updateCart();
}

function removeItem(index) {
    cart.splice(index, 1);
    updateCart();
}

function toggleCart() {
    let cartBox = document.getElementById("cart");

    cartBox.style.display =
        cartBox.style.display === "flex" ? "none" : "flex";
}

function checkout() {
    if (cart.length === 0) {
        alert("Keranjang belanja masih kosong!");
        return;
    }

    let message = "Halo LUV.COOKIES! Saya ingin memesan:\n\n";
    let total = 0;

    cart.forEach(item => {
        let subtotal = item.price * item.quantity;

        message +=
            `${item.name} x ${item.quantity} = Rp${subtotal.toLocaleString("id-ID")}\n`;

        total += subtotal;
    });

    message += `\nTotal Pesanan: Rp${total.toLocaleString("id-ID")}`;
    message += "\n\nTerima kasih!";

    // Ganti dengan nomor WhatsApp toko
    let phone = "6281234567890";

    window.open(
        `https://wa.me/${phone}?text=${encodeURIComponent(message)}`,
        "_blank"
    );
}
