const listElement = document.querySelector('.elements');
const templateElement = document.querySelector('.template').content;

const profilePopup = document.querySelector('.popup__profile-info');
const popupAddImage = document.querySelector('.popup__add-image');
const popupImage = document.querySelector('.popup__image');

const formElement = document.querySelector('.popup__form_profile'); 
const formElementAddImage = document.querySelector('.popup__add-image_form'); 

const profileEditButton = document.querySelector('.profile__button-edit-name');
const openButtonImage = document.querySelector('.profile__button-image-add');
const closeProfileButton = profilePopup.querySelector('.popup__profile_close-button');
const closeButtonAddImage = popupAddImage.querySelector('.popup__add-image_close-button');
const closeButtonImagePopup = popupImage.querySelector('.popup__image_close-button');

const saveButton = profilePopup.querySelector('.popup__save-button');
const likeButton = document.querySelector('.element__like-button');

const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');

const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_description');

const inputImageTitleElement = formElementAddImage.querySelector('.popup__input_type_image-title');
const inputImageLinkElement = formElementAddImage.querySelector('.popup__input_type_image-link');

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

//4 Спринт, редактирование профиля
function changeProfileInfo() {
  openPopup(profilePopup);

  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
}

function formSubmitHandler(evt) {
    evt.preventDefault(); 
    profileName.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;

    closePopup(profilePopup);
}



//5 спринт, работа с карточками

initialCards.forEach(addElement);

// добавляем картинку
function addElement(element) {
    listElement.prepend(renderElement(element.name, element.link))
}

//главная функция
function renderElement(title, src) {
    const newElement = templateElement.querySelector('.element').cloneNode(true);
    const newElementImage = newElement.querySelector('.element__image');

    newElementImage.src = src;
    newElementImage.alt = title;
    newElement.querySelector('.element__title').textContent = title;

    newElement.querySelector('.element__delete-button').addEventListener('click', removeCard);
    newElement.querySelector('.element__like-button').addEventListener('click', likeCard);
/* newElementImage.addEventListener('click', openImagePopup);
 */
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
    closePopupAddImage();
};



// Открытие попап картинки
/* function openPopupImage(src,text) {

}
 */

function openPopup(popup) {
  popup.classList.add('popup_is-opened');
}
function openPopupAddImage() {
  openPopup(popupAddImage);
};



function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
}
function closeProfilePopup() {
  closePopup(profilePopup);
};
function closePopupImage() {
  closePopup(popupImage);
};
function closePopupAddImage() {
  closePopup(popupAddImage);
};

profileEditButton.addEventListener('click', changeProfileInfo);
openButtonImage.addEventListener('click', openPopupAddImage);
closeProfileButton.addEventListener('click', closeProfilePopup);
closeButtonAddImage.addEventListener('click', closePopupAddImage);
closeButtonImagePopup.addEventListener('click', closePopupImage);
formElement.addEventListener('submit', formSubmitHandler); 
formElementAddImage.addEventListener('submit', handleImageSubmit);












