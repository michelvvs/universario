'use client';

import React from 'react';

/**
 * Scotch / Cellophane Tape Strip
 * Realistic semi-transparent adhesive tape with frosted texture and subtle light crease.
 */
export function ScotchTape({
  width = 60,
  height = 18,
  rotate = -3,
  angle,
  className = '',
  style = {},
}: {
  width?: number | string;
  height?: number | string;
  rotate?: number;
  angle?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const finalRotate = angle !== undefined ? angle : rotate;

  return (
    <div
      className={`scotch-tape ${className}`}
      style={{
        position: 'absolute',
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height,
        transform: `rotate(${finalRotate}deg)`,
        background: 'linear-gradient(135deg, rgba(255, 255, 240, 0.72) 0%, rgba(255, 250, 220, 0.45) 50%, rgba(255, 255, 240, 0.65) 100%)',
        borderLeft: '1px dashed rgba(200, 190, 150, 0.5)',
        borderRight: '1px dashed rgba(200, 190, 150, 0.5)',
        boxShadow: '1px 2px 4px rgba(0, 0, 0, 0.25), inset 0 1px 1px rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(1px)',
        zIndex: 15,
        pointerEvents: 'none',
        ...style,
      }}
    />
  );
}

/**
 * Dymo Embossed Label Tape
 * Realistic 3D raised white lettering on textured black/red/blue/yellow/green plastic tape.
 */
export function DymoLabel({
  text,
  color = 'black',
  rotate = 0,
  fontSize = '0.72rem',
  style = {},
}: {
  text: string;
  color?: 'black' | 'red' | 'blue' | 'yellow' | 'green' | string;
  rotate?: number;
  fontSize?: string;
  style?: React.CSSProperties;
}) {
  let bg = 'linear-gradient(180deg, #2a2a2a 0%, #111111 100%)';
  let textColor = '#ffffff';

  if (color === 'red') {
    bg = 'linear-gradient(180deg, #d32f2f 0%, #b71c1c 100%)';
  } else if (color === 'blue') {
    bg = 'linear-gradient(180deg, #1976d2 0%, #0d47a1 100%)';
  } else if (color === 'yellow') {
    bg = 'linear-gradient(180deg, #ffd600 0%, #e6a100 100%)';
    textColor = '#111111';
  } else if (color === 'green') {
    bg = 'linear-gradient(180deg, #2e7d32 0%, #1b5e20 100%)';
  }

  return (
    <span
      className="dymo-embossed-label"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '3px 8px',
        background: bg,
        color: textColor,
        fontFamily: "'Share Tech Mono', monospace",
        fontWeight: 900,
        fontSize,
        letterSpacing: '1.2px',
        textTransform: 'uppercase',
        borderRadius: '2px',
        transform: `rotate(${rotate}deg)`,
        boxShadow: '1.5px 2px 4px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.35)',
        textShadow: textColor === '#ffffff' ? '0 -1px 0 rgba(0, 0, 0, 0.9), 0 1px 1px rgba(255, 255, 255, 0.6)' : 'none',
        border: '1px solid rgba(0, 0, 0, 0.8)',
        ...style,
      }}
    >
      {text}
    </span>
  );
}

/**
 * Sharpie Handwritten Adhesive Label Strip
 * Off-white adhesive sticker with handwritten marker text.
 */
export function SharpieLabel({
  text,
  subtext,
  rotate = 0,
  style = {},
}: {
  text: string;
  subtext?: string;
  rotate?: number;
  style?: React.CSSProperties;
}) {
  return (
    <div
      style={{
        display: 'inline-block',
        background: '#fffdf4',
        color: '#0d1117',
        padding: '4px 10px',
        border: '1px solid #d4ceb8',
        boxShadow: '2px 2px 5px rgba(0,0,0,0.3)',
        transform: `rotate(${rotate}deg)`,
        position: 'relative',
        ...style,
      }}
    >
      <div
        style={{
          fontFamily: "'VT323', 'Courier New', monospace",
          fontWeight: 900,
          fontSize: '0.95rem',
          letterSpacing: '0.5px',
          color: '#111827',
          lineHeight: 1.1,
          textTransform: 'uppercase',
        }}
      >
        {text}
      </div>
      {subtext && (
        <div
          style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: '0.62rem',
            color: '#dc2626',
            letterSpacing: '0.5px',
            marginTop: '1px',
            fontWeight: 700,
          }}
        >
          {subtext}
        </div>
      )}
    </div>
  );
}

