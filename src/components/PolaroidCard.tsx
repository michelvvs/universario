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

export interface PolaroidCardProps {
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

export function getThemedCaption(theme: StoryTheme = 'intro', name?: string, year?: number | string): string {
  const upperName = (name || 'VIP').toUpperCase();
  switch (theme) {
    case 'moon':
      return name ? `★ ${upperName} // APOLLO` : `★ LUNAR ARCHIVE // ${year || '1989'}`;
    case 'radio':
      return `★ ${upperName} // FM AIRPLAY`;
    case 'sales':
      return `★ ${upperName} // GOLD LP #1`;
    case 'billboard':
      return `★ ${upperName} // BILLBOARD HOT`;
    case 'news':
      return `★ ${upperName} // DAILY NEWS`;
    case 'cinema':
      return `★ ${upperName} // BLOCKBUSTER`;
    case 'stats':
      return `★ ${upperName} // TELEMETRY`;
    case 'summary':
      return `★ ${upperName} // VIP ARCHIVE`;
    case 'intro':
    default:
      return name ? `★ ${upperName} // ${year || ''}` : `★ TIME ARCHIVE // ${year || ''}`;
  }
}

export function getThemeMeta(theme: StoryTheme = 'intro', year?: number | string): string {
  const y = year || 1989;
  switch (theme) {
    case 'moon':
      return `MOON • ${y}`;
    case 'radio':
      return `RADIO • ${y}`;
    case 'sales':
      return `SALES • ${y}`;
    case 'billboard':
      return `CHART • ${y}`;
    case 'news':
      return `NEWS • ${y}`;
    case 'cinema':
      return `FILM • ${y}`;
    case 'stats':
      return `STATS • ${y}`;
    case 'summary':
      return `VIP • ${y}`;
    case 'intro':
    default:
      return `TIME • ${y}`;
  }
}

/* ==========================================================================
   1. THEMED BACKDROPS (SVG GRAPHICS INSIDE 200x200 PHOTO VIEWPORT)
   ========================================================================== */

function ThemedBackdrop({ theme }: { theme: StoryTheme }) {
  switch (theme) {
    /* 1. INTRO: Birthday Celebration & Retro Confetti */
    case 'intro':
      return (
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 1 }}>
          <defs>
            <radialGradient id="introBgGrad" cx="50%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#3d124d" />
              <stop offset="65%" stopColor="#1a0624" />
              <stop offset="100%" stopColor="#0a020f" />
            </radialGradient>
          </defs>
          <rect width="200" height="200" fill="url(#introBgGrad)" />
          {/* Confetti Squares & Triangles */}
          <rect x="22" y="28" width="6" height="6" fill="#ff0077" transform="rotate(15, 25, 31)" />
          <rect x="170" y="35" width="7" height="7" fill="#ffd700" transform="rotate(-25, 173, 38)" />
          <rect x="35" y="110" width="5" height="5" fill="#00e5ff" transform="rotate(40, 37, 112)" />
          <rect x="180" y="118" width="6" height="6" fill="#a855f7" transform="rotate(10, 183, 121)" />
          <polygon points="80,18 85,26 75,26" fill="#ffd700" transform="rotate(-15, 80, 22)" />
          <polygon points="140,24 146,32 134,32" fill="#ff0077" transform="rotate(20, 140, 28)" />
          <polygon points="20,70 25,78 15,78" fill="#00e5ff" transform="rotate(45, 20, 74)" />
          <polygon points="175,75 180,83 170,83" fill="#ffd700" transform="rotate(-30, 175, 79)" />
          {/* Gold Sparkle Stars */}
          <path d="M 28 20 Q 28 25 33 25 Q 28 25 28 30 Q 28 25 23 25 Q 28 25 28 20 Z" fill="#ffd700" />
          <path d="M 178 22 Q 178 27 183 27 Q 178 27 178 32 Q 178 27 173 27 Q 178 27 178 22 Z" fill="#ff0077" />
          <circle cx="100" cy="18" r="1.5" fill="#ffffff" />
          <circle cx="50" cy="45" r="1.2" fill="#ffd700" />
          <circle cx="155" cy="50" r="1.2" fill="#00e5ff" />
          {/* Streamers */}
          <path d="M 12 10 Q 24 35 15 60 Q 25 85 16 110" stroke="#ff0077" strokeWidth="1.8" strokeLinecap="round" fill="none" opacity="0.75" />
          <path d="M 188 10 Q 176 35 185 60 Q 175 85 184 110" stroke="#00e5ff" strokeWidth="1.8" strokeLinecap="round" fill="none" opacity="0.75" />
        </svg>
      );

