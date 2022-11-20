let carts = document.querySelectorAll('.add-cart');

let products = [
    {
        name: 'Converse Chuck 70',
        tag: 'conversechuck70',
        color: 'Black colour',
        price: 64,
        inCart: 0
    },
    {
        name: 'Vans Classic Slip On',
        tag: 'vansclassicslipon',
        color: 'Checkerboard style',
        price: 40,
        inCart: 0
    },
    {
        name: 'Vans Fuzzy Lace Style',
        tag: 'vansfuzzylacestyle',
        color: 'Purple colour',
        price: 50,
        inCart: 0
    },
    {
        name: 'Vans Old Skool',
        tag: 'vansoldskool',
        color: 'Black colour',
        price: 89,
        inCart: 0
    },
    {
        name: 'Warrior Shoes Black',
        tag: 'warriorschoolshoes',
        color: 'Black colour',
        price: 29,
        inCart: 0
    },
    {
        name: 'Adidas Stan Smith',
        tag: 'stansmithadidas',
        color: 'Cloud Green colour',
        price: 150,
        inCart: 0
    },
    {
        name: 'Nike Air Max',
        tag: 'nikeairmax',
        color: 'Black and White colour',
        price: 225,
        inCart: 0
    },
    {
        name: 'Adidas Ultraboost',
        tag: 'adidasultraboost',
        color: 'Black colour',
        price: 109,
        inCart: 0
    },
    {
        name: 'Nike Air Jordan',
        tag: 'nikeairjordan',
        color: 'Black and White colour',
        price: 150,
        inCart: 0
    },
    {
        name: 'Nike Dunk Low',
        tag: 'nikedunklow',
        color: 'Black and White colour',
        price: 99,
        inCart: 0
    },
    {
        name: 'Adidas Ultra 4DFWD',
        tag: 'adidasultra4dfwd',
        color: 'Black colour',
        price: 199,
        inCart: 0
    },
    {
        name: 'Nike Zoom Alphafly',
        tag: 'nikezoomalphafly',
        color: 'Mint Foam',
        price: 199,
        inCart: 0
    },

];

for (let i=0; i < carts.length; i++) {
    carts[i].addEventListener('click', () => {
        cartNumbers(products[i]);
        totalCost(products[i])
    })
}

function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');

    if(productNumbers) {
        document.querySelector('.cart span').textContent = productNumbers;
    }
}

function cartNumbers(product, action) {
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers);

    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if( action ) {
        localStorage.setItem("cartNumbers", productNumbers - 1);
        document.querySelector('.cart span').textContent = productNumbers - 1;
        console.log("action running");
    } else if( productNumbers ) {
        localStorage.setItem("cartNumbers", productNumbers + 1);
        document.querySelector('.cart span').textContent = productNumbers + 1;
    } else {
        localStorage.setItem("cartNumbers", 1);
        document.querySelector('.cart span').textContent = 1;
    }
    setItems(product);
}

function setItems(product) {
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers);
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if(cartItems != null) {
        let currentProduct = product.tag;
    
        if( cartItems[currentProduct] == undefined ) {
            cartItems = {
                ...cartItems,
                [currentProduct]: product
            }
        } 
        cartItems[currentProduct].inCart += 1;

    } else {
        product.inCart = 1;
        cartItems = { 
            [product.tag]: product
        };
    }

    localStorage.setItem('productsInCart', JSON.stringify(cartItems));
}

function totalCost( product, action ) {
    let cart = localStorage.getItem("totalCost");

    if( action) {
        cart = parseInt(cart);

        localStorage.setItem("totalCost", cart - product.price);
    } else if(cart != null) {
        
        cart = parseInt(cart);
        localStorage.setItem("totalCost", cart + product.price);
    
    } else {
        localStorage.setItem("totalCost", product.price);
    }
}

