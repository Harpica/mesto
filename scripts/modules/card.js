import {imagePopup, openPopup, setButtonListener} from '../script.js';


export class Card {
  constructor(link, title, alt, elementSelector) {
    this._link = link;
    this._title = title;
    this._alt = alt;
    this._template = document.querySelector(elementSelector).content;
    this._cardElement = this._createCardElement();
    this._image = this._createCardImage();
    this._setEventListeners();
  }

  _createCardElement() {
    const cardElement = this._template.querySelector('.photos__element').cloneNode(true);
    cardElement.querySelector('.photos__title').textContent = this._title;
    return cardElement
  }
  _createCardImage() {
    const cardImage = this._cardElement.querySelector('.photos__image');
    cardImage.src = this._link;
    cardImage.alt = this._alt;
    return cardImage
  }
  _deleteElement() {
    this._cardElement.remove();
  }
  _likeElement(event) {
    const eventTarget = event.target;
    eventTarget.classList.toggle('like-button_active');
  }
  _openImageCard() {
    const image = imagePopup.querySelector('.popup__image');
    const title = imagePopup.querySelector('.popup__caption');
    image.src = this._link;
    image.alt = this._alt;
    title.textContent = this._title;

    openPopup(imagePopup);
  }
  _setEventListeners() {
    setButtonListener(this._cardElement, '.delete-button', () => {this._deleteElement() });
    setButtonListener(this._cardElement, '.like-button', this._likeElement);
    this._image.addEventListener('click', () => {
      this._openImageCard()
    });
  }
  getCardElement () {
    return this._cardElement
  }
}
