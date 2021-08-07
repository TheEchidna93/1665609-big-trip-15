import dayjs from 'dayjs';

// Данные

const types = ["taxi", "bus", "train", "ship", "drive", "flight", "check-in", "sightseeing", "restaurant"];
const names = ["Chamonix", "Ankara", "Geneva", "Ottawa", "Chelyabinsk", "Montreal", "Sydney", "Sarajevo"];
const text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.";
const offers = {
  taxi: [
    {title: "Upgrade to a business class", price: 120},
    {title: "Choose the radio station", price: 60}
  ],
  bus: [
    {title: "Neck pillows", price: 30}
  ],
  train: [
    {title: "Snacks", price: 50}
  ],
  ship: [],
  drive: [],
  flight: [
    {title: "Business class", price: 200}
  ],
  'check-in':[],
  sightseeing: [
    {title: "Tour guide", price: 120}
  ],
  restaurant: [
    {title: "WIP seat", price: 200}
  ],
};

// Методы

// Функция из интернета по генерации случайного числа из диапазона
// Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random
const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getType = () => {
  let index = getRandomInteger(0, types.length-1);
  return types[index];
};

const getName = () => {
  let index = getRandomInteger(0, names.length);
  return names[index];
};

const getDescription = (count) => {
  let sentences = text.split(". ");
  let description = [];
  let index = 0;
  let sentenceCount = getRandomInteger(1, count);

  for (let i = 0; i < sentenceCount; i++) {
    index = getRandomInteger(0, sentences.length);
    description.push(sentences[index]);
    sentences.splice(index, 1);
  }

  return description.join(". ");
}

const getOffers = (type) => {
  let tempOffers = [];
  let maxOffers = getRandomInteger(1, offers[type].length);
  maxOffers = Math.min(maxOffers, 5);

  for (let i = 0; i < maxOffers; i++) {
    tempOffers.push(offers[type][i]);
  }

  return tempOffers;
}

const getDate = (hoursPassed = 0, interval = 0) => {
  const format = "YYYY-MM-DDTHH:mm:ssZ[Z]";
  return dayjs().add(hoursPassed, 'hour').add(interval, 'hour').format(format);
}

const getPhoto = () => {
  return `http://picsum.photos/248/152?r=${getRandomInteger(1, 25)}`
}

// interval, hoursPassed - чтобы даты шли последовательно, id - для id
export const getPoint = (hoursPassed, interval, id) => {
  let type = getType();
  return {
    base_price: getRandomInteger(1, 15) * 100,
    date_from: getDate(hoursPassed),
    date_to: getDate(hoursPassed, interval),
    destination: {
      description: getDescription(5),
      name: getName(),
      pictures: [
        {
        src: getPhoto(),
        description: getDescription(1),
        }
      ],
    },
    id: id,
    is_favorite: Boolean(getRandomInteger),
    offers: getOffers(type),
    type: type,
  }
}






