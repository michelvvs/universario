'use client';

import React from 'react';
import { BirthDataPayload } from '@/types/universario';
import { Newspaper, Flame, AlertCircle, Bookmark } from 'lucide-react';

interface SlideProps {
  data: BirthDataPayload;
}

export default function SlideNewsHistory({ data }: SlideProps) {
  const { news, year } = data;

  const cardBorderColors = ['#00f0ff', '#ffde59', '#ff2a85'];
  const tapeColors = ['tape-strip', 'tape-strip tape-strip-cyan', 'tape-strip tape-strip-pink'];

  return (
    <div
      style={{
        position: 'relative',
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '75px 20px 26px 20px',
        background: 'radial-gradient(circle at 50% 20%, #200a38 0%, #120524 70%, #06010d 100%)',
        color: '#ffffff',
        overflow: 'hidden',
      }}
      className="slide-content-enter"
    >
      {/* Top Header */}
      <div style={{ textAlign: 'center', zIndex: 2 }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '3px 12px',
            borderRadius: '6px',
            background: '#00f0ff',
            border: '1.5px solid #0d061c',
            boxShadow: '3px 3px 0px #ff2a85',
            fontSize: '0.74rem',
            fontFamily: 'var(--font-80s)',
            letterSpacing: '0.5px',
            color: '#0d061c',
            marginBottom: '4px',
          }}
        >
          <Newspaper size={12} />
          <span>MANCHETES & EDIÇÃO EXTRA</span>
        </div>

        <h2
          style={{
            fontSize: '2.1rem',
            fontWeight: 800,
            fontFamily: 'var(--font-80s)',
            lineHeight: 1.1,
            marginBottom: '2px',
            color: '#ffffff',
          }}
          className="text-chromatic"
        >
          O MUNDO EM {year}
        </h2>

        <p style={{ fontSize: '0.78rem', fontFamily: 'var(--font-crt)', color: '#ffde59', letterSpacing: '0.5px' }}>
          FATOS HISTÓRICOS QUE ESTAVAM NAS PRIMEIRAS PÁGINAS
        </p>
      </div>

      {/* 80s Newspaper Clippings with Washi Tapes */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', zIndex: 2, margin: '6px 0' }}>
        {news.map((item, index) => {
          const borderColor = cardBorderColors[index % cardBorderColors.length];
          const tapeClass = tapeColors[index % tapeColors.length];

          return (
            <div
              key={index}
              style={{
                padding: '12px 14px',
                background: '#ffffff',
                color: '#0d061c',
                borderRadius: '10px',
                border: '2px solid #0d061c',
                boxShadow: `4px 4px 0px ${borderColor}`,
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
                    fontSize: '0.90rem',
                    fontWeight: 900,
                    fontFamily: 'var(--font-80s)',
                    color: '#0d061c',
                    lineHeight: 1.2,
                    letterSpacing: '0.3px',
                  }}
                >
                  {item.title}
                </span>
              </div>

              <p
                style={{
                  fontSize: '0.80rem',
                  lineHeight: 1.35,
                  color: '#334155',
                  fontWeight: 500,
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
            padding: '4px 12px',
            borderRadius: '6px',
            background: '#16082f',
            border: '1.5px dashed #26ffdf',
            fontSize: '0.72rem',
            color: '#26ffdf',
            fontFamily: 'var(--font-crt)',
            letterSpacing: '0.5px',
          }}
        >
          <Flame size={12} color="#ffde59" />
          <span>FONTE: ARQUIVOS HISTÓRICOS & WIKIPEDIA</span>
        </div>
      </div>
    </div>
  );
}
