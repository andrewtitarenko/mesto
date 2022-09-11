function showInputError(inputElement, errorInputClass, error, errorSpanClass) {
    inputElement.classList.add(errorInputClass);
    error.textContent = inputElement.validationMessage;
    error.classList.add(errorSpanClass);
}

function hideInputError(inputElement, errorInputClass, error, errorSpanClass) {
    inputElement.classList.remove(errorInputClass);
    error.classList.remove(errorSpanClass);
    error.textContent = '';
}

function checkInputValidity(inputItem, errorElement, config) {
    if (!inputItem.validity.valid) {
        showInputError(inputItem, config.inputErrorClass, errorElement, config.errorClass);
    } else {
        hideInputError(inputItem, config.inputErrorClass, errorElement, config.errorClass);
    }
}

function setEventListeners(formElement, config) {
    const inputsList = Array.from(formElement.querySelectorAll(config.inputSelector));
    const submitButton = formElement.querySelector(config.submitButtonSelector);

    toggleSubmitButtonState(inputsList, submitButton, config.inactiveButtonClass);

    inputsList.forEach((inputItem) => {
        const errorElement = formElement.querySelector(`.${inputItem.id}-error`);
        inputItem.addEventListener('input', () => {
            checkInputValidity(inputItem, errorElement, config);
            toggleSubmitButtonState(inputsList, submitButton,config.inactiveButtonClass);
        })
    })
};


function enableValidation (config) {
    const formList = Array.from(document.querySelectorAll(config.formSelector));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        })
        setEventListeners(formElement, config);
    })
};

function toggleSubmitButtonState(inputsList, submitButton, inactiveButtonClass) {
    if (hasInvalidInput(inputsList)) {
        submitButton.setAttribute('disabled', 'disabled');
        submitButton.classList.add(inactiveButtonClass);
    } else {
        submitButton.classList.remove(inactiveButtonClass);
        submitButton.removeAttribute('disabled', 'disabled');
    }
}

function hasInvalidInput(inputsList) {
    return inputsList.some((inputItem) => {
        return !inputItem.validity.valid
    });
};


enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_visible'
});
