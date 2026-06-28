import { useEffect, useState } from 'react';
import type { CSSProperties } from 'react';

interface WinnerInfo {
  name: string;
  time: number | null | undefined;
}

interface WinnerBannerProps {
  winner: WinnerInfo | null;
}

const BANNER_STYLE: CSSProperties = {
  position: 'fixed',
  top: '24px',
  left: '50%',
  transform: 'translateX(-50%)',
  backgroundColor: 'rgba(34, 197, 94, 0.95)',
  color: '#ffffff',
  padding: '16px 36px',
  borderRadius: '12px',
  fontWeight: 700,
  zIndex: 2000,
  boxShadow:
    '0 10px 25px -5px rgba(0, 0, 0, 0.4), 0 8px 10px -6px rgba(0, 0, 0, 0.4)',
  backdropFilter: 'blur(8px)',
  fontSize: '20px',
  textAlign: 'center',
  letterSpacing: '0.5px',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  animation: 'slideDown 0.3s ease-out, fadeOut 0.5s ease-in 3s forwards',
};

export function WinnerBanner({ winner }: WinnerBannerProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (winner) {
      setVisible(true);
      const timer = setTimeout(() => setVisible(false), 3500); // auto-hide after 3.5s
      return () => clearTimeout(timer);
    }
  }, [winner]);

  if (!winner || !visible) return null;

  const formattedTime =
    winner.time !== undefined && winner.time !== null
      ? `${winner.time.toFixed(2)}s`
      : '—';

  return (
    <div style={BANNER_STYLE}>
      🎉 Winner:{' '}
      <span style={{ textDecoration: 'underline' }}>{winner.name}</span>{' '}
      ({formattedTime})!
    </div>
  );
}

