import PointView from '../view/point.js';
import EditPointView from '../view/edit-point.js';
// import AddPointView from '../view/add-point.js';
import {render, RenderPosition, replace} from '../utils/render.js';

export default class Point {
  constructor(pointListContainer) {
    this._pointListContainer = pointListContainer;

    this._pointComponent = null;
    this.editPointComponent = null;

    this._handleEditClick = this._handleEditClick.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  init(point) {
    this._point = point;

    this._pointComponent = new PointView(point);
    this._editPointComponent =  new EditPointView(point);

    this._pointComponent.setEditClickHandler(this._handleEditClick);
    this._editPointComponent.setFormSubmitHandler(this._handleFormSubmit);

    render(this._pointListContainer, this._pointComponent, RenderPosition.BEFOREEND);
  }

  _replacePointToForm() {
    replace(this._editPointComponent, this._pointComponent);
    document.addEventListener('keydown', this._escKeyDownHandler);
  }

  _replaceFormToPoint() {
    replace(this._pointComponent, this._editPointComponent);
    document.removeEventListener('keydown', this._escKeyDownHandler);
  }

  _escKeyDownHandler(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this._replaceFormToPoint();
    }
  }

  _handleEditClick() {
    this._replacePointToForm();
  }

  _handleFormSubmit() {
    this._replaceFormToPoint();
  }
}