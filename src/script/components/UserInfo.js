export default class UserInfo {
    constructor({ name, info }) {
      this._name = document.querySelector(name);
      this._info = document.querySelector(info);
    } 

  getUserInfo() {
    const profileData =  {
      name: this._name.textContent,
      info: this._info.textContent
    } 
    return profileData
  }

setUserInfo(inputData) {
      this._name.textContent = inputData.name
      this._info.textContent = inputData.info
    }
  } 


