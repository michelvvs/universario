'use client';

import React, { useState } from 'react';
import { BirthDataPayload, MusicTrack } from '@/types/universario';
import { getWhenBornPhrase } from '@/lib/grammatical-gender';
import { Disc3, Radio, Disc, Globe } from 'lucide-react';
import { VcrOsdBadge, ScotchTape, DymoLabel, VhsGoldSeal, VcrVuMeter } from '../VhsGraphics';
import StoryHeader from '../StoryHeader';
import StoryCharacter from '../StoryCharacter';

interface SlideProps {
  data: BirthDataPayload;
  categoryId: 'radio_br' | 'sales_br' | 'billboard';
}

export default function SlideMusicCategory({ data, categoryId }: SlideProps) {
  const { music } = data;
  const [imageError, setImageError] = useState<boolean>(false);

  // 80s Tape Category Configs
  const categoryConfigs = {
    radio_br: {
      categoryName: 'Rádios Brasil',
      headerTitle: 'RÁDIOS FM • AIRPLAY 80s',
      subtitle: 'Mais tocadas nas emissoras de rádio',
      source: 'Crowley Broadcast / NOPEM / ECAD',
      icon: Radio,
      tapeBrand: 'TDK SA-90',
      badgeColor: 'red' as const,
      tracks: music.brazilRadioTop5 || [music.brazilTopTrack],
      badgeText: 'FM #1 HIT',
    },
    sales_br: {
      categoryName: 'Vendas Brasil',
      headerTitle: 'VENDAS • LPs & FITAS K7',
      subtitle: 'Discos e fitas mais vendidos',
      source: 'Instituto NOPEM / Pro-Música Brasil',
      icon: Disc,
      tapeBrand: 'MAXELL XL-II',
      badgeColor: 'blue' as const,
      tracks: music.brazilSalesTop5 || [music.brazilSalesTrack || music.brazilTopTrack],
      badgeText: 'DISCO DE PLATINA',
    },
    billboard: {
      categoryName: 'Billboard Hot 100',
      headerTitle: 'BILLBOARD HOT 100 • EUA',
      subtitle: 'Parada oficial internacional',
      source: 'Billboard Hot 100 (EUA)',
      icon: Globe,
      tapeBrand: 'BASF CHROME',
      badgeColor: 'black' as const,
      tracks: music.billboardTop5 || [music.globalTopTrack],
      badgeText: 'GLOBAL #1 HIT',
    },
  };

  const config = categoryConfigs[categoryId] || categoryConfigs.radio_br;
  const tracks: MusicTrack[] = config.tracks || [];
  const top1 = tracks[0] || (categoryId === 'billboard' ? music.globalTopTrack : music.brazilTopTrack);
  const runnersUp = tracks.slice(1, 5);
  const coverUrl = top1?.coverUrl;
  const hasValidCover = coverUrl && !imageError;

  const whenBorn = getWhenBornPhrase(data.name, data.gender);
  const categorySubtitles = {
    radio_br: `As mais tocadas ${whenBorn}`,
    sales_br: `Os discos mais vendidos ${whenBorn}`,
    billboard: `O topo das paradas mundiais ${whenBorn}`,
  };
  const dynamicSubtitle = categorySubtitles[categoryId] || `As mais tocadas ${whenBorn}`;

  return (
    <div className={`slide-vhs-canvas slide-theme-${categoryId === 'billboard' ? 'billboard' : categoryId === 'sales_br' ? 'sales' : 'radio'}`} style={{ position: 'relative' }}>
      {/* Integrated Retro VCR Header (Safe Story OSD) */}
      <StoryHeader data={data} />

      {/* Category Main Header: Synthesized & Clean */}
      <div style={{ textAlign: 'center', zIndex: 2, marginBottom: '6px' }}>
        <h2
          style={{
            fontSize: 'clamp(1.2rem, 4.2vw, 1.55rem)',
            fontWeight: 900,
            fontFamily: "'Archivo Black', sans-serif",
            color: '#ffffff',
            lineHeight: 1.1,
            letterSpacing: '0.8px',
            textShadow: '0 2px 6px rgba(0,0,0,0.9), 0 0 12px rgba(255, 230, 0, 0.25)',
            textTransform: 'uppercase',
            margin: 0,
          }}
        >
          TOP 5 • {config.categoryName.toUpperCase()}
        </h2>
        <div
          style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: 'clamp(0.68rem, 2vw, 0.76rem)',
            color: 'var(--vhs-gold)',
            letterSpacing: '0.5px',
            marginTop: '3px',
            fontWeight: 700,
          }}
        >
          {dynamicSubtitle.toUpperCase()}
        </div>
      </div>

      {/* 3D Themed Caricature (Radio, Sales or Billboard) on the Right, above the cards */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%', zIndex: 3, marginBottom: '-18px' }}>
        <StoryCharacter
          theme={categoryId === 'billboard' ? 'billboard' : categoryId === 'sales_br' ? 'sales' : 'radio'}
          gender={data.gender}
          style={{ marginRight: '-4px' }}
        />
      </div>

      {/* Main Content: #1 Torn Photo Album Card + Lined J-Card Top 2-5 (Aligned to Bottom) */}
      <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 'clamp(3px, 0.9vh, 5px)', zIndex: 2 }}>
        {/* #1 Torn Photo Album Cover Card */}
        <div
          className="torn-photo-card"
          style={{
            padding: 'clamp(5px, 1.4vw, 7px) clamp(7px, 1.8vw, 10px)',
            background: '#fffdf4',
            transform: 'rotate(-0.5deg)',
          }}
        >
          <ScotchTape width={46} height={14} rotate={-5} style={{ top: '-6px', right: '10%' }} />

          {/* Top Row: #1 Gold Badge & Category Info */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2px' }}>
            <VhsGoldSeal title="#1 HIT" subtitle={config.badgeText} />
            <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.64rem', color: '#e50914', fontWeight: 900 }}>
              ★ CAMPEÃO DAS PARADAS
            </span>
          </div>

          {/* Album Cover Thumbnail + Title & Artist */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div
              style={{
                position: 'relative',
                width: 'clamp(36px, 9vw, 44px)',
                height: 'clamp(36px, 9vw, 44px)',
                borderRadius: '3px',
                overflow: 'hidden',
                boxShadow: '0 2px 6px rgba(0,0,0,0.4)',
                border: '1px solid #111111',
                flexShrink: 0,
                background: '#1a1a1e',
              }}
            >
              {hasValidCover ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={coverUrl}
                  alt={top1.title}
                  onError={() => setImageError(true)}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#ffffff' }}>
                  <Disc3 size={18} />
                </div>
              )}
            </div>

            <div style={{ minWidth: 0, flex: 1 }}>
              <div
                style={{
                  fontSize: 'clamp(0.86rem, 2.6vw, 0.98rem)',
                  fontWeight: 900,
                  fontFamily: "'Archivo Black', sans-serif",
                  color: '#111827',
                  lineHeight: 1.15,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {top1.title}
              </div>
              <div
                style={{
                  fontSize: '0.74rem',
                  color: '#e50914',
                  fontWeight: 800,
                  fontFamily: "'Share Tech Mono', monospace",
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
                fontSize: '0.62rem',
                color: '#4b5563',
                fontFamily: "'Share Tech Mono', monospace",
                fontWeight: 700,
                marginTop: '2px',
                lineHeight: 1.2,
                borderTop: '1px dashed #d1d5db',
                paddingTop: '2px',
              }}
            >
              ✦ {top1.highlight}
            </div>
          )}
        </div>

        {/* Top 2 to Top 5 Lined J-Card Tracklist */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '2px',
            background: 'rgba(16, 18, 24, 0.92)',
            borderRadius: '6px',
            padding: '3px 6px',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            boxShadow: '0 4px 10px rgba(0,0,0,0.6)',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0 2px 1px 2px',
              fontSize: '0.60rem',
              fontWeight: 800,
              fontFamily: "'Share Tech Mono', monospace",
              color: 'var(--vhs-cyan)',
              letterSpacing: '0.5px',
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            <span>DO 2º AO 5º LUGAR</span>
            <span style={{ color: 'var(--vhs-gold)' }}>PARADA MUSICAL</span>
          </div>

          {runnersUp.map((track, idx) => {
            const rank = idx + 2;
            const numColor = rank === 2 ? 'var(--vhs-gold)' : rank === 3 ? 'var(--vhs-cyan)' : '#9ca3af';

            return (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '2px 4px',
                  borderRadius: '3px',
                  background: idx % 2 === 0 ? 'rgba(255,255,255,0.03)' : 'transparent',
                }}
              >
                <div
                  style={{
                    fontFamily: "'VT323', monospace",
                    fontSize: '0.85rem',
                    color: numColor,
                    fontWeight: 900,
                    width: '18px',
                    textAlign: 'center',
                    flexShrink: 0,
                  }}
                >
                  0{rank}.
                </div>

                <div style={{ minWidth: 0, flex: 1 }}>
                  <div
                    style={{
                      fontSize: 'clamp(0.74rem, 2.2vw, 0.80rem)',
                      fontWeight: 800,
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
                      fontSize: '0.64rem',
                      color: '#9ca3af',
                      fontFamily: "'Share Tech Mono', monospace",
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

      {/* Footer VCR VU Meter & Audio Specifications */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', zIndex: 2, padding: '0 2px' }}>
        <VcrVuMeter />
        <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.58rem', color: '#9ca3af' }}>
          FONTE: {config.source}
        </div>
      </div>
    </div>
  );
}
