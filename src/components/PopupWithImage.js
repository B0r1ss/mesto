import Popup from "./Popup.js"

export default class PopupWithImage extends Popup {
  constructor (selector ) {
    super(selector)
  }

  open(title, image){
    const popupImg = this._popup.querySelector(".popup__image");
    popupImg.src=image
    popupImg.alt=title;
    this._popup.querySelector(".popup__title-image").textContent=title
    super.open();
  }
}