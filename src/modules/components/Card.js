import { setButtonListener} from '../utils.js';

export class Card {
  constructor(link, title, elementSelector, handleCardClick) {
    this._link = link;
    this._title = title;
    this._template = document.querySelector(elementSelector).content;
    this._cardElement = this._createCardElement();
    this._image = this._createCardImage();
    this._handleCardClick = handleCardClick;
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
    cardImage.alt = this._title;
    return cardImage
  }
  _deleteElement() {
    this._cardElement.remove();
  }
  _likeElement(event) {
    const eventTarget = event.target;
    eventTarget.classList.toggle('like-button_active');
  }
  _setEventListeners() {
    setButtonListener(this._cardElement, '.delete-button', () => {this._deleteElement() });
    setButtonListener(this._cardElement, '.like-button', this._likeElement);
    this._image.addEventListener('click', () => {
      this._handleCardClick(this._link, this._title);
    });
  }
  getCardElement () {
    return this._cardElement
  }
}
