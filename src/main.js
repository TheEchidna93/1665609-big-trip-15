import {createMenuTemplate} from './view/menu.js';
import {createSortTemplate} from './view/sort.js';
import {createInfoTemplate} from './view/info.js';
import {createFiltersTemplate} from './view/filters.js';
import {createPointTemplate} from './view/point.js';
// import {createAddPointTemplate} from './view/add-point.js';
import {createEditPointTemplate} from './view/edit-point.js';
import {createEventsListTemplate} from './view/events-list.js';
import {getPoint} from './mock/point.js';

const POINT_COUNT = 20;
let interval = 0;
let hoursPassed = 0;

const points = [];

for (let i = 0; i < POINT_COUNT; i++) {
  interval = Math.floor(Math.random() * 6 + 2);
  points.push(getPoint(hoursPassed, interval, i));
  hoursPassed += interval;
}

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteMainElement = document.querySelector('.trip-main');
const siteTripControlsNavElement = document.querySelector('.trip-controls__navigation');
const siteTripControlsFilterElement = document.querySelector('.trip-controls__filters');
const siteTripEventsElement = document.querySelector('.trip-events');

render(siteMainElement, createInfoTemplate(points), 'afterbegin');
render(siteTripControlsNavElement, createMenuTemplate(), 'beforeend');
render(siteTripControlsFilterElement, createFiltersTemplate(), 'beforeend');
render(siteTripEventsElement, createSortTemplate(), 'beforeend');
render(siteTripEventsElement, createEventsListTemplate(), 'beforeend');

const siteTripEventsListElement = document.querySelector('.trip-events__list');

render(siteTripEventsListElement, createEditPointTemplate(points[0]), 'beforeend');

for (let i = 1; i < POINT_COUNT; i++) {
  render(siteTripEventsListElement, createPointTemplate(points[i]), 'beforeend');
}

