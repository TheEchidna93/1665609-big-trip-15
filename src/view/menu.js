import AbstractView from './abstract.js';

export default class Menu extends AbstractView {
  createMenuTemplate() {
    return `<nav class="trip-controls__trip-tabs  trip-tabs">
      <a class="trip-tabs__btn  trip-tabs__btn--active" href="#">Table</a>
      <a class="trip-tabs__btn" href="#">Stats</a>
    </nav>`;
  }

  getTemplate() {
    return this.createMenuTemplate();
  }
}
