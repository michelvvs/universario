'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { BirthDataPayload } from '@/types/universario';
import {
  ChevronLeft,
  ChevronRight,
  X,
  Sparkles,
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
    }, 750);
    return () => clearTimeout(timer);
  }, [currentSlideIndex]);

  // Story progress timer - fills up to 100% and stays, waiting for user to advance manually
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
        minHeight: '100vh',
        width: '100%',
        padding: '16px 12px 24px 12px',
        position: 'relative',
        zIndex: 10,
      }}
    >
      {/* 80s Cassette Walkman Audio Player */}
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
              background: '#ffffff',
              border: '3px solid #111111',
              color: '#111111',
              boxShadow: '3px 3px 0px #111111, 6px 6px 0px #00d2ff',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
          >
            <ChevronLeft size={28} color="#111111" />
          </button>
        )}

        {/* 9:16 Instagram Story Frame with CRT & Film Grain Overlays */}
        <div className="story-wrapper crt-overlay film-grain">
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

          {/* Top Progress Bars (Instagram Stories Segmented) */}
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

          {/* Top Story Header / Profile info & Close Button in Solid High-Contrast Pill */}
          <div className="story-header-pill">
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div className="story-avatar">📼</div>
              <div className="story-user-info">
                <span className="story-user-name">
                  {data.name || 'Universário'}
                </span>
                <span className="story-user-date">
                  {data.dayOfMonth} {data.monthName.toUpperCase()} {data.year}
                </span>
              </div>
            </div>

            {/* Header Right Action: Close Button */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onClose();
                }}
                aria-label="Fechar e escolher nova data"
                title="Fechar retrospectiva"
                style={{
                  background: '#ffe600',
                  border: '2px solid #111111',
                  borderRadius: '8px',
                  width: '30px',
                  height: '30px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#111111',
                  cursor: 'pointer',
                  boxShadow: '1.5px 1.5px 0px #111111',
                }}
              >
                <X size={16} color="#111111" />
              </button>
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

          {/* Prompt when reading time finishes, reminding to click next */}
          {isTimeComplete && showNext && (
            <button
              type="button"
              onClick={goToNextSlide}
              className="story-next-prompt-pill animate-pulse-glow"
              style={{
                position: 'absolute',
                bottom: '22px',
                right: '16px',
                zIndex: 45,
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                background: '#ff2a85',
                border: '2.5px solid #111111',
                borderRadius: '999px',
                padding: '6px 14px',
                color: '#ffffff',
                fontFamily: 'var(--font-80s)',
                fontSize: '0.76rem',
                letterSpacing: '0.5px',
                boxShadow: '3px 3px 0px #111111, 6px 6px 0px #ffe600',
                cursor: 'pointer',
              }}
            >
              <span>PRÓXIMO STORY</span>
              <ChevronRight size={15} color="#ffffff" />
            </button>
          )}
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
              background: '#ffffff',
              border: '3px solid #111111',
              color: '#111111',
              boxShadow: '3px 3px 0px #111111, 6px 6px 0px #ff2a85',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
          >
            <ChevronRight size={28} color="#111111" />
          </button>
        )}
      </div>

      {/* Export Controls for PNG / ZIP */}
      <ExportControls
        currentSlideElement={activeSlideRef.current}
        allSlideElements={hiddenSlideRefs.current.filter((el): el is HTMLDivElement => el !== null)}
        formattedDate={data.formattedDate}
        onPause={() => {}}
        onResume={() => {}}
      />

      {/* Hidden 1080x1920 Story Canvas Elements for High-Res Batch Export */}
      <div
        style={{
          position: 'absolute',
          top: '-99999px',
          left: '-99999px',
          visibility: 'hidden',
          pointerEvents: 'none',
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

        /* Mobile / Smaller Screens: Floating slightly outside the story boundaries */
        @media (max-width: 639px) {
          .story-nav-prev {
            position: absolute !important;
            top: 50% !important;
            left: -10px !important;
            transform: translateY(-50%) !important;
            width: 42px !important;
            height: 42px !important;
          }
          .story-nav-next {
            position: absolute !important;
            top: 50% !important;
            right: -10px !important;
            transform: translateY(-50%) !important;
            width: 42px !important;
            height: 42px !important;
          }
        }

        .pulse-ready {
          animation: pulseBorder 1.2s infinite alternate ease-in-out;
        }

        @keyframes pulseBorder {
          0% {
            transform: scale(1);
            box-shadow: 3px 3px 0px #00f0ff, 0 0 10px rgba(255, 42, 133, 0.4);
          }
          100% {
            transform: scale(1.1);
            box-shadow: 3px 3px 0px #00f0ff, 0 0 22px rgba(255, 42, 133, 0.9);
          }
        }

        .animate-pulse-glow {
          animation: pulseGlowBtn 1.5s infinite alternate ease-in-out;
        }

        @keyframes pulseGlowBtn {
          0% {
            transform: scale(1);
            box-shadow: 0 0 10px rgba(255, 42, 133, 0.7), 2px 2px 0px #00f0ff;
          }
          100% {
            transform: scale(1.05);
            box-shadow: 0 0 20px rgba(255, 42, 133, 1), 2px 2px 0px #00f0ff;
          }
        }
      `}</style>
    </div>
  );
}
