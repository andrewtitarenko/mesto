import {Card} from './Card.js'
import {initialCards} from './defaultCards.js'
import {FormValidator} from './FormValidator.js'
import {openPopup, closePopup} from './openCloseFunctions.js'

const buttonOpenPopupProfile = document.querySelector('.profile__button-edit-name');
const popupProfileInfo = document.querySelector('.popup_type_profile-info');
const formProfileInfo = document.querySelector('.popup__form_profile');
const profileNameInput = document.querySelector('.popup__input_type_name');
const profileJobInput = document.querySelector('.popup__input_type_description');
const profileNameField = document.querySelector('.profile__name');
const profileJobField = document.querySelector('.profile__description');
const buttonClosePopupProfileInfo = document.querySelector('.popup__close-button_profile-info');
const cards = document.querySelector('.elements');
const buttonAddCard = document.querySelector('.profile__button-image-add');
const popupAddCard = document.querySelector('.popup_type_add-image');
const buttonClosePopupAddCard = document.querySelector('.popup__close-button_add-image');
const formAddCard = document.querySelector('.popup_type_add-image');
const cardTitle = document.querySelector('.popup__input_type_image-title');
const cardImage = document.querySelector('.popup__input_type_image-link');
const popupThemeImage = document.querySelector('.popup_type_image');
const buttonClosePopupImage = document.querySelector('.popup__close-button_image');
const buttonSubmitAddCard = popupAddCard.querySelector('.popup__save-button');
const formList = Array.from(document.querySelectorAll('.popup__form'))

function openPopupProfileInfo() {
    openPopup(popupProfileInfo);
    initProfileInfo();
}

function changeProfileInfo(evt) {
    evt.preventDefault();
    profileNameField.textContent = profileNameInput.value;
    profileJobField.textContent = profileJobInput.value;

    closePopup(popupProfileInfo);
}

function closePopupProfileInfo() {
    closePopup(popupProfileInfo);
}

function openPopupAddCard() {
    openPopup(popupAddCard);
}

function createCard(name, link, templateSelector) {
    return new Card(name, link, templateSelector).generateCard()
}

function addCard(card) {
    cards.prepend(createCard(card.name, card.link, '#template'));
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
        link: cardImage.value,
        name: cardTitle.value
    });
    evt.target.reset();
    new FormValidator({
        inputSelector: '.popup__input',
        submitButtonSelector: '.popup__save-button',
        inactiveButtonClass: 'popup__save-button_disabled',
        inputErrorClass: 'popup__input_type_error',
        errorClass: 'popup__input-error_visible'
    }, null).disableButton(buttonSubmitAddCard);
    closePopupAddCard();
}

function closePopupAddCard() {
    closePopup(popupAddCard);
}

function closePopupImage() {
    closePopup(popupThemeImage);
}

function initPopupsClosers() {
    const popupsList = Array.from(document.querySelectorAll('.popup'));

    popupsList.forEach(addPopupCloserByBackground);
}

function addPopupCloserByBackground(popup) {
    popup.addEventListener('click', (evt) => {
        if (popup.classList.contains('popup_is-opened') && evt.target === evt.currentTarget) {
            closePopup(popup);
        }
    })
}

function initProfileInfo() {
    profileNameInput.value = profileNameField.textContent;
    profileJobInput.value = profileJobField.textContent;
}

function initValidation() {
    formList.forEach((form) => {
        new FormValidator({
            inputSelector: '.popup__input',
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
buttonOpenPopupProfile.addEventListener('click', openPopupProfileInfo);
buttonAddCard.addEventListener('click', openPopupAddCard);
buttonClosePopupProfileInfo.addEventListener('click', closePopupProfileInfo);
buttonClosePopupAddCard.addEventListener('click', closePopupAddCard);
buttonClosePopupImage.addEventListener('click', closePopupImage);
formProfileInfo.addEventListener('submit', changeProfileInfo);
formAddCard.addEventListener('submit', submitAddCard);