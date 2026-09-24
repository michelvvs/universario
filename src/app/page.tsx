'use client';

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import DateInputForm from '@/components/DateInputForm';
import LoadingTimeline from '@/components/LoadingTimeline';
import StoryViewer from '@/components/StoryViewer';
import PhotoCaptureScreen from '@/components/PhotoCaptureScreen';
import { BirthDataPayload, LoadingStep } from '@/types/universario';
import { VcrOsdBadge, DymoLabel } from '@/components/VhsGraphics';

const LOADING_STEPS: LoadingStep[] = [
  {
    id: 'astronomy',
    label: 'Calculando fase da lua e coordenadas estelares',
    sublabel: 'Determinando luminosidade, constelação e mapa celeste NASA...',
    icon: '🌕',
    status: 'pending',
  },
  {
    id: 'music',
    label: 'Sintonizando paradas de sucesso (Rádios, Vendas & Billboard)',
    sublabel: 'Rebobinando fitas cassete TDK e resgatando LPs #1...',
    icon: '📼',
    status: 'pending',
  },
  {
    id: 'news',
    label: 'Consultando manchetes e jornais históricos da época',
    sublabel: 'Acessando arquivos de notícias do Brasil e do mundo...',
    icon: '📰',
    status: 'pending',
  },
  {
    id: 'popculture',
    label: 'Reunindo cinema, novelas e cultura pop da época',
    sublabel: 'Localizando filmes de locadora e nostalgia 80s...',
    icon: '🎬',
    status: 'pending',
  },
  {
    id: 'rendering',
    label: 'Gravando fitas master em Stories 9:16 HD',
    sublabel: 'Aplicando scanlines VCR, auto tracking e estética analógica...',
    icon: '✨',
    status: 'pending',
  },
];

