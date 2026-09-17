'use client';

import React from 'react';
import { CheckCircle2, Loader2, Circle } from 'lucide-react';
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
        className="memphis-card"
        style={{
          background: '#ffffff',
          border: '3.5px solid #111111',
          borderRadius: '24px',
          padding: '30px 24px',
          textAlign: 'center',
          boxShadow: '6px 6px 0px #111111, 12px 12px 0px #00d2ff',
          position: 'relative',
        }}
      >
        {/* Top VHS Bar Indicator */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontFamily: 'var(--font-crt)',
            fontSize: '1.05rem',
            color: '#111111',
            marginBottom: '16px',
            borderBottom: '2px dashed #111111',
            paddingBottom: '8px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span className="vhs-rec-dot" />
            <span style={{ color: '#ff2a85', fontWeight: 700 }}>REW ◄◄ MEMPHIS 80s</span>
          </div>
          <div style={{ color: '#111111', fontWeight: 700 }}>SP 0:25:89</div>
          <div style={{ color: '#9b51e0', fontWeight: 700 }}>TRACKING: OK</div>
        </div>

        {/* Cassette Tape Spool Loading Graphic */}
        <div style={{ position: 'relative', width: '76px', height: '76px', margin: '0 auto 16px auto' }}>
          <div
            className="animate-tape-spin"
            style={{
              position: 'relative',
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              background: '#ffe600',
              border: '3.5px solid #111111',
              boxShadow: '4px 4px 0px #ff2a85',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '2rem',
            }}
          >
            {steps[currentStepIndex]?.icon || '📼'}
          </div>
        </div>

        <h3
          style={{
            fontSize: '1.5rem',
            fontWeight: 900,
            fontFamily: 'var(--font-80s)',
            marginBottom: '4px',
            color: '#111111',
          }}
          className="text-chromatic"
        >
          REBOBINANDO A FITA DO TEMPO
        </h3>

        <p style={{ color: '#444444', fontSize: '0.88rem', marginBottom: '20px', fontWeight: 500 }}>
          Resgatando fitas cassete, discos de vinil, jornais e o céu da sua data...
        </p>

        {/* Retro Progress Bar */}
        <div
          style={{
            width: '100%',
            height: '12px',
            backgroundColor: '#fffdf7',
            border: '2.5px solid #111111',
            borderRadius: '8px',
            overflow: 'hidden',
            marginBottom: '20px',
            boxShadow: '3px 3px 0px #ff2a85',
          }}
        >
          <div
            style={{
              height: '100%',
              width: `${percentComplete}%`,
              background: 'repeating-linear-gradient(90deg, #ff2a85, #ff2a85 10px, #00d2ff 10px, #00d2ff 20px, #ffe600 20px, #ffe600 30px)',
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
                  padding: '9px 12px',
                  borderRadius: '10px',
                  background: isActive
                    ? '#fff275'
                    : isCompleted
                    ? '#e0f7fa'
                    : '#fffdf7',
                  border: isActive
                    ? '2px solid #111111'
                    : isCompleted
                    ? '2px solid #111111'
                    : '1.5px dashed #cccccc',
                  boxShadow: (isActive || isCompleted) ? '2px 2px 0px #111111' : 'none',
                  transition: 'all 0.2s ease',
                  opacity: isCompleted ? 0.85 : isActive ? 1 : 0.45,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  {isCompleted ? (
                    <CheckCircle2 size={18} color="#111111" />
                  ) : isActive ? (
                    <Loader2 size={18} className="animate-spin-slow" color="#ff2a85" />
                  ) : (
                    <Circle size={16} color="#999999" />
                  )}
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontSize: '0.86rem',
                      fontWeight: isActive ? 800 : 600,
                      color: '#111111',
                      fontFamily: isActive ? 'var(--font-80s)' : 'var(--font-main)',
                      letterSpacing: isActive ? '0.3px' : 'normal',
                    }}
                  >
                    <span>{step.label}</span>
                  </div>
                  {isActive && (
                    <div style={{ fontSize: '0.74rem', color: '#ff2a85', marginTop: '2px', fontFamily: 'var(--font-crt)', fontWeight: 700 }}>
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

