import { Popup } from './Popup.js';

export class PopupForDelete extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._submitButton = this._formElement.querySelector('.popup__button');
    this._submitButtonText = this._submitButton.value;
  }
  _setEventListeners() {
    super._setEventListeners();
    this._formElement = this._popupElement.querySelector('.popup__form');
    this._formElement.addEventListener('submit', (event) => {
      event.preventDefault();
      this.renderLoading(true);
      this._handleFormSubmit(this._cardItem, this._card);
    });
  }
  setCardParam(cardItem, card) {
    this._cardItem = cardItem;
    this._card = card;
  }
  renderLoading(isLoading, loadingText = 'Удаление...') {
    if (isLoading === true) {
      this._submitButton.value = loadingText;
    } else {
      this._submitButton.value = this._submitButtonText;
    }
  }
}
