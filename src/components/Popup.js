export default class Popup {
  constructor(selector) {
    this.selector=selector
    this._popup=document.querySelector(this.selector);
    this._handleEscClose = this._handleEscClose.bind(this)
    this.close = this.close.bind(this);

  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close()
    }
  }

  open() {
    this._popup.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  setEventListeners() {
    this._closeButton=this._popup.querySelector(".popup__close-button")
    this._closeButton.addEventListener("click", this.close)
  }
}