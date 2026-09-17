'use client';

import React from 'react';
import { CheckCircle2, Loader2, Circle, FastForward, Disc } from 'lucide-react';
import { LoadingStep } from '@/types/universario';

interface LoadingTimelineProps {
  steps: LoadingStep[];
  currentStepIndex: number;
}

export default function LoadingTimeline({ steps, currentStepIndex }: LoadingTimelineProps) {
  const percentComplete = Math.min(100, Math.round(((currentStepIndex + 1) / steps.length) * 100));

  return (
    <div style={{ width: '100%', maxWidth: '480px', margin: '0 auto', position: 'relative' }}>
      <div className="tape-strip" style={{ top: '-10px', left: '20px' }} />
      <div className="tape-strip tape-strip-pink" style={{ bottom: '-10px', right: '20px' }} />

      <div
        className="memphis-card crt-overlay"
        style={{
          background: 'rgba(22, 8, 47, 0.95)',
          border: '3px solid #ff2a85',
          borderRadius: '24px',
          padding: '30px 24px',
          textAlign: 'center',
          boxShadow: '6px 6px 0px #00f0ff, 12px 12px 0px #ffde59',
          position: 'relative',
        }}
      >
        {/* VHS Top Bar Indicator */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontFamily: 'var(--font-crt)',
            fontSize: '1.1rem',
            color: '#00f0ff',
            marginBottom: '16px',
            borderBottom: '1px dashed rgba(0, 240, 255, 0.4)',
            paddingBottom: '8px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span className="vhs-rec-dot" />
            <span style={{ color: '#ff2a85' }}>REW ◄◄ 80s</span>
          </div>
          <div style={{ color: '#ffde59' }}>SP 0:25:89</div>
          <div style={{ color: '#26ffdf' }}>TRACKING: OK</div>
        </div>

        {/* Cassette Tape Spool Loading Graphic */}
        <div style={{ position: 'relative', width: '74px', height: '74px', margin: '0 auto 16px auto' }}>
          <div
            className="animate-tape-spin"
            style={{
              position: 'relative',
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              background: 'radial-gradient(circle, #ff2a85 0%, #7928ca 70%, #0d061c 100%)',
              border: '3px solid #00f0ff',
              boxShadow: '0 0 15px rgba(0, 240, 255, 0.6)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.9rem',
            }}
          >
            {steps[currentStepIndex]?.icon || '📼'}
          </div>
        </div>

        <h3
          style={{
            fontSize: '1.4rem',
            fontWeight: 800,
            fontFamily: 'var(--font-80s)',
            marginBottom: '4px',
            color: '#ffffff',
          }}
          className="text-chromatic"
        >
          REBOBINANDO A FITA DO TEMPO
        </h3>

        <p style={{ color: '#cbd5e1', fontSize: '0.85rem', marginBottom: '20px' }}>
          Resgatando fitas cassete, discos de vinil, jornais e o céu da sua data...
        </p>

        {/* Retro Pixelated Progress Bar */}
        <div
          style={{
            width: '100%',
            height: '10px',
            backgroundColor: '#0d061c',
            border: '2px solid #00f0ff',
            borderRadius: '6px',
            overflow: 'hidden',
            marginBottom: '20px',
            boxShadow: '2px 2px 0px #ff2a85',
          }}
        >
          <div
            style={{
              height: '100%',
              width: `${percentComplete}%`,
              background: 'repeating-linear-gradient(90deg, #ff2a85, #ff2a85 8px, #00f0ff 8px, #00f0ff 16px)',
              transition: 'width 0.3s ease',
            }}
          />
        </div>

        {/* Steps List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', textAlign: 'left' }}>
          {steps.map((step, idx) => {
            const isCompleted = idx < currentStepIndex;
            const isActive = idx === currentStepIndex;

            return (
              <div
                key={step.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '8px 12px',
                  borderRadius: '8px',
                  background: isActive
                    ? 'rgba(255, 42, 133, 0.18)'
                    : isCompleted
                    ? 'rgba(0, 240, 255, 0.08)'
                    : 'transparent',
                  border: isActive
                    ? '1.5px solid #ff2a85'
                    : isCompleted
                    ? '1px solid rgba(0, 240, 255, 0.3)'
                    : '1px solid transparent',
                  transition: 'all 0.2s ease',
                  opacity: isCompleted ? 0.75 : isActive ? 1 : 0.35,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  {isCompleted ? (
                    <CheckCircle2 size={18} color="#26ffdf" />
                  ) : isActive ? (
                    <Loader2 size={18} className="animate-spin-slow" color="#ff2a85" />
                  ) : (
                    <Circle size={16} color="#64748b" />
                  )}
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontSize: '0.85rem',
                      fontWeight: isActive ? 700 : 500,
                      color: isActive ? '#ffffff' : isCompleted ? '#26ffdf' : '#94a3b8',
                      fontFamily: isActive ? 'var(--font-80s)' : 'var(--font-main)',
                      letterSpacing: isActive ? '0.3px' : 'normal',
                    }}
                  >
                    <span>{step.label}</span>
                  </div>
                  {isActive && (
                    <div style={{ fontSize: '0.72rem', color: '#ffde59', marginTop: '2px', fontFamily: 'var(--font-crt)' }}>
                      ► {step.sublabel}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
