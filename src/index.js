import './pages/index.css'; // добавьте импорт главного файла стилей

// Импортируем начальный константы, функции, класс
import {
  configValidation,
  initialPhotos,
  profileFormElement,
  newCardFormElement,
  profileName,
  profileDescription,
} from './modules/constants.js';
import { createCardElement, setButtonListener } from './modules/utils.js';
import { FormValidator } from './modules/components/FormValidator.js';
import { PopupWithImage } from './modules/components/PopupWithImage.js';
import { PopupWithForm } from './modules/components/PopupWithForm.js';
import { Section } from './modules/components/Section.js';
import { UserInfo } from './modules/components/UserInfo.js';
import { Api } from './modules/components/Api.js';
import { Card } from './modules/components/Card.js';

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-56',
  headers: {
    authorization: '28c8be99-8fcb-4f8e-afaa-96e6bec99f34',
    'Content-Type': 'application/json',
  },
});

// // Создаем класс для отрисовки и загрузки фотографий, которые есть на сервере
api
  .getInitialCards()
  .then((cards) => {
    console.log(cards);
    const photosSection = new Section(
      {
        items: cards,
        renderer: (cardItem) => {
          photosSection.setItem(
            createCardElement(
              cardItem.link,
              cardItem.name,
              '#photos-element',
              () => {
                imagePopup.open(cardItem.link, cardItem.name);
              }
            )
          );
        },
      },
      '.photos__list'
    );
    return photosSection;
  })
  .then((photosSection) => photosSection.renderItems())
  .catch((err) => console.log(err));

// Создадим объект с данными пользователя
const userInfo = new UserInfo(profileName, profileDescription);

// Создаем объекты с наследниками класса Popup
const imagePopup = new PopupWithImage('.image-popup');
const profilePopup = new PopupWithForm('.profile-popup', (inputValues) => {
  userInfo.setUserInfo(inputValues['profile-name'], inputValues['profile-job']);
  profilePopup.close();
});
const addPopup = new PopupWithForm('.add-popup', (inputValues) => {
  const card = new Card(
    inputValues['photo-link'],
    inputValues['photo-title'],
    '#photos-element',
    () => {
      imagePopup.open(inputValues['photo-link'], inputValues['photo-title']);
    }
  );
  photosSection.setItem(card.getCardElement());
  api
    .postCard(card.getValues())
    .then((card) => console.log(card))
    .catch((err) => console.log(err));

  addPopup.close();
});

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

//Создаем кнопки
setButtonListener(document, '.edit-button', () => {
  const { name, job } = userInfo.getUserInfo();
  profilePopup.setInputValues([name, job]);
  profilePopup.formValidator.removeInputErrors();
  profilePopup.open();
});

setButtonListener(document, '.add-button', () => {
  addPopup.formValidator.removeInputErrors();
  addPopup.open();
  newCardFormValidator.disableSubmitButton();
});
