import "./index.css";

import {
  validationConfig,
  topInputProfile,
  bottomInputProfile,
  editButtonProfile,
  addButtonMesto,
  editButtonAvatar,
  cardsContainer,
} from "../script/utils/constants.js";
import FormValidator from "../script/components/FormValidator.js";
import Section from "../script/components/Section.js";
import Card from "../script/components/Card.js";
import PopupWithImage from "../script/components/PopupWithImage.js";
import PopupWithForm from "../script/components/PopupWithForm.js";
import UserInfo from "../script/components/UserInfo.js";
import Api from "../script/components/Api.js";
import PopupSubmit from "../script/components/PopupSubmit.js";

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

const formAvatarValidator = new FormValidator(
  validationConfig,
  ".popup__form_type_avatar"
);
formAvatarValidator.enableValidation();

// Инициализация класса API
const api = new Api({
  address: "https://mesto.nomoreparties.co/v1/cohort-66",
  token: "1cee65c1-84c4-41c8-b311-c491c381d5fa",
});

// Инициализация класса по добалению данных пользователя
const userInfo = new UserInfo(
  ".profile__name",
  ".profile__about",
  ".profile__avatar"
);

// Загрузка с сервера информации о пользователе на страницу и отрисовка массивов данных карточек
let myInfo;
Promise.all([api.getUserProfile(), api.getInitialCards()])
  .then(([objectInfo, cardArr]) => {
    myInfo = objectInfo;

    userInfo.setUserInfo(objectInfo);
    cardsSection.renderItems(cardArr);
    console.log(objectInfo);
    console.log(cardArr);
  })
  .catch((error) => {
    console.log(error);
  });

// Добавление карточек на страницу из массива
const cardsSection = new Section(
  {
    renderer: (item) => {
      createCardEl(item);
      cardsSection.addItemAppend(createCardEl(item));
    },
  },
  cardsContainer
);

// Функция создания карточки
const createCardEl = (item) => {
  const card = new Card({
    item: item,
    myInfo: myInfo,
    cardSelector: ".template_type_default",
    handleCardClick: (card) => popupImage.open(card),
    handleDelClick: (cardId) => {
      popupDelCard.setSubmitAction(() => {
        api.removeCard(cardId)
          .then(() => {
            card.removeCard();
            popupDelCard.close();
          })
          .catch(() => {
            console.log("Ошибка удаления");
          });
      });
      popupDelCard.open();
    },
    handleLikeEl: () => {
      api.addLikeCard(card.getCurrentCard()._id)
        .then((itemCard) => {
          card.updateLikes(itemCard);
        })
        .catch(() => console.log("Ошибка постановки лайка"));
    },
    handleDelLikeEl: () => {
      api.removeLikeCard(card.getCurrentCard()._id)
        .then((itemCard) => {
          card.updateLikes(itemCard);
        })
        .catch(() => console.log("Ошибка снятия лайка"));
    },
  });
  return card.generateCard();
};

// Инициализация попапа "Удаление карточки"
const popupDelCard = new PopupSubmit({
  popupSelector: ".popup_type_delete",
});
popupDelCard.setEventListeners();

// инициализация попапа "Аватарка"
const popupAvatar = new PopupWithForm({
  popupSelector: ".popup_type_avatar",
  handleFormSubmit: (data) => {
    popupAvatar.setIsLoading(true);

    api.editUserAvatar(data)
      .then((objectInfo) => {
        userInfo.setUserInfo(objectInfo);
        popupAvatar.close();
      })
      .catch((error) => console.log(error))
      .finally(() => popupAvatar.setIsLoading(false));
  },
});
popupAvatar.setEventListeners();

// инициализация попапа "Профиль"
const popupProfile = new PopupWithForm({
  popupSelector: ".popup_type_profile",
  handleFormSubmit: (data) => {
    popupProfile.setIsLoading(true);

    api.setUserProfile(data)
      .then((dataInfo) => {
        userInfo.setUserInfo(dataInfo);
        popupProfile.close();
      })
      .catch((error) => console.log(error))
      .finally(() => popupProfile.setIsLoading(false));
  },
});
popupProfile.setEventListeners();

// инициализация попапа "Место"
const popupMesto = new PopupWithForm({
  popupSelector: ".popup_type_mesto",
  handleFormSubmit: (item) => {
    popupMesto.setIsLoading(true);

    api.addNewCard(item)
      .then((itemCard) => {
        const newCard = createCardEl(itemCard);
        cardsSection.addItemPrepend(newCard);
        popupMesto.close();
      })
      .catch((error) => console.log(error))
      .finally(() => popupMesto.setIsLoading(false));
  },
});
popupMesto.setEventListeners();

// Инициализация попапа "Изображение"
const popupImage = new PopupWithImage(".popup_type_image");
popupImage.setEventListeners();

// слушатель для попапа "Аватарка"
editButtonAvatar.addEventListener("click", () => {
  popupAvatar.open();

  formAvatarValidator.checkButtonStateOpenPopup();
});

// слушатель для попапа "Профиль"
editButtonProfile.addEventListener("click", () => {
  const getUserInfo = userInfo.getUserInfo();
  topInputProfile.value = getUserInfo.name;
  bottomInputProfile.value = getUserInfo.about;

  popupProfile.open();

  formProfileValidator.checkButtonStateOpenPopup();
});

// слушатель для попапа "Место"
addButtonMesto.addEventListener("click", () => {
  popupMesto.open();
  formCardValidator.checkButtonStateOpenPopup();
});