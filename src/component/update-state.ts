import { getCars, getWinners } from '../api';
import { renderGarage } from './garage';
import { getPages } from './pages';
import { renderWinners } from './winner';
import store from '../store';

export const updateStateGarage = async (): Promise<void> => {
  const { items, count } = await getCars(store.carsPage);

  store.cars = items;
  store.carsCount = count;

  getPages(store.carsPage, store.carsCount, 7);
  renderGarage();
};

export const updateStateWinners = async (): Promise<void> => {
  const { items, count } = await getWinners({ page: store.winnersPage, sort: store.sortBy, order: store.sortOrder });
  store.winners = items;
  store.winnersCount = count;

  getPages(store.winnersPage, store.winnersCount, 10);
  (<HTMLElement>document.getElementById('winners-view')).innerHTML = renderWinners();
};
