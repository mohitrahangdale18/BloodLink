import React, { useContext } from 'react';
  import { Link, NavLink, useNavigate } from 'react-router-dom';
  import { AuthContext } from '../context/AuthContext';
  import { Droplet, Search, FileText, Activity, User, LogOut, LogIn, UserPlus } from './Icons';

  const Navbar = () => {
    const { isAuthenticated, logout, user } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
      logout();
      navigate('/');
    };

    const navLinkClass = ({ isActive }) => 
      `nav-link ${isActive ? 'active' : ''}`;

    return (
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        background: '#ffffff',
        borderBottom: '1px solid var(--border-color)',
        padding: '0.75rem 2rem'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          {/* Brand Logo */}
          <Link to="/" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            textDecoration: 'none',
            fontSize: '1.25rem',
            fontWeight: '700',
            fontFamily: 'var(--font-heading)',
            color: 'var(--text-color)',
            letterSpacing: '-0.5px'
          }}>
            <Droplet size={24} color="var(--primary)" />
            <span>
              <span style={{ color: 'var(--primary)' }}>Blood</span>Link
            </span>
          </Link>

          {/* Nav Menu */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <NavLink to="/" className={navLinkClass}>
              Home
            </NavLink>
            
            {isAuthenticated ? (
              <>
                <NavLink to="/search" className={navLinkClass}>
                  <Search size={16} style={{ marginRight: '6px' }} />
                  Search Donors
                </NavLink>
                <NavLink to="/requests" className={navLinkClass}>
                  <FileText size={16} style={{ marginRight: '6px' }} />
                  Requests
                </NavLink>
                <NavLink to="/dashboard" className={navLinkClass}>
                  <Activity size={16} style={{ marginRight: '6px' }} />
                  Dashboard
                </NavLink>
                
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginLeft: '0.5rem',
                  borderLeft: '1px solid var(--border-color)',
                  paddingLeft: '1rem',
                  gap: '1rem'
                }}>
                  <Link to="/profile" style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    color: 'var(--text-secondary)',
                    textDecoration: 'none',
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    transition: 'color 0.2s'
                  }}
                  className="profile-link"
                  >
                    <User size={16} />
                    <span>{user?.name}</span>
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="btn btn-danger"
                    style={{
                      padding: '6px 12px',
                      fontSize: '0.8rem',
                      borderRadius: '4px'
                    }}
                  >
                    <LogOut size={14} style={{ marginRight: '4px' }} />
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                marginLeft: '0.5rem',
                borderLeft: '1px solid var(--border-color)',
                paddingLeft: '1rem',
                gap: '0.75rem'
              }}>
                <Link to="/login" style={{
                  color: 'var(--text-secondary)',
                  textDecoration: 'none',
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  transition: 'color 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '8px 12px'
                }}
                onMouseOver={(e) => e.currentTarget.style.color = 'var(--primary)'}
                onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
                >
                  <LogIn size={15} />
                  Login
                </Link>
                <Link to="/register" className="btn btn-primary" style={{
                  padding: '8px 16px',
                  fontSize: '0.85rem',
                  borderRadius: '4px'
                }}>
                  <UserPlus size={15} style={{ marginRight: '4px' }} />
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Global style updates for NavLink */}
        <style>{`
          .nav-link {
            color: var(--text-secondary);
            font-weight: 500;
            text-decoration: none;
            padding: 8px 12px;
            font-size: 0.9rem;
            transition: all 0.15s ease;
            border-radius: 4px;
            display: inline-flex;
            align-items: center;
          }
          .nav-link:hover {
            color: var(--primary);
            background-color: #f8fafc;
          }
          .nav-link.active {
            color: var(--primary);
            background-color: #fef2f2;
            font-weight: 600;
          }
          .profile-link:hover {
            color: var(--primary) !important;
          }
        `}</style>
      </header>
    );
  };

  export default Navbar;
