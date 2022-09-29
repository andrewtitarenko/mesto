import {Card} from './Card'
import {initialCards} from './defaultCards';
import {FormValidator} from './FormValidator';
import {openPopup, closePopup} from './openCloseFunctions'; 

const listElement = document.querySelector('.elements');//
const templateElement = document.querySelector('.template').content;

const profilePopup = document.querySelector('.popup_type_profile-info');//
const popupAddImage = document.querySelector('.popup_type_add-image');//
const popupImage = document.querySelector('.popup_type_image');//

const formProfileInfo = document.querySelector('.popup__form_profile');//
const formAddImage = document.querySelector('.popup__form_add-image'); //

const profileEditButton = document.querySelector('.profile__button-edit-name');//
const buttonOpenAddImagePopup = document.querySelector('.profile__button-image-add');//
const buttonSubmitAddImagePopup = popupAddImage.querySelector('.popup__save-button');//
const buttonCloseProfile = profilePopup.querySelector('.popup__close-button_profile-info');//
const buttonCloseAddImage = popupAddImage.querySelector('.popup__close-button_add-image');//
const buttonCloseImagePopup = popupImage.querySelector('.popup__close-button_image');//

const profileName = document.querySelector('.profile__name');//
const profileDescription = document.querySelector('.profile__description');//

const nameInput = formProfileInfo.querySelector('.popup__input_type_name');//
const jobInput = formProfileInfo.querySelector('.popup__input_type_description');//

const inputImageTitleElement = formAddImage.querySelector('.popup__input_type_image-title');//
const inputImageLinkElement = formAddImage.querySelector('.popup__input_type_image-link');//

const popupImageItem = document.querySelector('.popup__image-item'); 
const popupImageItemText = document.querySelector('.popup__image-figcaption');

const formsList = Array.from(document.querySelectorAll('.popup__form'));

const overlay = document.querySelector('.overlay');


function openProfileInfoForm() {
    openPopup(profilePopup);
    setProfileInfo();
};



function handleProfileInfoSubmit(e) {
    e.preventDefault(); 
    profileName.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;

    closePopup(profilePopup);
}

function closeProfilePopup() {
    closePopup(profilePopup);
};

function openPopupAddImage() {
    openPopup(popupAddImage);
};

function createElement(title, image, template) {
    return new Card(title, image, template).createTemplate()
}

function addElement(element) {
    listElement.prepend(createElement(element.name, element.link, '#template'))
}

initialCards.forEach((element) => {
    addElement({
        name: element.name,
        link: element.link
    })
});

function handleImageSubmit(e) {
    e.preventDefault();

    addElement({
      name: inputImageTitleElement.value,
      link: inputImageLinkElement.value
})
    e.target.reset();
    buttonSubmitAddImagePopup.classList.add('popup__save-button_disabled');
    buttonSubmitAddImagePopup.setAttribute('disabled', 'disabled');
    closePopupAddImage();
};

function closePopupAddImage() {
    closePopup(popupAddImage);
};


function selectPopupToClose (){
    const popups = Array.from(document.querySelectorAll('.popup'));
  
    popups.forEach(closePopupWithOverlay);
  }

  function closePopupWithOverlay (popup) {
    popup.addEventListener('click', (e) => {
      if (popup.classList.contains('popup_is-opened') && e.target === e.currentTarget) {
          closePopup(popup);
      }
    })
  };


  function setProfileInfo(){
    nameInput.value = profileName.textContent;
    jobInput.value = profileDescription.textContent;
};


function validation() {
    formsList.forEach((form) => {
        new FormValidator({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_visible'
}, form).enableValidation()
})
}


setProfileInfo();
validation();
selectPopupToClose();
profileEditButton.addEventListener('click', openProfileInfoForm);
buttonOpenAddImagePopup.addEventListener('click', openPopupAddImage);
buttonCloseProfile.addEventListener('click', closeProfilePopup);
buttonCloseAddImage.addEventListener('click', closePopupAddImage);
buttonCloseImagePopup.addEventListener('click', closePopupImage);
formProfileInfo.addEventListener('submit', handleProfileInfoSubmit); 
formAddImage.addEventListener('submit', handleImageSubmit);



