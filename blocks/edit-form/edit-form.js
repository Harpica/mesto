
let editPopup = document.querySelector(".edit-form");
let editForm = document.querySelector(".edit-form__content");

let editButton = document.querySelector(".edit-button");
let closeButton = editForm.querySelector(".close-button");
let saveButton = editForm.querySelector(".edit-form__button");

let profileName = document.querySelector(".profile__name");
let profileDescription = document.querySelector(".profile__description");
let inputName = editForm.querySelector("#input-name");
let inputDescription = editForm.querySelector("#input-description");

function toggleEditForm() {
  editPopup.classList.toggle("edit-form_opened");
}

function editProfile(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileDescription.textContent = inputDescription.value;
  toggleEditForm();
}

function updateEditForm() {
  inputName.value = profileName.textContent;
  inputDescription.value = profileDescription.textContent;
}

// Валидация формы, чтобы нельзя было отправить пустую форму

function validateName() {
  if (inputName.value.length === 0){
    saveButton.setAttribute("disabled", true);
    inputName.classList.add("edit-form__input_error");

  } else {
    saveButton.removeAttribute("disabled", false);
    inputName.classList.remove("edit-form__input_error");
  }
}

function validateDescription() {
  if (inputDescription.value.length === 0){
    saveButton.setAttribute("disabled", true);
    inputDescription.classList.add("edit-form__input_error");

  } else {
    saveButton.removeAttribute("disabled", false);
    inputDescription.classList.remove("edit-form__input_error");
  }
}


editButton.addEventListener("click", updateEditForm);
editButton.addEventListener("click", toggleEditForm);
closeButton.addEventListener("click", toggleEditForm);

editForm.addEventListener("submit", editProfile, true);

inputName.addEventListener("input", validateName);
inputDescription.addEventListener("input", validateDescription);