/**
 * VCR OSD Status Badge
 * Authentic glowing phosphor green/cyan/red VCR on-screen display.
 */
export function VcrOsdBadge({
  text,
  type = 'play',
  variant,
  glowColor,
}: {
  text: string;
  type?: 'play' | 'rec' | 'sp' | 'track' | 'time' | 'tracking' | string;
  variant?: 'play' | 'rec' | 'sp' | 'track' | 'time' | 'tracking' | string;
  glowColor?: string;
}) {
  const activeType = variant || type;
  let finalGlow = glowColor;

  if (!finalGlow) {
    if (activeType === 'rec') finalGlow = '#ff3b30';
    else if (activeType === 'tracking' || activeType === 'track') finalGlow = '#00ff88';
    else if (activeType === 'sp') finalGlow = '#ffe600';
    else finalGlow = '#00e5ff';
  }

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '5px',
        fontFamily: "'VT323', monospace",
        fontSize: '0.92rem',
        letterSpacing: '1px',
        color: finalGlow,
        textShadow: `0 0 4px ${finalGlow}, 0 0 10px ${finalGlow}`,
        background: 'rgba(0, 0, 0, 0.65)',
        padding: '1px 6px',
        borderRadius: '3px',
        border: `1px solid ${finalGlow}33`,
      }}
    >
      {activeType === 'rec' && (
        <span
          style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            backgroundColor: '#ff3b30',
            boxShadow: '0 0 6px #ff3b30',
            display: 'inline-block',
          }}
          className="animate-pulse"
        />
      )}
      {(activeType === 'play' || activeType === 'sp') && <span>▶</span>}
      <span>{text}</span>
    </div>
  );
}

/**
 * 80s VHS Cassette Acrylic Window with Rotating Tape Spools
 */
