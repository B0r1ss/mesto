import Popup from "./Popup.js"

export default class PopupWithImage extends Popup {
  constructor (selector, constants) {
    super(selector, constants)
    this._image = this._popup.querySelector(".popup__image")
    this._title = this._popup.querySelector(".popup__title-image")
  }

  open(title, image){
    this._image.src=image
    this._image.alt=title;
    this._title.textContent=title
    super.open();
  }
}