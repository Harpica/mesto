console.log("Hello");

let editButton = document.querySelector(".edit-button");
let editForm = document.querySelector(".edit-form");
let closeButton = document.querySelector(".close-button");
let saveButton = document.querySelector(".edit-form__button");

let profileName = document.querySelector(".profile__name");
let profileDescription = document.querySelector(".profile__description");
let inputName = document.querySelector("#input-name");
let inputDescription = document.querySelector("#input-description");

function toggleEditForm() {
  editForm.classList.toggle("edit-form_active");
}

function editProfile() {
  // Принять данные inputName.value
  // Передать данные в profileName.value
  profileName.textContent = inputName.value;
  profileDescription.textContent = inputDescription.value;
  toggleEditForm();
}

function updateEditForm() {
  inputName.value = profileName.textContent;
  inputDescription.value = profileDescription.textContent;
}

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
saveButton.addEventListener("click", editProfile);

inputName.addEventListener("input", validateName);
inputDescription.addEventListener("input", validateDescription);
