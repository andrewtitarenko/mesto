export default class FormValidator {
  constructor(config, formElement) {
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._formElement = formElement;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
  };


  _showInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.classList.add(this._errorClass);
    errorElement.textContent = inputElement.validationMessage;
  }


  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  }

  _disableButton() {
    this._submitButton.setAttribute('disabled', 'disabled');
    this._submitButton.classList.add(this._inactiveButtonClass);
  };

  _hasInvalidInput() {
    return Array.from(this._inputsList).some((inputItem) => {
    return !inputItem.validity.valid
    })
  };

  _toggleSubmitButtonState(_inputsList, _submitButton, inactiveButtonClass) {
    if (this._hasInvalidInput(this._inputsList)) {
        this._disableButton();
    } else {
        this._submitButton.classList.remove(inactiveButtonClass);
        this._submitButton.removeAttribute('disabled', 'disabled');
    }
  };

  _checkInputValidity(inputItem, errorElement) {
    if (!inputItem.validity.valid) {
        this._showInputError(inputItem, this._inputErrorClass, errorElement, this._errorClass);
    } else {
        this._hideInputError(inputItem, this._inputErrorClass, errorElement, this._errorClass);
    }
  };

  _setEventListeners() {
    this._inputsList = this._formElement.querySelectorAll(this._inputSelector);
    this._submitButton = this._formElement.querySelector(this._submitButtonSelector);
    this._formElement.addEventListener('reset', () => {
        this._disableButton();
        this._inputsList.forEach((inputElement) => {
            const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
            this._hideInputError(inputElement, this._inputErrorClass, errorElement, this._errorClass)
        })
    });

    this._toggleSubmitButtonState()

    this._inputsList.forEach((inputItem) => {
        const errorElement = this._formElement.querySelector(`.${inputItem.id}-error`);
        inputItem.addEventListener('input', () => {
              this._checkInputValidity(inputItem, errorElement);
              this._toggleSubmitButtonState(this._inputsList, this._submitButton, this._inactiveButtonClass);
          })
      });
  };

  enableValidation() {
      this._formElement.addEventListener('submit', (e) => {
          e.preventDefault();
      })
      this._setEventListeners();
  };
  
   resetValidation() {
    this._inputsList.forEach((inputElement) => {
        this._hideInputError(inputElement) 
    });
    this._toggleSubmitButtonState();

  } 
}