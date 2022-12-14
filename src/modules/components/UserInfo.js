export class UserInfo {
  constructor(nameElement, jobElement, avatarElement) {
    this._nameElement = nameElement;
    this._jobElement = jobElement;
    this._userValues = {};
    this._avatar = avatarElement;
  }
  getUserValues() {
    return this._userValues;
  }
  setUserInfo(nameValue, jobValue) {
    this._nameElement.textContent = nameValue;
    this._jobElement.textContent = jobValue;
    this.setUserValue('name', nameValue);
    this.setUserValue('job', jobValue);
  }
  setUserAvatar(link) {
    this._avatar.src = link;
  }
  setUserValue(valueName, value) {
    this._userValues[valueName] = value;
  }
}
