import {Card} from './Card.js';
import {initialCards} from './defaultCards.js';
import {FormValidator} from './FormValidator.js';

export const popupImageItem = document.querySelector('.popup__image-item');
export const popupImageItemText = document.querySelector('.popup__image-figcaption');
export const popupImage = document.querySelector('.popup_type_image');

const elementList = document.querySelector('.elements');
const formList = Array.from(document.querySelectorAll('.popup__form'));
const formProfileInfo = document.querySelector('.popup__form_profile');

const profilePopup = document.querySelector('.popup_type_profile-info');
const popupAddImage = document.querySelector('.popup_type_add-image');

const inputJobProfile = document.querySelector('.popup__input_type_description');
const inputNameProfile = document.querySelector('.popup__input_type_name');
const inputImageTitle = document.querySelector('.popup__input_type_image-title');
const inputImageLink = document.querySelector('.popup__input_type_image-link');

const buttonEditProfile = document.querySelector('.profile__button-edit-name');
const buttonCloseProfile = document.querySelector('.popup__close-button_profile-info');
const buttonCloseAddImage = document.querySelector('.popup__close-button_add-image');
const buttonCloseImagePopup = document.querySelector('.popup__close-button_image');
const buttonSubmitAddImagePopup = popupAddImage.querySelector('.popup__save-button');
const buttonOpenAddImagePopup = document.querySelector('.profile__button-image-add');

const profileNameField = document.querySelector('.profile__name');
const profileJobField = document.querySelector('.profile__description');

export function openPopup(popup) {
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', closeWithEscape);
};

function openPopupProfileInfo() {
    openPopup(profilePopup);
    initProfileInfo();
};

function openPopupAddCard() {
    openPopup(popupAddImage);
};

function closePopup(popup) {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closeByEscape);
};

function closePopupAddCard() {
    closePopup(popupAddImage);
};

function closePopupImage() {
    closePopup(popupImage);
};

function closePopupProfileInfo() {
    closePopup(profilePopup);
};

function closeWithEscape(e) {
    if (e.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_is-opened');
        closePopup(openedPopup);
    }
};

function changeProfileInfo(e) {
    e.preventDefault();
    profileNameField.textContent = inputNameProfile.value;
    profileJobField.textContent = inputJobProfile.value;
    closePopup(profilePopup);
};


function generateCard(title, image, template) {
    return new Card(title, image, template).makeCard()
};

function addCard(card) {
    elementList.prepend(generateCard(card.name, card.link, '.template'));
};

initialCards.forEach((card) => {
    addCard({
        name: card.name,
        link: card.link
    })
});

function submitAddCard(e) {
    e.preventDefault();
    addCard({
        link: inputImageLink.value,
        name: inputImageTitle.value
    });
    e.target.reset();
    new FormValidator({
        inputSelector: '.popup__input',
        submitButtonSelector: '.popup__save-button',
        inactiveButtonClass: 'popup__save-button_disabled',
        inputErrorClass: 'popup__input_type_error',
        errorClass: 'popup__input-error_visible'
    }, null).disableButton(buttonSubmitAddImagePopup);
    closePopupAddCard();
};



function selectPopupToClose() {
    const popupsList = Array.from(document.querySelectorAll('.popup'));
    popupsList.forEach(closePopupWithLayout);
};

function closePopupWithLayout(popup) {
    popup.addEventListener('click', (e) => {
        if (popup.classList.contains('popup_is-opened') && e.target === e.currentTarget) {
            closePopup(popup);
        }
    })
};

function initProfileInfo() {
    inputNameProfile.value = profileNameField.textContent;
    inputJobProfile.value = profileJobField.textContent;
};

function validation() {
    formList.forEach((form) => {
        new FormValidator({
            inputSelector: '.popup__input',
            submitButtonSelector: '.popup__save-button',
            inactiveButtonClass: 'popup__save-button_disabled',
            inputErrorClass: 'popup__input_type_error',
            errorClass: 'popup__input-error_visible'
        }, form).enableValidation()
    })
};

initProfileInfo();
validation();
selectPopupToClose();

buttonEditProfile.addEventListener('click', openPopupProfileInfo);
buttonCloseProfile.addEventListener('click', closePopupProfileInfo);
formProfileInfo.addEventListener('submit', changeProfileInfo);

buttonCloseAddImage.addEventListener('click', closePopupAddCard);
buttonOpenAddImagePopup.addEventListener('click', openPopupAddCard);
buttonCloseImagePopup.addEventListener('click', closePopupImage);
popupAddImage.addEventListener('submit', submitAddCard);