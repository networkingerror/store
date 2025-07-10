document.addEventListener('DOMContentLoaded', () => {
    // ... (your existing cart code)

    function updateQuantity(index, newQuantity) {
        let cart = JSON.parse(localStorage.getItem('cart'));
        if (newQuantity > 0) {
            cart[index].quantity = newQuantity;
        } else {
            cart.splice(index, 1); // Remove item if quantity is 0
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        
        // ADDED: Trigger event to update the cart badge
        window.dispatchEvent(new Event('cartUpdated'));
        
        renderCart();
    }

    function removeItem(index) {
        let cart = JSON.parse(localStorage.getItem('cart'));
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));

        // ADDED: Trigger event to update the cart badge
        window.dispatchEvent(new Event('cartUpdated'));

        renderCart();
    }
    
    // ... (rest of your cart code)
});