import { CarModel } from './car-model';

export interface WinnersModel {
  id: number;
  wins: number;
  time: number;
  car: CarModel
}

export interface WinnerModel {
  id: number;
  wins: number;
  time: number;
}

export interface CreateWinnerModel {
  id: number;
  wins: number;
  time: number;
}

export interface SaveWinnerModel {
  id: number;
  time: number;
}

export interface UserModel {
  [index: string]: string;
}
