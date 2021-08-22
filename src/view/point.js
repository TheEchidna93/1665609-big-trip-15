import dayjs from 'dayjs';
import {createElement} from '../utils.js';

const capitalize = (sentence) => {
  let tempSentence = sentence;
  tempSentence = tempSentence.split('');
  tempSentence[0] = tempSentence[0].toUpperCase();
  tempSentence = tempSentence.join('');
  return tempSentence;
};

const formatDate = (date, formatType) => {
  if (!formatType) {
    return date;
  }
  // Форматы соответствуют formatType по названию
  const formats = {
    datetime:'YYYY-MM-DDTHH:mm',
    time:'HH:mm',
    shortMonth:'MMM DD',
  };

  let tempDate = dayjs(date.substring(0,16)).format(formats[formatType]);
  if (formatType === 'shortMonth') {
    tempDate = tempDate.split('');
    tempDate[0] = tempDate[0].toUpperCase();
    tempDate[1] = tempDate[1].toUpperCase();
    tempDate[2] = tempDate[2].toUpperCase();
    tempDate = tempDate.join('');
  }

  return tempDate;
};

const prefixByZero = (string) => {
  const newString = `0${string}`;
  return newString;
};

const getDuration = (dateStart, dateEnd) => {
  const tempStart = dateStart.substring(0,16);
  const tempEnd = dateEnd.substring(0,16);
  const hours = dayjs(tempEnd).subtract(dayjs(tempStart).hour(), 'hour').hour();
  const minutes = dayjs(tempEnd).subtract(dayjs(tempStart).minute(), 'minute').minute();
  return `${hours > 10 ? hours : prefixByZero(hours)}H ${minutes > 10 ? minutes : prefixByZero(minutes)}M`;
};

const getOffers = (offers) => {
  let tempOffers = '';
  for (let i = 0; i < offers.length; i++) {
    const template = `
    <li class="event__offer">
      <span class="event__offer-title">${offers[i].title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${offers[i].price}</span>
    </li>`;
    tempOffers += template;
  }
  return tempOffers;
};

export default class Point {
  constructor(point) {
    this._point = point;
    this._element = null;
  }

  createPointTemplate(point) {
    return `<li class="trip-events__item">
      <div class="event">
        <time class="event__date" datetime="2019-03-18">${formatDate(point.date_from, 'shortMonth')}</time>
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${point.type}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${capitalize(point.type)} ${point.destination.name}</h3>
        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${formatDate(point.date_from, 'datetime')}">${formatDate(point.date_from, 'time')}</time>
            &mdash;
            <time class="event__end-time" datetime="${formatDate(point.date_to, 'datetime')}">${formatDate(point.date_to, 'time')}</time>
          </p>
          <p class="event__duration">${getDuration(point.date_from, point.date_to)}</p>
        </div>
        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${point.base_price}</span>
        </p>
        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          ${getOffers(point.offers)}
        </ul>
        <button class="event__favorite-btn" type="button">
          <span class="visually-hidden">Add to favorite</span>
          <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
            <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
          </svg>
        </button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`;
  }

  getTemplate() {
    return this.createPointTemplate(this._point);
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
