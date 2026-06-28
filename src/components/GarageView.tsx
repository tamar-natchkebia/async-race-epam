import { useEffect, useState, useRef, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  setGaragePage,
  setSelectedCarId,
  startRace,
  resetRace,
} from '../store/garageSlice';
import { api } from '../api/api';
import { CarManagement } from './CarManagement';
import { WinnerBanner } from './WinnerBanner';
import { RaceControls } from './RaceControls';
import { Garageheader } from './Garageheader';
import { Cargrid } from './Cargrid';
import { Pagination } from './Pagination';
import type { RootState } from '../store';
import type { Car } from '../types';

const CARS_PER_PAGE = 7;

interface WinnerInfo {
  name: string;
  time: number;
}

export function GarageView() {
  const dispatch = useDispatch();

  const page = useSelector((state: RootState) => state.garage.garagePage);
  const raceStatus = useSelector(
    (state: RootState) => state.garage.raceStatus || 'idle',
  );

  const [cars, setCars] = useState<Car[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [winnerBanner, setWinnerBanner] = useState<WinnerInfo | null>(null);

  // Synchronous guard — avoids the race condition where multiple cars finishing
  // in the same tick all read stale React state and all get declared winners.
  const winnerDeclaredRef = useRef(false);
  const fastestTimeRef = useRef<number>(Infinity);
  const raceResultsRef = useRef<Map<number, { name: string; time: number }>>(new Map());

  const loadCarsData = useCallback(async () => {
    try {
      const res = await api.getCars(page, CARS_PER_PAGE);
      setCars(res.data);
      setTotalCount(res.totalCount);

      if (res.data.length === 0 && page > 1) {
        dispatch(setGaragePage(page - 1));
      }
    } catch (err) {
      console.error('Failed to read garage data stream:', err);
    }
  }, [dispatch, page]);

  useEffect(() => {
    void loadCarsData();
  }, [loadCarsData]);

  const handleDelete = useCallback(
    async (id: number) => {
      try {
        await api.deleteCar(id);
        await api.deleteWinner(id).catch(() => {});
        await loadCarsData();
      } catch (err) {
        console.error('Could not sweep target car element:', err);
      }
    },
    [loadCarsData],
  );

  const recordWinner = useCallback(async (carId: number, time: number) => {
    const record = await api.getWinner(carId).catch(() => null);
    if (record) {
      const updatedWins = record.wins + 1;
      const bestTime = Math.min(record.time, time);
      await api.updateWinner(carId, { wins: updatedWins, time: bestTime });
    } else {
      await api.createWinner({ id: carId, wins: 1, time });
    }
  }, []);

  const handleRaceFinish = useCallback(
    async (carName: string, time: number, carId: number) => {
      // Store this car's result
      raceResultsRef.current.set(carId, { name: carName, time });

      // Wait a bit to collect all results, then pick the actual fastest
      setTimeout(async () => {
        if (winnerDeclaredRef.current) return;
        winnerDeclaredRef.current = true;

        // Find the car with the minimum time
        let fastestCar = { name: '', time: Infinity };
        let fastestCarId = -1;

        raceResultsRef.current.forEach((result, id) => {
          if (result.time < fastestCar.time) {
            fastestCar = result;
            fastestCarId = id;
          }
        });

        if (fastestCarId !== -1) {
          setWinnerBanner({ name: fastestCar.name, time: fastestCar.time });
          try {
            await recordWinner(fastestCarId, fastestCar.time);
          } catch (err) {
            console.error('Error tracking scoreboard:', err);
          }
        }
      }, 100); // 100ms delay to collect all results
    },
    [recordWinner],
  );

  const handleGlobalStartRace = useCallback(() => {
    setWinnerBanner(null);
    winnerDeclaredRef.current = false;
    fastestTimeRef.current = Infinity;
    raceResultsRef.current.clear();
    dispatch(startRace());
  }, [dispatch]);

  const handleGlobalResetRace = useCallback(() => {
    setWinnerBanner(null);
    winnerDeclaredRef.current = false;
    fastestTimeRef.current = Infinity;
    raceResultsRef.current.clear();
    dispatch(resetRace());
  }, [dispatch]);

  const handleSelect = useCallback(
    (id: number) => dispatch(setSelectedCarId(id)),
    [dispatch],
  );

  const handlePrevPage = useCallback(
    () => dispatch(setGaragePage(page - 1)),
    [dispatch, page],
  );

  const handleNextPage = useCallback(
    () => dispatch(setGaragePage(page + 1)),
    [dispatch, page],
  );

  const isStartDisabled = raceStatus === 'racing';
  const isResetDisabled = !winnerBanner;

  return (
    <div
      style={{
        position: 'relative',
        fontFamily: '"Segoe UI", Roboto, Helvetica, Arial, sans-serif',
        color: '#f8fafc',
        padding: '10px',
      }}
    >
      <WinnerBanner winner={winnerBanner} />

      <div
        style={{
          backgroundColor: '#1e293b',
          padding: '20px',
          borderRadius: '12px',
          marginBottom: '24px',
          border: '1px solid #334155',
        }}
      >
        <CarManagement onCarAction={loadCarsData} />
      </div>

      <RaceControls
        onStart={handleGlobalStartRace}
        onReset={handleGlobalResetRace}
        startDisabled={isStartDisabled}
        resetDisabled={isResetDisabled}
      />

      <Garageheader totalCount={totalCount} page={page} />

      <Cargrid
        cars={cars}
        raceStatus={raceStatus}
        onSelect={handleSelect}
        onDelete={handleDelete}
        onFinishRace={handleRaceFinish}
      />

      <Pagination
        page={page}
        totalCount={totalCount}
        pageSize={CARS_PER_PAGE}
        disabled={raceStatus === 'racing'}
        onPrev={handlePrevPage}
        onNext={handleNextPage}
      />
    </div>
  );
}