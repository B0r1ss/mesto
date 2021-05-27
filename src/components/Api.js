export default class Api {
  constructor({baseUrl, authKey}) {
    this._baseUrl = baseUrl;
    this._authKey = authKey;
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      method: "GET",
      headers: {
        authorization: this._authKey,
      },
    })
      .then((res) => {
        return this._getResponseData(res)
      })
  }

  addCard({ name, link }) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: {
        authorization: this._authKey,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    })
      .then((res) => {
        return this._getResponseData(res)
      })
  }

  delCard(cardId) {
    return fetch(
      `${this._baseUrl}/cards/${cardId}`,
      {
        method: "DELETE",
        headers: {
          authorization: this._authKey,
          "content-type": "application/json",
        },
      }
    )
      .then((res) => {
        return this._getResponseData(res)
      })
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: {
        authorization: this._authKey,
      },
    })
      .then((res) => {
        return this._getResponseData(res)
      })
  }

  editProfileInfo({ username, position }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: this._authKey,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        name: username,
        about: position,
      }),
    })
      .then((res) => {
        return this._getResponseData(res)
      })
  }

  editProfileAvatar(link) {
    return fetch(
      `${this._baseUrl}/users/me/avatar`,
      {
        method: "PATCH",
        headers: {
          authorization: this._authKey,
          "content-type": "application/json",
        },
        body: JSON.stringify({
          avatar: link,
        }),
      }
    )
      .then((res) => {
        return this._getResponseData(res)
      })
  }

  setLike(cardId) {
    return fetch(
      `${this._baseUrl}/cards/likes/${cardId}`,
      {
        method: "PUT",
        headers: {
          authorization: this._authKey,
          "content-type": "application/json",
        },
      }
    )
      .then((res) => {
        return this._getResponseData(res)
      })
  }

  delLike(cardId) {
    return fetch(
      `${this._baseUrl}/cards/likes/${cardId}`,
      {
        method: "DELETE",
        headers: {
          authorization: this._authKey,
          "content-type": "application/json",
        },
      }
    )
      .then((res) => {
        return this._getResponseData(res)
      })
  }
}
