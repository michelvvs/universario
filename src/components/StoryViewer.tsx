'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { BirthDataPayload } from '@/types/universario';
import {
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  X,
  Radio,
  Tv,
} from 'lucide-react';
import SlideIntro from './slides/SlideIntro';
import SlideMoonAstronomy from './slides/SlideMoonAstronomy';
import SlideMusicCategory from './slides/SlideMusicCategory';
import SlideNewsHistory from './slides/SlideNewsHistory';
import SlidePopCulture from './slides/SlidePopCulture';
import SlideCosmicStats from './slides/SlideCosmicStats';
import SlideSummaryCard from './slides/SlideSummaryCard';
import ExportControls from './ExportControls';

interface StoryViewerProps {
  data: BirthDataPayload;
  onClose: () => void;
}

const SLIDE_DURATION_MS = 7000; // 7.0s per story slide

export default function StoryViewer({ data, onClose }: StoryViewerProps) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
  const [isManualPaused, setIsManualPaused] = useState<boolean>(false);
  const [isHolding, setIsHolding] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);

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
  const isPaused = isManualPaused || isHolding;

  const goToNextSlide = useCallback(() => {
    if (currentSlideIndex < totalSlides - 1) {
      setCurrentSlideIndex((prev) => prev + 1);
      setProgress(0);
    } else {
      setIsManualPaused(true);
      setProgress(100);
    }
  }, [currentSlideIndex, totalSlides]);

  const goToPrevSlide = useCallback(() => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex((prev) => prev - 1);
      setProgress(0);
    } else {
      setProgress(0);
    }
  }, [currentSlideIndex]);

  // Story progress timer
  useEffect(() => {
    if (isPaused) return;

    const intervalMs = 50;
    const increment = (intervalMs / SLIDE_DURATION_MS) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          goToNextSlide();
          return 0;
        }
        return prev + increment;
      });
    }, intervalMs);

    return () => clearInterval(timer);
  }, [isPaused, goToNextSlide]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        goToNextSlide();
      } else if (e.key === 'ArrowLeft') {
        goToPrevSlide();
      } else if (e.key === ' ' || e.code === 'Space') {
        e.preventDefault();
        setIsManualPaused((prev) => !prev);
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToNextSlide, goToPrevSlide, onClose]);

  const togglePause = () => {
    setIsManualPaused((prev) => !prev);
  };

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
      {/* Desktop Quick Navigation Arrows */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '16px',
          width: '100%',
          maxWidth: '600px',
        }}
      >
        <button
          type="button"
          onClick={goToPrevSlide}
          disabled={currentSlideIndex === 0}
          aria-label="Slide anterior"
          style={{
            display: 'none',
            alignItems: 'center',
            justifyContent: 'center',
            width: '46px',
            height: '46px',
            borderRadius: '12px',
            background: '#16082f',
            border: '2px solid #00f0ff',
            color: currentSlideIndex === 0 ? '#475569' : '#ffffff',
            boxShadow: currentSlideIndex === 0 ? 'none' : '3px 3px 0px #ff2a85',
            cursor: currentSlideIndex === 0 ? 'default' : 'pointer',
            transition: 'all 0.15s',
          }}
          className="desktop-nav-btn"
        >
          <ChevronLeft size={24} color={currentSlideIndex === 0 ? '#475569' : '#00f0ff'} />
        </button>

        {/* 9:16 Instagram Story Frame with CRT & Film Grain Overlays */}
        <div className="story-wrapper crt-overlay film-grain">
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

          {/* Top Story Header / Profile info & VHS OSD Timecode */}
          <div className="story-header">
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div className="story-avatar">📼</div>
              <div className="story-user-info">
                <span className="story-user-name">
                  {data.name || 'Universário 80s'}
                </span>
                <span className="story-user-date">
                  {data.dayOfMonth} {data.monthName.toUpperCase()} {data.year}
                </span>
              </div>
            </div>

            {/* Header Control Buttons */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {isPaused ? (
                <span
                  style={{
                    padding: '2px 8px',
                    borderRadius: '6px',
                    background: '#ff2a85',
                    border: '1px solid #ffffff',
                    color: '#ffffff',
                    fontFamily: 'var(--font-crt)',
                    fontSize: '0.85rem',
                    letterSpacing: '1px',
                    boxShadow: '0 0 6px #ff2a85',
                  }}
                >
                  PAUSED ❚❚
                </span>
              ) : (
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontFamily: 'var(--font-crt)',
                    fontSize: '0.85rem',
                    color: '#00f0ff',
                    textShadow: '0 0 4px #00f0ff',
                  }}
                >
                  PLAY ►
                </span>
              )}

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  togglePause();
                }}
                aria-label={isPaused ? 'Continuar reprodução' : 'Pausar stories'}
                title={isPaused ? 'Clique para continuar' : 'Clique para pausar'}
                style={{
                  background: isPaused ? '#ff2a85' : '#16082f',
                  border: '2px solid #00f0ff',
                  borderRadius: '10px',
                  width: '34px',
                  height: '34px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  cursor: 'pointer',
                  boxShadow: '2px 2px 0px #ff2a85',
                  transition: 'all 0.15s ease',
                }}
              >
                {isPaused ? <Play size={15} color="#ffffff" style={{ marginLeft: '2px' }} /> : <Pause size={15} color="#00f0ff" />}
              </button>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onClose();
                }}
                aria-label="Fechar e escolher nova data"
                style={{
                  background: '#16082f',
                  border: '2px solid #ffde59',
                  borderRadius: '10px',
                  width: '34px',
                  height: '34px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffde59',
                  cursor: 'pointer',
                  boxShadow: '2px 2px 0px #ff2a85',
                }}
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Interactive Touch Tap Areas */}
          <div
            className="story-touch-left"
            onClick={(e) => {
              e.stopPropagation();
              goToPrevSlide();
            }}
          />
          <div
            className="story-touch-right"
            onClick={(e) => {
              e.stopPropagation();
              goToNextSlide();
            }}
          />

          {/* Active Visible Slide DOM Container */}
          <div ref={activeSlideRef} style={{ width: '100%', height: '100%' }}>
            {(slides[currentSlideIndex] || slides[0]).component}
          </div>
        </div>

        <button
          type="button"
          onClick={goToNextSlide}
          disabled={currentSlideIndex === totalSlides - 1}
          aria-label="Próximo slide"
          style={{
            display: 'none',
            alignItems: 'center',
            justifyContent: 'center',
            width: '46px',
            height: '46px',
            borderRadius: '12px',
            background: '#16082f',
            border: '2px solid #ff2a85',
            color: currentSlideIndex === totalSlides - 1 ? '#475569' : '#ffffff',
            boxShadow: currentSlideIndex === totalSlides - 1 ? 'none' : '3px 3px 0px #00f0ff',
            cursor: currentSlideIndex === totalSlides - 1 ? 'default' : 'pointer',
            transition: 'all 0.15s',
          }}
          className="desktop-nav-btn"
        >
          <ChevronRight size={24} color={currentSlideIndex === totalSlides - 1 ? '#475569' : '#ff2a85'} />
        </button>
      </div>

      {/* Export Controls for PNG / ZIP */}
      <ExportControls
        currentSlideElement={activeSlideRef.current}
        allSlideElements={hiddenSlideRefs.current.filter((el): el is HTMLDivElement => el !== null)}
        formattedDate={data.formattedDate}
        onPause={() => setIsManualPaused(true)}
        onResume={() => setIsManualPaused(false)}
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
        @media (min-width: 640px) {
          .desktop-nav-btn {
            display: flex !important;
          }
        }
      `}</style>
    </div>
  );
}
