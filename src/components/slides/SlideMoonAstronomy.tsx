'use client';

import React from 'react';
import { BirthDataPayload } from '@/types/universario';
import { Moon, Sparkles, Compass } from 'lucide-react';
import { MemphisSquiggle, MemphisZigzag, MemphisTrianglePattern, MemphisCrosshatch } from '../MemphisDoodles';

interface SlideProps {
  data: BirthDataPayload;
}

export default function SlideMoonAstronomy({ data }: SlideProps) {
  const { astronomy } = data;

  const renderMoonSvg = () => {
    const illum = astronomy.moonIlluminationPercent;
    const isWaxing = astronomy.moonPhaseIndex <= 4;

    return (
      <div style={{ position: 'relative', width: 'clamp(100px, 28vw, 130px)', height: 'clamp(100px, 28vw, 130px)', margin: '0 auto' }}>
        {/* Memphis Geometric Rings around Moon */}
        <div
          style={{
            position: 'absolute',
            inset: '-8px',
            borderRadius: '50%',
            border: '2.5px solid #111111',
            boxShadow: '3px 3px 0px #ff2a85',
            pointerEvents: 'none',
          }}
        />

        {/* Moon Sphere */}
        <svg
          viewBox="0 0 100 100"
          style={{
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            border: '2.5px solid #111111',
            boxShadow: '3px 3px 0px #111111',
            backgroundColor: '#111111',
          }}
        >
          <defs>
            <radialGradient id="moonGlowGradMemphis" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffe600" stopOpacity="1" />
              <stop offset="70%" stopColor="#fff275" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0.9" />
            </radialGradient>
            <mask id="moonPhaseMaskMemphis">
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
          <circle cx="50" cy="50" r="49" fill="url(#moonGlowGradMemphis)" mask="url(#moonPhaseMaskMemphis)" />

          {/* Craters detail */}
          <circle cx="35" cy="40" r="7" fill="rgba(17, 17, 17, 0.2)" mask="url(#moonPhaseMaskMemphis)" />
          <circle cx="62" cy="35" r="9" fill="rgba(17, 17, 17, 0.18)" mask="url(#moonPhaseMaskMemphis)" />
          <circle cx="50" cy="68" r="11" fill="rgba(17, 17, 17, 0.18)" mask="url(#moonPhaseMaskMemphis)" />
        </svg>
      </div>
    );
  };

  return (
    <div className="slide-memphis-canvas slide-theme-moon">
      {/* Memphis Floating Doodles */}
      <div style={{ position: 'absolute', top: '10%', left: '5%', pointerEvents: 'none' }} className="animate-float-1">
        <MemphisTrianglePattern size={40} fillColor="#ff2a85" />
      </div>

      <div style={{ position: 'absolute', top: '22%', right: '5%', pointerEvents: 'none' }} className="animate-float-2">
        <MemphisCrosshatch size={30} color="#111111" />
      </div>

      {/* Top Header Tag */}
      <div style={{ textAlign: 'center', zIndex: 2 }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '4px 12px',
            borderRadius: '8px',
            background: '#ffe600',
            border: '2px solid #111111',
            boxShadow: '2px 2px 0px #111111',
            fontSize: '0.74rem',
            fontFamily: 'var(--font-80s)',
            letterSpacing: '0.5px',
            color: '#111111',
            marginBottom: '4px',
            transform: 'rotate(1deg)',
          }}
        >
          <Moon size={13} />
          <span>FASE DA LUA • MAPA ESTELAR</span>
        </div>

        <h2
          style={{
            fontSize: 'clamp(1.5rem, 5.5vw, 2.05rem)',
            fontWeight: 900,
            fontFamily: 'var(--font-80s)',
            lineHeight: 1.1,
            marginBottom: '4px',
            color: '#111111',
            textShadow: '2.5px 2.5px 0px #00d2ff',
          }}
          className="text-chromatic"
        >
          {astronomy.moonPhaseName.toUpperCase()}
        </h2>

        <div
          style={{
            display: 'inline-block',
            padding: '2px 10px',
            borderRadius: '6px',
            background: '#ffffff',
            border: '1.5px solid #111111',
            boxShadow: '2px 2px 0px #111111',
            fontSize: '0.76rem',
            fontFamily: 'var(--font-80s)',
            color: '#ff2a85',
            letterSpacing: '0.5px',
          }}
        >
          ILUMINAÇÃO: {astronomy.moonIlluminationPercent}% • IDADE: {astronomy.moonAgeDays} DIAS
        </div>
      </div>

      {/* Moon Center with Memphis 80s Frame */}
      <div style={{ margin: '6px 0', textAlign: 'center', zIndex: 2 }}>
        {renderMoonSvg()}
      </div>

      {/* Memphis Detail Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', zIndex: 2 }}>
        {/* Sky observation card */}
        <div
          style={{
            padding: '11px 14px',
            borderRadius: '14px',
            background: '#ffffff',
            border: '2.5px solid #111111',
            boxShadow: '3px 3px 0px #111111, 6px 6px 0px #00d2ff',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
            <Sparkles size={14} color="#ff2a85" />
            <span style={{ fontSize: '0.74rem', fontWeight: 900, fontFamily: 'var(--font-80s)', color: '#ff2a85', letterSpacing: '0.5px' }}>
              {astronomy.nasaApod ? 'REGISTRO ASTRONÔMICO NASA' : 'CONDIÇÃO CELESTE'}
            </span>
          </div>
          <p style={{ fontSize: '0.80rem', lineHeight: 1.35, color: '#111111', fontWeight: 600 }}>
            {astronomy.skyHighlight}
          </p>
        </div>

        {/* Astrological & Elemental Quote */}
        <div
          style={{
            padding: '11px 14px',
            borderRadius: '14px',
            background: '#ffffff',
            border: '2.5px solid #111111',
            boxShadow: '3px 3px 0px #111111, 6px 6px 0px #ffe600',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
            <Compass size={14} color="#9b51e0" />
            <span style={{ fontSize: '0.74rem', fontWeight: 900, fontFamily: 'var(--font-80s)', color: '#9b51e0', letterSpacing: '0.5px' }}>
              INFLUÊNCIA CÓSMICA ({astronomy.zodiacSign.toUpperCase()})
            </span>
          </div>
          <p style={{ fontSize: '0.80rem', lineHeight: 1.35, color: '#111111', fontStyle: 'italic', fontWeight: 600 }}>
            &ldquo;{astronomy.cosmicMessage}&rdquo;
          </p>
        </div>
      </div>
    </div>
  );
}