export function VhsTapeWindow({
  size = 'medium',
  tapeProgress = 50,
  label,
  timecode,
  spinning = true,
}: {
  size?: 'small' | 'medium';
  tapeProgress?: number; // 0 (start) to 100 (end)
  label?: string;
  timecode?: string;
  spinning?: boolean;
}) {
  const isSmall = size === 'small';
  const width = isSmall ? '130px' : '168px';
  const height = isSmall ? '44px' : '56px';
  const spoolSize = isSmall ? 28 : 36;

  // Calculate left vs right tape spool thickness
  const leftSpoolRadius = 14 + (tapeProgress / 100) * 10;
  const rightSpoolRadius = 24 - (tapeProgress / 100) * 10;

  return (
    <div
      style={{
        width,
        height,
        position: 'relative',
        background: 'radial-gradient(ellipse at 50% 50%, rgba(20, 20, 22, 0.95) 0%, rgba(10, 10, 12, 0.98) 100%)',
        borderRadius: '8px',
        border: '2px solid #2b2b2f',
        boxShadow: 'inset 0 2px 8px rgba(0, 0, 0, 0.9), 0 2px 4px rgba(0, 0, 0, 0.5)',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: isSmall ? '0 14px' : '0 20px',
        margin: '0 auto',
      }}
    >
      {/* Acrylic Glass Highlight Reflection */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '40%',
          background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.12) 0%, transparent 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* Central Tape Path Window Ruler Marks */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '18%',
          bottom: '18%',
          width: '1px',
          backgroundColor: 'rgba(255, 255, 255, 0.15)',
          transform: 'translateX(-50%)',
        }}
      />

      {/* Left Supply Tape Spool Reel */}
      <div
        style={{
          width: spoolSize,
          height: spoolSize,
          borderRadius: '50%',
          border: '2px solid #ffffff',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: `0 0 0 ${leftSpoolRadius * 0.4}px #1a1614, 0 0 8px rgba(0,0,0,0.8)`,
        }}
        className={spinning ? 'animate-spin-slow' : ''}
      >
        {/* Reel 3-teeth sprockets */}
        <div style={{ position: 'absolute', width: '70%', height: '2.5px', background: '#ffffff' }} />
        <div style={{ position: 'absolute', width: '70%', height: '2.5px', background: '#ffffff', transform: 'rotate(60deg)' }} />
        <div style={{ position: 'absolute', width: '70%', height: '2.5px', background: '#ffffff', transform: 'rotate(120deg)' }} />
        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#0a0a0c', border: '1px solid #fff', zIndex: 2 }} />
      </div>

      {/* Center Label / Time Code */}
      <div
        style={{
          fontFamily: "'Share Tech Mono', monospace",
          fontSize: '0.58rem',
          color: 'rgba(255, 255, 255, 0.5)',
          letterSpacing: '1px',
          zIndex: 2,
          textAlign: 'center',
        }}
      >
        {timecode || label || 'E-180'}
      </div>

      {/* Right Take-Up Tape Spool Reel */}
      <div
        style={{
          width: spoolSize,
          height: spoolSize,
          borderRadius: '50%',
          border: '2px solid #ffffff',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: `0 0 0 ${rightSpoolRadius * 0.4}px #1a1614, 0 0 8px rgba(0,0,0,0.8)`,
        }}
        className={spinning ? 'animate-spin-slow' : ''}
      >
        {/* Reel 3-teeth sprockets */}
        <div style={{ position: 'absolute', width: '70%', height: '2.5px', background: '#ffffff' }} />
        <div style={{ position: 'absolute', width: '70%', height: '2.5px', background: '#ffffff', transform: 'rotate(60deg)' }} />
        <div style={{ position: 'absolute', width: '70%', height: '2.5px', background: '#ffffff', transform: 'rotate(120deg)' }} />
        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#0a0a0c', border: '1px solid #fff', zIndex: 2 }} />
      </div>
    </div>
  );
}

/**
 * 80s Gold Metallic Foil Badge
 * Authentic "HGX-GOLD / HIGH QUALITY" seal.
 */
export function VhsGoldSeal({
  title,
  subtitle,
  text,
  subtext,
}: {
  title?: string;
  subtitle?: string;
  text?: string;
  subtext?: string;
}) {
  const finalTitle = title || text || 'HGX GOLD';
  const finalSubtitle = subtitle || subtext || 'HI-FI STEREO';

  return (
    <div
      style={{
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '3px 9px',
        background: 'linear-gradient(135deg, #ffd700 0%, #ffae00 35%, #fff2a8 50%, #d4af37 70%, #aa771c 100%)',
        color: '#111111',
        borderRadius: '4px',
        border: '1px solid #ffe875',
        boxShadow: '0 2px 5px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.7)',
      }}
    >
      <span
        style={{
          fontFamily: "'Archivo Black', sans-serif",
          fontSize: '0.64rem',
          letterSpacing: '0.8px',
          lineHeight: 1,
          textShadow: '0 1px 0 rgba(255,255,255,0.6)',
        }}
      >
        {finalTitle}
      </span>
      {finalSubtitle && (
        <span
          style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: '0.52rem',
            fontWeight: 800,
            letterSpacing: '0.5px',
            lineHeight: 1,
            marginTop: '1px',
          }}
        >
          {finalSubtitle}
        </span>
      )}
    </div>
  );
}

/**
 * LED Stereo VU-Meter
 * Glowing green / yellow / red audio LED meter bars.
 */
