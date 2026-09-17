'use client';

import React from 'react';
import { BirthDataPayload } from '@/types/universario';
import { Film, Tv, Cpu, Clapperboard, Sparkles } from 'lucide-react';

interface SlideProps {
  data: BirthDataPayload;
}

export default function SlidePopCulture({ data }: SlideProps) {
  const { popCulture, year } = data;

  return (
    <div
      style={{
        position: 'relative',
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '75px 20px 26px 20px',
        background: 'radial-gradient(circle at 50% 20%, #2e0947 0%, #150527 70%, #080214 100%)',
        color: '#ffffff',
        overflow: 'hidden',
      }}
      className="slide-content-enter"
    >
      {/* Top Header */}
      <div style={{ textAlign: 'center', zIndex: 2 }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '3px 12px',
            borderRadius: '6px',
            background: '#ff2a85',
            border: '1.5px solid #ffffff',
            boxShadow: '3px 3px 0px #00f0ff',
            fontSize: '0.74rem',
            fontFamily: 'var(--font-80s)',
            letterSpacing: '0.5px',
            color: '#ffffff',
            marginBottom: '4px',
          }}
        >
          <Clapperboard size={12} />
          <span>CINEMA & TELAS 80s</span>
        </div>

        <h2
          style={{
            fontSize: '2.0rem',
            fontWeight: 800,
            fontFamily: 'var(--font-80s)',
            lineHeight: 1.1,
            marginBottom: '2px',
            color: '#ffffff',
          }}
          className="text-chromatic"
        >
          CULTURA POP & CINEMA
        </h2>

        <p style={{ fontSize: '0.78rem', fontFamily: 'var(--font-crt)', color: '#ffde59', letterSpacing: '0.5px' }}>
          O QUE DOMINAVA AS TELAS E LOCADORAS EM {year}
        </p>
      </div>

      {/* 80s Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '9px', zIndex: 2, margin: '4px 0' }}>
        {/* Cinema Champion Card */}
        <div
          className="memphis-card-pink"
          style={{
            padding: '10px 12px',
            borderRadius: '12px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Film size={13} color="#ffde59" />
              <span style={{ fontSize: '0.70rem', fontWeight: 800, fontFamily: 'var(--font-80s)', color: '#ffde59', letterSpacing: '0.5px' }}>
                BLOCKBUSTER EM CARTAZ
              </span>
            </div>
            <span style={{ fontFamily: 'var(--font-crt)', fontSize: '0.80rem', color: '#00f0ff' }}>
              BILHETERIA #1
            </span>
          </div>

          <div style={{ fontSize: '0.98rem', fontWeight: 800, fontFamily: 'var(--font-80s)', color: '#ffffff' }}>
            {popCulture.topMovie.title}
          </div>
          <div style={{ fontSize: '0.72rem', color: '#cbd5e1', marginTop: '1px' }}>
            Dirigido por {popCulture.topMovie.director}
          </div>
          <div style={{ fontSize: '0.72rem', color: '#ffde59', marginTop: '3px', lineHeight: 1.3 }}>
            ✦ {popCulture.topMovie.funFact}
          </div>
        </div>

        {/* TV & Brazilian Culture (VHS Tape Aesthetic) */}
        <div
          className="memphis-card-cyan"
          style={{
            padding: '10px 12px',
            borderRadius: '12px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
            <Tv size={13} color="#00f0ff" />
            <span style={{ fontSize: '0.70rem', fontWeight: 800, fontFamily: 'var(--font-80s)', color: '#00f0ff', letterSpacing: '0.5px' }}>
              NA TV BRASILEIRA
            </span>
          </div>
          <div style={{ fontSize: '0.78rem', color: '#f1f5f9', lineHeight: 1.35 }}>
            {popCulture.topBrazilianTVOrCulture}
          </div>
        </div>

        {/* Tech Milestone */}
        <div
          className="memphis-card-yellow"
          style={{
            padding: '10px 12px',
            borderRadius: '12px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
            <Cpu size={13} color="#ffde59" />
            <span style={{ fontSize: '0.70rem', fontWeight: 800, fontFamily: 'var(--font-80s)', color: '#ffde59', letterSpacing: '0.5px' }}>
              MARCO TECNOLÓGICO 80s
            </span>
          </div>
          <div style={{ fontSize: '0.78rem', color: '#f1f5f9', lineHeight: 1.35 }}>
            {popCulture.techMilestone}
          </div>
        </div>
      </div>

      {/* Nostalgia Chips / 80s Stickers */}
      <div style={{ zIndex: 2, textAlign: 'center' }}>
        <div style={{ fontSize: '0.70rem', fontFamily: 'var(--font-80s)', color: '#26ffdf', marginBottom: '6px', letterSpacing: '0.5px' }}>
          ★ ÍCONES DE NOSTALGIA DA ÉPOCA ★
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', justifyContent: 'center' }}>
          {(popCulture.nostalgiaItems || []).map((item: string, idx: number) => (
            <span
              key={idx}
              style={{
                padding: '4px 10px',
                borderRadius: '6px',
                background: idx % 2 === 0 ? '#ff2a85' : '#00f0ff',
                color: idx % 2 === 0 ? '#ffffff' : '#0d061c',
                border: '1.5px solid #ffffff',
                boxShadow: '2px 2px 0px #ffde59',
                fontSize: '0.72rem',
                fontFamily: 'var(--font-80s)',
                letterSpacing: '0.3px',
              }}
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