    /* 2. MOON: Cosmic Space & Lunar Horizon */
    case 'moon':
      return (
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 1 }}>
          <defs>
            <radialGradient id="earthGlowGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#00e5ff" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#00e5ff" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="lunarGroundGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#151b34" />
              <stop offset="100%" stopColor="#080b18" />
            </linearGradient>
            <radialGradient id="moonBgGrad" cx="75%" cy="22%" r="75%">
              <stop offset="0%" stopColor="#141a3d" />
              <stop offset="65%" stopColor="#080c1f" />
              <stop offset="100%" stopColor="#03050c" />
            </radialGradient>
          </defs>
          <rect width="200" height="200" fill="url(#moonBgGrad)" />
          {/* Distant Planet Earth in upper-right corner */}
          <g transform="translate(164, 34)">
            <circle cx="0" cy="0" r="16" fill="url(#earthGlowGrad)" />
            <circle cx="0" cy="0" r="11" fill="#0284c7" stroke="#38bdf8" strokeWidth="0.8" />
            <path d="M -6 -3 Q -2 -8 3 -5 Q 7 -1 4 4 Q -1 6 -5 3 Z" fill="#22c55e" opacity="0.9" />
            <path d="M -2 4 Q 3 2 6 6 Q 2 9 -1 8 Z" fill="#16a34a" opacity="0.85" />
            <path d="M -9 1 Q -3 -1 3 0 Q 7 2 9 -1" fill="none" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" opacity="0.75" />
            <path d="M 0 -11 A 11 11 0 0 1 0 11 A 8 11 0 0 0 0 -11 Z" fill="#050814" opacity="0.45" />
          </g>
          {/* Twinkling Stars */}
          <path d="M 32 24 Q 32 30 38 30 Q 32 30 32 36 Q 32 30 26 30 Q 32 30 32 24 Z" fill="#ffd700" />
          <path d="M 180 82 Q 180 87 185 87 Q 180 87 180 92 Q 180 87 175 87 Q 180 87 180 82 Z" fill="#00e5ff" />
          <path d="M 24 116 Q 24 120 28 120 Q 24 120 24 124 Q 24 120 20 120 Q 24 120 24 116 Z" fill="#ffffff" opacity="0.85" />
          <circle cx="68" cy="18" r="1.2" fill="#ffffff" opacity="0.9" />
          <circle cx="120" cy="20" r="1.4" fill="#00e5ff" opacity="0.8" />
          <circle cx="14" cy="74" r="1.2" fill="#ffd700" opacity="0.7" />
          <circle cx="188" cy="130" r="1.2" fill="#38bdf8" opacity="0.75" />
          {/* Lunar Surface Curve at Bottom */}
          <path d="M -10 172 Q 100 152 210 172 L 210 205 L -10 205 Z" fill="url(#lunarGroundGrad)" stroke="#00e5ff" strokeWidth="1.2" strokeOpacity="0.45" />
          <ellipse cx="48" cy="182" rx="9" ry="3.5" fill="#0a0d1b" stroke="#1d2442" strokeWidth="0.8" />
          <ellipse cx="148" cy="184" rx="8" ry="3" fill="#0a0d1b" stroke="#1d2442" strokeWidth="0.8" />
        </svg>
      );

    /* 3. RADIO: Equalizer Spectrum & Neon Grid */
    case 'radio':
      return (
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 1 }}>
          <defs>
            <radialGradient id="radioBgGrad" cx="50%" cy="35%" r="70%">
              <stop offset="0%" stopColor="#14213d" />
              <stop offset="65%" stopColor="#080e1a" />
              <stop offset="100%" stopColor="#020408" />
            </radialGradient>
          </defs>
          <rect width="200" height="200" fill="url(#radioBgGrad)" />
          {/* Audio Equalizer Spectrum Bars on Left and Right */}
          <g opacity="0.85">
            {/* Left Equalizer */}
            <rect x="14" y="55" width="4" height="22" fill="#00e5ff" />
            <rect x="22" y="42" width="4" height="35" fill="#ffd700" />
            <rect x="30" y="60" width="4" height="17" fill="#ff0077" />
            {/* Right Equalizer */}
            <rect x="166" y="50" width="4" height="27" fill="#00e5ff" />
            <rect x="174" y="38" width="4" height="39" fill="#ffd700" />
            <rect x="182" y="58" width="4" height="19" fill="#ff0077" />
          </g>
          {/* Floating Musical Notes */}
          <path d="M 38 25 L 38 35 M 38 35 A 4 3 0 1 1 34 32" stroke="#00e5ff" strokeWidth="2" strokeLinecap="round" fill="none" />
          <path d="M 165 24 L 165 34 M 165 34 A 4 3 0 1 1 161 31" stroke="#ffd700" strokeWidth="2" strokeLinecap="round" fill="none" />
          {/* Neon Floor Grid */}
          <path d="M 0 176 L 200 176" stroke="#00e5ff" strokeWidth="1.2" opacity="0.6" />
          <path d="M 0 188 L 200 188" stroke="#00e5ff" strokeWidth="1.6" opacity="0.8" />
          <line x1="30" y1="176" x2="10" y2="200" stroke="#00e5ff" strokeWidth="1" opacity="0.5" />
          <line x1="70" y1="176" x2="60" y2="200" stroke="#00e5ff" strokeWidth="1" opacity="0.5" />
          <line x1="130" y1="176" x2="140" y2="200" stroke="#00e5ff" strokeWidth="1" opacity="0.5" />
          <line x1="170" y1="176" x2="190" y2="200" stroke="#00e5ff" strokeWidth="1" opacity="0.5" />
        </svg>
      );

    /* 4. SALES: Golden Vinyl Record & Award Starburst */
    case 'sales':
      return (
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 1 }}>
          <defs>
            <radialGradient id="salesBgGrad" cx="50%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#2c1a06" />
              <stop offset="65%" stopColor="#140b02" />
              <stop offset="100%" stopColor="#080400" />
            </radialGradient>
          </defs>
          <rect width="200" height="200" fill="url(#salesBgGrad)" />
          {/* Giant Vinyl Record Ring Grooves behind */}
          <circle cx="100" cy="92" r="88" stroke="#ffd700" strokeWidth="0.8" strokeDasharray="6,4" opacity="0.35" />
          <circle cx="100" cy="92" r="76" stroke="#ffffff" strokeWidth="0.6" strokeDasharray="4,6" opacity="0.3" />
          <circle cx="100" cy="92" r="64" stroke="#ffd700" strokeWidth="0.8" opacity="0.25" />
          {/* Gold Starburst Sparkles */}
          <path d="M 28 32 Q 28 38 34 38 Q 28 38 28 44 Q 28 38 22 38 Q 28 38 28 32 Z" fill="#ffd700" />
          <path d="M 172 32 Q 172 38 178 38 Q 172 38 172 44 Q 172 38 166 38 Q 172 38 172 32 Z" fill="#ffd700" />
          <circle cx="100" cy="20" r="1.8" fill="#ffd700" />
          <circle cx="36" cy="120" r="1.4" fill="#ffffff" />
          <circle cx="164" cy="120" r="1.4" fill="#ffffff" />
          {/* Gold Floor Line */}
          <path d="M 0 178 L 200 178" stroke="#ffd700" strokeWidth="1.5" opacity="0.6" />
        </svg>
      );

    /* 5. BILLBOARD: Concert Spotlights & Superstar Rays */
    case 'billboard':
      return (
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 1 }}>
          <defs>
            <radialGradient id="billboardBgGrad" cx="50%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#300826" />
              <stop offset="65%" stopColor="#150210" />
              <stop offset="100%" stopColor="#080006" />
            </radialGradient>
            <linearGradient id="spotlightLeft" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#ff0077" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#ff0077" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="spotlightRight" x1="1" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#00e5ff" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#00e5ff" stopOpacity="0" />
            </linearGradient>
          </defs>
          <rect width="200" height="200" fill="url(#billboardBgGrad)" />
          {/* Criss-crossing Concert Spotlights */}
          <polygon points="0,0 60,0 160,200 100,200" fill="url(#spotlightLeft)" />
          <polygon points="200,0 140,0 40,200 100,200" fill="url(#spotlightRight)" />
          {/* Flashing Paparazzi Sparkles */}
          <path d="M 30 26 Q 30 32 36 32 Q 30 32 30 38 Q 30 32 24 32 Q 30 32 30 26 Z" fill="#ffffff" />
          <path d="M 170 26 Q 170 32 176 32 Q 170 32 170 38 Q 170 32 164 32 Q 170 32 170 26 Z" fill="#ffd700" />
          <circle cx="15" cy="85" r="1.5" fill="#00e5ff" />
          <circle cx="185" cy="85" r="1.5" fill="#ff0077" />
          {/* Stage Rim */}
          <path d="M 0 178 L 200 178" stroke="#ff0077" strokeWidth="1.5" opacity="0.75" />
        </svg>
      );

    /* 6. NEWS: Vintage Newsprint Paper & Press Columns */
    case 'news':
      return (
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 1 }}>
          <defs>
            <radialGradient id="newsBgGrad" cx="50%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#2c271e" />
              <stop offset="65%" stopColor="#17140e" />
              <stop offset="100%" stopColor="#0b0a07" />
            </radialGradient>
          </defs>
          <rect width="200" height="200" fill="url(#newsBgGrad)" />
          {/* Subtle Newspaper Masthead Header Banner */}
          <rect x="15" y="16" width="170" height="12" fill="#3a3428" rx="1" />
          <line x1="20" y1="22" x2="180" y2="22" stroke="#d4cebe" strokeWidth="1.2" strokeDasharray="4,2" opacity="0.6" />
          {/* Halftone Newspaper Print Lines */}
          <g opacity="0.25" stroke="#d4cebe" strokeWidth="0.8">
            <line x1="18" y1="36" x2="55" y2="36" />
            <line x1="18" y1="42" x2="55" y2="42" />
            <line x1="18" y1="48" x2="55" y2="48" />
            <line x1="18" y1="54" x2="55" y2="54" />
            <line x1="145" y1="36" x2="182" y2="36" />
            <line x1="145" y1="42" x2="182" y2="42" />
            <line x1="145" y1="48" x2="182" y2="48" />
            <line x1="145" y1="54" x2="182" y2="54" />
          </g>
          {/* Press Stamp Star */}
          <path d="M 28 115 Q 28 120 33 120 Q 28 120 28 125 Q 28 120 23 120 Q 28 120 28 115 Z" fill="#e50914" />
          <path d="M 172 115 Q 172 120 177 120 Q 172 120 172 125 Q 172 120 167 120 Q 172 120 172 115 Z" fill="#ffd700" />
          {/* Aged Paper Floor Edge */}
          <path d="M 0 178 L 200 178" stroke="#8a7e6b" strokeWidth="1.4" opacity="0.6" />
        </svg>
      );

    /* 7. CINEMA: Cinema Filmstrip & Theater Spotlights */
    case 'cinema':
      return (
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 1 }}>
          <defs>
            <radialGradient id="cinemaBgGrad" cx="50%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#1e132b" />
              <stop offset="65%" stopColor="#0e0717" />
              <stop offset="100%" stopColor="#040208" />
            </radialGradient>
            <radialGradient id="projectorBeam" cx="50%" cy="0%" r="70%">
              <stop offset="0%" stopColor="#ffd700" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#ffd700" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="200" height="200" fill="url(#cinemaBgGrad)" />
          {/* Projector Light Cone */}
          <polygon points="75,0 125,0 180,180 20,180" fill="url(#projectorBeam)" />
          {/* 35mm Filmstrip Borders on Left & Right */}
          <g fill="#161b26" stroke="#334155" strokeWidth="1">
            {/* Left Filmstrip */}
            <rect x="6" y="0" width="16" height="200" />
            <rect x="10" y="15" width="8" height="12" fill="#000000" rx="1" />
            <rect x="10" y="45" width="8" height="12" fill="#000000" rx="1" />
            <rect x="10" y="75" width="8" height="12" fill="#000000" rx="1" />
            <rect x="10" y="105" width="8" height="12" fill="#000000" rx="1" />
            <rect x="10" y="135" width="8" height="12" fill="#000000" rx="1" />
            <rect x="10" y="165" width="8" height="12" fill="#000000" rx="1" />
            {/* Right Filmstrip */}
            <rect x="178" y="0" width="16" height="200" />
            <rect x="182" y="15" width="8" height="12" fill="#000000" rx="1" />
            <rect x="182" y="45" width="8" height="12" fill="#000000" rx="1" />
            <rect x="182" y="75" width="8" height="12" fill="#000000" rx="1" />
            <rect x="182" y="105" width="8" height="12" fill="#000000" rx="1" />
            <rect x="182" y="135" width="8" height="12" fill="#000000" rx="1" />
            <rect x="182" y="165" width="8" height="12" fill="#000000" rx="1" />
          </g>
          {/* Cinema Golden Premiere Stars */}
          <path d="M 38 28 Q 38 33 43 33 Q 38 33 38 38 Q 38 33 33 33 Q 38 33 38 28 Z" fill="#ffd700" />
          <path d="M 162 28 Q 162 33 167 33 Q 162 33 162 38 Q 162 33 157 33 Q 162 33 162 28 Z" fill="#ffd700" />
        </svg>
      );

    /* 8. STATS: Sci-Fi CRT Terminal & Telemetry Wave */
    case 'stats':
      return (
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 1 }}>
          <defs>
            <radialGradient id="statsBgGrad" cx="50%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#082b20" />
              <stop offset="65%" stopColor="#03140e" />
              <stop offset="100%" stopColor="#010705" />
            </radialGradient>
          </defs>
          <rect width="200" height="200" fill="url(#statsBgGrad)" />
          {/* Phosphor CRT Scanlines & Wireframe Grid */}
          <g stroke="#00ffcc" strokeWidth="0.8" opacity="0.3">
            <line x1="0" y1="20" x2="200" y2="20" />
            <line x1="0" y1="40" x2="200" y2="40" />
            <line x1="0" y1="60" x2="200" y2="60" />
            <line x1="0" y1="80" x2="200" y2="80" />
            <line x1="30" y1="0" x2="30" y2="180" />
            <line x1="70" y1="0" x2="70" y2="180" />
            <line x1="130" y1="0" x2="130" y2="180" />
            <line x1="170" y1="0" x2="170" y2="180" />
          </g>
          {/* Heartbeat ECG Pulse Wave */}
          <path d="M 0 160 L 40 160 L 50 148 L 56 172 L 66 140 L 76 168 L 82 160 L 200 160" stroke="#00ffcc" strokeWidth="1.8" fill="none" opacity="0.85" />
          {/* Telemetry Dots */}
          <circle cx="25" cy="30" r="2" fill="#00ffcc" />
          <circle cx="175" cy="30" r="2" fill="#00ffcc" />
          <circle cx="100" cy="15" r="1.5" fill="#ffd700" />
          {/* Digital Ground Line */}
          <path d="M 0 178 L 200 178" stroke="#00ffcc" strokeWidth="1.6" opacity="0.75" />
        </svg>
      );

    /* 9. SUMMARY: VIP Gold Starburst & Confetti Trophy Rays */
    case 'summary':
    default:
      return (
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 1 }}>
          <defs>
            <radialGradient id="summaryBgGrad" cx="50%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#332408" />
              <stop offset="65%" stopColor="#170f03" />
              <stop offset="100%" stopColor="#080501" />
            </radialGradient>
            <radialGradient id="sunburstGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffd700" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#ffd700" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="200" height="200" fill="url(#summaryBgGrad)" />
          {/* Golden Sunburst Halo behind Champion */}
          <circle cx="100" cy="92" r="75" fill="url(#sunburstGrad)" />
          {/* Floating Gold Confetti & Ribbons */}
          <rect x="25" y="32" width="6" height="6" fill="#ffd700" transform="rotate(25, 28, 35)" />
          <rect x="170" y="38" width="6" height="6" fill="#ffd700" transform="rotate(-30, 173, 41)" />
          <rect x="35" y="115" width="5" height="5" fill="#ffffff" transform="rotate(45, 37, 117)" />
          <rect x="165" y="115" width="5" height="5" fill="#ffffff" transform="rotate(-40, 167, 117)" />
          {/* Sparkle Stars */}
          <path d="M 32 22 Q 32 28 38 28 Q 32 28 32 34 Q 32 28 26 28 Q 32 28 32 22 Z" fill="#ffd700" />
          <path d="M 168 22 Q 168 28 174 28 Q 168 28 168 34 Q 168 28 162 28 Q 168 28 168 22 Z" fill="#ffd700" />
          <path d="M 100 12 Q 100 17 105 17 Q 100 17 100 22 Q 100 17 95 17 Q 100 17 100 12 Z" fill="#ffd700" />
          {/* VIP Golden Laurel Floor Line */}
          <path d="M 0 178 L 200 178" stroke="#ffd700" strokeWidth="1.6" opacity="0.8" />
        </svg>
      );
  }
}

