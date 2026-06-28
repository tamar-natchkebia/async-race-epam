import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedCarId } from '../store/garageSlice';
import { api } from '../api/api';
import type { RootState } from '../store';

interface ManagementProps {
  onCarAction: () => void;
}

const MAX_CAR_NAME_LENGTH = 30;

export function CarManagement({ onCarAction }: ManagementProps) {
  const dispatch = useDispatch();
  
  const selectedCarId = useSelector((state: RootState) => state.garage.selectedCarId);
  const raceStatus = useSelector((state: RootState) => state.garage.raceStatus); 
  const isRacing = raceStatus === 'racing';

  const [createName, setCreateName] = useState('');
  const [createColor, setCreateColor] = useState('#ffffff');
  const [updateName, setUpdateName] = useState('');
  const [updateColor, setUpdateColor] = useState('#ffffff');

  useEffect(() => {
    if (selectedCarId) {
      api.getCars(1, 100).then((res) => {
        const found = res.data.find((c) => c.id === selectedCarId);
        if (found) {
          setUpdateName(found.name);
          setUpdateColor(found.color);
        }
      });
    }
  }, [selectedCarId]);

  const isValidCarName = (name: string) => {
    const trimmed = name.trim();
    return trimmed.length > 0 && trimmed.length <= MAX_CAR_NAME_LENGTH;
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isRacing || !isValidCarName(createName)) return;

    await api.createCar({ name: createName.trim(), color: createColor });
    setCreateName('');
    onCarAction();
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isRacing || !selectedCarId || !isValidCarName(updateName)) return;

    await api.updateCar(selectedCarId, { name: updateName.trim(), color: updateColor });
    dispatch(setSelectedCarId(null));
    setUpdateName('');
    onCarAction();
  };

  const generateHundredCars = async () => {
    if (isRacing) return;

    const brands = ['Tesla', 'Ford', 'BMW', 'Audi', 'Mercedes', 'Toyota', 'Honda', 'Porsche', 'Ferrari', 'Nissan'];
    const models = ['Model S', 'Mustang', 'M4', 'R8', 'AMG GT', 'Supra', 'Civic Type R', '911 Carrera', '488 Pista', 'GT-R'];

    for (let index = 0; index < 100; index += 1) {
      const randomName = `${brands[Math.floor(Math.random() * brands.length)]} ${models[Math.floor(Math.random() * models.length)]}`;
      const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
      const safeName = randomName.slice(0, MAX_CAR_NAME_LENGTH);
      await api.createCar({ name: safeName, color: randomColor });
    }

    onCarAction();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '20px', background: '#222', padding: '15px', borderRadius: '8px' }}>
      
      {/* Create Car Form */}
      <form onSubmit={handleCreate} style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        <input 
          type="text" 
          placeholder={isRacing ? "Race in progress..." : "New Car Name"} 
          value={createName} 
          onChange={(e) => setCreateName(e.target.value)} 
          maxLength={MAX_CAR_NAME_LENGTH}
          disabled={isRacing} // Block input mid-race
        />
        <input type="color" value={createColor} onChange={(e) => setCreateColor(e.target.value)} disabled={isRacing} />
        <button type="submit" disabled={isRacing || !isValidCarName(createName)}>Create Car</button>
      </form>

      {/* Update Car Form */}
      <form onSubmit={handleUpdate} style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        <input 
          type="text" 
          placeholder={isRacing ? "Race in progress..." : "Select a car to edit"} 
          value={updateName} 
          onChange={(e) => setUpdateName(e.target.value)} 
          disabled={isRacing || !selectedCarId} // Block input mid-race
          maxLength={MAX_CAR_NAME_LENGTH}
        />
        <input type="color" value={updateColor} onChange={(e) => setUpdateColor(e.target.value)} disabled={isRacing || !selectedCarId} />
        <button type="submit" disabled={isRacing || !selectedCarId || !isValidCarName(updateName)}>Update Car</button>
      </form>

      {/* Generate Cars */}
      <button onClick={generateHundredCars} disabled={isRacing}>
        {isRacing ? '🔒 Race in Progress' : '⚡ Generate 100 Random Cars'}
      </button>
    </div>
  );
}