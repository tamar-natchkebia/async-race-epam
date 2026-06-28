// src/api/api.ts
import type { Car, NewCar, EngineResponse, Winner, PaginatedResponse } from '../types';

const BASE_URL = 'http://localhost:3000';
const GARAGE_STORAGE_KEY = 'async-race-ui-garage';
const WINNERS_STORAGE_KEY = 'async-race-ui-winners';

function readStorage<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') {
    return fallback;
  }

  try {
    const storedValue = window.localStorage.getItem(key);
    return storedValue ? (JSON.parse(storedValue) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeStorage<T>(key: string, value: T): void {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(key, JSON.stringify(value));
  }
}

function getGarageStore(): Car[] {
  return readStorage<Car[]>(GARAGE_STORAGE_KEY, []);
}

function setGarageStore(cars: Car[]): void {
  writeStorage(GARAGE_STORAGE_KEY, cars);
}

function getWinnersStore(): Winner[] {
  return readStorage<Winner[]>(WINNERS_STORAGE_KEY, []);
}

function setWinnersStore(winners: Winner[]): void {
  writeStorage(WINNERS_STORAGE_KEY, winners);
}

function getNextCarId(cars: Car[]): number {
  return cars.reduce((maxId, car) => Math.max(maxId, car.id), 0) + 1;
}

export const api = {
  // --- GARAGE MANIPULATIONS (CRUD) ---
  getCars: async (page: number, limit = 7): Promise<PaginatedResponse<Car>> => {
    try {
      const res = await fetch(`${BASE_URL}/garage?_page=${page}&_limit=${limit}`);
      if (!res.ok) throw new Error('Garage API unavailable');

      const data: Car[] = await res.json();
      const totalCount = Number(res.headers.get('X-Total-Count') || data.length);
      return { data, totalCount };
    } catch {
      const allCars = getGarageStore();
      const startIndex = (page - 1) * limit;
      return {
        data: allCars.slice(startIndex, startIndex + limit),
        totalCount: allCars.length,
      };
    }
  },

  createCar: async (car: NewCar): Promise<Car> => {
    try {
      const res = await fetch(`${BASE_URL}/garage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(car),
      });
      if (!res.ok) throw new Error('Garage API unavailable');
      return res.json();
    } catch {
      const cars = getGarageStore();
      const newCar: Car = {
        id: getNextCarId(cars),
        ...car,
      };
      setGarageStore([...cars, newCar]);
      return newCar;
    }
  },

  updateCar: async (id: number, car: NewCar): Promise<Car> => {
    try {
      const res = await fetch(`${BASE_URL}/garage/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(car),
      });
      if (!res.ok) throw new Error('Garage API unavailable');
      return res.json();
    } catch {
      const cars = getGarageStore();
      const updatedCar = cars.find((item) => item.id === id);
      if (!updatedCar) {
        throw new Error('Car not found');
      }

      const nextCars = cars.map((item) => (item.id === id ? { ...item, ...car } : item));
      setGarageStore(nextCars);
      return { ...updatedCar, ...car };
    }
  },

  deleteCar: async (id: number): Promise<void> => {
    try {
      const res = await fetch(`${BASE_URL}/garage/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Garage API unavailable');
    } catch {
      setGarageStore(getGarageStore().filter((car) => car.id !== id));
    }
  },

  // --- ENGINE LIFECYCLE MANAGEMENT ---
  startEngine: async (id: number): Promise<EngineResponse> => {
    try {
      const res = await fetch(`${BASE_URL}/engine?id=${id}&status=started`, { method: 'PATCH' });
      if (!res.ok) throw new Error('Engine API unavailable');
      return res.json();
    } catch {
      return { velocity: 30, distance: 1000 };
    }
  },

  driveMode: async (id: number): Promise<void> => {
    try {
      const res = await fetch(`${BASE_URL}/engine?id=${id}&status=drive`, { method: 'PATCH' });
      if (!res.ok) {
        throw new Error('Engine broke down mid-race');
      }
    } catch (error) {
      if (error instanceof Error && error.message === 'Engine broke down mid-race') {
        throw error;
      }
    }
  },

  stopEngine: async (id: number): Promise<void> => {
    try {
      const res = await fetch(`${BASE_URL}/engine?id=${id}&status=stopped`, { method: 'PATCH' });
      if (!res.ok) throw new Error('Engine API unavailable');
    } catch {
      // Fallback no-op when the mock engine service is not running.
    }
  },

  // --- LEADERBOARD / WINNERS MANIPULATIONS ---
  getWinners: async (page: number, limit = 10, sortBy = 'wins', order = 'desc') => {
    try {
      const res = await fetch(`${BASE_URL}/winners?_page=${page}&_limit=${limit}&_sort=${sortBy}&_order=${order}`);
      if (!res.ok) throw new Error('Winners API unavailable');

      const data = await res.json();
      const totalCount = Number(res.headers.get('X-Total-Count') || data.length);
      return { data, totalCount };
    } catch {
      const winners = getWinnersStore();
      const startIndex = (page - 1) * limit;
      return {
        data: winners.slice(startIndex, startIndex + limit),
        totalCount: winners.length,
      };
    }
  },

  getWinner: async (id: number): Promise<Winner> => {
    try {
      const res = await fetch(`${BASE_URL}/winners/${id}`);
      if (!res.ok) throw new Error('Winner not found');
      return res.json();
    } catch {
      const winners = getWinnersStore();
      const winner = winners.find((item) => item.id === id);
      if (!winner) {
        throw new Error('Winner not found');
      }
      return winner;
    }
  },

  createWinner: async (winner: Winner): Promise<Winner> => {
    try {
      const res = await fetch(`${BASE_URL}/winners`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(winner),
      });
      if (!res.ok) throw new Error('Winners API unavailable');
      return res.json();
    } catch {
      const winners = getWinnersStore();
      const nextWinners = [...winners, winner];
      setWinnersStore(nextWinners);
      return winner;
    }
  },

  updateWinner: async (id: number, winner: { wins: number; time: number }): Promise<Winner> => {
    try {
      const res = await fetch(`${BASE_URL}/winners/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(winner),
      });
      if (!res.ok) throw new Error('Winners API unavailable');
      return res.json();
    } catch {
      const winners = getWinnersStore();
      const existingWinner = winners.find((item) => item.id === id);
      if (!existingWinner) {
        throw new Error('Winner not found');
      }

      const nextWinners = winners.map((item) => (item.id === id ? { ...item, ...winner } : item));
      setWinnersStore(nextWinners);
      return { ...existingWinner, ...winner };
    }
  },

  deleteWinner: async (id: number): Promise<void> => {
    try {
      const res = await fetch(`${BASE_URL}/winners/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Winners API unavailable');
    } catch {
      setWinnersStore(getWinnersStore().filter((winner) => winner.id !== id));
    }
  },
};