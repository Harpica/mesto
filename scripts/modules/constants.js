export const profilePopup = document.querySelector('.profile-popup');
export const addPopup = document.querySelector('.add-popup');
export const imagePopup = document.querySelector('.image-popup');
export const popups = Array.from(document.querySelectorAll('.popup'));

export const profileFormElement = document.querySelector('.profile-popup__form');
export const profileName = document.querySelector('.profile__name');
export const profileDescription = document.querySelector('.profile__description');
export const nameInput = profileFormElement.querySelector('#input-name');
export const jobInput = profileFormElement.querySelector('#input-description');

export const newCardFormElement = document.querySelector('.add-popup__form');
export const photoTitleInput = newCardFormElement.querySelector('.add-popup__input-title');
export const photoLinkInput = newCardFormElement.querySelector('.add-popup__input-link');

export const photosContainer = document.querySelector('.photos__list');


export const initialPhotos = [
  {
    name: 'Архыз',
    alt: 'Фото Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
  },
  {
    name: 'Челябинская область',
    alt: 'Фото Челябинской области',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
  },
  {
    name: 'Иваново',
    alt: 'Фото Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
  },
  {
    name: 'Камчатка',
    alt: 'Фото Камчатки',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
  },
  {
    name: 'Холмогорский район',
    alt: 'Фото Холмогорского района',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
  },
  {
    name: 'Байкал',
    alt: 'Фото Байкала',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
  },
];

export const configValidation = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};
