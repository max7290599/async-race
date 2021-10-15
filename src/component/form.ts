/* eslint-disable @typescript-eslint/no-explicit-any */
import { createCar, updateCar } from '../api';
import { CreateCarModel } from '../models/car-model';
import { renderGarage } from './garage';
import { updateStateGarage } from './update-state';

export const getForm = (id: string): string => `
  <form class="form" id="${id}">
    <input class="input" id="${id}-name" name="name" type="text">
    <input class="input" id="${id}-id" type="text" hidden>
    <input class="color" id="${id}-color" name="color" type="color" value="#ffffff">
    <button class="button" type="submit" id="${id}-submit">${id}</button>
  </form>
`;

export const getFormCar = (event: Event): CreateCarModel => {
  const target = event.target as HTMLFormElement;
  event.preventDefault();

  const car: CreateCarModel = Object.fromEntries(new Map([...target].filter(({ name }: any) => !!name)
    .map(({ value, name }: any) => [name, value])));

  target.disabled = true;
  return car;
};

export const handlerForm = async (nameForm: string): Promise<void> => {
  const nameCar = (document.getElementById(`${nameForm}-name`) as HTMLInputElement);
  const colorCar = (document.getElementById(`${nameForm}-color`) as HTMLInputElement);
  await renderGarage();
  nameCar.value = '';
  colorCar.value = '#ffffff';
};

export const listenForm = (): void => {
  (<HTMLButtonElement>document.getElementById('create')).addEventListener('submit', async (event: Event) => {
    await createCar(getFormCar(event));
    handlerForm('create');
    await updateStateGarage();
  });

  document.getElementById('update')?.addEventListener('submit', async (event: Event) => {
    handlerForm('update');
    const updateCarId = +(document.getElementById('update-id') as HTMLInputElement).value;
    await updateCar(updateCarId, getFormCar(event));
    await updateStateGarage();
  });
};
