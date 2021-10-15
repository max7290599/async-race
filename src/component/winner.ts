import { WinnersModel } from '../models/winner-model';
import { renderCarImage } from './render-car-image';
import store from '../store';

const renderWinnersTable = (): string => (store.winners as WinnersModel[]).map((winner, index: number) => `
        <tr>
          <td>${index + 1}</td>
          <td>${renderCarImage(winner.car.color)}</td>
          <td>${winner.car.name}</td>
          <td>${winner.wins}</td>
          <td>${winner.time}</td>
        </tr>
      `).join('');

export const renderWinners = (): string => `
  <h1>Winners (${store.winnersCount})</h1>
  <h2>Page #${store.winnersPage}</h2>
  <table class="table" cellspacing="0" cellpadding="0">
    <thead>
      <th>Number</th>
      <th>Car</th>
      <th>Name</th>
        <th class="table-button table-wins ${store.sortBy === 'wins' ? store.sortOrder : ''}"
          id="sort-by-wins">Wins</th>
        <th class="table-button table-time ${store.sortBy === 'time' ? store.sortOrder : ''}"
          id="sort-by-time">Best time</th>
    </thead>
    <tbody>
      ${renderWinnersTable()}
    <tbody>
  </table>
`;
