import { useState, useEffect, useRef, useCallback } from 'react';
import { api } from '../api/api';
import { CarIcon } from './CarIcon';

interface CarItemProps {
  id: number;
  name: string;
  color: string;
  onSelect: () => void;
  onDelete: () => void;
  globalRaceStatus: 'idle' | 'racing' | 'reset';
  onFinishRace: (name: string, time: number) => void;
}

const SPEED_MULTIPLIER = 1.5;

export function CarItem({
  id,
  name,
  color,
  onSelect,
  onDelete,
  globalRaceStatus,
  onFinishRace
}: CarItemProps) {
  const [isEngineStarted, setIsEngineStarted] = useState(false);
  const [isDriving, setIsDriving] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTranslate, setCurrentTranslate] = useState('0px');

  const trackRef = useRef<HTMLDivElement>(null);
  const carRef = useRef<HTMLDivElement>(null);

  const startEngine = useCallback(async () => {
    try {
      setIsEngineStarted(true);

      const engineRes = await api.startEngine(id);

      // 🔍 DIAGNOSTIC — check the console after a race: do distance/velocity
      // actually change between cars and between races, or are they static?
      console.log(`[engine] car ${id} (${name}):`, engineRes);

      const rawTimeInSeconds = engineRes.distance / engineRes.velocity / 1000;
      const timeInSeconds = rawTimeInSeconds / SPEED_MULTIPLIER;

      console.log(`[time] car ${id} (${name}): raw=${rawTimeInSeconds.toFixed(2)}s, final=${timeInSeconds.toFixed(2)}s`);

      setDuration(timeInSeconds);
      setIsDriving(true);

      setTimeout(() => {
        const trackWidth = trackRef.current?.getBoundingClientRect().width ?? 0;
        const carWidth = carRef.current?.getBoundingClientRect().width ?? 28;
        const finishLineOffset = 40;
        const distance = Math.max(trackWidth - carWidth - finishLineOffset, 0);
        setCurrentTranslate(`${distance}px`);
      }, 50);

      await api.driveMode(id);

      setTimeout(() => {
        onFinishRace(name, timeInSeconds);
      }, timeInSeconds * 1000);

    } catch (error) {
      console.error(`Engine failure for car ${id} (${name}):`, error);
      setIsDriving(false);
      if (carRef.current && trackRef.current) {
        const currentLeftPos = carRef.current.getBoundingClientRect().left - trackRef.current.getBoundingClientRect().left;
        setCurrentTranslate(`${currentLeftPos}px`);
      }
    }
  }, [id, name, onFinishRace]);

  const stopEngine = useCallback(async () => {
    setIsDriving(false);
    setIsEngineStarted(false);
    setDuration(0);
    setCurrentTranslate('0px');
    await api.stopEngine(id);
  }, [id]);

  useEffect(() => {
    if (globalRaceStatus === 'racing' && !isEngineStarted) {
      void startEngine();
    } else if (globalRaceStatus === 'reset') {
      void stopEngine();
    }
  }, [globalRaceStatus, isEngineStarted, startEngine, stopEngine]);

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '15px', borderBottom: '1px solid #333', paddingBottom: '10px' }}>
      <div style={{ minWidth: '220px' }}>
        <button onClick={onSelect} disabled={isDriving}>Select</button>
        <button onClick={onDelete} disabled={isDriving} style={{ background: '#dc3545', color: '#fff', border: 'none', marginLeft: '5px' }}>Remove</button>
        <button onClick={startEngine} disabled={isEngineStarted} style={{ marginLeft: '10px' }}>▶</button>
        <button onClick={stopEngine} disabled={!isEngineStarted}>⏹</button>
        <span style={{ marginLeft: '10px', fontWeight: 'bold' }}>{name}</span>
      </div>

      <div
        ref={trackRef}
        style={{ flexGrow: 1, background: '#111', height: '40px', position: 'relative', borderRadius: '4px', display: 'flex', alignItems: 'center', overflow: 'hidden' }}
      >
        <div
          ref={carRef}
          style={{
            position: 'absolute',
            left: '10px',
            width: '28px',
            height: '28px',
            transform: `translateX(${currentTranslate})`,
            transition: isDriving && duration > 0 ? `transform ${duration}s linear` : 'none',
          }}
        >
          <CarIcon color={color} />
        </div>
        <div style={{ position: 'absolute', right: '40px', borderLeft: '3px dashed #ff0000', height: '100%' }} />
      </div>
    </div>
  );
}