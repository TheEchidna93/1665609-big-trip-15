import dayjs from 'dayjs';

export const sortPointDown = (pointA, pointB) => {
  const diffA = dayjs(pointA.date_from.substring(0,16)).diff(dayjs(pointA.date_to.substring(0,16)));
  const diffB = dayjs(pointB.date_from.substring(0,16)).diff(dayjs(pointB.date_to.substring(0,16)));
  const result = diffA - diffB;
  return result;
};
