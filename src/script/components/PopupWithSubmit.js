import Popup from "./Popup.js";

export default class PopupWithSubmit extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._button = this._popup.querySelector('.popup__save-button');
  }

  open(sumbitDeleteConfirmation) {
    super.open();
    this._button.addEventListener('click', () => {
      sumbitDeleteConfirmation()
    })
  }
}
