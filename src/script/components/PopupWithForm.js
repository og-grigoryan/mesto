import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._popupForm = this._popupType.querySelector('.popup__form');
    this._button = this._popupType.querySelector('button[type="submit"]');
    this._buttonDefaultText = this._button.textContent;
    this._inputList = this._popupType.querySelectorAll(".popup__input");
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach(
      (input) => (this._formValues[input.name] = input.value)
    );
    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupType.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }

  setIsLoading(isSending) {
    this._button.textContent = isSending ? 'Загрузка...' : this._buttonDefaultText;
  }

  close() {
    this._popupForm.reset();
    super.close();
  }
}
