'use client';

import React, { useState, useEffect } from 'react';
import { BirthDataPayload, MusicTrack, MusicCategoryRanking } from '@/types/universario';
import { Disc3, Music2, Globe, Radio, Disc, Crown, Sparkles, Volume2 } from 'lucide-react';

interface SlideProps {
  data: BirthDataPayload;
}

export default function SlideMusicHits({ data }: SlideProps) {
  const { music } = data;

  const categories: MusicCategoryRanking[] = music.categories && music.categories.length > 0
    ? music.categories
    : [
        {
          id: 'radio_br',
          categoryName: 'Rádios BR',
          subtitle: 'Mais tocadas nas emissoras',
          source: 'Crowley Broadcast / NOPEM / ECAD',
          icon: 'radio',
          tracks: music.brazilRadioTop5 || [music.brazilTopTrack],
        },
        {
          id: 'sales_br',
          categoryName: 'Vendas BR',
          subtitle: 'LPs, Compactos & Streaming',
          source: 'NOPEM / Pro-Música Brasil',
          icon: 'disc',
          tracks: music.brazilSalesTop5 || [music.brazilSalesTrack || music.brazilTopTrack],
        },
        {
          id: 'billboard',
          categoryName: 'Billboard Hot 100',
          subtitle: 'Parada oficial nos EUA / Mundo',
          source: 'Billboard Hot 100 (EUA)',
          icon: 'globe',
          tracks: music.billboardTop5 || [music.globalTopTrack],
        },
      ];

  const [activeTab, setActiveTab] = useState<'radio_br' | 'sales_br' | 'billboard'>('radio_br');
  const [userInteracted, setUserInteracted] = useState<boolean>(false);
  const [imageError, setImageError] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (userInteracted) return;

    const timer = setInterval(() => {
      setActiveTab((prev) => {
        if (prev === 'radio_br') return 'sales_br';
        if (prev === 'sales_br') return 'billboard';
        return 'radio_br';
      });
    }, 2800);

    return () => clearInterval(timer);
  }, [userInteracted]);

  const currentCategory = categories.find((c) => c.id === activeTab) || categories[0];
  const tracks: MusicTrack[] = currentCategory.tracks || [];
  const top1 = tracks[0] || music.brazilTopTrack;
  const runnersUp = tracks.slice(1, 5);

  const getCategoryColor = (id: string) => {
    switch (id) {
      case 'radio_br':
        return { primary: '#ff2a85', light: '#ff77af', bg: 'rgba(255, 42, 133, 0.25)', border: '#ff2a85', shadow: '3px 3px 0px #00f0ff' };
      case 'sales_br':
        return { primary: '#ffde59', light: '#fff199', bg: 'rgba(255, 222, 89, 0.25)', border: '#ffde59', shadow: '3px 3px 0px #ff2a85' };
      case 'billboard':
        return { primary: '#00f0ff', light: '#80f7ff', bg: 'rgba(0, 240, 255, 0.25)', border: '#00f0ff', shadow: '3px 3px 0px #ffde59' };
      default:
        return { primary: '#ff2a85', light: '#ff77af', bg: 'rgba(255, 42, 133, 0.25)', border: '#ff2a85', shadow: '3px 3px 0px #00f0ff' };
    }
  };

  const color = getCategoryColor(activeTab);
  const coverUrl = top1?.coverUrl;
  const hasValidCover = coverUrl && !imageError[top1.title];

  return (
    <div
      style={{
        position: 'relative',
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '70px 18px 24px 18px',
        background: 'radial-gradient(circle at 50% 18%, #2d0e3e 0%, #13071f 65%, #06020c 100%)',
        color: '#ffffff',
        overflow: 'hidden',
      }}
      className="slide-content-enter"
    >
      {/* Top Header */}
      <div style={{ textAlign: 'center', zIndex: 2 }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '3px 12px',
            borderRadius: '6px',
            background: '#ff2a85',
            border: '1.5px solid #ffffff',
            boxShadow: '2px 2px 0px #00f0ff',
            fontSize: '0.72rem',
            fontFamily: 'var(--font-80s)',
            color: '#ffffff',
            letterSpacing: '0.5px',
            marginBottom: '4px',
          }}
        >
          <Volume2 size={12} />
          <span>HITS 80s • PARADAS DE SUCESSO</span>
        </div>

        <h2
          style={{
            fontSize: '1.85rem',
            fontWeight: 800,
            fontFamily: 'var(--font-80s)',
            lineHeight: 1.1,
            marginBottom: '1px',
            color: '#ffffff',
          }}
          className="text-chromatic"
        >
          NO TOPO DAS PARADAS
        </h2>

        <p style={{ fontSize: '0.74rem', fontFamily: 'var(--font-crt)', color: '#ffde59', letterSpacing: '0.5px' }}>
          {music.musicEra.toUpperCase()}
        </p>
      </div>

      {/* Memphis Category Tabs Switcher */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '6px',
          padding: '4px',
          borderRadius: '12px',
          background: '#0d061c',
          border: '2px solid rgba(255, 255, 255, 0.2)',
          zIndex: 3,
        }}
      >
        {categories.map((cat) => {
          const isSelected = activeTab === cat.id;
          const catColor = getCategoryColor(cat.id);

          return (
            <button
              key={cat.id}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setUserInteracted(true);
                setActiveTab(cat.id as 'radio_br' | 'sales_br' | 'billboard');
              }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '6px 3px',
                borderRadius: '8px',
                background: isSelected ? catColor.primary : 'transparent',
                border: isSelected ? '1.5px solid #ffffff' : '1.5px solid transparent',
                color: isSelected ? '#0d061c' : '#94a3b8',
                boxShadow: isSelected ? catColor.shadow : 'none',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                {cat.id === 'radio_br' && <Radio size={12} color={isSelected ? '#0d061c' : '#94a3b8'} />}
                {cat.id === 'sales_br' && <Disc size={12} color={isSelected ? '#0d061c' : '#94a3b8'} />}
                {cat.id === 'billboard' && <Globe size={12} color={isSelected ? '#0d061c' : '#94a3b8'} />}
                <span style={{ fontSize: '0.72rem', fontWeight: 800, fontFamily: 'var(--font-80s)', whiteSpace: 'nowrap' }}>
                  {cat.categoryName.toUpperCase()}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Central Vinyl Player with Real Album Artwork Cover + Cassette Mini Player */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '14px',
          margin: '2px 0',
          zIndex: 2,
        }}
      >
        {/* Realistic 3D Grooved Spinning Vinyl */}
        <div
          style={{
            position: 'relative',
            width: '102px',
            height: '102px',
            borderRadius: '50%',
            background: 'radial-gradient(circle at 50% 50%, #1e1e1e 0%, #0d0d0d 35%, #181818 40%, #000000 60%, #151515 70%, #000000 100%)',
            boxShadow: `0 8px 24px rgba(0,0,0,0.9), 0 0 0 2px #0d061c, 0 0 0 3px ${color.primary}, 0 0 16px ${color.bg}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          className="animate-spin-slow"
        >
          <div
            style={{
              position: 'absolute',
              inset: '8px',
              borderRadius: '50%',
              border: '1px dashed rgba(255,255,255,0.14)',
              pointerEvents: 'none',
            }}
          />

          {/* Center Label (Bolacha do Vinil) with Album Cover Image */}
          <div
            style={{
              position: 'relative',
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              overflow: 'hidden',
              boxShadow: '0 2px 8px rgba(0,0,0,0.8), inset 0 0 0 1.5px rgba(255,255,255,0.8)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: `linear-gradient(135deg, ${color.primary}, #7928ca)`,
            }}
          >
            {hasValidCover ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={coverUrl}
                alt={top1.title}
                onError={() => {
                  setImageError((prev) => ({ ...prev, [top1.title]: true }));
                }}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            ) : (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                }}
              >
                <Disc3 size={20} />
              </div>
            )}

            {/* Center Spindle Hole */}
            <div
              style={{
                position: 'absolute',
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: '#0a0a0a',
                border: '1.5px solid #ffffff',
                zIndex: 3,
              }}
            />
          </div>
        </div>

        {/* Dynamic Equalizer Bars in 80s Neon Colors */}
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '3px', height: '38px' }}>
          {[40, 85, 55, 100, 70, 95, 45, 90, 60, 80, 45, 75].map((h, i) => (
            <div
              key={i}
              style={{
                width: '3.5px',
                height: `${h}%`,
                background: i % 2 === 0 ? '#ff2a85' : '#00f0ff',
                borderRadius: '2px',
                boxShadow: i % 2 === 0 ? '0 0 4px #ff2a85' : '0 0 4px #00f0ff',
                animation: `pulseGlow ${1 + (i % 4) * 0.3}s ease-in-out infinite alternate`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Main Content Area: Top 5 of Active Category */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '7px',
          zIndex: 2,
        }}
      >
        {/* #1 Card - Hero Winner with Album Art Thumbnail & Memphis Border */}
        <div
          style={{
            padding: '10px 12px',
            background: 'rgba(22, 8, 47, 0.95)',
            border: `2.5px solid ${color.primary}`,
            borderRadius: '12px',
            boxShadow: color.shadow,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Top Row: Rank Badge & Category Info */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '3px',
                  padding: '2px 7px',
                  borderRadius: '6px',
                  background: color.primary,
                  color: '#0d061c',
                  fontSize: '0.68rem',
                  fontWeight: 900,
                  fontFamily: 'var(--font-80s)',
                  letterSpacing: '0.5px',
                }}
              >
                <Crown size={10} fill="#0d061c" />
                #1 HIT
              </span>
              <span style={{ fontSize: '0.66rem', fontWeight: 700, fontFamily: 'var(--font-80s)', color: color.light, textTransform: 'uppercase' }}>
                {currentCategory.subtitle}
              </span>
            </div>

            <span
              style={{
                fontFamily: 'var(--font-crt)',
                fontSize: '0.8rem',
                color: '#ffde59',
              }}
            >
              ★ 100% RADICAL
            </span>
          </div>

          {/* Hero Row: Album Cover Thumbnail + Title & Artist */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {hasValidCover && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={coverUrl}
                alt={top1.title}
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '6px',
                  objectFit: 'cover',
                  border: '1.5px solid #ffffff',
                  boxShadow: '2px 2px 0px #00f0ff',
                  flexShrink: 0,
                }}
              />
            )}

            <div style={{ minWidth: 0, flex: 1 }}>
              <div
                style={{
                  fontSize: '1.0rem',
                  fontWeight: 800,
                  fontFamily: 'var(--font-80s)',
                  color: '#ffffff',
                  lineHeight: 1.2,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {top1.title}
              </div>
              <div
                style={{
                  fontSize: '0.80rem',
                  color: '#ffde59',
                  fontWeight: 700,
                  fontFamily: 'var(--font-main)',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {top1.artist}
              </div>
            </div>
          </div>

          {top1.highlight && (
            <div
              style={{
                fontSize: '0.68rem',
                color: '#cbd5e1',
                marginTop: '5px',
                lineHeight: 1.3,
                borderTop: '1px dashed rgba(255, 255, 255, 0.15)',
                paddingTop: '3px',
              }}
            >
              ✦ {top1.highlight}
            </div>
          )}
        </div>

        {/* Top 2 to Top 5 Ranked Rows */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
            background: '#0d061c',
            borderRadius: '10px',
            padding: '6px 8px',
            border: '1.5px solid rgba(255, 255, 255, 0.15)',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0 2px 2px 2px',
              fontSize: '0.62rem',
              fontWeight: 800,
              fontFamily: 'var(--font-80s)',
              color: '#00f0ff',
              letterSpacing: '0.5px',
              borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            }}
          >
            <span>TOP 2 AO TOP 5</span>
            <span>{currentCategory.categoryName.toUpperCase()}</span>
          </div>

          {runnersUp.map((track, idx) => {
            const rank = idx + 2;
            return (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '3px 4px',
                  borderRadius: '4px',
                  background: 'rgba(255, 255, 255, 0.04)',
                }}
              >
                {/* Position Badge */}
                <div
                  style={{
                    width: '18px',
                    height: '18px',
                    borderRadius: '4px',
                    background: '#ff2a85',
                    color: '#ffffff',
                    fontSize: '0.65rem',
                    fontWeight: 800,
                    fontFamily: 'var(--font-80s)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  #{rank}
                </div>

                {/* Song Details */}
                <div style={{ minWidth: 0, flex: 1 }}>
                  <div
                    style={{
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      color: '#ffffff',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {track.title}
                  </div>
                  <div
                    style={{
                      fontSize: '0.68rem',
                      color: '#cbd5e1',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {track.artist}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer Source Note */}
      <div style={{ textAlign: 'center', zIndex: 2 }}>
        <div style={{ fontFamily: 'var(--font-crt)', fontSize: '0.85rem', color: '#ffde59' }}>
          AUDITORIA: {currentCategory.source.toUpperCase()}
        </div>
        <div style={{ fontSize: '0.58rem', color: '#94a3b8', marginTop: '1px' }}>
          Toque nas abas para alternar a fita e o ranking
        </div>
      </div>
    </div>
  );
}
