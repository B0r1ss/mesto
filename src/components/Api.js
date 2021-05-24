export default class Api {
  constructor(options) {
    this._options=options
  }

  getInitialCards() {
    return fetch("https://mesto.nomoreparties.co/v1/cohort-24/cards", {
      method: "GET",
      headers: {
        authorization: "0373998c-9611-494d-a876-3cfa268c14dc"
      }
    })
    .then(res => {
      if (res.ok) {
      return res.json()
      }
    })
    .catch(err => {
      console.log(`Ошибка GET CARD запроса ${err}`)
    })
  }

  postCard({name, link}) {
    fetch("https://mesto.nomoreparties.co/v1/cohort-24/cards", {
      method: "POST",
      headers: {
        authorization: "0373998c-9611-494d-a876-3cfa268c14dc",
        "content-type": "application/json"
      },
      body: JSON.stringify({
        "name": name,
        "link": link
      })
    })
    .then(res=>{
      if (!res.ok) {
        Promise.reject()
      }
    })
    .catch(err => {
      console.log(`Ошибка POST CARD запроса ${err}`)
    })
  }

  getUserInfo() {
    return fetch("https://mesto.nomoreparties.co/v1/cohort-24/users/me", {
      method: "GET",
      headers: {
        authorization: "0373998c-9611-494d-a876-3cfa268c14dc"
      }
    })
    .then(res => {
      if (res.ok) {
      return res.json()
      } else {
        Promise.reject()
      }
    })
    .catch(err => {
      console.log(`Ошибка GET USER запроса ${err}`)
    })
  }

  editProfileInfo({name, link}) {
    fetch("https://mesto.nomoreparties.co/v1/cohort-24/cards", {
      method: "PATCH",
      headers: {
        authorization: "0373998c-9611-494d-a876-3cfa268c14dc",
        "content-type": "application/json"
      },
      body: JSON.stringify({
        "name": name,
        "link": link
      })
    })
    .then(res=>{
      if (!res.ok) {
        Promise.reject()
      }
    })
    .catch(err => {
      console.log(`Ошибка POST CARD запроса ${err}`)
    })
  }

  // другие методы работы с API
}