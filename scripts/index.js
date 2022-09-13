const listElement = document.querySelector('.elements');
const templateElement = document.querySelector('.template').content;

const profilePopup = document.querySelector('.popup_type_profile-info');
const popupAddImage = document.querySelector('.popup_type_add-image');
const popupImage = document.querySelector('.popup_type_image');

const formProfileInfo = document.querySelector('.popup__form_profile'); 
const formAddImage = document.querySelector('.popup__form_add-image'); 

const profileEditButton = document.querySelector('.profile__button-edit-name');
const buttonOpenAddImagePopup = document.querySelector('.profile__button-image-add');
const buttonSubmitAddImagePopup = popupAddImage.querySelector('.popup__save-button');
const buttonCloseProfile = profilePopup.querySelector('.popup__close-button_profile-info');
const buttonCloseAddImage = popupAddImage.querySelector('.popup__close-button_add-image');
const buttonCloseImagePopup = popupImage.querySelector('.popup__close-button_image');

const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');

const nameInput = formProfileInfo.querySelector('.popup__input_type_name');
const jobInput = formProfileInfo.querySelector('.popup__input_type_description');

const inputImageTitleElement = formAddImage.querySelector('.popup__input_type_image-title');
const inputImageLinkElement = formAddImage.querySelector('.popup__input_type_image-link');

const popupImageItem = document.querySelector('.popup_type_image-item'); 
const popupImageItemText = document.querySelector('.popup_type_image-figcaption');

const overlay = document.querySelector('.overlay');



//4 Спринт, редактирование профиля
function openProfileInfoForm() {
    openPopup(profilePopup);
    setProfileInfo();
};

function setProfileInfo(){
    nameInput.value = profileName.textContent;
    jobInput.value = profileDescription.textContent;
};

function handleProfileInfoSubmit(e) {
    e.preventDefault(); 
    profileName.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;

    closePopup(profilePopup);
}



//5 спринт, работа с карточками

initialCards.forEach(addElement);

// добавляем картинку
function addElement(element) {
    listElement.prepend(createElement(element.name, element.link))
}

//главная функция
function createElement(title, src) {
    const newElement = templateElement.querySelector('.element').cloneNode(true);
    const newElementImage = newElement.querySelector('.element__image');

    newElementImage.src = src;
    newElementImage.alt = title;
    newElement.querySelector('.element__title').textContent = title;

    newElement.querySelector('.element__delete-button').addEventListener('click', removeCard);
    newElement.querySelector('.element__like-button').addEventListener('click', likeCard);
    newElementImage.addEventListener('click', openPopupImageAction);

    return newElement;
}
function removeCard(e) {
    const itemToDelete = e.target.closest('.element');
    itemToDelete.remove();
}

function likeCard(e) {
    e.target.classList.toggle('element__like-button_is-active');
};

function handleImageSubmit(e) {
    e.preventDefault();

    addElement({
      name: inputImageTitleElement.value,
      link: inputImageLinkElement.value
})
    e.target.reset();
    disableButton(buttonSubmitAddImagePopup);
    closePopupAddImage();
};

function disableButton(submitButton) {
    addSaveButtonDisableState(submitButton);
}

function addSaveButtonDisableState(submitButton) {
    submitButton.classList.add('popup__save-button_disabled');
    submitButton.setAttribute('disabled', 'disabled');
};

// Открытие попап картинки
function openPopupImage(src, text) {
    openPopup(popupImage);
    popupImageItem.setAttribute('src', src); 
    popupImageItemText.textContent = text;

};
function openPopupImageAction(e) {
    openPopupImage(e.target.getAttribute('src'), e.target.getAttribute('alt'));
};



function openPopup(popup) {
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', closePopupWithEscape);
};
function openPopupAddImage() {
    openPopup(popupAddImage);
};


function closePopup(popup) {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closePopupWithEscape);
};
function closeProfilePopup() {
    closePopup(profilePopup);
};
function closePopupImage() {
    closePopup(popupImage);
};
function closePopupAddImage() {
    closePopup(popupAddImage);
};

profileEditButton.addEventListener('click', openProfileInfoForm);
buttonOpenAddImagePopup.addEventListener('click', openPopupAddImage);
buttonCloseProfile.addEventListener('click', closeProfilePopup);
buttonCloseAddImage.addEventListener('click', closePopupAddImage);
buttonCloseImagePopup.addEventListener('click', closePopupImage);
formProfileInfo.addEventListener('submit', handleProfileInfoSubmit); 
formAddImage.addEventListener('submit', handleImageSubmit);



//Спринт 6

function closePopupWithOverlay (popup) {
    popup.addEventListener('click', (e) => {
      if (popup.classList.contains('popup_is-opened') && e.target === e.currentTarget) {
          closePopup(popup);
      }
    })
  };

function selectPopupToClose (){
  const popups = Array.from(document.querySelectorAll('.popup'));

  popups.forEach(closePopupWithOverlay);
}

function closePopupWithEscape (e){
  if (e.key === 'Escape') {
    const popupToClose = document.querySelector('.popup_is-opened');
    closePopup(popupToClose);
  }
};


selectPopupToClose();
setProfileInfo();
