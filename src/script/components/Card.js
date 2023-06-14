export default class Card {
  constructor({
    item,
    myInfo,
    cardSelector,
    handleCardClick,
    handleDelClick,
    handleLikeEl,
    handleDelLikeEl,
  }) {
    this._name = item.name;
    this._link = item.link;
    this._likesArr = item.likes;
    this._userId = item.owner._id;
    this._myId = myInfo._id;
    this._card = item;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleDelClick = handleDelClick;
    this._handleLikeEl = handleLikeEl;
    this._handleDelLikeEl = handleDelLikeEl;
  }

  _getTemplate() {
    const cardEl = document
      .querySelector(this._cardSelector)
      .content.querySelector(".element")
      .cloneNode(true);

    return cardEl;
  }

  getCurrentCard() {
    return this._card;
  }

  removeCard() {
    this._element.remove();
  }

  handleLike(item) {
    this._likesArr = item.likes;
    this._getLikeValue(item);
    if (this._checkMyLike()) {
      this._element
        .querySelector(".element__like-button")
        .classList.add("element__like-button_active");
    } else {
      this._element
        .querySelector(".element__like-button")
        .classList.remove("element__like-button_active");
    }
  }

    _getLikeValue(item) {
    this._element.querySelector(".element__like-counter").textContent =
      item.likes.length;
  }

  _checkMyLike() {
    return Boolean(this._likesArr.find((item) => item._id == this._myId));
  }

  _setEventListeners() {
    this._element
      .querySelector(".element__image")
      .addEventListener("click", () => {
        this._handleCardClick(this._card);
      });

    this._element
      .querySelector(".element__like-button")
      .addEventListener("click", () => {
        if (this._checkMyLike()) {
          this._handleDelLikeEl();
        } else {
          this._handleLikeEl();
        }
      });

    this._element
      .querySelector(".element__delete-button")
      .addEventListener("click", () => this._handleDelClick(this._card._id));
  }

  generateCard() {
    this._element = this._getTemplate();
    const titleEl = this._element.querySelector(".element__title");
    const imgEl = this._element.querySelector(".element__image");
    const likesEl = this._element.querySelector(".element__like-counter");
    const delButton = this._element.querySelector(".element__delete-button");
    if (this._userId == this._myId)
      delButton.classList.add("element__delete-button_active");
    if (this._checkMyLike()) {
      this._element
        .querySelector(".element__like-button")
        .classList.add("element__like-button_active");
    }
    likesEl.textContent = this._likesArr.length;
    titleEl.textContent = this._name;
    imgEl.src = this._link;
    imgEl.alt = `Это ${this._name}? Не похоже) Введите корректную ссылку.`;

    this._setEventListeners();

    return this._element;
  }
}
