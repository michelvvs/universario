'use client';

import React, { useState } from 'react';
import { Calendar, User, History, ArrowRight, Play, RotateCcw, Sparkles } from 'lucide-react';
import { VcrOsdBadge, VhsTapeWindow, DymoLabel, SharpieLabel, ScotchTape } from './VhsGraphics';

interface DateInputFormProps {
  onSubmit: (date: string, name?: string) => void;
  isLoading: boolean;
}

const PRESET_DATES = [
  { label: '📼 25/05/1989 (Teste 80s)', date: '1989-05-25', name: 'Michel' },
  { label: '🚀 Pouso na Lua (1969)', date: '1969-07-20', name: 'Neil Armstrong' },
  { label: '🏆 Tetra do Brasil (1994)', date: '1994-07-17', name: 'Geração 94' },
  { label: '🚢 Titanic (1997)', date: '1997-12-19', name: 'Jack & Rose' },
  { label: '🌟 Virada 2000', date: '2000-01-01', name: 'Millennium' },
  { label: '⭐ Penta Brasil (2002)', date: '2002-06-30', name: 'Penta 2002' },
];

export default function DateInputForm({ onSubmit, isLoading }: DateInputFormProps) {
  const [date, setDate] = useState<string>('1989-05-25');
  const [name, setName] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!date) return;
    onSubmit(date, name);
  };

  const handlePreset = (presetDate: string, presetName: string) => {
    setDate(presetDate);
    setName(presetName);
    onSubmit(presetDate, presetName);
  };

  return (
    <div style={{ width: '100%', maxWidth: '540px', margin: '0 auto', position: 'relative' }}>
      {/* Scotch Tape on corners */}
      <ScotchTape angle={-12} width={56} style={{ top: '-10px', left: '16px' }} />
      <ScotchTape angle={14} width={56} style={{ top: '-10px', right: '16px' }} />

      {/* Main 80s VCR Chassis Deck */}
      <div
        style={{
          background: 'linear-gradient(180deg, #181b22 0%, #0d1016 100%)',
          border: '3px solid #333d52',
          borderRadius: '14px',
          padding: 'clamp(20px, 4.5vw, 28px) clamp(16px, 3.5vw, 24px)',
          boxShadow: '0 20px 50px rgba(0,0,0,0.9), inset 0 1px 0 rgba(255,255,255,0.15)',
          position: 'relative',
        }}
      >
        {/* VCR Header OSD Row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <VcrOsdBadge text="VCR DECK • STANDBY" variant="tracking" />
          <div style={{ display: 'flex', gap: '6px' }}>
            <DymoLabel text="TAPE E-180" color="red" />
            <DymoLabel text="HI-FI STEREO" color="blue" />
          </div>
        </div>

        {/* Cassette Insertion Well with Rotating Spools */}
        <div
          style={{
            background: '#090b10',
            border: '2px solid #232733',
            borderRadius: '8px',
            padding: '12px 14px',
            marginBottom: '20px',
            boxShadow: 'inset 0 4px 16px rgba(0,0,0,0.95)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span
              style={{
                fontFamily: 'var(--font-vcr)',
                fontSize: '0.82rem',
                color: '#00ff88',
                letterSpacing: '1.5px',
              }}
            >
              CASSETTE INSERTION WELL
            </span>
            <span
              style={{
                fontFamily: 'var(--font-vcr)',
                fontSize: '0.78rem',
                color: '#ffe600',
                letterSpacing: '1px',
              }}
            >
              AUTO TRACKING LOCK
            </span>
          </div>

          <VhsTapeWindow label="UNIVERSÁRIO MASTER" timecode="00:25:89" spinning={isLoading} />
        </div>

        {/* Title Header */}
        <div style={{ textAlign: 'center', marginBottom: '22px' }}>
          <h1
            style={{
              fontSize: 'clamp(2.1rem, 6vw, 2.75rem)',
              fontFamily: 'var(--font-heading)',
              lineHeight: 1.05,
              marginBottom: '6px',
              color: '#ffffff',
              letterSpacing: '1.5px',
              textShadow: '0 0 16px rgba(0, 229, 255, 0.4), 0 3px 10px rgba(0,0,0,0.95)',
              textTransform: 'uppercase',
            }}
          >
            UNIVERSÁRIO
          </h1>

          <p
            style={{
              color: '#00ff88',
              fontSize: '0.94rem',
              lineHeight: 1.3,
              fontFamily: 'var(--font-vcr)',
              letterSpacing: '1px',
            }}
          >
            ► INSIRA SUA DATA PARA REBOBINAR O TEMPO EM STORIES 9:16
          </p>
        </div>

        {/* Form Controls */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Date Input */}
          <div>
            <label
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.88rem',
                color: '#d0d6e2',
                fontFamily: 'var(--font-vcr)',
                letterSpacing: '1.2px',
                marginBottom: '6px',
              }}
            >
              <Calendar size={15} color="#ffe600" />
              <span>DATA DE NASCIMENTO (DD/MM/AAAA) *</span>
            </label>
            <input
              type="date"
              required
              max={new Date().toISOString().split('T')[0]}
              min="1920-01-01"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 16px',
                background: '#07090e',
                border: '2px solid #3d465c',
                borderRadius: '6px',
                color: '#00ff88',
                fontFamily: 'var(--font-vcr)',
                fontSize: '1.3rem',
                letterSpacing: '2px',
                outline: 'none',
                boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.95)',
                cursor: 'pointer',
              }}
            />
          </div>

          {/* Name Input */}
          <div>
            <label
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.88rem',
                color: '#d0d6e2',
                fontFamily: 'var(--font-vcr)',
                letterSpacing: '1.2px',
                marginBottom: '6px',
              }}
            >
              <User size={15} color="#00e5ff" />
              <span>NOME / APELIDO (OPCIONAL)</span>
            </label>
            <input
              type="text"
              placeholder="Ex: Michel, Juliana, Alex..."
              maxLength={30}
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 16px',
                background: '#07090e',
                border: '2px solid #3d465c',
                borderRadius: '6px',
                color: '#ffffff',
                fontFamily: 'var(--font-vcr)',
                fontSize: '1.15rem',
                letterSpacing: '1px',
                outline: 'none',
                boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.95)',
              }}
            />
          </div>

          {/* Authentic Tactile VCR Keycap CTA Button */}
          <button
            type="submit"
            disabled={isLoading || !date}
            className="btn-vcr-keycap"
            style={{
              width: '100%',
              marginTop: '6px',
              padding: '16px 20px',
              background: 'linear-gradient(180deg, #d81414 0%, #a00d0d 60%, #750808 100%)',
              border: '2px solid #ff6666',
              borderRadius: '8px',
              color: '#ffffff',
              fontFamily: 'var(--font-vcr)',
              fontSize: '1.35rem',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              boxShadow: '0 6px 0 #4a0505, 0 12px 24px rgba(0,0,0,0.9), inset 0 2px 0 rgba(255,255,255,0.4)',
              opacity: isLoading ? 0.7 : 1,
              transition: 'transform 0.1s ease, box-shadow 0.1s ease',
            }}
          >
            <RotateCcw size={20} className={isLoading ? 'animate-spin' : ''} />
            <span>{isLoading ? 'CALIBRANDO FITA...' : 'REW ◄◄ REBOBINAR & INICIAR STORIES ▶'}</span>
          </button>
        </form>

        {/* Preset Tape Selections */}
        <div style={{ marginTop: '24px', borderTop: '1px dashed #282e3d', paddingTop: '16px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              color: '#ffe600',
              fontFamily: 'var(--font-vcr)',
              fontSize: '0.88rem',
              letterSpacing: '1.2px',
              marginBottom: '10px',
            }}
          >
            <History size={15} color="#ffe600" />
            <span>[OK] SELECIONE UMA FITA HISTÓRICA DO ARQUIVO:</span>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {PRESET_DATES.map((preset) => (
              <button
                key={preset.date}
                type="button"
                onClick={() => handlePreset(preset.date, preset.name)}
                style={{
                  background: '#12161f',
                  border: '1.5px solid #2f384c',
                  borderRadius: '4px',
                  padding: '6px 12px',
                  fontSize: '0.86rem',
                  fontFamily: 'var(--font-vcr)',
                  letterSpacing: '0.5px',
                  color: '#d0d8e8',
                  cursor: 'pointer',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.05)',
                  transition: 'all 0.15s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#00ff88';
                  e.currentTarget.style.color = '#00ff88';
                  e.currentTarget.style.background = '#1a2230';
                  e.currentTarget.style.boxShadow = '0 0 10px rgba(0, 255, 136, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#2f384c';
                  e.currentTarget.style.color = '#d0d8e8';
                  e.currentTarget.style.background = '#12161f';
                  e.currentTarget.style.boxShadow = '0 2px 6px rgba(0,0,0,0.6)';
                }}
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .btn-vcr-keycap:hover:not(:disabled) {
          transform: translateY(2px);
          box-shadow: 0 4px 0 #4a0505, 0 8px 18px rgba(0, 0, 0, 0.9), inset 0 2px 0 rgba(255, 255, 255, 0.4);
        }

        .btn-vcr-keycap:active:not(:disabled) {
          transform: translateY(5px);
          box-shadow: 0 1px 0 #4a0505, 0 2px 8px rgba(0, 0, 0, 0.9), inset 0 2px 0 rgba(255, 255, 255, 0.4);
        }
      `}</style>
    </div>
  );
}
