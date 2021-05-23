export class Api {

  constructor(baseUrl, contentType) {
    this._baseUrl = baseUrl;
    this._contentType = contentType;
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`,
      {
        credentials: 'include',
        headers: {
          'Content-Type': this._contentType,
        }
      }
    )
      .then(res => {
        if (!res.ok){
          return Promise.reject(res.status)
        } else{
          return res.json();
        }
      })
  }

  getUser(token) {
    return fetch(`${this._baseUrl}/users/me`,
      {
        credentials: 'include',
        headers:{
          'Content-Type': this._contentType,
        }
      }
    )
      .then(res => {
        if (!res.ok){
          return Promise.reject(res.status)
        } else{
            return res.json();
        }
      })
  }

  editUserInfo(name, about) {
    return fetch(`${this._baseUrl}/users/me`,{
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': this._contentType,
      },
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
      .then(res => {
        if (!res.ok){
          return Promise.reject(res.status)
        } else{
          return res.json();
        }
      })
  }

  addCard(name, link) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': this._contentType,
      },
      body: JSON.stringify({
        name: name,
        link: link,
      })
    })
      .then(res => {
        if (!res.ok){
          return Promise.reject(res.status)
        } else{
          return res.json();
        }
      })
  }

  putLike(_id, token) {
    return fetch(`${this._baseUrl}/cards/${_id}/likes`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        authorization: 'Bearer ' + token,
        'Content-Type': this._contentType,
      }
    })
      .then(res => {
        if (!res.ok){
          return Promise.reject(res.status)
        } else{
          return res.json();
        }
      })
  }

  removeLike(_id, token) {
    return fetch(`${this._baseUrl}/cards/${_id}/likes`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        authorization: 'Bearer ' + token,
        'Content-Type': this._contentType,
      }
    })
      .then(res => {
        if (!res.ok){
          return Promise.reject(res.status)
        } else{
          return res.json();
        }
      })
  }

  removeCard(_id, token) {
    return fetch(`${this._baseUrl}/cards/${_id}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        authorization: 'Bearer ' + token,
        'Content-Type': this._contentType,
      },
    })
      .then(res => {
        if (!res.ok){
          return Promise.reject(res.status)
        } else{
          return res.json();
        }
      })
  }

  changeAvatar(avatar, token) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        authorization: 'Bearer ' + token,
        'Content-Type': this._contentType,
      },
      body: JSON.stringify({
        avatar: avatar,
      })
    })
      .then(res => {
        if (!res.ok){
          return Promise.reject(res.status)
        } else{
          return res.json();
        }
      })
  }
  changeLikeCardStatus(_id, isLiked, token) {
    if(isLiked) {
      return  this.removeLike(_id, token);
    }else {
      return this.putLike(_id, token);
    }
  }
}


const api = new Api('https://api.mesto.examle.nomoredomains.club', 'application/json');

export default api;
