import { configValidation } from './constants.js';

export class FormValidator {
  constructor(configValidation, formElement) {
    this._formSelector = configValidation.formSelector;
    this._inputSelector = configValidation.inputSelector;
    this._submitButtonSelector = configValidation.submitButtonSelector;
    this._inactiveButtonClass = configValidation.inactiveButtonClass;
    this._inputErrorClass = configValidation.inputErrorClass;
    this._errorClass = configValidation.errorClass;
    this._formElement = formElement;
    this._submitButton = formElement.querySelector(this._submitButtonSelector);
    this._inputs = Array.from(
      formElement.querySelectorAll(this._inputSelector)
    );
  }
  _validateInput(input) {
      const inputError = this._formElement.querySelector(`#${input.name}-error`);
      if (!input.validity.valid) {
        this._showInputError(input, inputError);
      } else {
        this._hideInputError(input, inputError);
      }
    };
  _showInputError(input, inputError) {
    input.classList.add(this._inputErrorClass);
    inputError.classList.add(this._errorClass);
    inputError.textContent = input.validationMessage;
  }
  _hideInputError(input, inputError) {
    input.classList.remove(this._inputErrorClass);
    inputError.classList.remove(this._errorClass);
    inputError.textContent = '';
  }
  _handleSubmitForm(event) {
    event.preventDefault();
  }
  // отключает кнопку, если хотя бы один инпут неверный
  _handleSubmitButton() {
    if (this._hasInvalidInput()) {
      this.disableSubmitButton();
    } else {
      this._enableSubmitButton();
    }
  }
  // если хотя бы один input не валидный, то функция возвращает true
  _hasInvalidInput() {
    return this._inputs.some((input) => !input.validity.valid);
  }
  disableSubmitButton() {
    this._submitButton.setAttribute('disabled', true);
    this._submitButton.classList.add(this._inactiveButtonClass);
  }
  _enableSubmitButton() {
    this._submitButton.removeAttribute('disabled', false);
    this._submitButton.classList.remove(this._inactiveButtonClass);
  }
// Убирает ошибки к инпутам, если они есть
  removeInputErrors() {
    if (this._hasInvalidInput()) {
      this._inputs.forEach((input) => {
        const inputError = this._formElement.querySelector(`#${input.name}-error`);
        this._enableSubmitButton();
        this._hideInputError(input, inputError);
    });
  }
}

  _setEventListeners() {
    this._formElement.addEventListener('submit', (event) => {
      this._handleSubmitForm(event);
    });
    this._inputs.forEach((input) => {
      input.addEventListener('input', () => {
        this._validateInput(input);
      });
    });
    this._formElement.addEventListener('input', () => {
      this._handleSubmitButton();
    });
  }

  enableValidation() {
    this._setEventListeners();
  }
}
