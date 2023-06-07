export default class Section {
  constructor({ itemsArr, renderer }, containerSelector) {
    this._itemsArr = itemsArr;
    this._renderer = renderer;

    this._containerSelector = containerSelector;
  }

  renderItems() {
    this._itemsArr.forEach((item) => this._renderer(item));
  }

  addItem(element) {
    this._containerSelector.prepend(element);
  }
}
