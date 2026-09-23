'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Camera, RefreshCw, Upload, SkipForward, Check, Sparkles, AlertCircle } from 'lucide-react';
import { DymoLabel, VhsGoldSeal } from './VhsGraphics';

interface PhotoCaptureScreenProps {
  userName?: string;
  onPhotoConfirmed: (photoDataUrl: string) => void;
  onSkip: () => void;
}

// Anatomical Head + Ears contour centered in a 512x512 coordinate box
export const HEAD_AND_EARS_PATH_D =
  'M 256 86 C 335 86, 376 135, 376 195 C 376 205, 395 205, 412 220 C 424 230, 424 260, 412 272 C 398 286, 376 286, 372 286 C 365 345, 325 412, 275 424 C 265 426, 256 426, 256 426 C 256 426, 247 426, 237 424 C 187 412, 147 345, 140 286 C 136 286, 114 286, 100 272 C 88 260, 88 230, 100 220 C 117 205, 136 205, 136 195 C 136 135, 177 86, 256 86 Z';

// Instantly cut out head + ears from 512x512 canvas and tightly crop
function extractHeadCutout(sourceCanvas: HTMLCanvasElement): string {
  const clipCanvas = document.createElement('canvas');
  clipCanvas.width = 512;
  clipCanvas.height = 512;
  const ctx = clipCanvas.getContext('2d');
  if (!ctx) return '';

  try {
    const path = new Path2D(HEAD_AND_EARS_PATH_D);
    ctx.save();
    ctx.clip(path);
    ctx.drawImage(sourceCanvas, 0, 0, 512, 512);
    ctx.restore();
  } catch {
    ctx.save();
    ctx.beginPath();
    ctx.ellipse(256, 256, 160, 170, 0, 0, Math.PI * 2);
    ctx.closePath();
    ctx.clip();
    ctx.drawImage(sourceCanvas, 0, 0, 512, 512);
    ctx.restore();
  }

  const cropCanvas = document.createElement('canvas');
  cropCanvas.width = 330;
  cropCanvas.height = 340;
  const cropCtx = cropCanvas.getContext('2d');
  if (!cropCtx) return clipCanvas.toDataURL('image/png');

  cropCtx.drawImage(
    clipCanvas,
    91, 86, 330, 340,
    0, 0, 330, 340
  );

  return cropCanvas.toDataURL('image/png');
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

      // iOS WebKit flexible constraints
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'user',
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      });

      setStream(mediaStream);
      setIsCameraActive(true);
    } catch (err: unknown) {
      console.warn('Câmera indisponível ou permissão negada:', err);
      const msg = err instanceof Error ? err.message : 'Permissão para usar a câmera foi negada.';
      setCameraError(msg);
      setIsCameraActive(false);
    }
  }, []);

  // Safely attach stream to video element and handle iOS Safari autoplay
  useEffect(() => {
    const video = videoRef.current;
    if (video && stream) {
      video.srcObject = stream;
      video.setAttribute('playsinline', 'true');
      video.setAttribute('webkit-playsinline', 'true');
      video.muted = true;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn('iOS video.play() notice:', err);
        });
      }
    }
  }, [stream]);

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



  // Handle capture from live video stream
  const handleCapture = () => {
    if (!videoRef.current) return;

    setIsFlashActive(true);
    setTimeout(() => setIsFlashActive(false), 200);

    const video = videoRef.current;
    const videoWidth = video.videoWidth;
    const videoHeight = video.videoHeight;

    if (!videoWidth || !videoHeight) {
      console.warn('Vídeo ainda não pronto para captura');
      return;
    }

    const size = Math.min(videoWidth, videoHeight);
    const startX = (videoWidth - size) / 2;
    const startY = (videoHeight - size) / 2;

    // First render square video
    const squareCanvas = document.createElement('canvas');
    squareCanvas.width = 512;
    squareCanvas.height = 512;
    const sCtx = squareCanvas.getContext('2d');
    if (!sCtx) return;

    // Flip horizontally for natural selfie reflection
    sCtx.translate(squareCanvas.width, 0);
    sCtx.scale(-1, 1);
    sCtx.drawImage(video, startX, startY, size, size, 0, 0, 512, 512);

    stopCamera();

    const dataUrl = extractHeadCutout(squareCanvas);
    setCapturedPhoto(dataUrl);
  };

  // Handle file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    stopCamera();

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const size = Math.min(img.width, img.height);
        const startX = (img.width - size) / 2;
        const startY = (img.height - size) / 2;

        const squareCanvas = document.createElement('canvas');
        squareCanvas.width = 512;
        squareCanvas.height = 512;
        const sCtx = squareCanvas.getContext('2d');
        if (!sCtx) return;

        sCtx.drawImage(img, startX, startY, size, size, 0, 0, 512, 512);

        const dataUrl = extractHeadCutout(squareCanvas);
        setCapturedPhoto(dataUrl);
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
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
          Enquadre sua cabeça e orelhas na área demarcada para estampar as caricaturas!
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

        {/* Live Video Stream Element (Always in DOM for reliable iOS WebKit stream binding) */}
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          onLoadedMetadata={(e) => {
            const target = e.target as HTMLVideoElement;
            target.play().catch(() => {});
          }}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transform: 'scaleX(-1)', // Mirror effect
            display: !capturedPhoto && isCameraActive ? 'block' : 'none',
          }}
        />

        {/* State A: Head + Ears Silhouette Guide when camera is active */}
        {!capturedPhoto && isCameraActive && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              pointerEvents: 'none',
              zIndex: 10,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg
              viewBox="0 0 512 512"
              style={{
                width: '100%',
                height: '100%',
                display: 'block',
              }}
            >
              <defs>
                {/* Mask: black cutout hole reveals the live camera, white surrounds with dark vignette */}
                <mask id="headEarsViewfinderMask">
                  <rect x="0" y="0" width="512" height="512" fill="white" />
                  <path d={HEAD_AND_EARS_PATH_D} fill="black" />
                </mask>
              </defs>

              {/* Translucent vignette darkening everything outside the head+ears area */}
              <rect
                x="0"
                y="0"
                width="512"
                height="512"
                fill="rgba(0, 0, 0, 0.45)"
                mask="url(#headEarsViewfinderMask)"
              />

              {/* Neon Dashed Contour for Head + Ears */}
              <path
                d={HEAD_AND_EARS_PATH_D}
                fill="none"
                stroke="#ffe600"
                strokeWidth="3.5"
                strokeDasharray="9 7"
                style={{
                  filter: 'drop-shadow(0 0 8px rgba(255, 230, 0, 0.8))',
                }}
              />

              {/* Visual guidance labels */}
              <text
                x="256"
                y="65"
                textAnchor="middle"
                fill="#ffe600"
                fontFamily="var(--font-vcr)"
                fontSize="18"
                letterSpacing="1.5"
                fontWeight="900"
                style={{
                  filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.9))',
                }}
              >
                ▲ CABEÇA ▲
              </text>

              <text
                x="256"
                y="455"
                textAnchor="middle"
                fill="#ffe600"
                fontFamily="var(--font-vcr)"
                fontSize="18"
                letterSpacing="1.5"
                fontWeight="900"
                style={{
                  filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.9))',
                }}
              >
                ▼ QUEIXO ▼
              </text>
            </svg>

            {/* Central OSD Badge */}
            <div
              style={{
                position: 'absolute',
                top: '47%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                fontFamily: 'var(--font-vcr)',
                fontSize: '0.68rem',
                color: '#ffe600',
                letterSpacing: '1px',
                textAlign: 'center',
                background: 'rgba(0,0,0,0.7)',
                border: '1px solid rgba(255, 230, 0, 0.4)',
                padding: '3px 10px',
                borderRadius: '4px',
                pointerEvents: 'none',
              }}
            >
              ENQUADRE CABEÇA E ORELHAS
            </div>
          </div>
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
              alt="Sua cabeça recortada"
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
              cursor: 'pointer',
            }}
          >
            <Camera size={20} />
            <span>
              {isCameraActive ? 'CAPTURAR FOTO 📸' : 'ESCOLHER DA GALERIA 📁'}
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
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
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
          onClick={onSkip}
          style={{
            width: '100%',
            padding: '8px 14px',
            background: 'transparent',
            color: '#8b949e',
            border: 'none',
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: '0.76rem',
            cursor: 'pointer',
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
