import React from 'react';
import { useUserDetail, useUserRepos } from '../../hooks/useRepositories';

interface Props {
  username: string;
  onBack: () => void;
  onClose: () => void;
}

export const UserDetailPanel: React.FC<Props> = ({ username, onBack, onClose }) => {
  const { data: user, isLoading: userLoading } = useUserDetail(username);
  const { data: repos, isLoading: reposLoading } = useUserRepos(username);

  return (
    <div className="glass-panel" style={{
      position: 'absolute', right: '40px', top: '50%', transform: 'translateY(-50%)',
      width: '400px', maxWidth: '90vw', maxHeight: '80vh', overflowY: 'auto',
      padding: '24px', zIndex: 20,
      animation: 'slideIn 0.3s ease-out'
    }}>
      <style>{`
        @keyframes slideIn {
          from { transform: translateY(-50%) translateX(40px); opacity: 0; }
          to { transform: translateY(-50%) translateX(0); opacity: 1; }
        }
      `}</style>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <button onClick={onBack} style={{
          background: 'none', border: 'none', color: '#fff', cursor: 'pointer',
          display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px'
        }}>
          ← Back
        </button>
        <button onClick={onClose} aria-label="Close" style={{
          background: 'none', border: 'none', color: '#fff', cursor: 'pointer',
          fontSize: '24px', lineHeight: 1
        }}>
          ✕
        </button>
      </div>

      {userLoading ? (
        <div style={{ textAlign: 'center', padding: '40px 0', opacity: 0.5 }}>Loading user...</div>
      ) : user && (
        <>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '24px' }}>
            <img src={user.avatar_url} alt={user.login} style={{ width: '96px', height: '96px', borderRadius: '50%', marginBottom: '16px' }} />
            <h2 style={{ margin: 0, fontSize: '24px' }}>{user.name || user.login}</h2>
            <p style={{ color: 'rgba(255,255,255,0.5)', margin: '4px 0 16px 0' }}>@{user.login}</p>
            {user.bio && <p style={{ textAlign: 'center', fontSize: '14px', lineHeight: 1.5, color: 'rgba(255,255,255,0.8)' }}>{user.bio}</p>}
          </div>

          <div style={{
            display: 'flex', justifyContent: 'space-around',
            background: 'rgba(0,0,0,0.2)', padding: '16px', borderRadius: '12px', marginBottom: '24px'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontWeight: 700, fontSize: '18px' }}>{user.followers.toLocaleString()}</div>
              <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)' }}>Followers</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontWeight: 700, fontSize: '18px' }}>{user.following.toLocaleString()}</div>
              <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)' }}>Following</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontWeight: 700, fontSize: '18px' }}>{user.public_repos}</div>
              <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)' }}>Repos</div>
            </div>
          </div>

          <h3 style={{ fontSize: '16px', marginBottom: '12px', color: 'rgba(255,255,255,0.7)' }}>Top Repositories</h3>
          {reposLoading ? (
            <div style={{ textAlign: 'center', opacity: 0.5 }}>Loading repos...</div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {repos?.map((repo) => (
                <a
                  key={repo.id}
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex', justifyContent: 'space-between', padding: '12px',
                    background: 'rgba(255,255,255,0.04)', borderRadius: '8px',
                    textDecoration: 'none', color: '#fff', transition: 'background 0.2s'
                  }}
                >
                  <span style={{
                    fontWeight: 700, fontSize: '14px', overflow: 'hidden',
                    textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '70%'
                  }}>
                    {repo.name}
                  </span>
                  <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)' }}>
                    ★ {repo.stargazers_count.toLocaleString()}
                  </span>
                </a>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};
