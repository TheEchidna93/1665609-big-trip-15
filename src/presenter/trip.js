import MenuView from '../view/menu.js';
import SortView from '../view/sort.js';
import InfoView from '../view/info.js';
import FiltersView from '../view/filters.js';
import NoPointView from '../view/no-point.js';
import EventsListView from '../view/events-list.js';
import PointPresenter from './point.js';
import {updateItem} from '../utils/common.js';
import {render, RenderPosition} from '../utils/render.js';

export default class Trip {
  constructor(mainContainer, navContainer, filterContainer, eventsContainer, points) {
    this._points = points;
    this._mainContainer = mainContainer;
    this._navContainer = navContainer;
    this._filterContainer = filterContainer;
    this._eventsContainer = eventsContainer;
    this._pointPresenter = new Map();

    this._menuComponent = new MenuView();
    this._sortComponent = new SortView();
    this._infoComponent = new InfoView(points);
    this._filtersComponent = new FiltersView();
    this._eventListComponent = new EventsListView();
    this._noPointComponent = new NoPointView();

    this._handlePointChange = this._handlePointChange.bind(this);
  }

  init() {
    this._renderMenu();
    this._renderFilters();
    this._renderInfo();
    this._renderSort();
    this._renderEventList();

    this._renderPoints(this._points);
  }

  _handlePointChange(updatedPoint) {
    this._points = updateItem(this._points, updatedPoint);
    this._pointPresenter.get(updatedPoint.id).init(updatedPoint);
  }

  _renderMenu() {
    render(this._navContainer, this._menuComponent, RenderPosition.BEFOREEND);
  }

  _renderFilters() {
    render(this._filterContainer, this._filtersComponent, RenderPosition.BEFOREEND);
  }

  _renderInfo() {
    render(this._mainContainer, this._infoComponent, RenderPosition.AFTERBEGIN);
  }

  _renderSort() {
    render(this._eventsContainer, this._sortComponent, RenderPosition.BEFOREEND);
  }

  _renderEventList() {
    render(this._eventsContainer, this._eventListComponent, RenderPosition.BEFOREEND);
  }

  _renderPoint(point) {
    const pointPresenter = new PointPresenter(this._eventListComponent, this._handlePointChange);
    pointPresenter.init(point);
    this._pointPresenter.set(point.id, pointPresenter);
  }

  _renderPoints(points) {
    if (points.length == 0) {
      this._renderNoPoints();
    } else {
    points.forEach((point) => {
      this._renderPoint(point);
    });
    }
  }

  _clearEventList() {
    this._pointPresenter.forEach((presenter) => presenter.destroy());
    this._pointPresenter.clear();
  }

  _renderNoPoints() {
    render(this._eventsListComponent, this._noPointComponent, RenderPosition.BEFOREEND);
  }
}