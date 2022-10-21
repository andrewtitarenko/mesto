
export default class Card  {
  constructor(data, template, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._template = template;
    this._handleCardClick = handleCardClick;
    this._element = document.querySelector(this._template).content.querySelector('.element').cloneNode(true);;
    this._elementImage = this._element.querySelector('.element__image');
    this._elementImageText = this._element.querySelector('.element__title');
    this._elementLikeButton = this._element.querySelector('.element__like-button');
    this._elementDeleteButton = this._element.querySelector('.element__delete-button');
  };

  _hadleImageClick(){
    this._handleCardClick(this._name, this._link)
  }

  _handleCardLike() {
    this._elementLikeButton.classList.toggle('element__like-button_is-active');
  };

  _handleCardDelete() {
    this._element.remove()
    this._element = null
  };

  _setEventListeners() {
    this._elementLikeButton.addEventListener('click', () => {
      this._handleCardLike(this._data);
    });
    this._elementDeleteButton.addEventListener('click', () => {
      this._handleCardDelete(this._element);
    });
    this._elementImage.addEventListener('click', () => {
      this._hadleImageClick()
    })
  };

  makeCard() {
    this._elementImageText.textContent = this._name;
    this._elementImage.src = this._link;
    this._elementImage.alt = this._name;
    this._setEventListeners();
    return this._element;
  }
}

