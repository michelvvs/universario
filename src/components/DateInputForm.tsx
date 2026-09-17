'use client';

import React, { useState } from 'react';
import { Calendar, User, History, ArrowRight, Sparkles, Disc, Radio } from 'lucide-react';

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
    <div style={{ width: '100%', maxWidth: '520px', margin: '0 auto', position: 'relative' }}>
      {/* Decorative Washi Tape on top left & bottom right */}
      <div className="tape-strip" style={{ top: '-10px', left: '15px' }} />
      <div className="tape-strip tape-strip-cyan" style={{ bottom: '-10px', right: '20px' }} />

      <div
        className="memphis-card"
        style={{
          background: 'rgba(22, 8, 47, 0.92)',
          border: '3px solid #00f0ff',
          borderRadius: '24px',
          padding: '32px 26px',
          boxShadow: '6px 6px 0px #ff2a85, 12px 12px 0px #ffde59',
          position: 'relative',
        }}
      >
        {/* Cassette Tape Cutout Illustration */}
        <div
          style={{
            background: '#1a1a2e',
            border: '2px solid #ffffff',
            borderRadius: '16px',
            padding: '12px 16px',
            marginBottom: '22px',
            boxShadow: '4px 4px 0px #ff2a85',
            position: 'relative',
          }}
        >
          {/* Cassette Top Label */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: '#ff2a85',
              color: '#ffffff',
              padding: '4px 10px',
              borderRadius: '6px',
              fontFamily: 'var(--font-80s)',
              fontSize: '0.85rem',
              letterSpacing: '1px',
              marginBottom: '8px',
            }}
          >
            <span>MIXTAPE • UNIVERSÁRIO 80s</span>
            <span style={{ fontFamily: 'var(--font-crt)', color: '#ffde59' }}>SIDE A / 90 MIN</span>
          </div>

          {/* Cassette Tape Window & Spools */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '24px',
              background: '#0d0d1a',
              border: '2px solid rgba(255,255,255,0.2)',
              borderRadius: '10px',
              padding: '10px 18px',
              position: 'relative',
            }}
          >
            {/* Left Spool */}
            <div
              className="animate-tape-spin"
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: '#ffffff',
                border: '4px solid #ffde59',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 6px rgba(255, 222, 89, 0.6)',
              }}
            >
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#1a1a2e' }} />
            </div>

            {/* Magnetic Tape Window Center */}
            <div
              style={{
                width: '80px',
                height: '18px',
                background: '#4a2511',
                borderRadius: '4px',
                border: '1px solid rgba(255,255,255,0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'var(--font-crt)',
                color: '#ffde59',
                fontSize: '0.8rem',
              }}
            >
              00 : 25 : 89
            </div>

            {/* Right Spool */}
            <div
              className="animate-tape-spin"
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: '#ffffff',
                border: '4px solid #00f0ff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 6px rgba(0, 240, 255, 0.6)',
              }}
            >
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#1a1a2e' }} />
            </div>
          </div>
        </div>

        {/* Title Header */}
        <div style={{ textAlign: 'center', marginBottom: '22px' }}>
          <h1
            style={{
              fontSize: '2.4rem',
              fontWeight: 800,
              fontFamily: 'var(--font-80s)',
              lineHeight: 1.1,
              marginBottom: '6px',
            }}
            className="text-chromatic"
          >
            UNIVERSÁRIO
          </h1>

          <p style={{ color: '#cbd5e1', fontSize: '0.92rem', lineHeight: 1.4 }}>
            Insira sua data de nascimento para gerar a fita cassete cósmica e seus stories oitentistas.
          </p>
        </div>

        {/* Form Inputs */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '0.88rem',
                fontWeight: 700,
                color: '#ffde59',
                fontFamily: 'var(--font-80s)',
                letterSpacing: '0.5px',
                marginBottom: '6px',
              }}
            >
              <Calendar size={16} color="#00f0ff" />
              <span>DATA DE NASCIMENTO *</span>
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
                padding: '14px 16px',
                background: '#0d061c',
                border: '2.5px solid #ff2a85',
                borderRadius: '12px',
                color: '#ffffff',
                fontFamily: 'var(--font-main)',
                fontSize: '1.05rem',
                fontWeight: 600,
                outline: 'none',
                boxShadow: '3px 3px 0px #00f0ff',
                cursor: 'pointer',
              }}
            />
          </div>

          <div>
            <label
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '0.88rem',
                fontWeight: 700,
                color: '#ffde59',
                fontFamily: 'var(--font-80s)',
                letterSpacing: '0.5px',
                marginBottom: '6px',
              }}
            >
              <User size={16} color="#ff2a85" />
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
                padding: '14px 16px',
                background: '#0d061c',
                border: '2.5px solid #00f0ff',
                borderRadius: '12px',
                color: '#ffffff',
                fontFamily: 'var(--font-main)',
                fontSize: '1rem',
                fontWeight: 500,
                outline: 'none',
                boxShadow: '3px 3px 0px #ff2a85',
              }}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading || !date}
            className="btn-memphis-primary"
            style={{ width: '100%', marginTop: '8px', opacity: isLoading ? 0.7 : 1 }}
          >
            <span>REBOBINAR & GERAR STORIES</span>
            <ArrowRight size={20} />
          </button>
        </form>

        {/* Preset Dates Section */}
        <div style={{ marginTop: '26px', borderTop: '2px dashed rgba(255,255,255,0.18)', paddingTop: '18px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              color: '#00f0ff',
              fontFamily: 'var(--font-80s)',
              fontSize: '0.82rem',
              letterSpacing: '0.5px',
              marginBottom: '10px',
            }}
          >
            <History size={14} />
            <span>OU TESTE DATAS HISTÓRICAS:</span>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {PRESET_DATES.map((preset) => (
              <button
                key={preset.date}
                type="button"
                onClick={() => handlePreset(preset.date, preset.name)}
                style={{
                  background: '#0d061c',
                  border: '1.5px solid #ffde59',
                  borderRadius: '999px',
                  padding: '6px 12px',
                  fontSize: '0.78rem',
                  fontFamily: 'var(--font-main)',
                  fontWeight: 600,
                  color: '#ffffff',
                  cursor: 'pointer',
                  boxShadow: '2px 2px 0px #ff2a85',
                  transition: 'all 0.15s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translate(-1px, -1px)';
                  e.currentTarget.style.boxShadow = '3px 3px 0px #00f0ff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translate(0, 0)';
                  e.currentTarget.style.boxShadow = '2px 2px 0px #ff2a85';
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
