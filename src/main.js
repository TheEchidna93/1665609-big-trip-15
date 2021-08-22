import MenuView from './view/menu.js';
import SortView from './view/sort.js';
import InfoView from './view/info.js';
import FiltersView from './view/filters.js';
import PointView from './view/point.js';
// import AddPointView from './view/add-point.js';
import EditPointView from './view/edit-point.js';
import EventsListView from './view/events-list.js';
import {getPoint} from './mock/point.js';
import {render, RenderPosition} from './utils.js';

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

const renderPoint = (siteTripEventsListElement, point) => {
  const pointComponent = new PointView(point);
  const editPointComponent = new EditPointView(point);

  const replacePointToForm = () => {
    siteTripEventsListElement.replaceChild(editPointComponent.getElement(), pointComponent.getElement());
  };
  
  const replaceFormToPoint = () => {
    siteTripEventsListElement.replaceChild(pointComponent.getElement(), editPointComponent.getElement());
  };
  
  pointComponent.getElement().querySelector('.event__rollup-btn').addEventListener('click', () => {
    replacePointToForm();
  });
  
  editPointComponent.getElement().querySelector('form').addEventListener('submit', (evt) => {
    evt.preventDefault();
    replaceFormToPoint();
  });

  render(siteTripEventsListElement, pointComponent.getElement(), RenderPosition.BEFOREEND);
};

render(siteMainElement, new InfoView(points).getElement(), RenderPosition.AFTERBEGIN);
render(siteTripControlsNavElement, new MenuView().getElement(), RenderPosition.BEFOREEND);
render(siteTripControlsFilterElement, new FiltersView().getElement(), RenderPosition.BEFOREEND);
render(siteTripEventsElement, new SortView().getElement(), RenderPosition.BEFOREEND);
render(siteTripEventsElement, new EventsListView().getElement(), RenderPosition.BEFOREEND);

const siteTripEventsListElement = document.querySelector('.trip-events__list');

points.forEach(point => {
  // render(siteTripEventsListElement, new PointView(point).getElement(), RenderPosition.BEFOREEND);
  renderPoint(siteTripEventsListElement, point);
});
