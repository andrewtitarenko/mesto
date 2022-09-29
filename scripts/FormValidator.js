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

    disableButton(submitButton) {
        submitButton.setAttribute('disabled', 'disabled');
        submitButton.classList.add(this._inactiveButtonClass);
    }

    _toggleSubmitButton(inputList, submitButton, inactiveButtonClass) {
        if (this._hasInvalidInput(inputList)) {
            this.disableButton(submitButton);
        } else {
            submitButton.classList.remove(inactiveButtonClass);
            submitButton.removeAttribute('disabled', 'disabled');
        }
    }

    _hasInvalidInput(inputList) {
        return inputList.some((inputItem) => {
            return !inputItem.validity.valid
        })
    }

    _checkInputValidity(inputItem, errorElement) {
        if (!inputItem.validity.valid) {
            this._showInputError(inputItem, this._inputErrorClass, errorElement, this._errorClass);
        } else {
            this._hideInputError(inputItem, this._inputErrorClass, errorElement, this._errorClass);
        }
    }

    _setEventListeners() {
        const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
        const submitButton = this._formElement.querySelector(this._submitButtonSelector);

        this._toggleSubmitButton(inputList, submitButton, this._inactiveButtonClass);

        inputList.forEach((inputItem) => {
            const errorElement = this._formElement.querySelector(`.${inputItem.id}-error`);
            inputItem.addEventListener('input', () => {
                this._checkInputValidity(inputItem, errorElement);
                this._toggleSubmitButton(inputList, submitButton, this._inactiveButtonClass);
            })
        })
    }

    enableValidation() {
        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        })
        this._setEventListeners();
    }
}