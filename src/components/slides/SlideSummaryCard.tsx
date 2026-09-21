'use client';

import React from 'react';
import { BirthDataPayload } from '@/types/universario';
import { Award, Music, Film, Zap, Star, Moon, Sparkles, CheckCircle2 } from 'lucide-react';
import { VcrOsdBadge, ScotchTape, DymoLabel, SharpieLabel, VhsGoldSeal, VhsRainbowBand } from '../VhsGraphics';

interface SlideProps {
  data: BirthDataPayload;
}

export default function SlideSummaryCard({ data }: SlideProps) {
  const displayName = data.name ? data.name : 'VOCÊ';

  return (
    <div className="slide-vhs-canvas slide-theme-summary">
      {/* Top Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', zIndex: 3 }}>
        <VcrOsdBadge text="RESUMO FINAL" variant="rec" />
        <span
          style={{
            fontFamily: 'var(--font-vcr)',
            color: '#ffe600',
            fontSize: 'clamp(0.72rem, 2.1vw, 0.85rem)',
            letterSpacing: '1.5px',
            fontWeight: 'bold',
          }}
        >
          PASSAPORTE VIP • {data.year}
        </span>
        <VcrOsdBadge text="COMPLETO" variant="sp" />
      </div>

      {/* Deluxe Gold Master Header Strip */}
      <div
        style={{
          width: '100%',
          background: 'linear-gradient(90deg, #d4af37 0%, #fff2a1 35%, #ffd700 65%, #aa820a 100%)',
          padding: 'clamp(4px, 1vh, 6px) clamp(8px, 2vw, 12px)',
          borderRadius: '4px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          boxShadow: '0 4px 14px rgba(212, 175, 55, 0.4), 0 2px 6px rgba(0,0,0,0.8)',
          zIndex: 2,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Award size={16} color="#111111" />
          <span
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(0.72rem, 2.2vw, 0.84rem)',
              color: '#111111',
              letterSpacing: '1px',
              textTransform: 'uppercase',
              fontWeight: 900,
            }}
          >
            CERTIFICADO DE ORIGEM CÓSMICA
          </span>
        </div>
        <span
          style={{
            fontFamily: 'var(--font-vcr)',
            color: '#111111',
            fontSize: 'clamp(0.64rem, 1.8vw, 0.72rem)',
            fontWeight: 'bold',
          }}
        >
          VIP PASSPORT
        </span>
      </div>

      {/* Name and Date Section */}
      <div style={{ textAlign: 'center', zIndex: 2, width: '100%' }}>
        <h2
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(1.4rem, 5vw, 2.0rem)',
            color: '#ffffff',
            lineHeight: 1.05,
            textShadow: '0 3px 12px rgba(0,0,0,0.9), 0 0 16px rgba(255, 215, 0, 0.4)',
            letterSpacing: '0.8px',
            textTransform: 'uppercase',
          }}
        >
          {displayName}
        </h2>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', marginTop: '3px', flexWrap: 'wrap' }}>
          <DymoLabel text={data.formattedDate} color="red" />
          <DymoLabel text={data.dayOfWeek} color="blue" />
        </div>
      </div>

      {/* Collector's J-Card / Photo-Collage Passport */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          background: 'linear-gradient(135deg, #1c2230 0%, #10141f 100%)',
          borderRadius: '6px',
          border: '2px solid rgba(255, 215, 0, 0.5)',
          padding: 'clamp(8px, 1.6vh, 12px) clamp(10px, 2.5vw, 14px)',
          boxShadow: '0 10px 28px rgba(0,0,0,0.8), inset 0 0 20px rgba(0,0,0,0.7)',
          display: 'flex',
          flexDirection: 'column',
          gap: 'clamp(5px, 1.2vh, 8px)',
          zIndex: 2,
        }}
      >
        {/* Corner Scotch Tapes */}
        <ScotchTape angle={-15} width={42} style={{ top: '-8px', left: '12px' }} />
        <ScotchTape angle={15} width={42} style={{ top: '-8px', right: '12px' }} />

        {/* Row 1: Sign & Moon */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(6px, 1.5vw, 8px)' }}>
          {/* Sign */}
          <div
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 215, 0, 0.3)',
              borderRadius: '4px',
              padding: 'clamp(5px, 1vh, 7px)',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-vcr)',
                fontSize: 'clamp(0.58rem, 1.5vw, 0.66rem)',
                color: '#ffe600',
                letterSpacing: '0.5px',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              <Star size={11} color="#ffe600" />
              <span>SIGNO SOLAR</span>
            </div>
            <div
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(0.82rem, 2.4vw, 0.96rem)',
                color: '#ffffff',
                marginTop: '1px',
              }}
            >
              {data.astronomy.zodiacSymbol} {data.astronomy.zodiacSign.toUpperCase()}
            </div>
          </div>

          {/* Moon */}
          <div
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(0, 210, 255, 0.3)',
              borderRadius: '4px',
              padding: 'clamp(5px, 1vh, 7px)',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-vcr)',
                fontSize: 'clamp(0.58rem, 1.5vw, 0.66rem)',
                color: '#00d2ff',
                letterSpacing: '0.5px',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              <Moon size={11} color="#00d2ff" />
              <span>LUA NO CÉU</span>
            </div>
            <div
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(0.78rem, 2.2vw, 0.90rem)',
                color: '#ffffff',
                marginTop: '1px',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {data.astronomy.moonPhaseEmoji} {data.astronomy.moonPhaseName}
            </div>
          </div>
        </div>

        {/* Row 2: Top Music Track */}
        <div
          style={{
            background: 'rgba(255, 42, 133, 0.08)',
            border: '1px solid rgba(255, 42, 133, 0.35)',
            borderRadius: '4px',
            padding: 'clamp(5px, 1vh, 7px) clamp(8px, 2vw, 10px)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <div
            style={{
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              background: '#ff2a85',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <Music size={13} color="#ffffff" />
          </div>
          <div style={{ minWidth: 0, flex: 1 }}>
            <div
              style={{
                fontFamily: 'var(--font-vcr)',
                fontSize: 'clamp(0.56rem, 1.5vw, 0.64rem)',
                color: '#ff2a85',
                letterSpacing: '0.5px',
              }}
            >
              TRILHA SONORA #1 DA ÉPOCA
            </div>
            <div
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(0.74rem, 2.2vw, 0.86rem)',
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
            background: 'rgba(0, 210, 255, 0.08)',
            border: '1px solid rgba(0, 210, 255, 0.35)',
            borderRadius: '4px',
            padding: 'clamp(5px, 1vh, 7px) clamp(8px, 2vw, 10px)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <div
            style={{
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              background: '#00d2ff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <Film size={13} color="#111111" />
          </div>
          <div style={{ minWidth: 0, flex: 1 }}>
            <div
              style={{
                fontFamily: 'var(--font-vcr)',
                fontSize: 'clamp(0.56rem, 1.5vw, 0.64rem)',
                color: '#00d2ff',
                letterSpacing: '0.5px',
              }}
            >
              FILME CAMPEÃO DE BILHETERIA
            </div>
            <div
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(0.74rem, 2.2vw, 0.86rem)',
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
            background: 'linear-gradient(90deg, #111111 0%, #1f2533 100%)',
            border: '1px solid #ffe600',
            borderRadius: '4px',
            padding: 'clamp(4px, 0.9vh, 6px)',
            textAlign: 'center',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-vcr)',
              fontSize: 'clamp(0.64rem, 1.8vw, 0.74rem)',
              color: '#ffe600',
              letterSpacing: '1px',
              fontWeight: 'bold',
            }}
          >
            ★ {data.stats.generationName.toUpperCase()} • {data.stats.daysAlive.toLocaleString('pt-BR')} DIAS VIVIDOS ★
          </span>
        </div>
      </div>

      {/* Barcode & Share Watermark Footer */}
      <div
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '4px',
          zIndex: 2,
        }}
      >
        {/* Retro Barcode graphic */}
        <div
          style={{
            background: '#ffffff',
            padding: '3px 14px 2px 14px',
            borderRadius: '2px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            boxShadow: '0 2px 8px rgba(0,0,0,0.6)',
          }}
        >
          {/* Barcode lines */}
          <div
            style={{
              display: 'flex',
              height: '16px',
              alignItems: 'stretch',
              gap: '2px',
            }}
          >
            {[3, 1, 2, 4, 1, 3, 2, 1, 4, 2, 1, 3, 1, 2, 4, 1, 3, 2, 1, 3, 2].map((w, i) => (
              <div
                key={i}
                style={{
                  width: `${w}px`,
                  background: i % 2 === 0 ? '#000000' : 'transparent',
                }}
              />
            ))}
          </div>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.50rem',
              color: '#000000',
              letterSpacing: '2px',
              fontWeight: 'bold',
            }}
          >
            UNIVERSARIO-VHS-{data.year}
          </span>
        </div>

        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '5px',
            fontSize: 'clamp(0.68rem, 2.0vw, 0.80rem)',
            fontFamily: 'var(--font-heading)',
            color: '#ffe600',
            letterSpacing: '1px',
          }}
        >
          <Zap size={13} fill="#ffe600" color="#ffe600" />
          <span>UNIVERSARIO.APP • TAPE E-180 MASTER</span>
        </div>

        {/* Bottom Rainbow Finish */}
        <VhsRainbowBand height={6} />
      </div>
    </div>
  );
}
