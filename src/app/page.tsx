'use client';

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import DateInputForm from '@/components/DateInputForm';
import LoadingTimeline from '@/components/LoadingTimeline';
import StoryViewer from '@/components/StoryViewer';
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
  const [viewState, setViewState] = useState<'idle' | 'loading' | 'stories'>('idle');
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [birthData, setBirthData] = useState<BirthDataPayload | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleFetchBirthData = async (date: string, name?: string) => {
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
        body: JSON.stringify({ date, name }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erro ao resgatar dados históricos.');
      }

      const data: BirthDataPayload = await response.json();

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
      {/* 80s VCR Studio Ambient Background */}
      <div className="vhs-bg-studio" />

      {/* Main Content Container */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          minHeight: '100dvh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        {/* Retro VCR Header Topbar (Visible on landing/form, hidden in stories for immersive integrated header) */}
        {viewState !== 'stories' && (
          <header
            style={{
              padding: '16px 24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              maxWidth: '1100px',
              margin: '0 auto',
              width: '100%',
            }}
          >
            <div
              onClick={() => setViewState('idle')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                cursor: 'pointer',
                userSelect: 'none',
              }}
            >
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '8px',
                  background: 'linear-gradient(135deg, #1c202a 0%, #0d1016 100%)',
                  border: '2px solid #3d465c',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.4rem',
                }}
              >
                📼
              </div>
              <div>
                <span
                  style={{
                    fontSize: '1.75rem',
                    fontWeight: 900,
                    fontFamily: 'var(--font-heading)',
                    color: '#ffffff',
                    letterSpacing: '1.5px',
                    textTransform: 'uppercase',
                  }}
                >
                  UNIVERSÁRIO
                </span>
                <div
                  style={{
                    fontFamily: 'var(--font-vcr)',
                    fontSize: '0.96rem',
                    color: '#00ff88',
                    letterSpacing: '1.5px',
                    lineHeight: 1,
                    fontWeight: 700,
                  }}
                >
                  VHS / VCR RETRO ENGINE • NTSC HI-FI
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <VcrOsdBadge text="REC ● NTSC" variant="rec" />
            </div>
          </header>
        )}

        {/* Dynamic Body Content */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: viewState === 'stories' ? '8px 10px' : '20px 16px',
            width: '100%',
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
              <DateInputForm onSubmit={handleFetchBirthData} isLoading={false} />
            </div>
          )}

          {viewState === 'loading' && (
            <LoadingTimeline steps={LOADING_STEPS} currentStepIndex={currentStepIndex} />
          )}

          {viewState === 'stories' && birthData && (
            <StoryViewer data={birthData} onClose={handleCloseStories} />
          )}
        </div>

        {/* Retro 80s VCR Studio Footer */}
        <footer
          style={{
            padding: viewState === 'stories' ? '10px 14px' : '16px 20px',
            textAlign: 'center',
            color: '#ffffff',
            borderTop: '1px solid #1f2533',
            background: 'rgba(9, 11, 16, 0.88)',
            backdropFilter: 'blur(8px)',
          }}
        >
          <div
            style={{
              fontFamily: 'var(--font-vcr)',
              fontSize: viewState === 'stories' ? '0.90rem' : '1.05rem',
              color: '#ffe600',
              letterSpacing: '1.5px',
              marginBottom: '2px',
            }}
          >
            ★ UNIVERSÁRIO • VCR ARCHIVE ENGINE ★
          </div>
          <p
            style={{
              color: '#8b9bb4',
              fontSize: viewState === 'stories' ? '0.76rem' : '0.84rem',
              fontFamily: 'var(--font-mono)',
              letterSpacing: '0.5px',
            }}
          >
            Paradas Nacionais & Internacionais, Astronomia & Arquivos Históricos em Stories 9:16
          </p>
        </footer>
      </div>
    </main>
  );
}
