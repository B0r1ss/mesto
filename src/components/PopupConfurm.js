import Popup from "./Popup.js";

export default class PopupConfirm extends Popup {
  constructor(selector, constants, handleSubmit) {
    super(selector, constants);
    this._handleSubmit = handleSubmit;
    this._popupButton = this._popup.querySelector(".popup__button");
  }

  open(card) {
    this._card = card;
    super.open();
  }

  setEventListeners() {
    this._popupButton.addEventListener(
      "click",
      function (evt) {
        evt.preventDefault();
        this._handleSubmit(this._card);
      }.bind(this)
    );
    super.setEventListeners();
  }
}