function displayCart() {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    let cart = localStorage.getItem("totalCost");
    cart = parseInt(cart);

    let productContainer = document.querySelector('.cartsection');

    if(cartItems && productContainer) {
        productContainer.innerHTML = '';
        Object.values(cartItems).map( (item, index) => {
            productContainer.innerHTML += 
            `
            <div class="productcart p-3">
                <ion-icon name="close-circle"></ion-icon>
                <img src="./assets/cart/${item.tag}.png" />
                <div class="col-md-3 col-lg-3 col-xl-3 titlecolor">
                    <p class="lead fw-normal mb-2"><span>${item.name}</span></p>
                    <p><span class="text-muted">Color: ${item.color}</span></p>
                </div>
                <div class="cartproductprice">
                    <span>Original Price: </span>
                    <div class="price sm-hide cartproductprice">$${item.price}.00</div>
                </div>
                <div class="quantity">
                    <span class="lead">Quantity: </span>
                    <ion-icon class="decrease " name="remove-circle-outline"></ion-icon>
                    <span>${item.inCart}</span>
                    <ion-icon class="increase" name="add-circle-outline"></ion-icon>   
                    <div class="total">Total Price: $${item.inCart * item.price}.00
                </div>
            </div>
            `;
        });

        productContainer.innerHTML += `
        <div class="card">
        <div class="card-body">
            <h2 class="text-center mb-5">Summary</h2>
            <div class="row">
                <div class="col-lg-6">
                    <div class="form-group">
                        <label for="shoesnote"><h5>NOTE</h5></label>
                        <textarea class="form-control" id="shoesnote" rows="5"></textarea>
                    </div>
                </div>
                <div class="col-lg-6 text-right">
                    <h5 class="basketTotalTitle">
                        Basket Total <span class="float-end">$${cart}.00</span>
                    </h5>
                    <p class="float-right">Shipping is calculated at checkout. All orders are processed in SGD (Singapore Dollar).</p>
                      <button type="button" class="btn btn-dark btn-block btn-lg w-100 mt-5">Checkout</button>
                </div>
            </div>
        </div>
      </div>`

        deleteButtons();
        manageQuantity();
    }
}


function manageQuantity() {
    let decreaseButtons = document.querySelectorAll('.decrease');
    let increaseButtons = document.querySelectorAll('.increase');
    let currentQuantity = 0;
    let currentProduct = '';
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    for(let i=0; i < increaseButtons.length; i++) {
        decreaseButtons[i].addEventListener('click', () => {
            console.log(cartItems);
            currentQuantity = decreaseButtons[i].parentElement.querySelector('span').textContent;
            console.log(currentQuantity);
            currentProduct = decreaseButtons[i].parentElement.previousElementSibling.previousElementSibling.querySelector('span').textContent.toLocaleLowerCase().replace(/ /g,'').trim();
            console.log(currentProduct);

            if( cartItems[currentProduct].inCart > 1 ) {
                cartItems[currentProduct].inCart -= 1;
                cartNumbers(cartItems[currentProduct], "decrease");
                totalCost(cartItems[currentProduct], "decrease");
                localStorage.setItem('productsInCart', JSON.stringify(cartItems));
                displayCart();
            }
        });

        increaseButtons[i].addEventListener('click', () => {
            console.log(cartItems);
            currentQuantity = increaseButtons[i].parentElement.querySelector('span').textContent;
            console.log(currentQuantity);
            currentProduct = increaseButtons[i].parentElement.previousElementSibling.previousElementSibling.querySelector('span').textContent.toLocaleLowerCase().replace(/ /g,'').trim();
            console.log(currentProduct);

            cartItems[currentProduct].inCart += 1;
            cartNumbers(cartItems[currentProduct]);
            totalCost(cartItems[currentProduct]);
            localStorage.setItem('productsInCart', JSON.stringify(cartItems));
            displayCart();
        });
    }
}

function deleteButtons() {
    let deleteButtons = document.querySelectorAll('.productcart ion-icon');
    let productNumbers = localStorage.getItem('cartNumbers');
    let cartCost = localStorage.getItem("totalCost");
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    let productName;
    console.log(cartItems);

    for(let i=0; i < deleteButtons.length; i++) {
        deleteButtons[i].addEventListener('click', () => {
            productName = deleteButtons[i].parentElement.textContent.toLocaleLowerCase().replace(/ /g,'').trim();
            
            localStorage.setItem('cartNumbers', productNumbers - cartItems[productName].inCart);
            localStorage.setItem('totalCost', cartCost - ( cartItems[productName].price * cartItems[productName].inCart));

            delete cartItems[productName];
            localStorage.setItem('productsInCart', JSON.stringify(cartItems));

            displayCart();
            onLoadCartNumbers();
        })
    }
}

onLoadCartNumbers();
displayCart();