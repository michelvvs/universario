'use client';

import React from 'react';
import { BirthDataPayload } from '@/types/universario';
import { Orbit, Heart, Wind, Users2, Activity } from 'lucide-react';
import { MemphisSquiggle, MemphisZigzag, MemphisTrianglePattern, MemphisCrosshatch } from '../MemphisDoodles';

interface SlideProps {
  data: BirthDataPayload;
}

export default function SlideCosmicStats({ data }: SlideProps) {
  const { stats } = data;

  return (
    <div className="slide-memphis-canvas slide-theme-stats">
      {/* Memphis Floating Doodles */}
      <div style={{ position: 'absolute', top: '10%', right: '5%', pointerEvents: 'none' }} className="animate-float-1">
        <MemphisTrianglePattern size={46} fillColor="#00d2ff" />
      </div>

      <div style={{ position: 'absolute', bottom: '26%', left: '4%', pointerEvents: 'none' }}>
        <MemphisSquiggle color="#ff2a85" width={52} height={16} />
      </div>

      {/* Top Header */}
      <div style={{ textAlign: 'center', zIndex: 2 }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '5px 14px',
            borderRadius: '10px',
            background: '#00d2ff',
            border: '2.5px solid #111111',
            boxShadow: '3px 3px 0px #111111',
            fontSize: '0.76rem',
            fontFamily: 'var(--font-80s)',
            letterSpacing: '0.5px',
            color: '#111111',
            marginBottom: '4px',
            transform: 'rotate(1deg)',
          }}
        >
          <Activity size={13} color="#111111" />
          <span>PLACAR CÓSMICO • HIGH SCORE</span>
        </div>

        <h2
          style={{
            fontSize: '2.05rem',
            fontWeight: 900,
            fontFamily: 'var(--font-80s)',
            lineHeight: 1.1,
            marginBottom: '4px',
            color: '#111111',
            textShadow: '2.5px 2.5px 0px #ffe600',
          }}
          className="text-chromatic"
        >
          ODÔMETRO DO TEMPO
        </h2>

        <div
          style={{
            display: 'inline-block',
            padding: '2px 10px',
            borderRadius: '6px',
            background: '#ffffff',
            border: '1.5px solid #111111',
            boxShadow: '2px 2px 0px #111111',
            fontSize: '0.74rem',
            fontFamily: 'var(--font-80s)',
            color: '#ff2a85',
            letterSpacing: '0.5px',
          }}
        >
          O QUE SEU CORPO & A TERRA PERCORRERAM
        </div>
      </div>

      {/* Grid of Memphis Arcade Stats Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', zIndex: 2, margin: '4px 0' }}>
        {/* Heartbeats */}
        <div
          style={{
            padding: '12px 10px',
            borderRadius: '14px',
            background: '#ffffff',
            border: '2.5px solid #111111',
            boxShadow: '3px 3px 0px #111111, 6px 6px 0px #ff2a85',
            textAlign: 'center',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2px' }}>
            <Heart size={22} color="#ff2a85" fill="#ff2a85" />
          </div>
          <div style={{ fontSize: '1.2rem', fontWeight: 900, fontFamily: 'var(--font-80s)', color: '#111111' }}>
            ~{stats.heartbeatsEstimated}
          </div>
          <div style={{ fontSize: '0.66rem', fontFamily: 'var(--font-80s)', color: '#ff2a85', letterSpacing: '0.5px', marginTop: '2px' }}>
            BATIMENTOS CARDÍACOS
          </div>
        </div>

        {/* Breaths */}
        <div
          style={{
            padding: '12px 10px',
            borderRadius: '14px',
            background: '#ffffff',
            border: '2.5px solid #111111',
            boxShadow: '3px 3px 0px #111111, 6px 6px 0px #00d2ff',
            textAlign: 'center',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2px' }}>
            <Wind size={22} color="#00d2ff" />
          </div>
          <div style={{ fontSize: '1.2rem', fontWeight: 900, fontFamily: 'var(--font-80s)', color: '#111111' }}>
            ~{stats.breathsEstimated}
          </div>
          <div style={{ fontSize: '0.66rem', fontFamily: 'var(--font-80s)', color: '#00d2ff', letterSpacing: '0.5px', marginTop: '2px' }}>
            RESPIRAÇÕES NO AR
          </div>
        </div>

        {/* Cosmic Travel Distance */}
        <div
          style={{
            gridColumn: '1 / -1',
            padding: '12px 14px',
            borderRadius: '14px',
            background: '#ffffff',
            border: '2.5px solid #111111',
            boxShadow: '3px 3px 0px #111111, 6px 6px 0px #ffe600',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <div
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '10px',
              background: '#ffe600',
              border: '2px solid #111111',
              boxShadow: '2px 2px 0px #111111',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <Orbit size={24} color="#111111" />
          </div>
          <div>
            <div style={{ fontSize: '0.68rem', fontFamily: 'var(--font-80s)', color: '#111111', background: '#ffe600', padding: '1px 8px', borderRadius: '5px', border: '1px solid #111111', display: 'inline-block', letterSpacing: '0.5px' }}>
              DISTÂNCIA VIAJADA PELA TERRA
            </div>
            <div style={{ fontSize: '1.18rem', fontWeight: 900, fontFamily: 'var(--font-80s)', color: '#111111', marginTop: '2px' }}>
              {stats.earthTraveledMillionKm}
            </div>
          </div>
        </div>

        {/* Population Then vs Now */}
        <div
          style={{
            gridColumn: '1 / -1',
            padding: '10px 14px',
            background: '#ffffff',
            border: '2.5px solid #111111',
            borderRadius: '14px',
            boxShadow: '3px 3px 0px #111111',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Users2 size={22} color="#9b51e0" />
            <div>
              <div style={{ fontSize: '0.66rem', fontFamily: 'var(--font-80s)', color: '#9b51e0', letterSpacing: '0.5px' }}>
                POPULAÇÃO MUNDIAL (ENTÃO ➔ HOJE)
              </div>
              <div style={{ fontSize: '0.94rem', fontWeight: 900, fontFamily: 'var(--font-80s)', color: '#111111' }}>
                {stats.worldPopulationThen} ➔ <span style={{ color: '#ff2a85' }}>{stats.worldPopulationNow}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Note */}
      <div style={{ textAlign: 'center', zIndex: 2 }}>
        <div style={{ fontFamily: 'var(--font-80s)', fontSize: '0.78rem', color: '#111111' }}>
          ★ VOCÊ É UMA TESTEMUNHA ÚNICA DO UNIVERSO ★
        </div>
      </div>
    </div>
  );
}
