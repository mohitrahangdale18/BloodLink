import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import Loader from '../components/Loader';

const SearchDonors = () => {
  const [bloodGroup, setBloodGroup] = useState('');
  const [city, setCity] = useState('');
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Trigger search handler
  const handleSearch = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const queryParams = new URLSearchParams();
      if (bloodGroup) queryParams.append('bloodGroup', bloodGroup);
      if (city) queryParams.append('city', city);

      const response = await api.get(`/donors/search?${queryParams.toString()}`);
      if (response.data.success) {
        setDonors(response.data.data);
      }
    } catch (err) {
      console.error('Search error:', err);
      setError(err.response?.data?.message || 'Failed to search donors.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Initial request loading all available donors
    handleSearch();
  }, []);

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <h2 className="neon-text" style={{
        fontSize: '2.5rem',
        fontWeight: '800',
        fontFamily: 'Poppins, sans-serif',
        marginBottom: '0.5rem',
        textAlign: 'left'
      }}>
        Find Compatible Donors
      </h2>
      <p style={{
        color: 'rgba(255, 255, 255, 0.6)',
        fontSize: '1rem',
        marginBottom: '2rem',
        textAlign: 'left'
      }}>
        Search the national registry for available blood groups. Results include compatible backup groups!
      </p>

      {/* Filter Form Card */}
      <form onSubmit={handleSearch} className="glass" style={{
        padding: '1.5rem',
        marginBottom: '2.5rem',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '1.5rem',
        alignItems: 'flex-end',
        border: '1px solid rgba(230, 57, 70, 0.2)'
      }}>
        <div className="form-group" style={{ flex: 1, minWidth: '200px', marginBottom: 0, textAlign: 'left' }}>
          <label className="form-label">Blood Group Needed</label>
          <select
            className="form-control"
            value={bloodGroup}
            onChange={(e) => setBloodGroup(e.target.value)}
          >
            <option value="">Any Blood Group</option>
            {bloodGroups.map((group) => (
              <option key={group} value={group}>
                {group}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group" style={{ flex: 2, minWidth: '200px', marginBottom: 0, textAlign: 'left' }}>
          <label className="form-label">City</label>
          <input
            type="text"
            className="form-control"
            placeholder="e.g. Nagpur"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary" style={{ padding: '12px 30px' }}>
          Search Donors
        </button>
      </form>

      {error && (
        <div className="alert alert-danger" style={{ textAlign: 'left' }}>
          {error}
        </div>
      )}

      {loading ? (
        <Loader fullScreen={false} />
      ) : (
        <div>
          {donors.length === 0 ? (
            <div className="glass" style={{
              padding: '3rem 2rem',
              textAlign: 'center',
              borderStyle: 'dashed'
            }}>
              <span style={{ fontSize: '3rem', display: 'block', marginBottom: '1rem' }}>🩸</span>
              <h3 style={{ fontSize: '1.25rem', color: 'rgba(255, 255, 255, 0.8)', marginBottom: '0.5rem' }}>
                No Donors Found
              </h3>
              <p style={{ color: 'rgba(255, 255, 255, 0.4)', fontSize: '0.9rem' }}>
                Try matching other groups or checking spelling. Be the first to register a donor profile in this region!
              </p>
            </div>
          ) : (
            <div className="grid-container">
              {donors.map((donor) => (
                <div key={donor._id} className="glass glass-hover" style={{
                  textAlign: 'left',
                  border: '1px solid rgba(230, 57, 70, 0.2)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}>
                  <div>
                    {/* Header */}
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '1rem'
                    }}>
                      <h4 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#fff' }}>
                        {donor.userId?.name || 'Anonymous Donor'}
                      </h4>
                      {/* Blood Badge */}
                      <span className="badge badge-red" style={{ fontSize: '0.85rem', padding: '6px 12px' }}>
                        {donor.bloodGroup}
                      </span>
                    </div>

                    {/* Details */}
                    <div style={{ marginBottom: '1.5rem', color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.95rem' }}>
                      <p style={{ marginBottom: '0.4rem' }}>
                        📍 City: <strong style={{ color: '#fff' }}>{donor.city}</strong>
                      </p>
                      <p style={{ marginBottom: '0.4rem' }}>
                        Status: <span className="badge badge-green">Available</span>
                      </p>
                      {donor.totalDonations > 0 && (
                        <p style={{ marginBottom: '0.4rem' }}>
                          Donation Count: <strong>{donor.totalDonations}</strong>
                        </p>
                      )}
                      {donor.lastDonated && (
                        <p>
                          Last Donated: <strong>{new Date(donor.lastDonated).toLocaleDateString()}</strong>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Contact Button */}
                  <div style={{
                    borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                    paddingTop: '1rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <span style={{ fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.4)' }}>
                      Contact Registry
                    </span>
                    <a
                      href={`tel:${donor.userId?.phone}`}
                      className="btn btn-primary"
                      style={{
                        padding: '6px 14px',
                        fontSize: '0.85rem',
                        textDecoration: 'none'
                      }}
                    >
                      📞 Call {donor.userId?.phone}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchDonors;
