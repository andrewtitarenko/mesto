import {Card} from './Card.js'
import {initialCards} from './defaultCards.js'
import {FormValidator} from './FormValidator.js'
import {openPopup, closePopup} from './openCloseFunctions.js'

const profileEditButton = document.querySelector('.profile__button-edit-name');
const profilePopup = document.querySelector('.popup_type_profile-info');
const formProfileInfo = document.querySelector('.popup__form_profile');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const buttonCloseProfile = document.querySelector('.popup__close-button_profile-info');
const listElement = document.querySelector('.elements');
const buttonOpenAddImagePopup = document.querySelector('.profile__button-image-add');
const popupAddImage = document.querySelector('.popup_type_add-image');
const buttonCloseAddImage = document.querySelector('.popup__close-button_add-image');
const inputImageTitleElement = document.querySelector('.popup__input_type_image-title');
const inputImageLinkElement = document.querySelector('.popup__input_type_image-link');
const popupImage = document.querySelector('.popup_type_image');
const buttonCloseImagePopup = document.querySelector('.popup__close-button_image');
const buttonSubmitAddImagePopup = popupAddImage.querySelector('.popup__save-button');
const formList = Array.from(document.querySelectorAll('.popup__form'))

function openPopupProfileInfo() {
    openPopup(profilePopup);
    initProfileInfo();
}

function changeProfileInfo(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;

    closePopup(profilePopup);
}

function closePopupProfileInfo() {
    closePopup(profilePopup);
}

function openPopupAddCard() {
    openPopup(popupAddImage);
}

function createCard(name, link, template) {
    return new Card(name, link, template).makeCard()
}

function addCard(card) {
    listElement.prepend(createCard(card.name, card.link, '#template'));
}

initialCards.forEach((card) => {
    addCard({
        name: card.name,
        link: card.link
    })
})

function submitAddCard(evt) {
    evt.preventDefault();
    addCard({
        link: inputImageLinkElement.value,
        name: inputImageTitleElement.value
    });
    evt.target.reset();
    new FormValidator({
        inputSelector: '.popup__item',
        submitButtonSelector: '.popup__save-button',
        inactiveButtonClass: 'popup__save-button_disabled',
        inputErrorClass: 'popup__input_type_error',
        errorClass: 'popup__input-error_visible'
    }, null).disableButton(buttonSubmitAddImagePopup);
    closePopupAddCard();
}

function closePopupAddCard() {
    closePopup(popupAddImage);
}

function closePopupImage() {
    closePopup(popupImage);
}

function initPopupsClosers() {
    const popupsList = Array.from(document.querySelectorAll('.popup'));

    popupsList.forEach(addPopupCloserByBackground);
}

function addPopupCloserByBackground(popup) {
    popup.addEventListener('click', (evt) => {
        if (popup.classList.contains('popup_opened') && evt.target === evt.currentTarget) {
            closePopup(popup);
        }
    })
}

function initProfileInfo() {
    nameInput.value = profileName.textContent;
    jobInput.value = profileDescription.textContent;
}

function initValidation() {
    formList.forEach((form) => {
        new FormValidator({
            inputSelector: '.popup__item',
            submitButtonSelector: '.popup__save-button',
            inactiveButtonClass: 'popup__save-button_disabled',
            inputErrorClass: 'popup__input_type_error',
            errorClass: 'popup__input-error_visible'
        }, form).enableValidation()
    })
}

initProfileInfo();
initValidation();
initPopupsClosers();
profileEditButton.addEventListener('click', openPopupProfileInfo);
buttonOpenAddImagePopup.addEventListener('click', openPopupAddCard);
buttonCloseProfile.addEventListener('click', closePopupProfileInfo);
buttonCloseAddImage.addEventListener('click', closePopupAddCard);
buttonCloseImagePopup.addEventListener('click', closePopupImage);
formProfileInfo.addEventListener('submit', changeProfileInfo);
popupAddImage.addEventListener('submit', submitAddCard);