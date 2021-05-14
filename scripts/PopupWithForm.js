import Popup from "./Popup.js"

export default class PopupWithForm extends Popup {
  constructor (selector, handleSubmitForm) {
    super(selector)
    this._handleSubmitPopup=handleSubmitForm
    this._submitForm=this._submitForm.bind(this)
  }

  _getInputValues() {
    this._inputList=this._popup.querySelectorAll(".popup__input")
    this._inputValues={}
    this._inputList.forEach(element => {
      this._inputValues[element.name] = element.value
    });
    return this._inputValues
  }

  _submitForm(evt) {
    evt.preventDefault();
    this._handleSubmitPopup(this._getInputValues())
    this.close()
  }

  setEventListeners() {
    this._form=this._popup.querySelector(".form")
    this._form.addEventListener("submit", this._submitForm)
    super.setEventListeners()
  }

  close() {
    super.close();
    this._form.reset();
  }
}