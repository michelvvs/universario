'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { BirthDataPayload } from '@/types/universario';
import {
  ChevronLeft,
  ChevronRight,
  RotateCcw,
} from 'lucide-react';
import SlideIntro from './slides/SlideIntro';
import SlideMoonAstronomy from './slides/SlideMoonAstronomy';
import SlideMusicCategory from './slides/SlideMusicCategory';
import SlideNewsHistory from './slides/SlideNewsHistory';
import SlidePopCulture from './slides/SlidePopCulture';
import SlideCosmicStats from './slides/SlideCosmicStats';
import SlideSummaryCard from './slides/SlideSummaryCard';
import ExportControls from './ExportControls';
import RetroAudioPlayer from './RetroAudioPlayer';

interface StoryViewerProps {
  data: BirthDataPayload;
  onClose: () => void;
}

const SLIDE_DURATION_MS = 7000; // 7.0s per story reading indicator

export default function StoryViewer({ data, onClose }: StoryViewerProps) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);
  const [isChannelSwitching, setIsChannelSwitching] = useState<boolean>(true);

  const activeSlideRef = useRef<HTMLDivElement>(null);
  const hiddenSlideRefs = useRef<(HTMLDivElement | null)[]>([]);

  const slides = [
    { id: 'intro', component: <SlideIntro data={data} />, title: 'Início 80s' },
    { id: 'moon', component: <SlideMoonAstronomy data={data} />, title: 'Céu & Lua' },
    { id: 'music_radio', component: <SlideMusicCategory data={data} categoryId="radio_br" />, title: 'Top 5 Rádios BR' },
    { id: 'music_sales', component: <SlideMusicCategory data={data} categoryId="sales_br" />, title: 'Top 5 Vendas BR' },
    { id: 'music_billboard', component: <SlideMusicCategory data={data} categoryId="billboard" />, title: 'Top 5 Billboard' },
    { id: 'news', component: <SlideNewsHistory data={data} />, title: 'Jornais da Época' },
    { id: 'pop', component: <SlidePopCulture data={data} />, title: 'Cinema & TV' },
    { id: 'stats', component: <SlideCosmicStats data={data} />, title: 'Placar Cósmico' },
    { id: 'summary', component: <SlideSummaryCard data={data} />, title: 'Passaporte VIP' },
  ];

  const totalSlides = slides.length;
  const isTimeComplete = progress >= 100;
  const showPrev = currentSlideIndex > 0;
  const showNext = currentSlideIndex < totalSlides - 1;

  const goToNextSlide = useCallback(() => {
    if (currentSlideIndex < totalSlides - 1) {
      setCurrentSlideIndex((prev) => prev + 1);
      setProgress(0);
    }
  }, [currentSlideIndex, totalSlides]);

  const goToPrevSlide = useCallback(() => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex((prev) => prev - 1);
      setProgress(0);
    }
  }, [currentSlideIndex]);

  // Trigger TV Channel Switch Static & Beam flash on slide change
  useEffect(() => {
    setIsChannelSwitching(true);
    const timer = setTimeout(() => {
      setIsChannelSwitching(false);
    }, 600);
    return () => clearTimeout(timer);
  }, [currentSlideIndex]);

  // Story progress timer
  useEffect(() => {
    setProgress(0);
    const intervalMs = 50;
    const increment = (intervalMs / SLIDE_DURATION_MS) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          return 100;
        }
        return Math.min(100, prev + increment);
      });
    }, intervalMs);

    return () => clearInterval(timer);
  }, [currentSlideIndex]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ' || e.code === 'Space') {
        goToNextSlide();
      } else if (e.key === 'ArrowLeft') {
        goToPrevSlide();
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToNextSlide, goToPrevSlide, onClose]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        padding: '4px 8px 16px 8px',
        position: 'relative',
        zIndex: 10,
      }}
    >
      {/* 80s VCR Audio Player */}
      <RetroAudioPlayer
        music={data.music}
        isStoryPaused={false}
        year={data.year}
      />

      {/* Main Stories Frame Container with Floating Navigations */}
      <div
        className="story-container-wrapper"
        style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          maxWidth: '560px',
        }}
      >
        {/* Floating Previous Navigation Button (Shown ONLY from 2nd slide onwards) */}
        {showPrev && (
          <button
            type="button"
            onClick={goToPrevSlide}
            aria-label="Story anterior"
            title="Voltar ao story anterior"
            className="story-floating-nav-btn story-nav-prev"
            style={{
              zIndex: 50,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '46px',
              height: '46px',
              borderRadius: '50%',
              background: '#161922',
              border: '2px solid #00ff88',
              color: '#00ff88',
              boxShadow: '0 0 16px rgba(0, 255, 136, 0.4), 0 4px 12px rgba(0,0,0,0.8)',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
          >
            <ChevronLeft size={28} color="#00ff88" />
          </button>
        )}

        {/* 9:16 Story Frame with VCR Chassis Border */}
        <div className="story-wrapper crt-overlay film-grain">
          {/* Authentic Worn VHS Slipcase Texture Overlay with Magnetic Ring Wear */}
          <div className="vhs-worn-sleeve-overlay" aria-hidden="true" />

          {/* Classic Slipcase Cardboard Thumb Notch */}
          <div className="vhs-thumb-notch" aria-hidden="true" />

          {/* TV Channel Switch CRT Static Noise Overlay */}
          {isChannelSwitching && <div className="tv-static-burst" />}

          {/* TV Channel Switch Horizontal Electron Beam Flash */}
          {isChannelSwitching && <div className="tv-beam-line" />}

          {/* Retro Phosphor-Green Channel OSD (e.g. CH 01, CH 02) */}
          {isChannelSwitching && (
            <div className="tv-channel-hud">
              CH {String(currentSlideIndex + 1).padStart(2, '0')}
            </div>
          )}

          {/* Top Progress Bars (Segmented Story Bars) */}
          <div className="story-progress-container">
            {slides.map((_, idx) => {
              let fillWidth = 0;
              if (idx < currentSlideIndex) fillWidth = 100;
              else if (idx === currentSlideIndex) fillWidth = progress;

              return (
                <div key={idx} className="story-progress-bar">
                  <div
                    className="story-progress-fill"
                    style={{
                      width: `${fillWidth}%`,
                      transition: idx === currentSlideIndex ? 'width 0.05s linear' : 'none',
                    }}
                  />
                </div>
              );
            })}
          </div>

          {/* Integrated Story Header (Seamless Retro VCR Bar without close button) */}
          <div className="story-integrated-header">
            <div className="story-integrated-header-left">
              <span className="story-integrated-badge">📼 {data.name ? data.name.toUpperCase() : 'UNIVERSÁRIO'}</span>
              <span className="story-integrated-sep">•</span>
              <span className="story-integrated-topic">{slides[currentSlideIndex]?.title || ''}</span>
            </div>
            <div className="story-integrated-header-right">
              <span className="story-integrated-date">
                {data.dayOfMonth} {data.monthName.slice(0, 3).toUpperCase()} {data.year}
              </span>
            </div>
          </div>

          {/* Interactive Touch Tap Areas */}
          {showPrev && (
            <div
              className="story-touch-left"
              onClick={(e) => {
                e.stopPropagation();
                goToPrevSlide();
              }}
              title="Toque para voltar"
            />
          )}
          <div
            className="story-touch-right"
            onClick={(e) => {
              e.stopPropagation();
              goToNextSlide();
            }}
            title="Toque para avançar"
          />

          {/* Active Visible Slide DOM Container with TV Channel Snap-in Transition */}
          <div
            key={currentSlideIndex}
            ref={activeSlideRef}
            className="slide-channel-enter"
            style={{ width: '100%', height: '100%' }}
          >
            {(slides[currentSlideIndex] || slides[0]).component}
          </div>
        </div>

        {/* Floating Next Navigation Button */}
        {showNext && (
          <button
            type="button"
            onClick={goToNextSlide}
            aria-label="Próximo story"
            title="Avançar para o próximo story"
            className={`story-floating-nav-btn story-nav-next ${isTimeComplete ? 'pulse-ready' : ''}`}
            style={{
              zIndex: 50,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '46px',
              height: '46px',
              borderRadius: '50%',
              background: '#161922',
              border: '2px solid #ffe600',
              color: '#ffe600',
              boxShadow: '0 0 16px rgba(255, 230, 0, 0.4), 0 4px 12px rgba(0,0,0,0.8)',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
          >
            <ChevronRight size={28} color="#ffe600" />
          </button>
        )}
      </div>

      {/* Story Footer Controls: Regenerate Button & Export Controls */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          maxWidth: '480px',
          marginTop: '12px',
          gap: '8px',
        }}
      >
        {/* Regenerate Button */}
        <button
          type="button"
          onClick={onClose}
          className="btn-vhs-regenerate"
          aria-label="Gerar novamente"
          title="Inserir nova data e gerar outro Universário"
        >
          <RotateCcw size={18} />
          <span>GERAR NOVAMENTE</span>
        </button>

        {/* Export Controls for PNG / ZIP */}
        <ExportControls
          currentSlideElement={hiddenSlideRefs.current[currentSlideIndex] || activeSlideRef.current}
          allSlideElements={hiddenSlideRefs.current.filter((el): el is HTMLDivElement => el !== null)}
          formattedDate={data.formattedDate}
          onPause={() => {}}
          onResume={() => {}}
        />
      </div>

      {/* Hidden 1080x1920 Story Canvas Elements for High-Res 9:16 PNG / ZIP Export */}
      <div
        style={{
          position: 'fixed',
          left: '-9999px',
          top: 0,
          opacity: 0,
          pointerEvents: 'none',
          zIndex: -9999,
        }}
      >
        {slides.map((slide, idx) => (
          <div
            key={slide.id}
            ref={(el) => {
              hiddenSlideRefs.current[idx] = el;
            }}
            style={{
              width: '1080px',
              height: '1920px',
              transform: 'none',
            }}
          >
            {slide.component}
          </div>
        ))}
      </div>

      <style jsx>{`
        /* Desktop Positioning: Beside Story Frame */
        @media (min-width: 640px) {
          .story-nav-prev {
            position: relative;
            margin-right: 18px;
          }
          .story-nav-next {
            position: relative;
            margin-left: 18px;
          }
        }

        /* Mobile / Smaller Screens: Floating gracefully inside/over the edge */
        @media (max-width: 639px) {
          .story-nav-prev {
            position: absolute !important;
            top: 50% !important;
            left: 6px !important;
            transform: translateY(-50%) !important;
            width: 36px !important;
            height: 36px !important;
            opacity: 0.9;
          }
          .story-nav-next {
            position: absolute !important;
            top: 50% !important;
            right: 6px !important;
            transform: translateY(-50%) !important;
            width: 36px !important;
            height: 36px !important;
            opacity: 0.9;
          }
        }

        .pulse-ready {
          animation: pulseBorder 1.2s infinite alternate ease-in-out;
        }

        @keyframes pulseBorder {
          0% {
            transform: scale(1);
            box-shadow: 0 0 10px rgba(255, 230, 0, 0.4);
          }
          100% {
            transform: scale(1.1);
            box-shadow: 0 0 22px rgba(255, 230, 0, 0.9);
          }
        }

        .animate-pulse-glow {
          animation: pulseGlowBtn 1.5s infinite alternate ease-in-out;
        }

        @keyframes pulseGlowBtn {
          0% {
            transform: scale(1);
            box-shadow: 0 0 10px rgba(255, 42, 42, 0.7);
          }
          100% {
            transform: scale(1.05);
            box-shadow: 0 0 22px rgba(255, 42, 42, 1);
          }
        }
      `}</style>
    </div>
  );
}
