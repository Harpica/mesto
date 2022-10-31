const profilePopup = document.querySelector('.profile-popup');
const addPopup = document.querySelector('.add-popup');
const imagePopup = document.querySelector('.image-popup');

const profileFormElement = document.querySelector('.profile-popup__form');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const nameInput = profileFormElement.querySelector('#input-name');
const jobInput = profileFormElement.querySelector('#input-description');

const photosContainer = document.querySelector('.photos__list');

// Импортируем начальный массив карточек
import { initialPhotos } from './modules/constants.js';

// Напишем универсальные функции открытия и закрытия попапов
function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  if (!(popup.querySelector('.popup__input') === null)) {
    removeErrorClass(popup);
  }
}

// Изменить данные профиля
function submitProfileForm(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closePopup(profilePopup);
}

function updateprofileFormElement() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
}

// Функция для валидация формы, чтобы нельзя было отправить пустую форму
function validateInput(inputField, button) {
  if (inputField.value.length === 0) {
    button.setAttribute('disabled', true);
    inputField.classList.add('popup__input_error');
  } else {
    button.removeAttribute('disabled', false);
    inputField.classList.remove('popup__input_error');
  }
}

// Убираем модификаторы error: если данные стерли, но потом закрыли форму без сохранения изменений
function removeErrorClass(popup) {
  const inputs = Array.from(popup.querySelectorAll('.popup__input'));
  inputs.forEach((element) => {
    element.classList.remove('popup__input_error');
  });
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
  const photosTemplate = document.querySelector('#photos-element').content;
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
  const image = imagePopup.querySelector('.popup__image');
  const title = imagePopup.querySelector('.popup__caption');
  image.src = photosElement.querySelector('.photos__image').src;
  title.textContent = photosElement.querySelector('.photos__title').textContent;
  openPopup(imagePopup);
}

//Создаем кнопки
setButtonListener(document, '.edit-button', () => {
  updateprofileFormElement();
  openPopup(profilePopup, nameInput);
  nameInput.focus();
});

setButtonListener(document, '.add-button', () => {
  openPopup(addPopup);
  photoTitleInput.focus();
});

setButtonListener(document, '.close-button', (event) => {
  const eventTarget = event.target;
  const popup = eventTarget.closest('.popup');
  closePopup(popup);
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

// Валидация форм
const inputs = Array.from(document.querySelectorAll('.popup__input'));
inputs.forEach((input) => {
  input.addEventListener('input', () => {
    const button = input.parentElement.querySelector('.popup__button');
    validateInput(input, button);
  });
});

// Добавление новых карточек
const formAddCard = document.querySelector('.add-popup__form');
const photoTitleInput = formAddCard.querySelector('.add-popup__input-title');
const photoLinkInput = formAddCard.querySelector('.add-popup__input-link');
formAddCard.addEventListener('submit', (evt) => {
  evt.preventDefault();
  renderCard(
    createPhoto(
      photoLinkInput.value,
      photoTitleInput.value,
      photoTitleInput.value
    )
  );
  clearInputs(formAddCard);
  closePopup(addPopup);
});

// Изменение данных профиля
profileFormElement.addEventListener('submit', submitProfileForm);
