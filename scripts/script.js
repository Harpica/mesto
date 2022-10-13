let popup = document.querySelector('.popup');
let formElement = document.querySelector('.popup__form');

let editButton = document.querySelector('.edit-button');
let closeButton = formElement.querySelector('.close-button');
let saveButton = formElement.querySelector('.popup__button');

let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');
let nameInput = formElement.querySelector('#input-name');
let jobInput = formElement.querySelector('#input-description');

function openPopup() {
  updateformElement();
  popup.classList.add('popup_opened');
  nameInput.focus();
}

function closePopup() {
  popup.classList.remove('popup_opened');
  // Убираем модификаторы error: если данные стерли, но потом закрыли форму без сохранения изменений
  nameInput.classList.remove('popup__input_error');
  jobInput.classList.remove('popup__input_error');
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closePopup();
}

function updateformElement() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
}

// Валидация формы, чтобы нельзя было отправить пустую форму

function validateInput(inputField, button) {
  if (inputField.value.length === 0) {
    button.setAttribute('disabled', true);
    inputField.classList.add('popup__input_error');
  } else {
    button.removeAttribute('disabled', false);
    inputField.classList.remove('popup__input_error');
  }
}

editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);

formElement.addEventListener('submit', formSubmitHandler);

nameInput.addEventListener('input', function () {
  validateInput(nameInput, saveButton);
});
jobInput.addEventListener('input', function () {
  validateInput(jobInput, saveButton);
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

// Удаление карточек через delete-button

// Делаем массив из коллекции, чтобы далее использовать метод forEach
let deleteButtons = Array.from(document.querySelectorAll('.delete-button'));

function deleteElement(event) {
  const eventTarget = event.target;
  const element = eventTarget.closest('.photos__element');
  element.remove()
}

deleteButtons.forEach(element => {
  element.addEventListener('click', deleteElement);
});


//Лайк карточки

let likeButons = Array.from(document.querySelectorAll('.like-button'));

function likeElement(event) {
  const eventTarget = event.target;
  eventTarget.classList.toggle('like-button_active');
}

likeButons.forEach(element => {
  element.addEventListener('click', likeElement);
});
