'use client';

import React from 'react';
import { BirthDataPayload } from '@/types/universario';
import { Orbit, Heart, Wind, Users2, Sparkles, Activity } from 'lucide-react';

interface SlideProps {
  data: BirthDataPayload;
}

export default function SlideCosmicStats({ data }: SlideProps) {
  const { stats } = data;

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
        background: 'radial-gradient(circle at 50% 20%, #1a0833 0%, #0d041c 70%, #05010a 100%)',
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
            background: '#26ffdf',
            border: '1.5px solid #0d061c',
            boxShadow: '3px 3px 0px #ff2a85',
            fontSize: '0.74rem',
            fontFamily: 'var(--font-80s)',
            letterSpacing: '0.5px',
            color: '#0d061c',
            marginBottom: '4px',
          }}
        >
          <Activity size={12} />
          <span>PLACAR CÓSMICO • HIGH SCORE</span>
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
          ODÔMETRO DO TEMPO
        </h2>

        <p style={{ fontSize: '0.78rem', fontFamily: 'var(--font-crt)', color: '#ffde59', letterSpacing: '0.5px' }}>
          O QUE SEU CORPO & A TERRA PERCORRERAM
        </p>
      </div>

      {/* Grid of 80s Arcade Stats Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', zIndex: 2, margin: '4px 0' }}>
        {/* Heartbeats */}
        <div
          className="memphis-card-pink"
          style={{
            padding: '12px 10px',
            borderRadius: '12px',
            textAlign: 'center',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '3px' }}>
            <Heart size={20} color="#ff2a85" fill="#ff2a85" />
          </div>
          <div style={{ fontSize: '1.15rem', fontWeight: 800, fontFamily: 'var(--font-80s)', color: '#ffffff' }}>
            ~{stats.heartbeatsEstimated}
          </div>
          <div style={{ fontSize: '0.65rem', fontFamily: 'var(--font-80s)', color: '#ffde59', letterSpacing: '0.5px', marginTop: '2px' }}>
            BATIMENTOS CARDÍACOS
          </div>
        </div>

        {/* Breaths */}
        <div
          className="memphis-card-cyan"
          style={{
            padding: '12px 10px',
            borderRadius: '12px',
            textAlign: 'center',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '3px' }}>
            <Wind size={20} color="#00f0ff" />
          </div>
          <div style={{ fontSize: '1.15rem', fontWeight: 800, fontFamily: 'var(--font-80s)', color: '#ffffff' }}>
            ~{stats.breathsEstimated}
          </div>
          <div style={{ fontSize: '0.65rem', fontFamily: 'var(--font-80s)', color: '#00f0ff', letterSpacing: '0.5px', marginTop: '2px' }}>
            RESPIRAÇÕES NO AR
          </div>
        </div>

        {/* Cosmic Travel Distance */}
        <div
          className="memphis-card-yellow"
          style={{
            gridColumn: '1 / -1',
            padding: '12px 14px',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '8px',
              background: '#0d061c',
              border: '1.5px solid #ffde59',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <Orbit size={22} color="#ffde59" />
          </div>
          <div>
            <div style={{ fontSize: '0.66rem', fontFamily: 'var(--font-80s)', color: '#0d061c', background: '#ffde59', padding: '1px 6px', borderRadius: '4px', display: 'inline-block', letterSpacing: '0.5px' }}>
              DISTÂNCIA VIAJADA PELA TERRA
            </div>
            <div style={{ fontSize: '1.15rem', fontWeight: 800, fontFamily: 'var(--font-80s)', color: '#ffffff', marginTop: '2px' }}>
              {stats.earthTraveledMillionKm}
            </div>
          </div>
        </div>

        {/* Population Then vs Now */}
        <div
          style={{
            gridColumn: '1 / -1',
            padding: '10px 14px',
            background: '#0d061c',
            border: '2px solid #26ffdf',
            borderRadius: '12px',
            boxShadow: '3px 3px 0px #ff2a85',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Users2 size={20} color="#26ffdf" />
            <div>
              <div style={{ fontSize: '0.65rem', fontFamily: 'var(--font-80s)', color: '#26ffdf', letterSpacing: '0.5px' }}>
                POPULAÇÃO MUNDIAL (ENTÃO ➔ HOJE)
              </div>
              <div style={{ fontSize: '0.92rem', fontWeight: 800, fontFamily: 'var(--font-80s)', color: '#ffffff' }}>
                {stats.worldPopulationThen} ➔ <span style={{ color: '#ffde59' }}>{stats.worldPopulationNow}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Note */}
      <div style={{ textAlign: 'center', zIndex: 2 }}>
        <div style={{ fontFamily: 'var(--font-crt)', fontSize: '0.9rem', color: '#ffde59' }}>
          ★ VOCÊ É UMA TESTEMUNHA ÚNICA DO UNIVERSO ★
        </div>
      </div>
    </div>
  );
}
