// import React, { useEffect, useState, useCallback } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// export default function Admindashboard() {
//   const [pending, setPending] = useState([]);
//   const [approved, setApproved] = useState([]);
//   const [denied, setDenied] = useState([]);
//   const [faculty, setFaculty] = useState([]);
//   const [events, setEvents] = useState([]);
//   const [formData, setFormData] = useState({
//     name: '',
//     title: '',
//     department: '',
//     email: '',
//     phone: '',
//     expertise: '',
//     bio: '',
//     Designation: '',
//     description: '',
//     position: 'right',
//     bgColor: 'bg-white',
//     textColor: '#374151',
//     files: [],
//   });
//   const [image, setImage] = useState(null);
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');
//   const [isUploading, setIsUploading] = useState(false);
//   const [activeSection, setActiveSection] = useState('pending');
//   const navigate = useNavigate();

//   // Fetch Functions
//   const fetchPending = async () => {
//     try {
//       const response = await axios.get('http://localhost:5000/api/alumni/pending', {
//         headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
//       });
//       setPending(response.data);
//     } catch (err) {
//       console.error('Error fetching pending:', err);
//       setError('Failed to fetch pending alumni.');
//     }
//   };

//   const fetchApproved = async () => {
//     try {
//       const response = await axios.get('http://localhost:5000/api/alumni/approved', {
//         headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
//       });
//       setApproved(response.data);
//     } catch (err) {
//       console.error('Error fetching approved:', err);
//       setError('Failed to fetch approved alumni.');
//     }
//   };

//   const fetchDenied = async () => {
//     try {
//       const response = await axios.get('http://localhost:5000/api/alumni/denied', {
//         headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
//       });
//       setDenied(response.data);
//     } catch (err) {
//       console.error('Error fetching denied:', err);
//       setError('Failed to fetch denied alumni.');
//     }
//   };

//   const fetchFaculty = async () => {
//     try {
//       const response = await axios.get('http://localhost:5000/api/faculty', {
//         headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
//       });
//       setFaculty(response.data);
//     } catch (err) {
//       console.error('Error fetching faculty:', err);
//       setError('Failed to fetch faculty.');
//     }
//   };

//   const fetchEvents = async () => {
//     try {
//       const response = await axios.get('http://localhost:5000/api/events', {
//         headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
//       });
//       setEvents(response.data);
//     } catch (err) {
//       console.error('Error fetching events:', err);
//       setError('Failed to fetch events.');
//     }
//   };

//   // Action Functions
//   const approve = async (id) => {
//     try {
//       await axios.put(
//         `http://localhost:5000/api/alumni/approve/${id}`,
//         {},
//         {
//           headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
//         }
//       );
//       fetchPending();
//       fetchApproved();
//     } catch (err) {
//       console.error('Error approving:', err);
//       setError('Failed to approve alumni.');
//     }
//   };

//   const deny = async (id) => {
//     try {
//       await axios.put(
//         `http://localhost:5000/api/alumni/deny/${id}`,
//         {},
//         {
//           headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
//         }
//       );
//       setSuccess('Alumni denied successfully.');
//       setError('');
//       fetchPending();
//       fetchDenied();
//     } catch (err) {
//       console.error('Error denying:', err);
//       setError('Failed to deny alumni.');
//       setSuccess('');
//     }
//   };

//   const remove = async (id) => {
//     try {
//       await axios.delete(`http://localhost:5000/api/alumni/${id}`, {
//         headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
//       });
//       fetchPending();
//       fetchApproved();
//       fetchDenied();
//     } catch (err) {
//       console.error('Error deleting:', err);
//       setError('Failed to delete alumni.');
//     }
//   };

//   const deleteFaculty = async (id) => {
//     if (!window.confirm('Are you sure you want to delete this faculty member?')) return;
//     try {
//       await axios.delete(`http://localhost:5000/api/faculty/${id}`, {
//         headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
//       });
//       setSuccess('Faculty member deleted successfully!');
//       fetchFaculty();
//     } catch (err) {
//       console.error('Error deleting faculty:', err);
//       setError('Failed to delete faculty member.');
//     }
//   };

//   const deleteEvent = async (id, publicIds) => {
//     if (!window.confirm('Are you sure you want to delete this event?')) return;
//     try {
//       if (!publicIds || !Array.isArray(publicIds) || publicIds.length === 0) {
//         throw new Error('No valid public IDs provided for image deletion.');
//       }
//       const token = localStorage.getItem('token');
//       if (!token) {
//         throw new Error('No authentication token found.');
//       }
//       await axios.delete(`http://localhost:5000/api/events/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//         data: { publicIds },
//       });
//       setSuccess('Event deleted successfully!');
//       fetchEvents();
//     } catch (err) {
//       console.error('Error deleting event:', err);
//       setError(
//         err.response?.status === 401
//           ? 'Unauthorized: Please log in again.'
//           : err.response?.status === 404
//           ? 'Event not found.'
//           : err.message || 'Failed to delete event.'
//       );
//     }
//   };

