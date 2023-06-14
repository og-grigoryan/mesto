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
    this._ownerId = item.owner._id;
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

  updateLikes(item) {
    this._likesArr = item.likes;
    this._setLikesCount(item);
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

  _setLikesCount(item) {
    this._element.querySelector(".element__like-counter").textContent =
      item.likes.length;
  }

  _checkMyLike() {
    return Boolean(this._likesArr.find((item) => item._id == this._myId));
  }

  _setEventListeners() {
    this.imgEl.addEventListener("click", () => {
        this._handleCardClick(this._card);
      });

    this.likeButton.addEventListener("click", () => {
        if (this._checkMyLike()) {
          this._handleDelLikeEl();
        } else {
          this._handleLikeEl();
        }
      });

      this.delButton.addEventListener("click", () => this._handleDelClick(this._card._id));
  }

  generateCard() {
    this._element = this._getTemplate();
    this.delButton = this._element.querySelector(".element__delete-button");
    this.likeButton = this._element.querySelector(".element__like-button");
    this.imgEl = this._element.querySelector(".element__image");
    const titleEl = this._element.querySelector(".element__title");
    const likesEl = this._element.querySelector(".element__like-counter");
    if (this._ownerId == this._myId)
      this.delButton.classList.add("element__delete-button_active");
    if (this._checkMyLike()) {
      this.likeButton.classList.add("element__like-button_active");
    }
    likesEl.textContent = this._likesArr.length;
    titleEl.textContent = this._name;
    this.imgEl.src = this._link;
    this.imgEl.alt = `Это ${this._name}? Не похоже) Введите корректную ссылку.`;

    this._setEventListeners();

    return this._element;
  }
}
