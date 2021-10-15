import { updateStateWinners } from './update-state';
import { renderWinners } from './winner';
import store from '../store';
import { getPages } from './pages';

export const getRenderNav = (): string => `
  <div class="menu">
    <button class="button garage-menu-button" id="garage-menu">To garage</button>
    <button class="button winners-menu-button" id="winners-menu">To winners</button>
  </div>
`;

export const handlerNavGarage = (): void => {
  (<HTMLButtonElement>document.getElementById('garage-view')).style.display = 'block';
  (<HTMLButtonElement>document.getElementById('winners-view')).style.display = 'none';
  store.view = 'garage';
};

export const handlerNavWinners = (): void => {
  (<HTMLButtonElement>document.getElementById('garage-view')).style.display = 'none';
  (<HTMLButtonElement>document.getElementById('winners-view')).style.display = 'block';
  store.view = 'winners';
  renderWinners();
};

export const listenNav = (): void => {
  (<HTMLButtonElement>document.getElementById('garage-menu')).addEventListener('click', async () => {
    handlerNavGarage();
    getPages(store.carsPage, store.carsCount, 7);
  });

  (<HTMLButtonElement>document.getElementById('winners-menu')).addEventListener('click', async () => {
    handlerNavWinners();
    await updateStateWinners();
  });
};
