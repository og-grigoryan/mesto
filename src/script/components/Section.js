export default class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;

    this._containerSelector = containerSelector;
  }

  renderItems(itemsArr) {
    itemsArr.forEach((item) => this._renderer(item));
  }

  addItemAppend(element) {
    this._containerSelector.append(element);
  }

  addItemPrepend(element) {
    this._containerSelector.prepend(element);
  }
}