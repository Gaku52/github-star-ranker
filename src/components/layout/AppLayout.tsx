import React, { useState, useCallback } from 'react';
import * as THREE from 'three';
import { useRepositories } from '../../hooks/useRepositories';
import { Scene } from '../three/Scene';
import { LanguageSelector } from '../ui/LanguageSelector';
import { RepoDetailPanel } from '../ui/RepoDetailPanel';
import { UserDetailPanel } from '../ui/UserDetailPanel';
import { Repository } from '../../types/github';

export const AppLayout: React.FC = () => {
  const [mode, setMode] = useState<'landing' | 'explore' | 'detail'>('landing');
  const [activeLanguage, setActiveLanguage] = useState<string | null>(null);
  const [activeRepo, setActiveRepo] = useState<Repository | null>(null);
  const [activeUser, setActiveUser] = useState<string | null>(null);

  const { data: repositories } = useRepositories(activeLanguage);

  const handleLanguageSelect = useCallback((lang: string) => {
    setActiveLanguage(lang);
    setMode('explore');
    setActiveRepo(null);
    setActiveUser(null);
  }, []);

  const handleStarClick = useCallback((repo: Repository, _position: THREE.Vector3) => {
    setActiveRepo(repo);
    setMode('detail');
    setActiveUser(null);
  }, []);

  const closeDetail = useCallback(() => {
    setActiveRepo(null);
    setActiveUser(null);
    setMode('explore');
  }, []);

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
      {/* 3Dシーン */}
      <Scene
        mode={mode}
        activeLanguage={activeLanguage}
        repositories={repositories}
        activeRepo={activeRepo}
        onStarClick={handleStarClick}
      />

      {/* 言語セレクター（ランディング時も表示） */}
      <LanguageSelector
        selectedLanguage={activeLanguage}
        onSelect={handleLanguageSelect}
      />

      {/* ランディング時のガイドテキスト */}
      {mode === 'landing' && (
        <div style={{
          position: 'absolute', bottom: '12%', left: '50%', transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', pointerEvents: 'none'
        }}>
          <p style={{ marginBottom: '12px', opacity: 0.6, fontSize: '14px', letterSpacing: '0.1em' }}>
            Choose a language to explore the stars
          </p>
          <span style={{ fontSize: '24px', animation: 'bounce 2s infinite' }}>↓</span>
          <style>{`@keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(10px); } }`}</style>
        </div>
      )}

      {/* 操作ガイド */}
      {mode === 'explore' && activeLanguage && (
        <div style={{ position: 'absolute', bottom: '30px', left: '40px', pointerEvents: 'none' }}>
          <p style={{ fontWeight: 700, fontSize: '16px', margin: 0 }}>
            Top 30 {activeLanguage} repositories by stars
          </p>
          <p style={{ opacity: 0.4, fontSize: '13px', margin: '4px 0 0 0' }}>
            Drag to rotate · Scroll to zoom · Click a star
          </p>
        </div>
      )}

      {/* リポジトリ詳細パネル */}
      {mode === 'detail' && activeRepo && !activeUser && (
        <RepoDetailPanel
          repo={activeRepo}
          onClose={closeDetail}
          onOwnerClick={setActiveUser}
        />
      )}

      {/* ユーザー詳細パネル */}
      {mode === 'detail' && activeUser && (
        <UserDetailPanel
          username={activeUser}
          onBack={() => setActiveUser(null)}
          onClose={closeDetail}
        />
      )}
    </div>
  );
};
