'use client';

import React from 'react';
import { BirthDataPayload } from '@/types/universario';
import { VcrOsdBadge, ScotchTape, DymoLabel, CollageCutout } from '../VhsGraphics';

interface SlideProps {
  data: BirthDataPayload;
}

export default function SlideMoonAstronomy({ data }: SlideProps) {
  const { astronomy } = data;

  const renderMoonSvg = () => {
    const illum = astronomy.moonIlluminationPercent;
    const isWaxing = astronomy.moonPhaseIndex <= 4;

    return (
      <div style={{ position: 'relative', width: 'clamp(68px, 16vw, 90px)', height: 'clamp(68px, 16vw, 90px)', margin: '0 auto' }}>
        {/* Glowing Halo / Atmosphere */}
        <div
          style={{
            position: 'absolute',
            inset: '-8px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(0, 229, 255, 0.3) 0%, transparent 70%)',
            filter: 'blur(5px)',
            pointerEvents: 'none',
          }}
        />

        {/* Moon Sphere with Realistic Analog Shading */}
        <svg
          viewBox="0 0 100 100"
          style={{
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            border: '2px solid rgba(255, 255, 255, 0.8)',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.95), 0 0 14px rgba(0, 229, 255, 0.5)',
            backgroundColor: '#070912',
          }}
        >
          <defs>
            <radialGradient id="moonGlowGradVhs" cx="45%" cy="45%" r="55%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
              <stop offset="60%" stopColor="#e2e8f0" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#94a3b8" stopOpacity="0.85" />
            </radialGradient>
            <mask id="moonPhaseMaskVhs">
              <rect x="0" y="0" width="100" height="100" fill="white" />
              {illum < 98 && (
                <path
                  d={
                    isWaxing
                      ? `M 50 0 A 50 50 0 0 0 50 100 A ${Math.abs(50 - (illum / 100) * 100)} 50 0 0 ${
                          illum < 50 ? '0' : '1'
                        } 50 0`
                      : `M 50 0 A 50 50 0 0 1 50 100 A ${Math.abs(50 - (illum / 100) * 100)} 50 0 0 ${
                          illum < 50 ? '1' : '0'
                        } 50 0`
                  }
                  fill="black"
                />
              )}
            </mask>
          </defs>

          {/* Base illuminated moon */}
          <circle cx="50" cy="50" r="49" fill="url(#moonGlowGradVhs)" mask="url(#moonPhaseMaskVhs)" />

          {/* Craters detail */}
          <circle cx="35" cy="40" r="7" fill="rgba(30, 41, 59, 0.35)" mask="url(#moonPhaseMaskVhs)" />
          <circle cx="62" cy="35" r="9" fill="rgba(30, 41, 59, 0.3)" mask="url(#moonPhaseMaskVhs)" />
          <circle cx="50" cy="68" r="11" fill="rgba(30, 41, 59, 0.3)" mask="url(#moonPhaseMaskVhs)" />
          <circle cx="70" cy="65" r="5" fill="rgba(30, 41, 59, 0.25)" mask="url(#moonPhaseMaskVhs)" />
        </svg>
      </div>
    );
  };

  return (
    <div className="slide-vhs-canvas slide-theme-moon" style={{ position: 'relative' }}>
      {/* Photo-Collage Luneta Cutout Overlaid beside Moon, outside text reading flow */}
      <CollageCutout
        src="/cutouts/luneta_cutout.jpg"
        alt="Luneta astronômica retrô"
        size={100}
        rotate={14}
        style={{
          top: '25%',
          right: '-8px',
          zIndex: 20,
          pointerEvents: 'none',
        }}
      />
      <ScotchTape width={38} height={12} rotate={16} style={{ top: '26%', right: '14px', zIndex: 21 }} />

      {/* Top Fuji & VCR OSD Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', zIndex: 2, padding: '0 4px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <VcrOsdBadge text="TRACKING AUTO" variant="tracking" />
          <VcrOsdBadge text="CH 03 NTSC" variant="sp" />
        </div>
        <div
          style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: '0.66rem',
            color: '#ffffff',
            background: 'linear-gradient(90deg, #e50914, #ff9100, #ffd700, #00e676, #00b0ff, #9c27b0)',
            padding: '2px 8px',
            borderRadius: '2px',
            fontWeight: 900,
            letterSpacing: '1px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.5)',
          }}
        >
          MAPA CELESTE
        </div>
      </div>

      {/* Title & Moon Phase Dymo */}
      <div style={{ textAlign: 'center', zIndex: 2, marginTop: '2px' }}>
        <div style={{ marginBottom: '2px' }}>
          <DymoLabel text="MAPA CELESTE • FASE DA LUA" color="blue" rotate={-1} fontSize="0.64rem" />
        </div>

        <h2
          style={{
            fontSize: 'clamp(1.2rem, 4.5vw, 1.65rem)',
            fontWeight: 900,
            fontFamily: "'Archivo Black', sans-serif",
            lineHeight: 1.1,
            color: '#ffffff',
            textShadow: '0 2px 8px rgba(0, 229, 255, 0.5), 0 0 2px #000',
            letterSpacing: '0.5px',
          }}
        >
          {astronomy.moonPhaseName.toUpperCase()}
        </h2>

        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '2px 10px',
            borderRadius: '4px',
            background: 'rgba(10, 12, 18, 0.85)',
            border: '1px solid rgba(0, 229, 255, 0.35)',
            fontSize: 'clamp(0.66rem, 1.8vw, 0.72rem)',
            fontFamily: "'Share Tech Mono', monospace",
            color: 'var(--vhs-cyan)',
            marginTop: '2px',
          }}
        >
          <span>ILUMINAÇÃO: {astronomy.moonIlluminationPercent}%</span>
          <span>•</span>
          <span>IDADE: {astronomy.moonAgeDays} DIAS</span>
        </div>
      </div>

      {/* Moon Center with Glowing Telemetry Ring */}
      <div style={{ margin: '2px 0', textAlign: 'center', zIndex: 2 }}>
        {renderMoonSvg()}
      </div>

      {/* Torn Paper Photo-Collage Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(5px, 1.2vh, 7px)', zIndex: 2 }}>
        {/* NASA Sky Observation Torn Card */}
        <div
          className="torn-photo-card"
          style={{
            padding: 'clamp(6px, 1.6vw, 9px) clamp(8px, 2vw, 12px)',
            background: '#fffdf5',
            transform: 'rotate(0.5deg)',
          }}
        >
          <ScotchTape width={50} height={15} rotate={-4} style={{ top: '-7px', right: '12%' }} />

          <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '2px' }}>
            <span style={{ fontSize: '0.62rem', fontWeight: 900, fontFamily: "'Share Tech Mono', monospace", color: '#e50914', letterSpacing: '0.5px' }}>
              ✦ {astronomy.nasaApod ? 'REGISTRO OFICIAL NASA' : 'CONDIÇÃO CELESTE'}
            </span>
          </div>
          <p style={{ fontSize: 'clamp(0.70rem, 1.8vw, 0.76rem)', lineHeight: 1.25, color: '#111827', fontWeight: 600 }}>
            {astronomy.skyHighlight}
          </p>
        </div>

        {/* Astrological Cosmic Message Dark Sleeve Card */}
        <div
          className="torn-photo-card-dark"
          style={{
            padding: 'clamp(6px, 1.6vw, 9px) clamp(8px, 2vw, 12px)',
            transform: 'rotate(-0.5deg)',
          }}
        >
          <ScotchTape width={50} height={15} rotate={4} style={{ bottom: '-7px', left: '12%' }} />

          <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '2px' }}>
            <span style={{ fontSize: '0.62rem', fontWeight: 900, fontFamily: "'Share Tech Mono', monospace", color: 'var(--vhs-gold)', letterSpacing: '0.5px' }}>
              ✦ INFLUÊNCIA CÓSMICA ({astronomy.zodiacSign.toUpperCase()})
            </span>
          </div>
          <p style={{ fontSize: 'clamp(0.70rem, 1.8vw, 0.76rem)', lineHeight: 1.25, color: '#e2e8f0', fontStyle: 'italic', fontWeight: 500 }}>
            &ldquo;{astronomy.cosmicMessage}&rdquo;
          </p>
        </div>
      </div>
    </div>
  );
}