export function VcrVuMeter() {
  const levels = [
    { color: '#00e676', lit: true },
    { color: '#00e676', lit: true },
    { color: '#00e676', lit: true },
    { color: '#00e676', lit: true },
    { color: '#00e676', lit: true },
    { color: '#00e676', lit: true },
    { color: '#ffd600', lit: true },
    { color: '#ffd600', lit: true },
    { color: '#ff1744', lit: false },
    { color: '#ff1744', lit: false },
  ];

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '2px',
        background: '#0a0a0c',
        padding: '3px 6px',
        borderRadius: '3px',
        border: '1px solid #222228',
      }}
    >
      <span
        style={{
          fontFamily: "'Share Tech Mono', monospace",
          fontSize: '0.52rem',
          color: '#888888',
          marginRight: '3px',
        }}
      >
        L/R
      </span>
      {levels.map((lvl, idx) => (
        <div
          key={idx}
          className={lvl.lit ? 'animate-vu-flicker' : ''}
          style={{
            width: '3.5px',
            height: '10px',
            borderRadius: '1px',
            backgroundColor: lvl.lit ? lvl.color : '#222222',
            boxShadow: lvl.lit ? `0 0 4px ${lvl.color}` : 'none',
            transition: 'background-color 0.1s ease',
          }}
        />
      ))}
    </div>
  );
}

/**
 * Vintage 80s Video Rental Store Sticker
 */
export function VhsRentalSticker({
  text = 'POR FAVOR REBOBINE',
  subtext = 'BE KIND REWIND',
  rotate = 2,
}: {
  text?: string;
  subtext?: string;
  rotate?: number;
}) {
  return (
    <div
      style={{
        display: 'inline-block',
        padding: '3px 8px',
        background: '#ffe600',
        color: '#111111',
        border: '1.5px dashed #111111',
        borderRadius: '4px',
        transform: `rotate(${rotate}deg)`,
        boxShadow: '2px 2px 4px rgba(0,0,0,0.3)',
        textAlign: 'center',
      }}
    >
      <div style={{ fontFamily: "'Archivo Black', sans-serif", fontSize: '0.62rem', letterSpacing: '0.5px', lineHeight: 1 }}>
        📼 {text}
      </div>
      {subtext && (
        <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.50rem', fontWeight: 800, letterSpacing: '0.5px' }}>
          ★ {subtext} ★
        </div>
      )}
    </div>
  );
}

/**
 * Realistic Paper Photo-Collage Cutout Element
 * Renders an authentic cutout sticker with a white border and drop shadow.
 */
export function CollageCutout({
  src,
  alt = 'Collage cutout',
  size = 110,
  rotate = 0,
  style = {},
  className = '',
}: {
  src: string;
  alt?: string;
  size?: number | string;
  rotate?: number;
  style?: React.CSSProperties;
  className?: string;
}) {
  return (
    <div
      className={`collage-cutout-wrapper ${className}`}
      style={{
        position: 'absolute',
        width: typeof size === 'number' ? `${size}px` : size,
        height: typeof size === 'number' ? `${size}px` : size,
        transform: `rotate(${rotate}deg)`,
        mixBlendMode: 'screen',
        pointerEvents: 'none',
        zIndex: 12,
        filter: 'drop-shadow(0 6px 14px rgba(0, 0, 0, 0.95))',
        ...style,
      }}
    >
      <img
        src={src}
        alt={alt}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
        }}
      />
    </div>
  );
}

/**
 * 4-Color Vintage Blank VHS Tape Rainbow Racing Stripe Band
 * Inspired by Fuji, Memorex, CVS & Recoton tape packaging
 */
export function VhsRainbowBand({
  height = 10,
  style = {},
  className = '',
}: {
  height?: number;
  style?: React.CSSProperties;
  className?: string;
}) {
  const stripeHeight = Math.max(2, Math.floor(height / 4));
  return (
    <div
      className={`vhs-rainbow-stripes-horizontal ${className}`}
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 2px 6px rgba(0,0,0,0.6)',
        ...style,
      }}
    >
      <div style={{ height: `${stripeHeight}px`, backgroundColor: '#ffd600' }} />
      <div style={{ height: `${stripeHeight}px`, backgroundColor: '#ff7700' }} />
      <div style={{ height: `${stripeHeight}px`, backgroundColor: '#e50914' }} />
      <div style={{ height: `${stripeHeight}px`, backgroundColor: '#7928ca' }} />
    </div>
  );
}

