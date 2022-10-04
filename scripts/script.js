let editPopup = document.querySelector('.popup');
let formElement = document.querySelector('.popup__container');

let editButton = document.querySelector('.edit-button');
let closeButton = formElement.querySelector('.close-button');
let saveButton = formElement.querySelector('.popup__button');

let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');
let nameInput = formElement.querySelector('#input-name');
let jobInput = formElement.querySelector('#input-description');

function openPopup() {
  updateformElement()
  editPopup.classList.add('popup_opened');
  nameInput.focus();
}

function closePopup() {
  editPopup.classList.remove('popup_opened');
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

function validateName() {
  if (nameInput.value.length === 0) {
    saveButton.setAttribute('disabled', true);
    nameInput.classList.add('popup__input_error');
  } else {
    saveButton.removeAttribute('disabled', false);
    nameInput.classList.remove('popup__input_error');
  }
}

function validateDescription() {
  if (jobInput.value.length === 0) {
    saveButton.setAttribute('disabled', true);
    jobInput.classList.add('popup__input_error');
  } else {
    saveButton.removeAttribute('disabled', false);
    jobInput.classList.remove('popup__input_error');
  }
}

editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);

formElement.addEventListener('submit', formSubmitHandler);

nameInput.addEventListener('input', validateName);
jobInput.addEventListener('input', validateDescription);
