const profilePopup = document.querySelector('.profile-popup');
const addPopup = document.querySelector('.add-popup');
const imagePopup = document.querySelector('.image-popup');

const profileFormElement = document.querySelector('.profile-popup__form');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const nameInput = profileFormElement.querySelector('#input-name');
const jobInput = profileFormElement.querySelector('#input-description');

const newCardFormElement = document.querySelector('.add-popup__form');
const photoTitleInput = newCardFormElement.querySelector('.add-popup__input-title');
const photoLinkInput = newCardFormElement.querySelector('.add-popup__input-link');

const photosContainer = document.querySelector('.photos__list');


// Импортируем начальный массив карточек и классы
import { configValidation, initialPhotos } from './modules/constants.js';
import { Card } from './modules/Card.js';
import {FormValidator} from './modules/FormValidator.js';

// Создаем объекты с классом FormValidator для каждой формы
const newCardFormValidator = new FormValidator(configValidation, newCardFormElement);
const profileFormValidator = new FormValidator(configValidation, profileFormElement);


profilePopup.formValidator = profileFormValidator;
addPopup.formValidator = newCardFormValidator;
console.log(addPopup.formValidator._hasInvalidInput());


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
    if (popup.formValidator) {
        popup.formValidator.removeInputErrors();
    }
  }
}

// // Убирает ошибки к инпутам, если они есть
// function removeInputErrors(popup, configValidation) {
//   const inputs = Array.from(popup.querySelectorAll('.popup__input'));
//   if (hasInvalidInput(inputs)) {
//     const submitButton = popup.querySelector('.popup__button');
//     enableSubmitButton(submitButton, configValidation);
//     inputs.forEach((input) => {
//       const inputError = popup.querySelector(`#${input.name}-error`);
//       hideInputError(input, inputError, configValidation);
//     });
//   }
// }

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


// Добавляет контейнер с фото на страницу
function renderCard(photosElement) {
  photosContainer.prepend(photosElement);
}

// Добавляет начальный массив фотографий на страницу
function addInitialPhotos(array) {
  array.forEach((element) => {
    const card = new Card(
      element.link,
      element.name,
      element.alt,
      '#photos-element'
    );
    renderCard(card.getCardElement());
  });
}

// Надо очистить формы инпутов для добавления новой картинки
function clearInputs(form) {
  const inputs = Array.from(form.querySelectorAll('.popup__input'));
  inputs.forEach((element) => {
    element.value = '';
  });
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

  newCardFormValidator.disableSubmitButton();
});

setButtonListener(document, '.close-button', (event) => {
  const eventTarget = event.target;
  const popup = eventTarget.closest('.popup');
  closePopup(popup);
  // Убираем ошибки к формам, если они есть
  if (popup.formValidator) {
    popup.formValidator.removeInputErrors();
}
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
newCardFormElement.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const card = new Card(
    photoLinkInput.value,
    photoTitleInput.value,
    photoTitleInput.value,
    '#photos-element'
  );
  renderCard(card.getCardElement());
  closePopup(addPopup);
  clearInputs(newCardFormElement);
});

// Изменение данных профиля
profileFormElement.addEventListener('submit', submitProfileForm);

// Включаем валидацию
[newCardFormValidator, profileFormValidator].forEach((form) => {
  form.enableValidation();
});

export { imagePopup, openPopup, setButtonListener };
