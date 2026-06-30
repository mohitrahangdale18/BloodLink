import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import api from '../api/axios';
import Loader from '../components/Loader';
import { Droplet, Check, X } from '../components/Icons';

const DonorProfile = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [hasProfile, setHasProfile] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const [formData, setFormData] = useState({
    bloodGroup: user?.bloodGroup || '',
    city: user?.city || '',
    isAvailable: true,
    lastDonated: '',
    totalDonations: 0
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get('/donors/profile');
        if (response.data.success && response.data.data) {
          const profile = response.data.data;
          setFormData({
            bloodGroup: profile.bloodGroup,
            city: profile.city,
            isAvailable: profile.isAvailable,
            lastDonated: profile.lastDonated ? new Date(profile.lastDonated).toISOString().split('T')[0] : '',
            totalDonations: profile.totalDonations
          });
          setHasProfile(true);
        }
      } catch (err) {
        console.error('Error fetching profile:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [user]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleToggleAvailable = async () => {
    if (!hasProfile) {
      setFormData(prev => ({ ...prev, isAvailable: !prev.isAvailable }));
      return;
    }
    
    setSubmitLoading(true);
    try {
      const response = await api.patch('/donors/availability');
      if (response.data.success) {
        setFormData(prev => ({ ...prev, isAvailable: response.data.data.isAvailable }));
        setMessage({ type: 'success', text: `Availability set to ${response.data.data.isAvailable ? 'Available' : 'Unavailable'}` });
      }
    } catch (err) {
      setMessage({ type: 'danger', text: err.response?.data?.message || 'Failed to toggle availability.' });
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });
    setSubmitLoading(true);

    try {
      let response;
      if (hasProfile) {
        response = await api.put('/donors/profile', formData);
      } else {
        response = await api.post('/donors/profile', formData);
        setHasProfile(true);
      }

      if (response.data.success) {
        setMessage({ type: 'success', text: 'Donor profile saved successfully!' });
        setTimeout(() => {
          navigate('/dashboard');
        }, 1500);
      }
    } catch (err) {
      setMessage({ type: 'danger', text: err.response?.data?.message || 'Failed to save donor profile.' });
    } finally {
      setSubmitLoading(false);
    }
  };

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  if (loading) {
    return <Loader fullScreen={false} />;
  }

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: 'calc(100vh - 120px)',
      padding: '2rem 1rem'
    }}>
      {submitLoading && <Loader fullScreen={true} />}

      <div className="glass" style={{
        width: '100%',
        maxWidth: '560px',
        borderColor: 'var(--border-color)',
        background: '#ffffff'
      }}>
        {/* Header Icon */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '1rem'
        }}>
          <div style={{
            display: 'inline-flex',
            padding: '10px',
            background: 'var(--primary-light, #fef2f2)',
            border: '1px solid var(--primary-light-border, #fca5a5)',
            borderRadius: '50%',
            color: 'var(--primary)'
          }}>
            <Droplet size={24} />
          </div>
        </div>

        <h2 style={{
          fontSize: '1.5rem',
          fontWeight: '700',
          fontFamily: 'var(--font-heading)',
          color: 'var(--text-color)',
          marginBottom: '0.25rem',
          textAlign: 'center'
        }}>
          {hasProfile ? 'Update Donor Profile' : 'Setup Donor Profile'}
        </h2>
        <p style={{
          color: 'var(--text-secondary)',
          fontSize: '0.9rem',
          marginBottom: '2rem',
          textAlign: 'center'
        }}>
          Specify details to let hospital registries find your blood matches
        </p>

        {message.text && (
          <div className={`alert alert-${message.type}`} style={{ textAlign: 'left' }}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Availability Toggle Container */}
          <div className="glass" style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '1rem 1.25rem',
            marginBottom: '2rem',
            background: 'var(--bg-color)',
            borderColor: formData.isAvailable ? '#bbf7d0' : 'var(--border-color)',
            boxShadow: 'none'
          }}>
            <div style={{ textAlign: 'left' }}>
              <h4 style={{ fontSize: '0.95rem', fontWeight: '750', color: 'var(--text-color)', marginBottom: '0.2rem' }}>
                Availability Status
              </h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
                {formData.isAvailable ? 'Other members can find you in search' : 'You are temporarily hidden from search'}
              </p>
            </div>

            {/* Custom Toggle Switch */}
            <button
              type="button"
              onClick={handleToggleAvailable}
              style={{
                width: '52px',
                height: '28px',
                borderRadius: '14px',
                background: formData.isAvailable ? '#16a34a' : '#cbd5e1',
                border: 'none',
                cursor: 'pointer',
                position: 'relative',
                transition: 'all 0.2s ease',
                padding: 0
              }}
            >
              <div style={{
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                background: '#fff',
                position: 'absolute',
                top: '4px',
                left: formData.isAvailable ? '28px' : '4px',
                transition: 'all 0.2s cubic-bezier(0.25, 0.8, 0.25, 1)',
                boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)'
              }} />
            </button>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1.2rem',
            textAlign: 'left'
          }}>
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
              <label className="form-label">Current City</label>
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
              <label className="form-label">Total Donations</label>
              <input
                type="number"
                name="totalDonations"
                min="0"
                className="form-control"
                value={formData.totalDonations}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Last Donated Date</label>
              <input
                type="date"
                name="lastDonated"
                className="form-control"
                value={formData.lastDonated}
                onChange={handleChange}
              />
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
            <button
              type="button"
              className="btn btn-secondary"
              style={{ flex: 1 }}
              onClick={() => navigate('/dashboard')}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              style={{ flex: 1.5 }}
            >
              Save Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DonorProfile;
