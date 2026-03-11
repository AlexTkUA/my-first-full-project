"use strict"
const validationForm = (form, cartObject, deliveryPrice) => {
    const formElement = document.forms[form];
    if (!formElement) {
        return
    }

    const showInvalidInput = (element, errorText) => {
        element.classList.add("invalid");
        element.nextElementSibling.textContent = errorText;
    }

    formElement.addEventListener("submit", (event) => {
        event.preventDefault();

        const city = formElement.city.value;
        const street = formElement.street.value.trim();
        const numberHouse = formElement.house.value.trim();
        console.log(formElement.house);
        const entrance = formElement.entrance.value.trim()
        const apartment = formElement.apartment.value.trim()
        const phone = formElement.telephone.value.trim();

        const errorsElement = formElement.querySelectorAll(".error");
        errorsElement.forEach(el => {
            el.textContent = ``;
        })
        const allInvalidInputs = formElement.querySelectorAll(".invalid");
        allInvalidInputs.forEach(el => {
            el.classList.remove("invalid");
        })
        let isValid = true;

        const phoneRegex = /^(\+380|0)\d{9}$/;

        console.log(street === "" || street.length > 20 || /\d/.test(street));
        if (street === "" || street.length > 50 || /\d/.test(street)) {
            showInvalidInput(formElement.street, "Це поле може містити тільки літери");
            isValid = false;

        }
        if (!/^\d+$/.test(numberHouse)){
            showInvalidInput(formElement.house, "Це поле може містити тільки цифри");
            isValid = false;
        }
        if (entrance !== "") {
            if (entrance > 1000000 || !/^\d+$/.test(entrance)){
            showInvalidInput(formElement.entrance, "Це поле може містити тільки цифри");
            isValid = false;
            }
        }
        if (apartment !== "") {
            if (apartment > 1000000 || !/^\d+$/.test(apartment)){
            showInvalidInput(formElement.apartment, "Це поле може містити тільки цифри");
            isValid = false;
            }   
        }
        if (!phoneRegex.test(phone)) {
            showInvalidInput(formElement.telephone, "Невірний номер телефону");
            isValid = false;
        }
        if (!isValid) {
            return
        }
        const orderCode = Date.now();
        let totalPrice = 0;
        const formData = new FormData(formElement);
        formData.append("cart", JSON.stringify(cartObject));
        for (const key in cartObject) {
            totalPrice += cartObject[key].totalPrice;
        }
        totalPrice += deliveryPrice
        formData.append("totalPrice", totalPrice);
        formData.append("orderCode", orderCode);
        localStorage.removeItem("cart");
        window.location.href = `/my-first-full-project/pages/order-success/index.html?orderCode=${orderCode}`;
    })
}
export default validationForm;
