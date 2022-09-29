import {openPopup, popupImageItem, popupImageItemText, popupImage} from './openCloseFunctions.js'

export class Card {
    constructor(title, image, template) {
        this._title = title;
        this._image = image;
        this.template = template;
    }

    _getTemplate() {
        return document
            .querySelector(this.template)
            .content
            .querySelector('.template')
            .cloneNode(true);
    }

    makeCard() {
        this._item = this._getTemplate();
        this._setEventListeners();

        this._item.querySelector('.element__image').src = this._image;
        this._item.querySelector('.element__image').alt = this._title;
        this._item.querySelector('.element__title').textContent = this._title;

        return this._item;
    }

    _setEventListeners() {
        this._item.querySelector('.element__like-button').addEventListener('click', () => {
            this._handleLikeClick();
        })

        this._item.querySelector('.element__delete-button').addEventListener('click', () => {
            this._handleDeleteButtonClick();
        })

        this._item.querySelector('.element__image').addEventListener('click', () => {
            this._handleImageClick();
        })
    }

    _handleLikeClick() {
        this._item.querySelector('.element__like-button').classList.toggle('element__like-button_is-active');
    }

    _handleDeleteButtonClick() {
        const itemElement = this._item
        itemElement.remove();
        this._item = null;
    }

    _handleImageClick() {
        popupImageItem.setAttribute('src', this._image);
        popupImageItem.setAttribute('alt', this._title)
        popupImageItemText.textContent = this._title;
        openPopup(popupImage);
    }
}