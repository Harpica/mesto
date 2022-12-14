export class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._container = document.querySelector(containerSelector);
    this._renderer = renderer;
  }
  renderItems() {
    this._items.forEach((item) => {
      console.log(item);
      this.setElement(this._renderer(item));
    });
  }
  setElement(element) {
    this._container.prepend(element);
  }
  setItems(array) {
    this._items = array;
  }
}
