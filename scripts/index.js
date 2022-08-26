const popup = document.querySelector('.popup');
const openButton = document.querySelector('.profile__button-edit-name');
const closeButton = popup.querySelector('.popup__close-button');
const saveButton = popup.querySelector('.popup__save-button');

let formElement = document.querySelector('.popup__form'); 
let nameInput = formElement.querySelector('.popup__input_type_name');
let jobInput = formElement.querySelector('.popup__input_type_description');
let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');


function openPopup() {
    nameInput.value = profileName.textContent;
    jobInput.value = profileDescription.textContent;
    popup.classList.add('popup_is-opened');
}

function closePopup() {
    popup.classList.remove('popup_is-opened');
}


openButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);


function formSubmitHandler(evt) {
    evt.preventDefault(); 

    profileName.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    closePopup();
}

formElement.addEventListener('submit', formSubmitHandler); 






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

const listElement = document.querySelector('.elements');
const formElementAddImage = document.querySelector('.popup__add-image_form'); 
const inputImageTitleElement = formElementAddImage.querySelector('.popup__input_type_image-title');
const inputImageLinkElement = formElementAddImage.querySelector('.popup__input_type_image-link');

const templateElement = document.querySelector('.template');


initialCards.forEach(addImage); 

function handleImageSubmit(e) {
  e.preventDefault();

  const element = [];
  element.name = inputImageTitleElement.value;
  element.link = inputImageLinkElement.value;
  addImage(element); 
} 


function addImage(element) {

const newImageElement = templateElement.content.cloneNode(true);
newImageElement.querySelector('.element__image').src = element.link;
newImageElement.querySelector('.element__title').textContent = element.name;

newImageElement.querySelector('.element__delete-button').addEventListener('click', (e) => {
  const itemElement = e.target.closest('.element');
  itemElement.remove()})

listElement.prepend(newImageElement);
}





formElementAddImage.addEventListener('submit', handleImageSubmit);










const openButtonImage = document.querySelector('.profile__button-image-add');
const popupAddImage = document.querySelector('.popup__add-image');
const closeButtonAddImage = popupAddImage.querySelector('.popup__add-image_close-button');

let formAddImage = document.querySelector('.popup__add-image_form');


function openPopupAddImage() {
    popupAddImage.classList.add('popup__add-image_is-opened');
}

function closePopupAddImage() {
    popupAddImage.classList.remove('popup__add-image_is-opened');
}

function formSubmitHandlerAddImage(evt) {
    evt.preventDefault();

    closePopupAddImage();
}
openButtonImage.addEventListener('click', openPopupAddImage);
closeButtonAddImage.addEventListener('click', closePopupAddImage);
formAddImage.addEventListener('submit', formSubmitHandlerAddImage);