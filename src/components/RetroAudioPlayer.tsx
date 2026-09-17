'use client';

import React, { useState, useEffect, useRef } from 'react';
import { MusicData, MusicTrack } from '@/types/universario';
import {
  Volume2,
  VolumeX,
  Play,
  Pause,
  Tv,
  X,
  Radio,
  Disc3,
  Globe,
  ExternalLink,
} from 'lucide-react';

interface RetroAudioPlayerProps {
  music: MusicData;
  isStoryPaused?: boolean;
  onToggleStoryPause?: () => void;
  year?: number;
}

// Global declaration for YouTube Iframe API
declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

export default function RetroAudioPlayer({
  music,
  isStoryPaused,
  year = 1989,
}: RetroAudioPlayerProps) {
  const globalTrack = music.globalTopTrack || music.billboardTop5?.[0];
  const radioBrTrack = music.brazilTopTrack || music.brazilRadioTop5?.[0];
  const salesBrTrack = music.brazilSalesTrack || music.brazilSalesTop5?.[0];

  const availableTracks: Array<{ id: 'billboard' | 'radio' | 'sales'; label: string; icon: string; track: MusicTrack }> = [];

  if (globalTrack) {
    availableTracks.push({ id: 'billboard', label: '#1 Billboard (Mundo)', icon: '🌎', track: globalTrack });
  }
  if (radioBrTrack) {
    availableTracks.push({ id: 'radio', label: '#1 Rádios Brasil', icon: '📻', track: radioBrTrack });
  }
  if (salesBrTrack) {
    availableTracks.push({ id: 'sales', label: '#1 Vendas Brasil', icon: '💿', track: salesBrTrack });
  }

  const [selectedTrackIndex, setSelectedTrackIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [hasInteracted, setHasInteracted] = useState<boolean>(false);
  const [showTvModal, setShowTvModal] = useState<boolean>(false);
  const [ytReady, setYtReady] = useState<boolean>(false);

  const activeItem = availableTracks[selectedTrackIndex] || availableTracks[0];
  const activeTrack = activeItem?.track;
  const videoId = activeTrack?.youtubeVideoId;
  const audioPreviewUrl = activeTrack?.audioPreviewUrl;

  const playerContainerRef = useRef<HTMLDivElement>(null);
  const ytPlayerRef = useRef<any>(null);
  const audioFallbackRef = useRef<HTMLAudioElement | null>(null);

  // Load YouTube Iframe API once
  useEffect(() => {
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

      window.onYouTubeIframeAPIReady = () => {
        setYtReady(true);
      };
    } else {
      setYtReady(true);
    }
  }, []);

  // Initialize or re-create YouTube Player when videoId changes
  useEffect(() => {
    if (!ytReady || !videoId) return;

    try {
      if (ytPlayerRef.current) {
        if (typeof ytPlayerRef.current.loadVideoById === 'function') {
          ytPlayerRef.current.loadVideoById({
            videoId: videoId,
            startSeconds: 0,
          });
          if (isPlaying) {
            ytPlayerRef.current.playVideo();
          }
          if (isMuted) {
            ytPlayerRef.current.mute();
          } else {
            ytPlayerRef.current.unMute();
          }
          return;
        } else {
          try {
            ytPlayerRef.current.destroy();
          } catch {}
          ytPlayerRef.current = null;
        }
      }

      if (window.YT && window.YT.Player) {
        ytPlayerRef.current = new window.YT.Player('retro-youtube-iframe-target', {
          height: '100%',
          width: '100%',
          videoId: videoId,
          playerVars: {
            autoplay: isPlaying ? 1 : 0,
            controls: 1,
            enablejsapi: 1,
            playsinline: 1,
            origin: typeof window !== 'undefined' ? window.location.origin : '',
            modestbranding: 1,
            rel: 0,
          },
          events: {
            onReady: (event: any) => {
              if (isPlaying) {
                event.target.playVideo();
              }
              if (isMuted) {
                event.target.mute();
              } else {
                event.target.unMute();
              }
            },
            onStateChange: (event: any) => {
              // 1 = PLAYING, 2 = PAUSED
              if (event.data === 1) {
                setIsPlaying(true);
              } else if (event.data === 2) {
                setIsPlaying(false);
              }
            },
          },
        });
      }
    } catch (e) {
      console.error('Error with YouTube Player:', e);
    }
  }, [ytReady, videoId]);

  // Audio Fallback for audioPreviewUrl if no YouTube video ID
  useEffect(() => {
    if (!videoId && audioPreviewUrl) {
      if (!audioFallbackRef.current) {
        audioFallbackRef.current = new Audio(audioPreviewUrl);
        audioFallbackRef.current.loop = true;
      } else {
        audioFallbackRef.current.src = audioPreviewUrl;
      }

      if (isPlaying && !isMuted) {
        audioFallbackRef.current.play().catch(() => {});
      } else {
        audioFallbackRef.current.pause();
      }
    } else if (audioFallbackRef.current) {
      audioFallbackRef.current.pause();
    }
  }, [videoId, audioPreviewUrl, isPlaying, isMuted]);

  // Sync with Story pause state optionally
  useEffect(() => {
    if (isStoryPaused) {
      if (ytPlayerRef.current && typeof ytPlayerRef.current.pauseVideo === 'function') {
        ytPlayerRef.current.pauseVideo();
      }
      if (audioFallbackRef.current) {
        audioFallbackRef.current.pause();
      }
      setIsPlaying(false);
    } else {
      if (hasInteracted) {
        if (ytPlayerRef.current && typeof ytPlayerRef.current.playVideo === 'function') {
          ytPlayerRef.current.playVideo();
        }
        if (audioFallbackRef.current && !isMuted) {
          audioFallbackRef.current.play().catch(() => {});
        }
        setIsPlaying(true);
      }
    }
  }, [isStoryPaused, hasInteracted]);

  const togglePlay = () => {
    setHasInteracted(true);
    if (isPlaying) {
      if (ytPlayerRef.current && typeof ytPlayerRef.current.pauseVideo === 'function') {
        ytPlayerRef.current.pauseVideo();
      }
      if (audioFallbackRef.current) {
        audioFallbackRef.current.pause();
      }
      setIsPlaying(false);
    } else {
      if (ytPlayerRef.current && typeof ytPlayerRef.current.playVideo === 'function') {
        ytPlayerRef.current.playVideo();
        if (!isMuted) ytPlayerRef.current.unMute();
      }
      if (audioFallbackRef.current) {
        audioFallbackRef.current.play().catch(() => {});
      }
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    setHasInteracted(true);
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);

    if (ytPlayerRef.current) {
      if (nextMuted) {
        if (typeof ytPlayerRef.current.mute === 'function') ytPlayerRef.current.mute();
      } else {
        if (typeof ytPlayerRef.current.unMute === 'function') {
          ytPlayerRef.current.unMute();
          ytPlayerRef.current.setVolume(100);
          ytPlayerRef.current.playVideo();
        }
        setIsPlaying(true);
      }
    }

    if (audioFallbackRef.current) {
      audioFallbackRef.current.muted = nextMuted;
      if (!nextMuted && isPlaying) {
        audioFallbackRef.current.play().catch(() => {});
      }
    }
  };

  const handleUserFirstTouch = () => {
    setHasInteracted(true);
    setIsMuted(false);
    setIsPlaying(true);
    if (ytPlayerRef.current) {
      if (typeof ytPlayerRef.current.unMute === 'function') ytPlayerRef.current.unMute();
      if (typeof ytPlayerRef.current.playVideo === 'function') ytPlayerRef.current.playVideo();
    }
    if (audioFallbackRef.current) {
      audioFallbackRef.current.muted = false;
      audioFallbackRef.current.play().catch(() => {});
    }
  };

  return (
    <>
      {/* Floating Prompt for Autoplay / Sound Activation if not interacted */}
      {!hasInteracted && isPlaying && (
        <button
          type="button"
          onClick={handleUserFirstTouch}
          className="sound-prompt-pill animate-bounce-slow"
          style={{
            position: 'fixed',
            bottom: '86px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 999,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: '#ffe600',
            border: '3px solid #111111',
            color: '#111111',
            padding: '9px 18px',
            borderRadius: '999px',
            fontFamily: 'var(--font-80s)',
            fontSize: '0.82rem',
            fontWeight: 800,
            letterSpacing: '0.5px',
            boxShadow: '4px 4px 0px #111111, 8px 8px 0px #ff2a85',
            cursor: 'pointer',
            whiteSpace: 'nowrap',
          }}
        >
          <Volume2 size={18} className="animate-pulse" color="#ff2a85" />
          <span>🔊 TOQUE PARA ATIVAR O HIT #1 DE {year}</span>
        </button>
      )}

      {/* 80s Memphis Cassette Walkman Player Bar */}
      <div
        className="retro-walkman-bar memphis-card"
        style={{
          width: '100%',
          maxWidth: '430px',
          margin: '0 auto 12px auto',
          background: '#ffffff',
          border: '3px solid #111111',
          borderRadius: '16px',
          padding: '8px 12px',
          boxShadow: '4px 4px 0px #111111, 8px 8px 0px #ffe600',
          display: 'flex',
          flexDirection: 'column',
          gap: '6px',
          position: 'relative',
          zIndex: 40,
        }}
      >
        {/* Top Ticker: Track Info & Equalizer */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
          {/* Equalizer Visualizer Bars */}
          <div className={`equalizer-container ${isPlaying && !isMuted ? 'active' : ''}`}>
            <span className="eq-bar bar-1"></span>
            <span className="eq-bar bar-2"></span>
            <span className="eq-bar bar-3"></span>
            <span className="eq-bar bar-4"></span>
            <span className="eq-bar bar-5"></span>
          </div>

          {/* Marquee Song Title */}
          <div
            style={{
              flex: 1,
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              position: 'relative',
              background: '#fffdf7',
              border: '2px solid #111111',
              borderRadius: '8px',
              padding: '4px 8px',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <div className="marquee-content">
              <span style={{ color: '#111111', fontWeight: 800, fontSize: '0.78rem', marginRight: '6px' }}>
                {activeItem?.icon} {activeItem?.label}:
              </span>
              <span style={{ color: '#ff2a85', fontWeight: 900, fontSize: '0.80rem', marginRight: '8px' }}>
                {activeTrack?.title || 'Carregando Música...'}
              </span>
              <span style={{ color: '#111111', fontWeight: 700, fontSize: '0.75rem', marginRight: '16px' }}>
                • {activeTrack?.artist}
              </span>
              <span
                style={{
                  background: '#ffe600',
                  color: '#111111',
                  border: '1px solid #111111',
                  borderRadius: '4px',
                  padding: '1px 4px',
                  fontSize: '0.68rem',
                  fontWeight: 800,
                }}
              >
                HIT DE {year}
              </span>
            </div>
          </div>

          {/* TV / Video Modal Button */}
          {videoId && (
            <button
              type="button"
              onClick={() => {
                setShowTvModal(true);
                setHasInteracted(true);
              }}
              title="Assistir clipe oficial na TV Retrô"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                background: '#ff2a85',
                border: '2px solid #111111',
                borderRadius: '8px',
                padding: '4px 8px',
                color: '#ffffff',
                fontSize: '0.72rem',
                fontWeight: 800,
                fontFamily: 'var(--font-80s)',
                cursor: 'pointer',
                boxShadow: '2px 2px 0px #111111',
                whiteSpace: 'nowrap',
              }}
            >
              <Tv size={14} color="#ffffff" />
              <span>CLIPE</span>
            </button>
          )}
        </div>

        {/* Bottom Controls & Chart Switcher */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
          {/* Category Switcher Pills */}
          <div style={{ display: 'flex', gap: '5px', overflowX: 'auto' }}>
            {availableTracks.map((item, idx) => {
              const isSelected = selectedTrackIndex === idx;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setSelectedTrackIndex(idx);
                    setHasInteracted(true);
                  }}
                  style={{
                    padding: '4px 9px',
                    borderRadius: '8px',
                    fontSize: '0.70rem',
                    fontWeight: 800,
                    fontFamily: 'var(--font-main)',
                    background: isSelected ? '#00d2ff' : '#fffdf7',
                    color: '#111111',
                    border: '2px solid #111111',
                    boxShadow: isSelected ? '2px 2px 0px #111111' : '1px 1px 0px #111111',
                    cursor: 'pointer',
                    transition: 'all 0.15s',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {item.icon} {item.id === 'billboard' ? 'Billboard' : item.id === 'radio' ? 'Rádios BR' : 'Vendas BR'}
                </button>
              );
            })}
          </div>

          {/* Audio Controls (Play/Pause, Mute/Unmute) */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            {/* Play/Pause Button */}
            <button
              type="button"
              onClick={togglePlay}
              aria-label={isPlaying ? 'Pausar música' : 'Tocar música'}
              title={isPlaying ? 'Pausar' : 'Tocar'}
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: isPlaying ? '#00d2ff' : '#ff2a85',
                border: '2px solid #111111',
                color: isPlaying ? '#111111' : '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '2px 2px 0px #111111',
              }}
            >
              {isPlaying ? <Pause size={14} /> : <Play size={14} style={{ marginLeft: '1px' }} />}
            </button>

            {/* Mute/Unmute Button */}
            <button
              type="button"
              onClick={toggleMute}
              aria-label={isMuted ? 'Desmutar áudio' : 'Mutar áudio'}
              title={isMuted ? 'Ativar Som' : 'Silenciar'}
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: isMuted ? '#ff2a85' : '#ffe600',
                border: '2px solid #111111',
                color: isMuted ? '#ffffff' : '#111111',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '2px 2px 0px #111111',
              }}
            >
              {isMuted ? <VolumeX size={14} color="#ffffff" /> : <Volume2 size={14} color="#111111" />}
            </button>
          </div>
        </div>
      </div>

      {/* Hidden YouTube IFrame Target for Background Audio */}
      <div
        ref={playerContainerRef}
        style={{
          position: 'fixed',
          bottom: '-9999px',
          right: '-9999px',
          width: '1px',
          height: '1px',
          opacity: 0.01,
          pointerEvents: 'none',
        }}
      >
        <div id="retro-youtube-iframe-target"></div>
      </div>

      {/* Retro 80s Woodgrain CRT Television Modal for Full Video */}
      {showTvModal && videoId && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(17, 17, 17, 0.88)',
            backdropFilter: 'blur(6px)',
            zIndex: 99999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px',
          }}
          onClick={() => setShowTvModal(false)}
        >
          <div
            className="retro-tv-chassis"
            style={{
              width: '100%',
              maxWidth: '560px',
              background: '#4a2511',
              border: '6px solid #2b1407',
              borderRadius: '24px',
              padding: '16px',
              boxShadow: '8px 8px 0px #111111, 0 20px 40px rgba(0,0,0,0.8)',
              position: 'relative',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* TV Header with Close */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '10px',
                borderBottom: '2px solid #733c1d',
                paddingBottom: '6px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontSize: '1.2rem' }}>📺</span>
                <span
                  style={{
                    fontFamily: 'var(--font-80s)',
                    color: '#ffe600',
                    fontSize: '0.9rem',
                    letterSpacing: '1px',
                  }}
                >
                  TELEVISOR RETRÔ 80s
                </span>
              </div>

              <button
                type="button"
                onClick={() => setShowTvModal(false)}
                style={{
                  background: '#ff2a85',
                  border: '2px solid #111111',
                  borderRadius: '6px',
                  color: '#ffffff',
                  padding: '2px 6px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                }}
              >
                <X size={18} />
              </button>
            </div>

            {/* CRT Screen Video Embed Frame */}
            <div
              className="crt-tv-screen"
              style={{
                position: 'relative',
                width: '100%',
                paddingTop: '56.25%', // 16:9
                background: '#000000',
                borderRadius: '16px',
                border: '4px solid #1a1a1a',
                overflow: 'hidden',
                boxShadow: 'inset 0 0 20px rgba(0,0,0,0.9)',
              }}
            >
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&enablejsapi=1&playsinline=1&controls=1`}
                title={activeTrack?.title || 'Clipe no YouTube'}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  border: 'none',
                }}
              />
            </div>

            {/* TV Footer / Dial */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: '12px',
                paddingTop: '6px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span
                  style={{
                    display: 'inline-block',
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    background: '#00e676',
                    boxShadow: '0 0 8px #00e676',
                  }}
                />
                <span style={{ color: '#ffffff', fontSize: '0.82rem', fontWeight: 700 }}>
                  {activeTrack?.title} — {activeTrack?.artist}
                </span>
              </div>

              <a
                href={`https://www.youtube.com/watch?v=${videoId}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  color: '#00d2ff',
                  fontSize: '0.78rem',
                  textDecoration: 'none',
                  fontWeight: 800,
                }}
              >
                <span>Abrir YouTube</span>
                <ExternalLink size={12} />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Component Specific CSS */}
      <style jsx>{`
        .marquee-content {
          display: inline-block;
          animation: marquee 14s linear infinite;
        }
        @keyframes marquee {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        .equalizer-container {
          display: flex;
          align-items: flex-end;
          gap: 2px;
          height: 18px;
          width: 18px;
        }
        .eq-bar {
          width: 3px;
          background: #ff2a85;
          border-radius: 1px;
          height: 4px;
          transition: height 0.1s ease;
        }
        .equalizer-container.active .bar-1 {
          animation: eqAnim 0.6s infinite ease-in-out alternate;
        }
        .equalizer-container.active .bar-2 {
          animation: eqAnim 0.4s infinite ease-in-out alternate 0.1s;
        }
        .equalizer-container.active .bar-3 {
          animation: eqAnim 0.7s infinite ease-in-out alternate 0.2s;
        }
        .equalizer-container.active .bar-4 {
          animation: eqAnim 0.5s infinite ease-in-out alternate 0.15s;
        }
        .equalizer-container.active .bar-5 {
          animation: eqAnim 0.8s infinite ease-in-out alternate 0.25s;
        }
        @keyframes eqAnim {
          0% {
            height: 3px;
            background: #00d2ff;
          }
          50% {
            height: 16px;
            background: #ffe600;
          }
          100% {
            height: 8px;
            background: #ff2a85;
          }
        }
      `}</style>
    </>
  );
}

