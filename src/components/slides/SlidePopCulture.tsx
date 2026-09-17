'use client';

import React from 'react';
import { BirthDataPayload } from '@/types/universario';
import { Film, Tv, Cpu, Clapperboard } from 'lucide-react';
import { MemphisSquiggle, MemphisZigzag, MemphisTrianglePattern, MemphisCrosshatch } from '../MemphisDoodles';

interface SlideProps {
  data: BirthDataPayload;
}

export default function SlidePopCulture({ data }: SlideProps) {
  const { popCulture, year } = data;

  return (
    <div className="slide-memphis-canvas slide-theme-pop">
      {/* Memphis Floating Doodles */}
      <div style={{ position: 'absolute', top: '10%', right: '5%', pointerEvents: 'none' }} className="animate-float-1">
        <MemphisTrianglePattern size={46} fillColor="#ffe600" />
      </div>

      <div style={{ position: 'absolute', bottom: '28%', left: '4%', pointerEvents: 'none' }}>
        <MemphisSquiggle color="#00d2ff" width={52} height={16} />
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
            background: '#ff2a85',
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
          <Clapperboard size={13} color="#ffe600" />
          <span>CINEMA & TELAS 80s</span>
        </div>

        <h2
          style={{
            fontSize: '2.05rem',
            fontWeight: 900,
            fontFamily: 'var(--font-80s)',
            lineHeight: 1.1,
            marginBottom: '2px',
            color: '#111111',
            textShadow: '2.5px 2.5px 0px #00d2ff',
          }}
          className="text-chromatic"
        >
          CULTURA POP & CINEMA
        </h2>

        <p style={{ fontSize: '0.78rem', fontFamily: 'var(--font-80s)', color: '#ff2a85', letterSpacing: '0.5px' }}>
          O QUE DOMINAVA AS TELAS E LOCADORAS EM {year}
        </p>
      </div>

      {/* Memphis Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', zIndex: 2, margin: '3px 0' }}>
        {/* Cinema Champion Card */}
        <div
          style={{
            padding: '10px 12px',
            borderRadius: '12px',
            background: '#ffffff',
            border: '2.5px solid #111111',
            boxShadow: '3px 3px 0px #111111, 6px 6px 0px #ff2a85',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Film size={13} color="#ff2a85" />
              <span style={{ fontSize: '0.70rem', fontWeight: 900, fontFamily: 'var(--font-80s)', color: '#ff2a85', letterSpacing: '0.5px' }}>
                BLOCKBUSTER EM CARTAZ
              </span>
            </div>
            <span style={{ fontFamily: 'var(--font-80s)', fontSize: '0.72rem', color: '#111111', background: '#ffe600', padding: '1px 6px', borderRadius: '4px', border: '1px solid #111111' }}>
              #1 BILHETERIA
            </span>
          </div>

          <div style={{ fontSize: '1.0rem', fontWeight: 900, fontFamily: 'var(--font-80s)', color: '#111111' }}>
            {popCulture.topMovie.title}
          </div>
          <div style={{ fontSize: '0.72rem', color: '#555555', fontWeight: 600 }}>
            Dirigido por {popCulture.topMovie.director}
          </div>
          <div style={{ fontSize: '0.72rem', color: '#ff2a85', fontWeight: 600, marginTop: '2px', lineHeight: 1.3 }}>
            ✦ {popCulture.topMovie.funFact}
          </div>
        </div>

        {/* TV & Brazilian Culture */}
        <div
          style={{
            padding: '10px 12px',
            borderRadius: '12px',
            background: '#ffffff',
            border: '2.5px solid #111111',
            boxShadow: '3px 3px 0px #111111, 6px 6px 0px #00d2ff',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
            <Tv size={13} color="#00d2ff" />
            <span style={{ fontSize: '0.70rem', fontWeight: 900, fontFamily: 'var(--font-80s)', color: '#00d2ff', letterSpacing: '0.5px' }}>
              NA TV BRASILEIRA
            </span>
          </div>
          <div style={{ fontSize: '0.78rem', color: '#111111', lineHeight: 1.35, fontWeight: 600 }}>
            {popCulture.topBrazilianTVOrCulture}
          </div>
        </div>

        {/* Tech Milestone */}
        <div
          style={{
            padding: '10px 12px',
            borderRadius: '12px',
            background: '#ffffff',
            border: '2.5px solid #111111',
            boxShadow: '3px 3px 0px #111111, 6px 6px 0px #ffe600',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
            <Cpu size={13} color="#ff5722" />
            <span style={{ fontSize: '0.70rem', fontWeight: 900, fontFamily: 'var(--font-80s)', color: '#ff5722', letterSpacing: '0.5px' }}>
              MARCO TECNOLÓGICO 80s
            </span>
          </div>
          <div style={{ fontSize: '0.78rem', color: '#111111', lineHeight: 1.35, fontWeight: 600 }}>
            {popCulture.techMilestone}
          </div>
        </div>
      </div>

      {/* Nostalgia Chips / 80s Stickers */}
      <div style={{ zIndex: 2, textAlign: 'center' }}>
        <div style={{ fontSize: '0.72rem', fontFamily: 'var(--font-80s)', color: '#111111', marginBottom: '5px', letterSpacing: '0.5px' }}>
          ★ ÍCONES DE NOSTALGIA DA ÉPOCA ★
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', justifyContent: 'center' }}>
          {(popCulture.nostalgiaItems || []).map((item: string, idx: number) => {
            const stickerBg = idx % 3 === 0 ? '#ff2a85' : idx % 3 === 1 ? '#ffe600' : '#00d2ff';
            const stickerColor = idx % 3 === 0 ? '#ffffff' : '#111111';

            return (
              <span
                key={idx}
                style={{
                  padding: '4px 10px',
                  borderRadius: '8px',
                  background: stickerBg,
                  color: stickerColor,
                  border: '2px solid #111111',
                  boxShadow: '2px 2px 0px #111111',
                  fontSize: '0.74rem',
                  fontFamily: 'var(--font-80s)',
                  letterSpacing: '0.3px',
                }}
              >
                {item}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}
