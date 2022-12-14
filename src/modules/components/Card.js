export class Card {
  constructor(link, title, cardParam, elementSelector) {
    this._link = link;
    this._title = title;
    // Создаем карточку и находим HTML элементы карточки
    this._template = document.querySelector(elementSelector).content;
    this._cardElement = this._createCardElement();
    this._image = this._createCardImage();
    this._likeButton = this._cardElement.querySelector('.like-button');
    this._deleteButton = this._cardElement.querySelector('.delete-button');
    this._likeCounter = this._cardElement.querySelector(
      '.photos__like-counter'
    );
    // Присваиваем параметры карточки
    this.setCardParam(cardParam);
  }

  _createCardElement() {
    const cardElement = this._template
      .querySelector('.photos__element')
      .cloneNode(true);
    cardElement.querySelector('.photos__title').textContent = this._title;
    return cardElement;
  }
  _createCardImage() {
    const cardImage = this._cardElement.querySelector('.photos__image');
    cardImage.src = this._link;
    cardImage.alt = this._title;
    return cardImage;
  }
  deleteElement() {
    this._cardElement.remove();
    this._cardElement = '';
  }
  _likeElement() {
    if (!this._isLiked) {
      this._likeButton.classList.add('like-button_active');
      this._isLiked = true;
    } else {
      this._likeButton.classList.remove('like-button_active');
      this._isLiked = false;
    }

    this._handleLikeButton(this._isLiked);
  }
  setLikeCouter(value) {
    this._likeCounter.textContent = value;
  }
  setCardParam(cardParam) {
    this.setLikeCouter(cardParam.numberOfLikes);
    this._cardID = cardParam.cardID;
    this._isOwner = cardParam.isOwner;
    this._isLiked = cardParam.isLiked;
    this._setInitialLike();
    this._setDeleteButton();
  }
  _setInitialLike() {
    if (this._isOwner && this._isLiked) {
      this._likeButton.classList.add('like-button_active');
    }
  }
  _setDeleteButton() {
    if (this._isOwnew === false) {
      this._deleteButton.classList.add('delete-button_display_none');
    }
  }
  setCardID(cardID) {
    this._cardID = cardID;
  }
  getCardElement() {
    return this._cardElement;
  }
  getValues() {
    return { name: this._title, link: this._link };
  }
  setCardActions(handleCardClick, handleLikeButton, handleDeleteButton) {
    this._handleCardClick = handleCardClick;
    this._handleLikeButton = handleLikeButton;
    this._handleDeleteButton = handleDeleteButton;
    this._setEventListeners();
  }
  _setEventListeners() {
    this._deleteButton.addEventListener('click', () => {
      this._handleDeleteButton();
    });
    this._likeButton.addEventListener('click', () => {
      this._likeElement();
    });
    this._image.addEventListener('click', () => {
      this._handleCardClick(this._link, this._title);
    });
  }
}
