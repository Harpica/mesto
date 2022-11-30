import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imageEnlarged = this._popupElement.querySelector('.popup__image');
    this._caption = this._popupElement.querySelector('.popup__caption');
  }
  open(link, title) {
    super.open();
    this._imageEnlarged.src = link;
    this._imageEnlarged.alt = title;
    this._caption.textContent = title;
  }
}
