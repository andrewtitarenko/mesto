export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  };

  open() {
    this._popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', this._closeWithEsc);
  };

  close() {
    this._popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', this._closeWithEsc);
  };

  _closeWithEsc = (e) => {
    if (e.key === "Escape") {
      this.close();
    }
  };


  setEventListeners() {
    this._popup.addEventListener('click', (e) => {
      if (e.target === e.currentTarget || e.target.classList.contains('popup__close-button')) {
        this.close();
      }
    })
  } 
}

