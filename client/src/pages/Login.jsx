import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Loader from '../components/Loader';
import { Droplet, LogIn } from '../components/Icons';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    const result = await login(email, password);
    setLoading(false);

    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.message);
    }
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: 'calc(100vh - 180px)',
      padding: '2rem 1rem'
    }}>
      {loading && <Loader fullScreen={true} />}
      
      <div className="glass" style={{
        width: '100%',
        maxWidth: '400px',
        textAlign: 'center',
        background: '#ffffff'
      }}>
        {/* Simple Brand Droplet Header */}
        <div style={{
          display: 'inline-flex',
          padding: '10px',
          background: 'var(--primary-light, #fef2f2)',
          border: '1px solid var(--primary-light-border, #fca5a5)',
          borderRadius: '50%',
          color: 'var(--primary)',
          marginBottom: '1rem'
        }}>
          <Droplet size={24} />
        </div>

        <h2 style={{
          fontSize: '1.5rem',
          fontWeight: '700',
          fontFamily: 'var(--font-heading)',
          color: 'var(--text-color)',
          marginBottom: '0.25rem'
        }}>
          Welcome Back
        </h2>
        <p style={{
          color: 'var(--text-secondary)',
          fontSize: '0.9rem',
          marginBottom: '1.75rem'
        }}>
          Log in to manage requests and donations
        </p>

        {error && (
          <div className="alert alert-danger" style={{ textAlign: 'left' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group" style={{ textAlign: 'left' }}>
            <label className="form-label">Email Address</label>
            <input
              type="email"
              className="form-control"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group" style={{ textAlign: 'left', marginBottom: '1.75rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <label className="form-label" style={{ marginBottom: 0 }}>Password</label>
            </div>
            <input
              type="password"
              className="form-control"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginBottom: '1.5rem', height: '42px' }}>
            <LogIn size={16} style={{ marginRight: '6px' }} />
            Sign In
          </button>
        </form>

        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
          Don't have an account?{' '}
          <Link to="/register" style={{
            color: 'var(--primary)',
            textDecoration: 'none',
            fontWeight: '600'
          }}>
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
