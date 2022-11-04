const formAddImage = document.querySelector('.popup__form_add-image');
const formProfileInfo = document.querySelector('.popup__form_profile');
const formChangeAvatar = document.querySelector('.popup__form_change-avatar');
const inputNameProfile = formProfileInfo.querySelector('.popup__input_type_name');
const inputJobProfile = formProfileInfo.querySelector('.popup__input_type_description');
const buttonEditProfile = document.querySelector('.profile__button-edit-name');
const buttonOpenAddImagePopup = document.querySelector('.profile__button-image-add');
const profileAvatar = document.querySelector('.profile__avatar');
const profileAvatarIcon = document.querySelector('.profile__avatar-icon');

const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_visible'
};


export {
  formAddImage,
  formProfileInfo,
  formChangeAvatar,
  inputNameProfile,
  inputJobProfile,
  buttonEditProfile,
  buttonOpenAddImagePopup,
  profileAvatar,
  profileAvatarIcon,
  config
}