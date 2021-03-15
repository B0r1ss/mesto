let likeButtons=document.querySelectorAll(".place__like-button")
let profileButtonAdd=document.querySelector(".profile__button_add")
let profileButtonEdit=document.querySelector(".profile__button_edit")
let closeButtonPopup=document.querySelector(".popup__close-button")

let popup=document.querySelector(".popup")
let popupForm=document.querySelector(".popup__container")

let username=document.querySelector(".profile__username")
let position=document.querySelector(".profile__position")
let inputUsername=document.querySelectorAll(".popup__input")[0]
let inputPosition=document.querySelectorAll(".popup__input")[1]

likeButtons.forEach(element =>{element.addEventListener("click", function() {
  element.classList.toggle("place__like-button_enable")
  })
});

profileButtonEdit.addEventListener("click", function() {
  popup.classList.add("popup_opened")
  inputUsername.setAttribute('value', username.textContent)
  inputPosition.setAttribute('value', position.textContent)
});

closeButtonPopup.addEventListener("click", function() {
  popup.classList.remove("popup_opened")
});

popupForm.addEventListener("submit", function(evt) {
  evt.preventDefault()
  let popUsername=inputUsername.value
  let popPosition=inputPosition.value
  popup.classList.remove("popup_opened")
  document.querySelector(".profile__username").textContent=popUsername
  document.querySelector(".profile__position").textContent=popPosition
});
