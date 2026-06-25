import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Loader from '../components/Loader';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    bloodGroup: '',
    city: '',
    phone: '',
    role: 'donor'
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const { name, email, password, bloodGroup, city, phone } = formData;
    if (!name || !email || !password || !bloodGroup || !city || !phone) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    const result = await register(formData);
    setLoading(false);

    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.message);
    }
  };

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: 'calc(100vh - 120px)',
      padding: '2rem 1rem'
    }}>
      {loading && <Loader fullScreen={true} />}

      <div className="glass" style={{
        width: '100%',
        maxWidth: '520px',
        textAlign: 'center',
        border: '1px solid rgba(230, 57, 70, 0.25)',
        boxShadow: '0 0 30px rgba(230, 57, 70, 0.15)',
        marginTop: '1rem',
        marginBottom: '1rem'
      }}>
        <h2 className="neon-text" style={{
          fontSize: '2rem',
          fontWeight: '700',
          fontFamily: 'Poppins, sans-serif',
          marginBottom: '0.5rem'
        }}>
          Join the Network
        </h2>
        <p style={{
          color: 'rgba(255, 255, 255, 0.6)',
          fontSize: '0.9rem',
          marginBottom: '2rem'
        }}>
          Register as a donor or recipient to start saving lives
        </p>

        {error && (
          <div className="alert alert-danger" style={{ textAlign: 'left' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem',
            textAlign: 'left'
          }}>
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                name="name"
                className="form-control"
                placeholder="e.g. John Doe"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="e.g. john@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                type="password"
                name="password"
                className="form-control"
                placeholder="At least 6 chars"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Blood Group</label>
              <select
                name="bloodGroup"
                className="form-control"
                value={formData.bloodGroup}
                onChange={handleChange}
                required
              >
                <option value="">Select Group</option>
                {bloodGroups.map((group) => (
                  <option key={group} value={group}>
                    {group}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">City</label>
              <input
                type="text"
                name="city"
                className="form-control"
                placeholder="e.g. Nagpur"
                value={formData.city}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Phone Number</label>
              <input
                type="tel"
                name="phone"
                className="form-control"
                placeholder="e.g. 9876543210"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group" style={{ textAlign: 'left', marginTop: '0.5rem', marginBottom: '2rem' }}>
            <label className="form-label">Register As</label>
            <div style={{ display: 'flex', gap: '2rem', marginTop: '0.5rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', color: 'rgba(255,255,255,0.8)' }}>
                <input
                  type="radio"
                  name="role"
                  value="donor"
                  checked={formData.role === 'donor'}
                  onChange={handleChange}
                  style={{ marginRight: '8px', accentColor: '#e63946' }}
                />
                Donor
              </label>
              <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', color: 'rgba(255,255,255,0.8)' }}>
                <input
                  type="radio"
                  name="role"
                  value="recipient"
                  checked={formData.role === 'recipient'}
                  onChange={handleChange}
                  style={{ marginRight: '8px', accentColor: '#e63946' }}
                />
                Recipient
              </label>
            </div>
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginBottom: '1.5rem' }}>
            Register Account
          </button>
        </form>

        <p style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '0.9rem' }}>
          Already have an account?{' '}
          <Link to="/login" style={{
            color: '#e63946',
            textDecoration: 'none',
            fontWeight: '600'
          }}>
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
