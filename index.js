console.log(product)

const featured_filter = product.filter((item) =>
{
   return item.type === "featured"
})
const featured_sec = document.getElementById('featured_dish')
if(featured_sec)
{
featured_sec.innerHTML=featured_filter.map(curElm => 
    `
    <div class="box">
        <div class="img_box">
            <img src="${curElm.img}" alt="product_image"/>
        </div>
        <div class="dish">
        <div class="dish_detail">
            <h3>${curElm.Name}</h3>
            <p>${curElm.details.slice(0, 50)}...</p>
        </div>
        <div class="price_sec">
            <div class="price">
                <h4>$${curElm.price}</h4>
            </div>
            <div class="cart_sec">
                <div class="icon">
                    <i class="fa-solid fa-plus" onclick="AddToCart(${curElm.id})"></i>
                </div>
            </div>
        </div>
        </div>
    </div>
    `
).join("")
}

//Add to cart Function
function AddToCart(item)
{
    const cart = JSON.parse(localStorage.getItem("cart")) || []
    const cart_product = product.find((curElm) => 
    {
        return curElm.id === item
    })
    const exsisting_product = cart.find(curElm => curElm.id === item)
    if(exsisting_product)
    {
        exsisting_product.qty += 1
        alert("This Item Is Allerady In Cart")
    }
    else
    {
        cart.push({...cart_product, qty:1})
        alert("Item Added To Cart")
    }
    localStorage.setItem("cart", JSON.stringify(cart))
    console.log(cart)
    displayCart()
}

//menulist
const menu = document.getElementById("menu")
if(menu)
{
menu.innerHTML = product.map(curElm => 
    `
    <div class="box">
        <div class="img_box">
            <img src="${curElm.img}" alt="product_image"/>
        </div>
        <div class="dish">
        <div class="dish_detail">
            <h3>${curElm.Name}</h3>
            <p>${curElm.details.slice(0, 50)}...</p>
        </div>
        <div class="price_sec">
            <div class="price">
                <h4>$${curElm.price}</h4>
            </div>
            <div class="cart_sec">
                <div class="icon">
                    <i class="fa-solid fa-plus" onclick="AddToCart(${curElm.id})"></i>
                </div>
            </div>
        </div>
        </div>
    </div>
    `
).join("")
}