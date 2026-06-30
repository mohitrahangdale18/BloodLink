import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../api/axios';
import Loader from '../components/Loader';
import { Plus, Phone, MapPin, Hospital, Check, X, FileText, Droplet, Clock } from '../components/Icons';

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

      <h2 style={{
        fontSize: '1.75rem',
        fontWeight: '700',
        fontFamily: 'var(--font-heading)',
        color: 'var(--text-color)',
        marginBottom: '0.5rem',
        textAlign: 'left'
      }}>
        Blood Support Registry
      </h2>
      <p style={{
        color: 'var(--text-secondary)',
        fontSize: '0.95rem',
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
          position: 'sticky',
          top: '100px',
          background: '#ffffff'
        }}>
          <h3 style={{ 
            fontSize: '1.15rem', 
            fontWeight: '700', 
            color: 'var(--text-color)', 
            marginBottom: '1.5rem', 
            fontFamily: 'var(--font-heading)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <Plus size={20} color="var(--primary)" />
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

            <button type="submit" className="btn btn-primary" style={{ width: '100%', height: '42px' }}>
              <Plus size={16} style={{ marginRight: '6px' }} />
              Submit Request Post
            </button>
          </form>
        </div>

        {/* Right Side Requests feed */}
        <div style={{ display: 'grid', gap: '1.25rem', textAlign: 'left' }}>
          <h3 style={{ 
            fontSize: '1.15rem', 
            fontWeight: '700', 
            color: 'var(--text-color)', 
            marginBottom: '0.5rem', 
            fontFamily: 'var(--font-heading)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <FileText size={20} color="var(--primary)" />
            Active Registry Requests
          </h3>

          {loading ? (
            <Loader fullScreen={false} />
          ) : (
            <>
              {requests.length === 0 ? (
                <div className="glass" style={{ padding: '3rem', textAlign: 'center', borderStyle: 'dashed', background: '#ffffff' }}>
                  <div style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>
                    <FileText size={36} />
                  </div>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>No blood requests registered at the moment.</p>
                </div>
              ) : (
                requests.map((req) => {
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
                        background: '#ffffff',
                        borderColor: isCritical && isPending ? 'var(--primary)' : 'var(--border-color)',
                        boxShadow: 'none',
                        position: 'relative'
                      }}
                    >
                      {/* Badges and blood group */}
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '1.25rem'
                      }}>
                        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                          <span className={`badge ${getUrgencyBadgeClass(req.urgency)}`}>
                            {req.urgency}
                          </span>
                          <span className={`badge ${req.status === 'pending' ? 'badge-yellow' : req.status === 'fulfilled' ? 'badge-green' : 'badge-red'}`}>
                            {req.status}
                          </span>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <Droplet size={18} color="var(--primary)" />
                          <span style={{
                            fontSize: '1.5rem',
                            fontWeight: '800',
                            color: 'var(--primary)',
                            fontFamily: 'var(--font-heading)',
                            lineHeight: '1'
                          }}>
                            {req.bloodGroup}
                          </span>
                        </div>
                      </div>

                      {/* Request Info */}
                      <div style={{ 
                        color: 'var(--text-secondary)', 
                        fontSize: '0.9rem', 
                        marginBottom: '1.25rem',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.6rem'
                      }}>
                        <p style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <Hospital size={16} color="var(--text-muted)" />
                          <span>Hospital: <strong style={{ color: 'var(--text-color)' }}>{req.hospital}</strong></span>
                        </p>
                        <p style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <MapPin size={16} color="var(--text-muted)" />
                          <span>Location: <strong style={{ color: 'var(--text-color)' }}>{req.city}</strong></span>
                        </p>
                        <p style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <Phone size={16} color="var(--text-muted)" />
                          <span>Contact: <strong style={{ color: 'var(--text-color)' }}>{req.contactNumber}</strong></span>
                        </p>
                        <div style={{ 
                          borderTop: '1px solid #f1f5f9', 
                          paddingTop: '0.6rem', 
                          marginTop: '0.4rem', 
                          fontSize: '0.8rem', 
                          color: 'var(--text-muted)',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '0.2rem'
                        }}>
                          <span>Requested by: {req.requestedBy?.name || 'Anonymous User'}</span>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <Clock size={12} />
                            Posted: {new Date(req.createdAt).toLocaleString()}
                          </span>
                        </div>
                      </div>

                      {/* Owner control buttons */}
                      {isOwner && isPending && (
                        <div style={{
                          display: 'flex',
                          gap: '0.75rem',
                          borderTop: '1px solid var(--border-color)',
                          paddingTop: '1rem'
                        }}>
                          <button
                            onClick={() => handleUpdateStatus(req._id, 'fulfilled')}
                            className="btn btn-secondary"
                            style={{
                              flex: 1.25,
                              padding: '6px 12px',
                              fontSize: '0.8rem',
                              borderColor: '#bbf7d0',
                              color: '#166534',
                              background: '#f0fdf4'
                            }}
                          >
                            <Check size={14} style={{ marginRight: '4px' }} />
                            Mark Fulfilled
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
                            <X size={14} style={{ marginRight: '4px' }} />
                            Cancel
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
