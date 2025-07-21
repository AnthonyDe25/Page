// Variables para manejar el carrito
let cart = [];
const cartButton = document.getElementById('cart-button');
const CartButton1 = document.getElementById('cart-button')
const cartModal = document.getElementById('cart-modal');
const cartItems = document.getElementById('cart-items');
const totalPrice = document.getElementById('total-price');
const closeCartButton = document.getElementById('close-cart');
const addToCartButtons = document.querySelectorAll('.add-to-cart');
const checkoutButton = document.getElementById('checkout-button');
const paymentMessage = document.getElementById('payment-message');

// Función para actualizar el carrito
function updateCart() {
    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${item.name} - $${item.price} x ${item.quantity}
            <button class="remove-from-cart" data-id="${item.id}">Eliminar</button>
        `;
        cartItems.appendChild(li);
        total += item.price * item.quantity;
    });

    totalPrice.textContent = `$${total}`;

    //Actualiza el contador del carrtio
    const cartCount = document.getElementById('cart-count');
    cartButton.textContent = `(${cart.reduce((sum, item) => sum + item.quantity, 0)})`;

    // Añadir eventos a los botones de eliminar
    const removeButtons = document.querySelectorAll('.remove-from-cart');
    removeButtons.forEach(button => {
        button.addEventListener('click', event => {
            const productId = parseInt(event.target.dataset.id);
            removeFromCart(productId);
        });
    });
}

// Función para añadir productos al carrito
function addToCart(productId, name, price) {
    const existingProduct = cart.find(item => item.id === productId);

    if (existingProduct) {
        existingProduct.quantity += 1; // Incrementar cantidad
    } else {
        cart.push({ id: productId, name, price, quantity: 1 });
    }

    updateCart();
}

// Función para eliminar productos del carrito
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

// Función para procesar el pago
function processPayment() {
    // Vaciar el carrito
    cart = [];
    updateCart();
    
    // Mostrar mensaje de pago procesado
    paymentMessage.classList.remove('hidden');
    
    // Ocultar el mensaje después de 3 segundos
    setTimeout(() => {
        paymentMessage.classList.add('hidden');
    }, 3000);
}

// Event listeners para añadir productos
addToCartButtons.forEach(button => {
    button.addEventListener('click', event => {
        const product = event.target.closest('.product');
        const productId = parseInt(product.dataset.id);
        const name = product.dataset.name;
        const price = parseFloat(product.dataset.price);

        addToCart(productId, name, price);
    });
});

// Event listeners para abrir y cerrar el carrito
cartButton.addEventListener('click', () => {
    cartModal.classList.toggle('hidden');
});

function closeCart() {
    cartModal.classList.add('hidden');
}

closeCartButton.addEventListener('click', () => {
    closeCart();

});

// Event listener para el botón de pagar
checkoutButton.addEventListener('click', () => {
    processPayment();
    closeCart();
});