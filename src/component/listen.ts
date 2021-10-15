import {
  getCar, deleteCar, deleteWiner, createCar, saveWinner,
} from '../api';
import { CarModel } from '../models/car-model';
import { generateRandomCars, race } from '../utils';
import { renderGarage } from './garage';
import { listenNav } from './nav';
import { updateStateGarage } from './update-state';
import store from '../store';
import { stopDriving, startDriving } from './drive';
import { setSortOrder } from './sort';
import { listenForm } from './form';
import { getNextPage, getPrevPage } from './pagination';

export const listen = (): void => {
  document.body.addEventListener('click', async (event: Event) => {
    const target = event.target as HTMLButtonElement;

    if (target.classList.contains('start-engine-button')) {
      const id = +target.id.split('start-engine-car-')[1];
      startDriving(id);
    }

    if (target.classList.contains('stop-engine-button')) {
      const id = +target.id.split('stop-engine-car-')[1];
      stopDriving(id);
    }

    if (target.classList.contains('select-button')) {
      const selectedCar: CarModel = await getCar(Number(target.id.split('select-car-')[1]));
      (document.getElementById('update-name') as HTMLInputElement).value = selectedCar.name;
      (document.getElementById('update-id') as HTMLInputElement).value = String(selectedCar.id);
      (document.getElementById('update-color') as HTMLInputElement).value = selectedCar.color;
      (document.getElementById('update-name') as HTMLInputElement).disabled = false;
      (document.getElementById('update-color') as HTMLInputElement).disabled = false;
      (document.getElementById('update-submit') as HTMLInputElement).disabled = false;
    }
    if (target.classList.contains('remove-button')) {
      const id = +target.id.split('remove-car-')[1];
      await deleteCar(id);
      await deleteWiner(id);
      await updateStateGarage();
      renderGarage();
    }
    if (target.classList.contains('generator-button')) {
      target.disabled = true;
      const cars = generateRandomCars();
      await Promise.all(cars.map(async (car) => createCar(car)));
      await updateStateGarage();
      renderGarage();
      target.disabled = false;
    }
    if (target.classList.contains('race-button')) {
      target.disabled = true;
      const winner = await race(startDriving);
      await saveWinner(winner);
      const message = document.getElementById('message');
      (message as HTMLElement).innerHTML = `${winner.name} went first (${winner.time / 1000}sec)!`;
      message?.classList.toggle('visible');
      (document.getElementById('reset') as HTMLButtonElement).disabled = false;
    }
    if (target.classList.contains('reset-button')) {
      target.disabled = true;
      store.cars.map((car: CarModel) => stopDriving(car.id));
      const message = document.getElementById('message');
      message?.classList.toggle('visible', false);
      (document.getElementById('race') as HTMLButtonElement).disabled = false;
    }
    if (target.classList.contains('prev-button')) {
      getPrevPage();
    }
    if (target.classList.contains('next-button')) {
      getNextPage();
    }
    if (target.classList.contains('table-wins')) {
      setSortOrder('wins');
    }
    if (target.classList.contains('table-time')) {
      setSortOrder('time');
    }
  });
  listenNav();
  listenForm();
};
