'use client';

import React from 'react';
import { BirthDataPayload } from '@/types/universario';
import { getWhenBornPhrase } from '@/lib/grammatical-gender';
import StoryHeader from '../StoryHeader';
import PolaroidCard from '../PolaroidCard';

interface SlideProps {
  data: BirthDataPayload;
}

export default function SlideIntro({ data }: SlideProps) {
  const displayName = data.name ? data.name : 'Você';

  return (
    <div
      className="acid-editorial-canvas"
      style={{
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        gap: 'clamp(3px, 1.1cqh, 6px)',
        padding: 'clamp(20px, 4.5cqh, 25px) clamp(10px, 3cqw, 15px) clamp(6px, 1.5cqh, 10px) clamp(10px, 3cqw, 15px)',
        height: '100%',
        width: '100%',
        boxSizing: 'border-box',
        backgroundColor: '#f4f3ed',
        color: '#0c0d11',
      }}
    >
      {/* Authentic Editorial Grain & Micro-Grid Texture */}
      <div className="acid-grain-overlay" />

      {/* Top Margin Technical Headers (Inspired by Reference 2 - Made by WEEP / 1710-2025) */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          pointerEvents: 'none',
          zIndex: 4,
          padding: '0 2px',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'clamp(0.52rem, 1.8cqw, 0.62rem)',
            fontWeight: 900,
            letterSpacing: '1px',
            color: '#0c0d11',
            textTransform: 'uppercase',
          }}
        >
          Made by UNIVERSÁRIO • 9:16
        </span>

        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'clamp(0.52rem, 1.8cqw, 0.62rem)',
            fontWeight: 900,
            letterSpacing: '1px',
            color: '#0c0d11',
            textTransform: 'uppercase',
          }}
        >
          ARCHIVE // 1710 — 2025
        </span>
      </div>

      {/* Top Story Header Badge */}
      <div style={{ position: 'relative', zIndex: 10 }}>
        <StoryHeader data={data} />
      </div>

      {/* Slanted Warning Stripe Bars on Left and Right Margins (Directly from Ref 2 - BLUBBY) */}
      <div
        style={{
          position: 'absolute',
          top: '24%',
          left: '7px',
          width: '7px',
          height: '42px',
          background: 'repeating-linear-gradient(45deg, #0c0d11, #0c0d11 3px, transparent 3px, transparent 8px)',
          zIndex: 5,
          opacity: 0.9,
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: '49%',
          right: '7px',
          width: '7px',
          height: '42px',
          background: 'repeating-linear-gradient(-45deg, #0c0d11, #0c0d11 3px, transparent 3px, transparent 8px)',
          zIndex: 5,
          opacity: 0.9,
        }}
      />

      {/* Vertical Margin Barcode & Coordinates (From Ref 2) */}
      <div
        style={{
          position: 'absolute',
          bottom: '22%',
          left: '6px',
          transform: 'rotate(-90deg) translateX(0%)',
          transformOrigin: 'left bottom',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          pointerEvents: 'none',
          zIndex: 5,
        }}
      >
        <div className="acid-barcode" style={{ height: '9px', color: '#0c0d11' }}>
          <span /><span /><span /><span /><span /><span />
        </div>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.48rem', fontWeight: 900, color: '#0c0d11', letterSpacing: '0.8px' }}>
          87 896 5663 // ARCHIVE
        </span>
      </div>

      {/* Center Hero: Giant Maximalist Year with Explosive Thermal Heat-Map Aura */}
      <div
        style={{
          position: 'relative',
          zIndex: 8,
          textAlign: 'center',
          margin: '1px 0',
        }}
      >
        {/* Large Radiant Thermal Heat Map Aura (Inspired by Reference 2 & 3) */}
        <div
          className="acid-thermal-aura"
          style={{
            width: 'clamp(240px, 78cqw, 320px)',
            height: 'clamp(160px, 48cqw, 210px)',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />

        {/* Sub-tag phrase with Chartreuse pill */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            marginBottom: '2px',
            position: 'relative',
            zIndex: 6,
            background: 'var(--acid-chartreuse)',
            border: '2px solid #0c0d11',
            padding: '2px 8px',
            boxShadow: '2px 2px 0px #0c0d11',
            borderRadius: '2px',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'clamp(0.64rem, 2.1cqw, 0.76rem)',
              color: '#0c0d11',
              fontWeight: 900,
              letterSpacing: '0.8px',
              textTransform: 'uppercase',
            }}
          >
            ★ ORIGIN // {getWhenBornPhrase(data.name, data.gender).toUpperCase()}
          </span>
        </div>

        {/* GIGANTIC Maximalist Year Headline (Dominating and impactful!) */}
        <div style={{ position: 'relative', zIndex: 6, display: 'inline-block' }}>
          <h1
            style={{
              fontSize: 'clamp(4.2rem, 18cqw, 5.6rem)',
              fontWeight: 900,
              fontFamily: 'var(--font-maximalist)',
              lineHeight: 0.82,
              letterSpacing: '-2px',
              color: '#0c0d11',
              textTransform: 'uppercase',
              textShadow: '0 3px 10px rgba(0, 0, 0, 0.12)',
              margin: '0 auto',
            }}
          >
            {data.year}
          </h1>

          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'clamp(0.60rem, 2.0cqw, 0.72rem)',
              color: '#0c0d11',
              fontWeight: 900,
              letterSpacing: '1.5px',
              marginTop: '2px',
              textTransform: 'uppercase',
            }}
          >
            [ REBOBINANDO O TEMPO EM 9:16 ]
          </div>
        </div>
      </div>

      {/* Central Interactive Artifact: Polaroid Card + Orbital Wireframe Rings */}
      <div
        style={{
          position: 'relative',
          zIndex: 9,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          margin: 'clamp(20px, 4.5cqh, 32px) 0 clamp(8px, 1.8cqh, 14px)',
        }}
      >
        {/* Wireframe Orbital Ellipse Rings (Directly from Ref 2 - BLUBBY) */}
        <svg
          viewBox="0 0 320 180"
          style={{
            position: 'absolute',
            width: 'clamp(250px, 78cqw, 320px)',
            height: 'clamp(135px, 44cqw, 180px)',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%) rotate(-6deg)',
            pointerEvents: 'none',
            zIndex: 4,
            opacity: 0.90,
          }}
        >
          <ellipse cx="160" cy="90" rx="145" ry="38" fill="none" stroke="#0c0d11" strokeWidth="1.5" strokeDasharray="6 4" />
          <ellipse cx="160" cy="90" rx="128" ry="32" fill="none" stroke="#ff0077" strokeWidth="1.6" />
          <ellipse cx="160" cy="90" rx="112" ry="26" fill="none" stroke="#0038ff" strokeWidth="1.5" strokeDasharray="4 3" />
        </svg>

        {/* Editorial Micro-quote on the left side of polaroid (From Ref 2) */}
        <div
          style={{
            position: 'absolute',
            left: '4px',
            top: '30%',
            width: 'clamp(54px, 17cqw, 72px)',
            fontFamily: 'var(--font-mono)',
            fontSize: 'clamp(0.44rem, 1.4cqw, 0.52rem)',
            color: '#0c0d11',
            lineHeight: 1.2,
            pointerEvents: 'none',
            zIndex: 8,
          }}
        >
          <span style={{ fontWeight: 900, color: '#ff0077' }}>[ ARCHIVE ]</span>
          <br />
          O universo registrava a sua chegada em fita master.
        </div>

        {/* Polaroid Instant Photo Card */}
        <PolaroidCard
          year={data.year}
          name={data.name}
          gender={data.gender}
          userPhotoUrl={data.userPhotoUrl}
          rotation={-2}
          width="clamp(112px, 32cqw, 132px)"
        />

        {/* Right side technical coordinate badge */}
        <div
          style={{
            position: 'absolute',
            right: '4px',
            top: '34%',
            fontFamily: 'var(--font-mono)',
            fontSize: 'clamp(0.44rem, 1.4cqw, 0.52rem)',
            color: '#0c0d11',
            textAlign: 'right',
            pointerEvents: 'none',
            zIndex: 8,
            lineHeight: 1.2,
          }}
        >
          <span style={{ fontWeight: 900, color: '#0038ff' }}>[ SPEC 9:16 ]</span>
          <br />
          VOL. 01 // HD
          <br />
          TRACKING [OK]
        </div>
      </div>

      {/* Bottom Editorial Content Section */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          gap: 'clamp(4px, 1.1cqh, 6px)',
        }}
      >
        {/* Date Card - Crisp White Paper Poster Style */}
        <div
          className="acid-card-paper"
          style={{
            padding: 'clamp(5px, 1.4cqw, 8px) clamp(8px, 2.2cqw, 12px)',
            borderRadius: '2px',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1px' }}>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'clamp(0.54rem, 1.8cqw, 0.64rem)',
                fontWeight: 900,
                color: '#ff0077',
                letterSpacing: '1px',
                textTransform: 'uppercase',
              }}
            >
              ★ REGISTRO HISTÓRICO // DATA EXATA
            </span>
            <div className="acid-barcode" style={{ color: '#0c0d11', height: '10px' }}>
              <span /><span /><span /><span /><span />
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
            <div
              style={{
                fontSize: 'clamp(1.2rem, 4.4cqw, 1.65rem)',
                fontWeight: 900,
                fontFamily: 'var(--font-maximalist)',
                color: '#0c0d11',
                letterSpacing: '-0.5px',
                lineHeight: 1,
              }}
            >
              {data.dayOfMonth} DE {data.monthName.toUpperCase()}
            </div>

            <span
              className="acid-tag acid-tag-lime"
              style={{
                fontSize: 'clamp(0.62rem, 2cqw, 0.74rem)',
                padding: '1px 6px',
                fontWeight: 900,
              }}
            >
              {data.dayOfWeek}
            </span>
          </div>
        </div>

        {/* Dual Technical Cards: Zodiac & Chinese Year */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(4px, 1.2cqw, 6px)' }}>
          {/* Signo Solar */}
          <div
            className="acid-card-paper"
            style={{
              padding: 'clamp(4px, 1.3cqw, 7px)',
              borderRadius: '2px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '1px' }}>
              <span style={{ fontSize: 'clamp(1.1rem, 3.4cqw, 1.35rem)', lineHeight: 1 }}>{data.astronomy.zodiacSymbol}</span>
              <div>
                <div style={{ fontSize: 'clamp(0.48rem, 1.5cqw, 0.56rem)', fontFamily: 'var(--font-mono)', color: '#ff5500', letterSpacing: '0.5px', fontWeight: 900 }}>
                  SIGNO SOLAR
                </div>
                <div style={{ fontSize: 'clamp(0.85rem, 3.0cqw, 1.1rem)', fontWeight: 900, fontFamily: 'var(--font-maximalist)', color: '#0c0d11', lineHeight: 1 }}>
                  {data.astronomy.zodiacSign.toUpperCase()}
                </div>
              </div>
            </div>
            <div style={{ fontSize: 'clamp(0.50rem, 1.6cqw, 0.58rem)', color: '#0c0d11', fontFamily: 'var(--font-mono)', fontWeight: 800 }}>
              ELEMENTO: {data.astronomy.zodiacElement.toUpperCase()}
            </div>
          </div>

          {/* Ano Chinês & Voltas no Sol */}
          <div
            className="acid-card-paper"
            style={{
              padding: 'clamp(4px, 1.3cqw, 7px)',
              borderRadius: '2px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '1px' }}>
              <span style={{ fontSize: 'clamp(1.1rem, 3.4cqw, 1.35rem)', lineHeight: 1 }}>{data.astronomy.chineseZodiacEmoji}</span>
              <div>
                <div style={{ fontSize: 'clamp(0.48rem, 1.5cqw, 0.56rem)', fontFamily: 'var(--font-mono)', color: '#0038ff', letterSpacing: '0.5px', fontWeight: 900 }}>
                  ANO CHINÊS
                </div>
                <div style={{ fontSize: 'clamp(0.85rem, 3.0cqw, 1.1rem)', fontWeight: 900, fontFamily: 'var(--font-maximalist)', color: '#0c0d11', lineHeight: 1 }}>
                  {data.astronomy.chineseZodiac.toUpperCase()}
                </div>
              </div>
            </div>
            <div style={{ fontSize: 'clamp(0.50rem, 1.6cqw, 0.58rem)', color: '#0c0d11', fontFamily: 'var(--font-mono)', fontWeight: 900 }}>
              ★ {data.stats.sunOrbits} VOLTAS NO SOL
            </div>
          </div>
        </div>

        {/* Bottom Editorial Footer Bar with Neon Line */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '2px 2px 0 2px',
            borderTop: '1px solid rgba(12, 13, 17, 0.25)',
          }}
        >
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(0.52rem, 1.7cqw, 0.62rem)', color: '#0c0d11', letterSpacing: '0.5px', fontWeight: 900 }}>
            [ GERAÇÃO: {data.stats.generationName.toUpperCase()} ]
          </span>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'var(--acid-chartreuse)', border: '1px solid #0c0d11' }} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(0.52rem, 1.7cqw, 0.62rem)', color: '#0c0d11', letterSpacing: '1px', fontWeight: 900 }}>
              TYPE 01 // 9:16 HD
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
