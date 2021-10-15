import { startEngine, drive, stopEngine } from '../api';
import store from '../store';
import { getDistanceBetweenElements, animation } from '../utils';

export const startDriving = async (id: number): Promise<{ success: boolean; id: number; time: number; } | ''> => {
  const startButton = document.getElementById(`start-engine-car-${id}`);
  (startButton as HTMLButtonElement).disabled = true;
  startButton?.classList.toggle('enabling', true);

  const { velocity, distance } = await startEngine(id);
  const time = Math.round(distance / velocity);

  startButton?.classList.toggle('enabling', false);
  (document.getElementById(`stop-engine-car-${id}`) as HTMLButtonElement).disabled = false;

  const car = document.getElementById(`car-${id}`);
  const flag = document.getElementById(`flag-${id}`);
  if (car === null || flag === null) return '';
  const htmlDistance = Math.floor(getDistanceBetweenElements(car, flag)) + 100;

  store.animation[id] = animation(car, htmlDistance, time);
  const { success }: { success: boolean } = await drive(id);

  if (!success) window.cancelAnimationFrame(store.animation[id].id);
  return { success, id, time };
};

export const stopDriving = async (id: number): Promise<void> => {
  const stopButton = document.getElementById(`stop-engine-car-${id}`);
  (stopButton as HTMLButtonElement).disabled = true;
  stopButton?.classList.toggle('enabling', true);
  await stopEngine(id);
  stopButton?.classList.toggle('enabling', false);
  (document.getElementById(`start-engine-car-${id}`) as HTMLButtonElement).disabled = false;

  const car = document.getElementById(`car-${id}`);
  (car as HTMLElement).style.transform = 'translateX(0)';
  (car as HTMLElement).style.transitionDuration = '0s';
  if (store.animation[id]) window.cancelAnimationFrame(store.animation[id].id);
};
