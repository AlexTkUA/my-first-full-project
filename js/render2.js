"use strict";
document.addEventListener("DOMContentLoaded", () => {

    //Функція для створення DOM елемента
    const createDOMElement = (tag, classes, attributes, text) => {
        const newElement = document.createElement(tag);
        //Якщо я передаю масив то відбудеться спред оператор
         if (classes) {
            if (Array.isArray(classes)) {
                newElement.classList.add(...classes);
            } else {
                newElement.classList.add(classes);
            }
        }
        if (attributes) {
            for (const key in attributes) {
                newElement.setAttribute(key, attributes[key]);
            }
        }
        if (text !== undefined && text !== null) {
            newElement.textContent = text;
        }
        return newElement;
    }

    const createCardsGrid = (cardsArr, selectorContainer, countCards) => {
        const parentContainer = document.querySelector(selectorContainer)
        if (!parentContainer) {
            return
        }
        parentContainer.innerHTML = ``;
        let counter = 0;
        cardsArr.forEach(card => {
            if (counter == countCards) {
                return;
            }
            //Створення всіх елементів компонента Card
            const item = createDOMElement("a", "headphone_section_cards_item", {
                //передаємо id карточки в get параметр через url адресу 
                href: `product/index.html?id=0${card.id}`
            })
            const likeElement = createDOMElement("div", "liked_img")
            const unfavorite = createDOMElement("img", "heart", {
                src: "assets/icon/unfavorite.svg"
            })
            const itemPhoto = createDOMElement("div" , "headphone_section_cards_item_img")
            const photoImg = createDOMElement("img", null, {
                src: `assets/img/${card.photo[0]}`,
            })
            const itemInfo = createDOMElement("div", "headphone_section_cards_item_info")
            const itemModel = createDOMElement("h3", "headphone_section_cards_item_info_model", null, card.name);
            const priceBlock = createDOMElement("div","headphone_section_cards_item_info_price")
            const price = createDOMElement("span", null, null, card.price + " грн")
            const previousPrice = createDOMElement("span", "previous-price", null, card.discount + " грн")
            const ratingBlock = createDOMElement("div", "headphone_section_cards_item_rating")
            const ratingImg = createDOMElement("img", null, {
                src: "assets/icon/star.svg",
            })
            const ratingNumber = createDOMElement("span" , "headphone_section_cards_item_rating_number", null, card.rating)

            //Вставка елементів для створення компонента 
            parentContainer.append(item);
            item.append(likeElement);
            item.append(itemPhoto);
            item.append(itemInfo);
            item.append(ratingBlock);
            likeElement.append(unfavorite)
            itemPhoto.append(photoImg)
            itemInfo.append(itemModel);
            itemInfo.append(priceBlock);
            if (card.isDiscount) {
                priceBlock.append(price);
                priceBlock.append(previousPrice);
            } else {
                priceBlock.append(price);
            }
            ratingBlock.append(ratingImg);
            ratingBlock.append(ratingNumber);
            counter++;
        })
    }
    //Отримаємо дані з json
    const getData = (url) => {
        return fetch(url).then(res => res.json());
    }
    getData("data/product.json").then((data) => {
        createCardsGrid(data, "[data-js-headphone-cards]", 6)
    })

    const toggleLike  = (cardSelector, favoriteSrc, unfavoriteSrc) => {
        const headphoneBlock = document.querySelector(cardSelector);
        if (!headphoneBlock) {
            return;
        }
        headphoneBlock.addEventListener("click", event => {
            const likedBlock = event.target.closest(".liked_img");
            if(!likedBlock) {
                return;
                //якщо ми натиснули не на картинку то код далі виконуватися не буде
            } 
            //якщо ми натиснули на сердечко то ми не будемо переходити на сторінку товару
            event.stopPropagation();   
            event.preventDefault();
            const img = likedBlock.querySelector("img");
            if (img.getAttribute("src") === favoriteSrc) {
                img.setAttribute("src", unfavoriteSrc)
            } else if (img.getAttribute("src") === unfavoriteSrc) {
                img.setAttribute("src", favoriteSrc)
            }
        })
    }

    toggleLike("[data-js-headphone-cards]", "assets/icon/favorite.png", "assets/icon/unfavorite.svg")
   
    getData("data/wireless.json").
    then((data) => {
        createCardsGrid(data, "[data-js-wireless-headphone]", 3)
    });
})