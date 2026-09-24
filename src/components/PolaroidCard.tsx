'use client';

import React from 'react';

export type StoryTheme =
  | 'intro'
  | 'moon'
  | 'radio'
  | 'sales'
  | 'billboard'
  | 'news'
  | 'cinema'
  | 'stats'
  | 'summary';

interface PolaroidCardProps {
  year?: number | string;
  name?: string;
  gender?: 'masculino' | 'feminino' | 'neutro';
  userPhotoUrl?: string;
  caption?: string;
  theme?: StoryTheme;
  rotation?: number;
  width?: string;
  className?: string;
  style?: React.CSSProperties;
}

export function getVintagePhotoSrc(theme: StoryTheme = 'intro', isFemale: boolean): string {
  const genderKey = isFemale ? 'girl' : 'boy';
  switch (theme) {
    case 'moon':
      return `/characters/vintage/moon_${genderKey}.jpg`;
    case 'radio':
      return `/characters/vintage/music_${genderKey}.jpg`;
    case 'sales':
      return `/characters/vintage/sales_${genderKey}.jpg`;
    case 'billboard':
      return `/characters/vintage/billboard_${genderKey}.jpg`;
    case 'news':
      return `/characters/vintage/news_${genderKey}.jpg`;
    case 'cinema':
      return `/characters/vintage/cinema_${genderKey}.jpg`;
    case 'stats':
      return `/characters/vintage/stats_${genderKey}.jpg`;
    case 'summary':
      return `/characters/vintage/party_${genderKey}.jpg`;
    case 'intro':
    default:
      return `/characters/vintage/${genderKey}.jpg`;
  }
}

export type GenderKey = 'boy' | 'girl';

export interface HeadAlignment {
  top: string;
  left: string;
  width: string;
}

export const THEME_HEAD_ALIGNMENTS: Record<GenderKey, Record<StoryTheme, HeadAlignment>> = {
  boy: {
    intro: { top: '-25%', left: '57%', width: '52%' },
    moon: { top: '-27%', left: '50%', width: '78%' },
    radio: { top: '-16%', left: '46%', width: '63%' },
    sales: { top: '-28%', left: '54%', width: '65%' },
    billboard: { top: '-23%', left: '52%', width: '72%' },
    news: { top: '-24%', left: '51%', width: '54%' },
    cinema: { top: '-23%', left: '50%', width: '58%' },
    stats: { top: '-23%', left: '50%', width: '56%' },
    summary: { top: '-21%', left: '50%', width: '52%' },
  },
  girl: {
    intro: { top: '-24%', left: '50%', width: '52%' },
    moon: { top: '-25%', left: '50%', width: '62%' },
    radio: { top: '-22%', left: '52%', width: '58%' },
    sales: { top: '-25%', left: '50%', width: '60%' },
    billboard: { top: '-22%', left: '49%', width: '58%' },
    news: { top: '-24%', left: '50%', width: '52%' },
    cinema: { top: '-23%', left: '50%', width: '56%' },
    stats: { top: '-24%', left: '49%', width: '56%' },
    summary: { top: '-21%', left: '48%', width: '52%' },
  },
};

/* ==========================================================================
   THEMED POP-OUT HEAD ACCESSORIES (SVG STICKERS WITH 1PX DIE-CUT CONTOUR)
   ========================================================================== */

/* 1. Intro: Festive Birthday Party Hat */
export function PartyHatSticker({ style }: { style?: React.CSSProperties }) {
  return (
    <svg
      viewBox="0 0 100 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        width: '46%',
        height: 'auto',
        position: 'absolute',
        top: '-24%',
        left: '12%',
        transform: 'rotate(-14deg)',
        zIndex: 15,
        filter:
          'drop-shadow(1px 0 0 #ffffff) drop-shadow(-1px 0 0 #ffffff) drop-shadow(0 1px 0 #ffffff) drop-shadow(0 -1px 0 #ffffff) drop-shadow(0 2px 4px rgba(0,0,0,0.35))',
        pointerEvents: 'none',
        ...style,
      }}
    >
      <defs>
        <clipPath id="hat-cone-clip">
          <path d="M 50 15 L 12 105 Q 50 115 88 105 Z" />
        </clipPath>
      </defs>

      <g clipPath="url(#hat-cone-clip)">
        <rect x="0" y="88" width="100" height="30" fill="#ff0077" />
        <rect x="0" y="66" width="100" height="24" fill="#d4ff00" />
        <rect x="0" y="44" width="100" height="24" fill="#00e5ff" />
        <rect x="0" y="22" width="100" height="24" fill="#7928ca" />
        <rect x="0" y="0" width="100" height="24" fill="#ffff00" />
      </g>

      <path
        d="M 50 15 L 12 105 Q 50 115 88 105 Z"
        fill="none"
        stroke="#0c0d11"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />

      <circle cx="50" cy="14" r="8.5" fill="#ffffff" stroke="#0c0d11" strokeWidth="2" />
      <circle cx="48" cy="12" r="3" fill="#d4ff00" opacity="0.8" />
    </svg>
  );
}

