import React from 'react';

const Loader = ({ fullScreen = true }) => {
  const containerStyle = fullScreen ? {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    background: 'rgba(255, 255, 255, 0.85)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
    backdropFilter: 'blur(4px)',
    WebkitBackdropFilter: 'blur(4px)'
  } : {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '3rem',
    width: '100%'
  };

  return (
    <div style={containerStyle}>
      <div style={{ position: 'relative', width: '56px', height: '56px' }}>
        {/* Simple crisp modern spinner */}
        <div style={{
          width: '100%',
          height: '100%',
          border: '3px solid #e2e8f0',
          borderTopColor: '#dc2626',
          borderRadius: '50%',
          animation: 'loader-spin 0.8s linear infinite'
        }} />
      </div>
      <p style={{
        marginTop: '1.25rem',
        color: 'var(--text-secondary)',
        fontSize: '0.8rem',
        fontWeight: '700',
        letterSpacing: '1.5px',
        fontFamily: 'var(--font-main)',
        textTransform: 'uppercase'
      }}>
        Loading network data...
      </p>

      <style>{`
        @keyframes loader-spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Loader;
