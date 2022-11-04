export default class Card {
  constructor(data, templateSelector, handleCardOpen, userId, setLike, deleteLike, submitElementRemoval) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._elementId = data._id;
    this._userId = userId;
    this._owner = data.owner;
    this._templateSelector = templateSelector;
    this._handleCardOpen = handleCardOpen;
    this._setLike = setLike;
    this._deleteLike = deleteLike;
    this._submitElementRemoval = submitElementRemoval;
    this._element = document.querySelector(this._templateSelector).content.querySelector('.element').cloneNode(true);
    this._elementImage = this._element.querySelector('.element__image');
    this._elementTitle = this._element.querySelector('.element__title');
    this._cardLikes = this._element.querySelector('.element__like-counter');
    this._elementLikeButton = this._element.querySelector('.element__like-button');
    this._elementDeleteButton = this._element.querySelector('.element__delete-button');
  }

  generateCard() {
    this._elementTitle.textContent = this._name;
    this._elementImage.src = this._link;
    this._elementImage.alt = this._name;
    this._cardLikes.textContent = this._likes.length;

    if (this._owner._id != this._userId()) {
      this._elementDeleteButton.remove();
    }
    if (this._likes.some((like) => {
      return like.name === this._userId();
    })) {
      this._elementLikeButton.classList.add('element__like-button_is-active');
    };

    this._setEventListeners();
    return this._element;
  }

  _openImagePopup() {
    this._handleCardOpen(this._name, this._link);
  }

  _handleLikeClick() {
    if (!this._elementLikeButton.classList.contains('element__like-button_is-active')) {
      this._setLike(this._elementId, this);
    } else {
      this._deleteLike(this._elementId, this);
    }
  }

  _setEventListeners() {
    this._elementLikeButton.addEventListener('click', () => {
      this._handleLikeClick();
    });

    this._elementDeleteButton.addEventListener('click', () => {
      this._submitElementRemoval(this);
    });

    this._elementImage.addEventListener('click', () => {
      this._openImagePopup();
    });
  }
  
  deleteElement() {
    this._element.remove();
    this._element = null;
  }
  countLikes(card) {
    this._cardLikes.textContent = card.likes.length;
  }

  getElementId() {
    return this._elementId;
  }

  toggleLike() {
    this._elementLikeButton.classList.toggle('element__like-button_is-active');
  }
}