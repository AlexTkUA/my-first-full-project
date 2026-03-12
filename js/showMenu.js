"use strict"
document.addEventListener("DOMContentLoaded", () => {
    const burgerElement = document.querySelector(".burger_btn");
    const hiddenMenu = document.querySelector(".header_nav");
     if (burgerElement) {
        burgerElement.addEventListener("click", () => {
            if(hiddenMenu) {
                hiddenMenu.classList.toggle("show_btn");
            }
        })
    }
})