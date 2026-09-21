'use client';

import React, { useState } from 'react';
import { Share2, Archive, Loader2, Sparkles, Check, Download, Video } from 'lucide-react';
import { shareOrDownloadSlide, downloadAllStoriesAsZip } from '@/lib/export-image';

interface ExportControlsProps {
  currentSlideElement: HTMLElement | null;
  allSlideElements: HTMLElement[];
  formattedDate: string;
  onPause: () => void;
  onResume: () => void;
}

export default function ExportControls({
  currentSlideElement,
  allSlideElements,
  formattedDate,
  onPause,
  onResume,
}: ExportControlsProps) {
  const [isExportingSingle, setIsExportingSingle] = useState(false);
  const [isExportingZip, setIsExportingZip] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const handleExportSingle = async () => {
    if (!currentSlideElement) return;
    try {
      onPause();
      setIsExportingSingle(true);
      await shareOrDownloadSlide(
        currentSlideElement,
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
        gap: '8px',
        marginTop: '12px',
        width: '100%',
        maxWidth: '480px',
      }}
    >
      {/* Export Single Story PNG Button */}
      <button
        type="button"
        onClick={handleExportSingle}
        disabled={isExportingSingle}
        className="btn-vcr-export"
        style={{
          padding: '11px 16px',
          background: 'linear-gradient(180deg, #d81414 0%, #9e0c0c 60%, #720808 100%)',
          border: '1.5px solid #ff6666',
          borderRadius: '6px',
          color: '#ffffff',
          fontFamily: 'var(--font-vcr)',
          fontSize: '1.05rem',
          letterSpacing: '1.2px',
          flex: '1 1 200px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          cursor: isExportingSingle ? 'not-allowed' : 'pointer',
          boxShadow: '0 4px 0 #4a0505, 0 8px 18px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.4)',
          textTransform: 'uppercase',
          transition: 'all 0.1s ease',
        }}
      >
        {isExportingSingle ? (
          <>
            <Loader2 size={16} className="animate-spin-slow" />
            <span>GRAVANDO MASTER 9:16...</span>
          </>
        ) : (
          <>
            <Share2 size={16} />
            <span>[REC] COMPARTILHAR / BAIXAR STORY</span>
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
          padding: '11px 15px',
          background: 'linear-gradient(180deg, #001f5c 0%, #00133d 60%, #000c29 100%)',
          border: '1.5px solid #00e5ff',
          borderRadius: '6px',
          color: '#00e5ff',
          fontFamily: 'var(--font-vcr)',
          fontSize: '1.05rem',
          letterSpacing: '1.2px',
          flex: '1 1 170px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          cursor: isExportingZip ? 'not-allowed' : 'pointer',
          boxShadow: '0 4px 0 #00081a, 0 8px 18px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.25)',
          textTransform: 'uppercase',
          transition: 'all 0.1s ease',
        }}
      >
        {isExportingZip ? (
          <>
            <Loader2 size={16} className="animate-spin-slow" />
            <span>ARQUIVANDO EM ZIP...</span>
          </>
        ) : (
          <>
            <Archive size={16} />
            <span>[TAPE] BAIXAR TODAS (.ZIP)</span>
          </>
        )}
      </button>

      {/* Copy Link Button */}
      <button
        type="button"
        onClick={handleShareLink}
        className="btn-vcr-export"
        style={{
          padding: '10px 14px',
          background: 'linear-gradient(180deg, #332800 0%, #1f1800 60%, #141000 100%)',
          border: '1.5px solid #ffd700',
          borderRadius: '6px',
          color: '#ffd700',
          fontFamily: 'var(--font-vcr)',
          fontSize: '1.02rem',
          letterSpacing: '1.2px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '6px',
          cursor: 'pointer',
          boxShadow: '0 4px 0 #0f0c00, 0 8px 18px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.2)',
          textTransform: 'uppercase',
          transition: 'all 0.1s ease',
        }}
      >
        {isCopied ? (
          <>
            <Check size={15} style={{ color: '#00ff88' }} />
            <span style={{ color: '#00ff88' }}>[OK] LINK COPIADO!</span>
          </>
        ) : (
          <>
            <Sparkles size={15} />
            <span>[COPY] COPIAR LINK</span>
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
