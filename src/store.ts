/* eslint-disable @typescript-eslint/no-explicit-any */
import { getCars, getWinners } from './api';

const data: any = {
  carsPage: 1,
  cars: [],
  carsCount: 0,
  winnersPage: 1,
  winners: [],
  winnersCount: 0,
  animation: {},
  view: 'garage',
  sortBy: null,
  sortOrder: null,
};

getCars(1).then(({ items: cars, count: carsCount }) => {
  data.cars = cars;
  data.carsCount = carsCount;
});

getWinners({ page: 1, sort: 'id', order: 'asc' }).then(({ items: winners, count: winnersCount }) => {
  data.winners = winners;
  data.winnersCount = winnersCount;
});

export default data;
