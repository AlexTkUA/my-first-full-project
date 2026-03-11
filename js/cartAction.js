"use strick"
const addToCart = (eventPlace, identificatorAttribute) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || {};
    const placeHolder = document.querySelector(eventPlace);
    placeHolder.addEventListener("click", (event) => {
        const target = event.target;
        if (target.hasAttribute(identificatorAttribute)) {
            const productId = target.dataset.buyId;
           if (cart[productId]) {
                cart[productId] += 1;
            } else {
                cart[productId] = 1;
            }
            localStorage.setItem("cart", JSON.stringify(cart));
        }
    })
}
export {addToCart};