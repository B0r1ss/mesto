import "./index.css";

import Api from "../components/Api.js";
import Card from "../components/Cards.js";
import Section from "../components/Section";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import FormValidator from "../components/FormValidator.js";
import { settingsValidate } from "../utils/settings.js";
import { constants } from "../utils/constants.js";
import PopupConfirm from "../components/PopupConfurm";

/*VAR'S */
const elementsList = document.querySelector(".elements__list");
const profileButtonAdd = document.querySelector(".profile__button_add");
const profileButtonEdit = document.querySelector(".profile__button_edit");
const avatarEdit = document.querySelector(".profile__avatar");

const avatarPopup = document.querySelector(".popup_avatar");
const addPopup = document.querySelector(".popup_add");
const editPopup = document.querySelector(".popup_edit");
const confirmPopup = document.querySelector(".popup_confirm");

/*SAVE FORM BUTTONS*/
const addSave = addPopup.querySelector(".popup__button");
const editSave = editPopup.querySelector(".popup__button");
const avatarSave = avatarPopup.querySelector(".popup__button");
const deleteButton = confirmPopup.querySelector(".popup__button");

/*GET FORMS*/
const formAdd = document.forms.add_form;
const formEdit = document.forms.edit_profile;
const formEditAvatar = document.forms.edit_avatar;

/*GET INPUTS FROM EDIT FORM*/
const inputUserName = formEdit.querySelector(".popup__input_username_input");
const inputPosition = formEdit.querySelector(".popup__input_position_input");

/*VARS */
let currentUser = [];

/*CREATE API INSTANCE */
const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-24",
  authKey: "0373998c-9611-494d-a876-3cfa268c14dc",
});

/*GET USER INFO AND ADD TO PAGE */
api
  .getUserInfo()
  .then((res) => {
    currentUser = res;
    userInfo.setUserInfo(currentUser);
  })
  .catch((err) => {
    console.log(`Error: ${err}`);
  });

/*GET CARDS AND ADD IN PAGE*/
api
  .getInitialCards()
  .then((res) => {
    res.reverse();
    cardsContainer.renderItems(res);
  })
  .catch((err) => {
    console.log(`Error: ${err}`);
  });

/*CRETE INSTANCE OF CARD*/
function createCard(item, template) {
  const card = new Card(item, template, currentUser, {
    openPopupImage: () => {
      popupWithImage.open(item.name, item.link);
    },

    handleRemoveCard: () => {
      card._id = item._id;
      confirmPopupElement.open(card);
    },

    handleLikeClick: (evt) => {
      const likeAmount = evt.target
        .closest(".place__likes")
        .querySelector(".place__like-amount");
      card.like();
      if (evt.target.classList.contains("place__like-button_enable")) {
        api
          .setLike(item["_id"])
          .then((res) => {
            likeAmount.textContent = res.likes.length;
          })
          .catch((err) => {
            console.log(`Error: ${err}`);
          });
      } else {
        api
          .delLike(item["_id"])
          .then((res) => {
            likeAmount.textContent = res.likes.length;
          })
          .catch((err) => {
            console.log(`Error: ${err}`);
          });
      }
    },
  });
  return card;
}

/*ADD CARDS FROM VARS, CLASS CARD*/
const cardsContainer = new Section(
  {
    renderer: (item) => {
      const card = createCard(item, "#card");
      const cardElement = card.generateCard();
      cardsContainer.addItem(cardElement);
    },
  },
  ".elements__list"
);



/*POPUPS */

/*CREATE INSTANCE OF POPUP WITH IMG */
const popupWithImage = new PopupWithImage(".popup_img", constants);
popupWithImage.setEventListeners();

/*CREATE INSTANCE OF POPUP ADD*/
const popupWithFormAdd = new PopupWithForm(".popup_add", constants, (obj) => {
  addSave.textContent = "Сохранение...";
  api
    .addCard(obj)
    .then((res) => {
      const card = createCard(res, "#card");
      const cardElement = card.generateCard();
      cardsContainer.addItem(cardElement, false);
      popupWithFormAdd.close();
    })
    .catch((err) => {
      console.log(`Error: ${err}`);
    })
    .finally(() => {
      addSave.textContent = "Сохранить";
    });
});
popupWithFormAdd.setEventListeners();

/* CREATE INSTANCE POPUP EDIT*/
const userInfo = new UserInfo({
  userName: ".profile__username",
  aboutUser: ".profile__position",
  userAvatar: ".profile__avatar",
});

const popupWithFormEdit = new PopupWithForm(".popup_edit", constants, (obj) => {
  editSave.textContent = "Сохранение...";
  api
    .editProfileInfo(obj)
    .then((res) => {
      userInfo.setUserInfo(res);
      popupWithFormEdit.close();
    })
    .catch((err) => {
      console.log(`Error: ${err}`);
    })
    .finally(() => {
      editSave.textContent = "Сохраненить";
    });
});
popupWithFormEdit.setEventListeners();

/* CREATE INSTANCE POPUP EDIT AVATAR*/
const avatarPopupElement = new PopupWithForm(
  ".popup_avatar",
  constants,
  (item) => {
    avatarSave.textContent = "Сохранение...";
    api
      .editProfileAvatar(item.link)
      .then((res) => {
        userInfo.setUserInfo(res);
        avatarPopupElement.close();
      })
      .catch((err) => console.log(`Error: ${err}`))
      .finally(() => {
        avatarSave.textContent = "Сохранить";
      });
  }
);
avatarPopupElement.setEventListeners();

/* CREATE INSTANCE POPUP CONFURM*/
const confirmPopupElement = new PopupConfirm(
  ".popup_confirm",
  constants,
  (card) => {
    deleteButton.textContent = "Удаление...";
    api
      .delCard(card._id)
      .then(() => {
        card.deleteCard();
        confirmPopupElement.close();
      })
      .catch((err) => console.log(`Error ${err}`))
      .finally(() => {
        deleteButton.textContent = "Да";
      });
  }
);
confirmPopupElement.setEventListeners();


/*ADD LISTENERS */
profileButtonAdd.addEventListener("click", () => {
  validatorFormAdd.hideInputError(formAdd);
  validatorFormAdd.setButtonState();
  popupWithFormAdd.open();
});

profileButtonEdit.addEventListener("click", () => {
  validatorFormEdit.hideInputError(formEdit);
  const info = userInfo.getUserInfo();
  inputUserName.value = info.username;
  inputPosition.value = info.position;
  popupWithFormEdit.open();
});

avatarEdit.addEventListener("click", () => {
  validatorFormEditAvatar.hideInputError(formEditAvatar);
  validatorFormEditAvatar.setButtonState();
  avatarPopupElement.open();
});

/*ADD VALIDATOR FOR ALL FORMS, CLASS FORMVALIDATOR*/
const validatorFormAdd = new FormValidator(settingsValidate, formAdd);
validatorFormAdd.enableValidation();

const validatorFormEdit = new FormValidator(settingsValidate, formEdit);
validatorFormEdit.enableValidation();

const validatorFormEditAvatar = new FormValidator(
  settingsValidate,
  formEditAvatar
);
validatorFormEditAvatar.enableValidation();
