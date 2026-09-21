'use client';

import React from 'react';
import { BirthDataPayload } from '@/types/universario';

interface StoryHeaderProps {
  data: BirthDataPayload;
}

export default function StoryHeader({ data }: StoryHeaderProps) {
  const displayName = data.name ? data.name.toUpperCase() : 'UNIVERSÁRIO';

  return (
    <div className="story-integrated-header">
      <div className="story-integrated-header-left">
        <span className="story-integrated-badge">📼 {displayName}</span>
      </div>
      <div className="story-integrated-header-right">
        <span className="story-integrated-rec">REC ●</span>
        <span className="story-integrated-date">
          {data.dayOfMonth} {data.monthName.slice(0, 3).toUpperCase()} {data.year}
        </span>
      </div>
    </div>
  );
}
