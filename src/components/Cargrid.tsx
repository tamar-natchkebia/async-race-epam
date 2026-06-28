import type { CSSProperties } from 'react';
import { CarItem } from './CarItem';
import type { Car } from '../types';

type RaceStatus = 'idle' | 'racing' | 'reset';

interface CarGridProps {
  cars: Car[];
  raceStatus: RaceStatus;
  onSelect: (id: number) => void;
  onDelete: (id: number) => void;
  onFinishRace: (name: string, time: number, carId: number) => void;
}

const EMPTY_STATE_STYLE: CSSProperties = {
  fontStyle: 'italic',
  color: '#f87171',
  padding: '32px',
  background: '#1e293b',
  border: '1px dashed #f87171',
  borderRadius: '8px',
  textAlign: 'center',
  fontSize: '15px',
};

const LIST_STYLE: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '14px',
  margin: '16px 0',
};

const CARD_STYLE: CSSProperties = {
  background: '#1e293b',
  padding: '14px',
  borderRadius: '8px',
  border: '1px solid #334155',
  boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
};

 export function Cargrid({
  cars,
  raceStatus,
  onSelect,
  onDelete,
  onFinishRace,
}: CarGridProps) {
  if (cars.length === 0) {
    return (
      <div style={EMPTY_STATE_STYLE}>
        No Cars Available in the Garage. Add some above or click Generate!
      </div>
    );
  }

  return (
    <div style={LIST_STYLE}>
      {cars.map((car) => (
        <div key={car.id} style={CARD_STYLE}>
          <CarItem
            id={car.id}
            name={car.name}
            color={car.color}
            onSelect={() => onSelect(car.id)}
            onDelete={() => onDelete(car.id)}
            globalRaceStatus={raceStatus}
            onFinishRace={(name, time) => onFinishRace(name, time, car.id)}
          />
        </div>
      ))}
    </div>
  );
}

 