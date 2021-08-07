import dayjs from 'dayjs';

const getRoute = (points) => {
  let finalRoute = [];
  points.forEach((point) => {
    if (finalRoute.indexOf(point.destination.name) === -1) {
      finalRoute.push(point.destination.name);
    }
  });
  finalRoute = finalRoute.join(' &mdash; ');
  return finalRoute;
};

const formatDate = (date) => {
  const format = 'MMM DD';
  const tempDate = date.format(format);
  return tempDate;
};

const prefixByZero = (string) => {
  const newString = `0${string}`;
  return newString;
};

const getDates = (points) => {
  const dateStart = dayjs(points[0].date_from.substring(0, 16));
  let dateEnd = dayjs(points[0].date_to.substring(0, 16));
  let currentDate;
  let finalDates = '';

  points.forEach((point) => {
    currentDate = dayjs(point.date_to.substring(0, 16));
    if ( currentDate.isAfter(dateEnd) ) {
      dateEnd = currentDate;
    }
  });

  if (dateStart.month() === dateEnd.month()) {
    finalDates = `${formatDate(dateStart)}&nbsp;&mdash;&nbsp;${dateEnd.date() > 10 ? dateEnd.date() : prefixByZero(dateEnd.date())}`;
  } else {
    finalDates = `${formatDate(dateStart)}&nbsp;&mdash;&nbsp;${formatDate(dateEnd)}`;
  }

  return finalDates;
};

const getCost = (points) => {
  let finalCost = 0;
  points.forEach((point) => {
    finalCost += point.base_price;
  });
  return finalCost;
};

export const createInfoTemplate = (points) => `
    <section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">${getRoute(points)}</h1>

        <p class="trip-info__dates">${getDates(points)}</p>
      </div>

      <p class="trip-info__cost">
        Total: &euro;&nbsp;<span class="trip-info__cost-value">${getCost(points)}</span>
      </p>
    </section>
  `;
