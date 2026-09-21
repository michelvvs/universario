'use client';

import React, { useState } from 'react';

export type CharacterTheme =
  | 'intro'
  | 'moon'
  | 'radio'
  | 'sales'
  | 'billboard'
  | 'news'
  | 'cinema'
  | 'stats'
  | 'summary';

interface StoryCharacterProps {
  theme: CharacterTheme;
  gender?: 'masculino' | 'feminino' | 'neutro';
  userPhotoUrl?: string;
  style?: React.CSSProperties;
  className?: string;
}

// Measured head centers (in % of width) and sizes for each unique chibi render
const HEAD_OFFSETS: Record<'boy' | 'girl', Record<CharacterTheme, { centerX: number; top: number; size: number }>> = {
  boy: {
    moon: { centerX: 37, top: 13, size: 44 },
    radio: { centerX: 50, top: 13, size: 48 },
    sales: { centerX: 67, top: 13, size: 48 },
    billboard: { centerX: 63, top: 13, size: 48 },
    news: { centerX: 39, top: 13, size: 44 },
    cinema: { centerX: 49, top: 13, size: 52 },
    stats: { centerX: 38, top: 13, size: 44 },
    intro: { centerX: 40, top: 16, size: 36 },
    summary: { centerX: 50, top: 13, size: 50 },
  },
  girl: {
    moon: { centerX: 40, top: 13, size: 45 },
    radio: { centerX: 49, top: 13, size: 48 },
    sales: { centerX: 60, top: 13, size: 46 },
    billboard: { centerX: 52, top: 13, size: 48 },
    news: { centerX: 36, top: 13, size: 44 },
    cinema: { centerX: 48, top: 13, size: 52 },
    stats: { centerX: 37, top: 13, size: 44 },
    intro: { centerX: 59, top: 13, size: 46 },
    summary: { centerX: 54, top: 13, size: 52 },
  },
};

export default function StoryCharacter({
  theme,
  gender = 'masculino',
  userPhotoUrl,
  style,
  className = '',
}: StoryCharacterProps) {
  const [hasError, setHasError] = useState(false);

  const genderFolder: 'boy' | 'girl' = gender === 'feminino' ? 'girl' : 'boy';
  const imageSrc = `/characters/${genderFolder}/${theme}.png`;

  if (hasError) {
    return null;
  }

  const offset = HEAD_OFFSETS[genderFolder]?.[theme] || { centerX: 50, top: 13, size: 48 };

  return (
    <div
      className={`story-character-wrapper ${className}`}
      style={{
        position: 'relative',
        display: 'inline-flex',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        pointerEvents: 'none',
        zIndex: 10,
        ...style,
      }}
    >
      {/* 3D Chibi Cartoon Body */}
      <img
        src={imageSrc}
        alt={`Caricatura Chibi 3D ${theme}`}
        onError={() => setHasError(true)}
        className="story-character-img"
        style={{
          display: 'block',
          height: 'clamp(115px, 25cqh, 160px)',
          width: 'auto',
          maxWidth: '150px',
          objectFit: 'contain',
          filter: 'drop-shadow(0 6px 16px rgba(0, 0, 0, 0.9)) drop-shadow(0 0 1.5px rgba(255, 255, 255, 0.35))',
          userSelect: 'none',
        }}
      />

      {/* Real User Face Cutout Layer (Seamlessly overlaid on Chibi Head) */}
      {userPhotoUrl && (
        <div
          className="story-character-face-overlay"
          style={{
            position: 'absolute',
            top: `${offset.top}%`,
            left: `${offset.centerX}%`,
            transform: 'translateX(-50%) rotate(-0.5deg)',
            width: `${offset.size}%`,
            aspectRatio: '1 / 1.08',
            borderRadius: '50%',
            overflow: 'hidden',
            border: '2px solid rgba(255, 255, 255, 0.92)',
            boxShadow: '0 4px 14px rgba(0, 0, 0, 0.85), inset 0 0 10px rgba(0, 0, 0, 0.4)',
            zIndex: 15,
            backgroundColor: '#11131a',
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={userPhotoUrl}
            alt="Rosto recortado do usuário"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              filter: 'contrast(1.08) saturate(1.15) sepia(0.06)',
            }}
          />
        </div>
      )}
    </div>
  );
}
