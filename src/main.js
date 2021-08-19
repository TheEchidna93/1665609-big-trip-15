import MenuView from './view/menu.js';
import SortView from './view/sort.js';
import InfoView from './view/info.js';
import FiltersView from './view/filters.js';
import PointView from './view/point.js';
// import AddPointView from './view/add-point.js';
import EditPointView from './view/edit-point.js';
import EventsListView from './view/events-list.js';
import {getPoint} from './mock/point.js';
import {renderTemplate, renderElement, RenderPosition} from './utils.js';

const POINT_COUNT = 20;
let interval = 0;
let hoursPassed = 0;

const points = [];

for (let i = 0; i < POINT_COUNT; i++) {
  interval = Math.floor(Math.random() * 6 + 2);
  points.push(getPoint(hoursPassed, interval, i));
  hoursPassed += interval;
}

const siteMainElement = document.querySelector('.trip-main');
const siteTripControlsNavElement = document.querySelector('.trip-controls__navigation');
const siteTripControlsFilterElement = document.querySelector('.trip-controls__filters');
const siteTripEventsElement = document.querySelector('.trip-events');

renderElement(siteMainElement, new InfoView(points).getElement(), RenderPosition.AFTERBEGIN);
renderElement(siteTripControlsNavElement, new MenuView().getElement(), RenderPosition.BEFOREEND);
renderElement(siteTripControlsFilterElement, new FiltersView().getElement(), RenderPosition.BEFOREEND);
renderElement(siteTripEventsElement, new SortView().getElement(), RenderPosition.BEFOREEND);
renderElement(siteTripEventsElement, new EventsListView().getElement(), RenderPosition.BEFOREEND);

const siteTripEventsListElement = document.querySelector('.trip-events__list');

renderElement(siteTripEventsListElement, new EditPointView(points[0]).getElement(), RenderPosition.BEFOREEND);

for (let i = 1; i < POINT_COUNT; i++) {
  renderElement(siteTripEventsListElement, new PointView(points[i]).getElement(), RenderPosition.BEFOREEND);
}

