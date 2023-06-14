export default class UserInfo {
  constructor(nameSelector, aboutSelector, avatarSelector) {
    this.nameUser = document.querySelector(nameSelector);
    this.aboutUser = document.querySelector(aboutSelector);
    this.avatarUser = document.querySelector(avatarSelector);
  }

  setUserInfo(data) {
    this.nameUser.textContent = data.name;
    this.aboutUser.textContent = data.about;
    this.avatarUser.src = data.avatar;
    this.avatarUser.alt = data.name;
  }

  getUserInfo() {
    return {
      name: this.nameUser.textContent,
      about: this.aboutUser.textContent,
    };
  }
}
