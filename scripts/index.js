const templateCard = document.querySelector("#card").content;
const elementsList = document.querySelector(".elements__list");
const profileButtonAdd = document.querySelector(".profile__button_add");
const profileButtonEdit = document.querySelector(".profile__button_edit");

const popupAdd = document.querySelector(".popup_add");
const popupEdit = document.querySelector(".popup_edit");
const popupImg = document.querySelector(".popup_img");

/*GET FORMS*/
const formAdd = document.forms.add_form
const formEdit = document.forms.edit_profile

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

function openPopupImage(place) {
  const image = place.src;
  const title = place.alt;
  popupImgTitle.textContent = title;
  popupImgImage.src = image;
  openPopup(popupImg);
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
  const cardAdd = createCard(obj);
  elementsList.prepend(cardAdd);
  closePopup(popupAdd);
  inputTitle.closest("form").reset();
  setButtonState(inputList, buttonElement, settingsValidate);
}

function placeDelete(place) {
  place.closest(".place").remove();
}

/*ADD LISTENERS */
profileButtonAdd.addEventListener("click", () => {
  const input = Array.from(
    formAdd.querySelectorAll(settingsValidate.inputSelector)
  );
  input.forEach((inputElement) => {
    hideInputError(formAdd, inputElement, settingsValidate);
  });
  openPopup(popupAdd);
});

closeButtonPopupAdd.addEventListener("click", () => {
  closePopup(popupAdd);
});

formAdd.addEventListener("submit", submitPopupAdd);

profileButtonEdit.addEventListener("click", () => {
  const input = Array.from(
    formEdit.querySelectorAll(settingsValidate.inputSelector)
  );
  input.forEach((inputElement) => {
    hideInputError(formEdit, inputElement, settingsValidate);
  });
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
