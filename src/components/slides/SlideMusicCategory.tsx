'use client';

import React, { useState } from 'react';
import { BirthDataPayload, MusicTrack, MusicCategoryRanking } from '@/types/universario';
import { Disc3, Radio, Disc, Globe, Crown, Sparkles, Volume2, Award } from 'lucide-react';

interface SlideProps {
  data: BirthDataPayload;
  categoryId: 'radio_br' | 'sales_br' | 'billboard';
}

export default function SlideMusicCategory({ data, categoryId }: SlideProps) {
  const { music } = data;
  const [imageError, setImageError] = useState<boolean>(false);

  // Fallback category configs
  const categoryConfigs = {
    radio_br: {
      categoryName: 'Rádios Brasil',
      headerTitle: 'RÁDIOS BRASIL • AIRPLAY',
      subtitle: 'Mais tocadas nas emissoras de rádio',
      source: 'Crowley Broadcast / NOPEM / ECAD',
      icon: Radio,
      primaryColor: '#ff2a85',
      lightColor: '#ff77af',
      bgColor: 'rgba(255, 42, 133, 0.25)',
      shadowColor: '3px 3px 0px #00f0ff',
      tracks: music.brazilRadioTop5 || [music.brazilTopTrack],
      badgeText: 'FM HITS 80s',
    },
    sales_br: {
      categoryName: 'Vendas Brasil',
      headerTitle: 'VENDAS BRASIL • LPs & STREAMING',
      subtitle: 'Discos e compactos mais vendidos',
      source: 'Instituto NOPEM / Pro-Música Brasil',
      icon: Disc,
      primaryColor: '#ffde59',
      lightColor: '#fff199',
      bgColor: 'rgba(255, 222, 89, 0.25)',
      shadowColor: '3px 3px 0px #ff2a85',
      tracks: music.brazilSalesTop5 || [music.brazilSalesTrack || music.brazilTopTrack],
      badgeText: 'DISCO DE PLATINA',
    },
    billboard: {
      categoryName: 'Billboard Hot 100',
      headerTitle: 'BILLBOARD HOT 100 • EUA & MUNDO',
      subtitle: 'Parada oficial internacional',
      source: 'Billboard Hot 100 (EUA)',
      icon: Globe,
      primaryColor: '#00f0ff',
      lightColor: '#80f7ff',
      bgColor: 'rgba(0, 240, 255, 0.25)',
      shadowColor: '3px 3px 0px #ffde59',
      tracks: music.billboardTop5 || [music.globalTopTrack],
      badgeText: 'GLOBAL #1 HIT',
    },
  };

  const config = categoryConfigs[categoryId] || categoryConfigs.radio_br;
  const IconComponent = config.icon;
  const tracks: MusicTrack[] = config.tracks || [];
  const top1 = tracks[0] || (categoryId === 'billboard' ? music.globalTopTrack : music.brazilTopTrack);
  const runnersUp = tracks.slice(1, 5);
  const coverUrl = top1?.coverUrl;
  const hasValidCover = coverUrl && !imageError;

  return (
    <div
      style={{
        position: 'relative',
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '72px 18px 26px 18px',
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
            padding: '4px 14px',
            borderRadius: '6px',
            background: config.primaryColor,
            border: '1.5px solid #0d061c',
            boxShadow: config.shadowColor,
            fontSize: '0.74rem',
            fontFamily: 'var(--font-80s)',
            color: '#0d061c',
            letterSpacing: '0.5px',
            marginBottom: '4px',
          }}
        >
          <IconComponent size={13} />
          <span>{config.headerTitle}</span>
        </div>

        <h2
          style={{
            fontSize: '2.05rem',
            fontWeight: 800,
            fontFamily: 'var(--font-80s)',
            lineHeight: 1.1,
            marginBottom: '1px',
            color: '#ffffff',
          }}
          className="text-chromatic"
        >
          TOP 5 • {config.categoryName.toUpperCase()}
        </h2>

        <p style={{ fontSize: '0.76rem', fontFamily: 'var(--font-crt)', color: '#ffde59', letterSpacing: '0.5px' }}>
          {config.subtitle.toUpperCase()} ({data.monthName.toUpperCase()} DE {data.year})
        </p>
      </div>

      {/* Central Spinning Vinyl with Real Album Cover */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '16px',
          margin: '4px 0',
          zIndex: 2,
        }}
      >
        {/* Realistic 3D Grooved Spinning Vinyl */}
        <div
          style={{
            position: 'relative',
            width: '108px',
            height: '108px',
            borderRadius: '50%',
            background: 'radial-gradient(circle at 50% 50%, #1e1e1e 0%, #0d0d0d 35%, #181818 40%, #000000 60%, #151515 70%, #000000 100%)',
            boxShadow: `0 8px 24px rgba(0,0,0,0.9), 0 0 0 2px #0d061c, 0 0 0 3px ${config.primaryColor}, 0 0 18px ${config.bgColor}`,
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

          {/* Center Label with Album Cover Image */}
          <div
            style={{
              position: 'relative',
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              overflow: 'hidden',
              boxShadow: '0 2px 8px rgba(0,0,0,0.8), inset 0 0 0 1.5px rgba(255,255,255,0.8)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: `linear-gradient(135deg, ${config.primaryColor}, #7928ca)`,
            }}
          >
            {hasValidCover ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={coverUrl}
                alt={top1.title}
                onError={() => setImageError(true)}
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
                <Disc3 size={22} />
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

        {/* Dynamic Equalizer Dancing Bars */}
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '3.5px', height: '44px' }}>
          {[45, 90, 60, 100, 75, 95, 50, 85, 65, 90, 45, 80].map((h, i) => {
            const animClass = `sound-bar-anim-${(i % 4) + 1}`;
            return (
              <div
                key={i}
                className={animClass}
                style={{
                  width: '3.5px',
                  height: `${h}%`,
                  background: i % 2 === 0 ? config.primaryColor : '#00f0ff',
                  borderRadius: '2px',
                  boxShadow: i % 2 === 0 ? `0 0 6px ${config.primaryColor}` : '0 0 6px #00f0ff',
                  transition: 'height 0.1s ease',
                }}
              />
            );
          })}
        </div>
      </div>

      {/* Main Content Area: #1 Hero Winner + Top 2 to Top 5 */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          zIndex: 2,
        }}
      >
        {/* #1 Hero Winner Card */}
        <div
          style={{
            padding: '11px 13px',
            background: 'rgba(22, 8, 47, 0.95)',
            border: `2.5px solid ${config.primaryColor}`,
            borderRadius: '12px',
            boxShadow: config.shadowColor,
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
                  padding: '2px 8px',
                  borderRadius: '6px',
                  background: config.primaryColor,
                  color: '#0d061c',
                  fontSize: '0.70rem',
                  fontWeight: 900,
                  fontFamily: 'var(--font-80s)',
                  letterSpacing: '0.5px',
                }}
              >
                <Crown size={11} fill="#0d061c" />
                #1 LUGAR
              </span>
              <span style={{ fontSize: '0.68rem', fontWeight: 700, fontFamily: 'var(--font-80s)', color: config.lightColor, textTransform: 'uppercase' }}>
                {config.badgeText}
              </span>
            </div>

            <span
              style={{
                fontFamily: 'var(--font-crt)',
                fontSize: '0.85rem',
                color: '#ffde59',
              }}
            >
              ★ CAMPEÃO
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
                  width: '46px',
                  height: '46px',
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
                  fontSize: '1.05rem',
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
                  fontSize: '0.82rem',
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
                fontSize: '0.70rem',
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
              fontSize: '0.64rem',
              fontWeight: 800,
              fontFamily: 'var(--font-80s)',
              color: '#00f0ff',
              letterSpacing: '0.5px',
              borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            }}
          >
            <span>TOP 2 AO TOP 5</span>
            <span>{config.categoryName.toUpperCase()}</span>
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
                <div
                  style={{
                    width: '19px',
                    height: '19px',
                    borderRadius: '4px',
                    background: config.primaryColor,
                    color: '#0d061c',
                    fontSize: '0.66rem',
                    fontWeight: 900,
                    fontFamily: 'var(--font-80s)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  #{rank}
                </div>

                <div style={{ minWidth: 0, flex: 1 }}>
                  <div
                    style={{
                      fontSize: '0.80rem',
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
        <div style={{ fontFamily: 'var(--font-crt)', fontSize: '0.88rem', color: '#ffde59' }}>
          AUDITORIA OFICIAL: {config.source.toUpperCase()}
        </div>
      </div>
    </div>
  );
}
