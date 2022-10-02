import {openPopup, popupImage, popupImageItem, popupImageItemText, handleCardClick} from './index.js';

export class Card {
    constructor(title, image, template) {
        this._title = title;
        this._image = image;
        this._template = template;
        this._handleCardClick = handleCardClick;

    }

    _getTemplate() {
        return document
            .querySelector(this._template)
            .content
            .querySelector('.element')
            .cloneNode(true);
    }

    makeCard() {
        this._element = this._getTemplate();
        this._elementImage = this._element.querySelector('.element__image');
        this._elementLikeButton = this._element.querySelector('.element__like-button');
        this._elementDeleteButton = this._element.querySelector('.element__delete-button');
        this._setEventListeners();

        this._elementImage.src = this._image;
        this._elementImage.alt = this._title;
        this._element.querySelector('.element__title').textContent = this._title;

        return this._element;
    }

    _setEventListeners() {

        this._elementLikeButton.addEventListener('click', () => {
            this._likeCard();
        })

        this._elementDeleteButton.addEventListener('click', () => {
            this._deleteCard();
        })

        this._elementImage.addEventListener('click', () => {
            this._openBigImage();
        })  
    };

    _likeCard() {
        this._elementLikeButton.classList.toggle('element__like-button_is-active');
    };

    _deleteCard() {
        const itemElement = this._element
        itemElement.remove();
     };

    _openBigImage() {
        popupImageItem.setAttribute('src', this._image);
        popupImageItem.setAttribute('alt', this._title)
        popupImageItemText.textContent = this._title;
        openPopup(popupImage);
    };
} 