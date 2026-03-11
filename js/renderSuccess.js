"use strict"
document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const number = params.get("orderCode");
    const blockElement = document.querySelector(".main_success");
    blockElement.innerHTML += `<div class = "messageAfterOrder">
            <p class = "messageAfterOrder_text">Номер вашего заказа №${number}, с Вами свяжется наш менеджер.</p>
        </div>`

})