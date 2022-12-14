import { Popup } from './Popup';

export class PopupForDelete extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._submitButton = this._formElement.querySelector('.popup__button');
  }
  _setEventListeners() {
    super._setEventListeners();
    this._formElement = this._popupElement.querySelector('.popup__form');
    this._formElement.addEventListener('submit', (event) => {
      event.preventDefault();
      this.renderLoading(true);
      if (this._cardItem !== 'undefined' && this._card !== 'undefined') {
        this._handleFormSubmit(this._cardItem, this._card);
      }
    });
  }
  setCardParam(cardItem, card) {
    this._cardItem = cardItem;
    this._card = card;
  }
  renderLoading(isLoading) {
    if (isLoading === true) {
      this._submitButton.value = 'Удаление...';
    } else {
      this._submitButton.value = 'Да';
    }
  }
}
