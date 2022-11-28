import { Card } from './Card.js';
import {
  profilePopup,
  profileName,
  profileDescription,
  nameInput,
  jobInput,
  photosContainer,
} from './constants.js';

// Напишем универсальные функции открытия и закрытия попапов
function openPopup(popup) {
  popup.classList.add('popup_opened');
  popup.focus();
  document.addEventListener('keydown', closePopupWithEsc);
}

function closePopup(popup) {
  document.removeEventListener('keydown', closePopupWithEsc);
  popup.classList.remove('popup_opened');
}

// Закрывает попапы по клику на Esc
function closePopupWithEsc(evt) {
  if (evt.key === 'Escape') {
    const popup = document.querySelector('.popup_opened');
    closePopup(popup);
  }
}

// Проверяет, есть ли у popup свойство formValidate и, если есть, то вызывает для него removeInputErrors()
function checkAndRemoveInputErrors(popup) {
  if (popup.formValidator) {
    popup.formValidator.removeInputErrors();
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

// Создает карточку
function createCardElement(link, name, elementTemplate) {
  const card = new Card(link, name, elementTemplate);
  return card.getCardElement();
}

// Добавляет контейнер с фото на страницу
function renderCard(cardElement) {
  photosContainer.prepend(cardElement);
}

// Добавляет начальный массив фотографий на страницу
function addInitialPhotos(array) {
  array.forEach((element) => {
    renderCard(
      createCardElement(element.link, element.name, '#photos-element')
    );
  });
}


export {
  openPopup,
  closePopup,
  closePopupWithEsc,
  checkAndRemoveInputErrors,
  submitProfileForm,
  updateFormElement,
  setButtonListener,
  createCardElement,
  renderCard,
  addInitialPhotos,
};
