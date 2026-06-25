import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Home = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      {/* Background glowing ambient elements */}
      <div style={{
        position: 'fixed',
        top: '20%',
        left: '10%',
        width: '300px',
        height: '300px',
        background: 'rgba(230, 57, 70, 0.08)',
        borderRadius: '50%',
        filter: 'blur(80px)',
        zIndex: 1,
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'fixed',
        bottom: '15%',
        right: '10%',
        width: '350px',
        height: '350px',
        background: 'rgba(255, 107, 107, 0.05)',
        borderRadius: '50%',
        filter: 'blur(100px)',
        zIndex: 1,
        pointerEvents: 'none'
      }} />

      {/* Hero Content */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        padding: '4rem 1rem 3rem 1rem',
        position: 'relative',
        zIndex: 2
      }}>
        {/* Floating Blood Drop Icon */}
        <div className="float-animation" style={{
          fontSize: '5rem',
          marginBottom: '1.5rem',
          filter: 'drop-shadow(0 0 25px rgba(230, 57, 70, 0.6))',
          display: 'inline-block'
        }}>
          🩸
        </div>

        {/* Title */}
        <h1 className="neon-text" style={{
          fontSize: '4rem',
          fontWeight: '900',
          fontFamily: 'Poppins, sans-serif',
          marginBottom: '1rem',
          letterSpacing: '-1px',
          lineHeight: '1.1'
        }}>
          Every Drop Counts
        </h1>

        {/* Subtext */}
        <p style={{
          fontSize: '1.25rem',
          color: 'rgba(255, 255, 255, 0.8)',
          maxWidth: '600px',
          marginBottom: '2.5rem',
          lineHeight: '1.6',
          fontWeight: '400'
        }}>
          Connect blood donors with those in need — instantly. Join our community-driven network and help save lives today.
        </p>

        {/* Action CTAs */}
        <div style={{
          display: 'flex',
          gap: '1.5rem',
          flexWrap: 'wrap',
          justifyContent: 'center',
          marginBottom: '5rem'
        }}>
          <Link to={isAuthenticated ? "/search" : "/login"} className="btn btn-primary">
            Find a Donor
          </Link>
          <Link to={isAuthenticated ? "/requests" : "/login"} className="btn btn-secondary">
            Request Blood
          </Link>
        </div>

        {/* Hardcoded Stats Cards */}
        <div style={{
          width: '100%',
          maxWidth: '900px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '2rem'
        }}>
          {/* Stat 1 */}
          <div className="glass glass-hover" style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '2rem 1.5rem'
          }}>
            <h3 style={{
              fontSize: '2.5rem',
              fontWeight: '800',
              color: '#ffffff',
              marginBottom: '0.5rem',
              fontFamily: 'Poppins, sans-serif',
              textShadow: '0 0 15px rgba(255, 255, 255, 0.2)'
            }}>
              1,240+
            </h3>
            <p style={{
              color: '#ff6b6b',
              fontWeight: '600',
              fontSize: '0.85rem',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}>
              Active Donors
            </p>
          </div>

          {/* Stat 2 */}
          <div className="glass glass-hover" style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '2rem 1.5rem'
          }}>
            <h3 style={{
              fontSize: '2.5rem',
              fontWeight: '800',
              color: '#ffffff',
              marginBottom: '0.5rem',
              fontFamily: 'Poppins, sans-serif',
              textShadow: '0 0 15px rgba(255, 255, 255, 0.2)'
            }}>
              850+
            </h3>
            <p style={{
              color: '#ff6b6b',
              fontWeight: '600',
              fontSize: '0.85rem',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}>
              Requests Fulfilled
            </p>
          </div>

          {/* Stat 3 */}
          <div className="glass glass-hover" style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '2rem 1.5rem'
          }}>
            <h3 style={{
              fontSize: '2.5rem',
              fontWeight: '800',
              color: '#ffffff',
              marginBottom: '0.5rem',
              fontFamily: 'Poppins, sans-serif',
              textShadow: '0 0 15px rgba(255, 255, 255, 0.2)'
            }}>
              45+
            </h3>
            <p style={{
              color: '#ff6b6b',
              fontWeight: '600',
              fontSize: '0.85rem',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}>
              Cities Covered
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
