export class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
    this._closeButton = this._popupElement.querySelector('.close-button');
    this._container = this._popupElement.firstElementChild;
    // Чтобы можно было воспользоваться removeEventLisneter
    this._keydownHandler = this._handleEscClose.bind(this);
    this._setEventListeners();
  }
  open() {
    this._popupElement.classList.add('popup_opened');
    document.addEventListener('keydown', this._keydownHandler);
  }
  close() {
    document.removeEventListener('keydown', this._keydownHandler);
    this._popupElement.classList.remove('popup_opened');
  }
  _handleEscClose(event) {
    if (event.key === 'Escape') {
      this.close();
    }
  }
  _setEventListeners() {
    this._closeButton.addEventListener('click', this.close.bind(this));
    this._popupElement.addEventListener('mousedown', (event) => {
      if (!this._container.contains(event.target)) {
        this.close();
      }
    });
  }
}
