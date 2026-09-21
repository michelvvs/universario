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

// Measured neck and head centers (in % of width) and sizes for each unique chibi render
const HEAD_OFFSETS: Record<'boy' | 'girl', Record<CharacterTheme, { centerX: number; top: number; size: number }>> = {
  boy: {
    moon: { centerX: 34, top: 4, size: 50 },
    radio: { centerX: 61, top: 5, size: 50 },
    sales: { centerX: 71, top: 5, size: 50 },
    billboard: { centerX: 52, top: 4, size: 50 },
    news: { centerX: 46, top: 4, size: 50 },
    cinema: { centerX: 49, top: 5, size: 50 },
    stats: { centerX: 40, top: 4, size: 50 },
    intro: { centerX: 56, top: 6, size: 45 },
    summary: { centerX: 58, top: 7, size: 48 },
  },
  girl: {
    moon: { centerX: 35, top: 5, size: 50 },
    radio: { centerX: 58, top: 6, size: 50 },
    sales: { centerX: 60, top: 5, size: 50 },
    billboard: { centerX: 52, top: 5, size: 50 },
    news: { centerX: 45, top: 4, size: 50 },
    cinema: { centerX: 49, top: 5, size: 50 },
    stats: { centerX: 39, top: 4, size: 50 },
    intro: { centerX: 55, top: 5, size: 46 },
    summary: { centerX: 61, top: 7, size: 48 },
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
  // If user provided their photo, use the headless body so their head fits naturally on the neck collar
  const imageSrc = userPhotoUrl
    ? `/characters/headless/${genderFolder}/${theme}.png`
    : `/characters/${genderFolder}/${theme}.png`;

  if (hasError) {
    return null;
  }

  const offset = HEAD_OFFSETS[genderFolder]?.[theme] || { centerX: 50, top: 5, size: 50 };

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

      {/* Real User Face Cutout Layer (Seamlessly seated on the neck collar without frame) */}
      {userPhotoUrl && (
        <div
          className="story-character-face-overlay"
          style={{
            position: 'absolute',
            top: `${offset.top}%`,
            left: `${offset.centerX}%`,
            transform: 'translateX(-50%)',
            width: `${offset.size}%`,
            zIndex: 15,
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={userPhotoUrl}
            alt="Rosto recortado da pessoa"
            style={{
              width: '100%',
              height: 'auto',
              maxHeight: '100%',
              objectFit: 'contain',
              filter: 'drop-shadow(0 4px 10px rgba(0, 0, 0, 0.45)) contrast(1.05) saturate(1.1)',
              display: 'block',
            }}
          />
        </div>
      )}
    </div>
  );
}
