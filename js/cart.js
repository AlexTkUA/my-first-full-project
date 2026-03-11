"use strict"
document.addEventListener("DOMContentLoaded", () => {
    const cartList = JSON.parse(localStorage.getItem("cart"));
    let allProducts = [];

    function renderEmptyCart(placeHolder) {
        const placeHtml = document.querySelector(placeHolder);
        if (!placeHtml) {
            return
        }
        placeHtml.classList.add("flex-col");
        placeHtml.innerHTML = `
            <div class = "cart_img"><img src="/assets/img/curt.svg" alt=""></div>
            <h2 class = "cart_title">Корзина пуста</h2>
            <span class = "cart_subtitle">Но это никогда не поздно исправить :)</span>
            <a class = "cart_btn" href="../catalog/index.html">В каталог товаров</a>`
    }

    const createFullCart = (cartList, products, placeHolder) => {
    if (!cartList || Object.keys(cartList).length === 0) {
            renderEmptyCart(".cart_container");
            return;
        }
        const cartField = document.querySelector(placeHolder);
        if (!cartField) return;
        let cartObject = {
        }
        cartField.classList.remove("flex-col");
        let allTotalPrice = 0;
        let html = "";
        html = `<div class = "cart_wrapper">`
        products.forEach(product => {
            const amount = cartList[product.id];
        //Перевірка чи товар такий є 
            if (amount) {
                const price = product.isDiscount ? product.discount : product.price;
                const totalPrice = price * amount;
                cartObject[product.name] = {
                    "count": amount,
                    "price":price,
                    "totalPrice": totalPrice
                }; 
                allTotalPrice += totalPrice;
                html += `
                    <div class="cart_item">
                        <div data-id = '${product.id}' class="trashBox">
                            <img src="../../assets/icon/trashBasket.svg" alt="">
                        </div>

                        <div class="cart_item_info">
                            <div class="cart_item_info_photo">
                                <img src="../../assets/img/${product.photo[0]}" alt="">
                            </div>

                            <div class="cart_item_info_text">
                                <h2 class="cart_item_info_text_name">${product.name}</h2>
                                <span class="cart_item_info_text_price">${price}</span>
                            </div>
                        </div>

                        <div class="cart_item_counter">
                            <div class="flex-wrapper">
                                <div data-id = '${product.id}' class="cart_item_counter_minus">
                                    <img src="../../assets/icon/minus.svg" alt="">
                                </div>

                                <span class="cart_item_counter_amount">${amount}</span>

                                <div data-id = '${product.id}' class="cart_item_counter_plus">
                                    <img src="../../assets/icon/plus.svg" alt="">
                                </div>
                            </div>

                            <span class="cart_item_counter_totalPrice">${totalPrice}</span>
                        </div>
                    </div>
                `;
        }
    });
        const cartStr = encodeURIComponent(JSON.stringify(cartObject));
        html += `</div>`
        html += `<div class = "cart_orderBlock">
            <div class = "cart_orderBlock_totalPrice">
                <span>ИТОГО</span>
                <span>${allTotalPrice}</span>
            </div>
            <a class = "cart_orderBlock_btn" href="../order/index.html?cart=${cartStr}">Перейти к оформлению</a>
        </div>`
        cartField.innerHTML = html;
    } 
    
    fetch("../../data/product.json").then(res => res.json()).then(data => {
        allProducts = data;
        createFullCart(cartList, allProducts, ".cart_container")
        })
        

    const cartField = document.querySelector(".cart_container");
    cartField.addEventListener("click", (event) => {
        const target = event.target;
        if (target.closest(".cart_item_counter_plus"))  {
            const mainTarget = target.closest(".cart_item_counter_plus");
            // cartList[mainTarget.dataset.id] ++;
             if (cartList[mainTarget.dataset.id]) {
                cartList[mainTarget.dataset.id] += 1;
            } else {
                cartList[mainTarget.dataset.id] = 1;
            }
            localStorage.setItem("cart", JSON.stringify(cartList));
            createFullCart(cartList, allProducts, ".cart_container");
        }
        if (target.closest(".cart_item_counter_minus"))  {
            const mainTarget = target.closest(".cart_item_counter_minus");
            if (cartList[mainTarget.dataset.id]) {
                cartList[mainTarget.dataset.id] -= 1;
            } 
            if (cartList[mainTarget.dataset.id] < 1) {
                delete cartList[mainTarget.dataset.id];
            }
            localStorage.setItem("cart", JSON.stringify(cartList));
            createFullCart(cartList, allProducts, ".cart_container");
        }
        if (target.closest(".trashBox")) {
            delete cartList[target.closest(".trashBox").dataset.id];
            localStorage.setItem("cart", JSON.stringify(cartList));
            createFullCart(cartList, allProducts, ".cart_container");
        }
    })

})