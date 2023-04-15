const showInputError = (form, inputElement, errorMessage, settings) => {
  const myErrorClass = settings.elementError.replace('{elemID}', inputElement.id);
  const errorElement = form.querySelector(myErrorClass);
  inputElement.classList.add(settings.inputTypeError);  
  errorElement.textContent = errorMessage;
  errorElement.classList.add(settings.inputErrorActive);
};

const hideInputError = (form, inputElement, settings) => {
  const myErrorClass = settings.elementError.replace('{elemID}', inputElement.id);
  const errorElement = form.querySelector(myErrorClass);
  inputElement.classList.remove(settings.inputTypeError);
  errorElement.classList.remove(settings.inputErrorActive);
  errorElement.textContent = '';
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {

    return !inputElement.validity.valid;
  })
};

const toggleButtonState = (inputList, buttonElement, settings) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(settings.toggleClassFromButton);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(settings.toggleClassFromButton);
    buttonElement.disabled = false;
  }
};


const isValid = (form, inputElement, settings) => {
  if (!inputElement?.validity?.valid) {
    showInputError(form, inputElement, inputElement.validationMessage, settings);
  } else {
    hideInputError(form, inputElement, settings);
  }
};

const setEventListeners = (form, settings) => {
  const inputs = Array.from(form.querySelectorAll(settings.inputSelector));
  const buttons = form.querySelector(settings.buttonSelector);

  inputs.forEach(input => {
    input.addEventListener('input', () => {
      isValid(form, input, settings);
      toggleButtonState(inputs, buttons, settings);
    })
  })
};

const enableValidation = settings => {
  const forms = document.querySelectorAll(settings.formSelector);

  Array.from(forms).forEach(form => setEventListeners(form, settings));
};

const settings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  buttonSelector: '.popup__input-btn',
  toggleClassFromButton: 'popup__input-btn_inactive',
  
  inputErrorActive: 'popup__input-error_active',
  inputTypeError: 'popup__input_type_error',
  elementError: '.{elemID}-error',
}

enableValidation(settings);
