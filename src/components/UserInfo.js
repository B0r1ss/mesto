export default class UserInfo {
  constructor({userName, aboutUser}) {
    this._userName = document.querySelector(userName)
    this._aboutUser = document.querySelector(aboutUser)
  }

  getUserInfo() {
    return {
      username: this._userName.textContent,
      position: this._aboutUser.textContent
  }  
}

  setUserInfo({name, about}) {
    this._userName.textContent=name
    this._aboutUser.textContent=about
  }
}