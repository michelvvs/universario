'use client';

import React from 'react';
import { BirthDataPayload } from '@/types/universario';

interface StoryHeaderProps {
  data: BirthDataPayload;
}

export default function StoryHeader({ data }: StoryHeaderProps) {
  const displayName = data.name ? data.name.toUpperCase() : 'UNIVERSÁRIO';

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '5px 8px',
        background: '#ffffff',
        border: '2px solid #0c0d11',
        boxShadow: '3px 3px 0px #0c0d11',
        marginBottom: '6px',
        zIndex: 10,
        position: 'relative',
        borderRadius: '2px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span
          style={{
            background: 'var(--acid-chartreuse)',
            color: '#0c0d11',
            fontFamily: 'var(--font-maximalist)',
            fontWeight: 900,
            fontSize: '0.72rem',
            padding: '2px 7px',
            letterSpacing: '1px',
            textTransform: 'uppercase',
            border: '1px solid #0c0d11',
          }}
        >
          ★ {displayName}
        </span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div className="acid-barcode" style={{ color: '#0c0d11', height: '12px' }}>
          <span /><span /><span /><span /><span /><span />
        </div>
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.70rem',
            color: '#0c0d11',
            fontWeight: 800,
            letterSpacing: '1px',
          }}
        >
          {data.dayOfMonth} {data.monthName.slice(0, 3).toUpperCase()} {data.year}
        </span>
      </div>
    </div>
  );
}
