export class Api {

  constructor(baseUrl, contentType) {
    this._baseUrl = baseUrl;
    this._contentType = contentType;
  }

  getInitialCards(token) {
    return fetch(`${this._baseUrl}/cards`,
      {
        headers: {
          authorization: 'Bearer ' + token,
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
        headers:{
          authorization: 'Bearer ' + token,
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

  editUserInfo(name, about, token) {
    return fetch(`${this._baseUrl}/users/me`,{
      method: 'PATCH',
      headers: {
        authorization: 'Bearer ' + token,
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

  addCard(name, link, token) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: {
        authorization: 'Bearer ' + token,
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
  changeLikeCardStatus(_id, isLiked) {
    if(isLiked) {
      return  this.removeLike(_id);
    }else {
      return this.putLike(_id);
    }
  }
}


const api = new Api('http://api.mesto.nomoredomains.icu', 'application/json');

export default api;
