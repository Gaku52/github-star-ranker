import React from 'react';
import { LANGUAGES, LANGUAGE_COLORS } from '../../utils/colors';

interface Props {
  selectedLanguage: string | null;
  onSelect: (lang: string) => void;
}

export const LanguageSelector: React.FC<Props> = ({ selectedLanguage, onSelect }) => {
  return (
    <div style={{
      position: 'absolute', top: '40px', left: '50%', transform: 'translateX(-50%)',
      display: 'flex', gap: '12px', zIndex: 10,
      maxWidth: '90vw', overflowX: 'auto', padding: '10px'
    }}>
      {LANGUAGES.map((lang) => {
        const isSelected = selectedLanguage === lang;
        const color = LANGUAGE_COLORS[lang];
        return (
          <button
            key={lang}
            onClick={() => onSelect(lang)}
            aria-label={`Select ${lang}`}
            style={{
              padding: '8px 20px',
              borderRadius: '24px',
              border: `1px solid ${isSelected ? color : 'rgba(255,255,255,0.1)'}`,
              background: isSelected ? 'rgba(255,255,255,0.1)' : 'rgba(15, 15, 35, 0.6)',
              backdropFilter: 'blur(16px)',
              color: isSelected ? '#fff' : 'rgba(255,255,255,0.7)',
              fontFamily: 'Inter, sans-serif',
              fontSize: '14px',
              fontWeight: isSelected ? 700 : 400,
              cursor: 'pointer',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              boxShadow: isSelected ? `0 0 20px ${color}40` : 'none',
              whiteSpace: 'nowrap'
            }}
          >
            {lang}
          </button>
        );
      })}
    </div>
  );
};
