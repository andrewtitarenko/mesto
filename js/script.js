const popup = document.querySelector('.popup');
const openButton = document.querySelector('.popup__open');
const closeButton = popup.querySelector('.popup__close-button');
const saveButton = popup.querySelector('.popup__save-button');

let formElement = document.querySelector('.popup__form'); 
let nameInput = formElement.querySelector('.popup__input-name');
let jobInput = formElement.querySelector('.popup__input-description');
let profileName = document.querySelector('.profile__name');
let profileDescription = document.querySelector('.profile__description');


let togglePopup = function () {
    popup.classList.toggle('popup__opened');
}

openButton.addEventListener('click', togglePopup);
closeButton.addEventListener('click', togglePopup);
saveButton.addEventListener('click', togglePopup);


function formSubmitHandler(evt) {
    evt.preventDefault(); 

    profileName.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;

}

formElement.addEventListener('submit', formSubmitHandler); 