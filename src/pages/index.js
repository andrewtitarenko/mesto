import './index.css';
import {  
    formProfileInfo,
    formAddImage,
    inputJobProfile,
    inputNameProfile,
    buttonEditProfile,
    buttonOpenAddImagePopup,
    config,
    initialCards
} from '../script/utils/constants.js';
import Card from '../script/components/Card.js';
import FormValidator from '../script/components/FormValidator.js';
import PopupWithForm from '../script/components/PopupWithForm.js';
import PopupWithImage from '../script/components/PopupWithImage.js';
import Section from '../script/components/Section.js';
import UserInfo from '../script/components/UserInfo.js'




const userInfo = new UserInfo({
  name: '.profile__name',
  info: '.profile__description'
});
const popupEditProfile = new PopupWithForm('.popup_type_profile-info', handleProfileFormSubmit);
const popupAddImage = new PopupWithForm('.popup_type_add-image', handleCardFormSubmit);
const imagePopup = new PopupWithImage('.popup_type_image');
const formEditVProfileValidator = new FormValidator(config, formProfileInfo);
const formAddImageValidator = new FormValidator(config, formAddImage);

function createCard(data) {
  const newCard = new Card(
    {name: data.name, link: data.link},
    '.template',
    imagePopup.open.bind(imagePopup));
  return newCard.makeCard();
};

const newSection = new Section(
  {
  items: initialCards,
  renderer: (item) => newSection.addItem(createCard(item)),
  },
  ".elements"
);


buttonEditProfile.addEventListener('click', () => {
  inputNameProfile.value = userInfo.getUserInfo().name
  inputJobProfile.value = userInfo.getUserInfo().info
  popupEditProfile.open()
  formEditVProfileValidator.resetValidation();
})


function handleProfileFormSubmit(inputData) {
  userInfo.setUserInfo(inputData);
  console.log(inputData);
  popupEditProfile.close();
}

function handleCardFormSubmit(formInputs) {
  newSection.addItem(createCard(formInputs));
  popupAddImage.close();
} 


function handleAddCardButtonClick() {
  popupAddImage.open();
  formAddImageValidator.resetValidation();
}


buttonOpenAddImagePopup.addEventListener('click', handleAddCardButtonClick);
imagePopup.setEventListeners();
popupEditProfile.setEventListeners();
popupAddImage.setEventListeners();
formEditVProfileValidator.enableValidation();
formAddImageValidator.enableValidation();
newSection.renderItems();