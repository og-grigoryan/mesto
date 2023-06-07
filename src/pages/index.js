import './index.css';

import {
  initialEl,
  validationConfig,
  topInputProfile,
  bottomInputProfile,
  editButtonProfile,
  addButtonMesto,
  elContainer,
} from "../script/utils/constants.js";
import FormValidator from "../script/components/FormValidator.js";
import Section from "../script/components/Section.js";
import Card from "../script/components/Card.js";
import PopupWithImage from "../script/components/PopupWithImage.js";
import PopupWithForm from "../script/components/PopupWithForm.js";
import UserInfo from "../script/components/UserInfo.js";

// Активация валидации форм
const formProfileValidator = new FormValidator(
  validationConfig,
  ".popup__form_type_profile"
);
formProfileValidator.enableValidation();

const formCardValidator = new FormValidator(
  validationConfig,
  ".popup__form_type_mesto"
);
formCardValidator.enableValidation();

// Функция создания карточки
const createCardEl = (item) => {
  return new Card(item, ".template_type_default", (data) => {
    popupImage.open(data);
  }).generateCard();
}

// Инициализация попапа Изображение
const popupImage = new PopupWithImage(".popup_type_image");

// Добавление карточек на страницу из массива
const cardList = new Section(
  {
    itemsArr: initialEl,
    renderer: (item) => {
      createCardEl(item);
      cardList.addItem(createCardEl(item));
    },
  },
  elContainer
);
cardList.renderItems();
popupImage.setEventListeners();

// Инициализация класса по добалению данных пользователя
const userInfo = new UserInfo(".profile__name", ".profile__description");

// Инициализация попапа Профиль
const popupProfile = new PopupWithForm({
  popupSelector: ".popup_type_profile",
  handleFormSubmit: (data) => {
    userInfo.setUserInfo(data);
    popupProfile.close();
  },
});
popupProfile.setEventListeners();

// инициализация попапа "Место"
const popupMesto = new PopupWithForm({
  popupSelector: ".popup_type_mesto",
  handleFormSubmit: (item) => {
    createCardEl(item);
    popupMesto.close();
    cardList.addItem(createCardEl(item));
  },
});
popupMesto.setEventListeners();

// слушатель для попапа Профиль
editButtonProfile.addEventListener("click", () => {
  const getUserInfo = userInfo.getUserInfo();
  topInputProfile.value = getUserInfo.name;
  bottomInputProfile.value = getUserInfo.description;

  popupProfile.open();

  formProfileValidator.checkButtonStateOpenPopup();
});

// слушатель для попапа "Место"
addButtonMesto.addEventListener("click", () => {
  popupMesto.open();

  formCardValidator.checkButtonStateOpenPopup();
});