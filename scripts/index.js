import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
const initialCards = [       // массив данных
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

// редактирование профиля

const profileEditButton = document.querySelector('.profile__edit-button'),
    profileTitle = document.querySelector('.profile__title'),
    profileSubtitle = document.querySelector('.profile__subtitle'),
    popupProfileInput = document.querySelector('.popup_edit-card'),
    closeInput = popupProfileInput.querySelector('.popup__close'),
    nameInput = popupProfileInput.querySelector('.popup__input_string_name'),
    jobInput = popupProfileInput.querySelector('.popup__input_string_job'),
    formAll = popupProfileInput.querySelector('.popup__form'),
    popupsAll = document.querySelectorAll('.popup'),
    popupImg = document.querySelector('.popup_img-card'),
    popupCloseImg = popupImg.querySelector('.popup__close'),
    popupZoomImg = popupImg.querySelector('.popup__zoom-image'),
    popupZoomTitle = popupImg.querySelector('.popup__zoom-title'),
    formCardEdit = document.querySelector('.profile__add-button'),
    popupCardAdd = document.querySelector('.popup_add-card'),
    popupCardClose = popupCardAdd.querySelector('.popup__close'),
    popupCardForm = popupCardAdd.querySelector('.popup__form_add-card'),
    popupCardInputPlace = popupCardAdd.querySelector('.popup__input_string_place'),
    popupCardInputSrc = popupCardAdd.querySelector('.popup__input_string_src'),
    popupCardInputBtn = popupCardAdd.querySelector('.popup__input-btn');

    
//-----------------------------------------------------------------------------------------функции открытия и закрытия попапа


const openModal = (popupName) => {    // универсальные функкции для открытия и закрытия попапов
  popupName.classList.add('popup_opened');
  document.addEventListener('keydown', closeEscape);
}
const closeModal = (popupName) =>  {
  popupName.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeEscape);
}

function closeEscape(evt) { // функция закрытия попапа при нажатии на 'Esc'
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closeModal(openedPopup);
  }
}

popupsAll.forEach((overlayPopup) => {      // функция закрытия попала на клик по оверлею
  overlayPopup.addEventListener('click', (evt) => {
    if (evt.target === evt.currentTarget) {
      closeModal(overlayPopup);
    }
  });
});

function openProfileEdit() {    // автоматический ввод в поля при открытие попапа
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
  openModal(popupProfileInput);
}


function handleFormSubmitEditProfile(evt) {   // сохранение новых данных профиля (Редактирование профиля)
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;

  closeModal(popupProfileInput);
}

formAll.addEventListener('submit', handleFormSubmitEditProfile);
profileEditButton.addEventListener('click', () => openProfileEdit(popupProfileInput))
closeInput.addEventListener('click', () => closeModal(popupProfileInput))

// шаблон карт (из данного массива)

const placesContainer = document.querySelector('.elements__grids');

const placeInfo = initialCards.map(function (item) {  // перебирание массива
  return {
    name: item.name,
    link: item.link,
  };
});

function render() {    
  placeInfo.forEach(renderCard);
}

function clickLikeCard (evt) { // функция поставки лайка
  evt.target.classList.toggle('elements__like_active')
}

function createCard (data) {   // создание карточки
  const cards = new Card(data.name, data.link, '#template__elements__items', openImgBig);
  // Создаём карточку и возвращаем
  return cards.generateCard();
}

popupCloseImg.addEventListener('click', () => {  //закрытие большой картинки
  closeModal(popupImg)
})

function openImgBig(name, link){         //открытие большой картинки
  openModal(popupImg);
  popupZoomImg.src = link;
  popupZoomImg.alt = name;
  popupZoomTitle.textContent = name;
}

function renderCard ({ name, link }) {  // обработка
  placesContainer.prepend(createCard({ name, link }));
}

render();

// добавление карточек

function handleFormSubmitAddCard(evt) {
  evt.preventDefault();
  renderCard({name: popupCardInputPlace.value, link: popupCardInputSrc.value});
  closeModal(popupCardAdd);
  evt.target.reset(); // обнулевие формы после добавление
  validPopupCardForm.disabledSubmitBtn()//вызов метода отключения кнопки
}

popupCardForm.addEventListener('submit',  handleFormSubmitAddCard);
formCardEdit.addEventListener('click', () => openModal(popupCardAdd));
popupCardClose.addEventListener('click', () => closeModal(popupCardAdd));

//---------------------------------------------------Валидация
const settings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  buttonSelector: '.popup__input-btn',
  toggleClassFromButton: 'popup__input-btn_inactive',
  
  inputErrorActive: 'popup__input-error_active',
  inputTypeError: 'popup__input_type_error',
  elementError: '.{elemID}-error',
}

const validpopupProfileInput = new FormValidator(settings, popupProfileInput);
validpopupProfileInput.enableValidation();
validpopupProfileInput.activeSubmitBtn();

const validPopupCardForm = new FormValidator(settings, popupCardAdd);
validPopupCardForm.enableValidation();