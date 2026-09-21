'use client';

import React from 'react';
import { BirthDataPayload } from '@/types/universario';
import { getWhenBornPhrase } from '@/lib/grammatical-gender';
import { Orbit, Heart, Wind, Users2, Activity, Gauge } from 'lucide-react';
import { VcrOsdBadge, DymoLabel, VcrVuMeter, CollageCutout, ScotchTape, VhsRainbowBand } from '../VhsGraphics';

interface SlideProps {
  data: BirthDataPayload;
}

export default function SlideCosmicStats({ data }: SlideProps) {
  const { stats } = data;

  return (
    <div className="slide-vhs-canvas slide-theme-stats" style={{ position: 'relative' }}>
      {/* Astrolabe & Stopwatch Collage Cutout Overlaid in top banner margin, outside stats text */}
      <CollageCutout
        src="/cutouts/astrolabe_cutout.jpg"
        alt="Cronômetro analógico e bússola cósmica"
        size={78}
        rotate={10}
        style={{
          top: '14%',
          right: '-6px',
          zIndex: 20,
          pointerEvents: 'none',
        }}
      />
      <ScotchTape width={36} height={12} rotate={12} style={{ top: '13.5%', right: '14px', zIndex: 21 }} />

      {/* Cosmic Stats Main Header: Synthesized & Clean */}
      <div style={{ textAlign: 'center', zIndex: 2, marginBottom: '6px' }}>
        <h2
          style={{
            fontSize: 'clamp(1.2rem, 4.2vw, 1.55rem)',
            fontWeight: 900,
            fontFamily: "'Archivo Black', sans-serif",
            color: '#ffffff',
            lineHeight: 1.1,
            letterSpacing: '0.8px',
            textShadow: '0 2px 6px rgba(0,0,0,0.9), 0 0 12px rgba(0, 255, 204, 0.35)',
            textTransform: 'uppercase',
            margin: 0,
          }}
        >
          ODÔMETRO CÓSMICO
        </h2>
        <div
          style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: 'clamp(0.68rem, 2vw, 0.76rem)',
            color: 'var(--vhs-cyan)',
            letterSpacing: '0.5px',
            marginTop: '3px',
            fontWeight: 700,
          }}
        >
          SEUS NÚMEROS DESDE QUE {getWhenBornPhrase(data.name, data.gender).toUpperCase()}
        </div>
      </div>

      {/* VCR Diagnostic Panel - Glowing Vacuum Fluorescent Display */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 'clamp(5px, 1.2vh, 7px)',
          width: '100%',
          zIndex: 2,
        }}
      >
        {/* Heartbeats Counter */}
        <div
          style={{
            background: 'linear-gradient(135deg, #0d161a 0%, #060b0e 100%)',
            border: '2px solid rgba(255, 42, 133, 0.4)',
            borderRadius: '6px',
            padding: 'clamp(6px, 1.3vh, 9px)',
            boxShadow: 'inset 0 0 14px rgba(0,0,0,0.9), 0 4px 14px rgba(0,0,0,0.6)',
            textAlign: 'center',
            position: 'relative',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '4px', marginBottom: '2px' }}>
            <Heart size={14} color="#ff2a85" fill="#ff2a85" />
            <span
              style={{
                fontFamily: 'var(--font-vcr)',
                fontSize: 'clamp(0.60rem, 1.6vw, 0.68rem)',
                color: '#ff2a85',
                letterSpacing: '1px',
              }}
            >
              PULSO TOTAL
            </span>
          </div>

          <div
            style={{
              fontFamily: 'var(--font-vcr)',
              fontSize: 'clamp(1.05rem, 3.4vw, 1.35rem)',
              color: '#ffffff',
              letterSpacing: '1px',
              textShadow: '0 0 8px rgba(255, 42, 133, 0.6)',
              fontWeight: 'bold',
            }}
          >
            ~{stats.heartbeatsEstimated}
          </div>

          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'clamp(0.56rem, 1.5vw, 0.64rem)',
              color: '#8b9bb4',
              textTransform: 'uppercase',
              marginTop: '2px',
            }}
          >
            Batimentos Cardíacos
          </div>
        </div>

        {/* Breaths Counter */}
        <div
          style={{
            background: 'linear-gradient(135deg, #0d161a 0%, #060b0e 100%)',
            border: '2px solid rgba(0, 210, 255, 0.4)',
            borderRadius: '6px',
            padding: 'clamp(6px, 1.3vh, 9px)',
            boxShadow: 'inset 0 0 14px rgba(0,0,0,0.9), 0 4px 14px rgba(0,0,0,0.6)',
            textAlign: 'center',
            position: 'relative',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '4px', marginBottom: '2px' }}>
            <Wind size={14} color="#00d2ff" />
            <span
              style={{
                fontFamily: 'var(--font-vcr)',
                fontSize: 'clamp(0.60rem, 1.6vw, 0.68rem)',
                color: '#00d2ff',
                letterSpacing: '1px',
              }}
            >
              CICLOS DE AR
            </span>
          </div>

          <div
            style={{
              fontFamily: 'var(--font-vcr)',
              fontSize: 'clamp(1.05rem, 3.4vw, 1.35rem)',
              color: '#ffffff',
              letterSpacing: '1px',
              textShadow: '0 0 8px rgba(0, 210, 255, 0.6)',
              fontWeight: 'bold',
            }}
          >
            ~{stats.breathsEstimated}
          </div>

          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'clamp(0.56rem, 1.5vw, 0.64rem)',
              color: '#8b9bb4',
              textTransform: 'uppercase',
              marginTop: '2px',
            }}
          >
            Respirações no Ar
          </div>
        </div>

        {/* Cosmic Travel Distance - Full Width */}
        <div
          style={{
            gridColumn: '1 / -1',
            background: 'linear-gradient(135deg, #101c18 0%, #070f0d 100%)',
            border: '2px solid rgba(0, 255, 136, 0.4)',
            borderRadius: '6px',
            padding: 'clamp(6px, 1.4vh, 10px) clamp(10px, 2.5vw, 14px)',
            boxShadow: 'inset 0 0 14px rgba(0,0,0,0.9), 0 4px 14px rgba(0,0,0,0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '4px',
                background: 'rgba(0, 255, 136, 0.15)',
                border: '1px solid #00ff88',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Orbit size={18} color="#00ff88" />
            </div>

            <div>
              <div
                style={{
                  fontFamily: 'var(--font-vcr)',
                  fontSize: 'clamp(0.60rem, 1.6vw, 0.68rem)',
                  color: '#00ff88',
                  letterSpacing: '1px',
                }}
              >
                DISTÂNCIA PERCORRIDA PELA TERRA
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-vcr)',
                  fontSize: 'clamp(0.98rem, 3.2vw, 1.25rem)',
                  color: '#ffffff',
                  fontWeight: 'bold',
                  letterSpacing: '1px',
                  textShadow: '0 0 8px rgba(0, 255, 136, 0.5)',
                }}
              >
                {stats.earthTraveledMillionKm}
              </div>
            </div>
          </div>
        </div>

        {/* Population Delta - Full Width */}
        <div
          style={{
            gridColumn: '1 / -1',
            background: 'linear-gradient(135deg, #171520 0%, #0d0c14 100%)',
            border: '2px solid rgba(155, 81, 224, 0.4)',
            borderRadius: '6px',
            padding: 'clamp(6px, 1.4vh, 10px) clamp(10px, 2.5vw, 14px)',
            boxShadow: 'inset 0 0 14px rgba(0,0,0,0.9), 0 4px 14px rgba(0,0,0,0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '4px',
                background: 'rgba(155, 81, 224, 0.15)',
                border: '1px solid #9b51e0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Users2 size={18} color="#d4a5ff" />
            </div>

            <div>
              <div
                style={{
                  fontFamily: 'var(--font-vcr)',
                  fontSize: 'clamp(0.60rem, 1.6vw, 0.68rem)',
                  color: '#d4a5ff',
                  letterSpacing: '1px',
                }}
              >
                POPULAÇÃO DO PLANETA (ENTÃO ➔ HOJE)
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-vcr)',
                  fontSize: 'clamp(0.88rem, 2.8vw, 1.1rem)',
                  color: '#ffffff',
                  fontWeight: 'bold',
                  letterSpacing: '0.5px',
                }}
              >
                {stats.worldPopulationThen} <span style={{ color: '#00ffcc' }}>➔</span> <span style={{ color: '#ffe600' }}>{stats.worldPopulationNow}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stereo VU Meter & Odometer Strip */}
      <div
        style={{
          width: '100%',
          background: 'rgba(0, 0, 0, 0.75)',
          borderRadius: '6px',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          padding: 'clamp(5px, 1vh, 8px) clamp(10px, 2.5vw, 14px)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          zIndex: 2,
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          <span
            style={{
              fontFamily: 'var(--font-vcr)',
              fontSize: 'clamp(0.58rem, 1.5vw, 0.66rem)',
              color: '#a0a5b5',
              letterSpacing: '0.5px',
            }}
          >
            SINAL BIOLÓGICO ATIVO
          </span>
          <span
            style={{
              fontFamily: 'var(--font-vcr)',
              fontSize: 'clamp(0.65rem, 1.8vw, 0.74rem)',
              color: '#00ff88',
              letterSpacing: '1px',
            }}
          >
            100% OPERACIONAL
          </span>
        </div>

        <VcrVuMeter />
      </div>

      {/* Bottom Telemetry Status */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          padding: 'clamp(4px, 0.9vh, 6px) clamp(8px, 2vw, 12px)',
          background: 'rgba(0, 0, 0, 0.65)',
          borderRadius: '4px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          zIndex: 2,
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-vcr)',
            fontSize: 'clamp(0.62rem, 1.7vw, 0.70rem)',
            color: '#a0a5b5',
            letterSpacing: '0.5px',
          }}
        >
          CALIBRATION LOCK 100%
        </span>
        <span
          style={{
            fontFamily: 'var(--font-vcr)',
            fontSize: 'clamp(0.66rem, 1.8vw, 0.74rem)',
            color: '#ffe600',
            letterSpacing: '1px',
          }}
        >
          TIMECODE 01:59:59 END
        </span>
      </div>

      {/* Bottom Rainbow Finish */}
      <div style={{ zIndex: 2 }}>
        <VhsRainbowBand height={6} />
      </div>
    </div>
  );
}
