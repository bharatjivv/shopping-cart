console.log('hello from shop')

window.addEventListener('DOMContentLoaded', () => {
    let currentUser = localStorage.getItem('currentUser')
    console.log(currentUser);
    if(currentUser) {
        renderShopPage()
    } else {
        window.location.href = '../login.html';
    }
});

let products = JSON.parse(localStorage.getItem('products')) ?? [];

function renderShopPage() {

    let colors = ['red', 'green', 'blue', 'black', 'white'];
    let sizes = ['S', 'M', 'L', 'XL'];

    function getRandomItems(arr, min = 1, max = 3) {
        let count = Math.floor(Math.random() * (max - min + 1)) + min;
        let shuffled = [...arr].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    }
    
    if(products.length > 0) {
        // items are already inside localstorage
        console.log('matlab dukan pe pehle se hi maal utar chuka hai')
        console.log('products dikha do', products);
        displayingProducts(products);
    } else {
        console.log('fetching maarni padegi')
        fetch('https://fakestoreapi.com/products')
            .then(response => response.json())
            .then((data) => {
                console.log('dataaa', data);
                let newData = data.map((item) => {
                    item.color = getRandomItems(colors, 1, 5);
                    item.size = getRandomItems(sizes, 1, 4);
                    return item;
                })

                console.log('newDataa', newData)
                products = newData;
                localStorage.setItem('products', JSON.stringify(newData));
                displayingProducts(newData);
            })
    }

    let filters = document.getElementById('activebtn');
    let filterbtns = filters.getElementsByClassName('filter');
    console.log(filterbtns);

    for (let i = 0; i < filterbtns.length; i++) {
        filterbtns[i].addEventListener('click', function () {
        // Remove existing active class
        let current = document.getElementsByClassName('active');
            if (current.length > 0) {
                current[0].classList.remove('active');
            }

            this.classList.add('active');

            handleFilterClick(this);
        });
    }

    function handleFilterClick(button) {
        console.log('handlefilterclick triggered')
        const filterType = button.textContent.trim();

        console.log('Filter clicked:', filterType);
        if(filterType === "Mens")
            displayingMensProducts();
        if(filterType === "Womens")
            displayingWomenProducts();
        if(filterType === "Jewellery")
            displayingJewellery();
        if(filterType === "Electronics")
            displayingElectronics();
        if(filterType === "All")
            displayingProducts(products);
    }

    function displayingMensProducts() {
        const menProducts = products.filter(product =>  product.category === "men's clothing")
        console.log(menProducts)
        displayingProducts(menProducts);
    }

    function displayingWomenProducts() {
        const womenProducts = products.filter(product => product.category === "women's clothing")
        console.log(womenProducts)
        displayingProducts(womenProducts);
    }

    function displayingJewellery() {
        const jewellery = products.filter(product => product.category === "jewelery")
        console.log(jewellery)
        displayingProducts(jewellery);
    }

    function displayingElectronics() {
        const electronics = products.filter(product => product.category === "electronics")
        console.log(electronics)
        displayingProducts(electronics);
    }

    // this will handle search operation functionality
    document.getElementById('searchbar').addEventListener('input', ()=> {
        let inputval = document.getElementById('searchbar').value;
        inputval = inputval.toLowerCase().trim();
        console.log(inputval);
        handleSearch(inputval, products);
        // console.log('event triggered inside search')
        
        if(inputval === "") {
            let activebtn = document.getElementById('activebtn');
            let activefilterbtn = activebtn.getElementsByClassName('active')[0];
            // console.log(activefilterbtn);
            let filterText = activefilterbtn.textContent.trim().toLowerCase();
            console.log(filterText);
            switch (filterText) {
                case 'mens':
                    displayingMensProducts();
                    break;
                case 'womens':
                    displayingWomenProducts();
                    break;
                case 'jewellery':
                    displayingJewellery();
                    break;
                case 'electronics':
                    displayingElectronics();
                    break;
                default: // "All"
                    displayingProducts(products);
    }
        }



    })

    const colorCheckBoxes = document.querySelectorAll(['input[name="color"]'])

    colorCheckBoxes.forEach(checkbox => {
        checkbox.addEventListener('change', handleColorFilter);
    });

    function handleColorFilter() {
        const selectedColors = Array.from(document.querySelectorAll('input[name="color"]:checked'))
                              .map(cb => cb.id.toLowerCase());

        console.log(selectedColors);
        // selectedcolors naam ki array me wo colors hai jo humne check maar rakhe hai
        // hume bs ye dekhna hai ki ek bhi color array ka agr product me ho to filter maar do
        const filteredProducts = products.filter(product => {

            const productColors = product.color.map(c => c.toLowerCase())
            for(i=0; i<selectedColors.length; i++) {
                if(productColors.includes(selectedColors[i]))
                    return true;
            }
            return false;
        })
        displayingProducts(filteredProducts);

        if(selectedColors.length === 0) {
            displayingProducts(products);
        }

    }
    
    const sizeCheckBoxes = document.querySelectorAll(['input[name="size"]'])
    sizeCheckBoxes.forEach(checkbox => {
        checkbox.addEventListener('change', handleSizes);
    });
    
    function handleSizes() {
        const selectedSizes = Array.from(document.querySelectorAll('input[name="size"]:checked'))
                                .map(checked => checked.id.toLowerCase());
        console.log(selectedSizes);

        const filteredSizes = products.filter(product => {
            const sizeChart = product.size.map(c => c.toLowerCase());

            for(i=0; i<selectedSizes.length; i++) {
                if(selectedSizes.includes(sizeChart[i])) {
                    return true;
                }
            }
            return false;
        })

        displayingProducts(filteredSizes);

        if(filteredSizes.length === 0) {
            displayingProducts(products);
        }


    }
    
    

    const ratingRange = document.getElementById('range');


    document.getElementById('resetRatingBtn').addEventListener('click', () => {
        document.getElementById('range').value = 0;
        displayingProducts(products);
    });
    
    
    
    ratingRange.addEventListener('input', () => {
    const selectedRating = parseFloat(ratingRange.value);
    console.log("Selected Rating:", selectedRating);

    // Optional: Filter products here
    const filteredProducts = products.filter(product => product.rating.rate >= selectedRating);

    displayingProducts(filteredProducts);
    });


    const priceCheckboxes = document.querySelectorAll('input[name="prange"]');

    priceCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', handlePriceFilter);
    });


    function handlePriceFilter() {
        const selectedRanges = Array.from(document.querySelectorAll('input[name="prange"]:checked'))
                              .map(cb => cb.id);

        const filteredProducts = products.filter(product => {
            const price = product.price;
            for (let range of selectedRanges) {
            if (range === "0-25" && price >= 0 && price <= 25) return true;
            if (range === "25-50" && price > 25 && price <= 50) return true;
            if (range === "50-100" && price > 50 && price <= 100) return true;
            if (range === "100on" && price > 100) return true;
            }
            return false;
        });

        displayingProducts(filteredProducts);

        if(filteredProducts.length === 0){
            displayingProducts(products);
        }
    }

    
    
    
}

