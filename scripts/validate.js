/*ADD EVENT LISTENERS FOR FORM */
function setEventListeners(form, settings) {
  const inputList = Array.from(form.querySelectorAll(settings.inputSelector))
  const buttonElement = form.querySelector(settings.submitButtonSelector);
  setButtonState(inputList, buttonElement, settings)
  inputList.forEach((element) => {
    element.addEventListener("input", () => {
      isValid(form, element, settings)
      setButtonState(inputList, buttonElement, settings)
    })
  })
}

/*CHANGE VISIBLE OF TOGGLEs*/
function showInputError(formElement, inputElement, settings) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(settings.inputErrorClass);
  errorElement.textContent = inputElement.validationMessage;
  errorElement.classList.add(settings.errorClass);
};

function hideInputError(formElement, inputElement, settings) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(settings.inputErrorClass);
  errorElement.classList.remove(settings.errorClass);
  errorElement.textContent = '';
};

/*VALIDATION INPUT*/
function isValid(formElement, inputElement, settings) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, settings)
  } else {
    hideInputError(formElement, inputElement, settings)
  }
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

/*SET BUTTON STATE*/
function setButtonState(inputList, buttonElement, settings) {
  if (hasInvalidInput(inputList)) {
    buttonElement.setAttribute("disabled", "disabled")
    buttonElement.classList.add(settings.inactiveButtonClass)
  } else {
    buttonElement.classList.remove(settings.inactiveButtonClass)
    buttonElement.removeAttribute("disabled")
  }
}

/*ADD EVENT LISTENERS FOR ALL FORMS */
const enableValidation = (settings) => {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement, settings);
  });
};

enableValidation({
  formSelector: ".form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disable",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error"
});