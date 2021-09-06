import dayjs from 'dayjs';
import {nanoid} from 'nanoid';
import {getRandomInteger} from '../utils/common.js';

// Данные

const types = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];
const names = ['Chamonix', 'Ankara', 'Geneva', 'Ottawa', 'Chelyabinsk', 'Montreal', 'Sydney', 'Sarajevo'];
const text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.';
const offers = {
  taxi: [
    {title: 'Upgrade to a business class', price: 120},
    {title: 'Choose the radio station', price: 60},
  ],
  bus: [
    {title: 'Neck pillows', price: 30},
  ],
  train: [
    {title: 'Snacks', price: 50},
  ],
  ship: [],
  drive: [],
  flight: [
    {title: 'Business class', price: 200},
  ],
  'check-in':[],
  sightseeing: [
    {title: 'Tour guide', price: 120},
  ],
  restaurant: [
    {title: 'WIP seat', price: 200},
  ],
};

// Методы

const getType = () => {
  const index = getRandomInteger(0, types.length-1);
  return types[index];
};

const getName = () => {
  const index = getRandomInteger(0, names.length-1);
  return names[index];
};

const getDescription = (count) => {
  const sentences = text.split('. ');
  const description = [];
  let index = 0;
  const sentenceCount = getRandomInteger(1, count);

  for (let i = 0; i < sentenceCount; i++) {
    index = getRandomInteger(0, sentences.length);
    description.push(sentences[index]);
    sentences.splice(index, 1);
  }

  return description.join('. ');
};

const getOffers = (type) => {
  const tempOffers = [];
  let maxOffers = getRandomInteger(0, offers[type].length);
  maxOffers = Math.min(maxOffers, 5);

  for (let i = 0; i < maxOffers; i++) {
    tempOffers.push(offers[type][i]);
  }

  return tempOffers;
};

const getDate = (hoursPassed = 0, interval = 0) => {
  const format = 'YYYY-MM-DDTHH:mm:ssZ[Z]';
  return dayjs().add(hoursPassed, 'hour').add(interval, 'hour').format(format);
};

const getPhoto = () => `http://picsum.photos/248/152?r=${getRandomInteger(1, 25)}`;

// interval, hoursPassed - чтобы даты шли последовательно, id - для id
export const getPoint = (hoursPassed, interval, id) => {
  const type = getType();
  return {
    'base_price': getRandomInteger(1, 15) * 100,
    'date_from': getDate(hoursPassed),
    'date_to': getDate(hoursPassed, interval),
    destination: {
      description: getDescription(5),
      name: getName(),
      pictures: [
        {
          src: getPhoto(),
          description: getDescription(1),
        },
      ],
    },
    id: nanoid(),
    'is_favorite': Boolean(getRandomInteger(0, 1)),
    offers: getOffers(type),
    type: type,
  };
};
