'use client';

import React, { useState } from 'react';
import { Calendar, User, History, ArrowRight, Sparkles, Disc, Radio, Music, Star } from 'lucide-react';
import {
  MemphisSquiggle,
  MemphisZigzag,
  MemphisTrianglePattern,
  MemphisCrosshatch,
  MemphisCoil,
} from './MemphisDoodles';

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
      {/* Decorative Washi Tape on top left & bottom right */}
      <div className="tape-strip" style={{ top: '-10px', left: '15px' }} />
      <div className="tape-strip tape-strip-cyan" style={{ bottom: '-10px', right: '20px' }} />

      {/* Floating Memphis Geometric Accents around the form */}
      <div style={{ position: 'absolute', top: '-18px', right: '-12px', zIndex: 10 }}>
        <MemphisTrianglePattern size={48} fillColor="#ffe600" borderColor="#111111" />
      </div>
      <div style={{ position: 'absolute', bottom: '40px', left: '-22px', zIndex: 10 }}>
        <MemphisCrosshatch size={36} color="#00d2ff" />
      </div>
      <div style={{ position: 'absolute', top: '45%', right: '-18px', zIndex: 10 }}>
        <MemphisCoil width={44} height={16} color="#ff2a85" />
      </div>

      <div
        className="memphis-card"
        style={{
          background: '#ffffff',
          border: '3.5px solid #111111',
          borderRadius: '24px',
          padding: '32px 26px',
          boxShadow: '6px 6px 0px #111111, 12px 12px 0px #ffe600',
          position: 'relative',
        }}
      >
        {/* Cassette Tape Cutout Illustration */}
        <div
          style={{
            background: '#fffdf7',
            border: '2.5px solid #111111',
            borderRadius: '16px',
            padding: '12px 16px',
            marginBottom: '20px',
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
              padding: '5px 12px',
              borderRadius: '8px',
              border: '2px solid #111111',
              fontFamily: 'var(--font-80s)',
              fontSize: '0.85rem',
              letterSpacing: '1px',
              marginBottom: '8px',
              boxShadow: '2px 2px 0px #111111',
            }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Music size={14} />
              <span>MIXTAPE • UNIVERSÁRIO 80s</span>
            </span>
            <span style={{ fontFamily: 'var(--font-crt)', color: '#ffe600', fontSize: '0.9rem' }}>
              SIDE A / 90 MIN
            </span>
          </div>

          {/* Cassette Tape Window & Spools */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '24px',
              background: '#f1f5f9',
              border: '2px solid #111111',
              borderRadius: '10px',
              padding: '10px 18px',
              position: 'relative',
            }}
          >
            {/* Left Spool */}
            <div
              className="animate-tape-spin"
              style={{
                width: '34px',
                height: '34px',
                borderRadius: '50%',
                background: '#ffffff',
                border: '3.5px solid #ffe600',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '2px 2px 0px #111111',
              }}
            >
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#111111' }} />
            </div>

            {/* Magnetic Tape Window Center */}
            <div
              style={{
                width: '90px',
                height: '20px',
                background: '#111111',
                borderRadius: '6px',
                border: '1.5px solid #111111',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'var(--font-crt)',
                color: '#ffe600',
                fontSize: '0.85rem',
                letterSpacing: '1px',
              }}
            >
              00 : 25 : 89
            </div>

            {/* Right Spool */}
            <div
              className="animate-tape-spin"
              style={{
                width: '34px',
                height: '34px',
                borderRadius: '50%',
                background: '#ffffff',
                border: '3.5px solid #00d2ff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '2px 2px 0px #111111',
              }}
            >
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#111111' }} />
            </div>
          </div>
        </div>

        {/* Title Header */}
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <h1
            style={{
              fontSize: '2.5rem',
              fontWeight: 900,
              fontFamily: 'var(--font-80s)',
              lineHeight: 1.1,
              marginBottom: '6px',
              color: '#111111',
            }}
            className="text-chromatic"
          >
            UNIVERSÁRIO
          </h1>

          <p style={{ color: '#444444', fontSize: '0.94rem', lineHeight: 1.4, fontWeight: 500 }}>
            Insira sua data de nascimento para gerar a fita cassete cósmica e seus stories no estilo Memphis 80s/90s.
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
                fontWeight: 800,
                color: '#111111',
                fontFamily: 'var(--font-80s)',
                letterSpacing: '0.5px',
                marginBottom: '6px',
              }}
            >
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '24px',
                  height: '24px',
                  borderRadius: '6px',
                  background: '#ffe600',
                  border: '1.5px solid #111111',
                }}
              >
                <Calendar size={14} color="#111111" />
              </span>
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
                background: '#fffdf7',
                border: '2.5px solid #111111',
                borderRadius: '12px',
                color: '#111111',
                fontFamily: 'var(--font-main)',
                fontSize: '1.05rem',
                fontWeight: 700,
                outline: 'none',
                boxShadow: '3px 3px 0px #00d2ff',
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
                fontWeight: 800,
                color: '#111111',
                fontFamily: 'var(--font-80s)',
                letterSpacing: '0.5px',
                marginBottom: '6px',
              }}
            >
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '24px',
                  height: '24px',
                  borderRadius: '6px',
                  background: '#ff2a85',
                  border: '1.5px solid #111111',
                }}
              >
                <User size={14} color="#ffffff" />
              </span>
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
                background: '#fffdf7',
                border: '2.5px solid #111111',
                borderRadius: '12px',
                color: '#111111',
                fontFamily: 'var(--font-main)',
                fontSize: '1rem',
                fontWeight: 600,
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
        <div style={{ marginTop: '24px', borderTop: '2.5px dashed #111111', paddingTop: '16px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              color: '#111111',
              fontFamily: 'var(--font-80s)',
              fontSize: '0.84rem',
              letterSpacing: '0.5px',
              marginBottom: '10px',
            }}
          >
            <History size={15} color="#ff2a85" />
            <span>OU TESTE DATAS HISTÓRICAS:</span>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {PRESET_DATES.map((preset) => (
              <button
                key={preset.date}
                type="button"
                onClick={() => handlePreset(preset.date, preset.name)}
                style={{
                  background: '#fffdf7',
                  border: '2px solid #111111',
                  borderRadius: '999px',
                  padding: '6px 14px',
                  fontSize: '0.80rem',
                  fontFamily: 'var(--font-main)',
                  fontWeight: 700,
                  color: '#111111',
                  cursor: 'pointer',
                  boxShadow: '2.5px 2.5px 0px #00d2ff',
                  transition: 'all 0.15s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translate(-2px, -2px)';
                  e.currentTarget.style.boxShadow = '3.5px 3.5px 0px #ff2a85';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translate(0, 0)';
                  e.currentTarget.style.boxShadow = '2.5px 2.5px 0px #00d2ff';
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

