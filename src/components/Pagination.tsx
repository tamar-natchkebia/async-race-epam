import type { CSSProperties } from 'react';

export interface PaginationProps {
  page: number;
  totalCount: number;
  pageSize: number;
  disabled: boolean;
  onPrev: () => void;
  onNext: () => void;
}

const CONTAINER_STYLE: CSSProperties = {
  display: 'flex',
  gap: '12px',
  marginTop: '28px',
  alignItems: 'center',
  justifyContent: 'center',
  background: '#1e293b',
  padding: '12px',
  borderRadius: '8px',
  border: '1px solid #334155',
};

const LABEL_STYLE: CSSProperties = {
  fontSize: '14px',
  color: '#94a3b8',
  fontWeight: 500,
  minWidth: '100px',
  textAlign: 'center',
};

function getPageButtonStyle(disabled: boolean): CSSProperties {
  return {
    padding: '8px 20px',
    backgroundColor: disabled ? '#334155' : '#475569',
    color: disabled ? '#64748b' : '#ffffff',
    border: 'none',
    borderRadius: '6px',
    fontWeight: 600,
    fontSize: '14px',
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'background-color 0.2s',
  };
}

export function Pagination({
  page,
  totalCount,
  pageSize,
  disabled,
  onPrev,
  onNext,
}: PaginationProps) {
  const totalPages = Math.ceil(totalCount / pageSize) || 1;
  const isPrevDisabled = page === 1 || disabled;
  const isNextDisabled = page * pageSize >= totalCount || disabled;

  return (
    <div style={CONTAINER_STYLE}>
      <button
        type="button"
        onClick={onPrev}
        disabled={isPrevDisabled}
        style={getPageButtonStyle(isPrevDisabled)}
      >
        ◀ Prev
      </button>

      <span style={LABEL_STYLE}>
        Page <strong style={{ color: '#f1f5f9' }}>{page}</strong> of {totalPages}
      </span>

      <button
        type="button"
        onClick={onNext}
        disabled={isNextDisabled}
        style={getPageButtonStyle(isNextDisabled)}
      >
        Next ▶
      </button>
    </div>
  );
}