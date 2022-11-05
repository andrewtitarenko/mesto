import './index.css';
import Api from "../script/components/Api.js";
import Card from "../script/components/Card.js";
import FormValidator from "../script/components/FormValidator.js";
import Section from "../script/components/Section.js";
import PopupWithImage from "../script/components/PopupWithImage.js";
import PopupWithForm from "../script/components/PopupWithForm.js";
import PopupWithSubmit from '../script/components/PopupWithSubmit.js';
import UserInfo from "../script/components/UserInfo.js";
import {
  config,
  formAddImage,
  formProfileInfo,
  formChangeAvatar,
  buttonEditProfile,
  buttonOpenAddImagePopup,
  inputNameProfile,
  inputJobProfile,
  profileAvatar,
  profileAvatarIcon
} from "../script/utils/constants.js";


const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-52',
  headers: {
    authorization: "d631afdb-03e9-4312-a4a7-1af0a84b5eb1",
    "Content-Type": "application/json",
  },
});

const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  infoSelector: '.profile__description',
  avatarSelector: '.profile__avatar-icon'
});

Promise.all([api.getUserInfo(), api.getElements()])
  .then(([userData, cards]) => {
    userInfo.setUserInfo(userData)
    userInfo.setUserId(userData)
    cardSection.renderItems(cards)
  })
  .catch(err => console.log(`Ошибка: ${err}`))

const submitProfileInfo = formValues =>
  api.editProfileInfo(formValues.name, formValues.info).then(res => {
    userInfo.setUserInfo(res);
    popupEditProfile.close();
    })
    .catch(err => console.log(`Ошибка: ${err}`))
    .finally(() => popupEditProfile.saving(false))

function createCard(data) {
  const newCard = new Card(
  data,
  '.template',
  imagePopup.open.bind(imagePopup),
  userInfo.getUserId.bind(userInfo),
  handlePutLike,
  deleteLike,
  submitElementRemoval
  );
return newCard.generateCard();
}


const submitAddImage = formValues =>
  api.addCard(formValues.name, formValues.link).then(res => {
    cardSection.addItem(createCard(res));
    popupAddImage.close();
  })
    .catch(err => console.log(`Ошибка: ${err}`))
    .finally(() => popupAddImage.saving(false))

function submitAddCard() {
  popupAddImage.open();
  validationAddImage.resetValidation();
}

function sumbitDeleteConfirmation(card) {
  api.removeElement(card.getElementId()).then(() => {
    card.deleteElement()
    popupConfirmationDelete.close()
  })
    .catch(err => console.log(`Ошибка: ${err}`))
}

function submitElementRemoval(card) {
  popupConfirmationDelete.open(card)
}

function handlePutLike(elementId, card) {
  api.putLike(elementId).then((res) => {
    card.countLikes(res)
    card.toggleLike()
  })
    .catch(err => console.log(`Ошибка: ${err}`))
}

function deleteLike(elementId, card) {
  api.deleteLike(elementId).then((res) => {
    card.countLikes(res)
    card.toggleLike()
  })
    .catch(err => console.log(`Ошибка: ${err}`))
}

const submitAvatarForm = formValues =>
  api.changeAvatarIcon(formValues.link).then(res => {
    userInfo.setUserInfo(res);
    popupEditAvatar.close();
  })
    .catch(err => console.log(`Ошибка: ${err}`))
    .finally(() => popupEditAvatar.saving(false))






function submitProfileChange() {
  popupEditProfile.open();
  const userDescription = userInfo.getUserInfo();
  inputNameProfile.value = userDescription.name;
  inputJobProfile.value = userDescription.info;
  validationProfileInfo.resetValidation();
}


function submitAvatarChange() {
  popupEditAvatar.open();
  validationAvatar.resetValidation();
}

const cardSection = new Section((item) => cardSection.addItem(createCard(item)), ".elements");
const popupEditProfile = new PopupWithForm(".popup_type_profile-info", submitProfileInfo);
const popupAddImage = new PopupWithForm(".popup_type_add-image", submitAddImage);
const popupEditAvatar = new PopupWithForm(".popup_type_avatar", submitAvatarForm);
const imagePopup = new PopupWithImage(".popup_type_image");
const validationProfileInfo = new FormValidator(config, formProfileInfo);
const validationAddImage = new FormValidator(config, formAddImage);
const validationAvatar = new FormValidator(config, formChangeAvatar);
const popupConfirmationDelete = new PopupWithSubmit(".popup_type_delete-card", sumbitDeleteConfirmation);

buttonEditProfile.addEventListener('click', submitProfileChange);
buttonOpenAddImagePopup.addEventListener('click', submitAddCard);
profileAvatar.addEventListener('click', submitAvatarChange);

validationProfileInfo.enableValidation();
validationAddImage.enableValidation();
validationAvatar.enableValidation();

imagePopup.setEventListeners();
popupEditProfile.setEventListeners();
popupAddImage.setEventListeners();
popupConfirmationDelete.setEventListeners();
popupEditAvatar.setEventListeners();
