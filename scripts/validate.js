/*ADD EVENT LISTENERS FOR FORM */
function setEventListeners(form) {
  const inputList = Array.from(form.querySelectorAll(".popup__input"))
  const buttonElement = form.querySelector(".popup__button");
  setButtonState(inputList, buttonElement)

  inputList.forEach((element)=>{
    element.addEventListener("input", ()=>{
      isValid(form, element)
      setButtonState(inputList, buttonElement)
    })
  })
}

/*CHANGE VISIBLE OF TOGGLEs*/
function showInputError(formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.add('form__input_type_error');
  errorElement.textContent = errorMessage; 
  errorElement.classList.add('form__input-error');
};

function hideInputError(formElement, inputElement) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('form__input_type_error');
  errorElement.classList.remove('form__input-error');
  errorElement.textContent = '';
};

/*VALIDATION INPUT*/
function isValid(formElement, inputElement) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage)
  } else {
    hideInputError(formElement, inputElement)
  }
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

/*SET BUTTON STATE*/
function setButtonState(inputList, buttonElement) {
  if(hasInvalidInput(inputList)) {
    buttonElement.setAttribute("disabled", "disabled")
    buttonElement.classList.add("popup__button_disable")
  } else {
    buttonElement.classList.remove("popup__button_disable")
    buttonElement.removeAttribute("disabled")
  }
}

/*ADD EVENT LISTENERS FOR ALL FORMS */
const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.form'));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
      setEventListeners(formElement);
  });
};

enableValidation();