export interface Car {
  name: string;
  color: string;
  id: number;
}

export interface NewCar {
  name: string;
  color: string;
}

export interface EngineResponse {
  velocity: number;
  distance: number;
}

export interface Winner {
  id: number;
  wins: number;
  time: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  totalCount: number;
}