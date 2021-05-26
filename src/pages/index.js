import './index.css';

import Api from "../components/Api.js";
import Card from "../components/Cards.js";
import Section from '../components/Section';
import PopupWithImage from "../components/PopupWithImage.js"
import PopupWithForm from "../components/PopupWithForm.js"
import UserInfo from "../components/UserInfo.js"
import FormValidator from "../components/FormValidator.js";
import { settingsValidate } from "../utils/settings.js";

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

/*VARS */
let currentUser=[]

/*CREATE API INSTANCE */
const api = new Api("")

/*GET USER INFO AND ADD TO PAGE */
api.getUserInfo()
  .then((res)=>{
    currentUser=res
    userInfo.setUserInfo(currentUser)
  })
  .catch((err)=>{
    console.log(`Error: ${err}`)
  })

/*GET CARDS AND ADD IN PAGE*/
api.getInitialCards()
  .then(res =>{
    addCards.renderItems(res)
  })
  .catch((err)=>{
    console.log(`Error: ${err}`)
  })

/*CRETE INSTANCE OF CARD*/
function createCard(item, template) {
  const card = new Card(
    item,
    template,
    currentUser,
    {
      openPopupImage: () =>{
        popupWithImage.open(item.name, item.link)
      },

      handleRemoveCard: (evt) =>{
        api.delCard(item._id)
        .then(()=>{
          evt.target.closest(".place").remove();
        })
        .catch((err)=>{
          console.log(`Error: ${err}`)
        })
      },

      handleLike: (evt)=>{
        const likeAmount = evt.target.closest(".place__likes").querySelector(".place__like-amount")
        evt.target.classList.toggle("place__like-button_enable");
        if ( evt.target.classList.contains("place__like-button_enable")) {
          api.setLike(item["_id"])
          .then((res)=>{
            likeAmount.textContent =  res.likes.length
          })
          .catch((err)=>{
            console.log(`Error: ${err}`)
          })
        } else {
          api.delLike(item["_id"])
          .then((res)=>{
            likeAmount.textContent =  res.likes.length
          })
          .catch((err)=>{
            console.log(`Error: ${err}`)
          })
        }
      },

    },
  );
  return card;
}

/*ADD CARDS FROM VARS, CLASS CARD*/
const addCards=new Section(
  {
    renderer: (item)=>{
      const card = createCard(item, "#card");
      const cardElement = card.generateCard();
      elementsList.append(cardElement);
    }
  }, 
  ".elements__list")

/*POPUPS */

/*CREATE INSTANCE OF POPUP WITH IMG */
const popupWithImage = new PopupWithImage(".popup_img")
popupWithImage.setEventListeners()

/*CREATE INSTANCE OF POPUP ADD*/
const popupWithFormAdd = new PopupWithForm(
  ".popup_add", 
  (obj) => {
    api.addCard(obj)
    .then((res)=>{
      const card = createCard(res, "#card");
      const cardElement = card.generateCard();
      addCards.addItem(cardElement, false)
    })
  })
popupWithFormAdd.setEventListeners()

/* CREATE INSTANCE POPUP EDIT*/
const userInfo = new UserInfo({userName: ".profile__username", aboutUser: ".profile__position", userAvatar: ".profile__avatar"})

const popupWithFormEdit = new PopupWithForm(".popup_edit", (obj)=>{
  api.editProfileInfo(obj)
    .then((res)=>{
      userInfo.setUserInfo(res)
    })
    .catch((err)=>{
      console.log(`Error: ${err}`)
    })
  })
popupWithFormEdit.setEventListeners()

popupWithFormAvatar = new PopupWithForm(
  ".popup_add", 
  (obj) => {
    api.addCard(obj)
    .then((res)=>{
      const card = createCard(res, "#card");
      const cardElement = card.generateCard();
      addCards.addItem(cardElement, false)
    })
  })


/*ADD LISTENERS */
profileButtonAdd.addEventListener("click", () => {
  validatorFormAdd.hideInputError(formAdd);
  validatorFormAdd.setButtonState()
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
