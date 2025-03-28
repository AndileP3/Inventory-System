let products = JSON.parse(localStorage.getItem('products')) || [];

function saveToLocalStorage() {
    localStorage.setItem('products', JSON.stringify(products));
}

function retrieveFromLocalStorage () {
    let localProductsString = localStorage.getItem("products");
    let localProducts = JSON.parse(localProductsString);
    let productPrices = new Array();
    
    localProducts.forEach(function (element) {
        productPrices.push(element.price);
    });
}

function addProduct() {
    let name = document.getElementById('productName').value.trim();
    let quantity = parseInt(document.getElementById('productQuantity').value);
    let threshold = parseInt(document.getElementById('threshold').value);
    let price = parseFloat(document.getElementById('productPrice').value);
    let saleDate = document.getElementById('saleDate').value;
    
    if (!name || quantity <= 0 || threshold <= 0 || price <= 0 || !saleDate) {
        alert("Please enter valid product details.");
        return;
    }

    let product = { name, quantity, threshold, price, saleDate };
    products.push(product);
    saveToLocalStorage();
    displayProducts();
    updateDashboard();
}

function deleteProduct(index) {
    products.splice(index, 1);
    saveToLocalStorage();
    displayProducts();
    updateDashboard();
}

function displayProducts() {
    let table = document.getElementById('productTable');
    table.innerHTML = '';
    products.forEach((product, index) => {
        let row = `<tr>
            <td>${product.name}</td>
            <td>${product.quantity}</td>
            <td>${product.threshold}</td>
            <td>$${product.price.toFixed(2)}</td>
            <td>${product.saleDate}</td>
            <td><button onclick="deleteProduct(${index})">Delete</button></td>
        </tr>`;
        table.innerHTML += row;
    });
}

function updateDashboard() {
    let totalRevenue = products.reduce((sum, product) => sum + (product.price * product.quantity), 0);
    let totalRestock = products.reduce((sum, product) => sum + (product.threshold * product.price), 0);
    let totalSold = products.reduce((sum, product) => sum + product.quantity, 0);

    document.getElementById('totalRevenue').innerText = totalRevenue.toFixed(2);
    document.getElementById('totalRestock').innerText = totalRestock.toFixed(2);
    document.getElementById('totalSold').innerText = totalSold;
}

displayProducts();
updateDashboard();


