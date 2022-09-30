import {openPopup, popupImage, popupImageItem, popupImageItemText} from './index.js'

export class Card {
    constructor(title, image, template) {
        this._title = title;
        this._image = image;
        this._template = template;
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
        this._setEventListeners();

        this._element.querySelector('.element__image').src = this._image;
        this._element.querySelector('.element__image').alt = this._title;
        this._element.querySelector('.element__title').textContent = this._title;

        return this._element;
    }

    _setEventListeners() {
        this._element.querySelector('.element__like-button').addEventListener('click', () => {
            this._likeCard();
        })

        this._element.querySelector('.element__delete-button').addEventListener('click', () => {
            this._deleteCard();
        })

        this._element.querySelector('.element__image').addEventListener('click', () => {
            this._openBigImage();
        })
    }

    _likeCard() {
        this._element.querySelector('.element__like-button').classList.toggle('element__like-button_is-active');
    }

    _deleteCard() {
        const itemElement = this._element
        itemElement.remove();
     }

    _openBigImage() {
        popupImageItem.setAttribute('src', this._image);
        popupImageItem.setAttribute('alt', this._title)
        popupImageItemText.textContent = this._title;
        openPopup(popupImage);
    }
}