/* ==========================================================================
   2. THEMED MASCOT LIMBS (ARMS, HANDS, CLOTHES, BOOTS, AND HELD ITEMS)
   The face IS the body! Limbs attach directly at the sides and bottom of head.
   ========================================================================== */

function ThemedLimbs({ theme }: { theme: StoryTheme }) {
  switch (theme) {
    /* 1. INTRO: Party Sleeves, Waving Hand, 80s Balloons & Sneakers */
    case 'intro':
      return (
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 8, filter: 'drop-shadow(0 3px 6px rgba(0, 0, 0, 0.5))' }}>
          {/* LEFT ARM: Waving high with neon party sleeve */}
          <g id="intro-left-arm">
            <path d="M 60 90 C 42 82, 30 66, 32 48 C 42 44, 52 52, 56 64 C 60 72, 60 82, 60 90 Z" fill="#ff0077" stroke="#0b0d13" strokeWidth="2.4" strokeLinejoin="round" />
            <path d="M 28 50 L 38 46 L 41 50 L 31 54 Z" fill="#ffd700" stroke="#0b0d13" strokeWidth="1.6" />
            {/* Waving Hand */}
            <path d="M 28 46 C 22 42, 20 34, 25 30 C 28 27, 34 29, 36 33 C 38 30, 43 32, 42 37 C 41 43, 36 47, 28 46 Z" fill="#ffffff" stroke="#0b0d13" strokeWidth="2" strokeLinejoin="round" />
            {/* Motion lines */}
            <line x1="22" y1="24" x2="16" y2="20" stroke="#ffd700" strokeWidth="1.8" strokeLinecap="round" />
            <line x1="30" y1="18" x2="28" y2="12" stroke="#ffd700" strokeWidth="1.8" strokeLinecap="round" />
          </g>
          {/* RIGHT ARM & BALLOON BUNDLE */}
          <g id="intro-right-arm">
            {/* 3 Colorful 80s Balloons floating above right */}
            <g id="balloons" transform="translate(172, 40)">
              {/* Strings */}
              <path d="M -18 0 Q -10 35 -6 56" stroke="#ffffff" strokeWidth="1" opacity="0.8" fill="none" />
              <path d="M 0 -12 Q 2 25 -4 56" stroke="#ffffff" strokeWidth="1" opacity="0.8" fill="none" />
              <path d="M 16 4 Q 8 35 -2 56" stroke="#ffffff" strokeWidth="1" opacity="0.8" fill="none" />
              {/* Balloon 1: Neon Cyan */}
              <ellipse cx="-18" cy="0" rx="13" ry="16" fill="#00e5ff" stroke="#0b0d13" strokeWidth="1.8" />
              <ellipse cx="-22" cy="-4" rx="3.5" ry="5" fill="#ffffff" opacity="0.75" />
              <polygon points="-19,16 -17,16 -18,19" fill="#00e5ff" stroke="#0b0d13" strokeWidth="1" />
              {/* Balloon 2: Hot Pink (Center Top) */}
              <ellipse cx="0" cy="-12" rx="14" ry="17" fill="#ff0077" stroke="#0b0d13" strokeWidth="1.8" />
              <ellipse cx="-4" cy="-17" rx="4" ry="6" fill="#ffffff" opacity="0.75" />
              <polygon points="-2,5 2,5 0,8" fill="#ff0077" stroke="#0b0d13" strokeWidth="1" />
              {/* Balloon 3: Golden Yellow */}
              <ellipse cx="16" cy="4" rx="13" ry="16" fill="#ffd700" stroke="#0b0d13" strokeWidth="1.8" />
              <ellipse cx="12" cy="0" rx="3.5" ry="5" fill="#ffffff" opacity="0.75" />
              <polygon points="15,20 17,20 16,23" fill="#ffd700" stroke="#0b0d13" strokeWidth="1" />
            </g>
            {/* Right Arm Holding Strings */}
            <path d="M 140 90 C 152 86, 164 80, 166 92 C 162 100, 150 102, 138 96 Z" fill="#ff0077" stroke="#0b0d13" strokeWidth="2.4" strokeLinejoin="round" />
            <path d="M 163 86 L 169 90 L 167 95 L 161 91 Z" fill="#ffd700" stroke="#0b0d13" strokeWidth="1.6" />
            <circle cx="168" cy="96" r="6" fill="#ffffff" stroke="#0b0d13" strokeWidth="1.8" />
          </g>
          {/* LEGS & RETRO RED SNEAKERS */}
          <g id="intro-legs">
            {/* Left Leg */}
            <path d="M 72 126 C 70 144, 64 156, 62 168 L 76 168 C 78 156, 82 144, 84 126 Z" fill="#3b82f6" stroke="#0b0d13" strokeWidth="2.4" strokeLinejoin="round" />
            <path d="M 52 168 C 50 163, 62 162, 76 165 L 78 179 C 78 185, 48 185, 52 168 Z" fill="#e11d48" stroke="#0b0d13" strokeWidth="2.4" strokeLinejoin="round" />
            <path d="M 48 178 C 48 170, 56 168, 62 174 L 62 184 L 48 184 Z" fill="#ffffff" stroke="#0b0d13" strokeWidth="1.4" />
            <path d="M 49 181 L 78 181 L 77 186 L 49 186 Z" fill="#ffffff" stroke="#0b0d13" strokeWidth="1.4" />
            {/* Right Leg */}
            <path d="M 116 126 C 118 144, 122 156, 124 168 L 138 168 C 136 156, 130 144, 128 126 Z" fill="#3b82f6" stroke="#0b0d13" strokeWidth="2.4" strokeLinejoin="round" />
            <path d="M 148 168 C 150 163, 138 162, 124 165 L 122 179 C 122 185, 152 185, 148 168 Z" fill="#e11d48" stroke="#0b0d13" strokeWidth="2.4" strokeLinejoin="round" />
            <path d="M 152 178 C 152 170, 144 168, 138 174 L 138 184 L 152 184 Z" fill="#ffffff" stroke="#0b0d13" strokeWidth="1.4" />
            <path d="M 151 181 L 122 181 L 123 186 L 151 186 Z" fill="#ffffff" stroke="#0b0d13" strokeWidth="1.4" />
          </g>
        </svg>
      );

    /* 2. MOON: Astronaut Spacesuit Sleeves, Apollo Moon Flag & Moon Boots */
    case 'moon':
      return (
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 8, filter: 'drop-shadow(0 3px 6px rgba(0, 0, 0, 0.5))' }}>
          {/* Left Arm (Waving) */}
          <g id="astronaut-left-arm">
            <path d="M 60 92 C 40 86, 26 72, 30 52 C 42 48, 52 56, 58 68 C 62 76, 62 86, 60 92 Z" fill="#d2ddec" stroke="#0b0d13" strokeWidth="2.5" strokeLinejoin="round" />
            <path d="M 58 88 C 42 82, 30 68, 33 52 C 43 49, 52 56, 56 66 C 59 74, 60 82, 58 88 Z" fill="#f8fafc" />
            <path d="M 26 53 L 38 49 L 41 53 L 29 57 Z" fill="#e50914" stroke="#0b0d13" strokeWidth="1.8" strokeLinejoin="round" />
            <g transform="translate(18, 25)">
              <path d="M 12 24 C 6 22, 5 14, 8 10 C 10 7, 16 7, 18 10 C 21 8, 26 10, 25 15 C 25 21, 20 25, 12 24 Z" fill="#ffffff" stroke="#0b0d13" strokeWidth="2.2" strokeLinejoin="round" />
              <path d="M 18 18 C 22 17, 24 20, 22 23 C 20 25, 17 23, 17 20 Z" fill="#f1f5f9" stroke="#0b0d13" strokeWidth="1.8" />
              <ellipse cx="14" cy="17" rx="3.5" ry="2.5" fill="#cbd5e1" />
            </g>
            <line x1="16" y1="20" x2="10" y2="16" stroke="#00e5ff" strokeWidth="1.8" strokeLinecap="round" />
            <line x1="22" y1="14" x2="20" y2="8" stroke="#00e5ff" strokeWidth="1.8" strokeLinecap="round" />
          </g>
          {/* Right Arm & Apollo Moon Flag */}
          <g id="astronaut-right-arm">
            <line x1="168" y1="30" x2="168" y2="136" stroke="#e2e8f0" strokeWidth="3.2" strokeLinecap="round" />
            <circle cx="168" cy="27" r="4.5" fill="#ffd700" stroke="#0b0d13" strokeWidth="1.8" />
            <circle cx="166.5" cy="25.5" r="1.4" fill="#ffffff" />
            <path d="M 169 31 C 180 27, 192 34, 204 30 L 204 58 C 192 62, 180 55, 169 59 Z" fill="#0b1739" stroke="#0b0d13" strokeWidth="2" strokeLinejoin="round" />
            <path d="M 170 33 C 180 29, 191 35, 202 32 L 202 56 C 191 59, 180 53, 170 57" stroke="#ffd700" strokeWidth="1.2" fill="none" />
            <path d="M 186 41 L 187.5 45 L 191.5 45 L 188 47.5 L 189.5 51.5 L 186 49 L 182.5 51.5 L 184 47.5 L 180.5 45 L 184.5 45 Z" fill="#ffd700" />
            <path d="M 200 33 L 200 55" stroke="#e50914" strokeWidth="1.5" />
            <path d="M 140 92 C 154 88, 166 84, 168 96 C 164 104, 150 106, 138 100 Z" fill="#d2ddec" stroke="#0b0d13" strokeWidth="2.5" strokeLinejoin="round" />
            <path d="M 141 89 C 153 85, 164 83, 166 94 C 162 101, 149 103, 139 98 Z" fill="#f8fafc" />
            <path d="M 163 87 L 169 91 L 167 96 L 161 92 Z" fill="#e50914" stroke="#0b0d13" strokeWidth="1.6" />
            <circle cx="168" cy="94" r="5" fill="#ffffff" stroke="#0b0d13" strokeWidth="1.8" />
          </g>
          {/* Legs & Moon Boots */}
          <g id="astronaut-legs">
            <path d="M 72 126 C 70 144, 64 156, 62 168 L 76 168 C 78 156, 82 144, 84 126 Z" fill="#f8fafc" stroke="#0b0d13" strokeWidth="2.4" strokeLinejoin="round" />
            <path d="M 52 168 C 50 163, 62 162, 76 165 L 78 179 C 78 185, 48 185, 52 168 Z" fill="#ffffff" stroke="#0b0d13" strokeWidth="2.4" strokeLinejoin="round" />
            <path d="M 49 181 L 78 181 L 77 186 L 49 186 Z" fill="#1e2433" stroke="#0b0d13" strokeWidth="1.6" />
            <path d="M 56 174 L 72 175" stroke="#00e5ff" strokeWidth="2" strokeLinecap="round" />
            <path d="M 116 126 C 118 144, 122 156, 124 168 L 138 168 C 136 156, 130 144, 128 126 Z" fill="#f8fafc" stroke="#0b0d13" strokeWidth="2.4" strokeLinejoin="round" />
            <path d="M 148 168 C 150 163, 138 162, 124 165 L 122 179 C 122 185, 152 185, 148 168 Z" fill="#ffffff" stroke="#0b0d13" strokeWidth="2.4" strokeLinejoin="round" />
            <path d="M 151 181 L 122 181 L 123 186 L 151 186 Z" fill="#1e2433" stroke="#0b0d13" strokeWidth="1.6" />
            <path d="M 144 174 L 128 175" stroke="#00e5ff" strokeWidth="2" strokeLinecap="round" />
          </g>
        </svg>
      );

    /* 3. RADIO: Boombox Cassette on Shoulder, Rock-On Hand & Neon High-Tops */
    case 'radio':
      return (
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 8, filter: 'drop-shadow(0 3px 6px rgba(0, 0, 0, 0.5))' }}>
          {/* LEFT ARM: Rock-and-roll sign high in the air */}
          <g id="radio-left-arm">
            <path d="M 60 90 C 42 80, 28 66, 30 48 C 40 44, 50 52, 56 64 C 60 72, 60 82, 60 90 Z" fill="#1e293b" stroke="#0b0d13" strokeWidth="2.4" strokeLinejoin="round" />
            <rect x="28" y="48" width="12" height="6" fill="#0b0d13" rx="1" />
            {/* Rock-On Hand (Index & Pinky up) */}
            <path d="M 28 46 L 24 30 L 28 30 L 30 38 L 34 38 L 36 30 L 40 30 L 37 46 Z" fill="#ffffff" stroke="#0b0d13" strokeWidth="1.8" strokeLinejoin="round" />
            <line x1="22" y1="20" x2="16" y2="16" stroke="#00e5ff" strokeWidth="1.6" strokeLinecap="round" />
          </g>
          {/* RIGHT SHOULDER: Iconic 80s Cassette Boombox */}
          <g id="boombox" transform="translate(138, 48)">
            {/* Handle */}
            <path d="M 8 -4 L 8 -12 L 40 -12 L 40 -4" stroke="#475569" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            {/* Boombox Body */}
            <rect x="0" y="-4" width="48" height="34" rx="3" fill="#cbd5e1" stroke="#0b0d13" strokeWidth="2.2" />
            {/* Speakers */}
            <circle cx="10" cy="13" r="7" fill="#0f172a" stroke="#0b0d13" strokeWidth="1.5" />
            <circle cx="10" cy="13" r="3.5" fill="#e2e8f0" />
            <circle cx="38" cy="13" r="7" fill="#0f172a" stroke="#0b0d13" strokeWidth="1.5" />
            <circle cx="38" cy="13" r="3.5" fill="#e2e8f0" />
            {/* Cassette Deck in Center */}
            <rect x="20" y="7" width="8" height="12" fill="#0284c7" stroke="#0b0d13" strokeWidth="1.2" />
            {/* Tuner dial & buttons */}
            <rect x="6" y="0" width="36" height="3" fill="#e11d48" />
            {/* Hand gripping handle/body */}
            <circle cx="24" cy="30" r="5" fill="#ffffff" stroke="#0b0d13" strokeWidth="1.8" />
          </g>
          {/* LEGS: Acid-wash Jeans with Neon Sneakers */}
          <g id="radio-legs">
            <path d="M 72 126 C 70 144, 64 156, 62 168 L 76 168 C 78 156, 82 144, 84 126 Z" fill="#60a5fa" stroke="#0b0d13" strokeWidth="2.4" strokeLinejoin="round" />
            <path d="M 52 168 C 50 163, 62 162, 76 165 L 78 179 C 78 185, 48 185, 52 168 Z" fill="#a855f7" stroke="#0b0d13" strokeWidth="2.4" strokeLinejoin="round" />
            <path d="M 49 181 L 78 181 L 77 186 L 49 186 Z" fill="#22c55e" stroke="#0b0d13" strokeWidth="1.4" />
            <path d="M 116 126 C 118 144, 122 156, 124 168 L 138 168 C 136 156, 130 144, 128 126 Z" fill="#60a5fa" stroke="#0b0d13" strokeWidth="2.4" strokeLinejoin="round" />
            <path d="M 148 168 C 150 163, 138 162, 124 165 L 122 179 C 122 185, 152 185, 148 168 Z" fill="#a855f7" stroke="#0b0d13" strokeWidth="2.4" strokeLinejoin="round" />
            <path d="M 151 181 L 122 181 L 123 186 L 151 186 Z" fill="#22c55e" stroke="#0b0d13" strokeWidth="1.4" />
          </g>
        </svg>
      );

    /* 4. SALES: Holding Golden #1 Vinyl LP & Thumbs Up */
    case 'sales':
      return (
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 8, filter: 'drop-shadow(0 3px 6px rgba(0, 0, 0, 0.5))' }}>
          {/* LEFT ARM: Thumbs Up */}
          <g id="sales-left-arm">
            <path d="M 60 92 C 44 88, 30 76, 34 60 C 44 56, 52 64, 58 74 Z" fill="#475569" stroke="#0b0d13" strokeWidth="2.4" strokeLinejoin="round" />
            {/* Thumbs Up Hand */}
            <g transform="translate(24, 46)">
              <path d="M 12 16 C 8 16, 6 12, 8 8 C 9 5, 14 5, 15 8 L 15 14" fill="#ffffff" stroke="#0b0d13" strokeWidth="1.8" />
              <circle cx="12" cy="18" r="6" fill="#ffffff" stroke="#0b0d13" strokeWidth="1.8" />
            </g>
          </g>
          {/* RIGHT ARM & BIG SHINY GOLDEN #1 VINYL LP */}
          <g id="sales-vinyl" transform="translate(162, 80)">
            {/* Vinyl LP Disc */}
            <circle cx="0" cy="0" r="28" fill="#0f172a" stroke="#0b0d13" strokeWidth="2.2" />
            {/* Grooves */}
            <circle cx="0" cy="0" r="23" stroke="#334155" strokeWidth="0.8" fill="none" />
            <circle cx="0" cy="0" r="18" stroke="#334155" strokeWidth="0.8" fill="none" />
            {/* Gold Center Label */}
            <circle cx="0" cy="0" r="11" fill="#ffd700" stroke="#0b0d13" strokeWidth="1.5" />
            {/* #1 in center */}
            <path d="M -2 4 L -2 -4 L -4 -2" stroke="#0b0d13" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            <circle cx="0" cy="0" r="2" fill="#0b0d13" />
            {/* Hand holding edge */}
            <path d="M -18 10 C -22 10, -22 0, -18 0 Z" fill="#ffffff" stroke="#0b0d13" strokeWidth="1.8" />
          </g>
          {/* LEGS: Rolled-up Jeans & Checkerboard Skater Shoes */}
          <g id="sales-legs">
            <path d="M 72 126 C 70 144, 64 156, 62 168 L 76 168 C 78 156, 82 144, 84 126 Z" fill="#1e293b" stroke="#0b0d13" strokeWidth="2.4" strokeLinejoin="round" />
            <path d="M 52 168 C 50 163, 62 162, 76 165 L 78 179 C 78 185, 48 185, 52 168 Z" fill="#ffffff" stroke="#0b0d13" strokeWidth="2.4" strokeLinejoin="round" />
            <rect x="56" y="171" width="5" height="5" fill="#0b0d13" />
            <rect x="66" y="171" width="5" height="5" fill="#0b0d13" />
            <path d="M 49 181 L 78 181 L 77 186 L 49 186 Z" fill="#ffffff" stroke="#0b0d13" strokeWidth="1.4" />
            <path d="M 116 126 C 118 144, 122 156, 124 168 L 138 168 C 136 156, 130 144, 128 126 Z" fill="#1e293b" stroke="#0b0d13" strokeWidth="2.4" strokeLinejoin="round" />
            <path d="M 148 168 C 150 163, 138 162, 124 165 L 122 179 C 122 185, 152 185, 148 168 Z" fill="#ffffff" stroke="#0b0d13" strokeWidth="2.4" strokeLinejoin="round" />
            <rect x="132" y="171" width="5" height="5" fill="#0b0d13" />
            <rect x="142" y="171" width="5" height="5" fill="#0b0d13" />
            <path d="M 151 181 L 122 181 L 123 186 L 151 186 Z" fill="#ffffff" stroke="#0b0d13" strokeWidth="1.4" />
          </g>
        </svg>
      );

    /* 5. BILLBOARD: Popstar Ribbon Microphone & Stage Boots */
    case 'billboard':
      return (
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 8, filter: 'drop-shadow(0 3px 6px rgba(0, 0, 0, 0.5))' }}>
          {/* LEFT ARM: Hand raised to ear */}
          <g id="billboard-left-arm">
            <path d="M 60 92 C 44 86, 36 74, 40 58 C 48 54, 54 62, 58 72 Z" fill="#701a75" stroke="#0b0d13" strokeWidth="2.4" strokeLinejoin="round" />
            <circle cx="44" cy="56" r="6" fill="#ffffff" stroke="#0b0d13" strokeWidth="1.8" />
          </g>
          {/* RIGHT ARM & VINTAGE CHROME MICROPHONE */}
          <g id="billboard-mic">
            {/* Mic Stand / Rod */}
            <line x1="168" y1="45" x2="168" y2="135" stroke="#94a3b8" strokeWidth="3" strokeLinecap="round" />
            {/* Vintage Dynamic Ribbon Mic Capsule */}
            <rect x="160" y="32" width="16" height="22" rx="4" fill="#e2e8f0" stroke="#0b0d13" strokeWidth="2" />
            <line x1="162" y1="38" x2="174" y2="38" stroke="#475569" strokeWidth="1.2" />
            <line x1="162" y1="44" x2="174" y2="44" stroke="#475569" strokeWidth="1.2" />
            {/* Hand holding mic */}
            <circle cx="168" cy="58" r="6" fill="#ffffff" stroke="#0b0d13" strokeWidth="1.8" />
          </g>
          {/* LEGS: Popstar Stage Pants & Shiny Silver Boots */}
          <g id="billboard-legs">
            <path d="M 72 126 C 70 144, 64 156, 62 168 L 76 168 C 78 156, 82 144, 84 126 Z" fill="#0f172a" stroke="#0b0d13" strokeWidth="2.4" strokeLinejoin="round" />
            <path d="M 52 168 C 50 163, 62 162, 76 165 L 78 179 C 78 185, 48 185, 52 168 Z" fill="#e2e8f0" stroke="#0b0d13" strokeWidth="2.4" strokeLinejoin="round" />
            <path d="M 49 181 L 78 181 L 77 186 L 49 186 Z" fill="#ff0077" stroke="#0b0d13" strokeWidth="1.4" />
            <path d="M 116 126 C 118 144, 122 156, 124 168 L 138 168 C 136 156, 130 144, 128 126 Z" fill="#0f172a" stroke="#0b0d13" strokeWidth="2.4" strokeLinejoin="round" />
            <path d="M 148 168 C 150 163, 138 162, 124 165 L 122 179 C 122 185, 152 185, 148 168 Z" fill="#e2e8f0" stroke="#0b0d13" strokeWidth="2.4" strokeLinejoin="round" />
            <path d="M 151 181 L 122 181 L 123 186 L 151 186 Z" fill="#ff0077" stroke="#0b0d13" strokeWidth="1.4" />
          </g>
        </svg>
      );

    /* 6. NEWS: Folded Newspaper & Vintage Instant Camera */
    case 'news':
      return (
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 8, filter: 'drop-shadow(0 3px 6px rgba(0, 0, 0, 0.5))' }}>
          {/* LEFT ARM & INSTANT RETRO CAMERA */}
          <g id="news-camera">
            {/* Camera Strap */}
            <path d="M 60 88 C 45 95, 30 92, 28 80" stroke="#e50914" strokeWidth="1.8" fill="none" strokeDasharray="3,2" />
            {/* Camera Body */}
            <rect x="18" y="70" width="26" height="20" rx="3" fill="#334155" stroke="#0b0d13" strokeWidth="2" />
            <circle cx="31" cy="80" r="6" fill="#0f172a" stroke="#e2e8f0" strokeWidth="1.5" />
            <circle cx="38" cy="74" r="2" fill="#e11d48" />
            <circle cx="28" cy="82" r="5" fill="#ffffff" stroke="#0b0d13" strokeWidth="1.8" />
          </g>
          {/* RIGHT ARM & FOLDED NEWSPAPER */}
          <g id="news-paper" transform="translate(150, 60)">
            {/* Newspaper Paper Fold */}
            <polygon points="0,0 24,-6 28,32 4,38" fill="#f8fafc" stroke="#0b0d13" strokeWidth="2" strokeLinejoin="round" />
            <line x1="6" y1="6" x2="22" y2="2" stroke="#0b0d13" strokeWidth="2.5" />
            <line x1="6" y1="12" x2="24" y2="8" stroke="#64748b" strokeWidth="1.2" />
            <line x1="6" y1="17" x2="24" y2="13" stroke="#64748b" strokeWidth="1.2" />
            <line x1="6" y1="22" x2="24" y2="18" stroke="#64748b" strokeWidth="1.2" />
            <circle cx="8" cy="20" r="5" fill="#ffffff" stroke="#0b0d13" strokeWidth="1.8" />
          </g>
          {/* LEGS: Tweed Reporter Trousers & Leather Shoes */}
          <g id="news-legs">
            <path d="M 72 126 C 70 144, 64 156, 62 168 L 76 168 C 78 156, 82 144, 84 126 Z" fill="#78350f" stroke="#0b0d13" strokeWidth="2.4" strokeLinejoin="round" />
            <path d="M 52 168 C 50 163, 62 162, 76 165 L 78 179 C 78 185, 48 185, 52 168 Z" fill="#451a03" stroke="#0b0d13" strokeWidth="2.4" strokeLinejoin="round" />
            <path d="M 49 181 L 78 181 L 77 186 L 49 186 Z" fill="#0b0d13" stroke="#0b0d13" strokeWidth="1.4" />
            <path d="M 116 126 C 118 144, 122 156, 124 168 L 138 168 C 136 156, 130 144, 128 126 Z" fill="#78350f" stroke="#0b0d13" strokeWidth="2.4" strokeLinejoin="round" />
            <path d="M 148 168 C 150 163, 138 162, 124 165 L 122 179 C 122 185, 152 185, 148 168 Z" fill="#451a03" stroke="#0b0d13" strokeWidth="2.4" strokeLinejoin="round" />
            <path d="M 151 181 L 122 181 L 123 186 L 151 186 Z" fill="#0b0d13" stroke="#0b0d13" strokeWidth="1.4" />
          </g>
        </svg>
      );

    /* 7. CINEMA: Popcorn Bucket, Movie Clapperboard & Canvas Shoes */
    case 'cinema':
      return (
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 8, filter: 'drop-shadow(0 3px 6px rgba(0, 0, 0, 0.5))' }}>
          {/* LEFT ARM: Fluffy Buttered Popcorn Bucket */}
          <g id="cinema-popcorn" transform="translate(18, 54)">
            {/* Popcorn Fluffs on top */}
            <circle cx="10" cy="8" r="5" fill="#fef08a" stroke="#0b0d13" strokeWidth="1.2" />
            <circle cx="16" cy="4" r="5.5" fill="#fde047" stroke="#0b0d13" strokeWidth="1.2" />
            <circle cx="22" cy="8" r="5" fill="#fef08a" stroke="#0b0d13" strokeWidth="1.2" />
            {/* Red & White Striped Bucket */}
            <polygon points="4,12 28,12 24,38 8,38" fill="#e11d48" stroke="#0b0d13" strokeWidth="2" strokeLinejoin="round" />
            <polygon points="10,12 14,12 13,38 10,38" fill="#ffffff" />
            <polygon points="18,12 22,12 20,38 17,38" fill="#ffffff" />
            <circle cx="24" cy="28" r="5" fill="#ffffff" stroke="#0b0d13" strokeWidth="1.8" />
          </g>
          {/* RIGHT ARM & MOVIE CLAPPERBOARD */}
          <g id="cinema-clapper" transform="translate(148, 62)">
            {/* Clapper Top Bar */}
            <rect x="0" y="0" width="30" height="8" fill="#0f172a" stroke="#0b0d13" strokeWidth="1.8" />
            <polygon points="4,0 8,0 4,8 0,8" fill="#ffffff" />
            <polygon points="12,0 16,0 12,8 8,8" fill="#ffffff" />
            <polygon points="20,0 24,0 20,8 16,8" fill="#ffffff" />
            {/* Slate Board */}
            <rect x="0" y="8" width="30" height="20" fill="#0f172a" stroke="#0b0d13" strokeWidth="1.8" />
            <line x1="4" y1="14" x2="26" y2="14" stroke="#e2e8f0" strokeWidth="1.2" />
            <line x1="4" y1="20" x2="26" y2="20" stroke="#e2e8f0" strokeWidth="1.2" />
            <circle cx="8" cy="22" r="5" fill="#ffffff" stroke="#0b0d13" strokeWidth="1.8" />
          </g>
          {/* LEGS: Denim Jeans & Red Canvas Sneakers */}
          <g id="cinema-legs">
            <path d="M 72 126 C 70 144, 64 156, 62 168 L 76 168 C 78 156, 82 144, 84 126 Z" fill="#2563eb" stroke="#0b0d13" strokeWidth="2.4" strokeLinejoin="round" />
            <path d="M 52 168 C 50 163, 62 162, 76 165 L 78 179 C 78 185, 48 185, 52 168 Z" fill="#dc2626" stroke="#0b0d13" strokeWidth="2.4" strokeLinejoin="round" />
            <path d="M 48 178 C 48 170, 56 168, 62 174 L 62 184 L 48 184 Z" fill="#ffffff" stroke="#0b0d13" strokeWidth="1.4" />
            <path d="M 49 181 L 78 181 L 77 186 L 49 186 Z" fill="#ffffff" stroke="#0b0d13" strokeWidth="1.4" />
            <path d="M 116 126 C 118 144, 122 156, 124 168 L 138 168 C 136 156, 130 144, 128 126 Z" fill="#2563eb" stroke="#0b0d13" strokeWidth="2.4" strokeLinejoin="round" />
            <path d="M 148 168 C 150 163, 138 162, 124 165 L 122 179 C 122 185, 152 185, 148 168 Z" fill="#dc2626" stroke="#0b0d13" strokeWidth="2.4" strokeLinejoin="round" />
            <path d="M 152 178 C 152 170, 144 168, 138 174 L 138 184 L 152 184 Z" fill="#ffffff" stroke="#0b0d13" strokeWidth="1.4" />
            <path d="M 151 181 L 122 181 L 123 186 L 151 186 Z" fill="#ffffff" stroke="#0b0d13" strokeWidth="1.4" />
          </g>
        </svg>
      );

    /* 8. STATS: Stopwatch Chronometer, Digital Tablet & Lab Trousers */
    case 'stats':
      return (
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 8, filter: 'drop-shadow(0 3px 6px rgba(0, 0, 0, 0.5))' }}>
          {/* LEFT ARM: Digital Data Tablet */}
          <g id="stats-tablet" transform="translate(18, 64)">
            <rect x="0" y="0" width="24" height="30" rx="3" fill="#0f172a" stroke="#00ffcc" strokeWidth="1.8" />
            <rect x="3" y="3" width="18" height="14" fill="#022c22" />
            <line x1="5" y1="8" x2="19" y2="8" stroke="#00ffcc" strokeWidth="1.2" />
            <line x1="5" y1="12" x2="15" y2="12" stroke="#00ffcc" strokeWidth="1.2" />
            <circle cx="20" cy="22" r="5" fill="#ffffff" stroke="#0b0d13" strokeWidth="1.8" />
          </g>
          {/* RIGHT ARM & ANALOG STOPWATCH CHRONOMETER */}
          <g id="stats-stopwatch" transform="translate(155, 62)">
            {/* Top Button Ring */}
            <circle cx="12" cy="0" r="4" fill="none" stroke="#e2e8f0" strokeWidth="1.8" />
            <rect x="10" y="2" width="4" height="4" fill="#e2e8f0" />
            {/* Stopwatch Dial */}
            <circle cx="12" cy="14" r="14" fill="#f8fafc" stroke="#0b0d13" strokeWidth="2.2" />
            <line x1="12" y1="14" x2="12" y2="6" stroke="#e11d48" strokeWidth="1.8" strokeLinecap="round" />
            <line x1="12" y1="14" x2="18" y2="14" stroke="#0b0d13" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="12" cy="14" r="2" fill="#0b0d13" />
            <circle cx="4" cy="20" r="5" fill="#ffffff" stroke="#0b0d13" strokeWidth="1.8" />
          </g>
          {/* LEGS: White Lab Pants with Neon Green/Cyan Soles */}
          <g id="stats-legs">
            <path d="M 72 126 C 70 144, 64 156, 62 168 L 76 168 C 78 156, 82 144, 84 126 Z" fill="#f8fafc" stroke="#0b0d13" strokeWidth="2.4" strokeLinejoin="round" />
            <path d="M 52 168 C 50 163, 62 162, 76 165 L 78 179 C 78 185, 48 185, 52 168 Z" fill="#ffffff" stroke="#0b0d13" strokeWidth="2.4" strokeLinejoin="round" />
            <path d="M 49 181 L 78 181 L 77 186 L 49 186 Z" fill="#00ffcc" stroke="#0b0d13" strokeWidth="1.4" />
            <path d="M 116 126 C 118 144, 122 156, 124 168 L 138 168 C 136 156, 130 144, 128 126 Z" fill="#f8fafc" stroke="#0b0d13" strokeWidth="2.4" strokeLinejoin="round" />
            <path d="M 148 168 C 150 163, 138 162, 124 165 L 122 179 C 122 185, 152 185, 148 168 Z" fill="#ffffff" stroke="#0b0d13" strokeWidth="2.4" strokeLinejoin="round" />
            <path d="M 151 181 L 122 181 L 123 186 L 151 186 Z" fill="#00ffcc" stroke="#0b0d13" strokeWidth="1.4" />
          </g>
        </svg>
      );

    /* 9. SUMMARY: Victorious Golden #1 VIP Star Trophy Cup */
    case 'summary':
    default:
      return (
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 8, filter: 'drop-shadow(0 3px 6px rgba(0, 0, 0, 0.5))' }}>
          {/* BOTH ARMS RAISED TRIUMPHANTLY HOLDING GOLDEN TROPHY CUP */}
          <g id="summary-arms">
            <path d="M 60 92 C 40 82, 35 62, 42 46 C 48 42, 56 48, 58 60 Z" fill="#0f172a" stroke="#0b0d13" strokeWidth="2.4" strokeLinejoin="round" />
            <circle cx="48" cy="46" r="5" fill="#ffffff" stroke="#0b0d13" strokeWidth="1.8" />
            <path d="M 140 92 C 160 82, 165 62, 158 46 C 152 42, 144 48, 142 60 Z" fill="#0f172a" stroke="#0b0d13" strokeWidth="2.4" strokeLinejoin="round" />
            <circle cx="152" cy="46" r="5" fill="#ffffff" stroke="#0b0d13" strokeWidth="1.8" />
          </g>
          {/* Golden Champion Trophy Cup Floating High Right */}
          <g id="trophy" transform="translate(162, 28)">
            {/* Cup handles */}
            <path d="M -14 6 C -20 6, -20 16, -12 18" stroke="#ffd700" strokeWidth="2.4" fill="none" strokeLinecap="round" />
            <path d="M 14 6 C 20 6, 20 16, 12 18" stroke="#ffd700" strokeWidth="2.4" fill="none" strokeLinecap="round" />
            {/* Cup Chalice */}
            <path d="M -14 0 L 14 0 L 11 16 C 9 22, -9 22, -11 16 Z" fill="#ffd700" stroke="#0b0d13" strokeWidth="2" strokeLinejoin="round" />
            {/* Stem & Pedestal */}
            <rect x="-3" y="21" width="6" height="6" fill="#ffd700" stroke="#0b0d13" strokeWidth="1.5" />
            <rect x="-10" y="27" width="20" height="6" rx="1" fill="#451a03" stroke="#0b0d13" strokeWidth="1.6" />
            {/* Star in Center of Trophy */}
            <path d="M 0 5 L 1.5 8 L 4.5 8 L 2 10 L 3 13 L 0 11 L -3 13 L -2 10 L -4.5 8 L -1.5 8 Z" fill="#ffffff" />
          </g>
          {/* LEGS: Formal Tuxedo Trousers & Shiny Gold-Trimmed Shoes */}
          <g id="summary-legs">
            <path d="M 72 126 C 70 144, 64 156, 62 168 L 76 168 C 78 156, 82 144, 84 126 Z" fill="#020617" stroke="#0b0d13" strokeWidth="2.4" strokeLinejoin="round" />
            <path d="M 52 168 C 50 163, 62 162, 76 165 L 78 179 C 78 185, 48 185, 52 168 Z" fill="#0f172a" stroke="#0b0d13" strokeWidth="2.4" strokeLinejoin="round" />
            <path d="M 49 181 L 78 181 L 77 186 L 49 186 Z" fill="#ffd700" stroke="#0b0d13" strokeWidth="1.4" />
            <path d="M 116 126 C 118 144, 122 156, 124 168 L 138 168 C 136 156, 130 144, 128 126 Z" fill="#020617" stroke="#0b0d13" strokeWidth="2.4" strokeLinejoin="round" />
            <path d="M 148 168 C 150 163, 138 162, 124 165 L 122 179 C 122 185, 152 185, 148 168 Z" fill="#0f172a" stroke="#0b0d13" strokeWidth="2.4" strokeLinejoin="round" />
            <path d="M 151 181 L 122 181 L 123 186 L 151 186 Z" fill="#ffd700" stroke="#0b0d13" strokeWidth="1.4" />
          </g>
        </svg>
      );
  }
}

