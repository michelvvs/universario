'use client';

import React from 'react';
import { BirthDataPayload } from '@/types/universario';
import { Newspaper, Flame } from 'lucide-react';
import { MemphisSquiggle, MemphisZigzag, MemphisTrianglePattern, MemphisCrosshatch } from '../MemphisDoodles';

interface SlideProps {
  data: BirthDataPayload;
}

export default function SlideNewsHistory({ data }: SlideProps) {
  const { news, year } = data;

  const cardShadows = [
    '3px 3px 0px #111111, 6px 6px 0px #ff2a85',
    '3px 3px 0px #111111, 6px 6px 0px #ffe600',
    '3px 3px 0px #111111, 6px 6px 0px #00d2ff',
  ];
  const tapeColors = ['tape-strip', 'tape-strip tape-strip-cyan', 'tape-strip tape-strip-pink'];

  return (
    <div className="slide-memphis-canvas slide-theme-news">
      {/* Memphis Floating Doodles */}
      <div style={{ position: 'absolute', top: '10%', right: '5%', pointerEvents: 'none' }} className="animate-float-1">
        <MemphisTrianglePattern size={46} fillColor="#9b51e0" />
      </div>

      <div style={{ position: 'absolute', bottom: '26%', left: '4%', pointerEvents: 'none' }}>
        <MemphisSquiggle color="#ff2a85" width={52} height={16} />
      </div>

      {/* Top Header */}
      <div style={{ textAlign: 'center', zIndex: 2 }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '5px 14px',
            borderRadius: '10px',
            background: '#9b51e0',
            border: '2.5px solid #111111',
            boxShadow: '3px 3px 0px #111111',
            fontSize: '0.76rem',
            fontFamily: 'var(--font-80s)',
            letterSpacing: '0.5px',
            color: '#ffffff',
            marginBottom: '4px',
            transform: 'rotate(-1deg)',
          }}
        >
          <Newspaper size={13} color="#ffffff" />
          <span>MANCHETES & EDIÇÃO EXTRA</span>
        </div>

        <h2
          style={{
            fontSize: '2.1rem',
            fontWeight: 900,
            fontFamily: 'var(--font-80s)',
            lineHeight: 1.1,
            marginBottom: '4px',
            color: '#111111',
            textShadow: '2.5px 2.5px 0px #ffe600',
          }}
          className="text-chromatic"
        >
          O MUNDO EM {year}
        </h2>

        <div
          style={{
            display: 'inline-block',
            padding: '2px 10px',
            borderRadius: '6px',
            background: '#ffffff',
            border: '1.5px solid #111111',
            boxShadow: '2px 2px 0px #111111',
            fontSize: '0.74rem',
            fontFamily: 'var(--font-80s)',
            color: '#ff2a85',
            letterSpacing: '0.5px',
          }}
        >
          FATOS HISTÓRICOS NAS PRIMEIRAS PÁGINAS
        </div>
      </div>

      {/* Memphis Newspaper Clippings with Washi Tapes */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '11px', zIndex: 2, margin: '4px 0' }}>
        {news.map((item, index) => {
          const shadowColor = cardShadows[index % cardShadows.length];
          const tapeClass = tapeColors[index % tapeColors.length];

          return (
            <div
              key={index}
              style={{
                padding: '11px 13px',
                background: '#ffffff',
                color: '#111111',
                borderRadius: '12px',
                border: '2.5px solid #111111',
                boxShadow: shadowColor,
                position: 'relative',
                transform: index % 2 === 0 ? 'rotate(-0.8deg)' : 'rotate(0.8deg)',
              }}
            >
              {/* Decorative Washi Tape on corner */}
              <div className={tapeClass} style={{ top: '-8px', right: index % 2 === 0 ? '12px' : 'auto', left: index % 2 !== 0 ? '12px' : 'auto' }} />

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: '4px',
                }}
              >
                <span style={{ fontSize: '1.2rem' }}>{item.emoji}</span>
                <span
                  style={{
                    fontSize: '0.92rem',
                    fontWeight: 900,
                    fontFamily: 'var(--font-80s)',
                    color: '#111111',
                    lineHeight: 1.2,
                    letterSpacing: '0.3px',
                  }}
                >
                  {item.title}
                </span>
              </div>

              <p
                style={{
                  fontSize: '0.78rem',
                  lineHeight: 1.35,
                  color: '#333333',
                  fontWeight: 600,
                }}
              >
                {item.description}
              </p>
            </div>
          );
        })}
      </div>

      {/* Bottom Archive Stamp */}
      <div style={{ textAlign: 'center', zIndex: 2 }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '5px 12px',
            borderRadius: '8px',
            background: '#ffe600',
            border: '2px solid #111111',
            boxShadow: '2px 2px 0px #111111',
            fontSize: '0.74rem',
            color: '#111111',
            fontFamily: 'var(--font-80s)',
            letterSpacing: '0.5px',
          }}
        >
          <Flame size={13} color="#ff2a85" />
          <span>FONTE: ARQUIVOS HISTÓRICOS & WIKIPEDIA</span>
        </div>
      </div>
    </div>
  );
}
