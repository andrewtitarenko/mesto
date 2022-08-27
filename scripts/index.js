const popup = document.querySelector('.popup');
const openButton = document.querySelector('.profile__button-edit-name');
const closeButton = popup.querySelector('.popup__close-button');
const saveButton = popup.querySelector('.popup__save-button');
const formElement = document.querySelector('.popup__form'); 
const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_description');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const listElement = document.querySelector('.elements');
const formElementAddImage = document.querySelector('.popup__add-image_form'); 
const inputImageTitleElement = formElementAddImage.querySelector('.popup__input_type_image-title');
const inputImageLinkElement = formElementAddImage.querySelector('.popup__input_type_image-link');
const likeButton = document.querySelector('.element__like-button');
const templateElement = document.querySelector('.template').content;
const openButtonImage = document.querySelector('.profile__button-image-add');
const popupAddImage = document.querySelector('.popup__add-image');
const closeButtonAddImage = popupAddImage.querySelector('.popup__add-image_close-button');
const formAddImage = document.querySelector('.popup__add-image_form');

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
function openPopup() {
    nameInput.value = profileName.textContent;
    jobInput.value = profileDescription.textContent;
    popup.classList.add('popup_is-opened');
}
function closePopup() {
    popup.classList.remove('popup_is-opened');
}
function formSubmitHandler(evt) {
    evt.preventDefault(); 
    profileName.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    closePopup();
}
openButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);
formElement.addEventListener('submit', formSubmitHandler); 




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

function openPopupAddImage() {
    popupAddImage.classList.add('popup__add-image_is-opened');
};

function closePopupAddImage() {
    popupAddImage.classList.remove('popup__add-image_is-opened');
};


formElementAddImage.addEventListener('submit', handleImageSubmit);
openButtonImage.addEventListener('click', openPopupAddImage);
closeButtonAddImage.addEventListener('click', closePopupAddImage);
formAddImage.addEventListener('submit', handleImageSubmit);