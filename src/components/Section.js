export default class Section {
  constructor({
    renderer
  }, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems(cards) {
    cards.forEach(item => {
      this._renderer(
        {
          name: item.name,
          link: item.link,
          likes: item.likes,
        });
    });
  }

  addItem(element, isArray) {
    if (isArray) {
      this._container.append(element);
    } else {
      this._container.prepend(element);
    }
  }
}