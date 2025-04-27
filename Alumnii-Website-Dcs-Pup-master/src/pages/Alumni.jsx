// import React, { useState, useEffect, useRef, useCallback } from 'react';
// import data from '../data/aluminiData.json';
// import { Link } from 'react-router-dom';

// export default function Alumni() {
//     const [searchTerm, setSearchTerm] = useState("");
//     const [filteredData, setFilteredData] = useState([]);
//     const [visibleCount, setVisibleCount] = useState(25);
//     const [selectedCourse, setSelectedCourse] = useState("");
//     const [currentIndex, setCurrentIndex] = useState(0);
//     const inputRef = useRef(null);
//     const loaderRef = useRef(null);
//     const slides = [
//         { id: 1, image: 'images/slider1.jpg' },
//         { id: 2, image: 'images/slider2.jpg' },
//         { id: 3, image: 'images/slider3.jpg' },
//         { id: 4, image: 'images/slider4.jpg' },
//         { id: 5, image: 'images/slider5.jpg' },
//     ];
//     const extractYear = (batch) => {
//         if (!batch) return 0;
//         const years = String(batch).match(/\d{4}/g);
//         return years ? Math.max(...years.map(Number)) : 0;
//     };
//     useEffect(() => {
//         let results = data;

//         if (searchTerm.trim()) {
//             results = results.filter((item) =>
//                 item.Name?.toLowerCase().includes(searchTerm.toLowerCase())
//             );
//         }

//         if (selectedCourse) {
//             results = results.filter((item) =>
//                 item.Course?.trim().toLowerCase() === selectedCourse.toLowerCase()
//             );
//         }
//         setFilteredData(
//             [...results].sort((a, b) => {
//                 const yearDiff = extractYear(b.Batch) - extractYear(a.Batch);
//                 if (yearDiff !== 0) return yearDiff;
//                 return (b.Image ? 1 : 0) - (a.Image ? 1 : 0);
//             })
//         );

//         setVisibleCount(25);
//     }, [searchTerm, selectedCourse]);

//     useEffect(() => {
//         const interval = setInterval(() => {
//             setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
//         }, 3000);
//         return () => clearInterval(interval);
//     }, [slides.length]);

//     const handleSearch = (e) => {
//         e.preventDefault();
//         inputRef.current.blur();
//     };

//     const handleReset = () => {
//         setSearchTerm("");
//         setSelectedCourse("");
//         setVisibleCount(25);
//         inputRef.current.focus();
//     };

//     const loadMore = useCallback(() => {
//         setVisibleCount((prev) => prev + 25);
//     }, []);

//     useEffect(() => {
//         const observer = new IntersectionObserver(
//             ([entry]) => {
//                 if (entry.isIntersecting && visibleCount < filteredData.length) {
//                     loadMore();
//                 }
//             },
//             { threshold: 1 }
//         );

//         if (loaderRef.current) observer.observe(loaderRef.current);
//         return () => {
//             if (loaderRef.current) observer.unobserve(loaderRef.current);
//         };
//     }, [loadMore, visibleCount, filteredData.length]);

//     return (
//         <div className="w-full mt-20">
//             <div className="relative hidden md:block max-h-full h-screen">
//                 {slides.map((slide, index) => (
//                     <div
//                         key={slide.id}
//                         className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
//                             index === currentIndex ? 'opacity-100' : 'opacity-0'
//                         }`}
//                     >
//                         <img src={slide.image} alt={`Slide ${index + 1}`} className="w-full h-full object-contain" />
//                     </div>
//                 ))}
//             </div>

//             <div className="w-full py-6 text-center">
//                 <h2 className="text-3xl font-semibold">All Alumni</h2>
//             </div>

//             <div className="w-full">
//                 <div className="max-w-[85%] mx-auto">
//                     <form onSubmit={handleSearch} className="flex flex-col md:flex-row justify-center items-center gap-4">
//                         <input
//                             ref={inputRef}
//                             type="text"
//                             placeholder="Search Alumni by Name..."
//                             value={searchTerm}
//                             onChange={(e) => setSearchTerm(e.target.value)}
//                             className="w-full md:w-[50%] px-4 py-2 border border-gray-300 rounded-lg shadow-md"
//                         />

