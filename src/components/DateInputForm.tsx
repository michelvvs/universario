'use client';

import React, { useState } from 'react';
import { Calendar, User, History, ArrowRight, Play, RotateCcw, Sparkles } from 'lucide-react';
import { VcrOsdBadge, VhsTapeWindow, DymoLabel, SharpieLabel, ScotchTape } from './VhsGraphics';

interface DateInputFormProps {
  onSubmit: (date: string, name?: string, gender?: 'masculino' | 'feminino' | 'neutro') => void;
  isLoading: boolean;
}

const PRESET_DATES = [
  { label: '📼 25/05/1989 (Teste 80s)', date: '1989-05-25', name: 'Michel', gender: 'masculino' as const },
  { label: '🚀 Pouso na Lua (1969)', date: '1969-07-20', name: 'Neil Armstrong', gender: 'masculino' as const },
  { label: '🏆 Tetra do Brasil (1994)', date: '1994-07-17', name: 'Geração 94', gender: 'neutro' as const },
  { label: '🚢 Titanic (1997)', date: '1997-12-19', name: 'Rose DeWitt', gender: 'feminino' as const },
  { label: '🌟 Virada 2000', date: '2000-01-01', name: 'Millennium', gender: 'neutro' as const },
  { label: '⭐ Penta Brasil (2002)', date: '2002-06-30', name: 'Penta 2002', gender: 'neutro' as const },
];

// Helper functions for numeric date input
function formatToDisplayDate(isoDate: string): string {
  if (!isoDate || !/^\d{4}-\d{2}-\d{2}$/.test(isoDate)) return '';
  const [yyyy, mm, dd] = isoDate.split('-');
  return `${dd}/${mm}/${yyyy}`;
}

function parseDisplayToIso(display: string): string | null {
  const clean = display.replace(/\D/g, '');
  if (clean.length !== 8) return null;
  const dd = clean.slice(0, 2);
  const mm = clean.slice(2, 4);
  const yyyy = clean.slice(4, 8);
  const d = parseInt(dd, 10);
  const m = parseInt(mm, 10);
  const y = parseInt(yyyy, 10);
  const currentYear = new Date().getFullYear();
  if (d < 1 || d > 31 || m < 1 || m > 12 || y < 1920 || y > currentYear) {
    return null;
  }
  return `${yyyy}-${mm.padStart(2, '0')}-${dd.padStart(2, '0')}`;
}

