import React from 'react';
import { Repository } from '../../types/github';
import { LANGUAGE_COLORS } from '../../utils/colors';

interface Props {
  repo: Repository;
  onBack: () => void;
  onOwnerClick: (username: string) => void;
}

export const MobileRepoDetail: React.FC<Props> = ({ repo, onBack, onOwnerClick }) => {
  const color = LANGUAGE_COLORS[repo.language] || '#ffffff';

  return (
    <div style={{
      position: 'relative', zIndex: 1,
      height: '100%', overflowY: 'auto',
      WebkitOverflowScrolling: 'touch',
      padding: '20px',
      animation: 'slideUp 0.4s ease-out',
    }}>
      {/* ヘッダー */}
      <button onClick={onBack} style={{
        background: 'none', border: 'none', color: 'rgba(255,255,255,0.6)',
        fontSize: '14px', cursor: 'pointer', padding: '8px 0',
        fontFamily: 'Inter, sans-serif',
        display: 'flex', alignItems: 'center', gap: '6px',
      }}>
        ← Back
      </button>

      {/* メインカード */}
      <div style={{
        marginTop: '16px', padding: '24px',
        borderRadius: '20px',
        border: '1px solid rgba(255,255,255,0.06)',
        background: `linear-gradient(145deg, ${color}10, rgba(255,255,255,0.02))`,
        backdropFilter: 'blur(20px)',
      }}>
        {/* リポジトリ名 */}
        <h1 style={{
          fontSize: '22px', fontWeight: 900, margin: 0,
          background: `linear-gradient(135deg, #ffffff, ${color})`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}>
          {repo.name}
        </h1>

        {/* 説明 */}
        <p style={{
          fontSize: '13px', color: 'rgba(255,255,255,0.6)',
          lineHeight: 1.6, margin: '12px 0 20px',
        }}>
          {repo.description || 'No description'}
        </p>

        {/* スタッツ */}
        <div style={{
          display: 'flex', gap: '16px',
          padding: '16px',
          borderRadius: '12px',
          background: 'rgba(0,0,0,0.3)',
        }}>
          <Stat label="Stars" value={repo.stargazers_count.toLocaleString()} icon="★" highlight />
          <Stat label="Forks" value={repo.forks_count.toLocaleString()} icon="⑂" />
          <Stat label="Language" value={repo.language || '-'} icon="◇" />
        </div>
      </div>

      {/* オーナーカード */}
      <div
        onClick={() => onOwnerClick(repo.owner.login)}
        style={{
          marginTop: '12px', padding: '16px',
          borderRadius: '16px',
          border: '1px solid rgba(255,255,255,0.06)',
          background: 'rgba(255,255,255,0.02)',
          backdropFilter: 'blur(12px)',
          display: 'flex', alignItems: 'center', gap: '14px',
          cursor: 'pointer',
        }}
      >
        <img
          src={repo.owner.avatar_url}
          alt={repo.owner.login}
          style={{
            width: '44px', height: '44px',
            borderRadius: '50%',
            border: `2px solid ${color}40`,
          }}
        />
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: '15px', fontWeight: 700 }}>{repo.owner.login}</div>
          <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)' }}>View profile →</div>
        </div>
      </div>

      {/* GitHubリンク */}
      <a
        href={repo.html_url}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'block', marginTop: '12px',
          padding: '14px', borderRadius: '12px',
          background: `${color}15`,
          border: `1px solid ${color}30`,
          color: '#fff', textDecoration: 'none',
          textAlign: 'center', fontSize: '14px', fontWeight: 700,
          fontFamily: 'Inter, sans-serif',
        }}
      >
        View on GitHub ↗
      </a>

      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

const Stat: React.FC<{
  label: string;
  value: string;
  icon: string;
  highlight?: boolean;
}> = ({ label, value, icon, highlight }) => (
  <div style={{ flex: 1, textAlign: 'center' }}>
    <div style={{
      fontSize: '16px', fontWeight: 700,
      color: highlight ? '#f7df1e' : '#fff',
    }}>
      <span style={{ fontSize: '12px', marginRight: '2px' }}>{icon}</span>
      {value}
    </div>
    <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)', marginTop: '4px' }}>{label}</div>
  </div>
);
