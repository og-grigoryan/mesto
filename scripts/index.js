let profileEditButton = document.querySelector('.profile__edit-button'),
    profileTitle = document.querySelector('.profile__title'),
    profileSubtitle = document.querySelector('.profile__subtitle'),
    popupInput = document.querySelector('.popup'),
    closeInput = popupInput.querySelector('.popup__close'),
    nameInput = popupInput.querySelector('.popup__input_person_name'),
    jobInput = popupInput.querySelector('.popup__input_person_job'),
    form = popupInput.querySelector('.popup__form');

function openPopap() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
  popupInput.classList.add('popup_opened');
}

function closePopap() {
  popupInput.classList.remove('popup_opened');
}

function handleFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  closePopap();
}

form.addEventListener('submit', handleFormSubmit);
profileEditButton.addEventListener('click', openPopap)
closeInput.addEventListener('click', closePopap)