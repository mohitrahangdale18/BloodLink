import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import Loader from '../components/Loader';
import { Search, MapPin, Phone, Droplet } from '../components/Icons';

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
    handleSearch();
  }, []);

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <h2 style={{
        fontSize: '1.75rem',
        fontWeight: '700',
        fontFamily: 'var(--font-heading)',
        color: 'var(--text-color)',
        marginBottom: '0.5rem',
        textAlign: 'left'
      }}>
        Find Compatible Donors
      </h2>
      <p style={{
        color: 'var(--text-secondary)',
        fontSize: '0.95rem',
        marginBottom: '2rem',
        textAlign: 'left'
      }}>
        Search the national registry for available blood groups. Results include compatible backup groups!
      </p>

      {/* Filter Form Card */}
      <form onSubmit={handleSearch} className="glass" style={{
        padding: '1.25rem 1.5rem',
        marginBottom: '2.5rem',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '1.25rem',
        alignItems: 'flex-end',
        background: '#ffffff'
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

        <button type="submit" className="btn btn-primary" style={{ padding: '10px 24px', height: '42px' }}>
          <Search size={16} style={{ marginRight: '6px' }} />
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
              borderStyle: 'dashed',
              background: '#ffffff'
            }}>
              <div style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>
                <Droplet size={48} />
              </div>
              <h3 style={{ fontSize: '1.1rem', color: 'var(--text-color)', marginBottom: '0.5rem', fontWeight: '700' }}>
                No Donors Found
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                Try matching other groups or checking spelling. Be the first to register a donor profile in this region!
              </p>
            </div>
          ) : (
            <div className="grid-container">
              {donors.map((donor) => (
                <div key={donor._id} className="glass glass-hover" style={{
                  textAlign: 'left',
                  background: '#ffffff',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  minHeight: '220px'
                }}>
                  <div>
                    {/* Header */}
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '1.25rem'
                    }}>
                      <h4 style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--text-color)' }}>
                        {donor.userId?.name || 'Anonymous Donor'}
                      </h4>
                      {/* Blood Badge */}
                      <span className="badge badge-red" style={{ fontSize: '0.8rem', padding: '4px 10px' }}>
                        {donor.bloodGroup}
                      </span>
                    </div>

                    {/* Details */}
                    <div style={{ marginBottom: '1.25rem', color: 'var(--text-secondary)', fontSize: '0.9rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <p style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <MapPin size={16} color="var(--text-muted)" />
                        <span>City: <strong>{donor.city}</strong></span>
                      </p>
                      <p style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span className="badge badge-green" style={{ fontSize: '0.7rem' }}>Available</span>
                      </p>
                      {donor.totalDonations > 0 && (
                        <p style={{ margin: 0 }}>
                          Donation Count: <strong>{donor.totalDonations}</strong>
                        </p>
                      )}
                      {donor.lastDonated && (
                        <p style={{ margin: 0 }}>
                          Last Donated: <strong>{new Date(donor.lastDonated).toLocaleDateString()}</strong>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Contact Button */}
                  <div style={{
                    borderTop: '1px solid var(--border-color)',
                    paddingTop: '1rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '1rem'
                  }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      Contact Registry
                    </span>
                    <a
                      href={`tel:${donor.userId?.phone}`}
                      className="btn btn-primary"
                      style={{
                        padding: '6px 14px',
                        fontSize: '0.8rem',
                        borderRadius: '4px'
                      }}
                    >
                      <Phone size={14} style={{ marginRight: '6px' }} />
                      Call Donor
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