/* 2. Moon/Astronomy: Retro Astronaut Bubble Space Visor & Antenna */
export function AstronautHelmetSticker({ style }: { style?: React.CSSProperties }) {
  return (
    <svg
      viewBox="0 0 120 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        width: '90%',
        height: 'auto',
        position: 'absolute',
        top: '-12%',
        left: '5%',
        zIndex: 16,
        filter:
          'drop-shadow(1px 0 0 #ffffff) drop-shadow(-1px 0 0 #ffffff) drop-shadow(0 1px 0 #ffffff) drop-shadow(0 -1px 0 #ffffff) drop-shadow(0 2px 4px rgba(0,0,0,0.35))',
        pointerEvents: 'none',
        ...style,
      }}
    >
      <path
        d="M 16 46 C 38 18, 82 18, 104 46 C 94 66, 26 66, 16 46 Z"
        fill="#ffd700"
        stroke="#0c0d11"
        strokeWidth="2.5"
      />
      <path
        d="M 28 38 C 45 25, 75 25, 92 38"
        stroke="#ffffff"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
        opacity="0.9"
      />
      <path
        d="M 12 50 C 35 12, 85 12, 108 50"
        fill="none"
        stroke="#ffffff"
        strokeWidth="6"
        strokeLinecap="round"
      />
      <path
        d="M 12 50 C 35 12, 85 12, 108 50"
        fill="none"
        stroke="#0c0d11"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <line x1="94" y1="20" x2="112" y2="-2" stroke="#0c0d11" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="112" cy="-2" r="6" fill="#00ffcc" stroke="#0c0d11" strokeWidth="2" />
      <circle cx="111" cy="-3" r="2" fill="#ffffff" />
    </svg>
  );
}

/* 3. Music (Radio/Sales/Billboard): Vintage 80s Sony Walkman Orange Headphones */
export function RetroHeadphonesSticker({ style }: { style?: React.CSSProperties }) {
  return (
    <svg
      viewBox="0 0 130 90"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        width: '108%',
        height: 'auto',
        position: 'absolute',
        top: '-10%',
        left: '-4%',
        zIndex: 16,
        filter:
          'drop-shadow(1px 0 0 #ffffff) drop-shadow(-1px 0 0 #ffffff) drop-shadow(0 1px 0 #ffffff) drop-shadow(0 -1px 0 #ffffff) drop-shadow(0 2px 4px rgba(0,0,0,0.35))',
        pointerEvents: 'none',
        ...style,
      }}
    >
      <path
        d="M 18 48 C 18 -10, 112 -10, 112 48"
        fill="none"
        stroke="#222226"
        strokeWidth="6.5"
        strokeLinecap="round"
      />
      <path
        d="M 18 48 C 18 -10, 112 -10, 112 48"
        fill="none"
        stroke="#e5e5ea"
        strokeWidth="3.2"
        strokeLinecap="round"
      />
      <rect x="2" y="38" width="18" height="38" rx="8" fill="#ff6600" stroke="#0c0d11" strokeWidth="2.5" />
      <rect x="5" y="44" width="4" height="26" rx="2" fill="#ffa366" opacity="0.6" />
      <rect x="110" y="38" width="18" height="38" rx="8" fill="#ff6600" stroke="#0c0d11" strokeWidth="2.5" />
      <rect x="113" y="44" width="4" height="26" rx="2" fill="#ffa366" opacity="0.6" />
    </svg>
  );
}

