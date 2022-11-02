// Импортируем объект с ключами-данными для валидации форм
import { configValidation } from './modules/constants.js';

function enableValidation(configValidation) {
  // найти все формы
  const forms = Array.from(
    document.querySelectorAll(configValidation.formSelector)
  );
  // повесить слушатель события на них
  // убрать поведение submit по-умолчанию с форм
  forms.forEach((form) => {
    form.addEventListener('submit', handleSubmitForm);
    // найти инпуты
    const inputs = Array.from(
      form.querySelectorAll(configValidation.inputSelector)
    );
    // провести валидацию
    // выводить ошибку и изменять класс инпута
    inputs.forEach((input) => {
      input.addEventListener('input', () => {
        validateInput(form, input, configValidation);
      });
    });

    // найти кнопку submit
    const submitButton = form.querySelector(
      configValidation.submitButtonSelector
    );
    // провести проверку, есть ли хотя бы одна форма с ошибкой
    // инактивировать кнопку submit
    form.addEventListener('input', () => {
      handleSubmitButton(submitButton, inputs, configValidation);
    });
  });
}

// отменяет стандартную отправку формы браузером
function handleSubmitForm(evt) {
  evt.preventDefault();
}


// проверяет инпуты на валидность, показывает ошибки
function validateInput(form, input, configValidation) {
  const inputError = form.querySelector(`#${input.name}-error`);
  if (!input.validity.valid) {
    //выводим ошибку и добавляем класс ошибки input
    showInputError(input, inputError, configValidation);
  } else {
    hideInputError(input, inputError, configValidation);
  }
}

function showInputError(input, inputError, configValidation) {
  input.classList.add(configValidation.inputErrorClass);
  inputError.classList.add(configValidation.errorClass);
  inputError.textContent = input.validationMessage;
}

export function hideInputError(input, inputError, configValidation) {
  input.classList.remove(configValidation.inputErrorClass);
  inputError.classList.remove(configValidation.errorClass);
  inputError.textContent = '';
}

// отключает кнопку, если хотя бы один инпут неверный
function handleSubmitButton(submitButton, inputs, configValidation) {
  if (hasInvalidInput(inputs)) {
    disableSubmitButton(submitButton, configValidation);
  } else {
    submitButton.removeAttribute('disabled', false);
    submitButton.classList.remove(configValidation.inactiveButtonClass);
  }
}

// если хотя бы один input не валидный, то функция возвращает true
function hasInvalidInput(inputs) {
  return inputs.some((input) => !input.validity.valid);
}

export function disableSubmitButton (submitButton, configValidation) {
  submitButton.setAttribute('disabled', true);
  submitButton.classList.add(configValidation.inactiveButtonClass);
}

enableValidation(configValidation);
