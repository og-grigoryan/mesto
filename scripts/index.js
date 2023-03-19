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
    popupProfileInput = document.querySelector('.popap_edit-card'),
    closeInput = popupProfileInput.querySelector('.popup__close'),
    nameInput = popupProfileInput.querySelector('.popup__input_string_name'),
    jobInput = popupProfileInput.querySelector('.popup__input_string_job'),
    form = popupProfileInput.querySelector('.popup__form');



const openModal = (popupName) => {    // универсальные функкции для открытия и закрытия попапов
  popupName.classList.add('popup_opened');
}
const closeModal = (popupName) =>  {
  popupName.classList.remove('popup_opened');
}


function openProfileEdit() {    // автоматический ввод в поля при открытие попапа
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
  openModal(popupProfileInput);
}


function handleFormSubmit(evt) {   // сохранение новых данных профиля
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  closeModal(popupProfileInput);
}

form.addEventListener('submit', handleFormSubmit);
profileEditButton.addEventListener('click', () => openProfileEdit(popupProfileInput))
closeInput.addEventListener('click', () => closeModal(popupProfileInput))

// шаблон карт (из данного массива)

const placesContainer = document.querySelector('.elements__grids');
const placeTemplate = document.querySelector('#template__elements__items').content;

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

function createCard ({ name, link }) {   // создание карточки
  const placeElement = placeTemplate.querySelector('.elements__items').cloneNode(true);
  const placeLike = placeElement.querySelector('.elements__like');
  placeElement.querySelector('.elements__title').textContent = name;
  placeElement.querySelector('.elements__item').src = link;
  placeElement.querySelector('.elements__item').alt = name;
  placeElement.querySelector('.elements__like').addEventListener('click', () => placeLike.classList.toggle('elements__like_active'));         // лайк
  placeElement.querySelector('.elements__trash').addEventListener('click', () => placeElement.remove());       // удаление
  initImgBig(placeElement);        // Открытие большой картинки


  const popupImg = document.querySelector('.popup_img-card'),   // Зум карточек
    popupCloseImg = popupImg.querySelector('.popup__close')

    const popupZoomImg = popupImg.querySelector('.popup__zoom-image'),
    popupZoomTitle = popupImg.querySelector('.popup__zoom-title')

    popupCloseImg.addEventListener('click', () =>{
    closeModal(popupImg)
    })


    function openImgBig(evt)  {                      // функция зума карточек
    const imgSrc = evt.target.getAttribute('src'), 
      imgAlt = evt.target.getAttribute('alt')
    popupZoomImg.setAttribute('src', imgSrc)
    popupZoomImg.setAttribute('alt', imgAlt)
    popupZoomTitle.textContent = imgAlt
    openModal(popupImg)
  }
  
  function initImgBig(node){        // функция открытия карточки    
    const cardUlListImg = node.querySelector('.elements__item');
    cardUlListImg.addEventListener('click', openImgBig)
  }
  return placeElement;
}

function renderCard ({ name, link }) {  // обработка
  placesContainer.prepend(createCard({ name, link }));
}

render();

// добавление карточек

const formCardEdit = document.querySelector('.profile__add-button'),
      popupCardAdd = document.querySelector('.popup_add-card'),
      popupCardClose = popupCardAdd.querySelector('.popup__close'),
      popupCardForm = popupCardAdd.querySelector('.popup__form_add-card'),
      popupCardInputPlace = popupCardAdd.querySelector('.popup__input_string_place'),
      popupCardInputSrc = popupCardAdd.querySelector('.popup__input_string_src'),
      popupCardInputBtn = popupCardAdd.querySelector('.popup__input-btn');

function handleEditCard(evt) {
  evt.preventDefault();
  renderCard({name: popupCardInputPlace.value, link: popupCardInputSrc.value});
  closeModal(popupCardAdd);
  evt.target.reset(); // обнулевие формы после добавление
}

popupCardForm.addEventListener('submit',  handleEditCard);
formCardEdit.addEventListener('click', () => openModal(popupCardAdd));
popupCardClose.addEventListener('click', () => closeModal(popupCardAdd));