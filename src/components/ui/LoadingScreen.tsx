import React from 'react';

export const LoadingScreen: React.FC = () => {
  return (
    <div style={{
      position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
      backgroundColor: '#05050a', display: 'flex', flexDirection: 'column',
      justifyContent: 'center', alignItems: 'center', zIndex: 9999
    }}>
      <div style={{
        width: '4px', height: '4px', backgroundColor: '#fff',
        borderRadius: '50%', boxShadow: '0 0 20px 4px rgba(255,255,255,0.8)',
        animation: 'pulse 1.5s infinite ease-in-out'
      }} />
      <div style={{
        position: 'absolute', bottom: '20%', display: 'flex', flexDirection: 'column', alignItems: 'center'
      }}>
        <p style={{
          fontFamily: 'Inter', fontWeight: 300, fontSize: '12px',
          letterSpacing: '0.3em', opacity: 0.5, marginBottom: '16px'
        }}>
          Connecting to the universe...
        </p>
        <div style={{
          width: '200px', height: '1px', background: 'rgba(255,255,255,0.1)', overflow: 'hidden'
        }}>
          <div style={{
            width: '100%', height: '100%', background: '#fff',
            animation: 'progress 2s cubic-bezier(0.4, 0, 0.2, 1) infinite'
          }} />
        </div>
      </div>
      <style>{`
        @keyframes pulse {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(2); opacity: 0.5; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes progress {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};
