export class FormValidator {
    constructor(config, formElement) {
        this._inputSelector = config.inputSelector;
        this._submitButtonSelector = config.submitButtonSelector;
        this._inactiveButtonClass = config.inactiveButtonClass;
        this._inputErrorClass = config.inputErrorClass;
        this._errorClass = config.errorClass;
        this._formElement = formElement;
    }

    _showInputError(inputElement, errorInputClass, error, errorSpanClass) {
        inputElement.classList.add(errorInputClass);
        error.textContent = inputElement.validationMessage;
        error.classList.add(errorSpanClass);
    }

    _hideInputError(inputElement, errorInputClass, error, errorSpanClass) {
        inputElement.classList.remove(errorInputClass);
        error.classList.remove(errorSpanClass);
        error.textContent = '';
    }

    disableButton() {
        this._submitButton.setAttribute('disabled', 'disabled');
        this._submitButton.classList.add(this._inactiveButtonClass);
    }

    _hasInvalidInput() {
        return Array.from(this._inputsList).some((inputItem) => {
            return !inputItem.validity.valid
        })
    }

    _toggleSubmitButtonState(_inputsList, _submitButton, inactiveButtonClass) {
        if (this._hasInvalidInput(this._inputsList)) {
            this.disableButton(this._submitButton);
        } else {
            this._submitButton.classList.remove(inactiveButtonClass);
            this._submitButton.removeAttribute('disabled', 'disabled');
        }
    }

    _checkInputValidity(inputItem, errorElement) {
        if (!inputItem.validity.valid) {
            this._showInputError(inputItem, this._inputErrorClass, errorElement, this._errorClass);
        } else {
            this._hideInputError(inputItem, this._inputErrorClass, errorElement, this._errorClass);
        }
    }

    _setEventListeners() {
        this._inputsList = this._formElement.querySelectorAll(this._inputSelector);
        this._submitButton = this._formElement.querySelector(this._submitButtonSelector);

        this._toggleSubmitButtonState(this._inputsList, this._submitButton, this._inactiveButtonClass);

        this._inputsList.forEach((inputItem) => {
            const errorElement = this._formElement.querySelector(`.${inputItem.id}-error`);
            inputItem.addEventListener('input', () => {
                this._checkInputValidity(inputItem, errorElement);
                this._toggleSubmitButtonState(this._inputsList, this._submitButton, this._inactiveButtonClass);
            })
        })
    }

    enableValidation() {
        this._formElement.addEventListener('submit', (e) => {
            e.preventDefault();
        })
        this._setEventListeners();
    }
    
     resetValidation() {
        this._toggleSubmitButtonState();

        this._inputsList.forEach((inputElement) => {
        this._hideInputError(inputElement) 
        });
    } 
}
