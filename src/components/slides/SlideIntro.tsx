'use client';

import React from 'react';
import { BirthDataPayload } from '@/types/universario';
import { Sparkles, Calendar, Disc, Star, Zap } from 'lucide-react';

interface SlideProps {
  data: BirthDataPayload;
}

export default function SlideIntro({ data }: SlideProps) {
  const displayName = data.name ? data.name : 'Você';

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
        background: 'radial-gradient(circle at 50% 20%, #290847 0%, #130626 70%, #080214 100%)',
        color: '#ffffff',
        overflow: 'hidden',
      }}
      className="slide-content-enter"
    >
      {/* Memphis Geometric Shapes floating in background */}
      <div
        style={{
          position: 'absolute',
          top: '14%',
          right: '8%',
          width: '0',
          height: '0',
          borderLeft: '14px solid transparent',
          borderRight: '14px solid transparent',
          borderBottom: '24px solid #ffde59',
          transform: 'rotate(25deg)',
          pointerEvents: 'none',
          opacity: 0.8,
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: '28%',
          left: '6%',
          width: '18px',
          height: '18px',
          border: '3px solid #00f0ff',
          borderRadius: '4px',
          transform: 'rotate(-15deg)',
          pointerEvents: 'none',
          opacity: 0.8,
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '22%',
          right: '10%',
          width: '26px',
          height: '26px',
          borderRadius: '50%',
          border: '3px dashed #ff2a85',
          pointerEvents: 'none',
          opacity: 0.7,
        }}
      />

      {/* Top VHS Header Banner */}
      <div style={{ zIndex: 2, textAlign: 'center' }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '4px 14px',
            borderRadius: '8px',
            background: '#ff2a85',
            border: '2px solid #ffffff',
            boxShadow: '3px 3px 0px #00f0ff',
            fontSize: '0.78rem',
            fontFamily: 'var(--font-80s)',
            letterSpacing: '0.8px',
            color: '#ffffff',
            marginBottom: '10px',
          }}
        >
          <Zap size={12} fill="#ffde59" color="#ffde59" />
          <span>NO DIA EM QUE {displayName.toUpperCase()} CHEGOU</span>
        </div>

        {/* Giant Chromatic Aberration 80s Year */}
        <h1
          style={{
            fontSize: '4.2rem',
            fontWeight: 900,
            fontFamily: 'var(--font-80s)',
            lineHeight: 0.95,
            letterSpacing: '1px',
            marginBottom: '4px',
            color: '#ffffff',
          }}
          className="text-chromatic"
        >
          {data.year}
        </h1>

        <div
          style={{
            fontSize: '1.25rem',
            fontWeight: 800,
            fontFamily: 'var(--font-80s)',
            color: '#ffde59',
            letterSpacing: '0.5px',
            textShadow: '0 2px 4px rgba(0,0,0,0.8)',
          }}
        >
          {data.dayOfMonth} DE {data.monthName.toUpperCase()}
        </div>

        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            fontFamily: 'var(--font-crt)',
            fontSize: '1.15rem',
            color: '#00f0ff',
            letterSpacing: '1px',
            marginTop: '2px',
          }}
        >
          <Calendar size={14} color="#00f0ff" />
          <span>{data.dayOfWeek.toUpperCase()}</span>
        </div>
      </div>

      {/* Center 80s Polaroid Frame & Astrological Badge */}
      <div style={{ zIndex: 2, display: 'flex', flexDirection: 'column', gap: '10px', margin: '6px 0' }}>
        {/* Polaroid Astro Card */}
        <div
          style={{
            background: '#ffffff',
            borderRadius: '12px',
            padding: '12px 14px',
            boxShadow: '5px 5px 0px #ff2a85, 9px 9px 0px #00f0ff',
            border: '2px solid #0d061c',
            position: 'relative',
            transform: 'rotate(-1.5deg)',
          }}
        >
          <div className="tape-strip" style={{ top: '-10px', left: '35%' }} />

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '10px',
                  background: '#ff2a85',
                  border: '2px solid #0d061c',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.8rem',
                  boxShadow: '2px 2px 0px #ffde59',
                }}
              >
                {data.astronomy.zodiacSymbol}
              </div>
              <div>
                <div style={{ fontSize: '0.68rem', fontFamily: 'var(--font-80s)', color: '#7928ca', letterSpacing: '0.5px' }}>
                  SIGNO SOLAR
                </div>
                <div style={{ fontSize: '1.15rem', fontWeight: 800, fontFamily: 'var(--font-80s)', color: '#0d061c' }}>
                  {data.astronomy.zodiacSign.toUpperCase()}
                </div>
              </div>
            </div>

            <div
              style={{
                padding: '4px 10px',
                borderRadius: '6px',
                background: '#ffde59',
                border: '1.5px solid #0d061c',
                color: '#0d061c',
                fontFamily: 'var(--font-80s)',
                fontSize: '0.74rem',
                boxShadow: '2px 2px 0px #ff2a85',
              }}
            >
              {data.astronomy.zodiacElement.toUpperCase()}
            </div>
          </div>
        </div>

        {/* 2 Memphis Mini Badges (Chinese Zodiac & Sun Orbits) */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
          <div
            className="memphis-card-pink"
            style={{ padding: '10px 8px', textAlign: 'center', borderRadius: '12px' }}
          >
            <div style={{ fontSize: '1.5rem', marginBottom: '2px' }}>
              {data.astronomy.chineseZodiacEmoji}
            </div>
            <div style={{ fontSize: '0.65rem', fontFamily: 'var(--font-80s)', color: '#ffde59', letterSpacing: '0.5px' }}>
              ANO CHINÊS
            </div>
            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#ffffff' }}>
              {data.astronomy.chineseZodiac}
            </div>
          </div>

          <div
            className="memphis-card-cyan"
            style={{ padding: '10px 8px', textAlign: 'center', borderRadius: '12px' }}
          >
            <div style={{ fontSize: '1.3rem', color: '#ffde59', fontWeight: 800, fontFamily: 'var(--font-80s)' }}>
              {data.stats.sunOrbits} ☀️
            </div>
            <div style={{ fontSize: '0.65rem', fontFamily: 'var(--font-80s)', color: '#00f0ff', letterSpacing: '0.5px' }}>
              VOLTAS NO SOL
            </div>
            <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#ffffff' }}>
              {data.stats.daysAlive.toLocaleString('pt-BR')} dias
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Generation Tag / Mixtape Badge */}
      <div style={{ zIndex: 2, textAlign: 'center' }}>
        <div
          style={{
            display: 'inline-block',
            padding: '8px 16px',
            borderRadius: '10px',
            background: '#16082f',
            border: '2px solid #26ffdf',
            boxShadow: '3px 3px 0px #ff2a85',
            fontFamily: 'var(--font-80s)',
            fontSize: '0.82rem',
            color: '#26ffdf',
            letterSpacing: '0.5px',
          }}
        >
          ✦ {data.stats.generationName.toUpperCase()} ✦
        </div>
        <div style={{ fontFamily: 'var(--font-crt)', fontSize: '0.95rem', color: '#ffde59', marginTop: '6px' }}>
          TOQUE PARA AVANÇAR ►►
        </div>
      </div>
    </div>
  );
}
