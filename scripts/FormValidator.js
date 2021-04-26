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
    this._setButtonState();
    this._inputList.forEach((element) => {
      element.addEventListener("input", () => {
        this._isValid(element);
        this._setButtonState();
      });
    });
  }

  _setButtonState() {
    if (this._hasInvalidInput(this._inputList)) {
      this._buttonElement.setAttribute("disabled", "disabled");
      this._buttonElement.classList.add(
        this._settingsValidate.inactiveButtonClass
      );
    } else {
      this._buttonElement.classList.remove(
        this._settingsValidate.inactiveButtonClass
      );
      this._buttonElement.removeAttribute("disabled");
    }
  }

  _isValid(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(
        this._formElement,
        inputElement,
        this._settingsValidate
      );
    } else {
      this._hideInputError(
        this._formElement,
        inputElement,
        this._settingsValidate
      );
    }
  }

  _showInputError(formElement, inputElement, settings) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(settings.inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(settings.errorClass);
  }

  _hideInputError(formElement, inputElement, settings) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(settings.inputErrorClass);
    errorElement.classList.remove(settings.errorClass);
    errorElement.textContent = "";
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
