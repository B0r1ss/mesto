
export class Card {
    constructor(data, cardSelector, openPopupImage) {
        this._data=data;
        this._cardSelector=cardSelector;
        this._openPoputImage=openPopupImage
    }
    _getTemplate() {
        const cardTemplate=document
        .querySelector(this._cardSelector)
        .content
        .cloneNode(true);

        return cardTemplate;
    }

    generateCard() {
        this._element=this._getTemplate();
        this._setEventListeners();
        this._element.querySelector(".place__image").src = this._data.link;
        this._element.querySelector(".place__title").textContent = this._data.name;
        this._element.querySelector(".place__image").alt = this._data.name;
        return this._element;
    }

    _setEventListeners() {
        this._element
        .querySelector(".place__image")
        .addEventListener("click", function (evt) {
            this._openPopupImage(evt.target);
          });

        this._element
        .querySelector(".place__like-button")
        .addEventListener("click", function (evt) {
            evt.target.classList.toggle("place__like-button_enable");
          });

        this._element
        .querySelector(".place__delete-button")
        .addEventListener("click", function (evt) {
            evt.target.closest(".place").remove();
          });

    }
}