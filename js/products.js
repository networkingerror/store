// JS for Product Listing Page (filtering, sorting)
document.addEventListener('DOMContentLoaded', function() {
    // This will be more complex, fetching data from the API
    // and re-rendering on filter/sort changes.
    const productListing = document.getElementById('product-listing');
    fetch('http://localhost:5000/api/products')
        .then(res => res.json())
        .then(products => {
            if (productListing) {
                productListing.innerHTML = products.map(p => `
                    <div class="col-md-4 mb-4">
                        <div class="card h-100">
                            <img src="${p.image}" class="card-img-top" alt="${p.name}">
                            <div class="card-body">
                                <h5 class="card-title">${p.name}</h5>
                                <p class="card-text">$${p.price}</p>
                                <a href="product-detail.html?id=${p._id}" class="btn btn-primary">View</a>
                            </div>
                        </div>
                    </div>
                `).join('');
            }
        });
});