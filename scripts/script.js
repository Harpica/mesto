let profilePopup = document.querySelector('.profile-popup');
let addPopup = document.querySelector('.add-popup');
let profileFormElement = document.querySelector('.profile-popup__form');
let addFormElement = document.querySelector('.add-popup__form');

let editButton = document.querySelector('.edit-button');
const addButton = document.querySelector('.add-button');
let closeButtons = Array.from(document.querySelectorAll('.close-button'));
let saveButton = profileFormElement.querySelector('.popup__button');

let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');
let nameInput = profileFormElement.querySelector('#input-name');
let jobInput = profileFormElement.querySelector('#input-description');
const photoTitleInput = addFormElement.querySelector('.add-popup__input-title');
const photoLinkInput = addFormElement.querySelector('.add-popup__input-link');

// Напишем универсальные функции открытия и закрытия попапов
function openPopup(popup, firstInput) {
  popup.classList.add('popup_opened');
  firstInput.focus();
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  // Убираем модификаторы error: если данные стерли, но потом закрыли форму без сохранения изменений
  const inputs = Array.from(popup.querySelectorAll('.popup__input'));
  inputs.forEach((element) => {
    element.classList.remove('popup__input_error');
  });
}

function formSubmitHandler(evt) {
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

// Открытие, закрытие, сохранение валидация форм в profile-popup

editButton.addEventListener('click', () => {
  updateprofileFormElement();
  openPopup(profilePopup, nameInput)});
closeButtons.forEach((element) => {
  element.addEventListener('click', function (event) {
    const eventTarget = event.target;
    const popup = eventTarget.closest('.popup');
    closePopup(popup);
  });
});

profileFormElement.addEventListener('submit', formSubmitHandler);

// Валидация форм

nameInput.addEventListener('input', function () {
  validateInput(nameInput, saveButton);
});
jobInput.addEventListener('input', function () {
  validateInput(jobInput, saveButton);
});
photoTitleInput.addEventListener('input', function () {
  validateInput(photoTitleInput, saveButton);
});
photoLinkInput.addEventListener('input', function () {
  validateInput(photoLinkInput, saveButton);
});


// Загрузка карточек "из коробки" через template в html

const photosContainer = document.querySelector('.photos__list');

const initialPhotos = [
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

function addInitialPhotos(array) {
  array.forEach((element) => {
    // переменные, чтобы функция не искала и не перезаписывала их в глобальном scope
    const photosTemplate = document.querySelector('#photos-element').content;
    const photosElement = photosTemplate
      .querySelector('.photos__element')
      .cloneNode(true);

    photosElement.querySelector('.photos__image').src = element.link;
    photosElement.querySelector('.photos__image').alt = element.alt;
    photosElement.querySelector('.photos__title').textContent = element.name;
    photosContainer.append(photosElement);
  });
}

addInitialPhotos(initialPhotos);

// Новый попап для добавления карточек: открытие, закрытие, сохранение

addButton.addEventListener('click', () => openPopup(addPopup, photoTitleInput));
// Закрытие общее для всех попапов

// Удаление карточек через delete-button

// Делаем массив из коллекции, чтобы далее использовать метод forEach
let deleteButtons = Array.from(document.querySelectorAll('.delete-button'));

function deleteElement(event) {
  const eventTarget = event.target;
  const element = eventTarget.closest('.photos__element');
  element.remove();
}

deleteButtons.forEach((element) => {
  element.addEventListener('click', deleteElement);
});

//Лайк карточки

let likeButons = Array.from(document.querySelectorAll('.like-button'));

function likeElement(event) {
  const eventTarget = event.target;
  eventTarget.classList.toggle('like-button_active');
}

likeButons.forEach((element) => {
  element.addEventListener('click', likeElement);
});
