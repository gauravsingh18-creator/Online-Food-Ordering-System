//displaying cart function
function displayCart() 
{
    const cart = JSON.parse(localStorage.getItem("cart"))||[]
    const cart_list = document.getElementById("cart")
    if(cart_list)
    {
        cart_list.innerHTML = cart.map(curElm => 
        `
        <div class="box">
            <div class="img_box">
                <img src="${curElm.img}" alt="cart_img" />
            </div>
            <div class="detail">
                <div class="info">
                    <h4>${curElm.Name}</h4>
                    <p>${curElm.details.slice(0, 25)}...</p>
                </div>
                <div class="qty_sec">
                    <button onclick="decItem(${curElm.id})">-</button>
                    <p>${curElm.qty}</p>
                    <button onclick="incItem(${curElm.id})">+</button>
                </div>
            </div>
            <div class="edit_sec">
                <div class="price">
                    <p>$${curElm.price}</p>
                </div>
                <div class="rmv_btn">
                    <button onclick="rmvItem(${curElm.id})"><i class="fa-solid fa-trash"></i> Remove</button>
                </div>
            </div>
        </div>
        `
    ).join("")
    }
}

//Increasing Cart Item Quantity
function incItem(id)
{
    const cart = JSON.parse(localStorage.getItem("cart")) || []
    const incQty = cart.find((item) =>
    {
       if(item.id === id)
       {
        item.qty++
       }
    })
    localStorage.setItem("cart", JSON.stringify(cart))

    displayCart()
    calculateSummary()
}

//Decrising The Item Quantity
function decItem(id)
{
    let cart = JSON.parse(localStorage.getItem("cart")) || []
    const incQty = cart.find((item) =>
    {
       if(item.id === id)
       {
        item.qty--
       }
       if (item.qty <= 0) {
            cart = cart.filter(item => item.id !== id)
        }
    })
    localStorage.setItem("cart", JSON.stringify(cart))

    displayCart()
    calculateSummary()
}

//Removing Cart Item
function rmvItem(id)
{
    let cart = JSON.parse(localStorage.getItem("cart")) || []
    const rmv = cart.filter(item => item.id !== id)
    localStorage.setItem("cart", JSON.stringify(rmv))
    displayCart()
    calculateSummary()
}

//calculating total price
function calculateSummary() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    let subtotal = 0

    for(let i = 0; i < cart.length; i++)
    {
        subtotal += cart[i].price * cart[i].qty
    }

    const delivery = 3.63;
    const tax = subtotal * 0.05; 
    const total = subtotal + delivery + tax;

    document.getElementById("subtotal").innerHTML =`$${subtotal.toFixed(2)}`
    document.getElementById("delivery").innerHTML =`$${delivery.toFixed(2)}`
    document.getElementById("tax").innerHTML =`$${tax.toFixed(2)}`
    document.getElementById("total").innerHTML =`$${total.toFixed(2)}`
}
displayCart();
calculateSummary();