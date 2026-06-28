import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface UIState {
  currentView: 'garage' | 'winners';
  garagePage: number;
  winnersPage: number;
  selectedCarId: number | null;
  raceStatus: 'idle' | 'racing' | 'reset'; 
}

const initialState: UIState = {
  currentView: 'garage',
  garagePage: 1,
  winnersPage: 1,
  selectedCarId: null,
  raceStatus: 'idle',
};

const garageSlice = createSlice({
  name: 'garage',
  initialState,
  reducers: {
   
    setView: (state, action: PayloadAction<'garage' | 'winners'>) => {
      state.currentView = action.payload;
      state.raceStatus = 'idle'; 
    },
    setGaragePage: (state, action: PayloadAction<number>) => {
      state.garagePage = action.payload;
      state.raceStatus = 'idle'; // Stop a race if the user switches pages
    },
    setWinnersPage: (state, action: PayloadAction<number>) => {
      state.winnersPage = action.payload;
    },
    setSelectedCarId: (state, action: PayloadAction<number | null>) => {
      state.selectedCarId = action.payload;
    },
    startRace: (state) => {
      state.raceStatus = 'racing';
    },
    resetRace: (state) => {
      state.raceStatus = 'reset';
    },
  },
});

export const { 
  setView, 
  setGaragePage, 
  setWinnersPage, 
  setSelectedCarId, 
  startRace, 
  resetRace 
} = garageSlice.actions;

export default garageSlice.reducer;