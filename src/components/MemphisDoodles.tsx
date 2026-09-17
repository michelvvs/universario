import React from 'react';

export function MemphisSquiggle({
  color = '#111111',
  width = 64,
  height = 16,
  strokeWidth = 3.5,
  className = '',
  style = {},
}: {
  color?: string;
  width?: number;
  height?: number;
  strokeWidth?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 80 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ display: 'inline-block', flexShrink: 0, ...style }}
    >
      <path
        d="M2 10 Q 12 2, 22 10 T 42 10 T 62 10 T 78 10"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function MemphisZigzag({
  color = '#111111',
  width = 54,
  height = 18,
  strokeWidth = 3.5,
  className = '',
  style = {},
}: {
  color?: string;
  width?: number;
  height?: number;
  strokeWidth?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 60 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ display: 'inline-block', flexShrink: 0, ...style }}
    >
      <path
        d="M2 18 L 12 2 L 22 18 L 32 2 L 42 18 L 52 2 L 58 12"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function MemphisTrianglePattern({
  size = 46,
  fillColor = '#00d2ff',
  borderColor = '#111111',
  style = {},
}: {
  size?: number;
  fillColor?: string;
  borderColor?: string;
  style?: React.CSSProperties;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'inline-block', ...style }}
    >
      <defs>
        <pattern id="memphisDots" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse">
          <circle cx="4" cy="4" r="1.5" fill="#111111" />
        </pattern>
      </defs>
      <polygon
        points="25,4 46,46 4,46"
        fill={fillColor}
        stroke={borderColor}
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      <polygon
        points="25,8 42,44 8,44"
        fill="url(#memphisDots)"
        opacity="0.85"
      />
    </svg>
  );
}

export function MemphisCrosshatch({
  size = 38,
  color = '#111111',
  style = {},
}: {
  size?: number;
  color?: string;
  style?: React.CSSProperties;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'inline-block', ...style }}
    >
      <line x1="10" y1="2" x2="10" y2="38" stroke={color} strokeWidth="3" strokeLinecap="round" />
      <line x1="20" y1="2" x2="20" y2="38" stroke={color} strokeWidth="3" strokeLinecap="round" />
      <line x1="30" y1="2" x2="30" y2="38" stroke={color} strokeWidth="3" strokeLinecap="round" />
      <line x1="2" y1="10" x2="38" y2="10" stroke={color} strokeWidth="3" strokeLinecap="round" />
      <line x1="2" y1="20" x2="38" y2="20" stroke={color} strokeWidth="3" strokeLinecap="round" />
      <line x1="2" y1="30" x2="38" y2="30" stroke={color} strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

export function MemphisCoil({
  color = '#111111',
  width = 44,
  height = 18,
  style = {},
}: {
  color?: string;
  width?: number;
  height?: number;
  style?: React.CSSProperties;
}) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 50 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'inline-block', ...style }}
    >
      <path
        d="M4 16 C 4 4, 14 4, 14 10 C 14 16, 24 4, 24 10 C 24 16, 34 4, 34 10 C 34 16, 46 4, 46 10"
        stroke={color}
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
