const popup = document.querySelector('.popup');
const openButton = document.querySelector('.profile__button-edit-name-opened');
const closeButton = popup.querySelector('.popup__close-button');
const saveButton = popup.querySelector('.popup__save-button');

let formElement = document.querySelector('.popup__form'); 
let nameInput = formElement.querySelector('.popup__input_type_name');
let jobInput = formElement.querySelector('.popup__input_type_description');
let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');

function popupValue() {
    nameInput.value = profileName.textContent;
    jobInput.value = profileDescription.textContent;
}

let togglePopup = function () {
    popup.classList.toggle('popup_action_open');
}

openButton.addEventListener('click', togglePopup);
closeButton.addEventListener('click', togglePopup);


function formSubmitHandler(evt) {
    evt.preventDefault(); 

    profileName.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    
    saveButton.addEventListener('click', togglePopup);


}

formElement.addEventListener('submit', formSubmitHandler); 