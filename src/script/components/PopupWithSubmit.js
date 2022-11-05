import Popup from "./Popup.js";

export default class PopupWithSubmit extends Popup {
  constructor(popupSelector, sumbitDeleteConfirmation) {
    super(popupSelector);
    this._button = this._popup.querySelector('.popup__save-button');
    this._sumbitDeleteConfirmation = sumbitDeleteConfirmation;
  }


  open(card) {
    this._card = card;
    super.open();
  }


  setEventListeners() {
    this._button.addEventListener('click', () => {
    this._sumbitDeleteConfirmation(this._card);
  })
  super.setEventListeners();
  }
}