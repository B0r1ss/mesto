/*DEFINE VAR*/
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
]; 

const templateCard=document.querySelector("#card").content
const elementsList=document.querySelector(".elements__list")
const profileButtonAdd=document.querySelector(".profile__button_add")
const profileButtonEdit=document.querySelector(".profile__button_edit")

const popupAdd=document.querySelector(".popup_add")
const popupEdit=document.querySelector(".popup_edit")
const popupImg=document.querySelector(".popup_img")

const popupFormAdd=popupAdd.querySelector(".popup__container")
const popupFormEdit=popupEdit.querySelector(".popup__container")

const closeButtonPopupAdd=popupAdd.querySelector(".popup__close-button")
const closeButtonPopupEdit=popupEdit.querySelector(".popup__close-button")
const closeButtonPopupImg=popupImg.querySelector(".popup__close-button")

let inputUserName=popupEdit.querySelector(".popup__input_username_input")
let inputPosition=popupEdit.querySelector(".popup__input_position_input")
let inputTitle=popupAdd.querySelector(".popup__input_title_input")
let inputLink=popupAdd.querySelector(".popup__input_link_input")

let userName=document.querySelector(".profile__username")
let position=document.querySelector(".profile__position")
let popupImgImage=popupImg.querySelector(".popup__image")
let popupImgTitle=popupImg.querySelector(".popup__title-image")


/*CREATE CARD*/
function addCard(name=[], link=[]) {
  const cardPlace=templateCard.cloneNode(true)
  const placeImage=cardPlace.querySelector(".place__image")
  const likeButton=cardPlace.querySelector(".place__like-button")
  const deleteButton=cardPlace.querySelector(".place__delete-button")

  cardPlace.querySelector(".place__image").src=String(link)
  cardPlace.querySelector(".place__image").alt=String(name)
  cardPlace.querySelector(".place__title").textContent=String(name)

  placeImage.addEventListener("click", function(evt) {
    openPopupImage(evt.target)
  })
  likeButton.addEventListener("click", function(evt) {
    evt.target.classList.toggle("place__like-button_enable")
  })
  deleteButton.addEventListener("click", function(evt) {
    placeDelete(evt.target)
  })
  return cardPlace
}

/*ADD CARDS FROM VAR'S */
initialCards.forEach((item) => {
  let card=addCard(item.name, item.link)
  elementsList.append(card)
})

/*DEFINE FUNCTIONS FOR LISTENERS*/
function openPopupEdit() {
  popupEdit.classList.add("popup_opened")
  inputUserName.value=userName.textContent
  inputPosition.value=position.textContent
}

function openPopupAdd() {
  popupAdd.classList.add("popup_opened")
}

function openPopupImage(place) {
  const image=place.src
  const title=place.parentElement.querySelector(".place__title")
  popupImgTitle.textContent=title.textContent
  popupImgImage.src=image
  popupImg.classList.add("popup_opened")
}

function closePopup(popup) {
  popup.parentElement.classList.remove("popup_opened")
}

function submitPopupEdit(evt) {
  evt.preventDefault()
  userName.textContent=inputUserName.value
  position.textContent=inputPosition.value
  closePopup(popupFormEdit)
}

function submitPopupAdd(evt) {
  evt.preventDefault()
  const cardAdd=addCard(inputTitle.value, inputLink.value)
  elementsList.prepend(cardAdd)
  closePopup(popupFormAdd)
}

function placeDelete(place) {
  place.parentElement.remove()
}


/*ADD LISTENERS */
profileButtonAdd.addEventListener("click", openPopupAdd)
closeButtonPopupAdd.addEventListener("click", function (evt) {
  closePopup(evt.target.parentElement)
})
popupFormAdd.addEventListener("submit", submitPopupAdd);

profileButtonEdit.addEventListener("click", openPopupEdit)
closeButtonPopupEdit.addEventListener("click", function (evt) {
  closePopup(evt.target.parentElement)
})
popupFormEdit.addEventListener("submit", submitPopupEdit);

closeButtonPopupImg.addEventListener("click", function (evt) {
  closePopup(evt.target.parentElement)
})
