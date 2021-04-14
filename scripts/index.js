/*DEFINE VAR*/
const initialCards = [
  {
    name: "Архыз",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

const templateCard = document.querySelector("#card").content;
const elementsList = document.querySelector(".elements__list");
const profileButtonAdd = document.querySelector(".profile__button_add");
const profileButtonEdit = document.querySelector(".profile__button_edit");

const popupAdd = document.querySelector(".popup_add");
const popupEdit = document.querySelector(".popup_edit");
const popupImg = document.querySelector(".popup_img");

const popupFormAdd = popupAdd.querySelector(".popup__container");
const popupFormEdit = popupEdit.querySelector(".popup__container");

const closeButtonPopupAdd = popupAdd.querySelector(".popup__close-button");
const closeButtonPopupEdit = popupEdit.querySelector(".popup__close-button");
const closeButtonPopupImg = popupImg.querySelector(".popup__close-button");

const inputUserName = popupEdit.querySelector(".popup__input_username_input");
const inputPosition = popupEdit.querySelector(".popup__input_position_input");
const inputTitle = popupAdd.querySelector(".popup__input_title_input");
const inputLink = popupAdd.querySelector(".popup__input_link_input");

const userName = document.querySelector(".profile__username");
const position = document.querySelector(".profile__position");
const popupImgImage = popupImg.querySelector(".popup__image");
const popupImgTitle = popupImg.querySelector(".popup__title-image");

/*CREATE CARD*/
function createCard(obj) {
  const cardPlace = templateCard.cloneNode(true);
  const placeImage = cardPlace.querySelector(".place__image");
  const likeButton = cardPlace.querySelector(".place__like-button");
  const deleteButton = cardPlace.querySelector(".place__delete-button");

  cardPlace.querySelector(".place__image").src = String(obj.link);
  cardPlace.querySelector(".place__image").alt = String(obj.name);
  cardPlace.querySelector(".place__title").textContent = String(obj.name);

  placeImage.addEventListener("click", function (evt) {
    openPopupImage(evt.target);
  });
  likeButton.addEventListener("click", function (evt) {
    evt.target.classList.toggle("place__like-button_enable");
  });
  deleteButton.addEventListener("click", function (evt) {
    placeDelete(evt.target);
  });
  return cardPlace;
}

/*ADD CARDS FROM VAR'S */
initialCards.forEach((item) => {
  const card = createCard(item);
  elementsList.append(card);
});

/*DEFINE FUNCTIONS FOR LISTENERS*/
function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

function openPopup(popup) {
  popup.classList.add("popup_opened");
}

function openPopupEdit() {
  openPopup(popupEdit);
  inputUserName.value = userName.textContent;
  inputPosition.value = position.textContent;
}

function openPopupImage(place) {
  const image = place.src;
  const title = place.alt;
  popupImgTitle.textContent = title.textContent;
  popupImgImage.src = image;
  openPopup(popupImg);
}


function submitPopupEdit(evt) {
  evt.preventDefault();
  userName.textContent = inputUserName.value;
  position.textContent = inputPosition.value;
  closePopup(popupFormEdit.closest(".popup_edit"));
}

function submitPopupAdd(evt) {
  evt.preventDefault();
  const obj = {name: inputTitle.value,
               link: inputLink.value,
              }
  const cardAdd = createCard(obj);
  elementsList.prepend(cardAdd);
  closePopup(popupFormAdd.closest(".popup_add"));
  inputTitle.closest("form").reset()
}

function placeDelete(place) {
  place.parentElement.remove();
}

/*ADD LISTENERS */
profileButtonAdd.addEventListener("click", () => {
  openPopup(popupAdd)
});
closeButtonPopupAdd.addEventListener("click", () => {
  closePopup(popupAdd);
});
popupFormAdd.addEventListener("submit", submitPopupAdd);

profileButtonEdit.addEventListener("click", openPopupEdit);
closeButtonPopupEdit.addEventListener("click", () => {
  closePopup(popupEdit);
});
popupFormEdit.addEventListener("submit", submitPopupEdit);

closeButtonPopupImg.addEventListener("click", () => {
  closePopup(popupImg);
});

document.addEventListener("click", (evt)=>{
  if(evt.target.classList.contains("popup_opened")) {
    closePopup(evt.target)
    evt.target.querySelector("form").reset()
  }
})

document.addEventListener("keydown", (evt)=>{
  if(evt.key==='Escape') {
    closePopup(popupImg);
    closePopup(popupAdd);
    document.forms.add_form.reset()
    closePopup(popupEdit);
    document.forms.edit_profile.reset()
  }
})
