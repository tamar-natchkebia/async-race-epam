import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalCount: number;
  limit: number;
  onPageChange: (page: number) => void;
  disabled?: boolean;
}

export function Pagination({ currentPage, totalCount, limit, onPageChange, disabled = false }: PaginationProps) {
  const totalPages = Math.ceil(totalCount / limit) || 1;

  return (
    <div style={paginationContainerStyle}>
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={disabled || currentPage === 1}
        style={{
          ...navButtonStyle,
          cursor: disabled || currentPage === 1 ? 'not-allowed' : 'pointer',
          opacity: disabled || currentPage === 1 ? 0.5 : 1,
        }}
      >
        ◀ Prev
      </button>
      <span style={textStyle}>
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={disabled || currentPage >= totalPages}
        style={{
          ...navButtonStyle,
          cursor: disabled || currentPage >= totalPages ? 'not-allowed' : 'pointer',
          opacity: disabled || currentPage >= totalPages ? 0.5 : 1,
        }}
      >
        Next ▶
      </button>
    </div>
  );
}

const paginationContainerStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '15px',
  marginTop: '20px',
};

const navButtonStyle: React.CSSProperties = {
  padding: '8px 16px',
  backgroundColor: '#333',
  color: '#fff',
  border: '1px solid #444',
  borderRadius: '4px',
  fontWeight: '500',
};

const textStyle: React.CSSProperties = {
  fontSize: '16px',
  fontWeight: '500',
  color: '#ddd',
};