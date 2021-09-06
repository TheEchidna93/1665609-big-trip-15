import AbstractView from './abstract.js';

export default class EventsList extends AbstractView {

  createEventsListTemplate() { return '<ul class="trip-events__list"></ul>';}

  getTemplate() {
    return this.createEventsListTemplate();
  }
}
