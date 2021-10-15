import { winnerView } from '../constant';
import { renderGarage } from './garage';
import { renderWinners } from './winner';
import store from '../store';
import { updateStateGarage, updateStateWinners } from './update-state';

export const renderPagination = (): string => `
  <div class="pagination">
    <button class="button primary prev-button" disabled id="prev">Prev</button>
    <button class="button primary next-button" disabled id="next">Next</button>
  </div>
`;

export const getPrevPage = (): void => {
  switch (store.view) {
    case 'garage': {
      store.carsPage--;
      updateStateGarage();
      renderGarage();
      break;
    }
    case 'winners': {
      store.winnersPage--;
      updateStateWinners();
      winnerView.insertAdjacentHTML('afterbegin', renderWinners());
      break;
    }
    default:
  }
};

export const getNextPage = (): void => {
  switch (store.view) {
    case 'garage': {
      store.carsPage++;
      updateStateGarage();
      renderGarage();
      break;
    }
    case 'winners': {
      store.winnersPage++;
      updateStateWinners();
      winnerView.insertAdjacentHTML('afterbegin', renderWinners());
      break;
    }
    default:
  }
};