/* ==========================================================================
   3. THEMED HEAD ACCESSORIES (LAYER DIRECTLY ON TOP OF THE FACE, zIndex: 16)
   ========================================================================== */

function ThemedAccessory({ theme }: { theme: StoryTheme }) {
  switch (theme) {
    /* 1. INTRO: Multi-color Cone Birthday Party Hat */
    case 'intro':
      return (
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 16 }}>
          <g transform="translate(101, 34) rotate(-10) scale(0.92)">
            {/* Party Cone with Stripes */}
            <path d="M 0 -36 L -20 8 Q 0 16 20 8 Z" fill="#ffd700" stroke="#0b0d13" strokeWidth="2.2" strokeLinejoin="round" />
            <path d="M -15 0 Q 0 8 15 0 L 10 -12 Q 0 -4 -10 -12 Z" fill="#ff0077" />
            <path d="M -7 -18 Q 0 -12 7 -18 L 3 -28 Q 0 -24 -3 -28 Z" fill="#00e5ff" />
            {/* Fluffy Pom-Pom on tip */}
            <circle cx="0" cy="-38" r="5.5" fill="#ffffff" stroke="#0b0d13" strokeWidth="1.8" />
            <circle cx="-1" cy="-39" r="2" fill="#ffd700" />
          </g>
        </svg>
      );

    /* 2. MOON: Bubble Visor Sheen, Sun Shield & Antenna */
    case 'moon':
      return (
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 16 }}>
          <defs>
            <linearGradient id="bubbleVisorSheen" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
              <stop offset="35%" stopColor="#00e5ff" stopOpacity="0.45" />
              <stop offset="70%" stopColor="#ffffff" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#00e5ff" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d="M 64 34 C 82 22, 118 22, 136 34 C 130 38, 70 38, 64 34 Z" fill="url(#bubbleVisorSheen)" />
          <path d="M 72 38 C 88 28, 112 28, 128 38" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" opacity="0.9" />
          <path d="M 62 38 C 84 18, 116 18, 138 38 C 132 44, 68 44, 62 38 Z" fill="#ffd700" stroke="#0b0d13" strokeWidth="2.2" strokeLinejoin="round" />
          <path d="M 74 32 C 90 24, 110 24, 126 32" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="134" y1="30" x2="152" y2="10" stroke="#0b0d13" strokeWidth="2.6" strokeLinecap="round" />
          <line x1="134" y1="30" x2="152" y2="10" stroke="#e2e8f0" strokeWidth="1.2" strokeLinecap="round" />
          <circle cx="152" cy="10" r="5.5" fill="#00e5ff" stroke="#0b0d13" strokeWidth="1.8" />
          <circle cx="150.5" cy="8.5" r="1.8" fill="#ffffff" />
          <path d="M 65 96 C 68 106, 76 112, 88 114" fill="none" stroke="#0b0d13" strokeWidth="2.2" strokeLinecap="round" />
          <ellipse cx="88" cy="114" rx="3.5" ry="2.5" fill="#1e293b" stroke="#0b0d13" strokeWidth="1.4" />
        </svg>
      );

    /* 3. RADIO: Retro 80s Orange Walkman Headphones */
    case 'radio':
      return (
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 16 }}>
          {/* Metal Headband */}
          <path d="M 64 68 C 64 26, 136 26, 136 68" stroke="#94a3b8" strokeWidth="3" strokeLinecap="round" fill="none" />
          <path d="M 64 68 C 64 26, 136 26, 136 68" stroke="#e2e8f0" strokeWidth="1.5" strokeLinecap="round" fill="none" />
          {/* Left Orange Foam Earpad */}
          <g transform="translate(64, 68)">
            <ellipse cx="0" cy="0" rx="8" ry="12" fill="#f97316" stroke="#0b0d13" strokeWidth="2" />
            <ellipse cx="0" cy="0" rx="4.5" ry="7" fill="#ea580c" />
            <circle cx="2" cy="-3" r="1.5" fill="#ffffff" opacity="0.6" />
          </g>
          {/* Right Orange Foam Earpad */}
          <g transform="translate(136, 68)">
            <ellipse cx="0" cy="0" rx="8" ry="12" fill="#f97316" stroke="#0b0d13" strokeWidth="2" />
            <ellipse cx="0" cy="0" rx="4.5" ry="7" fill="#ea580c" />
            <circle cx="-2" cy="-3" r="1.5" fill="#ffffff" opacity="0.6" />
          </g>
        </svg>
      );

    /* 4. SALES: Oversized 80s Sunglasses perched on forehead */
    case 'sales':
      return (
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 16 }}>
          <g transform="translate(100, 52) rotate(-4) scale(0.9)">
            {/* Sunglasses Bridge */}
            <rect x="-34" y="-12" width="68" height="20" rx="4" fill="#ffd700" stroke="#0b0d13" strokeWidth="2.2" />
            {/* Dark Tinted Lenses with Reflection */}
            <rect x="-30" y="-8" width="26" height="13" rx="2" fill="#0f172a" />
            <line x1="-28" y1="-6" x2="-14" y2="3" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" opacity="0.8" />
            <rect x="4" y="-8" width="26" height="13" rx="2" fill="#0f172a" />
            <line x1="6" y1="-6" x2="20" y2="3" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" opacity="0.8" />
          </g>
        </svg>
      );

    /* 5. BILLBOARD: DJ Over-Ear Studio Headphones */
    case 'billboard':
      return (
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 16 }}>
          {/* Chunky Headband */}
          <path d="M 62 60 C 62 16, 138 16, 138 60" stroke="#0f172a" strokeWidth="5" strokeLinecap="round" fill="none" />
          <path d="M 62 60 C 62 16, 138 16, 138 60" stroke="#ff0077" strokeWidth="2" strokeLinecap="round" fill="none" />
          {/* Large Over-Ear Cushions */}
          <ellipse cx="62" cy="62" rx="7" ry="14" fill="#1e293b" stroke="#0b0d13" strokeWidth="2" />
          <ellipse cx="62" cy="62" rx="3.5" ry="8" fill="#00e5ff" />
          <ellipse cx="138" cy="62" rx="7" ry="14" fill="#1e293b" stroke="#0b0d13" strokeWidth="2" />
          <ellipse cx="138" cy="62" rx="3.5" ry="8" fill="#00e5ff" />
        </svg>
      );

    /* 6. NEWS: Vintage Press Fedora Hat with PRESS Ticket */
    case 'news':
      return (
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 16 }}>
          <g transform="translate(100, 20) rotate(-6) scale(0.85)">
            {/* Fedora Crown */}
            <path d="M -24 -2 Q -30 -30 0 -26 Q 30 -30 24 -2 Z" fill="#64748b" stroke="#0b0d13" strokeWidth="2.2" strokeLinejoin="round" />
            {/* Fedora Crown Crease */}
            <path d="M -10 -22 Q 0 -16 10 -22" stroke="#334155" strokeWidth="2" fill="none" />
            {/* Black Hatband */}
            <rect x="-25" y="-6" width="50" height="6" fill="#0f172a" />
            {/* White PRESS Card tucked into band */}
            <g transform="translate(10, -18) rotate(14)">
              <rect x="0" y="0" width="16" height="18" fill="#ffffff" stroke="#0b0d13" strokeWidth="1.2" />
              <text x="2" y="11" fontFamily="sans-serif" fontSize="4.5" fontWeight="900" fill="#e11d48">PRESS</text>
            </g>
            {/* Wide Hat Brim */}
            <path d="M -42 0 Q 0 -6 42 0 Q 0 8 -42 0 Z" fill="#475569" stroke="#0b0d13" strokeWidth="2.2" strokeLinejoin="round" />
          </g>
        </svg>
      );

    /* 7. CINEMA: Retro 3D Glasses (Red & Cyan Lenses) */
    case 'cinema':
      return (
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 16 }}>
          <g transform="translate(100, 60) rotate(-2) scale(0.88)">
            {/* White Cardboard Frames */}
            <rect x="-38" y="-14" width="76" height="22" rx="3" fill="#ffffff" stroke="#0b0d13" strokeWidth="2.2" />
            {/* Left Red Lens */}
            <rect x="-34" y="-10" width="30" height="14" rx="2" fill="#ef4444" stroke="#0b0d13" strokeWidth="1.4" />
            <line x1="-31" y1="-8" x2="-18" y2="2" stroke="#ffffff" strokeWidth="1.6" strokeLinecap="round" opacity="0.8" />
            {/* Right Cyan Lens */}
            <rect x="4" y="-10" width="30" height="14" rx="2" fill="#06b6d4" stroke="#0b0d13" strokeWidth="1.4" />
            <line x1="7" y1="-8" x2="20" y2="2" stroke="#ffffff" strokeWidth="1.6" strokeLinecap="round" opacity="0.8" />
          </g>
        </svg>
      );

    /* 8. STATS: Round Professor Scientist Glasses */
    case 'stats':
      return (
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 16 }}>
          <g transform="translate(100, 46) scale(0.88)">
            {/* Frame Bridge */}
            <path d="M -8 -4 Q 0 -8 8 -4" stroke="#0b0d13" strokeWidth="2.4" fill="none" strokeLinecap="round" />
            {/* Left Round Lens */}
            <circle cx="-18" cy="0" r="14" fill="rgba(255,255,255,0.25)" stroke="#0b0d13" strokeWidth="2.4" />
            <path d="M -24 -6 Q -18 -10 -12 -6" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
            {/* Right Round Lens */}
            <circle cx="18" cy="0" r="14" fill="rgba(255,255,255,0.25)" stroke="#0b0d13" strokeWidth="2.4" />
            <path d="M 12 -6 Q 18 -10 24 -6" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
          </g>
        </svg>
      );

    /* 9. SUMMARY: Shiny Golden Crown with Jewels */
    case 'summary':
    default:
      return (
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 16 }}>
          <g transform="translate(100, 66) rotate(-4) scale(0.9)">
            {/* Golden Crown Base */}
            <path d="M -24 4 L -30 -16 L -14 -6 L 0 -22 L 14 -6 L 30 -16 L 24 4 Z" fill="#ffd700" stroke="#0b0d13" strokeWidth="2.2" strokeLinejoin="round" />
            {/* Crown Base Rim */}
            <rect x="-24" y="0" width="48" height="6" fill="#eab308" stroke="#0b0d13" strokeWidth="1.5" />
            {/* Jewels */}
            <circle cx="0" cy="3" r="2.5" fill="#ef4444" />
            <circle cx="-14" cy="3" r="2" fill="#3b82f6" />
            <circle cx="14" cy="3" r="2" fill="#3b82f6" />
            <circle cx="0" cy="-22" r="2.5" fill="#ffffff" stroke="#0b0d13" strokeWidth="1" />
            <circle cx="-30" cy="-16" r="2.5" fill="#ffffff" stroke="#0b0d13" strokeWidth="1" />
            <circle cx="30" cy="-16" r="2.5" fill="#ffffff" stroke="#0b0d13" strokeWidth="1" />
          </g>
        </svg>
      );
  }
}

