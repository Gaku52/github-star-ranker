import React from 'react';
import { useUserDetail, useUserRepos } from '../../hooks/useRepositories';

interface Props {
  username: string;
  onBack: () => void;
  onClose: () => void;
}

export const MobileUserDetail: React.FC<Props> = ({ username, onBack, onClose }) => {
  const { data: user, isLoading: userLoading } = useUserDetail(username);
  const { data: repos, isLoading: reposLoading } = useUserRepos(username);

  return (
    <div style={{
      position: 'relative', zIndex: 1,
      height: '100%', overflowY: 'auto',
      WebkitOverflowScrolling: 'touch',
      padding: '20px',
      animation: 'slideUp 0.4s ease-out',
    }}>
      {/* ナビゲーション */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button onClick={onBack} style={{
          background: 'none', border: 'none', color: 'rgba(255,255,255,0.6)',
          fontSize: '14px', cursor: 'pointer', padding: '8px 0',
          fontFamily: 'Inter, sans-serif',
        }}>
          ← Back
        </button>
        <button onClick={onClose} style={{
          background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)',
          fontSize: '18px', cursor: 'pointer', padding: '8px',
          fontFamily: 'Inter, sans-serif',
        }}>
          ✕
        </button>
      </div>

      {userLoading ? (
        <div style={{ textAlign: 'center', padding: '60px 0', color: 'rgba(255,255,255,0.4)' }}>
          Loading...
        </div>
      ) : user && (
        <>
          {/* プロフィールカード */}
          <div style={{
            marginTop: '16px', padding: '28px 24px',
            borderRadius: '20px',
            border: '1px solid rgba(255,255,255,0.06)',
            background: 'rgba(255,255,255,0.02)',
            backdropFilter: 'blur(20px)',
            textAlign: 'center',
          }}>
            <img
              src={user.avatar_url}
              alt={user.login}
              style={{
                width: '80px', height: '80px',
                borderRadius: '50%',
                border: '2px solid rgba(255,255,255,0.1)',
                marginBottom: '12px',
              }}
            />
            <h2 style={{ fontSize: '20px', fontWeight: 900, margin: 0 }}>
              {user.name || user.login}
            </h2>
            <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', margin: '4px 0 0' }}>
              @{user.login}
            </p>
            {user.bio && (
              <p style={{
                fontSize: '13px', color: 'rgba(255,255,255,0.6)',
                lineHeight: 1.5, margin: '12px 0 0',
              }}>
                {user.bio}
              </p>
            )}

            {/* スタッツ */}
            <div style={{
              display: 'flex', justifyContent: 'space-around',
              marginTop: '20px', padding: '14px',
              borderRadius: '12px',
              background: 'rgba(0,0,0,0.3)',
            }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontWeight: 700, fontSize: '16px' }}>{user.followers}</div>
                <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)', marginTop: '2px' }}>Followers</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontWeight: 700, fontSize: '16px' }}>{user.following}</div>
                <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)', marginTop: '2px' }}>Following</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontWeight: 700, fontSize: '16px' }}>{user.public_repos}</div>
                <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)', marginTop: '2px' }}>Repos</div>
              </div>
            </div>
          </div>

          {/* リポジトリ一覧 */}
          <h3 style={{
            fontSize: '14px', fontWeight: 700,
            color: 'rgba(255,255,255,0.6)',
            margin: '24px 0 12px',
          }}>
            Top Repositories
          </h3>

          {reposLoading ? (
            <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.3)', padding: '20px' }}>Loading...</div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingBottom: '40px' }}>
              {repos?.map((repo) => (
                <div key={repo.id} style={{
                  padding: '14px 16px',
                  borderRadius: '12px',
                  border: '1px solid rgba(255,255,255,0.04)',
                  background: 'rgba(255,255,255,0.02)',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                }}>
                  <span style={{
                    fontSize: '13px', fontWeight: 700,
                    overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                    maxWidth: '70%',
                  }}>
                    {repo.name}
                  </span>
                  <span style={{
                    fontSize: '12px', color: 'rgba(255,255,255,0.5)',
                    display: 'flex', alignItems: 'center', gap: '3px',
                  }}>
                    <span style={{ color: '#f7df1e', fontSize: '10px' }}>★</span>
                    {repo.stargazers_count.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};
