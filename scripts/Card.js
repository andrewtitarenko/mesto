import {openPopup, popupImageItem, popupCaption, popupImage} from './openCloseFunctions'

export class Card {
    constructor (title, image, template) {
        this._title = title;
        this._image = image;
        this._template = template;
    }

    _getTemplate() {
        return document.querySelector(this._template).content.querySelector('.template').cloneNode(true);
    }

    createTemplate() {
        this._item = this._getTemplate();
        this._setEventListeners();

        this._item.querySelector('.element__image').textContent = this._title;
        this._item.querySelector('.element__image').src = this._image;
        this._item.querySelector('.element__image').alt = this._title;
        return this._item;
    }

    _setEventListeners() {
        this._item.querySelector('.element__like-button').addEventListener('click', () => {
            this._likeCard();
        })
        this._item.querySelector('.element__delete-button').addEventListener('click', () => {
            this._removeCard();
        })
        this._item.querySelector('.element__image').addEventListener('click', () => {
            this._openBigImage();
        })
    }

    _likeCard() {
        this._item.querySelector('.element__like-button').classList.toggle('element__like-button_is-active');
    }

    _removeCard() {
        const itemToDelete = this._item
        itemToDelete.remove();
        this._item = null;
    }

    _openBigImage() {
        popupImageItem.setAttribute('src', this._image);
        popupImageItem.setAttribute('alt', this._title);
        popupCaption.setAttribute.textContent = this._title;
        openPopup(popupImage)
    }

}

    _/* closeImapePopupWithEscape() {
        document.querySelector('.popup_type_image').classList.contains('popup_is-opened')
        ? document.addEventListener('keydown', this._handleClosewithEscape)
        : document.removeEventListener('keydown', this._handleClosewithEscape);
        }


    } */
