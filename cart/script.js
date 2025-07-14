console.log('hi from cart')
let cart = JSON.parse(sessionStorage.getItem('cart')) || [];
let total = 0;
window.addEventListener('DOMContentLoaded', () => {
    let currentUser = localStorage.getItem('currentUser');
    
    console.log(cart);
    if(currentUser) {
        renderCart(cart);
    } else {
        // logout User
        window.location.href= "./../login.html";
    }
})

function renderCart(cart) {

    const cartItemsDiv = document.getElementById('cart-items');
    const summaryList = document.getElementById('summary-list');
    const totalDiv = document.getElementById('total');


    cartItemsDiv.innerHTML = '';
    summaryList.innerHTML = '';
    total = 0;

    if(cart.length > 0) {
      cart.forEach((item, i) => {
      // Left section
      const itemDiv = document.createElement('div');
      itemDiv.className = 'cart-item';

      const truncatedTitle = item.title.length > 45 
      ? item.title.substring(0, 25) + '...'
      : item.title;

      itemDiv.innerHTML = `
        <h4>${item.title}</h4>
        <div>
        <span>$${item.price}</span>
        <button class="remove-btn" onclick="removeFromCart(${item.id})">Remove</button>
        </div>
        `;
      cartItemsDiv.appendChild(itemDiv);

      // Right summary
      const summaryItem = document.createElement('li');
      summaryItem.innerHTML = `<span>${i+1} .  ${truncatedTitle}</span><span>$${item.price}</span>`;
      summaryList.appendChild(summaryItem);

      total += item.price;
      });

    }
 
    totalDiv.innerHTML = `<span>Total</span><span>$${total.toFixed(2)}</span>`;
}


function removeFromCart(id) {
    console.log('remove from cart clicked', id);
    console.log(cart);
    const index = cart.findIndex(item => item.id === id);
    cart.splice(index, 1);
    sessionStorage.setItem('cart', JSON.stringify(cart));
    console.log('After removing item from cart', cart)
    renderCart(cart);
}


document.getElementById("rzp-button").onclick = function (e) {
    console.log(total);
  var options = {
    key: "rzp_test_PV1oQ0oMtgXOsq", // Enter the Key ID generated from the Dashboard
    amount: total * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    currency: "INR",
    name: "MyShop Checkout",
    description: "This is your order", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
    theme: {
      color: "#000",
    },
    image:
      "https://www.mintformations.co.uk/blog/wp-content/uploads/2020/05/shutterstock_583717939.jpg",
  };

  var rzpy1 = new Razorpay(options);
  rzpy1.open();
  // clear mycart - sessionstorage
  sessionStorage.removeItem('cart');
  e.preventDefault();
};