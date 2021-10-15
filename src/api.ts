import { url } from './constant';
import { CarModel, CreateCarModel, EngineCarModel } from './models/car-model';
import { OptionalWinnerModel } from './models/options-winner-model';
import {
  CreateWinnerModel, SaveWinnerModel, WinnerModel, WinnersModel,
} from './models/winner-model';

export const getCars = async (page: number, limit = 7): Promise<{ items: CarModel[], count: number }> => {
  const response = await fetch(`${url.garage}?_page=${page}&_limit=${limit}`);

  return {
    items: await response.json(),
    count: Number(response.headers.get('X-Total-Count')),
  };
};

export const getCar = async (id: number): Promise<CarModel> => (await fetch(`${url.garage}/${id}`)).json();

export const createCar = async (body: CreateCarModel): Promise<void> => (await fetch(url.garage, {
  method: 'POST',
  body: JSON.stringify(body),
  headers: {
    'Content-Type': 'application/json',
  },
})).json();

export const deleteCar = async (id: number): Promise<void> => (
  await fetch(`${url.garage}/${id}`, {
    method: 'DELETE',
  })).json();

export const updateCar = async (id: number, body: CreateCarModel): Promise<void> => (await fetch(
  `${url.garage}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  },
)).json();

export const startEngine = async (id: number): Promise<EngineCarModel> => (
  await fetch(`${url.engine}?id=${id}&status=started`)
).json();

export const stopEngine = async (id: number): Promise<Response> => (
  await fetch(`${url.engine}?id=${id}&status=stopped`)
).json();

export const drive = async (id: number): Promise<{ success: boolean }> => {
  const res = await fetch(`${url.engine}?id=${id}&status=drive`).catch();
  return { success: res.status === 200 };
};

export const getWinners = async (optional: OptionalWinnerModel): Promise<{ items: WinnersModel[], count: number }> => {
  const response = await fetch(`${url.winners}?_page=${optional.page}
    &_limit=${optional.limit = 10}&_sort=${optional.sort}&_order=${optional.order}`);

  const items = await response.json();

  return {
    items: await Promise.all(items.map(async (winner: WinnersModel) => (
      { ...winner, car: await getCar(winner.id) }))),
    count: Number(response.headers.get('X-Total-Count')),
  };
};

export const getWinner = async (id: number): Promise<WinnerModel> => (await fetch(`${url.winners}/${id}`)).json();

export const getWinnerStatus = async (id: number): Promise<number> => (await fetch(`${url.winners}/${id}`)).status;

export const deleteWiner = async (id: number): Promise<void> => (await fetch(`${url.winners}/${id}`,
  { method: 'DELETE' })).json();

export const createWinner = async (body: CreateWinnerModel): Promise<string> => (await fetch(url.winners, {
  method: 'POST',
  body: JSON.stringify(body),
  headers: {
    'Content-Type': 'application/json',
  },
})).json();

export const updateWinner = async (id: number, body: CreateWinnerModel): Promise<string> => (
  await fetch(`${url.winners}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  })).json();

export const saveWinner = async ({ id, time }: SaveWinnerModel): Promise<void> => {
  const winnerStatus = await getWinnerStatus(id);

  if (winnerStatus === 404) {
    await createWinner({
      id,
      wins: 1,
      time: time / 1000,
    });
  } else {
    const winner = await getWinner(id);
    await updateWinner(id, {
      id,
      wins: winner.wins + 1,
      time: time < winner.time ? time : winner.time,
    });
  }
};
