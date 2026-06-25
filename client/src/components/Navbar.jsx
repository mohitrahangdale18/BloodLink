import React, { useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { isAuthenticated, logout, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navLinkStyle = ({ isActive }) => ({
    color: isActive ? '#e63946' : '#ffffff',
    textShadow: isActive ? '0 0 10px rgba(230, 57, 70, 0.5)' : 'none',
    fontWeight: isActive ? '600' : '400',
    textDecoration: 'none',
    margin: '0 1rem',
    fontSize: '0.95rem',
    transition: 'all 0.3s ease'
  });

  return (
    <nav className="glass" style={{
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1.2rem 2rem',
      borderRadius: '0 0 16px 16px',
      borderTop: 'none',
      borderLeft: 'none',
      borderRight: 'none',
      background: 'rgba(10, 10, 15, 0.8)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      boxShadow: '0 4px 30px rgba(0, 0, 0, 0.5)',
      margin: '0'
    }}>
      {/* Brand Logo */}
      <Link to="/" style={{
        display: 'flex',
        alignItems: 'center',
        textDecoration: 'none',
        fontSize: '1.5rem',
        fontWeight: '800',
        fontFamily: 'Poppins, sans-serif',
        color: '#ffffff',
        letterSpacing: '1px'
      }}>
        <span style={{ marginRight: '8px' }}>🩸</span>
        <span style={{
          color: '#e63946',
          textShadow: '0 0 15px rgba(230, 57, 70, 0.6)'
        }}>Blood</span>
        <span>Link</span>
      </Link>

      {/* Nav Menu */}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <NavLink to="/" style={navLinkStyle}>Home</NavLink>
        
        {isAuthenticated ? (
          <>
            <NavLink to="/search" style={navLinkStyle}>Search</NavLink>
            <NavLink to="/requests" style={navLinkStyle}>Requests</NavLink>
            <NavLink to="/dashboard" style={navLinkStyle}>Dashboard</NavLink>
            
            <div style={{
              display: 'flex',
              alignItems: 'center',
              marginLeft: '1.5rem',
              borderLeft: '1px solid rgba(255, 255, 255, 0.1)',
              paddingLeft: '1.5rem'
            }}>
              <span style={{
                color: 'rgba(255, 255, 255, 0.7)',
                fontSize: '0.9rem',
                marginRight: '1.2rem',
                fontWeight: '500'
              }}>
                {user?.name}
              </span>
              <button 
                onClick={handleLogout}
                className="btn btn-danger"
                style={{
                  padding: '6px 14px',
                  fontSize: '0.85rem',
                  borderRadius: '6px'
                }}
              >
                Logout
              </button>
            </div>
          </>
        ) : (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            marginLeft: '1.5rem',
            borderLeft: '1px solid rgba(255, 255, 255, 0.1)',
            paddingLeft: '1.5rem'
          }}>
            <Link to="/login" style={{
              color: '#ffffff',
              textDecoration: 'none',
              marginRight: '1.5rem',
              fontSize: '0.95rem',
              fontWeight: '500',
              transition: 'color 0.2s ease'
            }}
            onMouseOver={(e) => e.target.style.color = '#e63946'}
            onMouseOut={(e) => e.target.style.color = '#ffffff'}
            >
              Login
            </Link>
            <Link to="/register" className="btn btn-primary" style={{
              padding: '8px 18px',
              fontSize: '0.85rem',
              borderRadius: '6px'
            }}>
              Register
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
