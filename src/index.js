import './pages/index.css'; // добавьте импорт главного файла стилей

// Импортируем начальный константы, функции, класс
import {
  configValidation,
  profileFormElement,
  newCardFormElement,
  profileName,
  profileDescription,
  profileAvatar,
  avatarFormElement,
} from './modules/constants.js';
import {
  createCardElement,
  setButtonListener,
  setCardParam,
} from './modules/utils.js';
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

// Создадим объект с данными пользователя
const userInfo = new UserInfo(profileName, profileDescription, profileAvatar);

// Загрузим данные пользователя с сервера
// Создадим промисы с запросами к серверу
const userPromise = api.getUserInfo().then((user) => {
  userInfo.setUserInfo(user.name, user.about);
  userInfo.setUserAvatar(user.avatar);
  userInfo.setUserValue('id', user._id);
});
const cardsPromise = api.getInitialCards();

Promise.all([userPromise, cardsPromise])
  .then((results) => {
    // results[0] = undefined, т.к. с user уже разобрались
    const cards = results[1];
    console.log(cards);
    const photosSection = new Section(
      {
        items: cards,
        renderer: (cardItem) => {
          const cardParam = setCardParam(userInfo, cardItem);
          const card = new Card(
            cardItem.link,
            cardItem.name,
            cardParam,
            '#photos-element',
            () => {
              imagePopup.open(cardItem.link, cardItem.name);
            },
            (isLiked) => {
              if (isLiked) {
                api
                  .likeCard(cardItem._id)
                  .then((cardItem) => {
                    card.setLikeCouter(cardItem.likes.length);
                  })
                  .catch((err) => console.log(err));
              }
            }
          );
          console.log(card);
          return card.getCardElement();
        },
      },
      '.photos__list'
    );
    return photosSection;
  })
  .then((photosSection) => photosSection.renderItems())
  .catch((err) => console.log(err));

// Создаем объекты с наследниками класса Popup
const imagePopup = new PopupWithImage('.image-popup');
const profilePopup = new PopupWithForm('.profile-popup', (inputValues) => {
  api
    .setUserInfo(inputValues['profile-name'], inputValues['profile-job'])
    .then((user) => {
      userInfo.setUserInfo({ name: user.name, about: user.about });
    })
    .catch((err) => console.log(err));
  profilePopup.close();
});
const addPopup = new PopupWithForm('.add-popup', (inputValues) => {
  const card = new Card(
    inputValues['photo-link'],
    inputValues['photo-title'],
    true,
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
const avatarPopup = new PopupWithForm('.avatar-popup', (inputValues) => {
  api
    .setUserAvatar(inputValues['avatar-link'])
    .then((user) => {
      userInfo.setUserAvatar(user.avatar);
    })
    .catch((err) => console.log(err));
  avatarPopup.close();
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
const avatarFormValidator = new FormValidator(
  configValidation,
  avatarFormElement
);

// Добавляем в свойство popup'ов объект класса FormValidator, чтобы использовать его публичный метод removeInputErrors()
profilePopup.formValidator = profileFormValidator;
addPopup.formValidator = newCardFormValidator;

// Включаем валидацию
[newCardFormValidator, profileFormValidator, avatarFormValidator].forEach(
  (form) => {
    form.enableValidation();
  }
);

//Создаем кнопки
setButtonListener(document, '.edit-button', () => {
  const { name, job } = userInfo.getUserValues();
  profilePopup.setInputValues([name, job]);
  profileFormValidator.removeInputErrors();
  profilePopup.open();
});

setButtonListener(document, '.add-button', () => {
  newCardFormValidator.removeInputErrors();
  addPopup.open();
  newCardFormValidator.disableSubmitButton();
});

setButtonListener(document, '.profile__image-container', () => {
  avatarFormValidator.removeInputErrors();
  avatarPopup.open();
  avatarFormValidator.disableSubmitButton();
});
