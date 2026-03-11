"use strict"
import { addToCart } from "./cartAction.js";
document.addEventListener("DOMContentLoaded", ()=>{
    const params = new URLSearchParams(window.location.search);
    const idParam = +params.get("id");

    const renderListCharacteristics = (product, handler) => {
        const place = document.querySelector(handler);
        product.characteristics.forEach(el => {
            place.innerHTML += `<li>${el}</li>`
        })
    } 

    const toggleFlexBox = (product, boxContainer) => {
        const box = document.querySelector(boxContainer);
        if (!box || !product?.photo) return;
        if (product.photo.length <= 2) {
            box.classList.add("jcleft")
        }
        /**
         * Це можна зробити через css 
         * .product_info_gallery:has(img:nth-child(3)) {
            justify-content: space-between;
            }
         */
    }

    const renderGallery = (product) => {
    let list = "";
    product.photo.forEach(photo => {
        list += `<div class = "product_info_gallery_img"><img src="../../assets/img/${photo}" alt=""></div>`
    })
    return list;
}

    const renderPromoProduct = (product, handler) => {
        const place = document.querySelector(handler);
        let priceBlock = null;
            if (product.isDiscount) {
                priceBlock = `<span>${product.price}</span>
                    <span class="previous-price">${product.discount}</span>`
            } else {
                priceBlock = `<span>${product.price}</span>`;
            }
        let html = `<h2 class = "product_info_title">${product.category}</h2>
            <section class = "product_info_gallery">
                <div class="liked_img"><img class="heart" src="../../assets/icon/unfavorite.svg"></div>` + renderGallery(product) + `</section>
            <div class="product_card_info">
                <h3 class="product_title_model">${product.name}</h3>
                <div class="product_price">
                    ${priceBlock}
                </div>
            </div>`
            place.innerHTML = html;
    }

    fetch("../../data/product.json").
    then(res => res.json()).
    then((data) => {
        const product = data.find(p => p.id == idParam);
        if (product) {
            renderPromoProduct(product, ".product_info_container");
            toggleFlexBox(product, ".product_info_gallery")
            renderListCharacteristics(product, ".product_characteristic_description_list")
        }
    })

    const renderBtns = (selector, id) => {
        const place = document.querySelector(selector);
        if (!place) {
            return
        }
        place.innerHTML = `<a data-cart-btn href = "../cart/index.html" data-buy-id = ${id} class = "main_btn mb18">Купить!</a>
                    <button data-cart-btn data-buy-id = ${id} class = "main_btn">Добавить в корзину</button>`;

    }
    renderBtns(".product_characteristic_buyBlock_btns", idParam);
    addToCart(".product_characteristic_buyBlock_btns", "data-cart-btn");
})