export default function HomePage() {
  const [viewState, setViewState] = useState<'idle' | 'photo' | 'loading' | 'stories'>('idle');
  const [pendingFormData, setPendingFormData] = useState<{
    date: string;
    name?: string;
    gender?: 'masculino' | 'feminino' | 'neutro';
  } | null>(null);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [birthData, setBirthData] = useState<BirthDataPayload | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleFormSubmit = (
    date: string,
    name?: string,
    gender?: 'masculino' | 'feminino' | 'neutro'
  ) => {
    setPendingFormData({ date, name, gender });
    setViewState('photo');
  };

  const handlePhotoConfirmed = (photoDataUrl: string) => {
    if (!pendingFormData) return;
    executeFetchBirthData(pendingFormData.date, pendingFormData.name, pendingFormData.gender, photoDataUrl);
  };

  const handlePhotoSkipped = () => {
    if (!pendingFormData) return;
    executeFetchBirthData(pendingFormData.date, pendingFormData.name, pendingFormData.gender, undefined);
  };

  const executeFetchBirthData = async (
    date: string,
    name?: string,
    gender?: 'masculino' | 'feminino' | 'neutro',
    userPhotoUrl?: string
  ) => {
    setViewState('loading');
    setCurrentStepIndex(0);
    setErrorMessage(null);

    const stepInterval = 480;
    let currentStep = 0;

    const stepTimer = setInterval(() => {
      currentStep++;
      if (currentStep < LOADING_STEPS.length) {
        setCurrentStepIndex(currentStep);
      } else {
        clearInterval(stepTimer);
      }
    }, stepInterval);

    try {
      const response = await fetch('/api/birth-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ date, name, gender }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erro ao resgatar dados históricos.');
      }

      const data: BirthDataPayload = await response.json();
      if (userPhotoUrl) {
        data.userPhotoUrl = userPhotoUrl;
      }

      const remainingTime = Math.max(250, (LOADING_STEPS.length - currentStep) * stepInterval);
      setTimeout(() => {
        clearInterval(stepTimer);
        setCurrentStepIndex(LOADING_STEPS.length - 1);

        setTimeout(() => {
          setBirthData(data);
          setViewState('stories');

          // Celebration Confetti 80s Gold & Neon Colors
          try {
            confetti({
              particleCount: 90,
              spread: 80,
              origin: { y: 0.6 },
              colors: ['#ffd700', '#00e5ff', '#ff3b30', '#00ff88', '#ffffff'],
            });
          } catch {}
        }, 300);
      }, remainingTime);
    } catch (err: unknown) {
      clearInterval(stepTimer);
      setViewState('idle');
      const error = err as Error;
      setErrorMessage(error.message || 'Houve um imprevisto ao buscar os dados da fita. Tente novamente.');
    }
  };

  const handleCloseStories = () => {
    setViewState('idle');
  };

  return (
    <main style={{ minHeight: '100dvh', position: 'relative', width: '100%', overflowX: 'hidden' }}>
      {/* Modern Acid / Electric Cobalt Studio Ambient Background */}
      <div className="acid-bg-studio" />
      <div className="acid-grid-overlay" />

      {/* Main Content Container */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          minHeight: '100dvh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: viewState === 'stories' ? 'center' : 'flex-start',
          gap: viewState === 'stories' ? '0px' : '8px',
        }}
      >
        {/* Modern Acid Editorial Header Topbar */}
        {viewState !== 'stories' && (
          <header
            style={{
              padding: 'clamp(8px, 1.5vh, 14px) clamp(12px, 3vw, 24px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              maxWidth: '860px',
              margin: '0 auto',
              width: '100%',
              boxSizing: 'border-box',
              gap: '10px',
            }}
          >
            <div
              onClick={() => setViewState('idle')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'clamp(8px, 2.5vw, 14px)',
                cursor: 'pointer',
                userSelect: 'none',
                minWidth: 0,
                flex: 1,
              }}
            >
              <div
                style={{
                  width: 'clamp(30px, 7vw, 38px)',
                  height: 'clamp(30px, 7vw, 38px)',
                  flexShrink: 0,
                  background: '#0c0d11',
                  border: '2px solid #0c0d11',
                  boxShadow: '2.5px 2.5px 0px rgba(0,0,0,0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#d4ff00',
                  fontFamily: 'var(--font-maximalist)',
                  fontWeight: 900,
                  fontSize: 'clamp(1.0rem, 2.8vw, 1.3rem)',
                }}
              >
                ★
              </div>
              <div style={{ minWidth: 0, overflow: 'hidden' }}>
                <span
                  style={{
                    fontSize: 'clamp(1.15rem, 5.2vw, 1.9rem)',
                    fontWeight: 900,
                    fontFamily: 'var(--font-maximalist)',
                    color: '#0c0d11',
                    letterSpacing: '-0.5px',
                    textTransform: 'uppercase',
                    lineHeight: 1,
                    display: 'block',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  UNIVERSÁRIO
                </span>
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'clamp(0.52rem, 2.0vw, 0.68rem)',
                    color: '#ff5500',
                    letterSpacing: '1px',
                    lineHeight: 1.2,
                    fontWeight: 800,
                    marginTop: '2px',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  [ TIME CAPSULE // ARCHIVE ENGINE ]
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
              <span className="acid-tag acid-tag-lime" style={{ fontSize: '0.62rem', padding: '2px 6px' }}>
                VOL. 01
              </span>
            </div>
          </header>
        )}

        {/* Dynamic Body Content */}
        <div
          style={{
            flex: viewState === 'stories' ? 1 : '0 1 auto',
            display: 'flex',
            alignItems: viewState === 'stories' ? 'center' : 'flex-start',
            justifyContent: 'center',
            padding: viewState === 'stories' ? '2px' : '2px clamp(10px, 3vw, 20px) 16px clamp(10px, 3vw, 20px)',
            width: '100%',
            maxWidth: viewState === 'stories' ? '560px' : '840px',
            margin: '0 auto',
            boxSizing: 'border-box',
          }}
        >
          {viewState === 'idle' && (
            <div style={{ width: '100%' }}>
              {errorMessage && (
                <div
                  style={{
                    maxWidth: '520px',
                    margin: '0 auto 16px auto',
                    padding: '12px 16px',
                    borderRadius: '8px',
                    background: '#2a0c0c',
                    border: '2px solid #ff3b30',
                    color: '#ffffff',
                    fontFamily: 'var(--font-vcr)',
                    fontSize: '1.1rem',
                    letterSpacing: '1px',
                    textAlign: 'center',
                    boxShadow: '0 8px 24px rgba(255, 59, 48, 0.4)',
                  }}
                >
                  ⚠ {errorMessage}
                </div>
              )}
              <DateInputForm onSubmit={handleFormSubmit} isLoading={false} />
            </div>
          )}

          {viewState === 'photo' && pendingFormData && (
            <PhotoCaptureScreen
              userName={pendingFormData.name}
              onPhotoConfirmed={handlePhotoConfirmed}
              onSkip={handlePhotoSkipped}
            />
          )}

          {viewState === 'loading' && (
            <LoadingTimeline steps={LOADING_STEPS} currentStepIndex={currentStepIndex} />
          )}

          {viewState === 'stories' && birthData && (
            <StoryViewer data={birthData} onClose={handleCloseStories} />
          )}
        </div>

        {/* Acid Editorial Footer (Hidden in stories mode for maximum 9:16 vertical headroom) */}
        {viewState !== 'stories' && (
          <footer
            style={{
              padding: '16px 24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              maxWidth: '1100px',
              margin: '0 auto',
              width: '100%',
              flexWrap: 'wrap',
              gap: '10px',
              boxSizing: 'border-box',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.78rem',
                color: '#0c0d11',
                letterSpacing: '1px',
                fontWeight: 700,
              }}
            >
              [ ARCHIVE DECK // TIME MACHINE // 1920—2025 ]
            </div>

            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                color: '#555562',
                display: 'flex',
                gap: '12px',
                alignItems: 'center',
                fontWeight: 700,
              }}
            >
              <span>MADE FOR STORIES 9:16</span>
              <span>•</span>
              <span style={{ color: '#0c0d11', fontWeight: 900 }}>TYPE 01</span>
            </div>
          </footer>
        )}
      </div>
    </main>
  );
}
