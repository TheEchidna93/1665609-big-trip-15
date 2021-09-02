import MenuView from '../view/menu.js';
import SortView from '../view/sort.js';
import InfoView from '../view/info.js';
import FiltersView from '../view/filters.js';
import PointView from '../view/point.js';
// import AddPointView from '../view/add-point.js';
import EditPointView from '../view/edit-point.js';
import NoPointView from '../view/no-point.js';
import EventsListView from '../view/events-list.js';
import {render, RenderPosition, replace} from '../utils/render.js';

export default class Trip {
  constructor(mainContainer, navContainer, filterContainer, eventsContainer, points) {
    this._points = points;
    this._mainContainer = mainContainer;
    this._navContainer = navContainer;
    this._filterContainer = filterContainer;
    this._eventsContainer = eventsContainer;

    this._menuComponent = new MenuView();
    this._sortComponent = new SortView();
    this._infoComponent = new InfoView(points);
    this._filtersComponent = new FiltersView();
    this._eventListComponent = new EventsListView();
    this._noPointComponent = new NoPointView();
  }

  init() {
    this._renderMenu();
    this._renderFilters();
    this._renderInfo();
    this._renderSort();
    this._renderEventList();

    this._renderPoints(this._points);
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
    const pointComponent = new PointView(point);
    const editPointComponent = new EditPointView(point);

    const replacePointToForm = () => {
      replace(editPointComponent, pointComponent);
    };

    const replaceFormToPoint = () => {
      replace(pointComponent, editPointComponent);
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceFormToPoint();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    pointComponent.setEditClickHandler(() => {
      replacePointToForm();
      document.addEventListener('keydown', onEscKeyDown);
    });

    editPointComponent.setFormSubmitHandler(() => {
      replaceFormToPoint();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    render(this._eventListComponent, pointComponent, RenderPosition.BEFOREEND);
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

  _renderNoPoints() {
    render(this._eventsListComponent, this._noPointComponent, RenderPosition.BEFOREEND);
  }
}