// JS for Homepage (slider, dynamic categories)
document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('#hero-slider .slide');
    if (slides.length > 0) {
        let currentSlide = 0;
        setInterval(() => {
            slides[currentSlide].style.display = 'none';
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].style.display = 'block';
        }, 5000);
    }
    const categories = [
        { name: 'Electronics', icon: '💻' },
        { name: 'Apparel', icon: '👕' },
        { name: 'Groceries', icon: '🍎' },
        { name: 'Home', icon: '🏠' }
    ];
    const categoryContainer = document.getElementById('category-container');
    if (categoryContainer) {
        categoryContainer.innerHTML = categories.map(cat => `
            <div class="col-6 col-md-3 mb-3">
                <a href="#" class="text-decoration-none text-dark">
                    <div class="category-icon">${cat.icon}</div>
                    <h5 class="mt-2">${cat.name}</h5>
                </a>
            </div>
        `).join('');
    }
    // Fetch and display featured products
    fetch('http://localhost:5000/api/products')
        .then(res => res.json())
        .then(products => {
            const productContainer = document.getElementById('product-container');
            if (productContainer) {
                productContainer.innerHTML = products.slice(0, 4).map(p => `
                    <div class="col-md-4 col-lg-3 mb-4">
                        <div class="card h-100">
                            <img src="${p.image}" class="card-img-top" alt="${p.name}">
                            <div class="card-body">
                                <h5 class="card-title">${p.name}</h5>
                                <p class="card-text">$${p.price}</p>
                                <a href="product-detail.html?id=${p._id}" class="btn btn-primary">View Details</a>
                            </div>
                        </div>
                    </div>
                `).join('');
            }
        });
});