/* 4. News: Vintage 1980s Press Reporter Fedora with "PRESS" Card */
export function PressReporterHatSticker({ style }: { style?: React.CSSProperties }) {
  return (
    <svg
      viewBox="0 0 130 70"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        width: '106%',
        height: 'auto',
        position: 'absolute',
        top: '-26%',
        left: '-3%',
        transform: 'rotate(-4deg)',
        zIndex: 16,
        filter:
          'drop-shadow(1px 0 0 #ffffff) drop-shadow(-1px 0 0 #ffffff) drop-shadow(0 1px 0 #ffffff) drop-shadow(0 -1px 0 #ffffff) drop-shadow(0 2px 4px rgba(0,0,0,0.35))',
        pointerEvents: 'none',
        ...style,
      }}
    >
      <path
        d="M 32 46 C 30 18, 44 8, 65 12 C 88 8, 100 18, 98 46 Z"
        fill="#3f372f"
        stroke="#0c0d11"
        strokeWidth="2.5"
      />
      <ellipse cx="65" cy="48" rx="60" ry="12" fill="#2d2620" stroke="#0c0d11" strokeWidth="2.5" />
      <path d="M 31 44 Q 65 48 99 44 Q 65 40 31 44" fill="#ff0055" />
      <g transform="translate(74, 18) rotate(14)">
        <rect x="0" y="0" width="30" height="16" fill="#ffffff" stroke="#0c0d11" strokeWidth="1.5" rx="1.5" />
        <text
          x="3.5"
          y="11.5"
          fontFamily="monospace, sans-serif"
          fontWeight="900"
          fontSize="8.5"
          fill="#e50914"
          letterSpacing="0.5"
        >
          PRESS
        </text>
      </g>
    </svg>
  );
}

/* 5. Cinema: Classic 3D Red & Cyan Paper Anaglyph Glasses */
export function Retro3DGlassesSticker({ style }: { style?: React.CSSProperties }) {
  return (
    <svg
      viewBox="0 0 120 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        width: '92%',
        height: 'auto',
        position: 'absolute',
        top: '6%',
        left: '4%',
        transform: 'rotate(-3deg)',
        zIndex: 16,
        filter:
          'drop-shadow(1px 0 0 #ffffff) drop-shadow(-1px 0 0 #ffffff) drop-shadow(0 1px 0 #ffffff) drop-shadow(0 -1px 0 #ffffff) drop-shadow(0 2px 4px rgba(0,0,0,0.35))',
        pointerEvents: 'none',
        ...style,
      }}
    >
      <rect x="6" y="6" width="108" height="26" rx="4" fill="#ffffff" stroke="#0c0d11" strokeWidth="2.5" />
      <rect x="14" y="10" width="38" height="18" rx="2" fill="#ff0044" stroke="#0c0d11" strokeWidth="1.5" opacity="0.95" />
      <rect x="16" y="12" width="6" height="4" fill="#ffffff" opacity="0.6" />
      <rect x="68" y="10" width="38" height="18" rx="2" fill="#00e5ff" stroke="#0c0d11" strokeWidth="1.5" opacity="0.95" />
      <rect x="70" y="12" width="6" height="4" fill="#ffffff" opacity="0.6" />
      <path d="M 52 32 Q 60 22 68 32" fill="#ffffff" stroke="#0c0d11" strokeWidth="2" />
    </svg>
  );
}

/* 6. Cosmic Stats: 8-Bit Pixel "Thug Life" Retro Sunglasses */
export function PixelShadesSticker({ style }: { style?: React.CSSProperties }) {
  return (
    <svg
      viewBox="0 0 110 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        width: '88%',
        height: 'auto',
        position: 'absolute',
        top: '18%',
        left: '6%',
        zIndex: 16,
        filter:
          'drop-shadow(1px 0 0 #ffffff) drop-shadow(-1px 0 0 #ffffff) drop-shadow(0 1px 0 #ffffff) drop-shadow(0 -1px 0 #ffffff) drop-shadow(0 2px 4px rgba(0,0,0,0.35))',
        pointerEvents: 'none',
        ...style,
      }}
    >
      <path
        d="M 6 4 H 46 V 16 H 38 V 22 H 14 V 16 H 6 Z M 64 4 H 104 V 16 H 96 V 22 H 72 V 16 H 64 Z M 46 4 H 64 V 10 H 46 Z"
        fill="#0c0d11"
        stroke="#ffffff"
        strokeWidth="1.5"
      />
      <rect x="12" y="7" width="6" height="5" fill="#ffffff" />
      <rect x="18" y="11" width="5" height="4" fill="#ffffff" />
      <rect x="70" y="7" width="6" height="5" fill="#ffffff" />
      <rect x="76" y="11" width="5" height="4" fill="#ffffff" />
    </svg>
  );
}

