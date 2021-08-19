import {createElement} from "../utils.js";

export default class EventsList {
  constructor() {
    this._element = null;
  }

  createEventsListTemplate() { return '<ul class="trip-events__list"></ul>'}

  getTemplate() {
    return this.createEventsListTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}