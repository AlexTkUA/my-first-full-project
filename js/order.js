"use strict"
import validationForm from "./post.js";
document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const cartList = JSON.parse(params.get("cart"));
    const deliveryPrice = 499;
    const renderCartListOrder = (cartObj, selector) => {
        const cartListElement = document.querySelector(selector);
        if (!cartListElement) {
            return
        }
        let html = ``;
        for (const key in cartObj) {
            html += `<li class = "form_specification_cart_list_item form_specification_text ">
                        <span class = "form_specification_cart_list_item_count">${cartObj[key].count}</span>
                        <span class = "form_specification_cart_list_name">${key}</span>
                        <span class = "form_specification_cart_list_price">${cartObj[key].totalPrice}</span>
                    </li>`
        }
        cartListElement.innerHTML = html
    }

    const renderDeliveryBlock = (cartObj, selector, deliveryPrice) => {
        const deliveryBlock = document.querySelector(selector);
        if (!deliveryBlock) {
            return
        }
        let totalPrice = 0;
        for (const key in cartObj) {
            totalPrice += cartObj[key].totalPrice
        }
        totalPrice += deliveryPrice
         const html = `
        <div class="form_specification_text">
            <span>Доставка</span>
            <span>${deliveryPrice}</span>
        </div>
        <div class="form_specification_text">
            <span>К оплате</span>
            <span>${totalPrice}</span>
        </div>
    `;

    deliveryBlock.insertAdjacentHTML("beforeend", html);

    }

    renderDeliveryBlock(cartList, ".form_specification_cart", deliveryPrice);

   renderCartListOrder(cartList,".form_specification_cart_list");

   validationForm("mainForm", cartList, deliveryPrice);

})