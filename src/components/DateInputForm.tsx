'use client';

import React, { useState } from 'react';
import { Calendar, User, History, ArrowRight, RotateCcw, Sparkles } from 'lucide-react';

interface DateInputFormProps {
  onSubmit: (date: string, name?: string, gender?: 'masculino' | 'feminino' | 'neutro') => void;
  isLoading: boolean;
}

const PRESET_DATES = [
  { label: '25/05/1989 • MICHEL (80s)', date: '1989-05-25', name: 'Michel', gender: 'masculino' as const },
  { label: '20/07/1969 • POUSO NA LUA', date: '1969-07-20', name: 'Neil Armstrong', gender: 'masculino' as const },
  { label: '17/07/1994 • TETRA BRASIL', date: '1994-07-17', name: 'Geração 94', gender: 'neutro' as const },
  { label: '19/12/1997 • TITANIC', date: '1997-12-19', name: 'Rose DeWitt', gender: 'feminino' as const },
  { label: '01/01/2000 • VIRADA 2000', date: '2000-01-01', name: 'Millennium', gender: 'neutro' as const },
  { label: '30/06/2002 • PENTA BRASIL', date: '2002-06-30', name: 'Penta 2002', gender: 'neutro' as const },
];

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
    <div style={{ width: '100%', maxWidth: '820px', margin: '0 auto', position: 'relative', boxSizing: 'border-box' }}>
      {/* Thermal Gradient Aura Glow centered directly behind the card */}
      <div
        className="acid-thermal-aura"
        style={{
          position: 'absolute',
          width: 'min(500px, 90vw)',
          height: 'min(360px, 65vw)',
          top: '5%',
          left: '50%',
          transform: 'translateX(-50%)',
          pointerEvents: 'none',
        }}
      />

      {/* Main Acid Editorial Brutalist Card */}
      <div
        className="acid-card"
        style={{
          background: '#0c0d11',
          color: '#ffffff',
          border: '3px solid #0c0d11',
          boxShadow: '5px 5px 0px #d4ff00',
          padding: 'clamp(14px, 3.5vw, 24px)',
          borderRadius: '4px',
          boxSizing: 'border-box',
          width: '100%',
          position: 'relative',
          zIndex: 2,
        }}
      >
        {/* Technical Top Row */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '14px',
            flexWrap: 'wrap',
            gap: '6px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span className="acid-tag acid-tag-lime" style={{ fontSize: '0.62rem', padding: '2px 6px' }}>
              [ ARCHIVE // 01 ]
            </span>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.65rem',
                color: 'rgba(255,255,255,0.7)',
                letterSpacing: '0.5px',
              }}
            >
              TIME CAPSULE
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#ffffff' }}>
            <div className="acid-barcode" style={{ height: '14px' }}>
              <span /><span /><span /><span /><span /><span />
            </div>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: '#d4ff00', fontWeight: 800 }}>
              REC ● NTSC
            </span>
          </div>
        </div>

        {/* Maximalist Title Header */}
        <div style={{ marginBottom: '16px' }}>
          <h1
            style={{
              fontSize: 'clamp(1.55rem, 5.8vw, 2.4rem)',
              fontFamily: 'var(--font-maximalist)',
              fontWeight: 900,
              lineHeight: 1.02,
              color: '#ffffff',
              letterSpacing: '-0.5px',
              textTransform: 'uppercase',
              marginBottom: '6px',
            }}
          >
            QUAL É O SEU UNIVERSÁRIO?
          </h1>

          <p
            style={{
              color: '#d4ff00',
              fontSize: 'clamp(0.70rem, 2.4vw, 0.82rem)',
              fontFamily: 'var(--font-mono)',
              letterSpacing: '0.8px',
              fontWeight: 700,
              textTransform: 'uppercase',
            }}
          >
            → O QUE ACONTECIA NO DIA EM QUE VOCÊ CHEGOU AO MUNDO
          </p>
        </div>

        {/* Form Controls */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px', width: '100%', boxSizing: 'border-box' }}>
          {/* Date Input with Maximalist styling */}
          <div style={{ width: '100%', boxSizing: 'border-box' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '6px',
              }}
            >
              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '0.74rem',
                  color: '#ffffff',
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 800,
                  letterSpacing: '0.5px',
                  textTransform: 'uppercase',
                }}
              >
                <Calendar size={13} color="#d4ff00" />
                <span>DATA DE NASCIMENTO *</span>
              </label>

              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.62rem',
                  color: '#d4ff00',
                  fontWeight: 800,
                  letterSpacing: '0.5px',
                }}
              >
                [ DD/MM/AAAA ]
              </span>
            </div>

            <div style={{ position: 'relative' }}>
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9/]*"
                autoComplete="bday"
                required
                placeholder="25/05/1989"
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
                  padding: '11px 14px',
                  background: '#000000',
                  border: dateError ? '2px solid #ff0077' : '2px solid #ffffff',
                  borderRadius: '2px',
                  color: '#d4ff00',
                  fontFamily: 'var(--font-maximalist)',
                  fontSize: 'clamp(1.35rem, 5.0vw, 1.8rem)',
                  fontWeight: 900,
                  letterSpacing: '2px',
                  outline: 'none',
                  boxShadow: 'inset 0 2px 6px rgba(0,0,0,0.8)',
                  WebkitAppearance: 'none',
                }}
              />
            </div>
            {dateError && (
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  color: '#ff0077',
                  fontSize: '0.76rem',
                  fontWeight: 800,
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
                fontSize: '0.74rem',
                color: '#ffffff',
                fontFamily: 'var(--font-mono)',
                fontWeight: 800,
                letterSpacing: '0.5px',
                textTransform: 'uppercase',
                marginBottom: '6px',
              }}
            >
              <User size={13} color="#00ff2a" />
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
                padding: '10px 14px',
                background: '#000000',
                border: '1.5px solid rgba(255, 255, 255, 0.4)',
                borderRadius: '2px',
                color: '#ffffff',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.95rem',
                fontWeight: 700,
                letterSpacing: '0.5px',
                outline: 'none',
                WebkitAppearance: 'none',
              }}
            />
          </div>

          {/* Gender / Article Selection */}
          <div>
            <label
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.74rem',
                color: '#ffffff',
                fontFamily: 'var(--font-mono)',
                fontWeight: 800,
                letterSpacing: '0.5px',
                textTransform: 'uppercase',
                marginBottom: '6px',
              }}
            >
              <Sparkles size={13} color="#ff0077" />
              <span>GÊNERO PARA AS HISTÓRIAS:</span>
            </label>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr',
                gap: '6px',
              }}
            >
              {[
                { id: 'masculino', label: 'ELE', desc: name ? `o ${name}` : 'masculino' },
                { id: 'feminino', label: 'ELA', desc: name ? `a ${name}` : 'feminino' },
                { id: 'neutro', label: 'NEUTRO', desc: name ? `${name}` : 'neutro' },
              ].map((opt) => {
                const isSelected = gender === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setGender(opt.id as 'masculino' | 'feminino' | 'neutro')}
                    style={{
                      padding: '8px 4px',
                      borderRadius: '2px',
                      background: isSelected ? 'var(--acid-chartreuse)' : '#000000',
                      color: isSelected ? '#0a0a0c' : '#ffffff',
                      border: isSelected ? '2px solid #0a0a0c' : '1.5px solid rgba(255, 255, 255, 0.25)',
                      boxShadow: isSelected ? '2px 2px 0px #ffffff' : 'none',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '1px',
                      transition: 'all 0.1s ease',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-maximalist)',
                        fontSize: '0.88rem',
                        fontWeight: 900,
                        letterSpacing: '0.5px',
                      }}
                    >
                      {opt.label}
                    </span>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.62rem',
                        opacity: isSelected ? 0.9 : 0.6,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        maxWidth: '100%',
                      }}
                    >
                      {opt.desc}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Maximalist CTA Button */}
          <button
            type="submit"
            disabled={isLoading || !dateDisplay || dateDisplay.length < 10}
            className="acid-btn-primary"
            style={{
              width: '100%',
              marginTop: '4px',
              padding: '13px 20px',
              fontSize: '1.05rem',
              cursor: isLoading ? 'not-allowed' : 'pointer',
            }}
          >
            {isLoading ? (
              <>
                <RotateCcw size={18} className="animate-spin" />
                <span>RECUPERANDO ARQUIVOS...</span>
              </>
            ) : (
              <>
                <span>GERAR STORIES</span>
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>

        {/* Preset Selections in a clean, compact 2-column grid */}
        <div style={{ marginTop: '16px', borderTop: '1px solid rgba(255, 255, 255, 0.15)', paddingTop: '12px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.68rem',
              color: 'rgba(255, 255, 255, 0.75)',
              fontFamily: 'var(--font-mono)',
              letterSpacing: '0.8px',
              textTransform: 'uppercase',
              marginBottom: '8px',
            }}
          >
            <History size={12} color="#d4ff00" />
            <span>[ PRESETS HISTÓRICOS DE TESTE RÁPIDO ]</span>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
              gap: '6px',
            }}
          >
            {[
              { label: '★ 1989 MICHEL', date: '1989-05-25', name: 'Michel', gender: 'masculino' as const },
              { label: '★ 1969 APOLLO 11', date: '1969-07-20', name: 'Neil Armstrong', gender: 'masculino' as const },
              { label: '★ 1994 TETRA BR', date: '1994-07-17', name: 'Geração 94', gender: 'neutro' as const },
              { label: '★ 1997 TITANIC', date: '1997-12-19', name: 'Rose', gender: 'feminino' as const },
              { label: '★ 2000 VIRADA', date: '2000-01-01', name: 'Millennium', gender: 'neutro' as const },
              { label: '★ 2002 PENTA BR', date: '2002-06-30', name: 'Penta 2002', gender: 'neutro' as const },
            ].map((preset) => (
              <button
                key={preset.date}
                type="button"
                onClick={() => handlePreset(preset.date, preset.name, preset.gender)}
                style={{
                  background: '#000000',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  padding: '7px 8px',
                  fontSize: '0.72rem',
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 800,
                  letterSpacing: '0.5px',
                  color: '#ffffff',
                  cursor: 'pointer',
                  borderRadius: '2px',
                  textAlign: 'center',
                  transition: 'all 0.12s ease',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#d4ff00';
                  e.currentTarget.style.color = '#0a0a0c';
                  e.currentTarget.style.background = '#d4ff00';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                  e.currentTarget.style.color = '#ffffff';
                  e.currentTarget.style.background = '#000000';
                }}
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
