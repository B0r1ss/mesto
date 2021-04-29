export class FormValidator {
  constructor(settingsValidate, formElement) {
    this._settingsValidate = settingsValidate;
    this._formElement = formElement;
  }

  _setEventListeners() {
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._settingsValidate.inputSelector)
    );
    this._buttonElement = this._formElement.querySelector(
      this._settingsValidate.submitButtonSelector
    );
    this.setButtonState(
      this._inputList,
      this._buttonElement,
      this._settingsValidate
    );
    this._inputList.forEach((element) => {
      element.addEventListener("input", () => {
        this._isValid(element);
        this.setButtonState(
          this._inputList,
          this._buttonElement,
          this._settingsValidate
        );
      });
    });
  }

  setButtonState(inputList, buttonElement, settings) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.setAttribute("disabled", "disabled");
      buttonElement.classList.add(settings.inactiveButtonClass);
    } else {
      buttonElement.classList.remove(settings.inactiveButtonClass);
      buttonElement.removeAttribute("disabled");
    }
  }

  _isValid(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(this._formElement);
    } else {
      this.hideInputError(this._formElement);
    }
  }

  _showInputError(formElement) {
    const inputs = Array.from(
      formElement.querySelectorAll(this._settingsValidate.inputSelector)
    );
    inputs.forEach((inputElement) => {
      const errorElement = formElement.querySelector(
        `.${inputElement.id}-error`
      );
      inputElement.classList.add(this._settingsValidate.inputErrorClass);
      errorElement.textContent = inputElement.validationMessage;
      errorElement.classList.add(this._settingsValidate.errorClass);
    });
  }

  hideInputError(formElement) {
    const inputs = Array.from(
      formElement.querySelectorAll(this._settingsValidate.inputSelector)
    );
    inputs.forEach((inputElement) => {
      const errorElement = formElement.querySelector(
        `.${inputElement.id}-error`
      );
      inputElement.classList.remove(this._settingsValidate.inputErrorClass);
      errorElement.classList.remove(this._settingsValidate.errorClass);
      errorElement.textContent = "";
    });
  }

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  enableValidation() {
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }
}
