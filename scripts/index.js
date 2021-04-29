import { Card } from "./Cards.js";
import { FormValidator } from "./FormValidator.js";
import { settingsValidate } from "./settings.js";
import { initialCards } from "./initialCards.js";

/*VAR'S */
const elementsList = document.querySelector(".elements__list");
const profileButtonAdd = document.querySelector(".profile__button_add");
const profileButtonEdit = document.querySelector(".profile__button_edit");

const popupAdd = document.querySelector(".popup_add");
const popupEdit = document.querySelector(".popup_edit");
const popupImg = document.querySelector(".popup_img");

/*GET FORMS*/
const formAdd = document.forms.add_form;
const formEdit = document.forms.edit_profile;

/*CLOSE BUTTONS POPUP */
const closeButtonPopupAdd = popupAdd.querySelector(".popup__close-button");
const closeButtonPopupEdit = popupEdit.querySelector(".popup__close-button");
const closeButtonPopupImg = popupImg.querySelector(".popup__close-button");

const inputUserName = formEdit.querySelector(".popup__input_username_input");
const inputPosition = formEdit.querySelector(".popup__input_position_input");
const inputTitle = formAdd.querySelector(".popup__input_title_input");
const inputLink = formAdd.querySelector(".popup__input_link_input");

/*GET VALUES FROM DOCUMENT */
const userName = document.querySelector(".profile__username");
const position = document.querySelector(".profile__position");
const popupImgImage = popupImg.querySelector(".popup__image");
const popupImgTitle = popupImg.querySelector(".popup__title-image");
/*CRETE INSTANCE OF CARD*/
const card = new Card("", "#card", (place) => {
  const image = place.target.src;
  const title = place.target.alt;
  popupImgTitle.textContent = title;
  popupImgImage.src = image;
  openPopup(popupImg);
});

/*ADD CARDS FROM VARS, CLASS CARD*/
initialCards.forEach((item) => {
  card.data=item;
  const cardElement = card.generateCard();
  elementsList.append(cardElement);
});

/*DEFINE FUNCTIONS FOR LISTENERS*/

/*FUNC TO LISTEN ESC BUTTON */
function closeByEsc(evt) {
  if (evt.key === "Escape") {
    const openPopup = document.querySelector(".popup_opened");
    closePopup(openPopup);
  }
}

/*OPEN POPUPS */
function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closeByEsc);
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closeByEsc);
}

function openPopupEdit() {
  openPopup(popupEdit);
  inputUserName.value = userName.textContent;
  inputPosition.value = position.textContent;
}

/*SUBMIT POPUPS */
function submitPopupEdit(evt) {
  evt.preventDefault();
  userName.textContent = inputUserName.value;
  position.textContent = inputPosition.value;
  closePopup(popupEdit);
}

function submitPopupAdd(evt) {
  evt.preventDefault();
  const inputList = Array.from(
    popupAdd.querySelectorAll(settingsValidate.inputSelector)
  );
  const buttonElement = popupAdd.querySelector(
    settingsValidate.submitButtonSelector
  );
  const obj = { name: inputTitle.value, link: inputLink.value };
  card.data=obj;
  const cardElement = card.generateCard();
  elementsList.prepend(cardElement);
  closePopup(popupAdd);
  inputTitle.closest("form").reset();
  validatorFormAdd.setButtonState(inputList, buttonElement, settingsValidate);
}

/*GET INPUTS FROM FORM AND HIDE INPUTS ERROR */
function hideInputsError(form) {
  const input = Array.from(
    form.querySelectorAll(settingsValidate.inputSelector)
  );
  input.forEach((inputElement) => {
    validatorFormEdit.hideInputError(formAdd, inputElement, settingsValidate);
  });
}

/*ADD LISTENERS */
profileButtonAdd.addEventListener("click", () => {
  hideInputsError(formAdd);
  openPopup(popupAdd);
});

closeButtonPopupAdd.addEventListener("click", () => {
  closePopup(popupAdd);
});

formAdd.addEventListener("submit", submitPopupAdd);

profileButtonEdit.addEventListener("click", () => {
  hideInputsError(formEdit);
  openPopupEdit();
});

closeButtonPopupEdit.addEventListener("click", () => {
  closePopup(popupEdit);
});

formEdit.addEventListener("submit", submitPopupEdit);

closeButtonPopupImg.addEventListener("click", () => {
  closePopup(popupImg);
});

document.addEventListener("click", (evt) => {
  if (evt.target.classList.contains("popup_opened")) {
    closePopup(evt.target);
  }
});

/*ADD VALIDATOR FOR ALL FORMS, CLASS FORMVALIDATOR*/
const validatorFormAdd = new FormValidator(settingsValidate, formAdd);
validatorFormAdd.enableValidation()
const validatorFormEdit = new FormValidator(settingsValidate, formEdit)
validatorFormEdit.enableValidation()
