export default class Api {
  constructor(config) {
    this._url = config.url;
    this._header = config.headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  async getUserInfo() {
    const res = await fetch(`${this._url}/users/me`, { headers: this._header });
    return this._checkResponse(res);
  }

  async getElements() {
    const res = await fetch(`${this._url}/cards`, { headers: this._header });
    return this._checkResponse(res);
  }

  async editProfileInfo(name, about) {
    const res = await fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._header,
      body: JSON.stringify({ name, about }),
    });
    return this._checkResponse(res);
  }

  async addCard(name, link) {
    const res = await fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._header,
      body: JSON.stringify({ name, link }),
    });
    return this._checkResponse(res);
  }

  async putLike(elementId) {
    const res = await fetch(`${this._url}/cards/${elementId}/likes`, {
      method: 'PUT',
      headers: this._header
    });
    return this._checkResponse(res);
  }

  async deleteLike(elementId) {
    const res = await fetch(`${this._url}/cards/${elementId}/likes`, {
      method: 'DELETE',
      headers: this._header
    });
    return this._checkResponse(res);
  }

  async changeAvatarIcon(avatar) {
    const res = await fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._header,
      body: JSON.stringify({ avatar }),
    });
    return this._checkResponse(res);
  }

  async removeElement(elementId) {
    const res = await fetch(`${this._url}/cards/${elementId}`, {
      method: 'DELETE',
      headers: this._header,
    });
    return this._checkResponse(res);
  }
}