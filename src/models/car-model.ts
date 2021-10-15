export interface CarModel {
  id: number;
  name: string;
  color: string;
  isEngineStarted?: boolean;
}

export interface CreateCarModel {
  name: string;
  color: string;
}

export interface EngineCarModel {
  velocity: number,
  distance: number
}
