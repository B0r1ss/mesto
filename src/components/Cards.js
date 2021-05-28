export default class Card {
  constructor(data, cardSelector, currentUser, {openPopupImage, handleRemoveCard, handleLikeClick}) {
    this.data = data;
    this._cardSelector = cardSelector;
    this._currentUser = currentUser;
    this._openPopupImage = openPopupImage;
    this._handleDelCard = handleRemoveCard;
    this._handleLikeClick = handleLikeClick;
    this._likes = this.data.likes
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

  /*ADD LIKES AND SET STATE OF LIKE BUTTONS */
  _getLikes() {
    this._likeAmount.textContent = this.data.likes.length;
    this._likes.forEach(item => {
      if(item._id === this._currentUser._id) {
        this._likeButton.classList.add("place__like-button_enable");
      }
    });
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", this._handleLikeClick);
    this._deleteButton.addEventListener("click", this._handleDelCard);
    this._imageElement.addEventListener("click", this._openPopupImage);
  }

  generateCard() {
    this._setEventListeners();
    this._imageElement.src = this.data.link;
    this._titleElement.textContent = this.data.name;
    this._imageElement.alt = this.data.name;

    if (this.data.owner._id !== this._currentUser._id) {
      this._element.querySelector(".place__delete-button").remove();
    };

    this._getLikes();
    return this._element;
  }

  like() {
    this._likeButton.classList.toggle("place__like-button_enable");
  }
 
  deleteCard() {
    this._element.remove().bind(this._element);
    this._element = null;
  }
}
