// Импортируем начальный константы, функции, класс
import {
  configValidation,
  initialPhotos,
  profilePopup,
  addPopup,
  popups,
  profileFormElement,
  profileName,
  profileDescription,
  nameInput,
  jobInput,
  newCardFormElement,
  photoTitleInput,
  photoLinkInput,
} from './modules/constants.js';
import {
  openPopup,
  closePopup,
  checkAndRemoveInputErrors,
  submitProfileForm,
  updateFormElement,
  setButtonListener,
  createCardElement,
  renderCard,
  addInitialPhotos,
} from './modules/utils.js';
import { FormValidator } from './modules/FormValidator.js';

// Создаем объекты с классом FormValidator для каждой формы
const newCardFormValidator = new FormValidator(
  configValidation,
  newCardFormElement
);
const profileFormValidator = new FormValidator(
  configValidation,
  profileFormElement
);

// Добавляем в свойство popup'ов объект класса FormValidator, чтобы использовать его публичный метод removeInputErrors()
profilePopup.formValidator = profileFormValidator;
addPopup.formValidator = newCardFormValidator;

// Включаем валидацию
[newCardFormValidator, profileFormValidator].forEach((form) => {
  form.enableValidation();
});

// Добавляем первичный массив карточек на страницу
addInitialPhotos(initialPhotos);

//Создаем кнопки
setButtonListener(document, '.edit-button', () => {
  checkAndRemoveInputErrors(profilePopup);
  updateFormElement(
    [nameInput, jobInput],
    [profileName.textContent, profileDescription.textContent]
  );
  openPopup(profilePopup);
  nameInput.focus();
});

setButtonListener(document, '.add-button', () => {
  checkAndRemoveInputErrors(addPopup);
  updateFormElement([photoTitleInput, photoLinkInput], ['', '']);
  openPopup(addPopup);
  photoTitleInput.focus();
  newCardFormValidator.disableSubmitButton();
});

setButtonListener(document, '.close-button', (event) => {
  const eventTarget = event.target;
  const popup = eventTarget.closest('.popup');
  closePopup(popup);
});

// Закрытие попапов по клику вне контейнера
popups.forEach((popup) => {
  popup.addEventListener('click', (event) => {
    const container = popup.firstElementChild;
    if (!container.contains(event.target)) {
      closePopup(popup);
    }
  });
});

// Добавление новых карточек
newCardFormElement.addEventListener('submit', (evt) => {
  evt.preventDefault();
  renderCard(
    createCardElement(
      photoLinkInput.value,
      photoTitleInput.value,
      '#photos-element'
    )
  );
  closePopup(addPopup);
  newCardFormElement.reset();
});

// Изменение данных профиля
profileFormElement.addEventListener('submit', submitProfileForm);
