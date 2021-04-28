export class Card {
  constructor(data, cardSelector, openPopupImage) {
    this.data = data;
    this._cardSelector = cardSelector;
    this._openPopupImage = openPopupImage;
  }

  _getTemplate() {
    const cardTemplate = document
      .querySelector(this._cardSelector)
      .content.cloneNode(true);

    return cardTemplate;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._element.querySelector(".place__image").src = this.data.link;
    this._element.querySelector(".place__title").textContent = this.data.name;
    this._element.querySelector(".place__image").alt = this.data.name;
    return this._element;
  }

  _setEventListeners() {
    this._element
      .querySelector(".place__like-button")
      .addEventListener("click", this._enableLike);

    this._element
      .querySelector(".place__delete-button")
      .addEventListener("click", this._removeCard);

    this._element
      .querySelector(".place__image")
      .addEventListener("click", this._openPopupImage);
  }

  _enableLike(evt) {
    evt.target.classList.toggle("place__like-button_enable");
  }

  _removeCard(evt) {
    evt.target.closest(".place").remove();
  }
}
