document.addEventListener('DOMContentLoaded', () => {
    function updateCartBadge() {
        const cartBadge = document.getElementById('cart-badge-count');
        if (!cartBadge) return;

        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        
        if (totalItems > 0) {
            cartBadge.textContent = totalItems;
            cartBadge.style.display = 'flex';
        } else {
            cartBadge.style.display = 'none';
        }
    }

    updateCartBadge();
    window.addEventListener('cartUpdated', updateCartBadge);
});