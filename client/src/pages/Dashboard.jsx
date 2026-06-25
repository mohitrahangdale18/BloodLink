import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import api from '../api/axios';
import Loader from '../components/Loader';

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
        padding: '2.5rem',
        marginBottom: '2rem',
        border: '1px solid rgba(230, 57, 70, 0.25)',
        boxShadow: '0 0 30px rgba(230, 57, 70, 0.15)'
      }}>
        <div style={{ textAlign: 'left' }}>
          <h2 style={{
            fontSize: '2.25rem',
            fontWeight: '800',
            fontFamily: 'Poppins, sans-serif',
            color: '#ffffff',
            marginBottom: '0.5rem'
          }}>
            Welcome back, {user?.name} 🩸
          </h2>
          <p style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '1rem' }}>
            Account Role: <span style={{ color: '#ff6b6b', fontWeight: '600', textTransform: 'capitalize' }}>{user?.role}</span>
          </p>
        </div>

        {/* Blood Group Neon circle badge */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'rgba(230, 57, 70, 0.1)',
          border: '2px solid #e63946',
          borderRadius: '50%',
          width: '90px',
          height: '90px',
          boxShadow: '0 0 20px rgba(230, 57, 70, 0.4)',
          marginTop: '1rem'
        }}>
          <span style={{
            fontSize: '2rem',
            fontWeight: '800',
            color: '#e63946',
            textShadow: '0 0 10px rgba(230, 57, 70, 0.6)',
            fontFamily: 'Poppins, sans-serif'
          }}>
            {user?.bloodGroup}
          </span>
        </div>
      </div>

      {/* Grid of stats */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '1.5rem',
        marginBottom: '2.5rem'
      }}>
        {/* Donor Profile Stats card */}
        <div className="glass glass-hover" style={{ textAlign: 'left' }}>
          <h3 style={{ fontSize: '1.2rem', color: '#ff6b6b', marginBottom: '1.2rem', fontFamily: 'Poppins, sans-serif' }}>
            Donor Availability Status
          </h3>
          {donorProfile ? (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                <span style={{ color: 'rgba(255,255,255,0.6)', marginRight: '10px', fontSize: '0.95rem' }}>Status:</span>
                <span className={`badge ${donorProfile.isAvailable ? 'badge-green' : 'badge-red'}`} style={{ fontSize: '0.8rem' }}>
                  {donorProfile.isAvailable ? 'Available to Donate' : 'Unavailable'}
                </span>
              </div>
              <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.95rem', marginBottom: '0.5rem' }}>
                Total Donations: <strong style={{ color: '#fff' }}>{donorProfile.totalDonations}</strong>
              </p>
              <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.95rem' }}>
                Last Donated:{' '}
                <strong style={{ color: '#fff' }}>
                  {donorProfile.lastDonated ? new Date(donorProfile.lastDonated).toLocaleDateString() : 'Never'}
                </strong>
              </p>
            </div>
          ) : (
            <div>
              <p style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
                You haven't setup your donor registry profile yet. Make yourself available to save lives!
              </p>
              <Link to="/profile" className="btn btn-primary" style={{ padding: '8px 16px', fontSize: '0.85rem' }}>
                Setup Donor Profile
              </Link>
            </div>
          )}
        </div>

        {/* Contact details */}
        <div className="glass glass-hover" style={{ textAlign: 'left' }}>
          <h3 style={{ fontSize: '1.2rem', color: '#ff6b6b', marginBottom: '1.2rem', fontFamily: 'Poppins, sans-serif' }}>
            Contact Registry Info
          </h3>
          <p style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.95rem', marginBottom: '0.6rem' }}>
            Registered Email: <strong style={{ color: '#fff' }}>{user?.email}</strong>
          </p>
          <p style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.95rem', marginBottom: '0.6rem' }}>
            Phone Number: <strong style={{ color: '#fff' }}>{user?.phone}</strong>
          </p>
          <p style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.95rem' }}>
            Registered Location: <strong style={{ color: '#fff' }}>{user?.city}</strong>
          </p>
        </div>
      </div>

      {/* Grid Actions */}
      <div className="glass" style={{ textAlign: 'left' }}>
        <h3 style={{ fontSize: '1.4rem', color: '#ffffff', marginBottom: '1.5rem', fontFamily: 'Poppins, sans-serif' }}>
          Actions Hub
        </h3>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1.2rem'
        }}>
          <Link to="/profile" className="btn btn-secondary" style={{ display: 'flex', flexDirection: 'column', height: '110px', justifyContent: 'center', textAlign: 'center' }}>
            <span style={{ fontSize: '1.5rem', marginBottom: '0.4rem' }}>👤</span>
            <span style={{ fontSize: '0.95rem' }}>Update Donor Profile</span>
          </Link>
          <Link to="/search" className="btn btn-secondary" style={{ display: 'flex', flexDirection: 'column', height: '110px', justifyContent: 'center', textAlign: 'center' }}>
            <span style={{ fontSize: '1.5rem', marginBottom: '0.4rem' }}>🔍</span>
            <span style={{ fontSize: '0.95rem' }}>Search Compatible Donors</span>
          </Link>
          <Link to="/requests" className="btn btn-secondary" style={{ display: 'flex', flexDirection: 'column', height: '110px', justifyContent: 'center', textAlign: 'center' }}>
            <span style={{ fontSize: '1.5rem', marginBottom: '0.4rem' }}>🩸</span>
            <span style={{ fontSize: '0.95rem' }}>Create Blood Request</span>
          </Link>
          <Link to="/requests" className="btn btn-secondary" style={{ display: 'flex', flexDirection: 'column', height: '110px', justifyContent: 'center', textAlign: 'center' }}>
            <span style={{ fontSize: '1.5rem', marginBottom: '0.4rem' }}>📋</span>
            <span style={{ fontSize: '0.95rem' }}>View Requests Board</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
