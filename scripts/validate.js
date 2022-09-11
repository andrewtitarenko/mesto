function showInputError(inputElement, errorInputClass, errorSpan, errorSpanClass) {
    inputElement.classList.add(errorInputClass);
    errorSpan.textContent = inputElement.validationMessage;
    errorSpan.classList.add(errorSpanClass);
}

function hideInputError(inputElement, errorInputClass, errorSpan, errorSpanClass) {
    inputElement.classList.remove(errorInputClass);
    errorSpan.classList.remove(errorSpanClass);
    errorSpan.textContent = '';
}

function checkInputValidity(inputItem, errorElement, config) {
    if (!inputItem.validity.valid) {
        showInputError(inputItem, config.inputErrorClass, errorElement, config.errorClass);
    } else {
        hideInputError(inputItem, config.inputErrorClass, errorElement, config.errorClass);
    }
}

function setEventListeners(formItem, config) {
    const inputList = Array.from(formItem.querySelectorAll(config.inputSelector));
    const submitButton = formItem.querySelector(config.submitButtonSelector);

    toggleSubmitButtonState(inputList, submitButton, config.inactiveButtonClass);

    inputList.forEach((inputItem) => {
        const errorElement = formItem.querySelector(`.${inputItem.id}-error`);
        inputItem.addEventListener('input', () => {
            checkInputValidity(inputItem, errorElement, config);
            toggleSubmitButtonState(inputList, submitButton,config.inactiveButtonClass);
        })
    })
};


function enableValidation (config) {
    const formList = Array.from(document.querySelectorAll(config.formSelector));
    formList.forEach((formItem) => {
        formItem.addEventListener('submit', (evt) => {
            evt.preventDefault();
        })
        setEventListeners(formItem, config);
    })
};



function toggleSubmitButtonState(inputList, submitButton, inactiveButtonClass) {
    if (hasInvalidInput(inputList)) {
        submitButton.setAttribute('disabled', 'disabled');
        submitButton.classList.add(inactiveButtonClass);
    } else {
        submitButton.classList.remove(inactiveButtonClass);
        submitButton.removeAttribute('disabled', 'disabled');
    }
}

function hasInvalidInput(inputList) {
    return inputList.some((inputItem) => {
        return !inputItem.validity.valid
    });
};




enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
});
