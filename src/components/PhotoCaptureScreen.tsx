'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Camera, RefreshCw, Upload, SkipForward, Check, Sparkles, AlertCircle } from 'lucide-react';
import { DymoLabel, VhsGoldSeal } from './VhsGraphics';

interface PhotoCaptureScreenProps {
  userName?: string;
  onPhotoConfirmed: (photoDataUrl: string) => void;
  onSkip: () => void;
}

export default function PhotoCaptureScreen({
  userName,
  onPhotoConfirmed,
  onSkip,
}: PhotoCaptureScreenProps) {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [isCameraActive, setIsCameraActive] = useState<boolean>(false);
  const [isFlashActive, setIsFlashActive] = useState<boolean>(false);
  const [isProcessingBg, setIsProcessingBg] = useState<boolean>(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Initialize Webcam
  const startCamera = useCallback(async () => {
    setCameraError(null);
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Seu navegador não suporta acesso à câmera.');
      }

      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'user',
          width: { ideal: 720 },
          height: { ideal: 720 },
        },
        audio: false,
      });

      setStream(mediaStream);
      setIsCameraActive(true);

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err: unknown) {
      console.warn('Câmera indisponível ou permissão negada:', err);
      const msg = err instanceof Error ? err.message : 'Permissão para usar a câmera foi negada.';
      setCameraError(msg);
      setIsCameraActive(false);
    }
  }, []);

  // Stop camera tracks cleanly
  const stopCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
    setIsCameraActive(false);
  }, [stream]);

  useEffect(() => {
    startCamera();
    return () => {
      stopCamera();
    };
  }, []);

  // Process image: remove background with @imgly/background-removal, fallback to borderless oval mask
  const processImageCutout = async (blob: Blob) => {
    setIsProcessingBg(true);
    try {
      // Dynamic import ensures client-side WebAssembly execution with 0 SSR issues
      const { removeBackground } = await import('@imgly/background-removal');
      const cutoutBlob = await removeBackground(blob);
      const reader = new FileReader();
      reader.onloadend = () => {
        setCapturedPhoto(reader.result as string);
        setIsProcessingBg(false);
      };
      reader.readAsDataURL(cutoutBlob);
    } catch (err) {
      console.warn('Fallback to canvas cutout without frame:', err);
      const img = new Image();
      img.onload = () => {
        const size = Math.min(img.width, img.height);
        const startX = (img.width - size) / 2;
        const startY = (img.height - size) / 2;

        const canvas = document.createElement('canvas');
        canvas.width = 400;
        canvas.height = 400;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          setIsProcessingBg(false);
          return;
        }

        // Clean oval mask without any frame/border
        ctx.save();
        ctx.beginPath();
        ctx.ellipse(200, 200, 160, 185, 0, 0, Math.PI * 2);
        ctx.closePath();
        ctx.clip();
        ctx.drawImage(img, startX, startY, size, size, 0, 0, 400, 400);
        ctx.restore();

        const dataUrl = canvas.toDataURL('image/png');
        setCapturedPhoto(dataUrl);
        setIsProcessingBg(false);
      };
      img.src = URL.createObjectURL(blob);
    }
  };

  // Handle capture from live video stream
  const handleCapture = () => {
    if (!videoRef.current) return;

    setIsFlashActive(true);
    setTimeout(() => setIsFlashActive(false), 200);

    const video = videoRef.current;
    const videoWidth = video.videoWidth || 640;
    const videoHeight = video.videoHeight || 640;

    const size = Math.min(videoWidth, videoHeight);
    const startX = (videoWidth - size) / 2;
    const startY = (videoHeight - size) / 2;

    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Flip horizontally for natural selfie reflection
    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(video, startX, startY, size, size, 0, 0, 512, 512);

    stopCamera();

    canvas.toBlob((blob) => {
      if (blob) {
        processImageCutout(blob);
      }
    }, 'image/png');
  };

  // Handle file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    stopCamera();
    processImageCutout(file);
  };

  const handleRetake = () => {
    setCapturedPhoto(null);
    startCamera();
  };

  const handleConfirm = () => {
    if (capturedPhoto) {
      onPhotoConfirmed(capturedPhoto);
    }
  };

  return (
    <div
      style={{
        width: '100%',
        maxWidth: '520px',
        margin: '0 auto',
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
        zIndex: 10,
      }}
    >
      {/* 80s Photobooth Cassette Header */}
      <div style={{ textAlign: 'center', marginBottom: '14px' }}>
        <DymoLabel text="CABINE DE FOTO RETRÔ 1980s" color="red" />
        <h2
          style={{
            fontFamily: "'Archivo Black', sans-serif",
            fontSize: 'clamp(1.2rem, 4vw, 1.6rem)',
            color: '#ffffff',
            marginTop: '6px',
            lineHeight: 1.15,
            textShadow: '0 2px 8px rgba(0,0,0,0.9), 0 0 14px rgba(255, 230, 0, 0.4)',
            textTransform: 'uppercase',
          }}
        >
          {userName ? `SORRIA, ${userName.toUpperCase()}!` : 'SORRIA PARA A FOTO!'}
        </h2>
        <p
          style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: 'clamp(0.72rem, 2.2vw, 0.82rem)',
            color: 'var(--vhs-cyan)',
            marginTop: '4px',
            lineHeight: 1.3,
          }}
        >
          Enquadre seu rosto para estampar as caricaturas dos seus Stories!
        </p>
      </div>

      {/* Camera Viewport Container with 80s CRT Frame */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '360px',
          aspectRatio: '1 / 1',
          borderRadius: '16px',
          overflow: 'hidden',
          backgroundColor: '#0a0c12',
          border: '3px solid #ffe600',
          boxShadow: '0 12px 32px rgba(0,0,0,0.9), 0 0 24px rgba(255, 230, 0, 0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Flash Effect on shutter */}
        {isFlashActive && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundColor: '#ffffff',
              zIndex: 30,
            }}
          />
        )}

        {/* Live OSD Overlay */}
        <div
          style={{
            position: 'absolute',
            top: '10px',
            left: '12px',
            right: '12px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            zIndex: 15,
            pointerEvents: 'none',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-vcr)',
              fontSize: '0.76rem',
              color: isCameraActive ? '#ff3b30' : '#888888',
              fontWeight: 900,
              textShadow: '0 0 6px rgba(255, 59, 48, 0.8)',
            }}
          >
            {isCameraActive ? 'REC ● LIVE' : 'PHOTO MODE'}
          </span>
          <span
            style={{
              fontFamily: 'var(--font-vcr)',
              fontSize: '0.72rem',
              color: 'var(--vhs-green-osd)',
              fontWeight: 700,
            }}
          >
            SP 0:00:25
          </span>
        </div>

        {/* State A: Live Video Stream */}
        {!capturedPhoto && isCameraActive && (
          <>
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transform: 'scaleX(-1)', // Mirror effect
              }}
            />

            {/* Oval Face Guide Contour */}
            <div
              style={{
                position: 'absolute',
                width: '68%',
                height: '80%',
                borderRadius: '50%',
                border: '2.5px dashed rgba(255, 230, 0, 0.85)',
                boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.38)',
                zIndex: 10,
                pointerEvents: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-vcr)',
                  fontSize: '0.64rem',
                  color: '#ffe600',
                  letterSpacing: '1px',
                  textAlign: 'center',
                  background: 'rgba(0,0,0,0.6)',
                  padding: '2px 8px',
                  borderRadius: '4px',
                  marginBottom: '10px',
                }}
              >
                ENQUADRE SEU ROSTO
              </div>
            </div>
          </>
        )}

        {/* State B: Captured Photo Preview */}
        {capturedPhoto && (
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'radial-gradient(circle, #1c2030 0%, #0c0e14 100%)',
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={capturedPhoto}
              alt="Seu rosto recortado"
              style={{
                width: '74%',
                height: '74%',
                objectFit: 'contain',
                filter: 'drop-shadow(0 6px 20px rgba(0,0,0,0.85))',
              }}
            />
          </div>
        )}

        {/* State C: Camera Error or Permission Denied */}
        {!capturedPhoto && !isCameraActive && cameraError && (
          <div
            style={{
              padding: '24px',
              textAlign: 'center',
              color: '#ffffff',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <AlertCircle size={36} color="#ff3b30" />
            <p style={{ fontFamily: 'var(--font-heading)', fontSize: '0.90rem', color: '#ff8888' }}>
              CÂMERA NÃO DETECTADA OU PERMISSÃO RECUSADA
            </p>
            <p style={{ fontSize: '0.74rem', color: '#94a3b8', lineHeight: 1.3 }}>
              Você pode enviar uma foto diretamente da galeria do seu celular/computador abaixo.
            </p>
          </div>
        )}

        {/* State D: AI Background Removal Processing Overlay */}
        {isProcessingBg && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundColor: 'rgba(10, 12, 18, 0.94)',
              zIndex: 35,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                width: '38px',
                height: '38px',
                border: '3px solid rgba(0, 255, 136, 0.2)',
                borderTopColor: '#00ff88',
                borderRadius: '50%',
                animation: 'spin 0.8s linear infinite',
                marginBottom: '14px',
              }}
            />
            <div
              style={{
                fontFamily: 'var(--font-vcr)',
                fontSize: '0.92rem',
                color: '#00ff88',
                letterSpacing: '1px',
                fontWeight: 700,
                textShadow: '0 0 8px rgba(0, 255, 136, 0.6)',
              }}
            >
              RECORTANDO FUNDO COM IA...
            </div>
            <div
              style={{
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: '0.74rem',
                color: '#94a3b8',
                marginTop: '6px',
              }}
            >
              Isolando o rosto para encaixar perfeitamente na caricatura sem moldura
            </div>
          </div>
        )}
      </div>

      {/* Hidden File Input for Gallery Upload */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileUpload}
        style={{ display: 'none' }}
      />

      {/* Interactive Controls Bar */}
      <div
        style={{
          width: '100%',
          maxWidth: '360px',
          marginTop: '16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
        }}
      >
        {/* Action 1: Shutter / Confirm */}
        {!capturedPhoto ? (
          <button
            type="button"
            disabled={isProcessingBg}
            onClick={isCameraActive ? handleCapture : () => fileInputRef.current?.click()}
            className="btn-vhs-regenerate"
            style={{
              width: '100%',
              padding: '12px 18px',
              fontSize: '1.05rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              opacity: isProcessingBg ? 0.5 : 1,
              cursor: isProcessingBg ? 'not-allowed' : 'pointer',
            }}
          >
            <Camera size={20} />
            <span>
              {isProcessingBg
                ? 'RECORTANDO FUNDO...'
                : isCameraActive
                ? 'CAPTURAR ROSTO 📸'
                : 'ESCOLHER FOTO 📁'}
            </span>
          </button>
        ) : (
          <div style={{ display: 'flex', gap: '8px', width: '100%' }}>
            <button
              type="button"
              onClick={handleRetake}
              style={{
                flex: 1,
                padding: '10px 14px',
                background: '#222533',
                color: '#ffffff',
                border: '1.5px solid #4a4e69',
                borderRadius: '6px',
                fontFamily: 'var(--font-vcr)',
                fontSize: '0.86rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
              }}
            >
              <RefreshCw size={15} />
              <span>OUTRA FOTO</span>
            </button>

            <button
              type="button"
              onClick={handleConfirm}
              className="btn-vhs-regenerate"
              style={{
                flex: 1.5,
                padding: '10px 14px',
                fontSize: '0.94rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
              }}
            >
              <Check size={18} />
              <span>USAR ESTA FOTO</span>
            </button>
          </div>
        )}

        {/* Action 2: Gallery Upload Button */}
        {!capturedPhoto && isCameraActive && (
          <button
            type="button"
            disabled={isProcessingBg}
            onClick={() => fileInputRef.current?.click()}
            style={{
              width: '100%',
              padding: '8px 14px',
              background: 'rgba(255, 255, 255, 0.06)',
              color: '#e2e8f0',
              border: '1px solid rgba(255, 255, 255, 0.16)',
              borderRadius: '6px',
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: '0.78rem',
              cursor: isProcessingBg ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              opacity: isProcessingBg ? 0.4 : 1,
              transition: 'background 0.15s ease',
            }}
          >
            <Upload size={14} color="var(--vhs-cyan)" />
            <span>OU ENVIE UMA FOTO DA GALERIA</span>
          </button>
        )}

        {/* Action 3: Skip Photo Button */}
        <button
          type="button"
          disabled={isProcessingBg}
          onClick={onSkip}
          style={{
            width: '100%',
            padding: '8px 14px',
            background: 'transparent',
            color: isProcessingBg ? '#444' : '#8b949e',
            border: 'none',
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: '0.76rem',
            cursor: isProcessingBg ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            marginTop: '2px',
            textDecoration: 'underline',
          }}
        >
          <SkipForward size={13} />
          <span>Pular foto (usar caricatura cartoon 3D)</span>
        </button>
      </div>
    </div>
  );
}
