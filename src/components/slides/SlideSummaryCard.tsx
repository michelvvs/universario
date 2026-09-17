'use client';

import React from 'react';
import { BirthDataPayload } from '@/types/universario';
import { Award, Music, Film, Zap, Star, Sparkles } from 'lucide-react';
import {
  MemphisSquiggle,
  MemphisZigzag,
  MemphisTrianglePattern,
  MemphisCrosshatch,
  MemphisCoil,
} from '@/components/MemphisDoodles';

interface SlideProps {
  data: BirthDataPayload;
}

export default function SlideSummaryCard({ data }: SlideProps) {
  const displayName = data.name ? data.name : 'Você';

  return (
    <div
      className="slide-memphis-canvas slide-theme-summary slide-content-enter"
      style={{ color: '#111111' }}
    >
      {/* Decorative Memphis Washi Tape on top */}
      <div className="tape-strip" style={{ top: '8px', left: '26%' }} />
      <div className="tape-strip tape-strip-cyan" style={{ bottom: '12px', right: '16%' }} />

      {/* Floating Memphis Geometric Accents */}
      <div style={{ position: 'absolute', top: '14px', right: '16px', zIndex: 1 }}>
        <MemphisTrianglePattern size={44} fillColor="#00d2ff" borderColor="#111111" />
      </div>
      <div style={{ position: 'absolute', top: '78px', left: '10px', zIndex: 1 }}>
        <MemphisCrosshatch size={32} color="#111111" />
      </div>
      <div style={{ position: 'absolute', bottom: '60px', left: '12px', zIndex: 1 }}>
        <MemphisCoil width={42} height={16} color="#ff2a85" />
      </div>
      <div style={{ position: 'absolute', bottom: '130px', right: '12px', zIndex: 1 }}>
        <MemphisZigzag width={46} height={16} color="#111111" />
      </div>

      {/* Top Header */}
      <div style={{ textAlign: 'center', zIndex: 2, marginTop: '2px' }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '4px 14px',
            borderRadius: '8px',
            background: '#ffe600',
            border: '2.5px solid #111111',
            boxShadow: '3px 3px 0px #111111',
            fontSize: '0.76rem',
            fontFamily: 'var(--font-80s)',
            letterSpacing: '0.5px',
            color: '#111111',
            marginBottom: '4px',
          }}
        >
          <Award size={14} color="#111111" />
          <span>PASSAPORTE CÓSMICO VIP • MEMPHIS 80s</span>
        </div>

        <h2
          style={{
            fontSize: 'clamp(1.55rem, 6vw, 2.3rem)',
            fontWeight: 900,
            fontFamily: 'var(--font-80s)',
            lineHeight: 1.05,
            color: '#111111',
            marginTop: '2px',
          }}
          className="text-chromatic"
        >
          {displayName.toUpperCase()}
        </h2>

        <div
          style={{
            display: 'inline-block',
            background: '#ff2a85',
            color: '#ffffff',
            border: '2px solid #111111',
            borderRadius: '6px',
            padding: '2px 10px',
            fontSize: '0.80rem',
            fontFamily: 'var(--font-crt)',
            letterSpacing: '0.5px',
            boxShadow: '2px 2px 0px #111111',
            marginTop: '3px',
          }}
        >
          {data.formattedDate.toUpperCase()} • {data.dayOfWeek.toUpperCase()}
        </div>
      </div>

      {/* 80s Memphis VIP Passport Card */}
      <div
        className="memphis-card"
        style={{
          background: '#ffffff',
          borderRadius: '16px',
          padding: 'clamp(9px, 2.2vw, 12px) clamp(10px, 2.5vw, 14px)',
          border: '3px solid #111111',
          boxShadow: '4px 4px 0px #111111, 8px 8px 0px #ff2a85',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          gap: 'clamp(6px, 1.8vw, 8px)',
          position: 'relative',
        }}
      >
        {/* Row 1: Sign & Moon */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(6px, 1.8vw, 8px)' }}>
          <div
            style={{
              padding: '8px 10px',
              borderRadius: '10px',
              background: '#fff275',
              border: '2px solid #111111',
              boxShadow: '2.5px 2.5px 0px #111111',
            }}
          >
            <div
              style={{
                fontSize: '0.64rem',
                fontFamily: 'var(--font-80s)',
                color: '#111111',
                letterSpacing: '0.5px',
                display: 'flex',
                alignItems: 'center',
                gap: '3px',
              }}
            >
              <span>⭐ SIGNO SOLAR</span>
            </div>
            <div
              style={{
                fontSize: '0.92rem',
                fontWeight: 800,
                fontFamily: 'var(--font-80s)',
                color: '#111111',
                marginTop: '2px',
              }}
            >
              {data.astronomy.zodiacSymbol} {data.astronomy.zodiacSign.toUpperCase()}
            </div>
          </div>

          <div
            style={{
              padding: '8px 10px',
              borderRadius: '10px',
              background: '#80e8ff',
              border: '2px solid #111111',
              boxShadow: '2.5px 2.5px 0px #111111',
            }}
          >
            <div
              style={{
                fontSize: '0.64rem',
                fontFamily: 'var(--font-80s)',
                color: '#111111',
                letterSpacing: '0.5px',
                display: 'flex',
                alignItems: 'center',
                gap: '3px',
              }}
            >
              <span>🌙 FASE DA LUA</span>
            </div>
            <div
              style={{
                fontSize: '0.86rem',
                fontWeight: 800,
                fontFamily: 'var(--font-80s)',
                color: '#111111',
                marginTop: '2px',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {data.astronomy.moonPhaseEmoji} {data.astronomy.moonPhaseName}
            </div>
          </div>
        </div>

        {/* Row 2: Top Music */}
        <div
          style={{
            padding: '8px 10px',
            borderRadius: '10px',
            background: '#ff66aa',
            border: '2px solid #111111',
            boxShadow: '2.5px 2.5px 0px #111111',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          <div
            style={{
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              background: '#ffe600',
              border: '2px solid #111111',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <Music size={15} color="#111111" />
          </div>
          <div style={{ minWidth: 0, flex: 1 }}>
            <div
              style={{
                fontSize: '0.62rem',
                fontFamily: 'var(--font-80s)',
                color: '#ffffff',
                letterSpacing: '0.5px',
                textShadow: '1px 1px 0px #111111',
              }}
            >
              TRILHA DA ÉPOCA (#1)
            </div>
            <div
              style={{
                fontSize: '0.84rem',
                fontWeight: 800,
                color: '#111111',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {data.music.brazilTopTrack?.title || data.music.globalTopTrack.title} — {data.music.brazilTopTrack?.artist || data.music.globalTopTrack.artist}
            </div>
          </div>
        </div>

        {/* Row 3: Top Movie */}
        <div
          style={{
            padding: '8px 10px',
            borderRadius: '10px',
            background: '#c288f5',
            border: '2px solid #111111',
            boxShadow: '2.5px 2.5px 0px #111111',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          <div
            style={{
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              background: '#00d2ff',
              border: '2px solid #111111',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <Film size={15} color="#111111" />
          </div>
          <div style={{ minWidth: 0, flex: 1 }}>
            <div
              style={{
                fontSize: '0.62rem',
                fontFamily: 'var(--font-80s)',
                color: '#ffffff',
                letterSpacing: '0.5px',
                textShadow: '1px 1px 0px #111111',
              }}
            >
              FILME EM CARTAZ
            </div>
            <div
              style={{
                fontSize: '0.84rem',
                fontWeight: 800,
                color: '#111111',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {data.popCulture.topMovie.title}
            </div>
          </div>
        </div>

        {/* Row 4: Generation Badge */}
        <div
          style={{
            textAlign: 'center',
            padding: '6px 10px',
            borderRadius: '8px',
            background: '#111111',
            color: '#ffe600',
            fontSize: '0.74rem',
            fontWeight: 800,
            fontFamily: 'var(--font-80s)',
            letterSpacing: '0.5px',
          }}
        >
          ★ {data.stats.generationName.toUpperCase()} • {data.stats.daysAlive.toLocaleString('pt-BR')} DIAS VIVIDOS ★
        </div>
      </div>

      {/* Call to action footer / Watermark */}
      <div style={{ textAlign: 'center', zIndex: 2, marginBottom: '2px' }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '0.88rem',
            fontWeight: 900,
            fontFamily: 'var(--font-80s)',
            color: '#111111',
            letterSpacing: '0.8px',
            background: '#ffe600',
            border: '2px solid #111111',
            borderRadius: '8px',
            padding: '3px 12px',
            boxShadow: '2.5px 2.5px 0px #111111',
          }}
        >
          <Zap size={15} fill="#111111" color="#111111" />
          <span className="text-chromatic">UNIVERSARIO.APP</span>
        </div>
        <div
          style={{
            fontFamily: 'var(--font-crt)',
            fontSize: '0.82rem',
            color: '#111111',
            fontWeight: 700,
            marginTop: '4px',
            letterSpacing: '0.5px',
          }}
        >
          GERE SUA RETROSPECTIVA MEMPHIS EM STORIES
        </div>
      </div>
    </div>
  );
}

