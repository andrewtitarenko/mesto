import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitCallBack) {
    super(popupSelector);
    this._submitCallBack = submitCallBack;
    this._form = this._popup.querySelector('.popup__form');
    this._allInputs = this._form.querySelectorAll('.popup__input');
    this._submitButton = this._popup.querySelector('.popup__save-button');

  }

  _getInputValues = () => {
    const inputData = {}
    this._allInputs.forEach((inputElement) => {
      const { name, value } = inputElement
      inputData[name] = value
    })
    return inputData
  }

  
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.saving(true)
      this._submitCallBack(this._getInputValues()).then(() => this.saving(false));
    })
  }

  saving(loading) {
    if(loading) {
      this._submitButton.textContent = 'Сохранение...';
    } else {
      this._submitButton.textContent = 'Сохранить';
    }
  }

  close() {
    super.close()
    this._form.reset()
  }
}
