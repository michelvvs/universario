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
          UNIVERSÁRIO • EDIÇÃO ESPECIAL
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
        <div className="story-anim-header" style={{ position: 'relative', zIndex: 6, display: 'inline-block' }}>
          <h1
            style={{
              fontSize: 'clamp(3.8rem, 16cqw, 5.2rem)',
              fontWeight: 900,
              fontFamily: 'var(--font-maximalist)',
              lineHeight: 0.85,
              letterSpacing: '-2px',
              color: '#0c0d11',
              textTransform: 'uppercase',
              textShadow: '0 3px 10px rgba(0, 0, 0, 0.12)',
              margin: '0 auto',
            }}
          >
            {data.year}
          </h1>
        </div>
      </div>

      {/* Central Interactive Artifact: Extra-Large Polaroid Card + Radiant Retro Sunburst & Framing */}
      <div
        className="story-anim-polaroid"
        style={{
          position: 'relative',
          zIndex: 9,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          margin: 'clamp(14px, 3.5cqh, 24px) 0 clamp(8px, 1.8cqh, 14px)',
        }}
      >
        {/* Retro Radiant Sunburst & Starburst Accents behind Polaroid */}
        <svg
          viewBox="0 0 320 240"
          style={{
            position: 'absolute',
            width: 'clamp(260px, 82cqw, 340px)',
            height: 'clamp(200px, 60cqw, 260px)',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none',
            zIndex: 3,
            opacity: 0.85,
          }}
        >
          {/* Subtle Geometric Corner Framing Brackets */}
          <path d="M 35 45 L 20 45 L 20 60" stroke="#0c0d11" strokeWidth="2.5" fill="none" />
          <path d="M 285 45 L 300 45 L 300 60" stroke="#0c0d11" strokeWidth="2.5" fill="none" />
          <path d="M 35 195 L 20 195 L 20 180" stroke="#0c0d11" strokeWidth="2.5" fill="none" />
          <path d="M 285 195 L 300 195 L 300 180" stroke="#0c0d11" strokeWidth="2.5" fill="none" />

          {/* Retro Holographic Starburst Rays */}
          <g transform="translate(160, 120)">
            <line x1="-135" y1="0" x2="-105" y2="0" stroke="var(--acid-chartreuse)" strokeWidth="2" strokeDasharray="3 3" />
            <line x1="105" y1="0" x2="135" y2="0" stroke="var(--acid-chartreuse)" strokeWidth="2" strokeDasharray="3 3" />
            <line x1="0" y1="-85" x2="0" y2="-65" stroke="#ff0077" strokeWidth="2" strokeDasharray="3 3" />
            <line x1="0" y1="65" x2="0" y2="85" stroke="#ff0077" strokeWidth="2" strokeDasharray="3 3" />
            {/* 4-point Diamond Sparkles */}
            <path d="M -90 -60 Q -90 -55 -85 -55 Q -90 -55 -90 -50 Q -90 -55 -95 -55 Q -90 -55 -90 -60 Z" fill="#ffd700" />
            <path d="M 90 -60 Q 90 -55 95 -55 Q 90 -55 90 -50 Q 90 -55 85 -55 Q 90 -55 90 -60 Z" fill="#0038ff" />
            <path d="M -90 60 Q -90 65 -85 65 Q -90 65 -90 70 Q -90 65 -95 65 Q -90 65 -90 60 Z" fill="#ff0077" />
            <path d="M 90 60 Q 90 65 95 65 Q 90 65 90 70 Q 90 65 85 65 Q 90 65 90 60 Z" fill="var(--acid-chartreuse)" />
          </g>
        </svg>

        {/* Editorial Micro-quote on the left side of polaroid */}
        <div
          style={{
            position: 'absolute',
            left: '4px',
            top: '28%',
            width: 'clamp(48px, 14cqw, 62px)',
            fontFamily: 'var(--font-mono)',
            fontSize: 'clamp(0.42rem, 1.3cqw, 0.50rem)',
            color: '#0c0d11',
            lineHeight: 1.2,
            pointerEvents: 'none',
            zIndex: 8,
          }}
        >
          O universo registrava sua chegada.
        </div>

        {/* Polaroid Instant Photo Card (Grandona / Extra-Large) */}
        <PolaroidCard
          year={data.year}
          name={data.name}
          gender={data.gender}
          userPhotoUrl={data.userPhotoUrl}
          rotation={-1.5}
          width="clamp(165px, 48cqw, 205px)"
        />
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
          className="acid-card-paper story-anim-card-1"
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
        <div className="story-anim-card-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(4px, 1.2cqw, 6px)' }}>
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
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--acid-chartreuse)', border: '1px solid #0c0d11' }} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(0.52rem, 1.7cqw, 0.62rem)', color: '#0c0d11', letterSpacing: '1px', fontWeight: 900 }}>
              UNIVERSÁRIO
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
