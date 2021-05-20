export const BASE_URL = 'https://api.mesto.examle.nomoredomains.club';

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email, password})
  })
    .then(res => {
      if (!res.ok){
        console.log('Регистрация')
        return Promise.reject(res.status)
      } else{
        return res.json();
      }
    })
};

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email, password})
  })
    .then(res => {
      if (!res.ok){
        return Promise.reject(res.status)
      } else{
        return res.json();
      }
    })
};

export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
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
