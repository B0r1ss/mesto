import { Card } from "./Cards.js";
import PopupWithImage from "./PopupWithImage.js"
import PopupWithForm from "./PopupWithForm.js"
import UserInfo from "./UserInfo.js"

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
const closeButtonPopupEdit = popupEdit.querySelector(".popup__close-button");

const inputUserName = formEdit.querySelector(".popup__input_username_input");
const inputPosition = formEdit.querySelector(".popup__input_position_input");

/*GET VALUES FROM DOCUMENT */
const userName = document.querySelector(".profile__username");
const position = document.querySelector(".profile__position");

/*ADD POPUP CLASS */

const popupWithImage = new PopupWithImage(".popup_img")
popupWithImage.setEventListeners()

const popupWithForm = new PopupWithForm(".popup_add", (obj) => {
  const buttonElement = popupAdd.querySelector(
    settingsValidate.submitButtonSelector
  );
  const card = createCard(obj, "#card");
  const cardElement = card.generateCard();
  elementsList.prepend(cardElement);
})
popupWithForm.setEventListeners()


/*CRETE INSTANCE OF CARD*/
function createCard(item, template) {
  const card = new Card(item, template, () =>{popupWithImage.open(item.name, item.link)});
  return card;
}

/*ADD CARDS FROM VARS, CLASS CARD*/
initialCards.forEach((item) => {
  const card = createCard(item, "#card");
  const cardElement = card.generateCard();
  elementsList.append(cardElement);
});

/*DEFINE FUNCTIONS FOR LISTENERS*/


/*OPEN POPUPS */
function openPopup(popup) {
  popup.classList.add("popup_opened");
}


function openPopupEdit() {
  openPopup(popupEdit);
  inputUserName.value = userName.textContent;
  inputPosition.value = position.textContent;
}

const popupEditWithForm = new PopupWithForm(".popup_edit", ()=>{
  const userInfo = new UserInfo(".profile__username", ".profile__position")
  const info=userInfo.getUserInfo()
  userInfo.setUserInfo(info)
})
popupEditWithForm.setEventListeners()



/*ADD LISTENERS */
profileButtonAdd.addEventListener("click", () => {
  validatorFormAdd.hideInputError(formAdd);
  popupWithForm.open()
});




profileButtonEdit.addEventListener("click", () => {
  validatorFormEdit.hideInputError(formEdit);
  openPopupEdit();
});

closeButtonPopupEdit.addEventListener("click", () => {
  closePopup(popupEdit);
});


/*ADD VALIDATOR FOR ALL FORMS, CLASS FORMVALIDATOR*/
const validatorFormAdd = new FormValidator(settingsValidate, formAdd);
validatorFormAdd.enableValidation();
const validatorFormEdit = new FormValidator(settingsValidate, formEdit);
validatorFormEdit.enableValidation();

