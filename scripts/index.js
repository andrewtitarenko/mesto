const listElement = document.querySelector('.elements');
const templateElement = document.querySelector('.template').content;

const profilePopup = document.querySelector('.popup_profile-info');
const popupAddImage = document.querySelector('.popup_add-image');
const popupImage = document.querySelector('.popup_image');

const formProfileInfo = document.querySelector('.popup__form_profile'); 
const formAddImage = document.querySelector('.popup__form_add-image'); 

const profileEditButton = document.querySelector('.profile__button-edit-name');
const openAddImagePopupButton = document.querySelector('.profile__button-image-add');
const closeProfileButton = profilePopup.querySelector('.popup__close-button_profile-info');
const closeButtonAddImage = popupAddImage.querySelector('.popup__close-button_add-image');
const closeButtonImagePopup = popupImage.querySelector('.popup__close-button_image');

const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');

const nameInput = formProfileInfo.querySelector('.popup__input_type_name');
const jobInput = formProfileInfo.querySelector('.popup__input_type_description');

const inputImageTitleElement = formAddImage.querySelector('.popup__input_type_image-title');
const inputImageLinkElement = formAddImage.querySelector('.popup__input_type_image-link');

const popupImageItem = document.querySelector('.popup__image-item'); 
const popupImageItemText = document.querySelector('.popup__image-figcaption');



//4 Спринт, редактирование профиля
function openProfileInfoForm() {
    openPopup(profilePopup);

    nameInput.value = profileName.textContent;
    jobInput.value = profileDescription.textContent;
}

function popupProfileInfoSubmitHandler(evt) {
    evt.preventDefault(); 
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
    closePopupAddImage();
};



// Открытие попап картинки
function openPopupImage(src, text) {
    openPopup(popupImage);
    popupImageItem.setAttribute('src', src); 
    popupImageItemText.textContent = text;
    popupImageItem.setAttribute('alt', alt);

};
function openPopupImageAction(e) {
    openPopupImage(e.target.getAttribute('src'), e.target.getAttribute('alt'));
};



function openPopup(popup) {
    popup.classList.add('popup_is-opened');
};
function openPopupAddImage() {
    openPopup(popupAddImage);
};



function closePopup(popup) {
    popup.classList.remove('popup_is-opened');
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
openAddImagePopupButton.addEventListener('click', openPopupAddImage);
closeProfileButton.addEventListener('click', closeProfilePopup);
closeButtonAddImage.addEventListener('click', closePopupAddImage);
closeButtonImagePopup.addEventListener('click', closePopupImage);
formProfileInfo.addEventListener('submit', popupProfileInfoSubmitHandler); 
formAddImage.addEventListener('submit', handleImageSubmit);
