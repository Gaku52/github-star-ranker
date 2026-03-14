import React from 'react';
import { Repository } from '../../types/github';
import { LANGUAGE_COLORS } from '../../utils/colors';

interface Props {
  repo: Repository;
  onClose: () => void;
  onOwnerClick: (username: string) => void;
}

export const RepoDetailPanel: React.FC<Props> = ({ repo, onClose, onOwnerClick }) => {
  const color = LANGUAGE_COLORS[repo.language] || '#ffffff';

  return (
    <div className="glass-panel" style={{
      position: 'absolute', right: '40px', top: '50%', transform: 'translateY(-50%)',
      width: '400px', maxWidth: '90vw', padding: '24px', zIndex: 20,
      boxShadow: `0 8px 40px rgba(0,0,0,0.6), 0 0 80px ${color}20`,
      animation: 'slideIn 0.3s ease-out'
    }}>
      <style>{`
        @keyframes slideIn {
          from { transform: translateY(-50%) translateX(40px); opacity: 0; }
          to { transform: translateY(-50%) translateX(0); opacity: 1; }
        }
      `}</style>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 700, margin: 0 }}>{repo.name}</h2>
        <button onClick={onClose} aria-label="Close" style={{
          background: 'none', border: 'none', color: '#fff', cursor: 'pointer',
          fontSize: '24px', lineHeight: 1
        }}>
          ✕
        </button>
      </div>

      <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px', lineHeight: 1.6, marginBottom: '24px' }}>
        {repo.description || 'No description available.'}
      </p>

      <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700 }}>
          ★ {repo.stargazers_count.toLocaleString()}
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'rgba(255,255,255,0.7)' }}>
          🍴 {repo.forks_count.toLocaleString()}
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'rgba(255,255,255,0.7)' }}>
          📝 {repo.language}
        </span>
      </div>

      <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', margin: '16px 0' }} />

      <div
        onClick={() => onOwnerClick(repo.owner.login)}
        role="button"
        tabIndex={0}
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '12px', borderRadius: '8px', cursor: 'pointer',
          background: 'rgba(255,255,255,0.04)', transition: 'background 0.2s'
        }}
        onKeyDown={(e) => { if (e.key === 'Enter') onOwnerClick(repo.owner.login); }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <img src={repo.owner.avatar_url} alt={repo.owner.login} style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
          <span style={{ fontWeight: 700 }}>{repo.owner.login}</span>
        </div>
        <span style={{ color: 'rgba(255,255,255,0.5)' }}>→</span>
      </div>

      <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', margin: '16px 0' }} />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)' }}>
          Updated: {new Date(repo.updated_at).toLocaleDateString()}
        </span>
        <a
          href={repo.html_url} target="_blank" rel="noopener noreferrer"
          style={{
            display: 'flex', alignItems: 'center', gap: '6px', color: '#fff',
            textDecoration: 'none', fontSize: '14px', fontWeight: 700
          }}
        >
          View on GitHub →
        </a>
      </div>
    </div>
  );
};
