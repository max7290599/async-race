/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { models, names } from './constant';
import { AnimationStateModel } from './models/animation-state-model';
import { CarModel, CreateCarModel } from './models/car-model';
import { PromisesCarRace } from './models/promises-car-race';
import store from './store';

function getPositionAtCenter(element: HTMLElement) {
  const {
    top, left, width, height,
  } = element.getBoundingClientRect();
  return {
    x: left + width / 2,
    y: top + height / 2,
  };
}

export function getDistanceBetweenElements(a: HTMLElement, b: HTMLElement): number {
  const aPosition = getPositionAtCenter(a);
  const bPosition = getPositionAtCenter(b);

  return Math.hypot(aPosition.x - bPosition.x, aPosition.y - bPosition.y);
}

export function animation(car: HTMLElement, distance: number, animationTime: number): AnimationStateModel {
  let start: number | null = null;
  const state: AnimationStateModel = {};

  function step(timestamp: number) {
    if (!start) start = timestamp;
    const time = timestamp - start;
    const passed = Math.round(time * (distance / animationTime));

    car.style.transform = `translateX(${Math.min(passed, distance)}px)`;
    if (passed < distance) {
      state.id = window.requestAnimationFrame(step);
    }
  }
  state.id = window.requestAnimationFrame(step);

  return state;
}

export const raceAll = async (promises: PromisesCarRace[], ids: number[]): Promise<PromisesCarRace> => {
  const { success, id, time } = await Promise.race(promises);

  if (!success) {
    const failedIndex = ids.findIndex((i: number) => i === id);
    const restPromises = [...promises.slice(0, failedIndex), ...promises.slice(failedIndex + 1, promises.length)];
    const restIds = [...ids.slice(0, failedIndex), ...ids.slice(failedIndex + 1, ids.length)];
    return raceAll(restPromises, restIds);
  }
  return { id, time };
};

export const race = async (action: any): Promise<PromisesCarRace> => {
  const promises: PromisesCarRace[] = store.cars.map(({ id }: AnimationStateModel) => action(id));
  const winner = await raceAll(promises, store.cars.map((car: CarModel) => car.id));
  const winnerCar = store.cars.find((car: CarModel) => car.id === winner.id);
  return { ...winner, name: winnerCar.name };
};

const getRandomName = (): string => {
  const model = models[Math.floor(Math.random() * models.length)];
  const name = names[Math.floor(Math.random() * models.length)];
  return `${model} ${name}`;
};

const getRandomColor = (): string => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export const generateRandomCars = (count = 100): CreateCarModel[] => new Array(count).fill(1)
  .map(() => ({ name: getRandomName(), color: getRandomColor() }));
