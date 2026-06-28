import type { CSSProperties } from 'react';

interface GarageHeaderProps {
  totalCount: number;
  page: number;
}

const ROW_STYLE: CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-end',
  borderBottom: '2px solid #334155',
  paddingBottom: '12px',
  marginBottom: '16px',
};

const COUNT_BADGE_STYLE: CSSProperties = {
  fontSize: '14px',
  fontWeight: 400,
  color: '#94a3b8',
  marginLeft: '10px',
  background: '#334155',
  padding: '4px 10px',
  borderRadius: '12px',
};

const PAGE_LABEL_STYLE: CSSProperties = {
  fontSize: '14px',
  fontWeight: 'bold',
  color: '#38bdf8',
  textTransform: 'uppercase',
  letterSpacing: '1px',
};

 export function Garageheader({ totalCount, page }: GarageHeaderProps) {
  return (
    <div style={ROW_STYLE}>
      <div style={{ flexGrow: 1 }}>
        <h3 style={{ margin: 0, fontSize: '22px', fontWeight: 600, color: '#f1f5f9' }}>
          Garage Inventory
          <span style={COUNT_BADGE_STYLE}>{totalCount} Total Units</span>
        </h3>
      </div>
      <div>
        <span style={PAGE_LABEL_STYLE}>Active Viewport: Page #{page}</span>
      </div>
    </div>
  );
}

