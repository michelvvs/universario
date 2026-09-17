'use client';

import React from 'react';
import { BirthDataPayload } from '@/types/universario';
import { Calendar, Zap, Sparkles, Star } from 'lucide-react';
import { MemphisSquiggle, MemphisZigzag, MemphisTrianglePattern, MemphisCrosshatch, MemphisCoil } from '../MemphisDoodles';

interface SlideProps {
  data: BirthDataPayload;
}

export default function SlideIntro({ data }: SlideProps) {
  const displayName = data.name ? data.name : 'Você';

  return (
    <div className="slide-memphis-canvas slide-theme-intro">
      {/* Memphis Floating Geometric Shapes in Background */}
      <div style={{ position: 'absolute', top: '12%', right: '6%', transform: 'rotate(15deg)', pointerEvents: 'none' }} className="animate-float-1">
        <MemphisTrianglePattern size={52} fillColor="#ffe600" />
      </div>

      <div style={{ position: 'absolute', top: '25%', left: '4%', transform: 'rotate(-10deg)', pointerEvents: 'none' }} className="animate-float-2">
        <MemphisCrosshatch size={36} color="#111111" />
      </div>

      <div style={{ position: 'absolute', bottom: '26%', right: '5%', pointerEvents: 'none' }}>
        <MemphisSquiggle color="#ff2a85" width={56} height={16} />
      </div>

      <div style={{ position: 'absolute', bottom: '15%', left: '6%', transform: 'rotate(8deg)', pointerEvents: 'none' }}>
        <MemphisCoil color="#111111" width={42} height={16} />
      </div>

      {/* Top Memphis Header Banner */}
      <div style={{ zIndex: 2, textAlign: 'center' }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '5px 14px',
            borderRadius: '10px',
            background: '#ff2a85',
            border: '2.5px solid #111111',
            boxShadow: '3px 3px 0px #111111',
            fontSize: '0.78rem',
            fontFamily: 'var(--font-80s)',
            letterSpacing: '0.8px',
            color: '#ffffff',
            marginBottom: '8px',
            transform: 'rotate(-1deg)',
          }}
        >
          <Zap size={13} fill="#ffe600" color="#111111" />
          <span>NO DIA EM QUE {displayName.toUpperCase()} CHEGOU</span>
        </div>

        {/* Giant Memphis Typography Year */}
        <div style={{ position: 'relative', display: 'inline-block', margin: '2px 0' }}>
          <h1
            style={{
              fontSize: '4.4rem',
              fontWeight: 900,
              fontFamily: 'var(--font-80s)',
              lineHeight: 0.95,
              letterSpacing: '1.5px',
              color: '#ffe600',
              textShadow: '4px 4px 0px #111111, 7px 7px 0px #ff2a85',
              WebkitTextStroke: '2px #111111',
            }}
            className="text-chromatic"
          >
            {data.year}
          </h1>
        </div>

        <div
          style={{
            fontSize: '1.28rem',
            fontWeight: 900,
            fontFamily: 'var(--font-80s)',
            color: '#111111',
            letterSpacing: '0.5px',
            textShadow: '1px 1px 0px #00d2ff',
          }}
        >
          {data.dayOfMonth} DE {data.monthName.toUpperCase()}
        </div>

        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            fontFamily: 'var(--font-80s)',
            fontSize: '0.90rem',
            color: '#ff2a85',
            letterSpacing: '0.5px',
            background: '#ffffff',
            padding: '2px 10px',
            borderRadius: '6px',
            border: '1.5px solid #111111',
            boxShadow: '2px 2px 0px #111111',
            marginTop: '4px',
          }}
        >
          <Calendar size={13} color="#111111" />
          <span>{data.dayOfWeek.toUpperCase()}</span>
        </div>
      </div>

      {/* Center Memphis Polaroid Frame & Astrological Badge */}
      <div style={{ zIndex: 2, display: 'flex', flexDirection: 'column', gap: '10px', margin: '4px 0' }}>
        {/* Polaroid Astro Card */}
        <div
          style={{
            background: '#ffffff',
            borderRadius: '14px',
            padding: '12px 14px',
            boxShadow: '4px 4px 0px #111111, 8px 8px 0px #00d2ff',
            border: '3px solid #111111',
            position: 'relative',
            transform: 'rotate(-1deg)',
          }}
        >
          <div className="tape-strip tape-strip-yellow" style={{ top: '-10px', left: '35%' }} />

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '12px',
                  background: '#ff2a85',
                  border: '2.5px solid #111111',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.8rem',
                  boxShadow: '2.5px 2.5px 0px #111111',
                }}
              >
                {data.astronomy.zodiacSymbol}
              </div>
              <div>
                <div style={{ fontSize: '0.68rem', fontFamily: 'var(--font-80s)', color: '#9b51e0', letterSpacing: '0.5px' }}>
                  SIGNO SOLAR
                </div>
                <div style={{ fontSize: '1.18rem', fontWeight: 900, fontFamily: 'var(--font-80s)', color: '#111111' }}>
                  {data.astronomy.zodiacSign.toUpperCase()}
                </div>
              </div>
            </div>

            <div
              style={{
                padding: '5px 12px',
                borderRadius: '8px',
                background: '#ffe600',
                border: '2px solid #111111',
                color: '#111111',
                fontFamily: 'var(--font-80s)',
                fontSize: '0.78rem',
                boxShadow: '2.5px 2.5px 0px #111111',
              }}
            >
              {data.astronomy.zodiacElement.toUpperCase()}
            </div>
          </div>
        </div>

        {/* 2 Memphis Mini Badges (Chinese Zodiac & Sun Orbits) */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
          <div
            style={{
              padding: '10px 8px',
              textAlign: 'center',
              borderRadius: '14px',
              background: '#ffffff',
              border: '2.5px solid #111111',
              boxShadow: '3px 3px 0px #111111, 6px 6px 0px #ff2a85',
            }}
          >
            <div style={{ fontSize: '1.5rem', marginBottom: '1px' }}>
              {data.astronomy.chineseZodiacEmoji}
            </div>
            <div style={{ fontSize: '0.66rem', fontFamily: 'var(--font-80s)', color: '#ff2a85', letterSpacing: '0.5px' }}>
              ANO CHINÊS
            </div>
            <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#111111', fontFamily: 'var(--font-main)' }}>
              {data.astronomy.chineseZodiac}
            </div>
          </div>

          <div
            style={{
              padding: '10px 8px',
              textAlign: 'center',
              borderRadius: '14px',
              background: '#ffffff',
              border: '2.5px solid #111111',
              boxShadow: '3px 3px 0px #111111, 6px 6px 0px #00d2ff',
            }}
          >
            <div style={{ fontSize: '1.35rem', color: '#111111', fontWeight: 900, fontFamily: 'var(--font-80s)' }}>
              {data.stats.sunOrbits} ☀️
            </div>
            <div style={{ fontSize: '0.66rem', fontFamily: 'var(--font-80s)', color: '#00d2ff', letterSpacing: '0.5px' }}>
              VOLTAS NO SOL
            </div>
            <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#111111', fontFamily: 'var(--font-main)' }}>
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
            padding: '7px 16px',
            borderRadius: '10px',
            background: '#ffe600',
            border: '2.5px solid #111111',
            boxShadow: '3px 3px 0px #111111',
            fontFamily: 'var(--font-80s)',
            fontSize: '0.84rem',
            color: '#111111',
            letterSpacing: '0.5px',
          }}
        >
          ✦ {data.stats.generationName.toUpperCase()} ✦
        </div>
        <div style={{ fontFamily: 'var(--font-80s)', fontSize: '0.76rem', color: '#ff2a85', marginTop: '6px' }}>
          TOQUE PARA AVANÇAR ►►
        </div>
      </div>
    </div>
  );
}
