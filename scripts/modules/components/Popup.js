class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
    this._closeButton = this._popupElement.querySelector('.close-button');
    this._container = this._popupElement.firstElementChild;
  }
  open() {
    this._popupElement.classList.add('popup_opened');
    this._popupElementpup.focus();
    document.addEventListener('keydown', this._handleEscClose.bind(this));
  }
  close() {
    this._popupElement.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose.bind(this));
  }
  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }
  setEventListeners() {
    this._closeButton.addEventListener('click', this.close.bind(this));
    this._popupElement.addEventListener('click', (event) => {
      if (!this._container.contains(event.target)) {
        close();
      }
    });
  }
}
