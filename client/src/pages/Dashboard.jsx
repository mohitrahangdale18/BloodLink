import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import api from '../api/axios';
import Loader from '../components/Loader';
import { Droplet, User, Search, FileText, Activity, MapPin } from '../components/Icons';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [donorProfile, setDonorProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDonorProfile = async () => {
      try {
        const response = await api.get('/donors/profile');
        if (response.data.success) {
          setDonorProfile(response.data.data);
        }
      } catch (err) {
        console.error('Error fetching donor profile:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchDonorProfile();
  }, []);

  if (loading) {
    return <Loader fullScreen={false} />;
  }

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      {/* Welcome Banner */}
      <div className="glass" style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '2.25rem',
        marginBottom: '2rem',
        background: '#ffffff'
      }}>
        <div style={{ textAlign: 'left' }}>
          <h2 style={{
            fontSize: '1.75rem',
            fontWeight: '700',
            fontFamily: 'var(--font-heading)',
            color: 'var(--text-color)',
            marginBottom: '0.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            Welcome back, {user?.name}
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            Account Role:{' '}
            <span style={{ 
              color: 'var(--primary)', 
              fontWeight: '700', 
              textTransform: 'capitalize',
              background: '#fef2f2',
              padding: '2px 8px',
              borderRadius: '4px',
              fontSize: '0.8rem',
              border: '1px solid #fca5a5'
            }}>
              {user?.role}
            </span>
          </p>
        </div>

        {/* Blood Group Circle badge */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#fef2f2',
          border: '1px solid var(--primary-light-border, #fca5a5)',
          borderRadius: '50%',
          width: '72px',
          height: '72px',
          marginTop: '1rem',
          boxShadow: '0 2px 4px rgba(220, 38, 38, 0.05)'
        }}>
          <span style={{
            fontSize: '1.6rem',
            fontWeight: '800',
            color: 'var(--primary)',
            fontFamily: 'var(--font-heading)',
            lineHeight: '1'
          }}>
            {user?.bloodGroup}
          </span>
          <span style={{ fontSize: '0.65rem', fontWeight: '700', color: 'var(--text-secondary)', textTransform: 'uppercase', marginTop: '2px' }}>
            Group
          </span>
        </div>
      </div>

      {/* Grid of stats */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '1.5rem',
        marginBottom: '2rem'
      }}>
        {/* Donor Profile Stats card */}
        <div className="glass" style={{ textAlign: 'left', background: '#ffffff' }}>
          <h3 style={{ 
            fontSize: '1.05rem', 
            color: 'var(--text-color)', 
            marginBottom: '1.25rem', 
            fontFamily: 'var(--font-heading)', 
            fontWeight: '700',
            borderBottom: '1px solid var(--border-color)',
            paddingBottom: '0.75rem',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <Activity size={18} color="var(--primary)" />
            Donor Availability Status
          </h3>
          {donorProfile ? (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                <span style={{ color: 'var(--text-secondary)', marginRight: '10px', fontSize: '0.9rem' }}>Status:</span>
                <span className={`badge ${donorProfile.isAvailable ? 'badge-green' : 'badge-red'}`} style={{ fontSize: '0.75rem', padding: '4px 10px' }}>
                  {donorProfile.isAvailable ? 'Available to Donate' : 'Unavailable'}
                </span>
              </div>
              <p style={{ color: 'var(--text-color)', fontSize: '0.9rem', marginBottom: '0.6rem' }}>
                Total Donations: <strong style={{ color: 'var(--text-color)' }}>{donorProfile.totalDonations}</strong>
              </p>
              <p style={{ color: 'var(--text-color)', fontSize: '0.9rem' }}>
                Last Donated:{' '}
                <strong style={{ color: 'var(--text-color)' }}>
                  {donorProfile.lastDonated ? new Date(donorProfile.lastDonated).toLocaleDateString() : 'Never'}
                </strong>
              </p>
            </div>
          ) : (
            <div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '1.25rem', lineHeight: '1.5' }}>
                You haven't setup your donor registry profile yet. Make yourself available to save lives in your area!
              </p>
              <Link to="/profile" className="btn btn-primary" style={{ padding: '8px 16px', fontSize: '0.85rem' }}>
                Setup Donor Profile
              </Link>
            </div>
          )}
        </div>

        {/* Contact details */}
        <div className="glass" style={{ textAlign: 'left', background: '#ffffff' }}>
          <h3 style={{ 
            fontSize: '1.05rem', 
            color: 'var(--text-color)', 
            marginBottom: '1.25rem', 
            fontFamily: 'var(--font-heading)', 
            fontWeight: '700',
            borderBottom: '1px solid var(--border-color)',
            paddingBottom: '0.75rem',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <User size={18} color="var(--primary)" />
            Contact Registry Info
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>
              Email: <strong style={{ color: 'var(--text-color)' }}>{user?.email}</strong>
            </p>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>
              Phone: <strong style={{ color: 'var(--text-color)' }}>{user?.phone}</strong>
            </p>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>
              Location: <strong style={{ color: 'var(--text-color)' }}>{user?.city}</strong>
            </p>
          </div>
        </div>
      </div>

      {/* Grid Actions */}
      <div className="glass" style={{ textAlign: 'left', background: '#ffffff' }}>
        <h3 style={{ 
          fontSize: '1.15rem', 
          color: 'var(--text-color)', 
          marginBottom: '1.5rem', 
          fontFamily: 'var(--font-heading)', 
          fontWeight: '700',
          borderBottom: '1px solid var(--border-color)',
          paddingBottom: '0.75rem'
        }}>
          Actions Hub
        </h3>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1.25rem'
        }}>
          <Link to="/profile" className="btn btn-secondary" style={{ display: 'flex', flexDirection: 'column', height: '110px', justifyContent: 'center', textAlign: 'center', gap: '8px' }}>
            <User size={24} color="var(--primary)" />
            <span style={{ fontSize: '0.875rem', fontWeight: '600' }}>Update Donor Profile</span>
          </Link>
          <Link to="/search" className="btn btn-secondary" style={{ display: 'flex', flexDirection: 'column', height: '110px', justifyContent: 'center', textAlign: 'center', gap: '8px' }}>
            <Search size={24} color="var(--primary)" />
            <span style={{ fontSize: '0.875rem', fontWeight: '600' }}>Search Compatible Donors</span>
          </Link>
          <Link to="/requests" className="btn btn-secondary" style={{ display: 'flex', flexDirection: 'column', height: '110px', justifyContent: 'center', textAlign: 'center', gap: '8px' }}>
            <Droplet size={24} color="var(--primary)" />
            <span style={{ fontSize: '0.875rem', fontWeight: '600' }}>Create Blood Request</span>
          </Link>
          <Link to="/requests" className="btn btn-secondary" style={{ display: 'flex', flexDirection: 'column', height: '110px', justifyContent: 'center', textAlign: 'center', gap: '8px' }}>
            <FileText size={24} color="var(--primary)" />
            <span style={{ fontSize: '0.875rem', fontWeight: '600' }}>View Requests Board</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