/* 7. Summary: Royal Golden Birthday VIP Celebration Crown */
export function GoldenCrownSticker({ style }: { style?: React.CSSProperties }) {
  return (
    <svg
      viewBox="0 0 90 70"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        width: '68%',
        height: 'auto',
        position: 'absolute',
        top: '-26%',
        left: '16%',
        transform: 'rotate(-2deg)',
        zIndex: 16,
        filter:
          'drop-shadow(1px 0 0 #ffffff) drop-shadow(-1px 0 0 #ffffff) drop-shadow(0 1px 0 #ffffff) drop-shadow(0 -1px 0 #ffffff) drop-shadow(0 2px 4px rgba(0,0,0,0.35))',
        pointerEvents: 'none',
        ...style,
      }}
    >
      <polygon
        points="10,48 18,18 36,34 45,8 54,34 72,18 80,48"
        fill="#ffd700"
        stroke="#0c0d11"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <rect x="8" y="44" width="74" height="10" rx="2" fill="#ffaa00" stroke="#0c0d11" strokeWidth="2.2" />
      <circle cx="45" cy="28" r="5" fill="#ff0055" stroke="#0c0d11" strokeWidth="1.2" />
      <circle cx="24" cy="36" r="4" fill="#00e5ff" stroke="#0c0d11" strokeWidth="1" />
      <circle cx="66" cy="36" r="4" fill="#00ff66" stroke="#0c0d11" strokeWidth="1" />
      <path
        d="M 45 -2 L 47 4 L 53 6 L 47 8 L 45 14 L 43 8 L 37 6 L 43 4 Z"
        fill="#ffffff"
        stroke="#0c0d11"
        strokeWidth="1.2"
      />
    </svg>
  );
}

export function renderThemedHeadAccessory(theme: StoryTheme = 'intro') {
  switch (theme) {
    case 'moon':
      return <AstronautHelmetSticker />;
    case 'radio':
    case 'sales':
    case 'billboard':
      return <RetroHeadphonesSticker />;
    case 'news':
      return <PressReporterHatSticker />;
    case 'cinema':
      return <Retro3DGlassesSticker />;
    case 'stats':
      return <PixelShadesSticker />;
    case 'summary':
      return <GoldenCrownSticker />;
    case 'intro':
    default:
      return <PartyHatSticker />;
  }
}

function getThemedCaption(theme: StoryTheme = 'intro', name?: string, year?: number | string): string {
  const upperName = name ? name.toUpperCase() : 'VOCÊ';
  switch (theme) {
    case 'moon':
      return `★ ${upperName} // LUA ${year || ''}`;
    case 'radio':
      return `★ ${upperName} // RÁDIO ${year || ''}`;
    case 'sales':
      return `★ ${upperName} // TOP LP ${year || ''}`;
    case 'billboard':
      return `★ ${upperName} // HIT #1 ${year || ''}`;
    case 'news':
      return `★ ${upperName} // EXTRA ${year || ''}`;
    case 'cinema':
      return `★ ${upperName} // CINEMA ${year || ''}`;
    case 'stats':
      return `★ ${upperName} // CÓSMICO`;
    case 'summary':
      return `★ ${upperName} // VIP ARCHIVE`;
    case 'intro':
    default:
      return name ? `★ ${upperName} // ${year || ''}` : `★ TIME ARCHIVE // ${year || ''}`;
  }
}

/* ==========================================================================
   POLAROID CARD COMPONENT WITH THEMED BODIES & TOP HEAD OVERLAY LAYER
   ========================================================================== */

