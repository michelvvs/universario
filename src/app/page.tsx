'use client';

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import DateInputForm from '@/components/DateInputForm';
import LoadingTimeline from '@/components/LoadingTimeline';
import StoryViewer from '@/components/StoryViewer';
import { BirthDataPayload, LoadingStep } from '@/types/universario';
import { Sparkles, Disc3, Tv, Flame, Radio } from 'lucide-react';

const LOADING_STEPS: LoadingStep[] = [
  {
    id: 'astronomy',
    label: 'Calculando fase da lua e coordenadas estelares',
    sublabel: 'Determinando luminosidade, constelação e mapa celeste...',
    icon: '🌕',
    status: 'pending',
  },
  {
    id: 'music',
    label: 'Sintonizando paradas de sucesso (Rádios, Vendas & Billboard)',
    sublabel: 'Rebobinando fitas cassete e resgatando LPs #1...',
    icon: '📼',
    status: 'pending',
  },
  {
    id: 'news',
    label: 'Consultando manchetes e jornais históricos',
    sublabel: 'Acessando arquivos de notícias do Brasil e do mundo...',
    icon: '📰',
    status: 'pending',
  },
  {
    id: 'popculture',
    label: 'Reunindo cinema, novelas e cultura pop da época',
    sublabel: 'Localizando filmes em cartaz e nostalgia 80s...',
    icon: '🎬',
    status: 'pending',
  },
  {
    id: 'rendering',
    label: 'Gravando seus Stories retrô em 9:16 HD',
    sublabel: 'Aplicando scanlines CRT, vinil giratório e estética Memphis...',
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

    const stepInterval = 450;
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

      const remainingTime = Math.max(200, (LOADING_STEPS.length - currentStep) * stepInterval);
      setTimeout(() => {
        clearInterval(stepTimer);
        setCurrentStepIndex(LOADING_STEPS.length - 1);

        setTimeout(() => {
          setBirthData(data);
          setViewState('stories');

          // Celebration Confetti 80s Neon Colors
          try {
            confetti({
              particleCount: 100,
              spread: 80,
              origin: { y: 0.6 },
              colors: ['#ff2a85', '#00f0ff', '#ffde59', '#7928ca', '#26ffdf'],
            });
          } catch {}
        }, 300);
      }, remainingTime);
    } catch (err: unknown) {
      clearInterval(stepTimer);
      setViewState('idle');
      const error = err as Error;
      setErrorMessage(error.message || 'Houve um imprevisto ao buscar os dados. Tente novamente.');
    }
  };

  const handleCloseStories = () => {
    setViewState('idle');
  };

  return (
    <main style={{ minHeight: '100vh', position: 'relative', width: '100%', overflowX: 'hidden' }}>
      {/* 80s Synthwave Grid & Memphis Background */}
      <div className="memphis-bg" />

      {/* Floating Memphis Geometric Accents */}
      <div
        className="animate-float-1"
        style={{
          position: 'fixed',
          top: '12%',
          left: '6%',
          width: '32px',
          height: '32px',
          border: '4px solid #00f0ff',
          borderRadius: '6px',
          pointerEvents: 'none',
          zIndex: 0,
          opacity: 0.6,
        }}
      />
      <div
        className="animate-float-2"
        style={{
          position: 'fixed',
          top: '25%',
          right: '8%',
          width: '0',
          height: '0',
          borderLeft: '20px solid transparent',
          borderRight: '20px solid transparent',
          borderBottom: '36px solid #ffde59',
          pointerEvents: 'none',
          zIndex: 0,
          opacity: 0.7,
        }}
      />
      <div
        className="animate-float-1"
        style={{
          position: 'fixed',
          bottom: '20%',
          left: '8%',
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, #ff2a85 40%, transparent 42%)',
          backgroundSize: '12px 12px',
          pointerEvents: 'none',
          zIndex: 0,
          opacity: 0.6,
        }}
      />
      <div
        className="animate-float-2"
        style={{
          position: 'fixed',
          bottom: '15%',
          right: '7%',
          color: '#26ffdf',
          fontSize: '2rem',
          fontFamily: 'var(--font-80s)',
          pointerEvents: 'none',
          zIndex: 0,
          opacity: 0.6,
        }}
      >
        ✦ 〰
      </div>

      {/* Main Content Container */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        {/* Retro Header Topbar */}
        <header
          style={{
            padding: '20px 24px',
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
                borderRadius: '12px',
                background: '#ffe600',
                border: '2.5px solid #111111',
                boxShadow: '3px 3px 0px #111111, 6px 6px 0px #ff2a85',
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
                  fontSize: '1.7rem',
                  fontWeight: 900,
                  fontFamily: 'var(--font-80s)',
                  color: '#ffffff',
                }}
                className="text-chromatic"
              >
                UNIVERSÁRIO
              </span>
              <div
                style={{
                  fontFamily: 'var(--font-crt)',
                  fontSize: '0.95rem',
                  color: '#ffe600',
                  letterSpacing: '1px',
                  lineHeight: 1,
                  fontWeight: 700,
                }}
              >
                MEMPHIS RETRO STORIES • 80s/90s
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                background: '#ffffff',
                border: '2px solid #111111',
                borderRadius: '8px',
                padding: '4px 12px',
                fontFamily: 'var(--font-80s)',
                fontSize: '0.80rem',
                color: '#111111',
                boxShadow: '2.5px 2.5px 0px #ff2a85',
                letterSpacing: '0.5px',
              }}
            >
              <span
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: '#ff2a85',
                  display: 'inline-block',
                }}
                className="animate-pulse"
              />
              <span>REC 80s</span>
            </span>
          </div>
        </header>

        {/* Dynamic Body Content */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px 16px',
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
                    borderRadius: '12px',
                    background: '#ff66aa',
                    border: '3px solid #111111',
                    color: '#111111',
                    fontFamily: 'var(--font-80s)',
                    fontSize: '0.95rem',
                    textAlign: 'center',
                    boxShadow: '4px 4px 0px #111111',
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

        {/* Retro 80s Footer */}
        <footer
          style={{
            padding: '18px 20px',
            textAlign: 'center',
            color: '#ffffff',
            fontSize: '0.85rem',
            borderTop: '2px dashed rgba(255, 255, 255, 0.25)',
            background: 'rgba(17, 17, 17, 0.75)',
            backdropFilter: 'blur(6px)',
          }}
        >
          <div style={{ fontFamily: 'var(--font-80s)', fontSize: '0.95rem', color: '#ffe600', marginBottom: '4px' }}>
            ★ UNIVERSÁRIO • MEMPHIS 80s/90s RETRO ENGINE ★
          </div>
          <p style={{ color: '#cbd5e1', fontSize: '0.80rem' }}>
            Paradas Nacionais & Internacionais, Astronomia & Arquivos Históricos em Stories 9:16
          </p>
        </footer>
      </div>
    </main>
  );
}
