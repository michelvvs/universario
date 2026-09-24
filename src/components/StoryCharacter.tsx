'use client';

import React from 'react';
import PolaroidCard, { StoryTheme } from './PolaroidCard';

export type CharacterTheme = StoryTheme;

interface StoryCharacterProps {
  theme: CharacterTheme;
  gender?: 'masculino' | 'feminino' | 'neutro';
  userPhotoUrl?: string;
  name?: string;
  year?: number | string;
  style?: React.CSSProperties;
  className?: string;
  variant?: 'color' | 'halftone';
}

const THEME_ROTATIONS: Record<CharacterTheme, number> = {
  intro: -2,
  moon: 2.2,
  radio: -2,
  sales: 1.8,
  billboard: -1.5,
  news: 2.0,
  cinema: -2.4,
  stats: 2.5,
  summary: -1.8,
};

export default function StoryCharacter({
  theme,
  gender = 'masculino',
  userPhotoUrl,
  name,
  year,
  style,
  className = '',
}: StoryCharacterProps) {
  const rotation = THEME_ROTATIONS[theme] ?? -1.5;

  return (
    <div
      className={`story-character-polaroid-wrapper ${className}`}
      style={{
        display: 'inline-block',
        pointerEvents: 'none',
        zIndex: 15,
        overflow: 'visible',
        ...style,
      }}
    >
      <PolaroidCard
        theme={theme}
        gender={gender}
        userPhotoUrl={userPhotoUrl}
        name={name}
        year={year}
        width="clamp(76px, 22cqw, 88px)"
        rotation={rotation}
      />
    </div>
  );
}
