'use client';

import React, { useState } from 'react';
import { Archive, Loader2, Sparkles, Check, Download, X, ExternalLink } from 'lucide-react';
import {
  shareStoryToInstagram,
  downloadSingleSlide,
  downloadAllStoriesAsZip,
  downloadDataUrl,
} from '@/lib/export-image';

function InstagramIcon({ size = 16, color = '#ffffff' }: { size?: number; color?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0 }}
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

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
  const [isSharing, setIsSharing] = useState(false);
  const [isDownloadingSingle, setIsDownloadingSingle] = useState(false);
  const [isExportingZip, setIsExportingZip] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [previewDataUrl, setPreviewDataUrl] = useState<string | null>(null);

  const getTargetElement = (): HTMLElement | null => {
    return getCurrentSlideElement ? getCurrentSlideElement() : currentSlideElement || null;
  };

  const handleShareToInstagram = async () => {
    const el = getTargetElement();
    if (!el) return;

    try {
      onPause();
      setIsSharing(true);
      const fileName = `universario-story-${formattedDate.replace(/[^a-zA-Z0-9]/g, '_')}.png`;
      const result = await shareStoryToInstagram(el, fileName);

      if (result.method === 'modal' && result.dataUrl) {
        setPreviewDataUrl(result.dataUrl);
      }
    } catch (err) {
      console.error('Falha ao compartilhar no Instagram:', err);
    } finally {
      setIsSharing(false);
      onResume();
    }
  };

  const handleDownloadSingle = async () => {
    const el = getTargetElement();
    if (!el) return;

    try {
      onPause();
      setIsDownloadingSingle(true);
      const fileName = `universario-story-${formattedDate.replace(/[^a-zA-Z0-9]/g, '_')}.png`;
      await downloadSingleSlide(el, fileName);
    } catch (err) {
      console.error('Falha ao baixar imagem do story:', err);
    } finally {
      setIsDownloadingSingle(false);
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
      console.error('Falha ao arquivar stories em ZIP:', err);
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

  const handleOpenInstagramApp = () => {
    // Deep-link to open Instagram story camera
    window.location.href = 'instagram://story-camera';
    // Fallback to web Instagram if app is not installed
    setTimeout(() => {
      window.open('https://www.instagram.com', '_blank');
    }, 1500);
  };

  return (
    <>
      <div
        className="export-controls-container"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '6px',
          width: '100%',
          maxWidth: '460px',
        }}
      >
        {/* ROW 1: PRIMARY ZERO-FRICTION CALL TO ACTION -> COMPARTILHAR NO INSTAGRAM */}
        <button
          type="button"
          onClick={handleShareToInstagram}
          disabled={isSharing}
          className="btn-instagram-share"
          aria-label="Compartilhar nos Stories do Instagram"
          style={{
            width: '100%',
            padding: '10px 16px',
            background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
            border: '1.5px solid rgba(255, 255, 255, 0.4)',
            borderRadius: '7px',
            color: '#ffffff',
            fontFamily: 'var(--font-vcr)',
            fontSize: 'clamp(0.85rem, 2.5cqw, 0.96rem)',
            letterSpacing: '1px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            cursor: isSharing ? 'not-allowed' : 'pointer',
            boxShadow: '0 3px 12px rgba(220, 39, 67, 0.4), 0 2px 0 #7e0c3b',
            textTransform: 'uppercase',
            fontWeight: 800,
            transition: 'all 0.15s ease',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {isSharing ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              <span>PREPARANDO STORY 1080×1920...</span>
            </>
          ) : (
            <>
              <InstagramIcon size={18} />
              <span>POSTAR NO INSTAGRAM STORIES</span>
            </>
          )}
        </button>

        {/* ROW 2: SECONDARY ACTIONS -> BAIXAR PNG, ARQUIVAR TODAS (.ZIP), COPIAR LINK */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '5px',
            width: '100%',
          }}
        >
          {/* Download Single PNG */}
          <button
            type="button"
            onClick={handleDownloadSingle}
            disabled={isDownloadingSingle}
            className="btn-vcr-secondary"
            title="Baixar imagem individual deste Story em 1080x1920"
            style={{
              padding: '6px 10px',
              background: 'linear-gradient(180deg, #22222a 0%, #15151c 100%)',
              border: '1.2px solid rgba(255, 255, 255, 0.25)',
              borderRadius: '5px',
              color: '#f0f0f5',
              fontFamily: 'var(--font-vcr)',
              fontSize: '0.78rem',
              letterSpacing: '0.6px',
              flex: '1 1 100px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '5px',
              cursor: isDownloadingSingle ? 'not-allowed' : 'pointer',
              boxShadow: '0 2px 5px rgba(0,0,0,0.5)',
              textTransform: 'uppercase',
              transition: 'all 0.1s ease',
            }}
          >
            {isDownloadingSingle ? (
              <Loader2 size={12} className="animate-spin" />
            ) : (
              <Download size={12} />
            )}
            <span>BAIXAR PNG</span>
          </button>

          {/* Download All as ZIP */}
          <button
            type="button"
            onClick={handleExportZip}
            disabled={isExportingZip}
            className="btn-vcr-secondary"
            title="Baixar todos os 9 Stories em alta resolução em arquivo ZIP"
            style={{
              padding: '6px 10px',
              background: 'linear-gradient(180deg, #001f5c 0%, #00133d 100%)',
              border: '1.2px solid #00e5ff',
              borderRadius: '5px',
              color: '#00e5ff',
              fontFamily: 'var(--font-vcr)',
              fontSize: '0.78rem',
              letterSpacing: '0.6px',
              flex: '1 1 100px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '5px',
              cursor: isExportingZip ? 'not-allowed' : 'pointer',
              boxShadow: '0 2px 5px rgba(0,0,0,0.5)',
              textTransform: 'uppercase',
              transition: 'all 0.1s ease',
            }}
          >
            {isExportingZip ? (
              <Loader2 size={12} className="animate-spin" />
            ) : (
              <Archive size={12} />
            )}
            <span>TODAS (.ZIP)</span>
          </button>

          {/* Copy Link */}
          <button
            type="button"
            onClick={handleShareLink}
            className="btn-vcr-secondary"
            title="Copiar link deste Universário"
            style={{
              padding: '6px 10px',
              background: 'linear-gradient(180deg, #332800 0%, #1f1800 100%)',
              border: '1.2px solid #ffd700',
              borderRadius: '5px',
              color: '#ffd700',
              fontFamily: 'var(--font-vcr)',
              fontSize: '0.78rem',
              letterSpacing: '0.6px',
              flex: '1 1 95px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '5px',
              cursor: 'pointer',
              boxShadow: '0 2px 5px rgba(0,0,0,0.5)',
              textTransform: 'uppercase',
              transition: 'all 0.1s ease',
            }}
          >
            {isCopied ? (
              <>
                <Check size={12} style={{ color: '#00ff88' }} />
                <span style={{ color: '#00ff88' }}>COPIADO!</span>
              </>
            ) : (
              <>
                <Sparkles size={12} />
                <span>LINK</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* MOBILE INSTAGRAM STORY PREVIEW & EXPORT MODAL (Fallback when native Web Share is unavailable) */}
      {previewDataUrl && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Exportar Story para Instagram"
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.88)',
            backdropFilter: 'blur(8px)',
            zIndex: 99999,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px',
            boxSizing: 'border-box',
          }}
          onClick={() => setPreviewDataUrl(null)}
        >
          <div
            style={{
              background: '#12131a',
              border: '2px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '14px',
              padding: '14px',
              maxWidth: '360px',
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '12px',
              boxShadow: '0 12px 35px rgba(0, 0, 0, 0.8)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <InstagramIcon size={20} />
                <span
                  style={{
                    fontFamily: 'var(--font-vcr)',
                    fontSize: '0.95rem',
                    color: '#ffffff',
                    fontWeight: 900,
                  }}
                >
                  STORY 1080×1920 GERADO!
                </span>
              </div>
              <button
                type="button"
                onClick={() => setPreviewDataUrl(null)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#9999aa',
                  cursor: 'pointer',
                  padding: '4px',
                }}
                aria-label="Fechar"
              >
                <X size={18} />
              </button>
            </div>

            {/* Rendered Story Image Preview */}
            <div
              style={{
                width: '180px',
                aspectRatio: '9 / 16',
                borderRadius: '8px',
                overflow: 'hidden',
                border: '1.5px solid rgba(255, 255, 255, 0.3)',
                boxShadow: '0 4px 15px rgba(0,0,0,0.6)',
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={previewDataUrl}
                alt="Story formatado para Instagram"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </div>

            {/* Mobile Instructions Card */}
            <div
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '8px',
                padding: '10px',
                width: '100%',
                fontSize: '0.8rem',
                color: '#d0d0e0',
                lineHeight: 1.4,
                fontFamily: 'sans-serif',
                textAlign: 'center',
              }}
            >
              📱 <strong>Dica no celular:</strong> Toque e segure na imagem acima para <strong>Salvar em Fotos</strong>, depois abra o Instagram para postar nos Stories!
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '8px', width: '100%' }}>
              <button
                type="button"
                onClick={handleOpenInstagramApp}
                style={{
                  flex: 1,
                  padding: '10px',
                  background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
                  border: 'none',
                  borderRadius: '7px',
                  color: '#ffffff',
                  fontWeight: 800,
                  fontSize: '0.82rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-vcr)',
                }}
              >
                <ExternalLink size={14} />
                <span>ABRIR INSTAGRAM</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  downloadDataUrl(previewDataUrl, `universario-story-${formattedDate.replace(/[^a-zA-Z0-9]/g, '_')}.png`);
                }}
                style={{
                  padding: '10px 14px',
                  background: '#22222c',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '7px',
                  color: '#ffffff',
                  fontWeight: 700,
                  fontSize: '0.82rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-vcr)',
                }}
              >
                <Download size={14} />
                <span>BAIXAR</span>
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .btn-instagram-share:hover:not(:disabled) {
          transform: translateY(-1px);
          filter: brightness(1.08);
          box-shadow: 0 4px 16px rgba(220, 39, 67, 0.6), 0 2px 0 #7e0c3b;
        }
        .btn-instagram-share:active:not(:disabled) {
          transform: translateY(2px);
          box-shadow: 0 1px 4px rgba(220, 39, 67, 0.4), 0 1px 0 #7e0c3b;
        }
        .btn-vcr-secondary:hover:not(:disabled) {
          transform: translateY(-1px);
          filter: brightness(1.15);
        }
        .btn-vcr-secondary:active:not(:disabled) {
          transform: translateY(1px);
        }
      `}</style>
    </>
  );
}
