import type { CSSProperties } from 'react';

interface RaceControlsProps {
  onStart: () => void;
  onReset: () => void;
  startDisabled: boolean;
  resetDisabled: boolean;
}

const BASE_BUTTON_STYLE: CSSProperties = {
  padding: '12px 24px',
  border: 'none',
  borderRadius: '8px',
  fontSize: '15px',
  fontWeight: 'bold',
  transition: 'all 0.2s ease',
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  pointerEvents: 'auto',
};

const DISABLED_TEXT_COLOR = '#94a3b8';
const DISABLED_BACKGROUND = '#334155';

function getStartButtonStyle(disabled: boolean): CSSProperties {
  return {
    ...BASE_BUTTON_STYLE,
    background: disabled
      ? DISABLED_BACKGROUND
      : 'linear-gradient(135deg, #22c55e 0%, #15803d 100%)',
    color: disabled ? DISABLED_TEXT_COLOR : '#ffffff',
    cursor: disabled ? 'not-allowed' : 'pointer',
    boxShadow: disabled ? 'none' : '0 4px 12px rgba(34, 197, 94, 0.2)',
  };
}

function getResetButtonStyle(disabled: boolean): CSSProperties {
  return {
    ...BASE_BUTTON_STYLE,
    background: disabled
      ? DISABLED_BACKGROUND
      : 'linear-gradient(135deg, #eab308 0%, #a16207 100%)',
    color: disabled ? DISABLED_TEXT_COLOR : '#ffffff',
    cursor: disabled ? 'not-allowed' : 'pointer',
    boxShadow: disabled ? 'none' : '0 4px 12px rgba(234, 179, 8, 0.2)',
  };
}

export function RaceControls({
  onStart,
  onReset,
  startDisabled,
  resetDisabled,
}: RaceControlsProps) {
  return (
    <div style={{ display: 'flex', gap: '12px', margin: '24px 0' }}>
      <button
        type="button"
        onClick={onStart}
        disabled={startDisabled}
        style={getStartButtonStyle(startDisabled)}
      >
        🏁 Start Page Race
      </button>

      <button
        type="button"
        onClick={onReset}
        disabled={resetDisabled}
        style={getResetButtonStyle(resetDisabled)}
      >
        🔄 Reset Race
      </button>
    </div>
  );
}