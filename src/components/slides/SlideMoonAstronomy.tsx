'use client';

import React from 'react';
import { BirthDataPayload } from '@/types/universario';
import { Moon, Sparkles, Compass, Star } from 'lucide-react';

interface SlideProps {
  data: BirthDataPayload;
}

export default function SlideMoonAstronomy({ data }: SlideProps) {
  const { astronomy } = data;

  const renderMoonSvg = () => {
    const illum = astronomy.moonIlluminationPercent;
    const isWaxing = astronomy.moonPhaseIndex <= 4;

    return (
      <div style={{ position: 'relative', width: '160px', height: '160px', margin: '0 auto' }}>
        {/* Synthwave Neon Rings behind moon */}
        <div
          style={{
            position: 'absolute',
            inset: '-12px',
            borderRadius: '50%',
            border: '2px solid #00f0ff',
            boxShadow: '0 0 20px rgba(0, 240, 255, 0.4), inset 0 0 15px rgba(255, 42, 133, 0.3)',
            animation: 'pulseGlow 3s infinite alternate',
          }}
        />

        {/* Moon Sphere */}
        <svg
          viewBox="0 0 100 100"
          style={{
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            boxShadow: '0 0 25px rgba(255, 222, 89, 0.4)',
            backgroundColor: '#0d061c',
          }}
        >
          <defs>
            <radialGradient id="moonGlowGrad80s" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffde59" stopOpacity="1" />
              <stop offset="70%" stopColor="#fef08a" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#cbd5e1" stopOpacity="0.85" />
            </radialGradient>
            <mask id="moonPhaseMask80s">
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
          <circle cx="50" cy="50" r="49" fill="url(#moonGlowGrad80s)" mask="url(#moonPhaseMask80s)" />

          {/* Craters detail */}
          <circle cx="35" cy="40" r="7" fill="rgba(100, 116, 139, 0.3)" mask="url(#moonPhaseMask80s)" />
          <circle cx="62" cy="35" r="9" fill="rgba(100, 116, 139, 0.25)" mask="url(#moonPhaseMask80s)" />
          <circle cx="50" cy="68" r="11" fill="rgba(100, 116, 139, 0.25)" mask="url(#moonPhaseMask80s)" />
        </svg>
      </div>
    );
  };

  return (
    <div
      style={{
        position: 'relative',
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '75px 22px 28px 22px',
        background: 'radial-gradient(circle at 50% 25%, #290847 0%, #120524 70%, #06010d 100%)',
        color: '#ffffff',
        overflow: 'hidden',
      }}
      className="slide-content-enter"
    >
      {/* Top Header Tag */}
      <div style={{ textAlign: 'center', zIndex: 2 }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '4px 12px',
            borderRadius: '8px',
            background: '#ffde59',
            border: '2px solid #0d061c',
            boxShadow: '3px 3px 0px #ff2a85',
            fontSize: '0.74rem',
            fontFamily: 'var(--font-80s)',
            letterSpacing: '0.5px',
            color: '#0d061c',
            marginBottom: '8px',
          }}
        >
          <Moon size={12} />
          <span>FASE DA LUA • MAPA ESTELAR</span>
        </div>

        <h2
          style={{
            fontSize: '2.0rem',
            fontWeight: 800,
            fontFamily: 'var(--font-80s)',
            lineHeight: 1.1,
            marginBottom: '2px',
          }}
          className="text-chromatic"
        >
          {astronomy.moonPhaseName.toUpperCase()}
        </h2>

        <p style={{ fontSize: '0.82rem', fontFamily: 'var(--font-crt)', color: '#00f0ff', letterSpacing: '0.5px' }}>
          ILUMINAÇÃO: {astronomy.moonIlluminationPercent}% • IDADE LUNAR: {astronomy.moonAgeDays} DIAS
        </p>
      </div>

      {/* Moon Center with Memphis 80s Synthwave Portal */}
      <div style={{ margin: '8px 0', textAlign: 'center', zIndex: 2 }}>
        {renderMoonSvg()}
      </div>

      {/* Cards with Details */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', zIndex: 2 }}>
        {/* Sky observation card */}
        <div
          className="memphis-card-cyan"
          style={{
            padding: '10px 14px',
            borderRadius: '12px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
            <Sparkles size={13} color="#ffde59" />
            <span style={{ fontSize: '0.72rem', fontWeight: 800, fontFamily: 'var(--font-80s)', color: '#ffde59', letterSpacing: '0.5px' }}>
              {astronomy.nasaApod ? 'REGISTRO ASTRONÔMICO NASA' : 'CONDIÇÃO CELESTE'}
            </span>
          </div>
          <p style={{ fontSize: '0.78rem', lineHeight: 1.35, color: '#f1f5f9' }}>
            {astronomy.skyHighlight}
          </p>
        </div>

        {/* Astrological & Elemental Quote */}
        <div
          className="memphis-card-pink"
          style={{
            padding: '10px 14px',
            borderRadius: '12px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
            <Compass size={13} color="#00f0ff" />
            <span style={{ fontSize: '0.72rem', fontWeight: 800, fontFamily: 'var(--font-80s)', color: '#00f0ff', letterSpacing: '0.5px' }}>
              INFLUÊNCIA CÓSMICA ({astronomy.zodiacSign.toUpperCase()})
            </span>
          </div>
          <p style={{ fontSize: '0.78rem', lineHeight: 1.35, color: '#ffffff', fontStyle: 'italic' }}>
            &ldquo;{astronomy.cosmicMessage}&rdquo;
          </p>
        </div>
      </div>
    </div>
  );
}
