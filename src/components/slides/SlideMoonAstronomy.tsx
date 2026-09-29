'use client';

import React from 'react';
import { BirthDataPayload } from '@/types/universario';
import { getWhenBornPhrase } from '@/lib/grammatical-gender';
import { VcrOsdBadge, ScotchTape, DymoLabel, CollageCutout } from '../VhsGraphics';
import StoryHeader from '../StoryHeader';
import StoryCharacter from '../StoryCharacter';

interface SlideProps {
  data: BirthDataPayload;
}

export default function SlideMoonAstronomy({ data }: SlideProps) {
  const { astronomy } = data;

  const renderRealisticMoon = () => {
    const illum = astronomy.moonIlluminationPercent;
    const isWaxing = astronomy.moonPhaseIndex <= 4;

    return (
      <div style={{ position: 'relative', width: 'clamp(82px, 20vw, 102px)', height: 'clamp(82px, 20vw, 102px)', margin: '0 auto' }}>
        {/* Glowing Halo / Cyan Atmosphere */}
        <div
          style={{
            position: 'absolute',
            inset: '-10px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(0, 229, 255, 0.45) 0%, rgba(0, 150, 255, 0.15) 55%, transparent 75%)',
            filter: 'blur(8px)',
            pointerEvents: 'none',
          }}
        />

        {/* High-Resolution Photorealistic Moon Image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/realistic_moon.jpg"
          alt="Lua realista"
          style={{
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            objectFit: 'cover',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.95), 0 0 16px rgba(0, 229, 255, 0.45)',
            display: 'block',
          }}
        />

        {/* Dynamic Lunar Terminator Phase Shadow */}
        {illum < 98 && (
          <svg
            viewBox="0 0 100 100"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              pointerEvents: 'none',
              mixBlendMode: 'multiply',
            }}
          >
            <path
              d={
                isWaxing
                  ? `M 50 0 A 50 50 0 0 0 50 100 A ${Math.abs(50 - (illum / 100) * 100)} 50 0 0 ${illum < 50 ? '0' : '1'} 50 0`
                  : `M 50 0 A 50 50 0 0 1 50 100 A ${Math.abs(50 - (illum / 100) * 100)} 50 0 0 ${illum < 50 ? '1' : '0'} 50 0`
              }
              fill="#04060c"
              opacity="0.95"
            />
          </svg>
        )}
      </div>
    );
  };

  return (
    <div className="slide-vhs-canvas slide-theme-moon" style={{ position: 'relative' }}>
      {/* Galactic Animated Background Layer */}
      <div className="bg-anim-moon-layer">
        {/* Cosmic Nebula Breathing Glow */}
        <div
          style={{
            position: 'absolute',
            width: '280px',
            height: '280px',
            top: '20%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            background: 'radial-gradient(circle, rgba(0, 120, 255, 0.25) 0%, rgba(138, 43, 226, 0.18) 50%, transparent 70%)',
            filter: 'blur(35px)',
            animation: 'nebulaBreathe 6s ease-in-out infinite',
          }}
        />
        {/* Twinkling Stars Cluster */}
        <svg viewBox="0 0 360 640" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
          <circle cx="45" cy="80" r="1.5" fill="#ffffff" style={{ animation: 'starTwinkleFast 2s ease-in-out infinite' }} />
          <circle cx="120" cy="40" r="1" fill="#00e5ff" style={{ animation: 'starTwinkleSlow 3.5s ease-in-out infinite' }} />
          <circle cx="280" cy="95" r="1.8" fill="#ffd700" style={{ animation: 'starTwinkleFast 2.4s ease-in-out infinite 0.5s' }} />
          <circle cx="320" cy="180" r="1.2" fill="#ffffff" style={{ animation: 'starTwinkleSlow 4s ease-in-out infinite 1s' }} />
          <circle cx="60" cy="220" r="1.4" fill="#ffffff" style={{ animation: 'starTwinkleFast 3s ease-in-out infinite 0.8s' }} />
          <circle cx="310" cy="310" r="1.6" fill="#00e5ff" style={{ animation: 'starTwinkleSlow 3s ease-in-out infinite 1.5s' }} />
          <circle cx="50" cy="380" r="1" fill="#ffffff" style={{ animation: 'starTwinkleFast 2.2s ease-in-out infinite 0.3s' }} />
          <circle cx="95" cy="510" r="1.5" fill="#ffd700" style={{ animation: 'starTwinkleSlow 4.5s ease-in-out infinite' }} />
          <circle cx="270" cy="540" r="1.3" fill="#ffffff" style={{ animation: 'starTwinkleFast 2.8s ease-in-out infinite 1.2s' }} />
          {/* Shooting Star Streak */}
          <line x1="320" y1="40" x2="260" y2="85" stroke="#ffffff" strokeWidth="1.6" strokeLinecap="round" style={{ animation: 'shootingStarStreak 7s ease-out infinite 2s' }} />
        </svg>
      </div>

      {/* Integrated Retro VCR Header (Safe Story OSD) */}
      <StoryHeader data={data} />

      {/* Moon Phase Main Header: Centered */}
      <div className="story-anim-header" style={{ textAlign: 'center', zIndex: 2, marginBottom: '4px' }}>
        <h2
          style={{
            fontSize: 'clamp(1.15rem, 4vw, 1.55rem)',
            fontWeight: 900,
            fontFamily: "'Archivo Black', sans-serif",
            lineHeight: 1.12,
            color: '#ffffff',
            textShadow: '0 2px 8px rgba(0, 229, 255, 0.5), 0 0 2px #000',
            letterSpacing: '0.8px',
            textTransform: 'uppercase',
            margin: 0,
          }}
        >
          {astronomy.moonPhaseName.toUpperCase()}
        </h2>
        <div
          style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: 'clamp(0.65rem, 1.9vw, 0.74rem)',
            color: 'var(--vhs-cyan)',
            letterSpacing: '0.5px',
            marginTop: '3px',
            fontWeight: 700,
            lineHeight: 1.25,
          }}
        >
          O CÉU {getWhenBornPhrase(data.name, data.gender).toUpperCase()}
        </div>

        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '2px 8px',
            borderRadius: '4px',
            background: 'rgba(10, 12, 18, 0.85)',
            border: '1px solid rgba(0, 229, 255, 0.35)',
            fontSize: 'clamp(0.64rem, 1.8vw, 0.70rem)',
            fontFamily: "'Share Tech Mono', monospace",
            color: 'var(--vhs-cyan)',
            marginTop: '3px',
          }}
        >
          <span>ILUMINAÇÃO: {astronomy.moonIlluminationPercent}%</span>
          <span>•</span>
          <span>IDADE: {astronomy.moonAgeDays} DIAS</span>
        </div>
      </div>

      {/* Center Section: Realistic Glowing Moon + Centered Mascot */}
      <div style={{ margin: 'auto 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', zIndex: 4 }}>
        <div className="story-anim-polaroid" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '14px', width: '100%' }}>
          {renderRealisticMoon()}
          <StoryCharacter theme="moon" gender={data.gender} userPhotoUrl={data.userPhotoUrl} year={data.year} name={data.name} />
        </div>
      </div>

      {/* Torn Paper Photo-Collage Cards: Aligned to bottom */}
      <div style={{ marginTop: 'auto', position: 'relative', display: 'flex', flexDirection: 'column', gap: 'clamp(5px, 1.2vh, 7px)', zIndex: 5 }}>
        {/* NASA Sky Observation Torn Card */}
        <div
          className="torn-photo-card story-anim-card-1"
          style={{
            padding: 'clamp(6px, 1.6vw, 9px) clamp(8px, 2vw, 12px)',
            background: '#fffdf5',
            transform: 'rotate(0.5deg)',
          }}
        >
          <ScotchTape width={50} height={15} rotate={-4} style={{ top: '-7px', left: '8%' }} />

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
          className="torn-photo-card-dark story-anim-card-2"
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
