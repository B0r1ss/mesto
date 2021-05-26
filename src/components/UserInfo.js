export default class UserInfo {
  constructor({userName, aboutUser, userAvatar}) {
    this._userName = document.querySelector(userName)
    this._aboutUser = document.querySelector(aboutUser)
    this._userAvatar = document.querySelector(userAvatar)
  }

  getUserInfo() {
    return {
      username: this._userName.textContent,
      position: this._aboutUser.textContent
  }
}

  setUserInfo({name, about, avatar}) {
    this._userName.textContent=name
    this._aboutUser.textContent=about
    this._userAvatar.style.backgroundImage=`url(${avatar})`
  }
}