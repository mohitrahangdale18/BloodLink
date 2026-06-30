import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Droplet, Search, FileText, Shield } from '../components/Icons';

const Home = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <div style={{ position: 'relative', width: '100%' }}>
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
        {/* Crisp Header Droplet */}
        <div style={{
          display: 'inline-flex',
          padding: '12px',
          background: 'var(--primary-light, #fef2f2)',
          border: '1px solid var(--primary-light-border, #fca5a5)',
          borderRadius: '50%',
          color: 'var(--primary)',
          marginBottom: '1.5rem'
        }}>
          <Droplet size={36} />
        </div>

        {/* Title */}
        <h1 className="neon-text" style={{
          fontSize: '3.25rem',
          fontWeight: '800',
          marginBottom: '1.25rem',
          letterSpacing: '-1px',
          lineHeight: '1.15',
          color: 'var(--text-color)'
        }}>
          Every Drop Counts, <br/>
          <span style={{ color: 'var(--primary)' }}>Every Second Matters</span>
        </h1>

        {/* Subtext */}
        <p style={{
          fontSize: '1.15rem',
          color: 'var(--text-secondary)',
          maxWidth: '640px',
          marginBottom: '2.5rem',
          lineHeight: '1.6',
          fontWeight: '400'
        }}>
          Connect blood donors with families in need instantly. Join a trusted, community-driven network built to coordinate emergency support and save lives.
        </p>

        {/* Action CTAs */}
        <div style={{
          display: 'flex',
          gap: '1rem',
          flexWrap: 'wrap',
          justifyContent: 'center',
          marginBottom: '4.5rem'
        }}>
          <Link to={isAuthenticated ? "/search" : "/login"} className="btn btn-primary" style={{ padding: '12px 28px', fontSize: '0.95rem' }}>
            <Search size={18} style={{ marginRight: '6px' }} />
            Find a Donor
          </Link>
          <Link to={isAuthenticated ? "/requests" : "/login"} className="btn btn-secondary" style={{ padding: '12px 28px', fontSize: '0.95rem' }}>
            <FileText size={18} style={{ marginRight: '6px' }} />
            Request Blood
          </Link>
        </div>

        {/* Highlight features section */}
        <div style={{
          width: '100%',
          maxWidth: '960px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '2rem',
          marginBottom: '5rem',
          textAlign: 'left'
        }}>
          {/* Feature 1 */}
          <div className="glass" style={{ padding: '1.75rem' }}>
            <div style={{
              color: 'var(--primary)',
              background: '#fef2f2',
              width: '40px',
              height: '40px',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1.25rem'
            }}>
              <Search size={20} />
            </div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '750', marginBottom: '0.5rem', fontFamily: 'var(--font-heading)' }}>
              Verified Registries
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.5' }}>
              Search our national registry to locate compatible blood groups matching your exact region and city.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="glass" style={{ padding: '1.75rem' }}>
            <div style={{
              color: 'var(--primary)',
              background: '#fef2f2',
              width: '40px',
              height: '40px',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1.25rem'
            }}>
              <FileText size={20} />
            </div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '750', marginBottom: '0.5rem', fontFamily: 'var(--font-heading)' }}>
              Emergency Requests
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.5' }}>
              Create urgent request entries with hospital information to alert regional donors immediately.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="glass" style={{ padding: '1.75rem' }}>
            <div style={{
              color: 'var(--primary)',
              background: '#fef2f2',
              width: '40px',
              height: '40px',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1.25rem'
            }}>
              <Shield size={20} />
            </div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '750', marginBottom: '0.5rem', fontFamily: 'var(--font-heading)' }}>
              Secure Network
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.5' }}>
              Facilitate direct, off-platform communication. Reach out to registry matches directly via telephone.
            </p>
          </div>
        </div>

        {/* Minimalist Stats Cards */}
        <div style={{
          width: '100%',
          maxWidth: '900px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1.5rem',
          borderTop: '1px solid var(--border-color)',
          paddingTop: '3rem'
        }}>
          {/* Stat 1 */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '1rem'
          }}>
            <h3 style={{
              fontSize: '2.5rem',
              fontWeight: '800',
              color: 'var(--text-color)',
              marginBottom: '0.25rem',
              fontFamily: 'var(--font-heading)'
            }}>
              1,240+
            </h3>
            <p style={{
              color: 'var(--text-secondary)',
              fontWeight: '600',
              fontSize: '0.8rem',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              Active Donors
            </p>
          </div>

          {/* Stat 2 */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '1rem'
          }}>
            <h3 style={{
              fontSize: '2.5rem',
              fontWeight: '800',
              color: 'var(--text-color)',
              marginBottom: '0.25rem',
              fontFamily: 'var(--font-heading)'
            }}>
              850+
            </h3>
            <p style={{
              color: 'var(--text-secondary)',
              fontWeight: '600',
              fontSize: '0.8rem',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              Fulfilled Requests
            </p>
          </div>

          {/* Stat 3 */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '1rem'
          }}>
            <h3 style={{
              fontSize: '2.5rem',
              fontWeight: '800',
              color: 'var(--text-color)',
              marginBottom: '0.25rem',
              fontFamily: 'var(--font-heading)'
            }}>
              45+
            </h3>
            <p style={{
              color: 'var(--text-secondary)',
              fontWeight: '600',
              fontSize: '0.8rem',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
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
