// JS for the Checkout Page
document.addEventListener('DOMContentLoaded', () => {
    const summaryList = document.getElementById('order-summary-list');
    const orderTotalElem = document.getElementById('order-total');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let total = 0;

    // Populate Order Summary
    if (cart.length > 0) {
        cart.forEach(item => {
            const subtotal = item.price * item.quantity;
            total += subtotal;
            const listItem = document.createElement('li');
            listItem.className = 'list-group-item d-flex justify-content-between lh-sm';
            listItem.innerHTML = `
                <div>
                    <h6 class="my-0">${item.name} (x${item.quantity})</h6>
                </div>
                <span class="text-muted">$${subtotal.toFixed(2)}</span>
            `;
            summaryList.appendChild(listItem);
        });
        orderTotalElem.textContent = `$${total.toFixed(2)}`;
    } else {
        // Redirect if cart is empty
        window.location.href = 'cart.html';
    }

    // Handle form submission
    const form = document.getElementById('checkoutForm');
    form.addEventListener('submit', async event => {
        event.preventDefault();
        if (!form.checkValidity()) {
            event.stopPropagation();
            form.classList.add('was-validated');
            return;
        }

        const token = localStorage.getItem('token');
        if (!token) {
            alert('You must be logged in to place an order.');
            window.location.href = 'login.html';
            return;
        }
        
        // Prepare order data for API
        const orderData = {
            orderItems: cart.map(item => ({
                product: item.id,
                name: item.name,
                qty: item.quantity,
                price: item.price,
                image: 'placeholder.jpg' // In a real app, you'd have the image URL
            })),
            shippingAddress: {
                address: document.getElementById('address').value,
                city: document.getElementById('city').value,
                postalCode: document.getElementById('postalCode').value,
                country: document.getElementById('country').value,
            },
            paymentMethod: document.querySelector('input[name="paymentMethod"]:checked').value,
            totalPrice: total,
        };

        try {
            const response = await fetch('http://localhost:5000/api/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(orderData)
            });

            const data = await response.json();

            if (response.ok) {
                alert('Order placed successfully!');
                localStorage.removeItem('cart'); // Clear cart
                window.location.href = 'index.html'; // Redirect to home
            } else {
                alert(`Error: ${data.message}`);
            }
        } catch (error) {
            console.error('Failed to place order:', error);
            alert('An error occurred while placing your order.');
        }
    });
});