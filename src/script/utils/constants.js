export const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonClass: "popup__save-button_inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
};

export const topInputProfile = document
  .querySelector(".popup_type_profile")
  .querySelector(".popup__input_type_top");
export const bottomInputProfile = document
  .querySelector(".popup_type_profile")
  .querySelector(".popup__input_type_bottom");

export const editButtonProfile = document.querySelector(".profile__edit-button");
export const addButtonMesto = document.querySelector(".profile__add-button");
export const editButtonAvatar = document.querySelector(".profile__avatar-overlay");

export const cardsContainer = document.querySelector(".elements");