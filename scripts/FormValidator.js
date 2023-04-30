export default class FormValidator {
  constructor(settings, form) {
    this._form = form;
    this._inputSelector = settings.inputSelector;
    this._buttonSelector = settings.buttonSelector;
    this._toggleClassFromButton = settings.toggleClassFromButton;
    this._inputErrorActive = settings.inputErrorActive;
    this._inputTypeError = settings.inputTypeError;
    this._elementError = settings.elementError;
    this._inputs = Array.from(this._form.querySelectorAll(this._inputSelector));
    this._buttons = this._form.querySelector(this._buttonSelector);
  }


  // Добавляем класс с ошибкой
_showInputError = (inputElement, errorMessage) => {
  const myErrorClass = this._elementError.replace('{elemID}', inputElement.id);
  const errorElement = this._form.querySelector(myErrorClass);
  inputElement.classList.add(this._inputTypeError);  
  errorElement.textContent = errorMessage;
  errorElement.classList.add(this._inputErrorActive);
};

// Удаляем класс с ошибкой
_hideInputError = (inputElement) => {
  const myErrorClass = this._elementError.replace('{elemID}', inputElement.id);
  const errorElement = this._form.querySelector(myErrorClass);
  inputElement.classList.remove(this._inputTypeError);
  errorElement.classList.remove(this._inputErrorActive);
  errorElement.textContent = '';
};

// Проверка валидности поля
_hasInvalidInput = () => {
  return this._inputs.some((inputElement) => {

    return !inputElement.validity.valid;
  })
};

// Делаем кнопку отправки неактивной
disabledSubmitBtn() {
  this._buttons.classList.add(this._toggleClassFromButton);
  this._buttons.disabled = true;
};
// Активной
activeSubmitBtn() {
  this._buttons.classList.remove(this._toggleClassFromButton);
  this._buttons.disabled = false;
};

  // Функция, которая проверяет валидность полей и отключает или включает кнопку отправки
_toggleButtonState() {
  if (this._hasInvalidInput()) { 
    this.disabledSubmitBtn()
  } else {
    this.activeSubmitBtn()
  }
};

  // Проверка валидности поля
_isValid = (inputElement) => {
  if (!inputElement?.validity?.valid) {
    this._showInputError(inputElement, inputElement.validationMessage);
  } else {
    this._hideInputError(inputElement);
  }
};

//Добавляет обработчики сразу всем полям формы
_setEventListeners = () => {
  this._inputs.forEach(input => {
    input.addEventListener('input', () => {
      this._isValid(input);
      this._toggleButtonState(this._buttons);
    })
  })
};

enableValidation = () => {
  this._toggleButtonState();
  this._setEventListeners();
};

/*submitFalse = () => {
  this._buttons.disabled = false;
  this._buttons.classList.remove(this._toggleClassFromButton);
}*/

resetValidation() {
  this._inputs.forEach((inputElement) => {
    this._hideInputError(inputElement);
  });

  this._toggleButtonState();
}
}