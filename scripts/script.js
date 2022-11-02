const profilePopup = document.querySelector('.profile-popup');
const addPopup = document.querySelector('.add-popup');
const imagePopup = document.querySelector('.image-popup');

const profileFormElement = document.querySelector('.profile-popup__form');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const nameInput = profileFormElement.querySelector('#input-name');
const jobInput = profileFormElement.querySelector('#input-description');

const formAddCard = document.querySelector('.add-popup__form');
const photoTitleInput = formAddCard.querySelector('.add-popup__input-title');
const photoLinkInput = formAddCard.querySelector('.add-popup__input-link');

const photosContainer = document.querySelector('.photos__list');
const photosTemplate = document.querySelector('#photos-element').content;

const image = imagePopup.querySelector('.popup__image');
const title = imagePopup.querySelector('.popup__caption');

// Импортируем начальный массив карточек
import { configValidation, initialPhotos } from './modules/constants.js';
import { disableSubmitButton } from './modules/validation.js';
import { enableSubmitButton } from './modules/validation.js';
import { hasInvalidInput } from './modules/validation.js';
import { hideInputError } from './modules/validation.js';
import { enableValidation } from './modules/validation.js';

// Напишем универсальные функции открытия и закрытия попапов
function openPopup(popup) {
  popup.classList.add('popup_opened');
  // чтобы на image-popup начали рабовать слушатели с keydowm (установлен атрибут для него с tabindex='0')
  popup.focus();
  popup.addEventListener('keydown', closePopupWithEsc);
}

function closePopup(popup) {
  popup.removeEventListener('keydown', closePopupWithEsc);
  popup.classList.remove('popup_opened');
}

// Закрывает попапы по клику на Esc
function closePopupWithEsc(evt) {
  if (evt.key === 'Escape') {
    const popup = popups.find((popup) =>
      popup.classList.contains('popup_opened')
    );
    closePopup(popup);
    removeInputErrors(popup, configValidation);
  }
}

// Убирает ошибки к инпутам, если они есть
function removeInputErrors(popup, configValidation) {
  const inputs = Array.from(popup.querySelectorAll('.popup__input'));
  if (hasInvalidInput(inputs)) {
    const submitButton = popup.querySelector('.popup__button');
    enableSubmitButton(submitButton, configValidation);
    inputs.forEach((input) => {
      const inputError = popup.querySelector(`#${input.name}-error`);
      hideInputError(input, inputError, configValidation);
    });
  }
}

// Изменить данные профиля
function submitProfileForm(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closePopup(profilePopup);
}

// Обновить формы, принимает на вход 2 массива равной длины, присваивает попарно инпутам значения из массива values
function updateFormElement(inputs, values) {
  for (let i = 0; i < inputs.length; i++) {
    inputs[i].value = values[i];
  }
}

// Создает кнопку. buttonClass указывается в формате '.buttonClass'
function setButtonListener(container, buttonClass, action) {
  const buttons = Array.from(container.querySelectorAll(buttonClass));
  buttons.forEach((button) => {
    button.addEventListener('click', action);
  });
}

// Создает контейнер с фото и рабочими кнопками
function createPhoto(link, title, alt = 'Иллюстрация') {
  const photosElement = photosTemplate
    .querySelector('.photos__element')
    .cloneNode(true);
  const photosImage = photosElement.querySelector('.photos__image');
  photosImage.src = link;
  photosImage.alt = alt;
  photosElement.querySelector('.photos__title').textContent = title;

  setButtonListener(photosElement, '.delete-button', deleteElement);
  setButtonListener(photosElement, '.like-button', likeElement);
  const image = photosElement.querySelector('.photos__image');
  image.addEventListener('click', openImageCard);

  return photosElement;
}

// Добавляет контейнер с фото на страницу
function renderCard(photosElement) {
  photosContainer.prepend(photosElement);
}

// Добавляет начальный массив фотографий на страницу
function addInitialPhotos(array) {
  array.forEach((element) => {
    renderCard(createPhoto(element.link, element.name));
  });
}

// Надо очистить формы инпутов для добавления новой картинки
function clearInputs(form) {
  const inputs = Array.from(form.querySelectorAll('.popup__input'));
  inputs.forEach((element) => {
    element.value = '';
  });
}

// Удаление карточек через delete-button
function deleteElement(event) {
  const eventTarget = event.target;
  const photosElement = eventTarget.closest('.photos__element');
  photosElement.remove();
}

// Лайк карточки
function likeElement(event) {
  const eventTarget = event.target;
  eventTarget.classList.toggle('like-button_active');
}

// Увеличение изображение при клике на него
function openImageCard(event) {
  const eventTarget = event.target;
  const photosElement = eventTarget.closest('.photos__element');
  image.src = photosElement.querySelector('.photos__image').src;
  title.textContent = photosElement.querySelector('.photos__title').textContent;
  image.alt = photosElement.querySelector('.photos__title').textContent;
  openPopup(imagePopup);
}

//Создаем кнопки
setButtonListener(document, '.edit-button', () => {
  updateFormElement(
    [nameInput, jobInput],
    [profileName.textContent, profileDescription.textContent]
  );
  openPopup(profilePopup);
  nameInput.focus();
});

setButtonListener(document, '.add-button', () => {
  updateFormElement([photoTitleInput, photoLinkInput], ['', '']);
  openPopup(addPopup);
  photoTitleInput.focus();

  const submitButton = addPopup.querySelector('.popup__button');
  disableSubmitButton(submitButton, configValidation);
});

setButtonListener(document, '.close-button', (event) => {
  const eventTarget = event.target;
  const popup = eventTarget.closest('.popup');
  closePopup(popup);
  // Убираем ошибки к формам, если они есть
  removeInputErrors(popup, configValidation);
});

// Закрытие попапов по клику вне контейнера
const popups = Array.from(document.querySelectorAll('.popup'));
popups.forEach((popup) => {
  popup.addEventListener('click', (event) => {
    const container = popup.firstElementChild;
    if (!container.contains(event.target)) {
      closePopup(popup);
    }
  });
});

// Добавляем первичный массив карточек на страницу
addInitialPhotos(initialPhotos);

// Добавление новых карточек
formAddCard.addEventListener('submit', (evt) => {
  evt.preventDefault();
  renderCard(
    createPhoto(
      photoLinkInput.value,
      photoTitleInput.value,
      photoTitleInput.value
    )
  );
  closePopup(addPopup);
  clearInputs(formAddCard);
});

// Изменение данных профиля
profileFormElement.addEventListener('submit', submitProfileForm);

// Включаем валидацию
enableValidation(configValidation);
