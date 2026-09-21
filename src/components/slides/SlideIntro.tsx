'use client';

import React from 'react';
import { BirthDataPayload } from '@/types/universario';
import { getWhenBornPhrase } from '@/lib/grammatical-gender';
import { VcrOsdBadge, VhsGoldSeal, ScotchTape, DymoLabel, SharpieLabel, VhsRainbowBand, VhsTapeSpecBadge, VhsDotMatrixBadge } from '../VhsGraphics';

interface SlideProps {
  data: BirthDataPayload;
}

export default function SlideIntro({ data }: SlideProps) {
  const displayName = data.name ? data.name : 'Você';

  return (
    <div className="slide-vhs-canvas slide-theme-maxell" style={{ position: 'relative' }}>
      {/* 4-Color Vintage Blank Tape Rainbow Racing Stripes */}
      <div style={{ zIndex: 2, margin: '2px 0 6px 0' }}>
        <VhsRainbowBand height={8} />
      </div>

      {/* Main Sleeve Header & Giant Gold Year */}
      <div style={{ zIndex: 2, textAlign: 'center' }}>
        <SharpieLabel
          text={`GRAVAÇÃO ORIGINAL • ${displayName.toUpperCase()}`}
          subtext={`O MUNDO ${getWhenBornPhrase(data.name, data.gender).toUpperCase()} • ${data.year}`}
          rotate={-1.2}
        />

        {/* Giant 80s Gold Foil Typography Year with Chromatic Glow */}
        <div style={{ position: 'relative', display: 'inline-block', margin: '4px 0 2px 0' }}>
          <h1
            style={{
              fontSize: 'clamp(3.0rem, 11vw, 4.4rem)',
              fontWeight: 900,
              fontFamily: "'Archivo Black', sans-serif",
              lineHeight: 0.92,
              letterSpacing: '2px',
              background: 'linear-gradient(180deg, #ffffff 0%, #ffe600 35%, #d4af37 60%, #996515 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              filter: 'drop-shadow(3px 3px 0px #000000) drop-shadow(0 0 14px rgba(255, 215, 0, 0.45))',
            }}
          >
            {data.year}
          </h1>
        </div>
      </div>

      {/* Center Torn Photo & Astrological Collage */}
      <div style={{ zIndex: 2, display: 'flex', flexDirection: 'column', gap: 'clamp(5px, 1.3vh, 8px)', margin: '2px 0' }}>
        {/* Torn Photo Date Card with Scotch Tape */}
        <div
          className="torn-photo-card"
          style={{
            padding: 'clamp(7px, 1.8vw, 10px) clamp(10px, 2.5vw, 14px)',
            background: '#fffdf4',
            transform: 'rotate(-0.6deg)',
          }}
        >
          <ScotchTape width={54} height={16} rotate={-6} style={{ top: '-8px', left: '15%' }} />
          <ScotchTape width={54} height={16} rotate={5} style={{ bottom: '-7px', right: '15%' }} />

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.62rem', color: '#e50914', letterSpacing: '0.5px', fontWeight: 800 }}>
                ★ DATA DO REGISTRO HISTÓRICO
              </div>
              <div style={{ fontSize: 'clamp(1.05rem, 3.4vw, 1.25rem)', fontWeight: 900, fontFamily: "'Archivo Black', sans-serif", color: '#111827', marginTop: '1px' }}>
                {data.dayOfMonth} DE {data.monthName.toUpperCase()}
              </div>
            </div>

            <DymoLabel text={data.dayOfWeek} color="red" rotate={2} fontSize="0.70rem" />
          </div>
        </div>

        {/* 2 Skeuomorphic Collage Badges (Signo Solar & Ano Chinês) */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(5px, 1.4vw, 8px)' }}>
          {/* Signo Solar */}
          <div
            className="torn-photo-card-dark"
            style={{
              padding: 'clamp(6px, 1.6vw, 9px) clamp(8px, 2vw, 10px)',
              transform: 'rotate(0.5deg)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
              <span style={{ fontSize: '1.2rem' }}>{data.astronomy.zodiacSymbol}</span>
              <div>
                <div style={{ fontSize: '0.56rem', fontFamily: "'Share Tech Mono', monospace", color: 'var(--vhs-gold)', letterSpacing: '0.5px' }}>
                  SIGNO SOLAR
                </div>
                <div style={{ fontSize: 'clamp(0.82rem, 2.5vw, 0.92rem)', fontWeight: 900, fontFamily: "'Archivo Black', sans-serif", color: '#ffffff' }}>
                  {data.astronomy.zodiacSign.toUpperCase()}
                </div>
              </div>
            </div>
            <div style={{ fontSize: '0.60rem', color: '#9e9ea7', fontFamily: "'Share Tech Mono', monospace" }}>
              ELEMENTO: {data.astronomy.zodiacElement.toUpperCase()}
            </div>
          </div>

          {/* Ano Chinês & Voltas no Sol */}
          <div
            className="torn-photo-card-dark"
            style={{
              padding: 'clamp(6px, 1.6vw, 9px) clamp(8px, 2vw, 10px)',
              transform: 'rotate(-0.5deg)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
              <span style={{ fontSize: '1.2rem' }}>{data.astronomy.chineseZodiacEmoji}</span>
              <div>
                <div style={{ fontSize: '0.56rem', fontFamily: "'Share Tech Mono', monospace", color: 'var(--vhs-cyan)', letterSpacing: '0.5px' }}>
                  ANO CHINÊS
                </div>
                <div style={{ fontSize: 'clamp(0.80rem, 2.4vw, 0.90rem)', fontWeight: 800, fontFamily: "'Archivo Black', sans-serif", color: '#ffffff' }}>
                  {data.astronomy.chineseZodiac}
                </div>
              </div>
            </div>
            <div style={{ fontSize: '0.60rem', color: 'var(--vhs-gold)', fontFamily: "'Share Tech Mono', monospace", fontWeight: 700 }}>
              ☀️ {data.stats.sunOrbits} VOLTAS NO SOL
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Tape Specifications Barcode & Rainbow Finish */}
      <div style={{ zIndex: 2, display: 'flex', flexDirection: 'column', gap: '3px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 4px' }}>
          <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.64rem', color: 'var(--vhs-gold)', letterSpacing: '0.5px' }}>
            ✦ GERAÇÃO: {data.stats.generationName.toUpperCase()}
          </span>
          <span style={{ fontFamily: "'VT323', monospace", fontSize: '0.86rem', color: 'var(--vhs-green-osd)' }}>
            246 METERS • HIGH OUTPUT
          </span>
        </div>
        <VhsRainbowBand height={6} />
      </div>
    </div>
  );
}

