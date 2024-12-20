let cart = []; // Array to hold cart items
let cartCount = 0; // Cart item count

// Add event listeners for "Add to Cart" buttons
const addToCartButtons = document.querySelectorAll('.add-to-cart');
addToCartButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const productElement = e.target.closest('.product');
        const productId = productElement.getAttribute('data-product-id');
        const productName = productElement.querySelector('h3').textContent;
        const productPrice = parseFloat(productElement.querySelector('p').textContent.replace('$', ''));

        // Check if the product is already in the cart
        const existingProduct = cart.find(item => item.id === productId);
        
        if (existingProduct) {
            // If product is in cart, increase quantity
            existingProduct.quantity++;
        } else {
            // Otherwise, add new product to the cart
            cart.push({
                id: productId,
                name: productName,
                price: productPrice,
                quantity: 1
            });
        }

        // Update cart count and display cart
        cartCount++;
        updateCartDisplay();
    });
});

// Function to update cart display in the header
function updateCartDisplay() {
    // Update cart count in the header
    document.getElementById('cart-count').textContent = cartCount;

    // Update cart modal items
    const cartItemsList = document.getElementById('cart-items-list');
    const totalPriceElement = document.getElementById('total-price');
    
    // Clear previous cart items
    cartItemsList.innerHTML = '';

    let totalPrice = 0;
    cart.forEach(item => {
        const cartItemElement = document.createElement('li');
        cartItemElement.innerHTML = `
            ${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)} 
            <button class="remove-item" data-id="${item.id}">Remove</button>
            <input type="number" class="update-quantity" data-id="${item.id}" value="${item.quantity}" min="1">
        `;
        cartItemsList.appendChild(cartItemElement);
        totalPrice += item.price * item.quantity;
    });

    // Update total price
    totalPriceElement.textContent = totalPrice.toFixed(2);

    // Add event listeners to remove buttons and quantity inputs
    const removeButtons = document.querySelectorAll('.remove-item');
    removeButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = e.target.getAttribute('data-id');
            removeItemFromCart(productId);
        });
    });

    const quantityInputs = document.querySelectorAll('.update-quantity');
    quantityInputs.forEach(input => {
        input.addEventListener('change', (e) => {
            const productId = e.target.getAttribute('data-id');
            const newQuantity = parseInt(e.target.value);
            updateItemQuantity(productId, newQuantity);
        });
    });
}

// Remove an item from the cart
function removeItemFromCart(productId) {
    const itemIndex = cart.findIndex(item => item.id === productId);
    if (itemIndex !== -1) {
        const item = cart[itemIndex];
        cartCount -= item.quantity; // Adjust cart count based on quantity
        cart.splice(itemIndex, 1);
        updateCartDisplay();
    }
}

// Update item quantity in the cart
function updateItemQuantity(productId, newQuantity) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        cartCount += newQuantity - item.quantity; // Adjust cart count based on quantity change
        item.quantity = newQuantity;
        updateCartDisplay();
    }
}

// Open the cart modal
const cartIcon = document.querySelector('.cart');
cartIcon.addEventListener('click', () => {
    document.getElementById('cart-modal').style.display = 'flex';
});

// Close the cart modal
document.getElementById('close-cart').addEventListener('click', () => {
    document.getElementById('cart-modal').style.display = 'none';
});

// Checkout button (for now, just log the cart)
document.getElementById('checkout-btn').addEventListener('click', () => {
    alert('Proceeding to checkout...');
    console.log('Cart contents:', cart);
    // Further logic for checkout (payment processing) can be added here
});
