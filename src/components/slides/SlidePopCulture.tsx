'use client';

import React from 'react';
import { BirthDataPayload } from '@/types/universario';
import { getWhenBornPhrase } from '@/lib/grammatical-gender';
import { Film, Tv, Cpu, Sparkles, Clapperboard, Video } from 'lucide-react';
import { VcrOsdBadge, ScotchTape, DymoLabel, VhsGoldSeal, CollageCutout } from '../VhsGraphics';
import StoryHeader from '../StoryHeader';

interface SlideProps {
  data: BirthDataPayload;
}

export default function SlidePopCulture({ data }: SlideProps) {
  const { popCulture, year } = data;

  return (
    <div className="slide-vhs-canvas slide-theme-pop" style={{ position: 'relative' }}>
      {/* Integrated Retro VCR Header (Safe Story OSD) */}
      <StoryHeader data={data} />

      {/* 3D Glasses & Movie Tickets Collage Cutout Overlaid beside cards, outside text */}
      <CollageCutout
        src="/cutouts/cinema_cutout.jpg"
        alt="Óculos 3D retrô e ingressos de cinema"
        size={74}
        rotate={-8}
        style={{
          top: '22%',
          right: '-6px',
          zIndex: 20,
          pointerEvents: 'none',
        }}
      />
      <ScotchTape width={36} height={12} rotate={-10} style={{ top: '21.5%', right: '14px', zIndex: 21 }} />

      {/* Cinema & Pop Culture Main Header: Synthesized & Clean */}
      <div style={{ textAlign: 'center', zIndex: 2, marginBottom: '6px' }}>
        <h2
          style={{
            fontSize: 'clamp(1.2rem, 4.2vw, 1.55rem)',
            fontWeight: 900,
            fontFamily: "'Archivo Black', sans-serif",
            color: '#ffffff',
            lineHeight: 1.1,
            letterSpacing: '0.8px',
            textShadow: '0 2px 6px rgba(0,0,0,0.9), 0 0 12px rgba(0, 229, 255, 0.35)',
            textTransform: 'uppercase',
            margin: 0,
          }}
        >
          CINEMA & TELAS
        </h2>
        <div
          style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: 'clamp(0.68rem, 2vw, 0.76rem)',
            color: 'var(--vhs-gold)',
            letterSpacing: '0.5px',
            marginTop: '3px',
            fontWeight: 700,
          }}
        >
          O QUE FAZIA SUCESSO {getWhenBornPhrase(data.name, data.gender).toUpperCase()}
        </div>
      </div>

      {/* Blockbuster Cinema Champion Tape Box */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          background: 'linear-gradient(135deg, #1c2030 0%, #0d111a 100%)',
          borderRadius: '6px',
          border: '2px solid rgba(255, 230, 0, 0.4)',
          padding: 'clamp(8px, 1.6vh, 12px) clamp(10px, 2.5vw, 14px)',
          boxShadow: '0 8px 24px rgba(0,0,0,0.8), inset 0 0 16px rgba(0,0,0,0.6)',
          zIndex: 2,
        }}
      >
        {/* Top Stickers Row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
          <DymoLabel text="CAMPEÃO DE CINEMA" color="yellow" fontSize="0.60rem" />
          <div style={{ transform: 'scale(0.85)', transformOrigin: 'top right' }}>
            <VhsGoldSeal text="#1 BILHETERIA" subtext={`ANO DE ${year}`} />
          </div>
        </div>

        {/* Movie Title & Info */}
        <div style={{ marginTop: '2px' }}>
          <div
            style={{
              fontFamily: 'var(--font-vcr)',
              color: '#00ffcc',
              fontSize: 'clamp(0.64rem, 1.8vw, 0.74rem)',
              letterSpacing: '1px',
              textTransform: 'uppercase',
              marginBottom: '2px',
            }}
          >
            FILME CAMPEÃO DE BILHETERIA
          </div>

          <h3
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(1.1rem, 3.6vw, 1.45rem)',
              color: '#ffffff',
              lineHeight: 1.1,
              letterSpacing: '0.5px',
              textShadow: '0 2px 10px rgba(0,0,0,0.9), 0 0 12px rgba(255, 230, 0, 0.3)',
              textTransform: 'uppercase',
            }}
          >
            {popCulture.topMovie.title}
          </h3>

          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'clamp(0.68rem, 1.9vw, 0.76rem)',
              color: '#a0aab8',
              marginTop: '2px',
            }}
          >
            Direção de <strong style={{ color: '#ffffff' }}>{popCulture.topMovie.director}</strong>
          </div>

          {/* Fun fact badge with Scotch Tape */}
          <div
            style={{
              position: 'relative',
              background: 'rgba(255, 230, 0, 0.12)',
              borderLeft: '3px solid #ffe600',
              padding: 'clamp(4px, 0.9vh, 6px) clamp(6px, 1.8vw, 10px)',
              marginTop: '6px',
              borderRadius: '0 4px 4px 0',
            }}
          >
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(0.66rem, 1.8vw, 0.74rem)',
                color: '#ffe600',
                lineHeight: 1.25,
                fontWeight: 600,
                margin: 0,
              }}
            >
              ✦ {popCulture.topMovie.funFact}
            </p>
          </div>
        </div>
      </div>

      {/* TV & Tech Middle Cards Row */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 'clamp(6px, 1.5vw, 8px)',
          width: '100%',
          zIndex: 2,
        }}
      >
        {/* TV Card */}
        <div
          style={{
            background: 'linear-gradient(135deg, #181c24 0%, #0f1218 100%)',
            border: '1px solid rgba(0, 210, 255, 0.3)',
            borderRadius: '5px',
            padding: 'clamp(6px, 1.2vh, 9px)',
            boxShadow: '0 4px 14px rgba(0,0,0,0.6)',
            position: 'relative',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '3px' }}>
            <Tv size={12} color="#00d2ff" />
            <span
              style={{
                fontFamily: 'var(--font-vcr)',
                fontSize: 'clamp(0.60rem, 1.6vw, 0.70rem)',
                color: '#00d2ff',
                letterSpacing: '0.5px',
                fontWeight: 'bold',
              }}
            >
              TV BRASILEIRA
            </span>
          </div>
          <div
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(0.66rem, 1.8vw, 0.74rem)',
              color: '#f0f3f8',
              lineHeight: 1.25,
              fontWeight: 600,
            }}
          >
            {popCulture.topBrazilianTVOrCulture}
          </div>
        </div>

        {/* Tech Milestone Card */}
        <div
          style={{
            background: 'linear-gradient(135deg, #181c24 0%, #0f1218 100%)',
            border: '1px solid rgba(255, 136, 0, 0.3)',
            borderRadius: '5px',
            padding: 'clamp(6px, 1.2vh, 9px)',
            boxShadow: '0 4px 14px rgba(0,0,0,0.6)',
            position: 'relative',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '3px' }}>
            <Cpu size={12} color="#ff8800" />
            <span
              style={{
                fontFamily: 'var(--font-vcr)',
                fontSize: 'clamp(0.60rem, 1.6vw, 0.70rem)',
                color: '#ff8800',
                letterSpacing: '0.5px',
                fontWeight: 'bold',
              }}
            >
              MARCO TEC 80s
            </span>
          </div>
          <div
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(0.66rem, 1.8vw, 0.74rem)',
              color: '#f0f3f8',
              lineHeight: 1.25,
              fontWeight: 600,
            }}
          >
            {popCulture.techMilestone}
          </div>
        </div>
      </div>

      {/* Nostalgia Chips / Dymo Embossed Labels */}
      <div style={{ width: '100%', zIndex: 2, textAlign: 'center' }}>
        <div
          style={{
            fontFamily: 'var(--font-vcr)',
            fontSize: 'clamp(0.64rem, 1.8vw, 0.72rem)',
            color: '#d0d4e0',
            marginBottom: '4px',
            letterSpacing: '1px',
          }}
        >
          ★ SÍMBOLOS & NOSTALGIA DA ÉPOCA ★
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', justifyContent: 'center' }}>
          {(popCulture.nostalgiaItems || []).map((item: string, idx: number) => {
            const colors: ('black' | 'red' | 'blue' | 'yellow')[] = ['black', 'red', 'blue', 'yellow'];
            const color = colors[idx % colors.length];

            return (
              <div key={idx} style={{ transform: idx % 2 === 0 ? 'rotate(-1deg)' : 'rotate(1deg)' }}>
                <DymoLabel text={item} color={color} />
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom VCR Telemetry */}
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
        <span
          style={{
            fontFamily: 'var(--font-vcr)',
            fontSize: 'clamp(0.62rem, 1.7vw, 0.70rem)',
            color: '#a0a5b5',
            letterSpacing: '0.5px',
          }}
        >
          POP CULTURE VCR CASSETTE
        </span>
        <span
          style={{
            fontFamily: 'var(--font-vcr)',
            fontSize: 'clamp(0.66rem, 1.8vw, 0.74rem)',
            color: '#00ffcc',
            letterSpacing: '1px',
          }}
        >
          01:54:10 STOP ■
        </span>
      </div>
    </div>
  );
}
