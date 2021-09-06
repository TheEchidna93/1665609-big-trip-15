// Функция из интернета по генерации случайного числа из диапазона
// Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random
export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const capitalize = (sentence) => {
  let tempSentence = sentence;
  tempSentence = tempSentence.split('');
  tempSentence[0] = tempSentence[0].toUpperCase();
  tempSentence = tempSentence.join('');
  return tempSentence;
};

export const prefixByZero = (string) => {
  const newString = `0${string}`;
  return newString;
};

export const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1),
  ];
};
