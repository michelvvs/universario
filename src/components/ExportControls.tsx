'use client';

import React, { useState } from 'react';
import { Download, Share2, Archive, Loader2, Sparkles, Check } from 'lucide-react';
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
        gap: '10px',
        marginTop: '16px',
        width: '100%',
        maxWidth: '480px',
      }}
    >
      <button
        type="button"
        onClick={handleExportSingle}
        disabled={isExportingSingle}
        className="btn-cosmic-primary"
        style={{
          padding: '12px 20px',
          fontSize: '0.9rem',
          flex: '1 1 200px',
        }}
      >
        {isExportingSingle ? (
          <>
            <Loader2 size={16} className="animate-spin-slow" />
            <span>Gerando PNG 1080x1920...</span>
          </>
        ) : (
          <>
            <Share2 size={16} />
            <span>Compartilhar / Baixar Este Story</span>
          </>
        )}
      </button>

      <button
        type="button"
        onClick={handleExportZip}
        disabled={isExportingZip}
        className="btn-cosmic-secondary"
        style={{
          padding: '12px 18px',
          fontSize: '0.88rem',
          flex: '1 1 180px',
        }}
      >
        {isExportingZip ? (
          <>
            <Loader2 size={15} className="animate-spin-slow" />
            <span>Criando ZIP...</span>
          </>
        ) : (
          <>
            <Archive size={15} />
            <span>Baixar Todos (.ZIP)</span>
          </>
        )}
      </button>

      <button
        type="button"
        onClick={handleShareLink}
        className="btn-cosmic-secondary"
        style={{
          padding: '10px 14px',
          fontSize: '0.82rem',
        }}
      >
        {isCopied ? (
          <>
            <Check size={14} style={{ color: 'var(--accent-emerald)' }} />
            <span>Link Copiado!</span>
          </>
        ) : (
          <>
            <Sparkles size={14} />
            <span>Copiar Link</span>
          </>
        )}
      </button>
    </div>
  );
}