function applyDateMask(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 8);
  if (digits.length <= 2) return digits;
  if (digits.length <= 4) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`;
}

export default function DateInputForm({ onSubmit, isLoading }: DateInputFormProps) {
  const [dateDisplay, setDateDisplay] = useState<string>('25/05/1989');
  const [dateError, setDateError] = useState<string | null>(null);
  const [name, setName] = useState<string>('');
  const [gender, setGender] = useState<'masculino' | 'feminino' | 'neutro'>('masculino');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const iso = parseDisplayToIso(dateDisplay);
    if (!iso) {
      setDateError('Digite uma data válida no formato DD/MM/AAAA (ex: 25/05/1989)');
      return;
    }
    setDateError(null);
    onSubmit(iso, name, gender);
  };

  const handlePreset = (presetDate: string, presetName: string, presetGender: 'masculino' | 'feminino' | 'neutro' = 'neutro') => {
    setDateDisplay(formatToDisplayDate(presetDate));
    setName(presetName);
    setGender(presetGender);
    setDateError(null);
    onSubmit(presetDate, presetName, presetGender);
  };

  return (
    <div style={{ width: '100%', maxWidth: '540px', margin: '0 auto', position: 'relative', boxSizing: 'border-box' }}>
      {/* Scotch Tape on corners */}
      <ScotchTape angle={-12} width={56} style={{ top: '-10px', left: '16px' }} />
      <ScotchTape angle={14} width={56} style={{ top: '-10px', right: '16px' }} />

      {/* Main 80s VCR Chassis Deck */}
      <div
        style={{
          background: 'linear-gradient(180deg, #181b22 0%, #0d1016 100%)',
          border: '3px solid #333d52',
          borderRadius: '14px',
          padding: 'clamp(16px, 4vw, 26px) clamp(12px, 3.2vw, 22px)',
          boxShadow: '0 20px 50px rgba(0,0,0,0.9), inset 0 1px 0 rgba(255,255,255,0.15)',
          position: 'relative',
          boxSizing: 'border-box',
          width: '100%',
        }}
      >
        {/* VCR Header OSD Row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '6px' }}>
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
            boxSizing: 'border-box',
            width: '100%',
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
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%', boxSizing: 'border-box' }}>
          {/* Date Input */}
          <div style={{ width: '100%', boxSizing: 'border-box' }}>
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
              type="text"
              inputMode="numeric"
              pattern="[0-9/]*"
              autoComplete="bday"
              required
              placeholder="DD/MM/AAAA (ex: 25/05/1989)"
              maxLength={10}
              value={dateDisplay}
              onChange={(e) => {
                const masked = applyDateMask(e.target.value);
                setDateDisplay(masked);
                if (dateError) setDateError(null);
              }}
              style={{
                width: '100%',
                maxWidth: '100%',
                boxSizing: 'border-box',
                padding: '12px 14px',
                background: '#07090e',
                border: dateError ? '2px solid #ff3b30' : '2px solid #3d465c',
                borderRadius: '6px',
                color: '#00ff88',
                fontFamily: 'var(--font-vcr)',
                fontSize: 'clamp(1.1rem, 4vw, 1.3rem)',
                letterSpacing: '2px',
                outline: 'none',
                boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.95)',
                WebkitAppearance: 'none',
              }}
            />
            {dateError && (
              <div
                style={{
                  fontFamily: 'var(--font-vcr)',
                  color: '#ff6666',
                  fontSize: '0.82rem',
                  marginTop: '5px',
                  letterSpacing: '0.5px',
                }}
              >
                ⚠ {dateError}
              </div>
            )}
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
                maxWidth: '100%',
                boxSizing: 'border-box',
                padding: '12px 14px',
                background: '#07090e',
                border: '2px solid #3d465c',
                borderRadius: '6px',
                color: '#ffffff',
                fontFamily: 'var(--font-vcr)',
                fontSize: '1.15rem',
                letterSpacing: '1px',
                outline: 'none',
                boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.95)',
                WebkitAppearance: 'none',
              }}
            />
          </div>

          {/* Gender / Grammatical Article Selection */}
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
                marginBottom: '8px',
              }}
            >
              <Sparkles size={14} color="#ffe600" />
              <span>GÊNERO / ARTIGO PARA AS HISTÓRIAS:</span>
            </label>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr',
                gap: '8px',
              }}
            >
              {[
                { id: 'masculino', label: '♂ ELE', desc: name ? `o ${name}` : 'o aniversariante' },
                { id: 'feminino', label: '♀ ELA', desc: name ? `a ${name}` : 'a aniversariante' },
                { id: 'neutro', label: '✦ NEUTRO', desc: name ? `${name}` : 'neutro' },
              ].map((opt) => {
                const isSelected = gender === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setGender(opt.id as 'masculino' | 'feminino' | 'neutro')}
                    style={{
                      padding: '9px 6px',
                      borderRadius: '6px',
                      background: isSelected
                        ? 'linear-gradient(180deg, #1f2738 0%, #131924 100%)'
                        : '#090b10',
                      border: isSelected
                        ? '2px solid #00ff88'
                        : '1.5px solid #283042',
                      boxShadow: isSelected
                        ? '0 0 12px rgba(0, 255, 136, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                        : 'none',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '2px',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '0.86rem',
                        fontWeight: 800,
                        letterSpacing: '0.5px',
                        color: isSelected ? '#ffffff' : '#9ca3af',
                      }}
                    >
                      {opt.label}
                    </span>
                    <span
                      style={{
                        fontFamily: 'var(--font-vcr)',
                        fontSize: '0.72rem',
                        color: isSelected ? '#00ff88' : '#6b7280',
                        letterSpacing: '0.5px',
                      }}
                    >
                      {opt.desc}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Authentic Tactile VCR Keycap CTA Button */}
          <button
            type="submit"
            disabled={isLoading || !dateDisplay || dateDisplay.length < 10}
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
              boxShadow: '0 6px 0 #5c0707, 0 12px 24px rgba(0, 0, 0, 0.8), inset 0 2px 0 rgba(255, 255, 255, 0.3)',
              position: 'relative',
              transition: 'all 0.1s ease',
            }}
          >
            {isLoading ? (
              <>
                <RotateCcw size={22} className="animate-spin" />
                <span>REBOBINANDO FITA...</span>
              </>
            ) : (
              <>
                <Play size={24} fill="#ffffff" />
                <span>GERAR UNIVERSÁRIO</span>
                <ArrowRight size={20} />
              </>
            )}
          </button>
        </form>

        {/* Preset Tape Selections */}
        <div style={{ marginTop: '22px', borderTop: '1px dashed #2d3545', paddingTop: '16px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.78rem',
              color: '#a0a8ba',
              fontFamily: 'var(--font-vcr)',
              letterSpacing: '1px',
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
                onClick={() => handlePreset(preset.date, preset.name, preset.gender)}
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
