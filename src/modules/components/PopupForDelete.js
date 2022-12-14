import { Popup } from './Popup';

export class PopupForDelete extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
  }
  _setEventListeners() {
    super._setEventListeners();
    this._formElement = this._popupElement.querySelector('.popup__form');
    this._formElement.addEventListener('submit', (event) => {
      event.preventDefault();
      if (this._cardItem !== 'undefined' && this._card !== 'undefined') {
        console.log(this._cardItem);
        this._handleFormSubmit(this._cardItem, this._card);
      }
    });
  }
  setCardParam(cardItem, card) {
    this._cardItem = cardItem;
    this._card = card;
  }
}
