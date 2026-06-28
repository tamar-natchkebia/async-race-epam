// src/api/api.ts
// src/api/api.ts
import type { Car, NewCar, EngineResponse, Winner, PaginatedResponse } from '../types';
const BASE_URL = 'http://localhost:3000'; // Adjust port if your server mock runs elsewhere

export const api = {
  // --- GARAGE MANIPULATIONS (CRUD) ---
  getCars: async (page: number, limit = 7): Promise<PaginatedResponse<Car>> => {
    const res = await fetch(`${BASE_URL}/garage?_page=${page}&_limit=${limit}`);
    const data: Car[] = await res.json();
    const totalCount = Number(res.headers.get('X-Total-Count') || 0);
    return { data, totalCount };
  },

  createCar: async (car: NewCar): Promise<Car> => {
    const res = await fetch(`${BASE_URL}/garage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(car),
    });
    return res.json();
  },

  updateCar: async (id: number, car: NewCar): Promise<Car> => {
    const res = await fetch(`${BASE_URL}/garage/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(car),
    });
    return res.json();
  },

  deleteCar: async (id: number): Promise<void> => {
    await fetch(`${BASE_URL}/garage/${id}`, { method: 'DELETE' });
  },

  // --- ENGINE LIFECYCLE MANAGEMENT ---
  startEngine: async (id: number): Promise<EngineResponse> => {
    const res = await fetch(`${BASE_URL}/engine?id=${id}&status=started`, { method: 'PATCH' });
    return res.json();
  },

  driveMode: async (id: number): Promise<void> => {
    const res = await fetch(`${BASE_URL}/engine?id=${id}&status=drive`, { method: 'PATCH' });
    if (!res.ok) {
      // Throwing an error catches the 500 engine breakdowns inside CarItem's try/catch block
      throw new Error('Engine broke down mid-race');
    }
  },

  stopEngine: async (id: number): Promise<void> => {
    await fetch(`${BASE_URL}/engine?id=${id}&status=stopped`, { method: 'PATCH' });
  },

  // --- LEADERBOARD / WINNERS MANIPULATIONS ---
  getWinners: async (page: number, limit = 10, sortBy = 'wins', order = 'desc') => {
    const res = await fetch(`${BASE_URL}/winners?_page=${page}&_limit=${limit}&_sort=${sortBy}&_order=${order}`);
    const data = await res.json();
    const totalCount = Number(res.headers.get('X-Total-Count') || 0);
    return { data, totalCount };
  },

  getWinner: async (id: number): Promise<Winner> => {
    const res = await fetch(`${BASE_URL}/winners/${id}`);
    if (!res.ok) throw new Error('Winner not found');
    return res.json();
  },

  createWinner: async (winner: Winner): Promise<Winner> => {
    const res = await fetch(`${BASE_URL}/winners`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(winner),
    });
    return res.json();
  },

  updateWinner: async (id: number, winner: { wins: number; time: number }): Promise<Winner> => {
    const res = await fetch(`${BASE_URL}/winners/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(winner),
    });
    return res.json();
  },

  deleteWinner: async (id: number): Promise<void> => {
    await fetch(`${BASE_URL}/winners/${id}`, { method: 'DELETE' });
  },
};