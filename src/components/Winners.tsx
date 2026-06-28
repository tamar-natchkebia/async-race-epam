import React, { useEffect, useState } from 'react';
import { api } from '../api/api';
import { CarIcon } from './CarIcon';

// Define explicit interfaces for the raw API responses
interface Car {
  id: number;
  name: string;
  color: string;
}

interface WinnerApiRecord {
  id: number;
  wins: number;
  time?: number;
}

interface WinnerRow {
  id: number;
  name: string;
  color: string;
  wins: number;
  time?: number; 
}

export function Winners() {
  const [winners, setWinners] = useState<WinnerRow[]>([]);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [sortBy, setSortBy] = useState<'wins' | 'time'>('wins');
  const [order, setOrder] = useState<'asc' | 'desc'>('desc');

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const [winnersRes, carsRes] = await Promise.all([
          api.getWinners(page, 10, sortBy, order),
          api.getCars(1, 10000), 
        ]);

        if (cancelled) return;

        // Strongly type the map using the Car interface
        const carMap = new Map<number, Omit<Car, 'id'>>(
          carsRes.data.map((c: Car) => [c.id, { name: c.name, color: c.color }])
        );

        // Strongly type the loop using the WinnerApiRecord interface
        const merged: WinnerRow[] = winnersRes.data.map((w: WinnerApiRecord) => ({
          id: w.id,
          wins: w.wins,
          time: w.time,
          name: carMap.get(w.id)?.name ?? `Car #${w.id}`,
          color: carMap.get(w.id)?.color ?? '#888888',
        }));

        setWinners(merged);
        setTotalCount(winnersRes.totalCount);
      } catch (err) {
        console.error('Failed to load winners:', err);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [page, sortBy, order]);

  const toggleSort = (field: 'wins' | 'time') => {
    if (sortBy === field) {
      setOrder(order === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setOrder('asc');
    }
  };

  const totalPages = Math.ceil(totalCount / 10);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Winners</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>#</th>
            <th>Car</th>
            <th>Name</th>
            <th
              onClick={() => toggleSort('wins')}
              style={{ cursor: 'pointer' }}
            >
              Wins {sortBy === 'wins' ? (order === 'asc' ? '↑' : '↓') : ''}
            </th>
            <th
              onClick={() => toggleSort('time')}
              style={{ cursor: 'pointer' }}
            >
              Best Time {sortBy === 'time' ? (order === 'asc' ? '↑' : '↓') : ''}
            </th>
          </tr>
        </thead>
        <tbody>
          {winners.map((w, idx) => (
            <tr key={w.id}>
              <td>{(page - 1) * 10 + idx + 1}</td>
              <td>
                <CarIcon color={w.color} size={32} />
              </td>
              <td>{w.name}</td>
              <td>{w.wins}</td>
              <td>
                {typeof w.time === 'number' ? `${w.time.toFixed(2)}s` : '—'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: '10px', display: 'flex', gap: '10px' }}>
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
        >
          Prev
        </button>
        <span>
          Page {page} / {totalPages || 1}
        </span>
        <button
          onClick={() => setPage((p) => (p < totalPages ? p + 1 : p))}
          disabled={page >= totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}