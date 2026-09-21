'use client';

import React, { useState } from 'react';
import { Share2, Archive, Loader2, Sparkles, Check, Download, Video } from 'lucide-react';
import { shareOrDownloadSlide, downloadAllStoriesAsZip } from '@/lib/export-image';

interface ExportControlsProps {
  currentSlideElement?: HTMLElement | null;
  getCurrentSlideElement?: () => HTMLElement | null;
  allSlideElements: HTMLElement[];
  formattedDate: string;
  onPause: () => void;
  onResume: () => void;
}

export default function ExportControls({
  currentSlideElement,
  getCurrentSlideElement,
  allSlideElements,
  formattedDate,
  onPause,
  onResume,
}: ExportControlsProps) {
  const [isExportingSingle, setIsExportingSingle] = useState(false);
  const [isExportingZip, setIsExportingZip] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const handleExportSingle = async () => {
    const el = getCurrentSlideElement ? getCurrentSlideElement() : currentSlideElement;
    if (!el) return;
    try {
      onPause();
      setIsExportingSingle(true);
      await shareOrDownloadSlide(
        el,
        `Meu Universário - ${formattedDate}`,
        `universario-story-${formattedDate.replace(/[^a-zA-Z0-9]/g, '_')}.png`
      );
    } catch (err) {
      console.error(err);
    } finally {
      setIsExportingSingle(false);
      onResume();
    }
  };

  const handleExportZip = async () => {
    if (!allSlideElements || allSlideElements.length === 0) return;
    try {
      onPause();
      setIsExportingZip(true);
      await downloadAllStoriesAsZip(allSlideElements, formattedDate);
    } catch (err) {
      console.error(err);
    } finally {
      setIsExportingZip(false);
      onResume();
    }
  };

  const handleShareLink = async () => {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(window.location.href);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '6px',
        width: '100%',
        maxWidth: '460px',
      }}
    >
      {/* Export Single Story PNG Button */}
      <button
        type="button"
        onClick={handleExportSingle}
        disabled={isExportingSingle}
        className="btn-vcr-export"
        style={{
          padding: '7px 12px',
          background: 'linear-gradient(180deg, #d81414 0%, #9e0c0c 60%, #720808 100%)',
          border: '1.5px solid #ff6666',
          borderRadius: '5px',
          color: '#ffffff',
          fontFamily: 'var(--font-vcr)',
          fontSize: '0.84rem',
          letterSpacing: '0.8px',
          flex: '1 1 140px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '6px',
          cursor: isExportingSingle ? 'not-allowed' : 'pointer',
          boxShadow: '0 2px 0 #4a0505, 0 4px 10px rgba(0,0,0,0.7)',
          textTransform: 'uppercase',
          transition: 'all 0.1s ease',
        }}
      >
        {isExportingSingle ? (
          <>
            <Loader2 size={13} className="animate-spin-slow" />
            <span>GRAVANDO...</span>
          </>
        ) : (
          <>
            <Share2 size={13} />
            <span>BAIXAR STORY (PNG)</span>
          </>
        )}
      </button>

      {/* Download All as ZIP Button */}
      <button
        type="button"
        onClick={handleExportZip}
        disabled={isExportingZip}
        className="btn-vcr-export"
        style={{
          padding: '7px 12px',
          background: 'linear-gradient(180deg, #001f5c 0%, #00133d 60%, #000c29 100%)',
          border: '1.5px solid #00e5ff',
          borderRadius: '5px',
          color: '#00e5ff',
          fontFamily: 'var(--font-vcr)',
          fontSize: '0.84rem',
          letterSpacing: '0.8px',
          flex: '1 1 130px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '6px',
          cursor: isExportingZip ? 'not-allowed' : 'pointer',
          boxShadow: '0 2px 0 #00081a, 0 4px 10px rgba(0,0,0,0.7)',
          textTransform: 'uppercase',
          transition: 'all 0.1s ease',
        }}
      >
        {isExportingZip ? (
          <>
            <Loader2 size={13} className="animate-spin-slow" />
            <span>ARQUIVANDO...</span>
          </>
        ) : (
          <>
            <Archive size={13} />
            <span>TODAS (.ZIP)</span>
          </>
        )}
      </button>

      {/* Copy Link Button */}
      <button
        type="button"
        onClick={handleShareLink}
        className="btn-vcr-export"
        style={{
          padding: '7px 11px',
          background: 'linear-gradient(180deg, #332800 0%, #1f1800 60%, #141000 100%)',
          border: '1.5px solid #ffd700',
          borderRadius: '5px',
          color: '#ffd700',
          fontFamily: 'var(--font-vcr)',
          fontSize: '0.84rem',
          letterSpacing: '0.8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '5px',
          cursor: 'pointer',
          boxShadow: '0 2px 0 #0f0c00, 0 4px 10px rgba(0,0,0,0.7)',
          textTransform: 'uppercase',
          transition: 'all 0.1s ease',
        }}
      >
        {isCopied ? (
          <>
            <Check size={13} style={{ color: '#00ff88' }} />
            <span style={{ color: '#00ff88' }}>COPIADO!</span>
          </>
        ) : (
          <>
            <Sparkles size={13} />
            <span>COPIAR LINK</span>
          </>
        )}
      </button>

      <style jsx>{`
        .btn-vcr-export:hover:not(:disabled) {
          transform: translateY(2px);
          filter: brightness(1.1);
        }
        .btn-vcr-export:active:not(:disabled) {
          transform: translateY(4px);
        }
      `}</style>
    </div>
  );
}
