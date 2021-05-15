export default class UserInfo {
  constructor({userName, aboutUser}) {
    this._userName=userName
    this._aboutUser=aboutUser
  }

  getUserInfo() {
    this._userInfo={}
    this._userInfo["username"] = document.querySelector(this._userName).textContent
    this._userInfo["position"] = document.querySelector(this._aboutUser).textContent
    return this._userInfo
  }

  setUserInfo({username, position}) {
    document.querySelector(this._userName).textContent=username
    document.querySelector(this._aboutUser).textContent=position
  }
}