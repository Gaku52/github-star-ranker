import React from 'react';
import { Repository } from '../../types/github';
import { LANGUAGE_COLORS } from '../../utils/colors';

interface Props {
  repositories: Repository[] | undefined;
  isLoading: boolean;
  language: string;
  onRepoClick: (repo: Repository) => void;
}

export const MobileStarGrid: React.FC<Props> = ({ repositories, isLoading, language, onRepoClick }) => {
  const color = LANGUAGE_COLORS[language] || '#ffffff';

  if (isLoading) {
    return (
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <div style={{
          width: '24px', height: '24px',
          border: `2px solid ${color}40`,
          borderTop: `2px solid ${color}`,
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite',
        }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <div style={{
      position: 'absolute', inset: 0, zIndex: 1,
      paddingTop: '56px', paddingBottom: '24px',
      overflowY: 'auto', WebkitOverflowScrolling: 'touch',
    }}>
      {/* ヘッダー */}
      <div style={{
        padding: '16px 20px 8px',
        animation: 'fadeIn 0.5s ease-out',
      }}>
        <h2 style={{
          fontSize: '18px', fontWeight: 700, margin: 0,
          color: '#fff',
        }}>
          Top {language}
        </h2>
        <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', margin: '4px 0 0' }}>
          {repositories?.length || 0} repositories by stars
        </p>
      </div>

      {/* ランキングリスト */}
      <div style={{ padding: '8px 16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {repositories?.map((repo, index) => (
          <div
            key={repo.id}
            onClick={() => onRepoClick(repo)}
            style={{
              padding: '16px',
              borderRadius: '16px',
              border: '1px solid rgba(255,255,255,0.06)',
              background: index === 0
                ? `linear-gradient(135deg, ${color}15, ${color}05)`
                : 'rgba(255,255,255,0.02)',
              backdropFilter: 'blur(12px)',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              animation: `slideIn 0.4s ease-out ${index * 0.03}s both`,
              display: 'flex', alignItems: 'center', gap: '14px',
            }}
          >
            {/* ランク */}
            <div style={{
              width: '32px', height: '32px',
              borderRadius: '50%',
              background: index < 3 ? `${color}20` : 'rgba(255,255,255,0.05)',
              border: index < 3 ? `1px solid ${color}40` : '1px solid rgba(255,255,255,0.06)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '13px', fontWeight: 700,
              color: index < 3 ? color : 'rgba(255,255,255,0.4)',
              flexShrink: 0,
              boxShadow: index === 0 ? `0 0 20px ${color}30` : 'none',
            }}>
              {index + 1}
            </div>

            {/* リポジトリ情報 */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{
                fontSize: '14px', fontWeight: 700, color: '#fff',
                overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
              }}>
                {repo.name}
              </div>
              <div style={{
                fontSize: '11px', color: 'rgba(255,255,255,0.4)',
                overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                marginTop: '2px',
              }}>
                {repo.owner.login}
              </div>
            </div>

            {/* スター数 */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: '4px',
              fontSize: '13px', fontWeight: 700,
              color: index < 3 ? '#f7df1e' : 'rgba(255,255,255,0.5)',
              flexShrink: 0,
            }}>
              <span style={{ fontSize: '11px' }}>★</span>
              {formatStars(repo.stargazers_count)}
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(-12px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  );
};

function formatStars(count: number): string {
  if (count >= 1000) return `${(count / 1000).toFixed(1)}k`;
  return count.toString();
}