function displayingProducts(products) {
    
    const section = document.getElementById('displayItems')
    section.innerHTML = '';
    const items = document.createElement('div')
    items.classList.add('items');
    items.id = 'itemsContainer'
    section.appendChild(items);

    for(let i=0; i<products.length; i++) {
        const itemDiv = document.createElement('div');
        const sizes = products[i].size.join(', ');

        let colors = products[i].color;

        let colorRows = colors.map(color => `
                <div class="circle" style="background-color: ${color};"></div>
            `).join('');


        itemDiv.classList.add('item');
        itemDiv.innerHTML += `
                    <img src="${products[i].image}" alt="Item" />
                    <div class="info">
                        <div class="row">
                            <div class="price"><span>$</span>${products[i].price}</div>
                            <div class="sized">${sizes}</div>
                        </div>
                        <div class="colors">
                            Colors:
                            <div class="row">
                            ${colorRows}
                            </div>
                        </div>
                        <div class="row">Rating: ${products[i].rating.rate}
                    </div>
                    </div>
                </div>
                <button id="addBtn" data-id="${products[i].id}" onclick="addThisItemToCart(${products[i].id})"">Add to Cart</button>
        `
        items.appendChild(itemDiv);
    }

}

function handleSearch(inputval, products) {
    const filteredProducts = products.filter(product => product.title.toLowerCase().includes(inputval));
    displayingProducts(filteredProducts);

}

let cart = JSON.parse(sessionStorage.getItem('cart')) || [];
function addThisItemToCart(pid) {
    console.log(cart);
    console.log(pid, 'retrieved');
    const product = products.find(p => p.id == pid);

    if (!product) {
        console.warn(`Product with id ${pid} not found in products list`);
        return; // Don’t push invalid entry
    } else {
        cart.push({ ...product, qty: 1 });
    
        cart = cart.filter(item => item && item.id && item.title && item.price);
        sessionStorage.setItem('cart', JSON.stringify(cart));

        console.log(`${product.title} added. Cart now:`, cart);
    }

    
    
}