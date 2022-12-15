import './index.css'; // добавьте импорт главного файла стилей

// Импортируем начальный константы, функции, класс
import {
  configValidation,
  profileName,
  profileDescription,
  profileAvatar,
} from '../modules/constants.js';
import { setButtonListener, getCardRenderer } from '../modules/utils.js';
import { FormValidator } from '../modules/components/FormValidator.js';
import { PopupWithImage } from '../modules/components/PopupWithImage.js';
import { PopupWithForm } from '../modules/components/PopupWithForm.js';
import { Section } from '../modules/components/Section.js';
import { UserInfo } from '../modules/components/UserInfo.js';
import { Api } from '../modules/components/Api.js';
import { PopupForDelete } from '../modules/components/PopupForDelete.js';

// Создадим объект для общения с сервером
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-56',
  headers: {
    authorization: '28c8be99-8fcb-4f8e-afaa-96e6bec99f34',
    'Content-Type': 'application/json',
  },
});

// Создадим объект с данными пользователя
const userInfo = new UserInfo(profileName, profileDescription, profileAvatar);

// Создаем объекты с наследниками класса Popup
const imagePopup = new PopupWithImage('.image-popup');
const deletePopup = new PopupForDelete('.delete-popup', (cardItem, card) => {
  api
    .deleteCard(cardItem._id)
    .then(() => {
      card.deleteElement();
      deletePopup.close();
    })
    .catch((err) => console.log(err))
    .finally(() => deletePopup.renderLoading(false));
});
const profilePopup = new PopupWithForm('.profile-popup', (inputValues) => {
  api
    .setUserInfo(inputValues['profile-name'], inputValues['profile-job'])
    .then((user) => {
      userInfo.setUserInfo(user);
      profilePopup.close();
      profilePopup.renderLoading(false);
    })
    .catch((err) => console.log(err))
    .finally(() => profilePopup.renderLoading(false));
});
const addPopup = new PopupWithForm('.add-popup', (inputValues) => {
  api
    .postCard({
      name: inputValues['photo-title'],
      link: inputValues['photo-link'],
    })
    .then(getCardRenderer(api, userInfo, imagePopup, deletePopup))
    .then((cardElement) => {
      photosSection.setElement(cardElement);
      addPopup.close();
      addPopup.renderLoading(false);
    })
    .catch((err) => console.log(err))
    .finally(() => addPopup.renderLoading(false));
});
const avatarPopup = new PopupWithForm('.avatar-popup', (inputValues) => {
  api
    .setUserAvatar(inputValues['avatar-link'])
    .then((user) => {
      userInfo.setUserAvatar(user.avatar);
      avatarPopup.close();
    })
    .catch((err) => console.log(err))
    .finally(() => addPopup.renderLoading(false));
});

// Создадим переменную под объект с классом Section
const photosSection = new Section(
  {
    items: [],
    renderer: getCardRenderer(api, userInfo, imagePopup, deletePopup),
  },
  '.photos__list'
);

// Создадим промисы с запросами к серверу
// Загрузим данные пользователя и карточек с сервера
const userPromise = api.getUserInfo();
const cardsPromise = api.getInitialCards();

Promise.all([userPromise, cardsPromise])
  .then(([user, cards]) => {
    userInfo.setUserInfo(user);
    photosSection.setItems(cards);
    photosSection.renderItems();
  })
  .catch((err) => console.log(err));

// Создаем объекты с классом FormValidator для каждой формы
const formValidators = {};
Array.from(document.forms).forEach((form) => {
  formValidators[form.name] = new FormValidator(configValidation, form);
});
// Включаем валидацию
Object.keys(formValidators).forEach((formName) => {
  formValidators[formName].enableValidation();
});

// const newCardFormValidator = new FormValidator(
//   configValidation,
//   newCardFormElement
// );
// const profileFormValidator = new FormValidator(
//   configValidation,
//   profileFormElement
// );
// const avatarFormValidator = new FormValidator(
//   configValidation,
//   avatarFormElement
// );

// Включаем валидацию
// [newCardFormValidator, profileFormValidator, avatarFormValidator].forEach(
//   (form) => {
//     form.enableValidation();
//   }
// );

//Создаем кнопки
setButtonListener(document, '.edit-button', () => {
  const { name, about } = userInfo.getUserValues();
  profilePopup.setInputValues([name, about]);
  formValidators['profile-form'].removeInputErrors();
  profilePopup.open();
});

setButtonListener(document, '.add-button', () => {
  formValidators['add-photo-form'].removeInputErrors();
  addPopup.open();
  formValidators['add-photo-form'].disableSubmitButton();
});

setButtonListener(document, '.profile__image-container', () => {
  formValidators['avatar-form'].removeInputErrors();
  avatarPopup.open();
  formValidators['avatar-form'].disableSubmitButton();
});
