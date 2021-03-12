let likeButton=document.querySelector(".place__like-button")
let profileButtonAdd=document.querySelectorAll(".profile__button_add")
let profileButtonEdit=document.querySelectorAll(".profile__button_edit")

console.log(likeButton)
likeButton.addEventListener("click", function() {
  likeButton.classList.toggle("place__like-button_enable")
});