/**
 * Chromatic Aberration "PLAY ▶" Glitch OSD
 * Inspired by classic VCR screen glitch (cyan/magenta split)
 */
export function VhsPlayGlitch({
  text = 'PLAY ▶',
  subtext = 'SP',
  timecode = '00:00:00',
}: {
  text?: string;
  subtext?: string;
  timecode?: string;
}) {
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        padding: '2px 8px',
        background: 'rgba(0, 0, 0, 0.75)',
        border: '1px solid rgba(0, 255, 255, 0.3)',
        borderRadius: '4px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.7)',
      }}
    >
      <span className="vhs-play-glitch" style={{ fontSize: '0.95rem' }}>
        {text}
      </span>
      {subtext && (
        <span
          style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: '0.62rem',
            color: '#ffd600',
            fontWeight: 800,
            letterSpacing: '1px',
          }}
        >
          {subtext}
        </span>
      )}
      {timecode && (
        <span
          style={{
            fontFamily: "'VT323', monospace",
            fontSize: '0.90rem',
            color: '#00ff66',
            letterSpacing: '1px',
            textShadow: '0 0 5px #00ff66',
          }}
        >
          {timecode}
        </span>
      )}
    </div>
  );
}

/**
 * Authentic Vintage VHS Tape Specification Badge
 * e.g. "T-120 HQ" / "PREMIUM HIGH GRADE" / "246 METERS"
 */
export function VhsTapeSpecBadge({
  format = 'T-120',
  grade = 'HIGH GRADE',
  length = '6 HOURS',
}: {
  format?: string;
  grade?: string;
  length?: string;
}) {
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        padding: '2px 8px',
        background: '#111114',
        border: '1.5px solid #33333d',
        borderRadius: '3px',
        boxShadow: '0 2px 5px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.15)',
      }}
    >
      <span
        style={{
          fontFamily: "'Archivo Black', sans-serif",
          fontSize: '0.72rem',
          color: '#ffffff',
          letterSpacing: '0.8px',
          lineHeight: 1,
        }}
      >
        {format}
      </span>
      <span style={{ color: '#e50914', fontWeight: 900, fontSize: '0.65rem' }}>•</span>
      <span
        style={{
          fontFamily: "'Share Tech Mono', monospace",
          fontSize: '0.58rem',
          color: '#ffd600',
          fontWeight: 800,
          letterSpacing: '0.5px',
        }}
      >
        {grade}
      </span>
      <span style={{ color: '#444450', fontSize: '0.55rem' }}>|</span>
      <span
        style={{
          fontFamily: "'VT323', monospace",
          fontSize: '0.80rem',
          color: '#00e5ff',
          letterSpacing: '0.5px',
        }}
      >
        {length}
      </span>
    </div>
  );
}

/**
 * Dot-Matrix 80s Cassette Logo / Year Indicator
 * Inspired by vintage 90s dot matrix typography (image 3)
 */
export function VhsDotMatrixBadge({
  letter = '📼',
  text = 'BEST MEMORIES INSIDE',
}: {
  letter?: string;
  text?: string;
}) {
  return (
    <div
      style={{
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '2px',
      }}
    >
      <div
        style={{
          fontSize: '1.2rem',
          filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.6))',
        }}
      >
        {letter}
      </div>
      <div
        style={{
          fontFamily: "'Share Tech Mono', monospace",
          fontSize: '0.50rem',
          color: '#e50914',
          fontWeight: 900,
          letterSpacing: '0.8px',
          textTransform: 'uppercase',
        }}
      >
        {text}
      </div>
    </div>
  );
}

