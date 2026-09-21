'use client';

import React from 'react';
import { BirthDataPayload } from '@/types/universario';
import { Newspaper, Radio, AlertCircle, FileText } from 'lucide-react';
import { VcrOsdBadge, ScotchTape, DymoLabel, VhsGoldSeal, CollageCutout } from '../VhsGraphics';

interface SlideProps {
  data: BirthDataPayload;
}

export default function SlideNewsHistory({ data }: SlideProps) {
  const { news, year } = data;

  const stamps = [
    { label: 'EXTRA!', color: '#ff2a2a', border: '#ff2a2a' },
    { label: 'HISTÓRICO', color: '#0088cc', border: '#0088cc' },
    { label: 'MUNDO', color: '#27ae60', border: '#27ae60' },
  ];

  return (
    <div className="slide-vhs-canvas slide-theme-news" style={{ position: 'relative' }}>
      {/* Press Badge & Camera Cutout Overlaid on top banner margin, outside news text */}
      <CollageCutout
        src="/cutouts/press_cutout.jpg"
        alt="Crachá de imprensa e câmera Polaroid retrô"
        size={80}
        rotate={10}
        style={{
          top: '22px',
          right: '-6px',
          zIndex: 20,
          pointerEvents: 'none',
        }}
      />
      <ScotchTape width={36} height={12} rotate={14} style={{ top: '20px', right: '14px', zIndex: 21 }} />

      {/* VCR OSD Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', zIndex: 3 }}>
        <VcrOsdBadge text={`REC ● EDIÇÃO ${year}`} variant="rec" />
        <span
          style={{
            fontFamily: 'var(--font-vcr)',
            color: '#a0a5b5',
            fontSize: 'clamp(0.72rem, 2.1vw, 0.85rem)',
            letterSpacing: '1px',
          }}
        >
          NOTICIÁRIO MUNDIAL
        </span>
        <VcrOsdBadge text="EDIÇÃO MUNDIAL" variant="sp" />
      </div>

      {/* VHS Sleeve Brand Header */}
      <div
        style={{
          width: '100%',
          background: 'linear-gradient(90deg, #b31217 0%, #e52d27 50%, #b31217 100%)',
          padding: 'clamp(4px, 1vh, 6px) clamp(8px, 2vw, 12px)',
          borderRadius: '4px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          border: '1px solid rgba(255, 255, 255, 0.25)',
          boxShadow: '0 4px 12px rgba(0,0,0,0.6)',
          zIndex: 2,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Newspaper size={16} color="#ffffff" />
          <span
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(0.75rem, 2.3vw, 0.9rem)',
              color: '#ffffff',
              letterSpacing: '1px',
              textTransform: 'uppercase',
            }}
          >
            ARQUIVO DE MANCHETES • {year}
          </span>
        </div>
        <span
          style={{
            fontFamily: 'var(--font-vcr)',
            color: '#ffe600',
            fontSize: 'clamp(0.68rem, 2vw, 0.78rem)',
            fontWeight: 'bold',
          }}
        >
          NOTÍCIAS DA ÉPOCA
        </span>
      </div>

      {/* Main Title Banner with Dymo Label */}
      <div style={{ textAlign: 'center', zIndex: 2 }}>
        <div style={{ display: 'inline-block', marginBottom: '2px' }}>
          <DymoLabel text={`FATOS DE ${year}`} color="red" />
        </div>
        <h2
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(1.2rem, 4.0vw, 1.55rem)',
            color: '#ffffff',
            lineHeight: 1.1,
            textShadow: '0 2px 8px rgba(0,0,0,0.8), 0 0 10px rgba(255, 42, 42, 0.4)',
            letterSpacing: '0.5px',
            textTransform: 'uppercase',
          }}
        >
          O QUE MARCOU AS PÁGINAS DO MUNDO
        </h2>
      </div>

      {/* Photo-Collage Newspaper Clippings */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'clamp(5px, 1.2vh, 8px)',
          width: '100%',
          zIndex: 2,
          paddingRight: '20px',
        }}
      >
        {news.slice(0, 3).map((item, index) => {
          const stamp = stamps[index % stamps.length];
          const rotation = index === 0 ? '-0.8deg' : index === 1 ? '0.8deg' : '-0.5deg';

          return (
            <div
              key={index}
              style={{
                position: 'relative',
                background: 'linear-gradient(135deg, #f9f7f1 0%, #eee9dc 100%)',
                color: '#1a1818',
                padding: 'clamp(7px, 1.4vh, 10px) clamp(10px, 2.5vw, 14px)',
                borderRadius: '3px',
                boxShadow: '0 6px 16px rgba(0,0,0,0.7), 0 1px 3px rgba(0,0,0,0.4)',
                border: '1px solid #d4cebe',
                transform: `rotate(${rotation})`,
                transition: 'transform 0.2s ease',
              }}
            >
              {/* Corner Scotch Tape */}
              <ScotchTape
                angle={index % 2 === 0 ? -12 : 12}
                width={48}
                style={{
                  top: '-7px',
                  right: index % 2 === 0 ? '12px' : 'auto',
                  left: index % 2 !== 0 ? '12px' : 'auto',
                }}
              />

              {/* Newspaper Header Row */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderBottom: '1px solid #c9c2b0',
                  paddingBottom: '3px',
                  marginBottom: '4px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <span style={{ fontSize: '1.05rem' }}>{item.emoji}</span>
                  <span
                    style={{
                      fontFamily: 'var(--font-vcr)',
                      fontSize: 'clamp(0.62rem, 1.7vw, 0.72rem)',
                      color: '#666053',
                      letterSpacing: '0.5px',
                      textTransform: 'uppercase',
                    }}
                  >
                    BOLETIM • {year}
                  </span>
                </div>

                {/* Red ink stamp effect */}
                <span
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'clamp(0.55rem, 1.6vw, 0.65rem)',
                    color: stamp.color,
                    border: `1.5px solid ${stamp.border}`,
                    padding: '1px 5px',
                    borderRadius: '2px',
                    transform: 'rotate(-4deg)',
                    letterSpacing: '1px',
                    fontWeight: 900,
                    textTransform: 'uppercase',
                  }}
                >
                  {stamp.label}
                </span>
              </div>

              {/* Headline */}
              <h3
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'clamp(0.80rem, 2.3vw, 0.92rem)',
                  color: '#121212',
                  lineHeight: 1.2,
                  marginBottom: '2px',
                  letterSpacing: '0.2px',
                }}
              >
                {item.title}
              </h3>

              {/* Description */}
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'clamp(0.66rem, 1.7vw, 0.74rem)',
                  lineHeight: 1.3,
                  color: '#3d3830',
                  fontWeight: 500,
                }}
              >
                {item.description}
              </p>
            </div>
          );
        })}
      </div>

      {/* Bottom Telemetry & Archival Stamp */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          padding: 'clamp(4px, 0.9vh, 6px) clamp(8px, 2vw, 12px)',
          background: 'rgba(0, 0, 0, 0.65)',
          borderRadius: '4px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          zIndex: 2,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <FileText size={12} color="#ffe600" />
          <span
            style={{
              fontFamily: 'var(--font-vcr)',
              fontSize: 'clamp(0.62rem, 1.7vw, 0.70rem)',
              color: '#d0d4e0',
              letterSpacing: '0.5px',
            }}
          >
            FONTE: ARQUIVOS & CRÔNICAS HISTÓRICAS
          </span>
        </div>
        <span
          style={{
            fontFamily: 'var(--font-vcr)',
            fontSize: 'clamp(0.66rem, 1.8vw, 0.74rem)',
            color: '#00ff88',
            letterSpacing: '1px',
          }}
        >
          REGISTRO HISTÓRICO
        </span>
      </div>
    </div>
  );
}
