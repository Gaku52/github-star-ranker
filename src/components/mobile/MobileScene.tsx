import React, { useState, useCallback } from 'react';
import { useRepositories } from '../../hooks/useRepositories';
import { LANGUAGES, LANGUAGE_COLORS } from '../../utils/colors';
import { Repository } from '../../types/github';
import { MobileLanding } from './MobileLanding';
import { MobileStarGrid } from './MobileStarGrid';
import { MobileRepoDetail } from './MobileRepoDetail';
import { MobileUserDetail } from './MobileUserDetail';

export const MobileScene: React.FC = () => {
  const [activeLanguage, setActiveLanguage] = useState<string | null>(null);
  const [activeRepo, setActiveRepo] = useState<Repository | null>(null);
  const [activeUser, setActiveUser] = useState<string | null>(null);

  const { data: repositories, isLoading } = useRepositories(activeLanguage);

  const handleLanguageSelect = useCallback((lang: string) => {
    setActiveLanguage(lang);
    setActiveRepo(null);
    setActiveUser(null);
  }, []);

  const handleBack = useCallback(() => {
    if (activeUser) {
      setActiveUser(null);
    } else if (activeRepo) {
      setActiveRepo(null);
    } else {
      setActiveLanguage(null);
    }
  }, [activeUser, activeRepo]);

  // ユーザー詳細画面
  if (activeUser) {
    return (
      <div style={containerStyle}>
        <StarBackground color={activeLanguage ? LANGUAGE_COLORS[activeLanguage] : '#ffffff'} />
        <MobileUserDetail
          username={activeUser}
          onBack={() => setActiveUser(null)}
          onClose={() => { setActiveUser(null); setActiveRepo(null); }}
        />
      </div>
    );
  }

  // リポジトリ詳細画面
  if (activeRepo) {
    return (
      <div style={containerStyle}>
        <StarBackground color={LANGUAGE_COLORS[activeLanguage!]} />
        <MobileRepoDetail
          repo={activeRepo}
          onBack={() => setActiveRepo(null)}
          onOwnerClick={setActiveUser}
        />
      </div>
    );
  }

  // 言語選択後：ランキング表示
  if (activeLanguage) {
    return (
      <div style={containerStyle}>
        <StarBackground color={LANGUAGE_COLORS[activeLanguage]} />
        <MobileLanguageBar
          selectedLanguage={activeLanguage}
          onSelect={handleLanguageSelect}
        />
        <MobileStarGrid
          repositories={repositories}
          isLoading={isLoading}
          language={activeLanguage}
          onRepoClick={setActiveRepo}
        />
      </div>
    );
  }

  // ランディング
  return (
    <div style={containerStyle}>
      <StarBackground color="#ffffff" />
      <MobileLanding onLanguageSelect={handleLanguageSelect} />
    </div>
  );
};

const containerStyle: React.CSSProperties = {
  position: 'relative',
  width: '100vw',
  height: '100vh',
  overflow: 'hidden',
  background: '#05050a',
};

// CSSだけで作る星空背景
const StarBackground: React.FC<{ color: string }> = ({ color }) => (
  <>
    <div style={{
      position: 'absolute', inset: 0,
      background: `radial-gradient(ellipse at 30% 20%, ${color}08 0%, transparent 60%),
                   radial-gradient(ellipse at 70% 80%, ${color}06 0%, transparent 50%),
                   #05050a`,
      transition: 'background 1s ease',
    }} />
    <div style={{
      position: 'absolute', inset: 0,
      backgroundImage: `
        radial-gradient(1px 1px at 10% 15%, rgba(255,255,255,0.8), transparent),
        radial-gradient(1px 1px at 25% 35%, rgba(255,255,255,0.6), transparent),
        radial-gradient(1px 1px at 40% 10%, rgba(255,255,255,0.5), transparent),
        radial-gradient(1px 1px at 55% 45%, rgba(255,255,255,0.7), transparent),
        radial-gradient(1px 1px at 70% 20%, rgba(255,255,255,0.4), transparent),
        radial-gradient(1px 1px at 85% 60%, rgba(255,255,255,0.6), transparent),
        radial-gradient(1px 1px at 15% 75%, rgba(255,255,255,0.5), transparent),
        radial-gradient(1px 1px at 30% 90%, rgba(255,255,255,0.3), transparent),
        radial-gradient(1px 1px at 50% 70%, rgba(255,255,255,0.6), transparent),
        radial-gradient(1px 1px at 65% 85%, rgba(255,255,255,0.4), transparent),
        radial-gradient(1px 1px at 80% 40%, rgba(255,255,255,0.7), transparent),
        radial-gradient(1px 1px at 90% 10%, rgba(255,255,255,0.5), transparent),
        radial-gradient(2px 2px at 20% 50%, rgba(255,255,255,0.9), transparent),
        radial-gradient(2px 2px at 75% 30%, rgba(255,255,255,0.8), transparent),
        radial-gradient(1.5px 1.5px at 45% 55%, rgba(255,255,255,0.6), transparent),
        radial-gradient(1px 1px at 5% 40%, rgba(255,255,255,0.5), transparent),
        radial-gradient(1px 1px at 95% 55%, rgba(255,255,255,0.4), transparent),
        radial-gradient(1px 1px at 35% 5%, rgba(255,255,255,0.6), transparent),
        radial-gradient(1.5px 1.5px at 60% 95%, rgba(255,255,255,0.7), transparent),
        radial-gradient(1px 1px at 8% 88%, rgba(255,255,255,0.5), transparent)
      `,
      animation: 'twinkle 8s ease-in-out infinite alternate',
    }} />
    <style>{`
      @keyframes twinkle {
        0% { opacity: 0.6; }
        50% { opacity: 1; }
        100% { opacity: 0.7; }
      }
    `}</style>
  </>
);

// モバイル用言語切替バー
const MobileLanguageBar: React.FC<{
  selectedLanguage: string;
  onSelect: (lang: string) => void;
}> = ({ selectedLanguage, onSelect }) => (
  <div style={{
    position: 'absolute', top: 0, left: 0, right: 0,
    padding: '12px 16px', zIndex: 10,
    display: 'flex', gap: '8px',
    overflowX: 'auto', WebkitOverflowScrolling: 'touch',
    maskImage: 'linear-gradient(to right, transparent, black 16px, black calc(100% - 16px), transparent)',
    WebkitMaskImage: 'linear-gradient(to right, transparent, black 16px, black calc(100% - 16px), transparent)',
  }}>
    {LANGUAGES.map((lang) => {
      const isSelected = selectedLanguage === lang;
      const color = LANGUAGE_COLORS[lang];
      return (
        <button
          key={lang}
          onClick={() => onSelect(lang)}
          style={{
            padding: '6px 16px',
            borderRadius: '20px',
            border: `1px solid ${isSelected ? color : 'rgba(255,255,255,0.1)'}`,
            background: isSelected ? `${color}20` : 'rgba(15, 15, 35, 0.6)',
            backdropFilter: 'blur(12px)',
            color: isSelected ? '#fff' : 'rgba(255,255,255,0.6)',
            fontSize: '12px',
            fontFamily: 'Inter, sans-serif',
            fontWeight: isSelected ? 700 : 400,
            cursor: 'pointer',
            whiteSpace: 'nowrap',
            transition: 'all 0.3s ease',
            boxShadow: isSelected ? `0 0 16px ${color}30` : 'none',
            flexShrink: 0,
          }}
        >
          {lang}
        </button>
      );
    })}
  </div>
);
