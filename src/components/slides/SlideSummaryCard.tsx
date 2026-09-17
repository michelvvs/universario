'use client';

import React from 'react';
import { BirthDataPayload } from '@/types/universario';
import { Sparkles, Award, Moon, Music, Film, CheckCircle, Zap } from 'lucide-react';

interface SlideProps {
  data: BirthDataPayload;
}

export default function SlideSummaryCard({ data }: SlideProps) {
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
        padding: '70px 20px 24px 20px',
        background: 'radial-gradient(circle at 50% 20%, #290847 0%, #130626 70%, #06010d 100%)',
        color: '#ffffff',
        overflow: 'hidden',
      }}
      className="slide-content-enter"
    >
      {/* Decorative Washi Tape on top */}
      <div className="tape-strip" style={{ top: '6px', left: '30%' }} />

      {/* Top Header */}
      <div style={{ textAlign: 'center', zIndex: 2 }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '3px 12px',
            borderRadius: '6px',
            background: '#ffde59',
            border: '1.5px solid #0d061c',
            boxShadow: '3px 3px 0px #ff2a85',
            fontSize: '0.74rem',
            fontFamily: 'var(--font-80s)',
            letterSpacing: '0.5px',
            color: '#0d061c',
            marginBottom: '6px',
          }}
        >
          <Award size={12} />
          <span>PASSAPORTE CÓSMICO VIP • 80s</span>
        </div>

        <h2
          style={{
            fontSize: '2.2rem',
            fontWeight: 900,
            fontFamily: 'var(--font-80s)',
            lineHeight: 1.1,
            marginBottom: '2px',
            color: '#ffffff',
          }}
          className="text-chromatic"
        >
          {displayName.toUpperCase()}
        </h2>

        <p style={{ fontSize: '0.85rem', fontFamily: 'var(--font-crt)', color: '#00f0ff', letterSpacing: '0.5px' }}>
          {data.formattedDate.toUpperCase()} • {data.dayOfWeek.toUpperCase()}
        </p>
      </div>

      {/* 80s VIP Passport Card */}
      <div
        style={{
          background: 'rgba(22, 8, 47, 0.95)',
          borderRadius: '16px',
          padding: '12px 14px',
          border: '2.5px solid #00f0ff',
          boxShadow: '5px 5px 0px #ff2a85, 9px 9px 0px #ffde59',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
        }}
      >
        {/* Row 1: Sign & Moon */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
          <div
            style={{
              padding: '8px 10px',
              borderRadius: '8px',
              background: '#0d061c',
              border: '1.5px solid #ff2a85',
            }}
          >
            <div style={{ fontSize: '0.62rem', fontFamily: 'var(--font-80s)', color: '#ff2a85', letterSpacing: '0.5px' }}>
              SIGNO SOLAR
            </div>
            <div style={{ fontSize: '0.90rem', fontWeight: 800, fontFamily: 'var(--font-80s)', color: '#ffffff', marginTop: '1px' }}>
              {data.astronomy.zodiacSymbol} {data.astronomy.zodiacSign.toUpperCase()}
            </div>
          </div>

          <div
            style={{
              padding: '8px 10px',
              borderRadius: '8px',
              background: '#0d061c',
              border: '1.5px solid #ffde59',
            }}
          >
            <div style={{ fontSize: '0.62rem', fontFamily: 'var(--font-80s)', color: '#ffde59', letterSpacing: '0.5px' }}>
              FASE DA LUA
            </div>
            <div style={{ fontSize: '0.85rem', fontWeight: 800, fontFamily: 'var(--font-80s)', color: '#ffffff', marginTop: '1px' }}>
              {data.astronomy.moonPhaseEmoji} {data.astronomy.moonPhaseName}
            </div>
          </div>
        </div>

        {/* Row 2: Top Music */}
        <div
          style={{
            padding: '8px 10px',
            borderRadius: '8px',
            background: '#0d061c',
            border: '1.5px solid #00f0ff',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          <Music size={16} color="#00f0ff" style={{ flexShrink: 0 }} />
          <div style={{ minWidth: 0 }}>
            <div style={{ fontSize: '0.62rem', fontFamily: 'var(--font-80s)', color: '#00f0ff', letterSpacing: '0.5px' }}>
              TRILHA DA ÉPOCA (#1)
            </div>
            <div
              style={{
                fontSize: '0.84rem',
                fontWeight: 700,
                color: '#ffffff',
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
            borderRadius: '8px',
            background: '#0d061c',
            border: '1.5px solid #ff2a85',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          <Film size={16} color="#ff2a85" style={{ flexShrink: 0 }} />
          <div style={{ minWidth: 0 }}>
            <div style={{ fontSize: '0.62rem', fontFamily: 'var(--font-80s)', color: '#ff2a85', letterSpacing: '0.5px' }}>
              FILME EM CARTAZ
            </div>
            <div
              style={{
                fontSize: '0.84rem',
                fontWeight: 700,
                color: '#ffffff',
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
            padding: '5px',
            fontSize: '0.74rem',
            fontWeight: 800,
            fontFamily: 'var(--font-80s)',
            color: '#26ffdf',
            letterSpacing: '0.5px',
          }}
        >
          ★ {data.stats.generationName.toUpperCase()} • {data.stats.daysAlive.toLocaleString('pt-BR')} DIAS VIVIDOS ★
        </div>
      </div>

      {/* Call to action footer / Watermark */}
      <div style={{ textAlign: 'center', zIndex: 2 }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '0.82rem',
            fontWeight: 800,
            fontFamily: 'var(--font-80s)',
            color: '#ffffff',
            letterSpacing: '0.8px',
          }}
        >
          <Zap size={14} fill="#ffde59" color="#ffde59" />
          <span className="text-chromatic">UNIVERSARIO.APP</span>
        </div>
        <div style={{ fontFamily: 'var(--font-crt)', fontSize: '0.80rem', color: '#ffde59', marginTop: '2px' }}>
          GERE SUA RETROSPECTIVA VINTAGE EM STORIES
        </div>
      </div>
    </div>
  );
}
