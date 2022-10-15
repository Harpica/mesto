const profilePopup = document.querySelector('.profile-popup');
const addPopup = document.querySelector('.add-popup');
const imagePopup = document.querySelector('.image-popup');
const profileFormElement = document.querySelector('.profile-popup__form');
const addFormElement = document.querySelector('.add-popup__form');

const editButton = document.querySelector('.edit-button');
const addButton = document.querySelector('.add-button');
const closeButtons = Array.from(document.querySelectorAll('.close-button'));
const profileSaveButton = profileFormElement.querySelector('.popup__button');
const photoSaveButton = addFormElement.querySelector('.popup__button');

const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const nameInput = profileFormElement.querySelector('#input-name');
const jobInput = profileFormElement.querySelector('#input-description');
const photoTitleInput = addFormElement.querySelector('.add-popup__input-title');
const photoLinkInput = addFormElement.querySelector('.add-popup__input-link');

// Напишем универсальные функции открытия и закрытия попапов
function openPopup(popup) {
  popup.classList.add('popup_opened');
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
  openPopup(profilePopup, nameInput);
  nameInput.focus();
});
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
  validateInput(nameInput, profileSaveButton);
});
jobInput.addEventListener('input', function () {
  validateInput(jobInput, profileSaveButton);
});
photoTitleInput.addEventListener('input', function () {
  validateInput(photoTitleInput, photoSaveButton);
});
photoLinkInput.addEventListener('input', function () {
  validateInput(photoLinkInput, photoSaveButton);
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

addButton.addEventListener('click', () => {
  openPopup(addPopup);
  photoTitleInput.focus();
});
// Закрытие общее для всех попапов

// Добавление новой карточки
function addPhoto() {
  const photosTemplate = document.querySelector('#photos-element').content;
  const photosElement = photosTemplate
    .querySelector('.photos__element')
    .cloneNode(true);

  photosElement.querySelector('.photos__image').src = photoLinkInput.value;
  photosElement.querySelector('.photos__title').textContent =
    photoTitleInput.value;
  photosContainer.prepend(photosElement);
  closePopup(addPopup);

  // Надо добавить в массивы кнопок (deleteButtons, likeButtons) новые элементы
  deleteButtons.push(photosElement.querySelector('.delete-button'));
  deleteButtons.forEach((element) => {
    element.addEventListener('click', deleteElement);
  });
  likeButtons.push(photosElement.querySelector('.like-button'));
  likeButtons.forEach((element) => {
    element.addEventListener('click', likeElement);
  });
}

//Надо очистить формы инпутов для добавления новой картинки
function clearInputs(form) {
  let inputs = Array.from(form.querySelectorAll('.popup__input'));
  inputs.forEach((element) => {
    element.value = '';
  });
}

addFormElement.addEventListener('submit', (evt) => {
  evt.preventDefault();
  addPhoto();
  clearInputs(addFormElement);
});

// Удаление карточек через delete-button

// Делаем массив из коллекции, чтобы далее использовать метод forEach
let deleteButtons = Array.from(document.querySelectorAll('.delete-button'));

function deleteElement(event) {
  const eventTarget = event.target;
  const photosElement = eventTarget.closest('.photos__element');
  photosElement.remove();
}

deleteButtons.forEach((element) => {
  element.addEventListener('click', deleteElement);
});

//Лайк карточки

let likeButtons = Array.from(document.querySelectorAll('.like-button'));

function likeElement(event) {
  const eventTarget = event.target;
  eventTarget.classList.toggle('like-button_active');
}

likeButtons.forEach((element) => {
  element.addEventListener('click', likeElement);
});

// Увеличение изображение при клике на него

let imageCards = Array.from(document.querySelectorAll('.photos__image'));

function openImageCard(event) {
  const eventTarget = event.target;
  const photosElement = eventTarget.closest('.photos__element');
  let image = imagePopup.querySelector('.popup__image');
  let title = imagePopup.querySelector('.popup__caption');
  image.src = photosElement.querySelector('.photos__image').src;
  title.textContent = photosElement.querySelector('.photos__title').textContent;
  openPopup(imagePopup);
}

imageCards.forEach((element) => {
  element.addEventListener('click', openImageCard);
});
