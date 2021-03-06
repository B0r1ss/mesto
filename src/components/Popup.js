export default class Popup {
  constructor(selector, constants) {
    this.selector=selector
    this._constants=constants
    this._popup=document.querySelector(this.selector);
    this._handleEscClose = this._handleEscClose.bind(this)
    this.close = this.close.bind(this);

  }

  _handleEscClose(evt) {
    if (evt.key === this._constants.escKey) {
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

    this._popup.addEventListener("mousedown", (evt)=>{
      if(evt.target.classList.contains("popup")) {
        this.close()}
    })
  }
}