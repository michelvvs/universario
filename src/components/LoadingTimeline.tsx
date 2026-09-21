'use client';

import React, { useState, useEffect } from 'react';
import { LoadingStep } from '@/types/universario';

interface LoadingTimelineProps {
  steps: LoadingStep[];
  currentStepIndex: number;
}

export default function LoadingTimeline({ steps, currentStepIndex }: LoadingTimelineProps) {
  const percentComplete = Math.min(100, Math.round(((currentStepIndex + 1) / steps.length) * 100));
  const activeStep = steps[currentStepIndex] || steps[0];

  // Tracking needle simulation
  const needlePosition = Math.max(5, Math.min(95, percentComplete));

  // Volume bar segments (total 16)
  const totalVolumeSegments = 16;
  const activeVolumeSegments = Math.round((percentComplete / 100) * totalVolumeSegments);

  // Tracking bar segments (total 20)
  const totalTrackingSegments = 20;
  const activeTrackingSegments = Math.round((percentComplete / 100) * totalTrackingSegments);

  return (
    <div
      style={{
        width: '100%',
        maxWidth: '540px',
        margin: '0 auto',
        position: 'relative',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 20px 60px rgba(0, 0, 180, 0.5), 0 0 0 4px #000bb5, 0 0 0 8px #11141a',
      }}
    >
      {/* VCR Blue Screen CRT Container */}
      <div
        style={{
          background: 'linear-gradient(180deg, #0014cc 0%, #000bb5 100%)',
          color: '#ffffff',
          padding: 'clamp(20px, 4vw, 28px) clamp(16px, 3.5vw, 24px)',
          fontFamily: 'var(--font-vcr), monospace',
          position: 'relative',
          userSelect: 'none',
          letterSpacing: '1px',
        }}
        className="vcr-blue-screen crt-overlay"
      >
        {/* Subtle Horizontal CRT Scanlines & Tracking Glitch Effect */}
        <div className="vcr-tracking-noise" />

        {/* Top VHS/VCR Menu White Header Box */}
        <div
          style={{
            background: '#ffffff',
            color: '#000bb5',
            padding: '6px 12px',
            textAlign: 'center',
            marginBottom: '18px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)',
          }}
        >
          <div
            style={{
              fontFamily: 'var(--font-vcr)',
              fontSize: 'clamp(1.2rem, 4vw, 1.55rem)',
              fontWeight: 900,
              lineHeight: 1.05,
              letterSpacing: '2px',
              textTransform: 'uppercase',
            }}
          >
            UNIVERSÁRIO • VCR AUTO TRACKING
          </div>
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'clamp(0.68rem, 2vw, 0.78rem)',
              fontWeight: 800,
              letterSpacing: '1.5px',
              marginTop: '1px',
            }}
          >
            SISTEMA DE CALIBRAÇÃO DE FITAS 80s
          </div>
        </div>

        {/* Status OSD Row */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: 'clamp(0.88rem, 2.5vw, 1.05rem)',
            marginBottom: '14px',
            borderBottom: '2px solid rgba(255, 255, 255, 0.35)',
            paddingBottom: '6px',
            textShadow: '0 0 8px rgba(255, 255, 255, 0.8)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              style={{
                border: '1.5px solid #ffffff',
                padding: '0 4px',
                fontSize: '0.80rem',
                fontWeight: 'bold',
              }}
            >
              OK
            </span>
            <span>📼 0:25:89</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ color: '#00ff88' }} className="animate-pulse">
              REW ◄◄
            </span>
            <span>PLAY 11:35 PM</span>
          </div>
        </div>

        {/* Volume & Signal Gauge */}
        <div style={{ marginBottom: '14px' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: 'clamp(0.85rem, 2.4vw, 1.0rem)',
              marginBottom: '3px',
              fontWeight: 'bold',
            }}
          >
            <span>VOLUME / SINAL</span>
            <span>{percentComplete}%</span>
          </div>

          {/* Volume Bar */}
          <div
            style={{
              border: '2px solid #ffffff',
              padding: '2px',
              height: '18px',
              display: 'flex',
              background: 'rgba(0, 0, 0, 0.25)',
              boxShadow: 'inset 0 0 6px rgba(0, 0, 0, 0.5)',
            }}
          >
            <div
              style={{
                height: '100%',
                width: `${percentComplete}%`,
                background: '#ffffff',
                boxShadow: '0 0 8px #ffffff',
                transition: 'width 0.25s ease',
              }}
            />
          </div>

          {/* Segmented Volume Ticks */}
          <div
            style={{
              display: 'flex',
              gap: '3px',
              marginTop: '4px',
              fontSize: '0.65rem',
            }}
          >
            {Array.from({ length: totalVolumeSegments }).map((_, i) => (
              <div
                key={i}
                style={{
                  flex: 1,
                  height: '6px',
                  background: i < activeVolumeSegments ? '#ffffff' : 'rgba(255, 255, 255, 0.2)',
                }}
              />
            ))}
          </div>
        </div>

        {/* Tracking Gauge */}
        <div style={{ marginBottom: '16px' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: 'clamp(0.85rem, 2.4vw, 1.0rem)',
              marginBottom: '3px',
              fontWeight: 'bold',
            }}
          >
            <span>AUTO TRACKING</span>
            <span style={{ color: '#00ff88' }}>LOCKING...</span>
          </div>

          {/* Tracking Bar */}
          <div
            style={{
              border: '2px solid #ffffff',
              padding: '2px',
              height: '18px',
              display: 'flex',
              background: 'rgba(0, 0, 0, 0.25)',
              boxShadow: 'inset 0 0 6px rgba(0, 0, 0, 0.5)',
            }}
          >
            <div
              style={{
                height: '100%',
                width: `${Math.min(100, percentComplete + 15)}%`,
                background: '#00ff88',
                boxShadow: '0 0 10px #00ff88',
                transition: 'width 0.25s ease',
              }}
            />
          </div>
        </div>

        {/* Tape Speed & Video Standard Format Row */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: 'clamp(0.82rem, 2.3vw, 0.95rem)',
            marginBottom: '16px',
            borderTop: '1px dashed rgba(255, 255, 255, 0.3)',
            borderBottom: '1px dashed rgba(255, 255, 255, 0.3)',
            padding: '6px 0',
          }}
        >
          <div>
            <span style={{ background: '#ffffff', color: '#000bb5', padding: '0 4px', fontWeight: 'bold' }}>
              SP
            </span>{' '}
            <span>EP</span> <span>SLP</span>
          </div>
          <div>
            <span style={{ background: '#ffffff', color: '#000bb5', padding: '0 4px', fontWeight: 'bold' }}>
              AUTO
            </span>{' '}
            <span>PAL</span> <span>SECAM</span>{' '}
            <span style={{ color: '#ffe600', fontWeight: 'bold' }}>NTSC</span>
          </div>
        </div>

        {/* Tape Position Ruler with Dynamic Moving Pointer Needle */}
        <div style={{ marginBottom: '18px' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              fontSize: '0.88rem',
              fontWeight: 'bold',
              marginBottom: '2px',
            }}
          >
            <span>0:22:{String(percentComplete).padStart(2, '0')} SP</span>
          </div>

          {/* Needle Indicator Row */}
          <div style={{ position: 'relative', width: '100%', height: '14px' }}>
            <div
              style={{
                position: 'absolute',
                left: `${needlePosition}%`,
                transform: 'translateX(-50%)',
                color: '#ffffff',
                fontSize: '1.1rem',
                lineHeight: 1,
                transition: 'left 0.25s ease',
                textShadow: '0 0 6px #ffffff',
              }}
            >
              ▼
            </div>
          </div>

          {/* Tape Timeline Ruler Frame */}
          <div
            style={{
              width: '100%',
              height: '16px',
              border: '2px solid #ffffff',
              borderTop: 'none',
              position: 'relative',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              padding: '0 4px',
            }}
          >
            {/* Ruler Ticks */}
            {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((tick) => (
              <div
                key={tick}
                style={{
                  width: '2px',
                  height: tick % 2 === 0 ? '10px' : '6px',
                  background: '#ffffff',
                }}
              />
            ))}
          </div>

          {/* BEGIN / END Labels */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: '0.85rem',
              fontWeight: 'bold',
              marginTop: '2px',
            }}
          >
            <span>BEGIN</span>
            <span>END</span>
          </div>
        </div>

        {/* Current Active Step Box */}
        <div
          style={{
            background: 'rgba(0, 0, 0, 0.45)',
            border: '2px solid #ffffff',
            padding: '10px 14px',
            marginBottom: '16px',
            boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.6)',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: 'clamp(0.95rem, 2.7vw, 1.15rem)',
              fontWeight: 'bold',
              color: '#ffe600',
              textShadow: '0 0 6px #ffe600',
            }}
          >
            <span>{activeStep.icon}</span>
            <span>{activeStep.label}</span>
          </div>
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'clamp(0.72rem, 2.1vw, 0.82rem)',
              color: '#d0e0ff',
              marginTop: '3px',
            }}
          >
            ► {activeStep.sublabel}
          </div>
        </div>

        {/* Bottom VCR Menu Footer Instructions */}
        <div
          style={{
            background: '#ffffff',
            color: '#000bb5',
            padding: '6px 12px',
            textAlign: 'center',
            fontSize: 'clamp(0.80rem, 2.3vw, 0.95rem)',
            fontWeight: 900,
            letterSpacing: '1px',
          }}
        >
          <div>SELECT WITH (▲▼) AND [OK]</div>
          <div>PRESS (MENU) TO END • CALIBRATING HEADS...</div>
        </div>
      </div>

      <style jsx>{`
        .vcr-blue-screen {
          text-shadow: 0 0 4px rgba(255, 255, 255, 0.6);
        }

        .vcr-tracking-noise {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 20;
          opacity: 0.15;
          background-image: repeating-linear-gradient(
            0deg,
            rgba(255, 255, 255, 0.1) 0px,
            rgba(255, 255, 255, 0.1) 1px,
            transparent 1px,
            transparent 3px
          );
          animation: vcrScanJitter 0.18s infinite linear;
        }

        @keyframes vcrScanJitter {
          0% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-2px);
          }
          100% {
            transform: translateY(1px);
          }
        }
      `}</style>
    </div>
  );
}
