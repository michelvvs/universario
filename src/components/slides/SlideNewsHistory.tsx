'use client';

import React from 'react';
import { BirthDataPayload } from '@/types/universario';
import { getWhenBornPhrase } from '@/lib/grammatical-gender';
import { Newspaper, Radio, AlertCircle, FileText } from 'lucide-react';
import { VcrOsdBadge, ScotchTape, DymoLabel, VhsGoldSeal, CollageCutout } from '../VhsGraphics';
import StoryHeader from '../StoryHeader';
import StoryCharacter from '../StoryCharacter';

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
      {/* Integrated Retro VCR Header (Safe Story OSD) */}
      <StoryHeader data={data} />

      {/* News Main Header: Left-aligned with clearance for Chibi Caricature */}
      <div style={{ textAlign: 'left', zIndex: 2, marginBottom: '6px', paddingRight: '110px' }}>
        <h2
          style={{
            fontSize: 'clamp(1.15rem, 3.8vw, 1.45rem)',
            fontWeight: 900,
            fontFamily: "'Archivo Black', sans-serif",
            color: '#ffffff',
            lineHeight: 1.12,
            letterSpacing: '0.8px',
            textShadow: '0 2px 6px rgba(0,0,0,0.9), 0 0 12px rgba(255, 42, 42, 0.35)',
            textTransform: 'uppercase',
            margin: 0,
          }}
        >
          MANCHETES HISTÓRICAS
        </h2>
        <div
          style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: 'clamp(0.65rem, 1.9vw, 0.74rem)',
            color: 'var(--vhs-gold)',
            letterSpacing: '0.5px',
            marginTop: '3px',
            fontWeight: 700,
            lineHeight: 1.25,
          }}
        >
          O QUE MARCAVA O MUNDO {getWhenBornPhrase(data.name, data.gender).toUpperCase()}
        </div>
      </div>

      {/* Photo-Collage Newspaper Clippings (Aligned to Bottom) */}
      <div
        style={{
          marginTop: 'auto',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          gap: 'clamp(5px, 1.2vh, 8px)',
          width: '100%',
          zIndex: 5,
        }}
      >
        {/* Themed Polaroid Photo Card pinned to top-right of the first newspaper card */}
        <div style={{ position: 'absolute', top: '-36px', right: '6px', zIndex: 15, pointerEvents: 'none' }}>
          <StoryCharacter theme="news" gender={data.gender} userPhotoUrl={data.userPhotoUrl} year={data.year} name={data.name} />
        </div>
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