//                         <select
//                             value={selectedCourse}
//                             onChange={(e) => setSelectedCourse(e.target.value)}
//                             className="w-full md:w-auto px-4 py-2 border border-gray-300 rounded-lg shadow-md"
//                         >
//                             <option value="">All Courses</option>
//                             <option value="MCA">MCA</option>
//                             <option value="PhD">PhD</option>
//                             <option value="B.Tech">B.Tech</option>
//                             <option value="M.Tech">M.Tech</option>
//                         </select>

//                         <button
//                             type="button"
//                             onClick={handleReset}
//                             className="px-4 py-2 bg-blue text-white rounded-lg shadow-md hover:bg-darkBlue"
//                         >
//                             Reset
//                         </button>
//                     </form>
//                 </div>
//             </div>

//             <div className="max-w-[90%] md:max-w-[85%] mx-auto my-10 md:my-24">
//                 {filteredData.length ? (
//                     <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
//                         {filteredData.slice(0, visibleCount).map((item, index) => (
//                             <div
//                                 key={index}
//                                 className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105"
//                             >
//                                 <div className="h-64 md:h-72 lg:h-96">
//                                     <img
//                                         src={item.Image || '/images/user.jpg'}
//                                         alt={item.Name}
//                                         className="w-full h-full object-cover"
//                                     />
//                                 </div>
//                                 <div className="p-4 text-sm md:text-base">
//                                     <h3 className="text-lg md:text-xl font-bold">{item.Name}</h3>
//                                     {item.Course && <p><strong>Course:</strong> {item.Course}</p>}
//                                     {item.Batch && <p><strong>Batch:</strong> {item.Batch}</p>}
//                                     {item.Occupation && <p><strong>Occupation:</strong> {item.Occupation}</p>}
//                                     {item.Skill && <p><strong>Skills:</strong> {item.Skill}</p>}
//                                     {item.LinkedIn && (
//                                         <p>
//                                             <strong>LinkedIn:</strong>{" "}
//                                             <Link to={item.LinkedIn} className="underline text-blue">
//                                                 {item.Name}
//                                             </Link>
//                                         </p>
//                                     )}
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 ) : (
//                     <p className="text-center text-gray-500 mt-10">
//                         {searchTerm ? `No alumni found matching "${searchTerm}".` : "No alumni data available."}
//                     </p>
//                 )}
//             </div>

//             {visibleCount < filteredData.length && (
//                 <div ref={loaderRef} className="text-center my-8">
//                     <p className="text-gray-500">Loading more alumni...</p>
//                 </div>
//             )}
//         </div>
//     );
// }
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom'; // if you're using React Router

// export default function Alumni() {
//   const [alumni, setAlumni] = useState([]);
//   const [visibleCount, setVisibleCount] = useState(12);
//   const [searchTerm, setSearchTerm] = useState('');

//   useEffect(() => {
//     axios.get('http://localhost:5000/api/alumni/approved')
//       .then(res => setAlumni(res.data))
//       .catch(err => console.error("Failed to fetch alumni:", err));
//   }, []);

//   const filteredData = alumni.filter(item =>
//     item.name?.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="max-w-[90%] md:max-w-[85%] mx-auto my-10 md:my-24">
//       <input
//         type="text"
//         placeholder="Search alumni by name"
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//         className="block w-full mb-6 p-3 border rounded-md shadow"
//       />

//       {filteredData.length > 0 ? (
//         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
//           {filteredData.slice(0, visibleCount).map((item, index) => (
//             <div
//               key={index}
//               className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105"
//             >
//               <div className="h-64 md:h-72 lg:h-96">
//                 <img
//                   src={item.photo || '/images/user.jpg'}
//                   alt={item.name}
//                   className="w-full h-full object-cover"
//                 />
//               </div>
//               <div className="p-4 text-sm md:text-base">
//                 <h3 className="text-lg md:text-xl font-bold">{item.name}</h3>
//                 {item.course && <p><strong>Course:</strong> {item.course}</p>}
//                 {item.batch && <p><strong>Batch:</strong> {item.batch}</p>}
//                 {item.class && <p><strong>Class:</strong> {item.class}</p>}
//                 {item.occupation && <p><strong>Occupation:</strong> {item.occupation}</p>}
//                 {item.skill && <p><strong>Skills:</strong> {item.skill}</p>}
//                 {item.linkedin && (
//                   <p>
//                     <strong>LinkedIn:</strong>{" "}
//                     <Link to={item.linkedin} className="underline text-blue-600" target="_blank" rel="noopener noreferrer">
//                       {item.name}
//                     </Link>
//                   </p>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <p className="text-center text-gray-500 mt-10">
//           {searchTerm ? `No alumni found matching "${searchTerm}".` : "No alumni data available."}
//         </p>
//       )}
//     </div>
//   );
// }
// import React, { useState, useEffect, useRef, useCallback } from 'react';
// import localData from '../data/aluminiData.json';
// import axios from 'axios';
// import { Link } from 'react-router-dom';

// export default function Alumni() {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedCourse, setSelectedCourse] = useState('');
//   const [visibleCount, setVisibleCount] = useState(25);
//   const [combinedData, setCombinedData] = useState([]);
//   const inputRef = useRef(null);
//   const loaderRef = useRef(null);

//   // Load MongoDB data
//   useEffect(() => {
//     axios
//       .get('http://localhost:5000/api/alumni/approved')
//       .then((res) => {
//         const mongoData = res.data;
//         const merged = [...localData, ...mongoData];
//         setCombinedData(sortAndFilterData(merged, searchTerm, selectedCourse));
//       })
//       .catch((err) => {
//         console.error('Failed to fetch alumni:', err);
//         setCombinedData(sortAndFilterData(localData, searchTerm, selectedCourse));
//       });
//   }, []);

//   // Extract year from batch string
//   const extractYear = (batch) => {
//     if (!batch) return 0;
//     const years = String(batch).match(/\d{4}/g);
//     return years ? Math.max(...years.map(Number)) : 0;
//   };

//   // Filter and sort function
//   const sortAndFilterData = (data, term, course) => {
//     let results = data;

//     if (term.trim()) {
//       results = results.filter((item) =>
//         (item.Name || item.name)?.toLowerCase().includes(term.toLowerCase())
//       );
//     }

//     if (course) {
//       results = results.filter(
//         (item) =>
//           (item.Course || item.course)?.trim().toLowerCase() === course.toLowerCase()
//       );
//     }

//     return [...results].sort((a, b) => {
//       const yearDiff =
//         extractYear(b.Batch || b.batch) - extractYear(a.Batch || a.batch);
//       if (yearDiff !== 0) return yearDiff;
//       return (b.Image || b.photo ? 1 : 0) - (a.Image || a.photo ? 1 : 0);
//     });
//   };

//   // Update filtered and sorted data when searchTerm or selectedCourse changes
//   useEffect(() => {
//     const merged = [...localData, ...combinedData.filter(d => !localData.includes(d))];
//     const updated = sortAndFilterData(merged, searchTerm, selectedCourse);
//     setCombinedData(updated);
//     setVisibleCount(25);
//   }, [searchTerm, selectedCourse]);

//   const handleReset = () => {
//     setSearchTerm('');
//     setSelectedCourse('');
//     setVisibleCount(25);
//     inputRef.current.focus();
//   };

//   const loadMore = useCallback(() => {
//     setVisibleCount((prev) => prev + 25);
//   }, []);

//   // IntersectionObserver to auto-load more alumni
//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting && visibleCount < combinedData.length) {
//           loadMore();
//         }
//       },
//       { threshold: 1 }
//     );

//     if (loaderRef.current) observer.observe(loaderRef.current);
//     return () => {
//       if (loaderRef.current) observer.unobserve(loaderRef.current);
//     };
//   }, [loadMore, visibleCount, combinedData.length]);

//   return (
//     <div className="w-full mt-20">
//       <div className="w-full py-6 text-center">
//         <h2 className="text-3xl font-semibold">All Alumni (Local + MongoDB)</h2>
//       </div>

//       <div className="w-full">
//         <div className="max-w-[85%] mx-auto">
//           <form
//             onSubmit={(e) => {
//               e.preventDefault();
//               inputRef.current.blur();
//             }}
//             className="flex flex-col md:flex-row justify-center items-center gap-4"
//           >
//             <input
//               ref={inputRef}
//               type="text"
//               placeholder="Search Alumni by Name..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="w-full md:w-[50%] px-4 py-2 border border-gray-300 rounded-lg shadow-md"
//             />

//             <select
//               value={selectedCourse}
//               onChange={(e) => setSelectedCourse(e.target.value)}
//               className="w-full md:w-auto px-4 py-2 border border-gray-300 rounded-lg shadow-md"
//             >
//               <option value="">All Courses</option>
//               <option value="MCA">MCA</option>
//               <option value="PhD">PhD</option>
//               <option value="B.Tech">B.Tech</option>
//               <option value="M.Tech">M.Tech</option>
//             </select>

//             <button
//               type="button"
//               onClick={handleReset}
//               className="px-4 py-2 bg-blue text-white rounded-lg shadow-md hover:bg-darkBlue"
//             >
//               Reset
//             </button>
//           </form>
//         </div>
//       </div>

//       <div className="max-w-[90%] md:max-w-[85%] mx-auto my-10 md:my-24">
//         {combinedData.length > 0 ? (
//           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
//             {combinedData.slice(0, visibleCount).map((item, index) => (
//               <div
//                 key={index}
//                 className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105"
//               >
//                 <div className="h-64 md:h-72 lg:h-96">
//                   <img
//                     src={item.Image || item.photo || '/images/user.jpg'}
//                     alt={item.Name || item.name}
//                     className="w-full h-full object-cover"
//                   />
//                 </div>
//                 <div className="p-4 text-sm md:text-base">
//                   <h3 className="text-lg md:text-xl font-bold">{item.Name || item.name}</h3>
//                   {(item.Course || item.course) && (
//                     <p><strong>Course:</strong> {item.Course || item.course}</p>
//                   )}
//                   {(item.Batch || item.batch) && (
//                     <p><strong>Batch:</strong> {item.Batch || item.batch}</p>
//                   )}
//                   {(item.Class || item.class) && (
//                     <p><strong>Class:</strong> {item.Class || item.class}</p>
//                   )}
//                   {item.Occupation || item.occupation ? (
//                     <p><strong>Occupation:</strong> {item.Occupation || item.occupation}</p>
//                   ) : null}
//                   {(item.Skill || item.skill) && (
//                     <p><strong>Skills:</strong> {item.Skill || item.skill}</p>
//                   )}
//                   {(item.LinkedIn || item.linkedin) && (
//                     <p>
//                       <strong>LinkedIn:</strong>{" "}
//                       <Link
//                         to={item.LinkedIn || item.linkedin}
//                         className="underline text-blue-600"
//                         target="_blank"
//                         rel="noopener noreferrer"
//                       >
//                         {item.Name || item.name}
//                       </Link>
//                     </p>
//                   )}
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <p className="text-center text-gray-500 mt-10">
//             {searchTerm
//               ? `No alumni found matching "${searchTerm}".`
//               : 'No alumni data available.'}
//           </p>
//         )}
//       </div>

//       {visibleCount < combinedData.length && (
//         <div ref={loaderRef} className="text-center my-8">
//           <p className="text-gray-500">Loading more alumni...</p>
//         </div>
//       )}
//     </div>
//   );
// }




// import React, { useState, useEffect, useRef, useCallback } from 'react';
// import localData from '../data/aluminiData.json';
// import axios from 'axios';
// import { Link } from 'react-router-dom';

// export default function Alumni() {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedCourse, setSelectedCourse] = useState('');
//   const [visibleCount, setVisibleCount] = useState(25);
//   const [combinedData, setCombinedData] = useState([]);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const inputRef = useRef(null);
//   const loaderRef = useRef(null);

//   const slides = [
//     { id: 1, image: 'images/slider1.jpg' },
//     { id: 2, image: 'images/slider2.jpg' },
//     { id: 3, image: 'images/slider3.jpg' },
//     { id: 4, image: 'images/slider4.jpg' },
//     { id: 5, image: 'images/slider5.jpg' },
//   ];

//   useEffect(() => {
//     axios
//       .get('http://localhost:5000/api/alumni/approved')
//       .then((res) => {
//         const mongoData = res.data;
//         const merged = [...localData, ...mongoData];
//         setCombinedData(sortAndFilterData(merged, searchTerm, selectedCourse));
//       })
//       .catch((err) => {
//         console.error('Failed to fetch alumni:', err);
//         setCombinedData(sortAndFilterData(localData, searchTerm, selectedCourse));
//       });
//   }, []);

//   useEffect(() => {
//     const merged = [...localData, ...combinedData.filter(d => !localData.includes(d))];
//     const updated = sortAndFilterData(merged, searchTerm, selectedCourse);
//     setCombinedData(updated);
//     setVisibleCount(25);
//   }, [searchTerm, selectedCourse]);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentIndex((prev) => (prev + 1) % slides.length);
//     }, 3000);
//     return () => clearInterval(interval);
//   }, [slides.length]);

//   const extractYear = (batch) => {
//     if (!batch) return 0;
//     const years = String(batch).match(/\d{4}/g);
//     return years ? Math.max(...years.map(Number)) : 0;
//   };

//   const sortAndFilterData = (data, term, course) => {
//     let results = data;

//     if (term.trim()) {
//       results = results.filter((item) =>
//         (item.Name || item.name)?.toLowerCase().includes(term.toLowerCase())
//       );
//     }

//     if (course) {
//       results = results.filter(
//         (item) =>
//           (item.Course || item.course)?.trim().toLowerCase() === course.toLowerCase()
//       );
//     }

//     return [...results].sort((a, b) => {
//       const yearDiff = extractYear(b.Batch || b.batch) - extractYear(a.Batch || a.batch);
//       if (yearDiff !== 0) return yearDiff;
//       return (b.Image || b.photo ? 1 : 0) - (a.Image || a.photo ? 1 : 0);
//     });
//   };

//   const handleReset = () => {
//     setSearchTerm('');
//     setSelectedCourse('');
//     setVisibleCount(25);
//     inputRef.current.focus();
//   };

//   const loadMore = useCallback(() => {
//     setVisibleCount((prev) => prev + 25);
//   }, []);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting && visibleCount < combinedData.length) {
//           loadMore();
//         }
//       },
//       { threshold: 1 }
//     );

//     if (loaderRef.current) observer.observe(loaderRef.current);
//     return () => {
//       if (loaderRef.current) observer.unobserve(loaderRef.current);
//     };
//   }, [loadMore, visibleCount, combinedData.length]);

//   return (
//     <div className="w-full mt-20">
//       {/* Image Slider */}
//       <div className="relative hidden md:block max-h-full h-screen">
//         {slides.map((slide, index) => (
//           <div
//             key={slide.id}
//             className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
//               index === currentIndex ? 'opacity-100' : 'opacity-0'
//             }`}
//           >
//             <img
//               src={slide.image}
//               alt={`Slide ${index + 1}`}
//               className="w-full h-full object-contain"
//             />
//           </div>
//         ))}
//         <div className="absolute inset-0 flex justify-between items-center">
//           <button
//             className="text-white bg-black bg-opacity-50 p-2 rounded-full ml-4"
//             onClick={() =>
//               setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
//             }
//           >
//             &#10094;
//           </button>
//           <button
//             className="text-white bg-black bg-opacity-50 p-2 rounded-full mr-4"
//             onClick={() => setCurrentIndex((prev) => (prev + 1) % slides.length)}
//           >
//             &#10095;
//           </button>
//         </div>
//       </div>

//       {/* Heading */}
//       <div className="w-full py-6 text-center">
//         <h2 className="text-3xl font-semibold">All Alumni (Local + MongoDB)</h2>
//       </div>

//       {/* Search and Filter */}
//       <div className="w-full">
//         <div className="max-w-[85%] mx-auto">
//           <form
//             onSubmit={(e) => {
//               e.preventDefault();
//               inputRef.current.blur();
//             }}
//             className="flex flex-col md:flex-row justify-center items-center gap-4"
//           >
//             <input
//               ref={inputRef}
//               type="text"
//               placeholder="Search Alumni by Name..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="w-full md:w-[50%] px-4 py-2 border border-gray-300 rounded-lg shadow-md"
//             />
//             <select
//               value={selectedCourse}
//               onChange={(e) => setSelectedCourse(e.target.value)}
//               className="w-full md:w-auto px-4 py-2 border border-gray-300 rounded-lg shadow-md"
//             >
//               <option value="">All Courses</option>
//               <option value="MCA">MCA</option>
//               <option value="PhD">PhD</option>
//               <option value="B.Tech">B.Tech</option>
//               <option value="M.Tech">M.Tech</option>
//             </select>
//             <button
//               type="button"
//               onClick={handleReset}
//               className="px-4 py-2 bg-blue text-white rounded-lg shadow-md hover:bg-darkBlue"
//             >
//               Reset
//             </button>
//           </form>
//         </div>
//       </div>

//       {/* Alumni Cards */}
//       <div className="max-w-[90%] md:max-w-[85%] mx-auto my-10 md:my-24">
//         {combinedData.length > 0 ? (
//           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
//             {combinedData.slice(0, visibleCount).map((item, index) => (
//               <div
//                 key={index}
//                 className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105"
//               >
//                 <div className="h-64 md:h-72 lg:h-96">
//                   <img
//                     src={item.Image || item.photo || '/images/user.jpg'}
//                     alt={item.Name || item.name}
//                     className="w-full h-full object-cover"
//                   />
//                 </div>
//                 <div className="p-4 text-sm md:text-base">
//                   <h3 className="text-lg md:text-xl font-bold">{item.Name || item.name}</h3>
//                   {(item.Course || item.course) && (
//                     <p><strong>Course:</strong> {item.Course || item.course}</p>
//                   )}
//                   {(item.Batch || item.batch) && (
//                     <p><strong>Batch:</strong> {item.Batch || item.batch}</p>
//                   )}
//                   {(item.Class || item.class) && (
//                     <p><strong>Class:</strong> {item.Class || item.class}</p>
//                   )}
//                   {item.Occupation || item.occupation ? (
//                     <p><strong>Occupation:</strong> {item.Occupation || item.occupation}</p>
//                   ) : null}
//                   {(item.Skill || item.skill) && (
//                     <p><strong>Skills:</strong> {item.Skill || item.skill}</p>
//                   )}
//                   {(item.LinkedIn || item.linkedin) && (
//                     <p>
//                       <strong>LinkedIn:</strong>{" "}
//                       <Link
//                         to={item.LinkedIn || item.linkedin}
//                         className="underline text-blue-600"
//                         target="_blank"
//                         rel="noopener noreferrer"
//                       >
//                         {item.Name || item.name}
//                       </Link>
//                     </p>
//                   )}
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <p className="text-center text-gray-500 mt-10">
//             {searchTerm
//               ? `No alumni found matching "${searchTerm}".`
//               : 'No alumni data available.'}
//           </p>
//         )}
//       </div>

//       {visibleCount < combinedData.length && (
//         <div ref={loaderRef} className="text-center my-8">
//           <p className="text-gray-500">Loading more alumni...</p>
//         </div>
//       )}
//     </div>
//   );
// }




import React, { useState, useEffect, useRef, useCallback } from 'react';
import localData from '../data/aluminiData.json';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Alumni() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [visibleCount, setVisibleCount] = useState(25);
  const [combinedData, setCombinedData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const inputRef = useRef(null);
  const loaderRef = useRef(null);

  const slides = [
    { id: 1, image: 'images/slider1.jpg' },
    { id: 2, image: 'images/slider2.jpg' },
    { id: 3, image: 'images/slider3.jpg' },
    { id: 4, image: 'images/slider4.jpg' },
    { id: 5, image: 'images/slider5.jpg' },
  ];

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/alumni/approved')
      .then((res) => {
        const mongoData = res.data;
        const merged = [...localData, ...mongoData];
        setCombinedData(sortAndFilterData(merged, searchTerm, selectedCourse));
      })
      .catch((err) => {
        console.error('Failed to fetch alumni:', err);
        setCombinedData(sortAndFilterData(localData, searchTerm, selectedCourse));
      });
  }, []);

  useEffect(() => {
    const merged = [...localData, ...combinedData.filter(d => !localData.includes(d))];
    setCombinedData(sortAndFilterData(merged, searchTerm, selectedCourse));
    setVisibleCount(25);
  }, [searchTerm, selectedCourse]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const extractYear = (batch) => {
    if (!batch) return 0;
    const years = String(batch).match(/\d{4}/g);
    return years ? Math.max(...years.map(Number)) : 0;
  };

  const sortAndFilterData = (data, term, course) => {
    let results = data;

    if (term.trim()) {
      results = results.filter((item) =>
        (item.Name || item.name)?.toLowerCase().includes(term.toLowerCase())
      );
    }

    if (course) {
      results = results.filter(
        (item) =>
          (item.Course || item.course)?.trim().toLowerCase() === course.toLowerCase()
      );
    }

    return [...results].sort((a, b) => {
      const yearDiff = extractYear(b.Batch || b.batch) - extractYear(a.Batch || a.batch);
      if (yearDiff !== 0) return yearDiff;
      return (b.Image || b.photo ? 1 : 0) - (a.Image || a.photo ? 1 : 0);
    });
  };

  const handleReset = () => {
    setSearchTerm('');
    setSelectedCourse('');
    setVisibleCount(25);
    inputRef.current?.focus();
  };

  const loadMore = useCallback(() => {
    setVisibleCount((prev) => prev + 25);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && visibleCount < combinedData.length) {
          loadMore();
        }
      },
      { threshold: 1 }
    );

    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, [loadMore, visibleCount, combinedData.length]);

  return (
    <div className="w-full mt-20">
      {/* Image Slider */}
      <div className="relative hidden md:block max-h-full h-screen">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={slide.image}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-contain"
            />
          </div>
        ))}
        <div className="absolute inset-0 flex justify-between items-center">
          <button
            className="text-white bg-black bg-opacity-50 p-2 rounded-full ml-4"
            onClick={() =>
              setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
            }
          >
            &#10094;
          </button>
          <button
            className="text-white bg-black bg-opacity-50 p-2 rounded-full mr-4"
            onClick={() => setCurrentIndex((prev) => (prev + 1) % slides.length)}
          >
            &#10095;
          </button>
        </div>
      </div>

      {/* Heading */}
      <div className="w-full py-6 text-center">
        <h2 className="text-3xl font-semibold">All Alumni (Local + MongoDB)</h2>
      </div>

      {/* Search & Filter */}
      <div className="max-w-[85%] mx-auto">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            inputRef.current?.blur();
          }}
          className="flex flex-col md:flex-row justify-center items-center gap-4"
        >
          <input
            ref={inputRef}
            type="text"
            placeholder="Search Alumni by Name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-[50%] px-4 py-2 border border-gray-300 rounded-lg shadow-md"
          />
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="w-full md:w-auto px-4 py-2 border border-gray-300 rounded-lg shadow-md"
          >
            <option value="">All Courses</option>
            <option value="MCA">MCA</option>
            <option value="PhD">PhD</option>
            <option value="B.Tech">B.Tech</option>
            <option value="M.Tech">M.Tech</option>
          </select>
          <button
            type="button"
            onClick={handleReset}
            className="px-4 py-2 bg-blue text-white rounded-lg shadow-md hover:bg-darkBlue"
          >
            Reset
          </button>
        </form>
      </div>

      {/* Alumni Cards */}
      <div className="max-w-[90%] md:max-w-[85%] mx-auto my-10 md:my-24">
        {combinedData.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
            {combinedData.slice(0, visibleCount).map((item, index) => (
              <div
                key={index}
                className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105"
              >
                <div className="h-64 md:h-72 lg:h-96">
                  <img
                    src={item.Image || item.photo || '/images/user.jpg'}
                    alt={item.Name || item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4 text-sm md:text-base">
                  <h3 className="text-lg md:text-xl font-bold">{item.Name || item.name}</h3>
                  {(item.Course || item.course) && <p><strong>Course:</strong> {item.Course || item.course}</p>}
                  {(item.Batch || item.batch) && <p><strong>Batch:</strong> {item.Batch || item.batch}</p>}
                  {(item.Class || item.class) && <p><strong>Class:</strong> {item.Class || item.class}</p>}
                  {item.profession && <p><strong>Profession:</strong> {item.profession}</p>}
                  {item.organization && <p><strong>Organization:</strong> {item.organization}</p>}
                  {(item.Skill || item.skill) && <p><strong>Skills:</strong> {item.Skill || item.skill}</p>}
                  {(item.LinkedIn || item.linkedin) && (
                    <p>
                      <strong>LinkedIn:</strong>{' '}
                      <a
                        href={item.LinkedIn || item.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline"
                      >
                        Profile
                      </a>
                    </p>
                  )}
                  {item.website && (
                    <p>
                      <strong>Website:</strong>{' '}
                      <a
                        href={item.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline"
                      >
                        Visit
                      </a>
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 mt-10">
            {searchTerm
              ? `No alumni found matching "${searchTerm}".`
              : 'No alumni data available.'}
          </p>
        )}
      </div>

      {visibleCount < combinedData.length && (
        <div ref={loaderRef} className="text-center my-8">
          <p className="text-gray-500">Loading more alumni...</p>
        </div>
      )}
    </div>
  );
}
