import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../api/axios';
import Loader from '../components/Loader';

const BloodRequests = () => {
  const { user } = useContext(AuthContext);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formLoading, setFormLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  
  const [formData, setFormData] = useState({
    bloodGroup: '',
    city: '',
    hospital: '',
    contactNumber: '',
    urgency: 'normal'
  });

  // Fetch all requests
  const fetchRequests = async () => {
    try {
      const response = await api.get('/requests');
      if (response.data.success) {
        setRequests(response.data.data);
      }
    } catch (err) {
      console.error('Error fetching requests:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });

    const { bloodGroup, city, hospital, contactNumber, urgency } = formData;
    if (!bloodGroup || !city || !hospital || !contactNumber || !urgency) {
      setMessage({ type: 'danger', text: 'All fields are required' });
      return;
    }

    setFormLoading(true);
    try {
      const response = await api.post('/requests', formData);
      if (response.data.success) {
        setMessage({ type: 'success', text: 'Blood request posted successfully!' });
        setFormData({
          bloodGroup: '',
          city: '',
          hospital: '',
          contactNumber: '',
          urgency: 'normal'
        });
        fetchRequests();
      }
    } catch (err) {
      setMessage({ type: 'danger', text: err.response?.data?.message || 'Failed to post blood request' });
    } finally {
      setFormLoading(false);
    }
  };

  // Update status (mark as fulfilled or cancelled)
  const handleUpdateStatus = async (id, status) => {
    setFormLoading(true);
    setMessage({ type: '', text: '' });
    try {
      const response = await api.patch(`/requests/${id}/status`, { status });
      if (response.data.success) {
        setMessage({ type: 'success', text: `Request marked as ${status}!` });
        fetchRequests();
      }
    } catch (err) {
      setMessage({ type: 'danger', text: err.response?.data?.message || 'Failed to update status' });
    } finally {
      setFormLoading(false);
    }
  };

  const getUrgencyBadgeClass = (urgency) => {
    if (urgency === 'critical') return 'badge-red';
    if (urgency === 'urgent') return 'badge-yellow';
    return 'badge-green';
  };

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      {formLoading && <Loader fullScreen={true} />}

      <h2 className="neon-text" style={{
        fontSize: '2.5rem',
        fontWeight: '800',
        fontFamily: 'Poppins, sans-serif',
        marginBottom: '0.5rem',
        textAlign: 'left'
      }}>
        Blood Support Registry
      </h2>
      <p style={{
        color: 'rgba(255, 255, 255, 0.6)',
        fontSize: '1rem',
        marginBottom: '2rem',
        textAlign: 'left'
      }}>
        Create an emergency post or view requests logged by the community
      </p>

      {message.text && (
        <div className={`alert alert-${message.type}`} style={{ textAlign: 'left' }}>
          {message.text}
        </div>
      )}

      {/* Main Grid Layout */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '2.5rem',
        alignItems: 'flex-start'
      }}>
        {/* Left Side Form card */}
        <div className="glass" style={{
          border: '1px solid rgba(230, 57, 70, 0.25)',
          boxShadow: '0 0 30px rgba(230, 57, 70, 0.1)',
          position: 'sticky',
          top: '100px'
        }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#fff', marginBottom: '1.5rem', fontFamily: 'Poppins, sans-serif' }}>
            Request Blood Support
          </h3>

          <form onSubmit={handleSubmit}>
            <div className="form-group" style={{ textAlign: 'left' }}>
              <label className="form-label">Blood Group Required</label>
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

            <div className="form-group" style={{ textAlign: 'left' }}>
              <label className="form-label">City / Region</label>
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

            <div className="form-group" style={{ textAlign: 'left' }}>
              <label className="form-label">Hospital Name</label>
              <input
                type="text"
                name="hospital"
                className="form-control"
                placeholder="e.g. Mayo General Hospital"
                value={formData.hospital}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group" style={{ textAlign: 'left' }}>
              <label className="form-label">Contact Phone Number</label>
              <input
                type="tel"
                name="contactNumber"
                className="form-control"
                placeholder="e.g. 7766554433"
                value={formData.contactNumber}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group" style={{ textAlign: 'left', marginBottom: '2rem' }}>
              <label className="form-label">Urgency Level</label>
              <select
                name="urgency"
                className="form-control"
                value={formData.urgency}
                onChange={handleChange}
                required
              >
                <option value="normal">Normal Support</option>
                <option value="urgent">Urgent Support</option>
                <option value="critical">Critical (Immediate match needed)</option>
              </select>
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
              Submit Request Post
            </button>
          </form>
        </div>

        {/* Right Side Requests feed */}
        <div style={{ display: 'grid', gap: '1.5rem', textAlign: 'left' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#fff', marginBottom: '0.5rem', fontFamily: 'Poppins, sans-serif' }}>
            Active Registry Requests
          </h3>

          {loading ? (
            <Loader fullScreen={false} />
          ) : (
            <>
              {requests.length === 0 ? (
                <div className="glass" style={{ padding: '3rem', textAlign: 'center', borderStyle: 'dashed' }}>
                  <span style={{ fontSize: '2.5rem' }}>📋</span>
                  <p style={{ color: 'rgba(255,255,255,0.4)', marginTop: '1rem' }}>No blood requests registered at the moment.</p>
                </div>
              ) : (
                requests.map((req) => {
                  // Allow matching req.requestedBy as string id or populated user object
                  const requestedById = req.requestedBy?._id || req.requestedBy;
                  const currentUserId = user?.id || user?._id;
                  const isOwner = requestedById === currentUserId;
                  const isCritical = req.urgency === 'critical';
                  const isPending = req.status === 'pending';

                  return (
                    <div
                      key={req._id}
                      className="glass"
                      style={{
                        borderColor: isCritical && isPending ? 'rgba(230, 57, 70, 0.5)' : 'rgba(255, 255, 255, 0.1)',
                        boxShadow: isCritical && isPending ? '0 0 15px rgba(230, 57, 70, 0.15)' : 'none',
                        position: 'relative'
                      }}
                    >
                      {/* Badges and blood group */}
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '1rem'
                      }}>
                        <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center' }}>
                          <span className={`badge ${getUrgencyBadgeClass(req.urgency)}`}>
                            {req.urgency}
                          </span>
                          <span className={`badge ${req.status === 'pending' ? 'badge-yellow' : req.status === 'fulfilled' ? 'badge-green' : 'badge-red'}`}>
                            {req.status}
                          </span>
                        </div>

                        <span style={{
                          fontSize: '1.8rem',
                          fontWeight: '800',
                          color: '#e63946',
                          fontFamily: 'Poppins, sans-serif'
                        }}>
                          {req.bloodGroup}
                        </span>
                      </div>

                      {/* Request Info */}
                      <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.95rem', marginBottom: '1.2rem' }}>
                        <p style={{ marginBottom: '0.4rem' }}>
                          🏥 Hospital: <strong style={{ color: '#fff' }}>{req.hospital}</strong>
                        </p>
                        <p style={{ marginBottom: '0.4rem' }}>
                          📍 Location: <strong style={{ color: '#fff' }}>{req.city}</strong>
                        </p>
                        <p style={{ marginBottom: '0.4rem' }}>
                          📞 Contact: <strong style={{ color: '#fff' }}>{req.contactNumber}</strong>
                        </p>
                        <p style={{ marginBottom: '0.4rem', fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.4)' }}>
                          Requested by: {req.requestedBy?.name || 'Anonymous User'}
                        </p>
                        <p style={{ fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.4)' }}>
                          Posted: {new Date(req.createdAt).toLocaleString()}
                        </p>
                      </div>

                      {/* Owner control buttons */}
                      {isOwner && isPending && (
                        <div style={{
                          display: 'flex',
                          gap: '1rem',
                          borderTop: '1px solid rgba(255,255,255,0.08)',
                          paddingTop: '1rem'
                        }}>
                          <button
                            onClick={() => handleUpdateStatus(req._id, 'fulfilled')}
                            className="btn btn-secondary"
                            style={{
                              flex: 1,
                              padding: '6px 12px',
                              fontSize: '0.8rem',
                              borderColor: 'rgba(40, 199, 111, 0.4)',
                              color: '#28c76f'
                            }}
                          >
                            ✓ Mark Fulfilled
                          </button>
                          <button
                            onClick={() => handleUpdateStatus(req._id, 'cancelled')}
                            className="btn btn-danger"
                            style={{
                              flex: 1,
                              padding: '6px 12px',
                              fontSize: '0.8rem'
                            }}
                          >
                            ✕ Cancel
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BloodRequests;
