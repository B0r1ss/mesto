/*DEFINE VAR*/
let profileButtonAdd=document.querySelector(".profile__button_add")
let profileButtonEdit=document.querySelector(".profile__button_edit")
let closeButtonPopup=document.querySelector(".popup__close-button")

let popup=document.querySelector(".popup")
let popupForm=document.querySelector(".popup__container")

let username=document.querySelector(".profile__username")
let position=document.querySelector(".profile__position")
let inputUsername=document.querySelectorAll(".input_username")
let inputPosition=document.querySelectorAll(".input_position")

/*DEFINE FUNCTIONS*/
function openPopup() {
  popup.classList.add("popup_opened")
  inputUsername=username.textContent
  inputPosition=position.textContent
}

function closePopup() {
  popup.classList.remove("popup_opened")
}

function submitPopup(evt) {
  evt.preventDefault()
  let popUsername=inputUsername.value
  let popPosition=inputPosition.value
  closeButtonPopup()
  username.textContent=popUsername
  position.textContent=popPosition
}

/*ADD LISTENERS */
profileButtonEdit.addEventListener("click", openPopup);
closeButtonPopup.addEventListener("click", closePopup);
popupForm.addEventListener("submit", submitPopup);
