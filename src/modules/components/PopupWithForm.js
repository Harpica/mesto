import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._inputs = this._formElement.querySelectorAll('.popup__input');
    this._submitButton = this._formElement.querySelector('.popup__button');
    this._inputsValues = {};
    this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues() {
    this._inputs.forEach((input) => {
      this._inputsValues[input.name] = input.value;
    });
    return this._inputsValues;
  }
  setInputValues(values) {
    for (let i = 0; i < this._inputs.length; i++) {
      this._inputs[i].value = values[i];
    }
  }
  open() {
    super.open();
    this._inputs[0].focus();
  }
  close() {
    super.close();
    this._formElement.reset();
  }
  _setEventListeners() {
    super._setEventListeners();
    this._formElement = this._popupElement.querySelector('.popup__form');
    this._formElement.addEventListener('submit', (event) => {
      event.preventDefault();
      this.renderLoading(true);
      this._handleFormSubmit(this._getInputValues());
    });
  }
  renderLoading(isLoading) {
    if (isLoading === true) {
      this._submitButton.value = 'Сохранение...';
    } else {
      this._submitButton.value = 'Сохранить';
    }
  }
}
