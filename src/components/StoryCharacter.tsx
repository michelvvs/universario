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
  style?: React.CSSProperties;
  className?: string;
}

export default function StoryCharacter({
  theme,
  gender = 'masculino',
  style,
  className = '',
}: StoryCharacterProps) {
  const [hasError, setHasError] = useState(false);
  
  // Choose gender folder: 'girl' for feminino, 'boy' for masculino or neutro
  const genderFolder = gender === 'feminino' ? 'girl' : 'boy';
  const imageSrc = `/characters/${genderFolder}/${theme}.png`;

  if (hasError) {
    return null;
  }

  return (
    <div
      className={`story-character-wrapper ${className}`}
      style={{
        position: 'relative',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        pointerEvents: 'none',
        zIndex: 5,
        ...style,
      }}
    >
      <img
        src={imageSrc}
        alt={`Caricatura 3D ${theme}`}
        onError={() => setHasError(true)}
        className="story-character-img"
        style={{
          height: 'clamp(120px, 26cqh, 175px)',
          width: 'auto',
          objectFit: 'contain',
          filter: 'drop-shadow(0 8px 20px rgba(0, 0, 0, 0.9)) drop-shadow(0 0 3px rgba(255, 255, 255, 0.25))',
          userSelect: 'none',
        }}
      />
    </div>
  );
}
