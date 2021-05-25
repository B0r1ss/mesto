export default class Card {
  constructor(data, cardSelector, {openPopupImage, handleLikeClick}) {
    this.data = data;
    this._cardSelector = cardSelector;
    this._openPopupImage = openPopupImage;
    this._handleLikeClick = handleLikeClick;
    this._element = this._getTemplate();
    this._imageElement = this._element.querySelector(".place__image");
    this._titleElement = this._element.querySelector(".place__title");
    this._likeButton = this._element.querySelector(".place__like-button");
    this._likeAmount = this._element.querySelector(".place__like-amount");
    this._deleteButton = this._element.querySelector(".place__delete-button");
  }

  _getTemplate() {
    const cardTemplate = document
      .querySelector(this._cardSelector)
      .content.cloneNode(true);

    return cardTemplate;
  }

  generateCard() {
    this._setEventListeners();
    this._imageElement.src = this.data.link;
    this._titleElement.textContent = this.data.name;
    this._imageElement.alt = this.data.name;
    this._likeAmount.textContent = this.data.likes.length;
    return this._element;
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", this._handleLikeClick);

    this._deleteButton.addEventListener("click", this._removeCard);

    this._imageElement.addEventListener("click", this._openPopupImage);
  }

  _enableLike(evt) {
    evt.target.classList.toggle("place__like-button_enable");
    this._setLike()
  }

  _removeCard(evt) {
    evt.target.closest(".place").remove();
  }
}
