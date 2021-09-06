import PointView from '../view/point.js';
import EditPointView from '../view/edit-point.js';
// import AddPointView from '../view/add-point.js';
import {render, RenderPosition, replace, remove} from '../utils/render.js';

export default class Point {
  constructor(pointListContainer, changeData) {
    this._pointListContainer = pointListContainer;
    this._changeData = changeData;

    this._pointComponent = null;
    this.editPointComponent = null;

    this._handleEditClick = this._handleEditClick.bind(this);
    this._handleFavClick =  this._handleFavClick.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  init(point) {
    this._point = point;

    const prevPointComponent = this._pointComponent;
    const prevEditPointComponent = this._editPointComponent;

    this._pointComponent = new PointView(point);
    this._editPointComponent =  new EditPointView(point);

    this._pointComponent.setEditClickHandler(this._handleEditClick);
    this._pointComponent.setFavClickHandler(this._handleFavClick);
    this._editPointComponent.setFormSubmitHandler(this._handleFormSubmit);

    if (prevPointComponent === null || prevEditPointComponent === null) {
      render(this._pointListContainer, this._pointComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this._pointListContainer.getElement().contains(prevPointComponent.getElement())) {
      replace(this._pointComponent, prevPointComponent);
    }

    if (this._pointListContainer.getElement().contains(prevEditPointComponent.getElement())) {
      replace(this._editPointComponent, prevEditPointComponent);
    }

    remove(prevPointComponent);
    remove(prevEditPointComponent);
  }

  destroy() {
    remove(this._pointComponent);
    remove(this._editPointComponent);
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

  _handleFavClick() {
    this._changeData(
      Object.assign(
        {},
        this._point,
        {
          is_favorite: !this._point.is_favorite,
        },
      ),
    );
  }

  _handleFormSubmit() {
    this._replaceFormToPoint();
  }
}