import React from 'react';
import { LANGUAGES, LANGUAGE_COLORS } from '../../utils/colors';

interface Props {
  onLanguageSelect: (lang: string) => void;
}

export const MobileLanding: React.FC<Props> = ({ onLanguageSelect }) => {
  return (
    <div style={{
      position: 'relative', zIndex: 1,
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      height: '100%', padding: '24px',
    }}>
      {/* タイトル */}
      <div style={{
        textAlign: 'center', marginBottom: '48px',
        animation: 'fadeInUp 1s ease-out',
      }}>
        <h1 style={{
          fontSize: '36px', fontWeight: 900,
          letterSpacing: '0.08em', lineHeight: 1.1,
          margin: 0,
          background: 'linear-gradient(135deg, #ffffff 0%, rgba(255,255,255,0.6) 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}>
          GITHUB<br />STAR<br />RANKER
        </h1>
        <p style={{
          marginTop: '16px', fontSize: '13px',
          color: 'rgba(255,255,255,0.4)',
          letterSpacing: '0.15em',
        }}>
          Explore the universe of code
        </p>
      </div>

      {/* 言語グリッド */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '12px', width: '100%', maxWidth: '320px',
        animation: 'fadeInUp 1s ease-out 0.3s both',
      }}>
        {LANGUAGES.map((lang, i) => {
          const color = LANGUAGE_COLORS[lang];
          return (
            <button
              key={lang}
              onClick={() => onLanguageSelect(lang)}
              style={{
                padding: '16px',
                borderRadius: '16px',
                border: '1px solid rgba(255,255,255,0.06)',
                background: 'rgba(255,255,255,0.03)',
                backdropFilter: 'blur(16px)',
                color: '#fff',
                fontSize: '14px',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                display: 'flex', alignItems: 'center', gap: '10px',
                animation: `fadeInUp 0.5s ease-out ${0.1 * i}s both`,
              }}
            >
              <span style={{
                width: '8px', height: '8px',
                borderRadius: '50%', backgroundColor: color,
                boxShadow: `0 0 12px ${color}80`,
                flexShrink: 0,
              }} />
              {lang}
            </button>
          );
        })}
      </div>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};
