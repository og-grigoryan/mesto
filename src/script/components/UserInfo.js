export default class UserInfo {
  constructor(nameSelector, descriptionSelector) {
    this.nameUser = document.querySelector(nameSelector);
    this.aboutUser = document.querySelector(descriptionSelector);
  }

  setUserInfo(data) {
    this.nameUser.textContent = data.name;
    this.aboutUser.textContent = data.description;
  }

  getUserInfo() {
    return {
      name: this.nameUser.textContent,
      description: this.aboutUser.textContent
    }
  }
}
