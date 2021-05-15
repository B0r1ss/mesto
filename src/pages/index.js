import './index.css';

import Card from "../components/Cards.js";
import PopupWithImage from "../components/PopupWithImage.js"
import PopupWithForm from "../components/PopupWithForm.js"
import UserInfo from "../components/UserInfo.js"
import FormValidator from "../components/FormValidator.js";
import { settingsValidate } from "../components/settings.js";
import { initialCards } from "../components/initialCards.js";

/*VAR'S */
const elementsList = document.querySelector(".elements__list");
const profileButtonAdd = document.querySelector(".profile__button_add");
const profileButtonEdit = document.querySelector(".profile__button_edit");

/*GET FORMS*/
const formAdd = document.forms.add_form;
const formEdit = document.forms.edit_profile;

/*GET INPUTS FROM EDIT FORM*/
const inputUserName = formEdit.querySelector(".popup__input_username_input");
const inputPosition = formEdit.querySelector(".popup__input_position_input");

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

/*POPUPS */

/*CREATE INSTANCE OF POPUP WITH IMG */
const popupWithImage = new PopupWithImage(".popup_img")
popupWithImage.setEventListeners()

/*CREATE INSTANCE OF POPUP ADD*/
const popupWithFormAdd = new PopupWithForm(".popup_add", (obj) => {
  const card = createCard(obj, "#card");
  const cardElement = card.generateCard();
  elementsList.prepend(cardElement);
})
popupWithFormAdd.setEventListeners()

/* CREATE INSTANCE POPUP EDIT*/
const userInfo = new UserInfo({userName: ".profile__username", aboutUser: ".profile__position"})

const popupWithFormEdit = new PopupWithForm(".popup_edit", (obj)=>{
  userInfo.setUserInfo(obj)
})
popupWithFormEdit.setEventListeners()

/*ADD LISTENERS */
profileButtonAdd.addEventListener("click", () => {
  validatorFormAdd.hideInputError(formAdd);
  popupWithFormAdd.open()
});


profileButtonEdit.addEventListener("click", () => {
  validatorFormEdit.hideInputError(formEdit);
  const info = userInfo.getUserInfo()
  inputUserName.value = info.username;
  inputPosition.value = info.position;
  popupWithFormEdit.open()
});

/*ADD VALIDATOR FOR ALL FORMS, CLASS FORMVALIDATOR*/
const validatorFormAdd = new FormValidator(settingsValidate, formAdd);
validatorFormAdd.enableValidation();
const validatorFormEdit = new FormValidator(settingsValidate, formEdit);
validatorFormEdit.enableValidation();