//   const handleFileChange = (e) => {
//     const selectedFiles = Array.from(e.target.files);
//     if (selectedFiles.length > 5) {
//       setError('Maximum 5 images allowed.');
//       setFormData({ ...formData, files: [] });
//       return;
//     }
//     for (const file of selectedFiles) {
//       if (!['image/jpeg', 'image/png'].includes(file.type)) {
//         setError('Please upload valid images (JPEG, PNG).');
//         setFormData({ ...formData, files: [] });
//         return;
//       }
//       if (file.size > 5 * 1024 * 1024) {
//         setError('Each image must be under 5MB.');
//         setFormData({ ...formData, files: [] });
//         return;
//       }
//     }
//     setFormData({ ...formData, files: selectedFiles });
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file && !['image/jpeg', 'image/png'].includes(file.type)) {
//       setError('Please upload a valid image (JPEG, PNG).');
//       setImage(null);
//       return;
//     }
//     if (file && file.size > 5 * 1024 * 1024) {
//       setError('Image must be under 5MB.');
//       setImage(null);
//       return;
//     }
//     setImage(file);
//   };

//   const handleEventSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setSuccess('');
//     setIsUploading(true);

//     const { title, description, position, bgColor, textColor, files } = formData;
//     if (!title || !description || files.length === 0) {
//       setError('Title, description, and at least one image are required.');
//       setIsUploading(false);
//       return;
//     }

//     const data = new FormData();
//     data.append('title', title);
//     data.append('description', description);
//     data.append('position', position);
//     data.append('bgColor', bgColor);
//     data.append('textColor', textColor);
//     files.forEach((file) => data.append('images', file));

//     try {
//       const token = localStorage.getItem('token');
//       await axios.post('http://localhost:5000/api/events', data, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       setSuccess('Event uploaded successfully!');
//       setFormData({
//         ...formData,
//         title: '',
//         description: '',
//         position: 'right',
//         bgColor: 'bg-white',
//         textColor: '#374151',
//         files: [],
//       });
//       e.target.reset();
//       fetchEvents();
//     } catch (err) {
//       console.error('Event upload error:', err);
//       setError(err.response?.data?.error || 'Failed to upload event.');
//     } finally {
//       setIsUploading(false);
//     }
//   };

//   const handleFacultySubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setSuccess('');
//     setIsUploading(true);

//     const { name, title, department, email, phone, expertise, bio, Designation } = formData;
//     if (!name) {
//       setError('Name is required.');
//       setIsUploading(false);
//       return;
//     }

//     const data = new FormData();
//     data.append('name', name);
//     data.append('title', title);
//     data.append('department', department);
//     data.append('email', email);
//     data.append('phone', phone);
//     data.append('expertise', expertise);
//     data.append('bio', bio);
//     data.append('Designation', Designation);
//     if (image) data.append('image', image);

//     try {
//       const token = localStorage.getItem('token');
//       await axios.post('http://localhost:5000/api/faculty', data, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       setSuccess('Faculty member added successfully!');
//       setFormData({
//         ...formData,
//         name: '',
//         title: '',
//         department: '',
//         email: '',
//         phone: '',
//         expertise: '',
//         bio: '',
//         Designation: '',
//       });
//       setImage(null);
//       e.target.reset();
//       fetchFaculty();
//     } catch (err) {
//       console.error('Faculty upload error:', err);
//       setError(err.response?.data?.error || 'Failed to add faculty member.');
//     } finally {
//       setIsUploading(false);
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     navigate('/login');
//   };

//   const resetTimeout = useCallback(() => {
//     const timeout = setTimeout(() => {
//       handleLogout();
//     }, 5 * 60 * 1000); // 5 minutes
//     return timeout;
//   }, [navigate]);

//   useEffect(() => {
//     // Load animate.css
//     const link = document.createElement('link');
//     link.rel = 'stylesheet';
//     link.href = 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css';
//     document.head.appendChild(link);

//     const token = localStorage.getItem('token');
//     if (!token) {
//       navigate('/login');
//     } else {
//       fetchPending();
//       fetchApproved();
//       fetchDenied();
//       fetchFaculty();
//       fetchEvents();
//     }

//     let timeout = resetTimeout();

//     const resetTimer = () => {
//       clearTimeout(timeout);
//       timeout = resetTimeout();
//     };

//     window.addEventListener('mousemove', resetTimer);
//     window.addEventListener('keypress', resetTimer);
//     window.addEventListener('click', resetTimer);

//     return () => {
//       clearTimeout(timeout);
//       window.removeEventListener('mousemove', resetTimer);
//       window.removeEventListener('keypress', resetTimer);
//       window.removeEventListener('click', resetTimer);
//       document.head.removeChild(link);
//     };
//   }, [navigate, resetTimeout]);

//   const renderAlumniCard = (a, isPending) => (
//     <div key={a._id} className="border p-6 rounded-xl shadow-lg bg-white transform hover:scale-105 transition-transform duration-300 animate__animated animate__fadeIn">
//       <img
//         src={a.photo}
//         alt={a.name}
//         className="w-24 h-24 object-cover rounded-full mb-4 mx-auto"
//         onError={(e) => (e.target.src = '/images/placeholder.png')}
//       />
//       <p className="text-gray-700"><strong>Name:</strong> {a.name}</p>
//       <p className="text-gray-700"><strong>Father's Name:</strong> {a.fathername}</p>
//       <p className="text-gray-700"><strong>Email:</strong> {a.email}</p>
//       <p className="text-gray-700"><strong>Phone:</strong> {a.phone}</p>
//       <p className="text-gray-700"><strong>Course:</strong> {a.course}</p>
//       <p className="text-gray-700"><strong>Batch:</strong> {a.batch}</p>
//       <p className="text-gray-700"><strong>Address:</strong> {a.address}</p>
//       <p className="text-gray-700">
//         <strong>LinkedIn:</strong>{' '}
//         {a.linkedin ? (
//           <a href={a.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
//             {a.linkedin}
//           </a>
//         ) : (
//           'N/A'
//         )}
//       </p>
//       <p className="text-gray-700"><strong>Profession:</strong> {a.profession || 'N/A'}</p>
//       <p className="text-gray-700"><strong>Organization:</strong> {a.organization || 'N/A'}</p>
//       <p className="text-gray-700">
//         <strong>Website:</strong>{' '}
//         {a.website ? (
//           <a href={a.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
//             {a.website}
//           </a>
//         ) : (
//           'N/A'
//         )}
//       </p>
//       <p className="text-gray-700"><strong>Skills:</strong> {a.skills?.length ? a.skills.join(', ') : 'None'}</p>
//       {a.otherSkill && <p className="text-gray-700"><strong>Other Skill:</strong> {a.otherSkill}</p>}
//       <p className="text-gray-700"><strong>Session Consent:</strong> {a.sessionConsent || 'N/A'}</p>

//       <div className="flex gap-2 mt-4 justify-center">
//         {isPending && (
//           <>
//             <button
//               onClick={() => approve(a._id)}
//               className="bg-green-600 hover:bg-green-700 text-white py-1 px-4 rounded-lg transition-colors transform hover:scale-110 animate__animated animate__pulse animate__infinite"
//             >
//               Approve
//             </button>
//             <button
//               onClick={() => deny(a._id)}
//               className="bg-yellow-600 hover:bg-yellow-700 text-white py-1 px-4 rounded-lg transition-colors transform hover:scale-110 animate__animated animate__pulse animate__infinite"
//             >
//               Deny
//             </button>
//           </>
//         )}
//         <button
//           onClick={() => remove(a._id)}
//           className="bg-red-600 hover:bg-red-700 text-white py-1 px-4 rounded-lg transition-colors transform hover:scale-110 animate__animated animate__pulse animate__infinite"
//         >
//           Remove
//         </button>
//       </div>
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-gray-900 text-gray-100 flex">
//       {/* Sidebar */}
//       <div className="w-64 bg-gray-800 p-4 flex flex-col justify-between animate__animated animate__slideInLeft">
//         <div>
//           <h2 className="text-2xl font-bold text-white mb-6">Admin Dashboard</h2>
//           <nav className="space-y-2">
//             {[
//               { id: 'pending', label: 'Pending Approvals', icon: '📝' },
//               { id: 'approved', label: 'Approved Alumni', icon: '✅' },
//               { id: 'denied', label: 'Denied Alumni', icon: '❌' },
//               { id: 'faculty', label: 'Faculty', icon: '👨‍🏫' },
//               { id: 'events', label: 'Events', icon: '🎉' },
//             ].map((item) => (
//               <button
//                 key={item.id}
//                 onClick={() => setActiveSection(item.id)}
//                 className={`w-full text-left px-4 py-2 rounded-lg flex items-center gap-2 transition-colors transform hover:scale-105 ${
//                   activeSection === item.id
//                     ? 'bg-blue-600 text-white'
//                     : 'bg-gray-700 text-gray-300 hover:bg-blue-500'
//                 }`}
//               >
//                 <span>{item.icon}</span>
//                 {item.label}
//               </button>
//             ))}
//           </nav>
//         </div>
//         <button
//           onClick={handleLogout}
//           className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition-colors transform hover:scale-105 animate__animated animate__pulse animate__infinite"
//         >
//           Logout
//         </button>
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 p-8 overflow-auto animate__animated animate__fadeIn">
//         <header className="bg-gray-800 rounded-xl shadow-lg pb-3 mb-3 mt-16 text-center animate__animated animate__bounceIn">
//           <h1 className="text-3xl font-bold text-blue-400 font-poppins">
//             Welcome Admin DCS Punjabi University, Patiala
//           </h1>
//         </header>

//         {/* Error/Success Messages */}
//         {error && (
//           <p className="text-black bg-red-900 bg-opacity-50 p-4 rounded-lg mb-4 animate__animated animate__shakeX">{error}</p>
//         )}
//         {success && (
//           <p className="text-white bg-green-900 bg-opacity-50 p-4 rounded-lg mb-4 animate__animated animate__shakeX">{success}</p>
//         )}

//         {/* Faculty Section */}
//         {activeSection === 'faculty' && (
//           <section className="bg-gray-800 p-8 rounded-xl shadow-2xl animate__animated animate__fadeInUp">
//             <h3 className="text-2xl font-semibold text-blue-400 mb-6">Manage Faculty</h3>
//             <form onSubmit={handleFacultySubmit} className="space-y-6 mb-8">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-300">Name</label>
//                   <input
//                     type="text"
//                     name="name"
//                     value={formData.name}
//                     onChange={handleInputChange}
//                     className="mt-1 block w-full border-1.5 border-black rounded-lg text-black shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                     required
//                     disabled={isUploading}
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-300">Title</label>
//                   <input
//                     type="text"
//                     name="title"
//                     value={formData.title}
//                     onChange={handleInputChange}
//                     className="mt-1 block w-full bg-gray-700 border-1.5 border-black rounded-lg text-black shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                     disabled={isUploading}
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-300">Department</label>
//                   <input
//                     type="text"
//                     name="department"
//                     value={formData.department}
//                     onChange={handleInputChange}
//                     className="mt-1 block w-full bg-gray-700 border-1.5 border-black rounded-lg text-black shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                     disabled={isUploading}
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-300">Email</label>
//                   <input
//                     type="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleInputChange}
//                     className="mt-1 block w-full bg-gray-700 border-1.5 border-black rounded-lg text-black shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                     disabled={isUploading}
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-300">Phone</label>
//                   <input
//                     type="text"
//                     name="phone"
//                     value={formData.phone}
//                     onChange={handleInputChange}
//                     className="mt-1 block w-full bg-gray-700 border-1.5 border-black rounded-lg text-black shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                     disabled={isUploading}
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-300">Expertise (comma-separated)</label>
//                   <input
//                     type="text"
//                     name="expertise"
//                     value={formData.expertise}
//                     onChange={handleInputChange}
//                     className="mt-1 block w-full bg-gray-700 border-1.5 border-black rounded-lg text-black shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                     placeholder="e.g., JavaScript, Python"
//                     disabled={isUploading}
//                   />
//                 </div>
//                 <div className="md:col-span-2">
//                   <label className="block text-sm font-medium text-gray-300">Bio</label>
//                   <textarea
//                     name="bio"
//                     value={formData.bio}
//                     onChange={handleInputChange}
//                     className="mt-1 block w-full bg-gray-700 border-1.5 border-black rounded-lg text-black shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                     rows="4"
//                     disabled={isUploading}
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-300">Designation</label>
//                   <input
//                     type="text"
//                     name="Designation"
//                     value={formData.Designation}
//                     onChange={handleInputChange}
//                     className="mt-1 block w-full bg-gray-700 border-1.5 border-black rounded-lg text-black shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                     disabled={isUploading}
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-300">Image</label>
//                   <input
//                     type="file"
//                     accept="image/jpeg,image/png"
//                     onChange={handleImageChange}
//                     className="mt-1 block w-full text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-1.5 file:border-black file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
//                     disabled={isUploading}
//                   />
//                 </div>
//               </div>
//               <button
//                 type="submit"
//                 className={`w-full bg-blue-600 text-white font-semibold rounded-lg py-3 px-4 transition-colors transform hover:scale-105 animate__animated animate__pulse animate__infinite ${
//                   isUploading ? 'opacity-50 cursor-not-allowed' : 'opacity-100'
//                 }`}
//                 disabled={isUploading}
//               >
//                 {isUploading ? 'Adding...' : 'Add Faculty'}
//               </button>
//             </form>

//             <h3 className="text-2xl font-semibold text-blue-400 mb-6">Faculty List</h3>
//             {faculty.length === 0 ? (
//               <p className="text-gray-400">No faculty members available.</p>
//             ) : (
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 {faculty.map((f) => (
//                   <div
//                     key={f._id}
//                     className="flex justify-between items-center border p-4 rounded-lg shadow-md bg-gray-700 animate__animated animate__fadeIn"
//                   >
//                     <div>
//                       <h4 className="text-lg font-medium text-white">{f.name}</h4>
//                       <p className="text-sm text-gray-300">{f.Designation}</p>
//                     </div>
//                     <button
//                       onClick={() => deleteFaculty(f._id)}
//                       className="bg-red-600 hover:bg-red-700 text-white py-1 px-4 rounded-lg transition-colors transform hover:scale-110 animate__animated animate__pulse animate__infinite"
//                     >
//                       Delete
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </section>
//         )}

//         {/* Events Section */}
//         {activeSection === 'events' && (
//           <section className="bg-gray-800 p-8 rounded-xl shadow-2xl animate__animated animate__fadeInUp">
//             <h3 className="text-2xl font-semibold text-blue-400 mb-6">Upload Event</h3>
//             <form onSubmit={handleEventSubmit} className="space-y-6 mb-8">
//               <div>
//                 <label className="block text-sm font-medium text-gray-300">Title</label>
//                 <input
//                   type="text"
//                   name="title"
//                   value={formData.title}
//                   onChange={handleInputChange}
//                   className="mt-1 block w-full border-1.5 border-black rounded-lg text-black shadow-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                   required
//                   disabled={isUploading}
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-300">Description</label>
//                 <textarea
//                   name="description"
//                   value={formData.description}
//                   onChange={handleInputChange}
//                   className="mt-1 block w-full bg-gray-700 border-1.5 border-black rounded-lg text-black shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                   rows="4"
//                   required
//                   disabled={isUploading}
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-300">Position</label>
//                 <select
//                   name="position"
//                   value={formData.position}
//                   onChange={handleInputChange}
//                   className="mt-1 block w-full bg-gray-700 border-1.5 border-black rounded-lg text-black shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                   disabled={isUploading}
//                 >
//                   <option value="right">Right</option>
//                   <option value="left">Left</option>
//                 </select>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-300">Background Color (Tailwind class)</label>
//                 <input
//                   type="text"
//                   name="bgColor"
//                   value={formData.bgColor}
//                   onChange={handleInputChange}
//                   className="mt-1 block w-full bg-gray-700 border-1.5 border-black rounded-lg text-black shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                   placeholder="e.g., bg-white"
//                   disabled={isUploading}
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-300">Text Color (Hex)</label>
//                 <input
//                   type="text"
//                   name="textColor"
//                   value={formData.textColor}
//                   onChange={handleInputChange}
//                   className="mt-1 block w-full bg-gray-700 border-1.5 border-black rounded-lg text-black shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//                   placeholder="e.g., #374151"
//                   disabled={isUploading}
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-300">Upload Images (up to 5, JPEG/PNG)</label>
//                 <input
//                   type="file"
//                   accept="image/jpeg,image/png"
//                   multiple
//                   onChange={handleFileChange}
//                   className="mt-1 block w-full text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-1.5 file:border-black file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
//                   required
//                   disabled={isUploading}
//                 />
//               </div>
//               <button
//                 type="submit"
//                 className={`w-full bg-blue-600 text-white font-semibold rounded-lg py-3 px-4 transition-colors transform hover:scale-105 animate__animated animate__pulse animate__infinite ${
//                   isUploading ? 'opacity-50 cursor-not-allowed' : 'opacity-100'
//                 }`}
//                 disabled={isUploading}
//               >
//                 {isUploading ? 'Uploading...' : 'Upload Event'}
//               </button>
//             </form>

//             <h3 className="text-2xl font-semibold text-blue-400 mb-6">Manage Events</h3>
//             {events.length === 0 ? (
//               <p className="text-gray-400">No events available.</p>
//             ) : (
//               <div className="space-y-4">
//                 {events.map((event) => (
//                   <div key={event._id} className="border p-4 rounded-lg shadow-md bg-gray-700 animate__animated animate__fadeIn">
//                     <h4 className="text-lg font-medium text-white">{event.title}</h4>
//                     <p className="text-gray-300">{event.description}</p>
//                     <p className="text-sm text-gray-400 mt-1">
//                       Position: {event.position}
//                     </p>
//                     <p className="text-sm text-gray-400">
//                       Background Color: {event.bgColor}
//                     </p>
//                     <p className="text-sm text-gray-400">
//                       Text Color: {event.textColor}
//                     </p>
//                     <p className="text-sm text-gray-400">
//                       Posted on: {new Date(event.createdAt).toLocaleDateString()}
//                     </p>
//                     {event.images?.length > 0 && (
//                       <div className="flex flex-wrap gap-2 mt-2">
//                         {event.images.map((image, index) => (
//                           <a
//                             key={index}
//                             href={image.url}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="text-blue-400 hover:underline"
//                           >
//                             <img
//                               src={image.url}
//                               alt={`Event ${event.title} image ${index + 1}`}
//                               className="w-24 h-24 object-cover rounded-md"
//                               onError={(e) => (e.target.src = '/images/placeholder.png')}
//                             />
//                           </a>
//                         ))}
//                       </div>
//                     )}
//                     <button
//                       onClick={() =>
//                         deleteEvent(
//                           event._id,
//                           event.images?.map((img) => img.publicId) || []
//                         )
//                       }
//                       className="mt-2 bg-red-600 hover:bg-red-700 text-white py-1 px-4 rounded-lg transition-colors transform hover:scale-110 animate__animated animate__pulse animate__infinite"
//                     >
//                       Delete
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </section>
//         )}

//         {/* Pending Approvals */}
//         {activeSection === 'pending' && (
//           <section className="bg-gray-800 p-8 rounded-xl shadow-2xl animate__animated animate__fadeInUp">
//             <h3 className="text-2xl font-semibold text-blue-400 mb-6">Pending Approvals</h3>
//             {pending.length === 0 ? (
//               <p className="text-gray-400">No pending requests.</p>
//             ) : (
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 {pending.map((a) => renderAlumniCard(a, true))}
//               </div>
//             )}
//           </section>
//         )}

//         {/* Approved Alumni */}
//         {activeSection === 'approved' && (
//           <section className="bg-gray-800 p-8 rounded-xl shadow-2xl animate__animated animate__fadeInUp">
//             <h3 className="text-2xl font-semibold text-blue-400 mb-6">Approved Alumni</h3>
//             {approved.length === 0 ? (
//               <p className="text-gray-400">No approved alumni yet.</p>
//             ) : (
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 {approved.map((a) => renderAlumniCard(a, false))}
//               </div>
//             )}
//           </section>
//         )}

//         {/* Denied Alumni */}
//         {activeSection === 'denied' && (
//           <section className="bg-gray-800 p-8 rounded-xl shadow-2xl animate__animated animate__fadeInUp">
//             <h3 className="text-2xl font-semibold text-blue-400 mb-6">Denied Alumni</h3>
//             {denied.length === 0 ? (
//               <p className="text-gray-400">No denied alumni yet.</p>
//             ) : (
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 {denied.map((a) => renderAlumniCard(a, false))}
//               </div>
//             )}
//           </section>
//         )}
//       </div>
//     </div>
//   );
// }

import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Admindashboard() {
  const [pending, setPending] = useState([]);
  const [approved, setApproved] = useState([]);
  const [denied, setDenied] = useState([]);
  const [faculty, setFaculty] = useState([]);
  const [events, setEvents] = useState([]);
  const [notifications, setNotifications] = useState([]); // Added notifications state
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    department: '',
    email: '',
    phone: '',
    expertise: '',
    bio: '',
    Designation: '',
    description: '',
    position: 'right',
    bgColor: 'bg-white',
    textColor: '#374151',
    files: [],
  });
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isUploading, setIsUploading] = useState(false);
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

  const fetchFaculty = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/faculty', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setFaculty(response.data);
    } catch (err) {
      console.error('Error fetching faculty:', err);
      setError('Failed to fetch faculty.');
    }
  };

  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/events', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setEvents(response.data);
    } catch (err) {
      console.error('Error fetching events:', err);
      setError('Failed to fetch events.');
    }
  };

  const fetchNotifications = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/notifications', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setNotifications(response.data);
    } catch (err) {
      console.error('Error fetching notifications:', err);
      setError('Failed to fetch notifications.');
    }
  }; // Added fetchNotifications

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

  const deleteFaculty = async (id) => {
    if (!window.confirm('Are you sure you want to delete this faculty member?')) return;
    try {
      await axios.delete(`http://localhost:5000/api/faculty/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setSuccess('Faculty member deleted successfully!');
      fetchFaculty();
    } catch (err) {
      console.error('Error deleting faculty:', err);
      setError('Failed to delete faculty member.');
    }
  };

  const deleteEvent = async (id, publicIds) => {
    if (!window.confirm('Are you sure you want to delete this event?')) return;
    try {
      if (!publicIds || !Array.isArray(publicIds) || publicIds.length === 0) {
        throw new Error('No valid public IDs provided for image deletion.');
      }
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found.');
      }
      await axios.delete(`http://localhost:5000/api/events/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
        data: { publicIds },
      });
      setSuccess('Event deleted successfully!');
      fetchEvents();
    } catch (err) {
      console.error('Error deleting event:', err);
      setError(
        err.response?.status === 401
          ? 'Unauthorized: Please log in again.'
          : err.response?.status === 404
          ? 'Event not found.'
          : err.message || 'Failed to delete event.'
      );
    }
  };

  const deleteNotification = async (id, publicId) => {
    if (!window.confirm('Are you sure you want to delete this notification?')) return;
    try {
      await axios.delete(`http://localhost:5000/api/notifications/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        data: { publicId },
      });
      setSuccess('Notification deleted successfully!');
      fetchNotifications();
    } catch (err) {
      console.error('Error deleting notification:', err);
      setError(err.response?.data?.error || 'Failed to delete notification.');
    }
  }; // Added deleteNotification

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    if (selectedFiles.length > 5) {
      setError('Maximum 5 images allowed.');
      setFormData({ ...formData, files: [] });
      return;
    }
    for (const file of selectedFiles) {
      if (!['image/jpeg', 'image/png'].includes(file.type)) {
        setError('Please upload valid images (JPEG, PNG).');
        setFormData({ ...formData, files: [] });
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setError('Each image must be under 5MB.');
        setFormData({ ...formData, files: [] });
        return;
      }
    }
    setFormData({ ...formData, files: selectedFiles });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && !['image/jpeg', 'image/png'].includes(file.type)) {
      setError('Please upload a valid image (JPEG, PNG).');
      setImage(null);
      return;
    }
    if (file && file.size > 5 * 1024 * 1024) {
      setError('Image must be under 5MB.');
      setImage(null);
      return;
    }
    setImage(file);
  };

  const handleEventSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsUploading(true);

    const { title, description, position, bgColor, textColor, files } = formData;
    if (!title || !description || files.length === 0) {
      setError('Title, description, and at least one image are required.');
      setIsUploading(false);
      return;
    }

    const data = new FormData();
    data.append('title', title);
    data.append('description', description);
    data.append('position', position);
    data.append('bgColor', bgColor);
    data.append('textColor', textColor);
    files.forEach((file) => data.append('images', file));

    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/events', data, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      setSuccess('Event uploaded successfully!');
      setFormData({
        ...formData,
        title: '',
        description: '',
        position: 'right',
        bgColor: 'bg-white',
        textColor: '#374151',
        files: [],
      });
      e.target.reset();
      fetchEvents();
    } catch (err) {
      console.error('Event upload error:', err);
      setError(err.response?.data?.error || 'Failed to upload event.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleFacultySubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsUploading(true);

    const { name, title, department, email, phone, expertise, bio, Designation } = formData;
    if (!name) {
      setError('Name is required.');
      setIsUploading(false);
      return;
    }

    const data = new FormData();
    data.append('name', name);
    data.append('title', title);
    data.append('department', department);
    data.append('email', email);
    data.append('phone', phone);
    data.append('expertise', expertise);
    data.append('bio', bio);
    data.append('Designation', Designation);
    if (image) data.append('image', image);

    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/faculty', data, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      setSuccess('Faculty member added successfully!');
      setFormData({
        ...formData,
        name: '',
        title: '',
        department: '',
        email: '',
        phone: '',
        expertise: '',
        bio: '',
        Designation: '',
      });
      setImage(null);
      e.target.reset();
      fetchFaculty();
    } catch (err) {
      console.error('Faculty upload error:', err);
      setError(err.response?.data?.error || 'Failed to add faculty member.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleNotificationSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsUploading(true);

    const { title, description, files } = formData;
    if (!title || !description || !files[0]) {
      setError('All fields are required.');
      setIsUploading(false);
      return;
    }

    const data = new FormData();
    data.append('title', title);
    data.append('description', description);
    data.append('file', files[0]);

    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/notifications', data, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      setSuccess('Notification uploaded successfully!');
      setFormData({
        ...formData,
        title: '',
        description: '',
        position: 'right',
        bgColor: 'bg-white',
        textColor: '#374151',
        files: [],
      });
      e.target.reset();
      fetchNotifications();
    } catch (err) {
      console.error('Notification upload error:', err);
      setError(err.response?.data?.error || 'Failed to upload notification.');
    } finally {
      setIsUploading(false);
    }
  }; // Added handleNotificationSubmit

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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
      fetchFaculty();
      fetchEvents();
      fetchNotifications(); // Added fetchNotifications
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
              { id: 'faculty', label: 'Faculty', icon: '👨‍🏫' },
              { id: 'events', label: 'Events', icon: '🎉' },
              { id: 'notification', label: 'Notifications', icon: '🔔' }, // Added Notifications
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

        {/* Notification Section */}
        {activeSection === 'notification' && (
          <section className="bg-gray-800 p-8 rounded-xl shadow-2xl animate__animated animate__fadeInUp">
            <h3 className="text-2xl font-semibold text-blue-400 mb-6">Upload Notification</h3>
            <form onSubmit={handleNotificationSubmit} className="space-y-6 mb-8">
              <div>
                <label className="block text-sm font-medium text-gray-300">Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="mt-1 block w-full bg-gray-700 border-1.5 border-black rounded-lg text-black shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  required
                  disabled={isUploading}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="mt-1 block w-full bg-gray-700 border-1.5 border-black rounded-lg text-black shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  rows="4"
                  required
                  disabled={isUploading}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">Upload Image or PDF</label>
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/gif,application/pdf"
                  onChange={(e) => setFormData({ ...formData, files: [e.target.files[0]] })}
                  className="mt-1 block w-full text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
                  required
                  disabled={isUploading}
                />
              </div>
              <button
                type="submit"
                className={`w-full bg-blue-600 text-white font-semibold rounded-lg py-3 px-4 transition-colors transform hover:scale-105 animate__animated animate__pulse animate__infinite ${
                  isUploading ? 'opacity-50 cursor-not-allowed' : 'opacity-100'
                }`}
                disabled={isUploading}
              >
                {isUploading ? 'Uploading...' : 'Upload Notification'}
              </button>
            </form>

            <h3 className="text-2xl font-semibold text-blue-400 mb-6">Manage Notifications</h3>
            {notifications.length === 0 ? (
              <p className="text-gray-400">No notifications available.</p>
            ) : (
              <div className="space-y-4">
                {notifications.map((notification) => (
                  <div key={notification._id} className="border p-4 rounded-lg shadow-md bg-gray-700 animate__animated animate__fadeIn">
                    <h4 className="text-lg font-medium text-white">{notification.title}</h4>
                    <p className="text-gray-300">{notification.description}</p>
                    <p className="text-sm text-gray-400 mt-1">
                      Posted on: {new Date(notification.createdAt).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-400">
                      File:{' '}
                      <a
                        href={notification.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:underline"
                      >
                        {notification.fileType === 'pdf' ? 'View PDF' : 'View Image'}
                      </a>
                    </p>
                    <button
                      onClick={() => deleteNotification(notification._id, notification.publicId)}
                      className="mt-2 bg-red-600 hover:bg-red-700 text-white py-1 px-4 rounded-lg transition-colors transform hover:scale-110 animate__animated animate__pulse animate__infinite"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {/* Faculty Section */}
        {activeSection === 'faculty' && (
          <section className="bg-gray-800 p-8 rounded-xl shadow-2xl animate__animated animate__fadeInUp">
            <h3 className="text-2xl font-semibold text-blue-400 mb-6">Manage Faculty</h3>
            <form onSubmit={handleFacultySubmit} className="space-y-6 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border-1.5 border-black rounded-lg text-black shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    required
                    disabled={isUploading}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300">Title</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="mt-1 block w-full bg-gray-700 border-1.5 border-black rounded-lg text-black shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    disabled={isUploading}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300">Department</label>
                  <input
                    type="text"
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                    className="mt-1 block w-full bg-gray-700 border-1.5 border-black rounded-lg text-black shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    disabled={isUploading}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="mt-1 block w-full bg-gray-700 border-1.5 border-black rounded-lg text-black shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    disabled={isUploading}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300">Phone</label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="mt-1 block w-full bg-gray-700 border-1.5 border-black rounded-lg text-black shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    disabled={isUploading}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300">Expertise (comma-separated)</label>
                  <input
                    type="text"
                    name="expertise"
                    value={formData.expertise}
                    onChange={handleInputChange}
                    className="mt-1 block w-full bg-gray-700 border-1.5 border-black rounded-lg text-black shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="e.g., JavaScript, Python"
                    disabled={isUploading}
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-300">Bio</label>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    className="mt-1 block w-full bg-gray-700 border-1.5 border-black rounded-lg text-black shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    rows="4"
                    disabled={isUploading}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300">Designation</label>
                  <input
                    type="text"
                    name="Designation"
                    value={formData.Designation}
                    onChange={handleInputChange}
                    className="mt-1 block w-full bg-gray-700 border-1.5 border-black rounded-lg text-black shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    disabled={isUploading}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300">Image</label>
                  <input
                    type="file"
                    accept="image/jpeg,image/png"
                    onChange={handleImageChange}
                    className="mt-1 block w-full text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-1.5 file:border-black file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
                    disabled={isUploading}
                  />
                </div>
              </div>
              <button
                type="submit"
                className={`w-full bg-blue-600 text-white font-semibold rounded-lg py-3 px-4 transition-colors transform hover:scale-105 animate__animated animate__pulse animate__infinite ${
                  isUploading ? 'opacity-50 cursor-not-allowed' : 'opacity-100'
                }`}
                disabled={isUploading}
              >
                {isUploading ? 'Adding...' : 'Add Faculty'}
              </button>
            </form>

            <h3 className="text-2xl font-semibold text-blue-400 mb-6">Faculty List</h3>
            {faculty.length === 0 ? (
              <p className="text-gray-400">No faculty members available.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {faculty.map((f) => (
                  <div
                    key={f._id}
                    className="flex justify-between items-center border p-4 rounded-lg shadow-md bg-gray-700 animate__animated animate__fadeIn"
                  >
                    <div>
                      <h4 className="text-lg font-medium text-white">{f.name}</h4>
                      <p className="text-sm text-gray-300">{f.Designation}</p>
                    </div>
                    <button
                      onClick={() => deleteFaculty(f._id)}
                      className="bg-red-600 hover:bg-red-700 text-white py-1 px-4 rounded-lg transition-colors transform hover:scale-110 animate__animated animate__pulse animate__infinite"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {/* Events Section */}
        {activeSection === 'events' && (
          <section className="bg-gray-800 p-8 rounded-xl shadow-2xl animate__animated animate__fadeInUp">
            <h3 className="text-2xl font-semibold text-blue-400 mb-6">Upload Event</h3>
            <form onSubmit={handleEventSubmit} className="space-y-6 mb-8">
              <div>
                <label className="block text-sm font-medium text-gray-300">Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border-1.5 border-black rounded-lg text-black shadow-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  required
                  disabled={isUploading}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="mt-1 block w-full bg-gray-700 border-1.5 border-black rounded-lg text-black shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  rows="4"
                  required
                  disabled={isUploading}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">Position</label>
                <select
                  name="position"
                  value={formData.position}
                  onChange={handleInputChange}
                  className="mt-1 block w-full bg-gray-700 border-1.5 border-black rounded-lg text-black shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  disabled={isUploading}
                >
                  <option value="right">Right</option>
                  <option value="left">Left</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">Background Color (Tailwind class)</label>
                <input
                  type="text"
                  name="bgColor"
                  value={formData.bgColor}
                  onChange={handleInputChange}
                  className="mt-1 block w-full bg-gray-700 border-1.5 border-black rounded-lg text-black shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="e.g., bg-white"
                  disabled={isUploading}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">Text Color (Hex)</label>
                <input
                  type="text"
                  name="textColor"
                  value={formData.textColor}
                  onChange={handleInputChange}
                  className="mt-1 block w-full bg-gray-700 border-1.5 border-black rounded-lg text-black shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="e.g., #374151"
                  disabled={isUploading}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">Upload Images (up to 5, JPEG/PNG)</label>
                <input
                  type="file"
                  accept="image/jpeg,image/png"
                  multiple
                  onChange={handleFileChange}
                  className="mt-1 block w-full text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-1.5 file:border-black file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
                  required
                  disabled={isUploading}
                />
              </div>
              <button
                type="submit"
                className={`w-full bg-blue-600 text-white font-semibold rounded-lg py-3 px-4 transition-colors transform hover:scale-105 animate__animated animate__pulse animate__infinite ${
                  isUploading ? 'opacity-50 cursor-not-allowed' : 'opacity-100'
                }`}
                disabled={isUploading}
              >
                {isUploading ? 'Uploading...' : 'Upload Event'}
              </button>
            </form>

            <h3 className="text-2xl font-semibold text-blue-400 mb-6">Manage Events</h3>
            {events.length === 0 ? (
              <p className="text-gray-400">No events available.</p>
            ) : (
              <div className="space-y-4">
                {events.map((event) => (
                  <div key={event._id} className="border p-4 rounded-lg shadow-md bg-gray-700 animate__animated animate__fadeIn">
                    <h4 className="text-lg font-medium text-white">{event.title}</h4>
                    <p className="text-gray-300">{event.description}</p>
                    <p className="text-sm text-gray-400 mt-1">
                      Position: {event.position}
                    </p>
                    <p className="text-sm text-gray-400">
                      Background Color: {event.bgColor}
                    </p>
                    <p className="text-sm text-gray-400">
                      Text Color: {event.textColor}
                    </p>
                    <p className="text-sm text-gray-400">
                      Posted on: {new Date(event.createdAt).toLocaleDateString()}
                    </p>
                    {event.images?.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {event.images.map((image, index) => (
                          <a
                            key={index}
                            href={image.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:underline"
                          >
                            <img
                              src={image.url}
                              alt={`Event ${event.title} image ${index + 1}`}
                              className="w-24 h-24 object-cover rounded-md"
                              onError={(e) => (e.target.src = '/images/placeholder.png')}
                            />
                          </a>
                        ))}
                      </div>
                    )}
                    <button
                      onClick={() =>
                        deleteEvent(
                          event._id,
                          event.images?.map((img) => img.publicId) || []
                        )
                      }
                      className="mt-2 bg-red-600 hover:bg-red-700 text-white py-1 px-4 rounded-lg transition-colors transform hover:scale-110 animate__animated animate__pulse animate__infinite"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            )}
          </section>
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
