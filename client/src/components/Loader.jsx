import React from 'react';

const Loader = ({ fullScreen = true }) => {
  const containerStyle = fullScreen ? {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    background: 'rgba(10, 10, 15, 0.85)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)'
  } : {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '2rem',
    width: '100%'
  };

  return (
    <div style={containerStyle}>
      <div style={{ position: 'relative', width: '80px', height: '80px' }}>
        {/* Spin Ring */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          border: '3px solid transparent',
          borderTopColor: '#e63946',
          borderBottomColor: '#ff6b6b',
          borderRadius: '50%',
          animation: 'loader-spin 1.2s linear infinite',
          boxShadow: '0 0 15px rgba(230, 57, 70, 0.4)'
        }} />
        {/* Pulsing Drop */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontSize: '2rem',
          animation: 'loader-pulse 1.5s ease-in-out infinite'
        }}>
          🩸
        </div>
      </div>
      <p style={{
        marginTop: '1.5rem',
        color: '#ff6b6b',
        fontSize: '0.9rem',
        fontWeight: '600',
        letterSpacing: '3px',
        fontFamily: 'Poppins, sans-serif',
        textShadow: '0 0 10px rgba(230, 57, 70, 0.5)'
      }}>
        LOADING...
      </p>

      <style>{`
        @keyframes loader-spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes loader-pulse {
          0% { transform: translate(-50%, -50%) scale(0.9); opacity: 0.7; }
          50% { transform: translate(-50%, -50%) scale(1.15); opacity: 1; }
          100% { transform: translate(-50%, -50%) scale(0.9); opacity: 0.7; }
        }
      `}</style>
    </div>
  );
};

export default Loader;
