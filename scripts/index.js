/*DEFINE VAR*/
let profileButtonAdd=document.querySelector(".profile__button_add")
let profileButtonEdit=document.querySelector(".profile__button_edit")
let closeButtonPopup=document.querySelector(".popup__close-button")

let popup=document.querySelector(".popup")
let popupForm=document.querySelector(".popup__container")

let userName=document.querySelector(".profile__username")
let position=document.querySelector(".profile__position")
let inputUserName=document.querySelector(".popup__username_input")
let inputPosition=document.querySelector(".popup__position_input")

/*DEFINE FUNCTIONS*/
function openPopup() {
  popup.classList.add("popup_opened")
  inputUserName.value=userName.textContent

  inputPosition.value=position.textContent
}

function closePopup() {
  popup.classList.remove("popup_opened")
}

function submitPopup(evt) {
  evt.preventDefault()
  userName.textContent=inputUserName.value
  position.textContent=inputPosition.value
  closePopup()
}

/*ADD LISTENERS */
profileButtonEdit.addEventListener("click", openPopup);
closeButtonPopup.addEventListener("click", closePopup);
popupForm.addEventListener("submit", submitPopup);
