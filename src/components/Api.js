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

  addCard({name, link}) {
    return fetch("https://mesto.nomoreparties.co/v1/cohort-24/cards", {
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
      if (res.ok) {
        return res.json()
      }
    })
    .catch(err => {
      Promise.reject(`Ошибка POST CARD запроса ${err}`)
    })
  }

  delCard(cardId) {
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-24/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: "0373998c-9611-494d-a876-3cfa268c14dc",
        "content-type": "application/json"
      },
    })
    .then(res=>{
      if (res.ok) {
        return res.json()
      }
    })
    .catch(err => {
      Promise.reject(`Ошибка DEL CARD запроса ${err}`)
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
      }
    })
    .catch(err => {
      Promise.reject(`Ошибка GET USER запроса ${err}`)
    })
  }

  editProfileInfo({username, position}) {
    return fetch("https://mesto.nomoreparties.co/v1/cohort-24/users/me", {
      method: "PATCH",
      headers: {
        authorization: "0373998c-9611-494d-a876-3cfa268c14dc",
        "content-type": "application/json"
      },
      body: JSON.stringify({
        "name": username,
        "about": position
      })
    })
    .then(res=>{
      if (res.ok) {
        return res.json()
      }
    })
    .catch(err => {
      Promise.reject(`Ошибка EDIT PROFILE INFO запроса ${err}`)
    })
  }

  setLike(cardId) {
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-24/cards/likes/${cardId}`, {
      method: "PUT",
      headers: {
        authorization: "0373998c-9611-494d-a876-3cfa268c14dc",
        "content-type": "application/json"
      },
    })
    .then(res=>{
      if (res.ok) {
        return res.json()
      }
    })
    .catch(err => {
      Promise.reject(`Ошибка SET LIKE запроса ${err}`)
    })
  }

  
  delLike(cardId) {
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-24/cards/likes/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: "0373998c-9611-494d-a876-3cfa268c14dc",
        "content-type": "application/json"
      },
    })
    .then(res=>{
      if (res.ok) {
        return res.json()
      }
    })
    .catch(err => {
      Promise.reject(`Ошибка DEL LIKE запроса ${err}`)
    })
  }
  // другие методы работы с API
}