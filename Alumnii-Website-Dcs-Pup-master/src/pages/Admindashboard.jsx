import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Admindashboard() {
  const [pending, setPending] = useState([]);
  const [approved, setApproved] = useState([]);
  const [denied, setDenied] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [activeSection, setActiveSection] = useState('pending');
  const navigate = useNavigate();

  // Fetch Functions
  const fetchPending = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/alumni/pending', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setPending(response.data);
    } catch (err) {
      console.error('Error fetching pending:', err);
      setError('Failed to fetch pending alumni.');
    }
  };

  const fetchApproved = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/alumni/approved', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setApproved(response.data);
    } catch (err) {
      console.error('Error fetching approved:', err);
      setError('Failed to fetch approved alumni.');
    }
  };

  const fetchDenied = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/alumni/denied', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setDenied(response.data);
    } catch (err) {
      console.error('Error fetching denied:', err);
      setError('Failed to fetch denied alumni.');
    }
  };

  // Action Functions
  const approve = async (id) => {
    try {
      await axios.put(
        `http://localhost:5000/api/alumni/approve/${id}`,
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );
      fetchPending();
      fetchApproved();
    } catch (err) {
      console.error('Error approving:', err);
      setError('Failed to approve alumni.');
    }
  };

  const deny = async (id) => {
    try {
      await axios.put(
        `http://localhost:5000/api/alumni/deny/${id}`,
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );
      setSuccess('Alumni denied successfully.');
      setError('');
      fetchPending();
      fetchDenied();
    } catch (err) {
      console.error('Error denying:', err);
      setError('Failed to deny alumni.');
      setSuccess('');
    }
  };

  const remove = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/alumni/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      fetchPending();
      fetchApproved();
      fetchDenied();
    } catch (err) {
      console.error('Error deleting:', err);
      setError('Failed to delete alumni.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const resetTimeout = useCallback(() => {
    const timeout = setTimeout(() => {
      handleLogout();
    }, 5 * 60 * 1000); // 5 minutes
    return timeout;
  }, [navigate]);

  useEffect(() => {
    // Load animate.css
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css';
    document.head.appendChild(link);

    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    } else {
      fetchPending();
      fetchApproved();
      fetchDenied();
    }

    let timeout = resetTimeout();

    const resetTimer = () => {
      clearTimeout(timeout);
      timeout = resetTimeout();
    };

    window.addEventListener('mousemove', resetTimer);
    window.addEventListener('keypress', resetTimer);
    window.addEventListener('click', resetTimer);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener('mousemove', resetTimer);
      window.removeEventListener('keypress', resetTimer);
      window.removeEventListener('click', resetTimer);
      document.head.removeChild(link);
    };
  }, [navigate, resetTimeout]);

  const renderAlumniCard = (a, isPending) => (
    <div key={a._id} className="border p-6 rounded-xl shadow-lg bg-white transform hover:scale-105 transition-transform duration-300 animate__animated animate__fadeIn">
      <img
        src={a.photo}
        alt={a.name}
        className="w-24 h-24 object-cover rounded-full mb-4 mx-auto"
        onError={(e) => (e.target.src = '/images/placeholder.png')}
      />
      <p className="text-gray-700"><strong>Name:</strong> {a.name}</p>
      <p className="text-gray-700"><strong>Father's Name:</strong> {a.fathername}</p>
      <p className="text-gray-700"><strong>Email:</strong> {a.email}</p>
      <p className="text-gray-700"><strong>Phone:</strong> {a.phone}</p>
      <p className="text-gray-700"><strong>Course:</strong> {a.course}</p>
      <p className="text-gray-700"><strong>Batch:</strong> {a.batch}</p>
      <p className="text-gray-700"><strong>Address:</strong> {a.address}</p>
      <p className="text-gray-700">
        <strong>LinkedIn:</strong>{' '}
        {a.linkedin ? (
          <a href={a.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
            {a.linkedin}
          </a>
        ) : (
          'N/A'
        )}
      </p>
      <p className="text-gray-700"><strong>Profession:</strong> {a.profession || 'N/A'}</p>
      <p className="text-gray-700"><strong>Organization:</strong> {a.organization || 'N/A'}</p>
      <p className="text-gray-700">
        <strong>Website:</strong>{' '}
        {a.website ? (
          <a href={a.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
            {a.website}
          </a>
        ) : (
          'N/A'
        )}
      </p>
      <p className="text-gray-700"><strong>Skills:</strong> {a.skills?.length ? a.skills.join(', ') : 'None'}</p>
      {a.otherSkill && <p className="text-gray-700"><strong>Other Skill:</strong> {a.otherSkill}</p>}
      <p className="text-gray-700"><strong>Session Consent:</strong> {a.sessionConsent || 'N/A'}</p>

      <div className="flex gap-2 mt-4 justify-center">
        {isPending && (
          <>
            <button
              onClick={() => approve(a._id)}
              className="bg-green-600 hover:bg-green-700 text-white py-1 px-4 rounded-lg transition-colors transform hover:scale-110 animate__animated animate__pulse animate__infinite"
            >
              Approve
            </button>
            <button
              onClick={() => deny(a._id)}
              className="bg-yellow-600 hover:bg-yellow-700 text-white py-1 px-4 rounded-lg transition-colors transform hover:scale-110 animate__animated animate__pulse animate__infinite"
            >
              Deny
            </button>
          </>
        )}
        <button
          onClick={() => remove(a._id)}
          className="bg-red-600 hover:bg-red-700 text-white py-1 px-4 rounded-lg transition-colors transform hover:scale-110 animate__animated animate__pulse animate__infinite"
        >
          Remove
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 p-4 flex flex-col justify-between animate__animated animate__slideInLeft">
        <div>
          <h2 className="text-2xl font-bold text-white mb-6">Admin Dashboard</h2>
          <nav className="space-y-2">
            {[
              { id: 'pending', label: 'Pending Approvals', icon: '📝' },
              { id: 'approved', label: 'Approved Alumni', icon: '✅' },
              { id: 'denied', label: 'Denied Alumni', icon: '❌' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full text-left px-4 py-2 rounded-lg flex items-center gap-2 transition-colors transform hover:scale-105 ${
                  activeSection === item.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-blue-500'
                }`}
              >
                <span>{item.icon}</span>
                {item.label}
              </button>
            ))}
          </nav>
        </div>
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition-colors transform hover:scale-105 animate__animated animate__pulse animate__infinite"
        >
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-auto animate__animated animate__fadeIn">
        <header className="bg-gray-800 rounded-xl shadow-lg pb-3 mb-3 mt-16 text-center animate__animated animate__bounceIn">
          <h1 className="text-3xl font-bold text-blue-400 font-poppins">
            Welcome Admin DCS Punjabi University, Patiala
          </h1>
        </header>

        {/* Error/Success Messages */}
        {error && (
          <p className="text-black bg-red-900 bg-opacity-50 p-4 rounded-lg mb-4 animate__animated animate__shakeX">{error}</p>
        )}
        {success && (
          <p className="text-white bg-green-900 bg-opacity-50 p-4 rounded-lg mb-4 animate__animated animate__shakeX">{success}</p>
        )}

        {/* Pending Approvals */}
        {activeSection === 'pending' && (
          <section className="bg-gray-800 p-8 rounded-xl shadow-2xl animate__animated animate__fadeInUp">
            <h3 className="text-2xl font-semibold text-blue-400 mb-6">Pending Approvals</h3>
            {pending.length === 0 ? (
              <p className="text-gray-400">No pending requests.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {pending.map((a) => renderAlumniCard(a, true))}
              </div>
            )}
          </section>
        )}

        {/* Approved Alumni */}
        {activeSection === 'approved' && (
          <section className="bg-gray-800 p-8 rounded-xl shadow-2xl animate__animated animate__fadeInUp">
            <h3 className="text-2xl font-semibold text-blue-400 mb-6">Approved Alumni</h3>
            {approved.length === 0 ? (
              <p className="text-gray-400">No approved alumni yet.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {approved.map((a) => renderAlumniCard(a, false))}
              </div>
            )}
          </section>
        )}

        {/* Denied Alumni */}
        {activeSection === 'denied' && (
          <section className="bg-gray-800 p-8 rounded-xl shadow-2xl animate__animated animate__fadeInUp">
            <h3 className="text-2xl font-semibold text-blue-400 mb-6">Denied Alumni</h3>
            {denied.length === 0 ? (
              <p className="text-gray-400">No denied alumni yet.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {denied.map((a) => renderAlumniCard(a, false))}
              </div>
            )}
          </section>
        )}
      </div>
    </div>
  );
}