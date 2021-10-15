import { CarModel } from '../models/car-model';
import { renderCar } from './car';
import store from '../store';

const renderCarsGarage = () => store.cars.map((car: CarModel) => `<li>${renderCar(car)}</li>`).join('');

export const renderGarage = (): void => {
  (document.getElementById('garage') as HTMLElement).innerHTML = `
  <h1>Garage (${store.carsCount})</h1>
  <h2>Page #${store.carsPage}</h2>
  <ul class="garage">
    ${renderCarsGarage()}
  </ul>
`;
};
