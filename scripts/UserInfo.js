export default class UserInfo {
  constructor({userName, aboutUser}) {
    this._userName=userName
    this._aboutUser=aboutUser
  }

  getUserInfo() {
    this._userInfo={}
    this._userInfo["username"] = document.querySelector(this._userName)
    this._userInfo["about"] = document.querySelector(this._aboutUser)
    return this._userInfo
  }

  setUserInfo({username, about}) {
    document.querySelector(this._userName).textContent=username
    document.querySelector(this._aboutUser).textContent=about
  }
}