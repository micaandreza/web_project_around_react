
class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  getCardList() {
    return fetch(`${this._baseUrl}/cards`,{
        headers: this._headers
    })
    .then(this._handleResponse);
  }

  setUserInfo(data){
     return fetch(`${this._baseUrl}/users/me`,{
        method: "PATCH",
        headers: this._headers,
        body:JSON.stringify(
            data
        )})
    .then(this._handleResponse);
  }
  addCard(name, link){
    return fetch(`${this._baseUrl}/cards`,{
        method: "POST",
        headers: this._headers,
        body:JSON.stringify({
            name,
            link
        })})
        .then(this._handleResponse);
  }
  getUserInfo(){
    return fetch(`${this._baseUrl}/users/me`,{
        headers:this._headers
    })
    .then(this._handleResponse);

  }
  deleteCard(cardId){
    return fetch(`${this._baseUrl}/cards/${cardId}`,{
        method: "DELETE",
        headers: this._headers
    })
    .then(this._handleResponse);
  }
  changeLikeCardStatus(cardId, isLiked){
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`,{
        method: isLiked?   "PUT": "DELETE",
        headers: this._headers,
    })
    .then(this._handleResponse);
  }
  setUserAvatar(data){
    return fetch(`${this._baseUrl}/users/me/avatar`,{
        method: "PATCH",
        headers: this._headers,
        body:JSON.stringify(
           data
        )
    })
    .then(this._handleResponse);
  }
  _handleResponse(res){
    if(res.ok){
        return res.json();
    }
    return Promise.reject(`Erro:${res.status}`);
  }}
  const api = new Api({
  baseUrl: "https://around-api.pt-br.tripleten-services.com/v1",
  headers: {
    authorization: "9fae4d35-0c79-4fd8-9ff4-6273fb26abd2",
    "Content-Type": "application/json"
  }
});
  



export default api;