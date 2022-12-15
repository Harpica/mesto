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
  setUserInfo({ name, about, avatar, _id }) {
    this._nameElement.textContent = name;
    this._jobElement.textContent = about;
    this.setUserAvatar(avatar);
    const obj = { name, about, avatar, _id };
    Object.keys(obj).forEach((key) => {
      this.setUserValue(`${key}`, obj[key]);
    });
  }
  setUserAvatar(link) {
    this._avatar.src = link;
  }
  setUserValue(valueName, value) {
    this._userValues[valueName] = value;
  }
}
