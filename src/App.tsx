import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from './store';
import { setView } from './store/garageSlice';
import { GarageView } from './components/GarageView';
import { Winners } from './components/Winners';

export default function App() {
  const dispatch = useDispatch();
  const currentView = useSelector((state: RootState) => state.garage.currentView);

  return (
    <div
      style={{
        padding: '20px',
        fontFamily: 'sans-serif',
        backgroundColor: '#1a1a1a',
        color: '#fff',
        minHeight: '100vh',
      }}
    >
      <header
        style={{
          display: 'flex',
          gap: '15px',
          marginBottom: '30px',
          borderBottom: '1px solid #333',
          paddingBottom: '15px',
        }}
      >
        <button
          onClick={() => dispatch(setView('garage'))}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            cursor: 'pointer',
            backgroundColor: currentView === 'garage' ? '#007bff' : '#333',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            fontWeight: 'bold',
          }}
        >
          Garage
        </button>
        <button
          onClick={() => dispatch(setView('winners'))}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            cursor: 'pointer',
            backgroundColor: currentView === 'winners' ? '#007bff' : '#333',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            fontWeight: 'bold',
          }}
        >
          Winners
        </button>
      </header>

      <main>
        {/* CRITICAL FIX: Keep components mounted in the DOM tree. 
          Using conditional display instead of conditional rendering ensures 
          the Garage layout, racing animations, and ongoing state are preserved.
        */}
        <div style={{ display: currentView === 'garage' ? 'block' : 'none' }}>
          <GarageView />
        </div>
        
        <div style={{ display: currentView === 'winners' ? 'block' : 'none' }}>
          <Winners />
        </div>
      </main>
    </div>
  );
}