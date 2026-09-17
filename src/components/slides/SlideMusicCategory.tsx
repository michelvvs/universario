'use client';

import React, { useState } from 'react';
import { BirthDataPayload, MusicTrack } from '@/types/universario';
import { Disc3, Radio, Disc, Globe, Crown, Sparkles, Volume2 } from 'lucide-react';
import { MemphisSquiggle, MemphisZigzag, MemphisTrianglePattern, MemphisCrosshatch } from '../MemphisDoodles';

interface SlideProps {
  data: BirthDataPayload;
  categoryId: 'radio_br' | 'sales_br' | 'billboard';
}

export default function SlideMusicCategory({ data, categoryId }: SlideProps) {
  const { music } = data;
  const [imageError, setImageError] = useState<boolean>(false);

  // Memphis category configs
  const categoryConfigs = {
    radio_br: {
      categoryName: 'Rádios Brasil',
      headerTitle: 'RÁDIOS BRASIL • AIRPLAY',
      subtitle: 'Mais tocadas nas emissoras de rádio',
      source: 'Crowley Broadcast / NOPEM / ECAD',
      icon: Radio,
      primaryColor: '#ff2a85',
      accentColor: '#00d2ff',
      themeClass: 'slide-theme-radio',
      shadowColor: '3px 3px 0px #111111, 6px 6px 0px #00d2ff',
      tracks: music.brazilRadioTop5 || [music.brazilTopTrack],
      badgeText: 'FM HITS 80s',
    },
    sales_br: {
      categoryName: 'Vendas Brasil',
      headerTitle: 'VENDAS BRASIL • LPs & FITAS',
      subtitle: 'Discos e compactos mais vendidos',
      source: 'Instituto NOPEM / Pro-Música Brasil',
      icon: Disc,
      primaryColor: '#ffe600',
      accentColor: '#ff2a85',
      themeClass: 'slide-theme-sales',
      shadowColor: '3px 3px 0px #111111, 6px 6px 0px #ff2a85',
      tracks: music.brazilSalesTop5 || [music.brazilSalesTrack || music.brazilTopTrack],
      badgeText: 'DISCO DE PLATINA',
    },
    billboard: {
      categoryName: 'Billboard Hot 100',
      headerTitle: 'BILLBOARD HOT 100 • MUNDO',
      subtitle: 'Parada oficial internacional',
      source: 'Billboard Hot 100 (EUA)',
      icon: Globe,
      primaryColor: '#00d2ff',
      accentColor: '#ffe600',
      themeClass: 'slide-theme-billboard',
      shadowColor: '3px 3px 0px #111111, 6px 6px 0px #ffe600',
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
    <div className={`slide-memphis-canvas ${config.themeClass}`}>
      {/* Memphis Floating Doodles */}
      <div style={{ position: 'absolute', top: '10%', right: '5%', pointerEvents: 'none' }} className="animate-float-1">
        <MemphisTrianglePattern size={46} fillColor={config.primaryColor} />
      </div>

      <div style={{ position: 'absolute', bottom: '26%', left: '4%', pointerEvents: 'none' }}>
        <MemphisSquiggle color="#111111" width={52} height={16} />
      </div>

      {/* Top Header */}
      <div style={{ textAlign: 'center', zIndex: 2 }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '5px 14px',
            borderRadius: '10px',
            background: config.primaryColor,
            border: '2.5px solid #111111',
            boxShadow: '3px 3px 0px #111111',
            fontSize: '0.76rem',
            fontFamily: 'var(--font-80s)',
            color: '#111111',
            letterSpacing: '0.5px',
            marginBottom: '4px',
            transform: 'rotate(-1deg)',
          }}
        >
          <IconComponent size={13} color="#111111" />
          <span>{config.headerTitle}</span>
        </div>

        <h2
          style={{
            fontSize: '2.05rem',
            fontWeight: 900,
            fontFamily: 'var(--font-80s)',
            lineHeight: 1.1,
            marginBottom: '1px',
            color: '#111111',
            textShadow: `2.5px 2.5px 0px ${config.accentColor}`,
          }}
          className="text-chromatic"
        >
          TOP 5 • {config.categoryName.toUpperCase()}
        </h2>

        <p style={{ fontSize: '0.78rem', fontFamily: 'var(--font-80s)', color: '#ff2a85', letterSpacing: '0.5px' }}>
          {config.subtitle.toUpperCase()} ({data.monthName.toUpperCase()} DE {data.year})
        </p>
      </div>

      {/* Central Spinning Vinyl with Real Album Cover & Dancing Equalizer Bars */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '16px',
          margin: '2px 0',
          zIndex: 2,
        }}
      >
        {/* Realistic 3D Grooved Spinning Vinyl with Memphis Accent Border */}
        <div
          style={{
            position: 'relative',
            width: '106px',
            height: '106px',
            borderRadius: '50%',
            background: 'radial-gradient(circle at 50% 50%, #1e1e1e 0%, #0d0d0d 35%, #181818 40%, #000000 60%, #151515 70%, #000000 100%)',
            boxShadow: `4px 4px 0px #111111, 0 0 0 3px #111111, 0 0 0 5px ${config.primaryColor}`,
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
              border: '1px dashed rgba(255,255,255,0.2)',
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
              boxShadow: '0 2px 8px rgba(0,0,0,0.8), inset 0 0 0 2px #111111',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: config.primaryColor,
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
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#111111' }}>
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
                background: '#111111',
                border: '1.5px solid #ffffff',
                zIndex: 3,
              }}
            />
          </div>
        </div>

        {/* Dynamic Equalizer Dancing Bars in Memphis Palette */}
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '3.5px', height: '44px' }}>
          {[45, 90, 60, 100, 75, 95, 50, 85, 65, 90, 45, 80].map((h, i) => {
            const animClass = `sound-bar-anim-${(i % 4) + 1}`;
            const barBg = i % 3 === 0 ? '#ff2a85' : i % 3 === 1 ? '#ffe600' : '#00d2ff';
            return (
              <div
                key={i}
                className={animClass}
                style={{
                  width: '4px',
                  height: `${h}%`,
                  background: barBg,
                  border: '1px solid #111111',
                  borderRadius: '2px',
                  boxShadow: '1.5px 1.5px 0px #111111',
                  transition: 'height 0.1s ease',
                }}
              />
            );
          })}
        </div>
      </div>

      {/* Main Content Area: #1 Hero Winner + Top 2 to Top 5 */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '7px', zIndex: 2 }}>
        {/* #1 Hero Winner Card in Crisp White with Memphis Borders */}
        <div
          style={{
            padding: '10px 12px',
            background: '#ffffff',
            border: '3px solid #111111',
            borderRadius: '14px',
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
                  padding: '3px 8px',
                  borderRadius: '6px',
                  background: config.primaryColor,
                  color: '#111111',
                  fontSize: '0.72rem',
                  fontWeight: 900,
                  fontFamily: 'var(--font-80s)',
                  border: '1.5px solid #111111',
                  boxShadow: '1.5px 1.5px 0px #111111',
                }}
              >
                <Crown size={11} fill="#111111" />
                #1 LUGAR
              </span>
              <span style={{ fontSize: '0.70rem', fontWeight: 800, fontFamily: 'var(--font-80s)', color: '#111111', textTransform: 'uppercase' }}>
                {config.badgeText}
              </span>
            </div>

            <span
              style={{
                fontFamily: 'var(--font-80s)',
                fontSize: '0.78rem',
                color: '#ff2a85',
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
                  borderRadius: '8px',
                  objectFit: 'cover',
                  border: '2px solid #111111',
                  boxShadow: '2px 2px 0px #111111',
                  flexShrink: 0,
                }}
              />
            )}

            <div style={{ minWidth: 0, flex: 1 }}>
              <div
                style={{
                  fontSize: '1.05rem',
                  fontWeight: 900,
                  fontFamily: 'var(--font-80s)',
                  color: '#111111',
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
                  fontSize: '0.84rem',
                  color: '#ff2a85',
                  fontWeight: 800,
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
                fontSize: '0.72rem',
                color: '#444444',
                fontWeight: 600,
                marginTop: '4px',
                lineHeight: 1.3,
                borderTop: '1px dashed #111111',
                paddingTop: '3px',
              }}
            >
              ✦ {top1.highlight}
            </div>
          )}
        </div>

        {/* Top 2 to Top 5 Ranked Rows in Crisp White Container */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
            background: '#ffffff',
            borderRadius: '12px',
            padding: '6px 8px',
            border: '2.5px solid #111111',
            boxShadow: '3px 3px 0px #111111',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0 2px 2px 2px',
              fontSize: '0.66rem',
              fontWeight: 900,
              fontFamily: 'var(--font-80s)',
              color: '#111111',
              letterSpacing: '0.5px',
              borderBottom: '1.5px solid #111111',
            }}
          >
            <span>TOP 2 AO TOP 5</span>
            <span style={{ color: config.primaryColor }}>{config.categoryName.toUpperCase()}</span>
          </div>

          {runnersUp.map((track, idx) => {
            const rank = idx + 2;
            const badgeBg = rank === 2 ? '#ffe600' : rank === 3 ? '#00d2ff' : '#ffffff';

            return (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '3px 4px',
                  borderRadius: '6px',
                  background: idx % 2 === 0 ? 'rgba(0,0,0,0.03)' : 'transparent',
                }}
              >
                <div
                  style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '5px',
                    background: badgeBg,
                    color: '#111111',
                    fontSize: '0.70rem',
                    fontWeight: 900,
                    fontFamily: 'var(--font-80s)',
                    border: '1.5px solid #111111',
                    boxShadow: '1px 1px 0px #111111',
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
                      fontSize: '0.82rem',
                      fontWeight: 800,
                      color: '#111111',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {track.title}
                  </div>
                  <div
                    style={{
                      fontSize: '0.70rem',
                      color: '#666666',
                      fontWeight: 600,
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
        <div style={{ fontFamily: 'var(--font-80s)', fontSize: '0.74rem', color: '#111111' }}>
          AUDITORIA: {config.source.toUpperCase()}
        </div>
      </div>
    </div>
  );
}
