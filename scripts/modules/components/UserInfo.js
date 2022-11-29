export class UserInfo {
  constructor(nameElement, jobElement) {
    this._nameElement = nameElement;
    this._jobElement = jobElement;
    this._userValues = {};
  }
  getUserInfo() {
    this._userValues.name = this._nameElement.textContent;
    this._userValues.job = this._jobElement.textContent;
    return this._userValues;
  }
  setUserInfo( name, job ) {
    this._nameElement.textContent = name;
    this._jobElement.textContent = job;
  }
}