export default function PolaroidCard({
  year = 1989,
  name,
  gender = 'masculino',
  userPhotoUrl,
  caption,
  theme = 'intro',
  rotation = -1.5,
  width = '138px',
  className = '',
  style,
}: PolaroidCardProps) {
  const isFemale = gender === 'feminino';
  const vintagePhotoSrc = getVintagePhotoSrc(theme, isFemale);
  const defaultCaption = caption || getThemedCaption(theme, name, year);

  const genderKey: GenderKey = isFemale ? 'girl' : 'boy';
  const headAlign = THEME_HEAD_ALIGNMENTS[genderKey]?.[theme] || THEME_HEAD_ALIGNMENTS.boy[theme];

  return (
    <div
      className={`acid-polaroid-container ${className}`}
      style={{
        width: width || '138px',
        maxWidth: '175px',
        transform: `rotate(${rotation}deg)`,
        margin: '0 auto',
        display: 'block',
        position: 'relative',
        boxSizing: 'border-box',
        userSelect: 'none',
        overflow: 'visible',
        ...style,
      }}
    >
      {/* 1. POLAROID CARD FRAME LAYER (White Frame + Themed Photo + Bottom Chin Margin) */}
      <div
        className="acid-polaroid-frame"
        style={{
          background: '#ffffff',
          border: '1px solid rgba(0, 0, 0, 0.15)',
          boxShadow: '0 8px 20px rgba(0, 0, 0, 0.18), 3px 3px 0px rgba(12, 13, 17, 0.15)',
          borderRadius: '2px',
          padding: '5px 5px 12px 5px',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          overflow: 'hidden',
          boxSizing: 'border-box',
          width: '100%',
          zIndex: 5,
        }}
      >
        {/* Photo Viewport */}
        <div
          className="acid-polaroid-photo-viewport"
          style={{
            position: 'relative',
            width: '100%',
            aspectRatio: '1.09 / 1',
            background: '#15171d',
            overflow: 'hidden',
            border: '1px solid rgba(0, 0, 0, 0.15)',
            boxSizing: 'border-box',
          }}
        >
          {/* Themed Vintage Photograph (NASA Astronaut, Rockstar, Journalist, Cinema Director, Arcade Gamer, Party Tuxedo) */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={vintagePhotoSrc}
            alt="Fotografia Vintage Real"
            className="acid-polaroid-body-img"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center top',
              display: 'block',
              filter: 'contrast(108%) brightness(1.02)',
            }}
          />
        </div>

        {/* Polaroid Bottom Margin Chin */}
        <div
          className="acid-polaroid-chin"
          style={{
            marginTop: '4px',
            padding: '1px 2px 0 2px',
            display: 'flex',
            flexDirection: 'column',
            gap: '1px',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span
              className="acid-polaroid-title"
              style={{
                fontFamily: 'var(--font-maximalist)',
                fontSize: 'clamp(0.52rem, 1.4cqw, 0.66rem)',
                fontWeight: 900,
                color: '#0c0d11',
                letterSpacing: '-0.2px',
                lineHeight: 1.1,
                textTransform: 'uppercase',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                maxWidth: '75%',
              }}
            >
              {defaultCaption}
            </span>
            <div className="acid-barcode" style={{ height: '7px', color: '#0c0d11' }}>
              <span /><span /><span /><span />
            </div>
          </div>

          <div
            className="acid-polaroid-meta"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'clamp(0.38rem, 1cqw, 0.46rem)',
              color: '#666670',
              fontWeight: 700,
              letterSpacing: '0.5px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <span>ORIGINAL ARCHIVE</span>
            <span>9:16</span>
          </div>
        </div>
      </div>

      {/* 2. Frosted Washi Tape strip on top of Polaroid paper (zIndex: 15) */}
      <div
        className="acid-polaroid-tape"
        style={{
          position: 'absolute',
          top: '-7px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '48px',
          height: '14px',
          background: 'rgba(255, 255, 255, 0.85)',
          border: '1px dashed rgba(0, 0, 0, 0.25)',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.15)',
          backdropFilter: 'blur(2px)',
          zIndex: 15,
          pointerEvents: 'none',
        }}
      />

      {/* 3. HEAD & THEMED ACCESSORY OVERLAY (ON TOP OF THE POLAROID LAYER! zIndex: 35) */}
      {userPhotoUrl && (
        <div
          className="acid-polaroid-head-popout-layer"
          style={{
            position: 'absolute',
            top: headAlign.top,
            left: headAlign.left,
            transform: 'translateX(-50%)',
            width: headAlign.width,
            zIndex: 35, // ON TOP OF POLAROID LAYER!
            pointerEvents: 'none',
          }}
        >
          {/* Themed Head Accessory (Hat, Helmet, Headphones, Glasses, Crown) */}
          {renderThemedHeadAccessory(theme)}

          {/* Real User Photo Cutout: 100% Full Color with Fine 1px White Die-Cut Sticker Outline */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={userPhotoUrl}
            alt="Rosto recortado da pessoa"
            className="acid-polaroid-face-img"
            style={{
              width: '100%',
              height: 'auto',
              display: 'block',
              filter:
                'drop-shadow(1px 0 0 #ffffff) drop-shadow(-1px 0 0 #ffffff) drop-shadow(0 1px 0 #ffffff) drop-shadow(0 -1px 0 #ffffff) drop-shadow(0 6px 12px rgba(0,0,0,0.5)) contrast(1.05) saturate(1.12)',
            }}
          />
        </div>
      )}

      {/* If no userPhotoUrl provided, render the themed accessory on top of the vintage model */}
      {!userPhotoUrl && (
        <div
          style={{
            position: 'absolute',
            top: headAlign.top,
            left: headAlign.left,
            transform: 'translateX(-50%)',
            width: headAlign.width,
            zIndex: 35,
            pointerEvents: 'none',
          }}
        >
          {renderThemedHeadAccessory(theme)}
        </div>
      )}
    </div>
  );
}
