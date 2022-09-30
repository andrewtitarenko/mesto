import {openPopup, popupImage, popupCaption, popupThemeImage} from './openCloseFunctions.js'

export class Card {
    constructor(name, link, templateSelector) {
        this._name = name;
        this._image = link;
        this._templateSelector = templateSelector;
    }

    _getTemplate() {
        return document
            .querySelector(this._templateSelector)
            .content
            .querySelector('.element')
            .cloneNode(true);
    }

    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();

        this._element.querySelector('.element__image').src = this._image;
        this._element.querySelector('.element__image').alt = this._name;
        this._element.querySelector('.element__title').textContent = this._name;

        return this._element;
    }

    _setEventListeners() {
        this._element.querySelector('.element__like-button').addEventListener('click', () => {
            this._handleLikeClick();
        })

        this._element.querySelector('.element__delete-button').addEventListener('click', () => {
            this._handleDeleteButtonClick();
        })

        this._element.querySelector('.element__image').addEventListener('click', () => {
            this._handleImageClick();
        })
    }

    _handleLikeClick() {
        this._element.querySelector('.element__like-button').classList.toggle('element__like-button_is-active');
    }

    _handleDeleteButtonClick() {
        const itemElement = this._element
        itemElement.remove();
        this._element = null;
    }

    _handleImageClick() {
        popupImage.setAttribute('src', this._image);
        popupImage.setAttribute('alt', this._name)
        popupCaption.textContent = this._name;
        openPopup(popupThemeImage);
    }
}