/* ==========================================================================
   4. THEMED HEAD CUTOUT COORDINATES
   Calibrated for each AI mascot backdrop image (1:1 viewport)
   ========================================================================== */

export interface ThemeHeadLayout {
  top: string;
  left: string;
  width: string;
}

export const THEME_HEAD_LAYOUTS: Record<StoryTheme, ThemeHeadLayout> = {
  intro: { top: '33%', left: '50.5%', width: '42%' },
  moon: { top: '43%', left: '50%', width: '58%' },
  radio: { top: '34%', left: '51%', width: '42%' },
  sales: { top: '33%', left: '50%', width: '42%' },
  billboard: { top: '28%', left: '51%', width: '42%' },
  news: { top: '22%', left: '50%', width: '42%' },
  cinema: { top: '34%', left: '50%', width: '42%' },
  stats: { top: '24.5%', left: '50%', width: '42%' },
  summary: { top: '46%', left: '50%', width: '42%' },
};

/* ==========================================================================
   5. UNIFIED THEMED 1:1 SQUARE MASCOT POLAROID COMPONENT
   Applied across all story slides for consistent, ultra-charming 1:1 format.
   ========================================================================== */

export function ThemedMascotPolaroid({
  year = 1989,
  name,
  gender = 'masculino',
  userPhotoUrl,
  caption,
  theme = 'intro',
  rotation = 0,
  width = 'clamp(80px, 22cqw, 92px)',
  className = '',
  style,
}: PolaroidCardProps) {
  const defaultCaption = caption || getThemedCaption(theme, name, year);
  const themeMeta = getThemeMeta(theme, year);
  const layout = THEME_HEAD_LAYOUTS[theme] || { top: '33%', left: '50%', width: '33%' };

  return (
    <div
      className={`acid-polaroid-container acid-polaroid-square ${className}`}
      style={{
        width: width || '88px',
        maxWidth: '120px',
        transform: `rotate(${rotation}deg)`,
        margin: '0 auto',
        display: 'block',
        position: 'relative',
        boxSizing: 'border-box',
        userSelect: 'none',
        overflow: 'visible',
        filter: 'drop-shadow(0 8px 16px rgba(0, 0, 0, 0.45)) drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))',
        ...style,
      }}
    >
      {/* 1. POLAROID CARD FRAME (1:1 Square Photo + Compact Bottom Chin) */}
      <div
        className="acid-polaroid-frame"
        style={{
          background: '#ffffff',
          border: '1px solid rgba(0, 0, 0, 0.2)',
          boxShadow: 'inset 0 0 1px rgba(0, 0, 0, 0.25)',
          borderRadius: '2px',
          padding: '4px 4px 5px 4px',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          overflow: 'hidden',
          boxSizing: 'border-box',
          width: '100%',
          zIndex: 5,
        }}
      >
        {/* Photo Viewport: STRICT 1:1 SQUARE ASPECT RATIO */}
        <div
          className="acid-polaroid-photo-viewport"
          style={{
            position: 'relative',
            width: '100%',
            aspectRatio: '1 / 1',
            height: 'auto',
            maxHeight: 'none',
            overflow: 'hidden',
            borderRadius: '1px',
            border: '1px solid rgba(0, 0, 0, 0.25)',
            boxSizing: 'border-box',
            background: '#0a0d14',
          }}
        >
          {/* A. AI Generated High-Quality Polaroid Mascot & Backdrop */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`/characters/mascots/${theme}.jpg`}
            alt={`Cenário e corpo temático ${theme}`}
            className="acid-polaroid-ai-backdrop"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              zIndex: 5,
              display: 'block',
              pointerEvents: 'none',
            }}
            onError={(e) => {
              (e.target as HTMLElement).style.display = 'none';
            }}
          />

          {/* C. Center Layer: Real Face Cutout (The Face IS the Body!) */}
          {userPhotoUrl ? (
            <div
              className="acid-polaroid-face-container"
              style={{
                position: 'absolute',
                top: layout.top,
                left: layout.left,
                transform: 'translate(-50%, -50%)',
                width: layout.width,
                zIndex: 12,
                pointerEvents: 'none',
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={userPhotoUrl}
                alt="Rosto recortado do personagem"
                className="acid-polaroid-face-img"
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                  filter:
                    'drop-shadow(1px 0 0 #ffffff) drop-shadow(-1px 0 0 #ffffff) drop-shadow(0 1px 0 #ffffff) drop-shadow(0 -1px 0 #ffffff) drop-shadow(0 4px 10px rgba(0,0,0,0.65)) contrast(1.06) saturate(1.1)',
                }}
              />
            </div>
          ) : (
            /* Fallback Default Cute Chibi Face (when user photo is not provided) */
            <div
              className="acid-polaroid-chibi-fallback"
              style={{
                position: 'absolute',
                top: layout.top,
                left: layout.left,
                transform: 'translate(-50%, -50%)',
                width: layout.width,
                aspectRatio: '1 / 1.15',
                borderRadius: '50%',
                background: '#ffdfba',
                border: '2px solid #0c0d11',
                boxShadow: '0 0 0 1.5px #ffffff, 0 4px 8px rgba(0,0,0,0.4)',
                zIndex: 12,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                pointerEvents: 'none',
              }}
            >
              <div style={{ display: 'flex', gap: '14px', marginTop: '4px' }}>
                <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#0c0d11' }} />
                <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#0c0d11' }} />
              </div>
              <div style={{ display: 'flex', gap: '20px', marginTop: '2px' }}>
                <div style={{ width: '6px', height: '3.5px', borderRadius: '50%', background: '#ff708f', opacity: 0.8 }} />
                <div style={{ width: '6px', height: '3.5px', borderRadius: '50%', background: '#ff708f', opacity: 0.8 }} />
              </div>
              <div
                style={{
                  width: '9px',
                  height: '4.5px',
                  borderRadius: '0 0 9px 9px',
                  border: '1.5px solid #0c0d11',
                  borderTop: 'none',
                  marginTop: '1px',
                }}
              />
            </div>
          )}

          {/* D. Front Overlay Layer: Themed Accessories (Hats, Visors, Sunglasses, Glasses, Crowns) */}
          <ThemedAccessory theme={theme} />
        </div>

        {/* 2. POLAROID BOTTOM CHIN MARGIN (Compact Vintage Label) */}
        <div
          className="acid-polaroid-chin"
          style={{
            marginTop: '3px',
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
                fontSize: 'clamp(0.48rem, 1.3cqw, 0.60rem)',
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
            <div className="acid-barcode" style={{ height: '6px', color: '#0c0d11' }}>
              <span /><span /><span /><span />
            </div>
          </div>

          <div
            className="acid-polaroid-meta"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'clamp(0.35rem, 0.95cqw, 0.42rem)',
              color: '#555562',
              fontWeight: 800,
              letterSpacing: '0.5px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <span>{themeMeta}</span>
            <span>1:1</span>
          </div>
        </div>
      </div>

      {/* 3. Frosted Washi Tape Strip on top of Polaroid Paper */}
      <div
        className="acid-polaroid-tape"
        style={{
          position: 'absolute',
          top: '-6px',
          left: '50%',
          transform: 'translateX(-50%) rotate(-1deg)',
          width: '38px',
          height: '12px',
          background: 'rgba(255, 255, 255, 0.88)',
          border: '1px dashed rgba(0, 0, 0, 0.25)',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.2)',
          backdropFilter: 'blur(2px)',
          zIndex: 18,
          pointerEvents: 'none',
        }}
      />
    </div>
  );
}

/* Backwards-compatible export */
export const MoonMascotPolaroid = ThemedMascotPolaroid;

/* Default export: Uses the new ThemedMascotPolaroid for ALL themes! */
export default function PolaroidCard(props: PolaroidCardProps) {
  return <ThemedMascotPolaroid {...props} />;
}
