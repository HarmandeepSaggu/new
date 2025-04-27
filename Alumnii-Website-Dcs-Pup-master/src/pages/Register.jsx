// ///new
// import React, { useState } from 'react';
// import axios from 'axios';
// import Select from 'react-select';

// const Register = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     fathername: '',
//     email: '',
//     phone: '',
//     course: '',
//     batch: '',
//     address: '',
//     linkedin: '',
//     profession: '',
//     organization: '',
//     website: '',
//     photo: null,
//     sessionConsent: '',
//   });

//   const [selectedSkills, setSelectedSkills] = useState([]);
//   const [otherSkill, setOtherSkill] = useState('');
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const batchOptions = [
//     ...Array.from({ length: 23 }, (_, i) => {
//       const start = 1998 + i;
//       return { label: `${start}-${start + 3}`, value: `${start}-${start + 3}` };
//     }),
//     ...Array.from({ length: 6 }, (_, i) => {
//       const start = 2020 + i;
//       return { label: `${start}-${start + 2}`, value: `${start}-${start + 2}` };
//     }),
//   ];

//   const courseOptions = ['BCA', 'MCA', 'B.TECH', 'M.TECH', 'PHD'];
//   const professionOptions = [
//     'Trainee', 'Govt Job', 'Own Business', 'Internship', 'Teacher/Professor',
//     'Full Stack Developer', 'Data Scientist', 'Cybersecurity Analyst', 'Network Engineer',
//     'Cloud Security Expert', 'DevOps Engineer', 'Research Scientist', 'IT Consultant',
//     'System Administrator', 'Blockchain Developer'
//   ];

//   const skillOptions = [
//     'Python', 'C', 'C++', 'Java', 'JavaScript', 'PHP', 'SQL', 'Power BI',
//     'MERN Stack', 'MEAN Stack', 'Full Stack Developer',
//     'AI', 'ML', 'DL', 'CN',
//     'Java & Spring Boot', 'Microservices Architecture', 'Cloud-Native Apps',
//     'Team Lead - Quality Assurance', 'Scrum Master',
//     'UI/UX & Design', 'Front-End Development', 'Mobile App Development',
//     'Cloud & Security', 'Database Management & Backend Development',
//     'Others'
//   ];

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleFileChange = (e) => {
//     setFormData((prev) => ({ ...prev, photo: e.target.files[0] }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);
    
//     const data = new FormData();

//     for (const key in formData) {
//       data.append(key, formData[key]);
//     }

//     data.append('skills', JSON.stringify(selectedSkills));
//     if (selectedSkills.includes('Others')) {
//       data.append('otherSkill', otherSkill);
//     }

//     try {
//       await axios.post('http://localhost:5000/api/alumni', data, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       alert('Successfully registered as alumni!');
//       // Reset form or redirect here
//     } catch (err) {
//       console.error('Upload Error:', err.response?.data || err.message);
//       alert('Registration failed. Please try again.');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <div className="w-full bg-blue-700 py-6">
//         <div className="container mx-auto">
//           <h1 className="text-3xl font-bold text-white text-center">Alumni Registration Portal</h1>
//         </div>
//       </div>
      
//       <div className="container mx-auto px-4 sm:px-6 py-8">
//         <div className="bg-white rounded-lg shadow-lg overflow-hidden">
//           <div className="p-6">
//             <form onSubmit={handleSubmit} className="space-y-8">
//               {/* Personal Information Section */}
//               <div className="bg-white p-6 rounded-lg border border-gray-200">
//                 <h2 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">Personal Information</h2>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div>
//                     <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
//                       Full Name <span className="text-red-500">*</span>
//                     </label>
//                     <input
//                       id="name"
//                       name="name"
//                       type="text"
//                       value={formData.name}
//                       onChange={handleChange}
//                       required
//                       className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
//                     />
//                   </div>
                  
//                   <div>
//                     <label htmlFor="fathername" className="block text-sm font-medium text-gray-700 mb-1">
//                       Father's Name <span className="text-red-500">*</span>
//                     </label>
//                     <input
//                       id="fathername"
//                       name="fathername"
//                       type="text"
//                       value={formData.fathername}
//                       onChange={handleChange}
//                       required
//                       className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
//                     />
//                   </div>
                  
//                   <div>
//                     <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
//                       Email Address <span className="text-red-500">*</span>
//                     </label>
//                     <input
//                       id="email"
//                       name="email"
//                       type="email"
//                       value={formData.email}
//                       onChange={handleChange}
//                       required
//                       className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
//                     />
//                   </div>
                  
//                   <div>
//                     <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
//                       Phone Number <span className="text-red-500">*</span>
//                     </label>
//                     <input
//                       id="phone"
//                       name="phone"
//                       type="tel"
//                       value={formData.phone}
//                       onChange={handleChange}
//                       required
//                       className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
//                     />
//                   </div>
                  
//                   <div className="md:col-span-2">
//                     <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
//                       Full Address <span className="text-red-500">*</span>
//                     </label>
//                     <textarea
//                       id="address"
//                       name="address"
//                       rows="3"
//                       value={formData.address}
//                       onChange={handleChange}
//                       required
//                       className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
//                     ></textarea>
//                   </div>
//                 </div>
//               </div>
              
//               {/* Academic Information Section */}
//               <div className="bg-white p-6 rounded-lg border border-gray-200">
//                 <h2 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">Academic Information</h2>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div>
//                     <label htmlFor="course" className="block text-sm font-medium text-gray-700 mb-1">
//                       Course <span className="text-red-500">*</span>
//                     </label>
//                     <select
//                       id="course"
//                       name="course"
//                       value={formData.course}
//                       onChange={handleChange}
//                       required
//                       className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
//                     >
//                       <option value="">Select Course</option>
//                       {courseOptions.map((course) => (
//                         <option key={course} value={course}>{course}</option>
//                       ))}
//                     </select>
//                   </div>
                  
//                   <div>
//                     <label htmlFor="batch" className="block text-sm font-medium text-gray-700 mb-1">
//                       Batch <span className="text-red-500">*</span>
//                     </label>
//                     <select
//                       id="batch"
//                       name="batch"
//                       value={formData.batch}
//                       onChange={handleChange}
//                       required
//                       className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
//                     >
//                       <option value="">Select Batch</option>
//                       {batchOptions.map((batch) => (
//                         <option key={batch.value} value={batch.value}>{batch.label}</option>
//                       ))}
//                     </select>
//                   </div>
//                 </div>
//               </div>
              
//               {/* Professional Information Section */}
//               <div className="bg-white p-6 rounded-lg border border-gray-200">
//                 <h2 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">Professional Information</h2>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div>
//                     <label htmlFor="profession" className="block text-sm font-medium text-gray-700 mb-1">
//                       Current Profession <span className="text-red-500">*</span>
//                     </label>
//                     <select
//                       id="profession"
//                       name="profession"
//                       value={formData.profession}
//                       onChange={handleChange}
//                       required
//                       className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
//                     >
//                       <option value="">Select Profession</option>
//                       {professionOptions.map((prof) => (
//                         <option key={prof} value={prof}>{prof}</option>
//                       ))}
//                     </select>
//                   </div>
                  
//                   <div>
//                     <label htmlFor="organization" className="block text-sm font-medium text-gray-700 mb-1">
//                       Organization/Company <span className="text-red-500">*</span>
//                     </label>
//                     <input
//                       id="organization"
//                       name="organization"
//                       type="text"
//                       value={formData.organization}
//                       onChange={handleChange}
//                       required
//                       className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
//                     />
//                   </div>
                  
//                   <div>
//                     <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700 mb-1">
//                       LinkedIn Profile URL
//                     </label>
//                     <input
//                       id="linkedin"
//                       name="linkedin"
//                       type="url"
//                       value={formData.linkedin}
//                       onChange={handleChange}
//                       className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
//                     />
//                   </div>
                  
//                   <div>
//                     <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-1">
//                       Personal/Company Website
//                     </label>
//                     <input
//                       id="website"
//                       name="website"
//                       type="url"
//                       value={formData.website}
//                       onChange={handleChange}
//                       className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
//                     />
//                   </div>
//                 </div>
//               </div>
              
//               {/* Skills Section */}
//               <div className="bg-white p-6 rounded-lg border border-gray-200">
//                 <h2 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">Skills & Expertise</h2>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Skills (Select Multiple) <span className="text-red-500">*</span>
//                   </label>
//                   <Select
//                     isMulti
//                     name="skills"
//                     options={skillOptions.map((skill) => ({ label: skill, value: skill }))}
//                     className="basic-multi-select"
//                     classNamePrefix="select"
//                     onChange={(selected) => {
//                       const selectedValues = selected.map((s) => s.value);
//                       setSelectedSkills(selectedValues);
//                     }}
//                   />
//                   {selectedSkills.includes('Others') && (
//                     <div className="mt-3">
//                       <label htmlFor="otherSkill" className="block text-sm font-medium text-gray-700 mb-1">
//                         Please specify other skills
//                       </label>
//                       <input
//                         id="otherSkill"
//                         type="text"
//                         value={otherSkill}
//                         onChange={(e) => setOtherSkill(e.target.value)}
//                         className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
//                       />
//                     </div>
//                   )}
//                 </div>
                
//                 <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
//                   <label className="block text-sm font-medium text-gray-700 mb-3">
//                     Will you be able to deliver a talk or conduct an interaction session (Online/offline) with your alma mater's students to guide them in their careers and employment? <span className="text-red-500">*</span>
//                   </label>
//                   <div className="flex space-x-6">
//                     <label className="flex items-center space-x-2 cursor-pointer">
//                       <input
//                         type="radio"
//                         name="sessionConsent"
//                         value="Yes"
//                         checked={formData.sessionConsent === 'Yes'}
//                         onChange={handleChange}
//                         required
//                         className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
//                       />
//                       <span className="text-gray-700">Yes</span>
//                     </label>
//                     <label className="flex items-center space-x-2 cursor-pointer">
//                       <input
//                         type="radio"
//                         name="sessionConsent"
//                         value="No"
//                         checked={formData.sessionConsent === 'No'}
//                         onChange={handleChange}
//                         className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
//                       />
//                       <span className="text-gray-700">No</span>
//                     </label>
//                   </div>
//                 </div>
//               </div>
              
//               {/* Photo Upload Section */}
//               <div className="bg-white p-6 rounded-lg border border-gray-200">
//                 <h2 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">Photo Upload</h2>
//                 <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
//                   <div className="space-y-1 text-center">
//                     <svg
//                       className="mx-auto h-12 w-12 text-gray-400"
//                       stroke="currentColor"
//                       fill="none"
//                       viewBox="0 0 48 48"
//                       aria-hidden="true"
//                     >
//                       <path
//                         d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
//                         strokeWidth={2}
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                       />
//                     </svg>
//                     <div className="flex text-sm text-gray-600 justify-center">
//                       <label
//                         htmlFor="photo-upload"
//                         className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
//                       >
//                         <span>Upload a file</span>
//                         <input
//                           id="photo-upload"
//                           name="photo"
//                           type="file"
//                           accept="image/*"
//                           onChange={handleFileChange}
//                           required
//                           className="sr-only"
//                         />
//                       </label>
//                       <p className="pl-1">or drag and drop</p>
//                     </div>
//                     <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
//                     {formData.photo && (
//                       <p className="text-sm text-green-600 mt-2">
//                         Selected: {formData.photo.name}
//                       </p>
//                     )}
//                   </div>
//                 </div>
//               </div>
              
//               {/* Submit Button - Centered and full width */}
//               <div className="flex justify-center">
//                 <button
//                   type="submit"
//                   disabled={isSubmitting}
//                   className="w-full max-w-md px-6 py-3 bg-blue-600 text-white font-medium rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-75"
//                 >
//                   {isSubmitting ? 'Submitting...' : 'Complete Registration'}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
        
//         {/* Footer */}
//         <div className="mt-8 text-center text-sm text-gray-500">
//           <p>© {new Date().getFullYear()} University Alumni Association. All rights reserved.</p>
//           <p className="mt-1">Thank you for registering with your alma mater. Your information helps us build a stronger alumni community.</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Register;

import React, { useState } from 'react';
import axios from 'axios';
import Select from 'react-select';
import { Upload, CheckCircle, ChevronRight } from 'lucide-react';
import { useForm, Controller } from 'react-hook-form';

const Register = () => {
  const { 
    register, 
    handleSubmit, 
    control,
    watch,
    formState: { errors, isSubmitting },
    setValue,
    getValues
  } = useForm({
    defaultValues: {
      name: '',
      fathername: '',
      email: '',
      phone: '',
      course: '',
      batch: '',
      address: '',
      linkedin: '',
      profession: '',
      organization: '',
      website: '',
      photo: null,
      sessionConsent: '',
      skills: [],
      otherSkill: ''
    }
  });

  const [activeStep, setActiveStep] = useState(1);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const batchOptions = [
    ...Array.from({ length: 23 }, (_, i) => {
      const start = 1998 + i;
      return { label: `${start}-${start + 3}`, value: `${start}-${start + 3}` };
    }),
    ...Array.from({ length: 6 }, (_, i) => {
      const start = 2020 + i;
      return { label: `${start}-${start + 2}`, value: `${start}-${start + 2}` };
    }),
  ];

  const courseOptions = ['BCA', 'MCA', 'B.TECH', 'M.TECH', 'PHD'];
  const professionOptions = [
    'Trainee', 'Govt Job', 'Own Business', 'Internship', 'Teacher/Professor',
    'Full Stack Developer', 'Data Scientist', 'Cybersecurity Analyst', 'Network Engineer',
    'Cloud Security Expert', 'DevOps Engineer', 'Research Scientist', 'IT Consultant',
    'System Administrator', 'Blockchain Developer'
  ];

  const skillOptions = [
    'Python', 'C', 'C++', 'Java', 'JavaScript', 'PHP', 'SQL', 'Power BI',
    'MERN Stack', 'MEAN Stack', 'Full Stack Developer',
    'AI', 'ML', 'DL', 'CN',
    'Java & Spring Boot', 'Microservices Architecture', 'Cloud-Native Apps',
    'Team Lead - Quality Assurance', 'Scrum Master',
    'UI/UX & Design', 'Front-End Development', 'Mobile App Development',
    'Cloud & Security', 'Database Management & Backend Development',
    'Others'
  ];

  const nextStep = () => {
    setActiveStep(prev => prev + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const prevStep = () => {
    setActiveStep(prev => prev - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();

      // Append all form data
      for (const key in data) {
        if (key === 'skills') {
          formData.append(key, JSON.stringify(data[key]));
        } else if (key === 'photo' && data[key] instanceof File) {
          formData.append(key, data[key]);
        } else {
          formData.append(key, data[key]);
        }
      }

      await axios.post('http://localhost:5000/api/alumni', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      setFormSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error('Upload Error:', err.response?.data || err.message);
      alert('Registration failed. Please try again.');
    }
  };

  // Custom input field component with React Hook Form integration
  const FormField = ({ 
    label, 
    id, 
    name, 
    type = "text", 
    required = false, 
    options, 
    children,
    control,
    rules = {},
    ...rest
  }) => {
    if (type === "select") {
      return (
        <div className="mb-4">
          <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
            {label} {required && <span className="text-red-500">*</span>}
          </label>
          <Controller
            name={name}
            control={control}
            rules={rules}
            render={({ field }) => (
              <select
                id={id}
                {...field}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white"
              >
                <option value="">Select {label}</option>
                {options.map((option) => (
                  <option key={typeof option === 'object' ? option.value : option} value={typeof option === 'object' ? option.value : option}>
                    {typeof option === 'object' ? option.label : option}
                  </option>
                ))}
              </select>
            )}
          />
          {errors[name] && (
            <p className="mt-1 text-sm text-red-600">{errors[name].message}</p>
          )}
        </div>
      );
    } else if (type === "textarea") {
      return (
        <div className="mb-4">
          <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
            {label} {required && <span className="text-red-500">*</span>}
          </label>
          <textarea
            id={id}
            {...register(name, rules)}
            rows="3"
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            {...rest}
          ></textarea>
          {errors[name] && (
            <p className="mt-1 text-sm text-red-600">{errors[name].message}</p>
          )}
        </div>
      );
    } else if (type === "radio") {
      return (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            {label} {required && <span className="text-red-500">*</span>}
          </label>
          <div className="flex space-x-6">
            {children}
          </div>
          {errors[name] && (
            <p className="mt-1 text-sm text-red-600">{errors[name].message}</p>
          )}
        </div>
      );
    } else {
      return (
        <div className="mb-4">
          <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
            {label} {required && <span className="text-red-500">*</span>}
          </label>
          <input
            id={id}
            type={type}
            {...register(name, rules)}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            {...rest}
          />
          {errors[name] && (
            <p className="mt-1 text-sm text-red-600">{errors[name].message}</p>
          )}
        </div>
      );
    }
  };

  // Custom section card component
  const SectionCard = ({ title, children, icon }) => (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm mb-6">
      <div className="flex items-center mb-4 pb-2 border-b border-gray-200">
        {icon && <span className="mr-2 text-indigo-600">{icon}</span>}
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
      </div>
      {children}
    </div>
  );

  // Progress steps
  const steps = [
    { id: 1, name: 'Personal Info' },
    { id: 2, name: 'Academic & Professional' },
    { id: 3, name: 'Skills & Photo' },
    { id: 4, name: 'Review & Submit' }
  ];

  // Custom button component
  const Button = ({ onClick, type = "button", disabled = false, variant = "primary", children }) => {
    const baseClasses = "px-6 py-2.5 font-medium rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200";
    const variants = {
      primary: "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500 disabled:bg-indigo-400",
      secondary: "bg-white text-indigo-600 border border-indigo-600 hover:bg-indigo-50 focus:ring-indigo-500",
      success: "bg-green-600 text-white hover:bg-green-700 focus:ring-green-500"
    };
    
    return (
      <button 
        type={type} 
        onClick={onClick} 
        disabled={disabled}
        className={`${baseClasses} ${variants[variant]}`}
      >
        {children}
      </button>
    );
  };

  // Success screen after form submission
  if (formSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 pt-12">
        <div className="max-w-md mx-auto p-8 bg-white rounded-xl shadow-lg">
          <div className="text-center">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Registration Complete!</h1>
            <p className="text-gray-600 mb-6">
              Thank you for registering with your alma mater. Your information helps us build a stronger alumni community.
            </p>
            <Button variant="success" onClick={() => window.location.href = "/"}>
              Return to Homepage
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-blue-700 py-8 mb-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-white text-center">Alumni Registration Portal</h1>
          <p className="text-blue-100 text-center mt-2">Connect with your alma mater and fellow alumni</p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 max-w-4xl pb-16">
        {/* Progress indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step) => (
              <div 
                key={step.id} 
                className={`flex flex-col items-center ${activeStep >= step.id ? 'text-indigo-600' : 'text-gray-400'}`}
              >
                <div 
                  className={`flex items-center justify-center w-8 h-8 rounded-full font-semibold text-sm mb-1
                    ${activeStep > step.id ? 'bg-indigo-600 text-white' : 
                      activeStep === step.id ? 'border-2 border-indigo-600 text-indigo-600' : 
                      'border-2 border-gray-300 text-gray-400'}`}
                >
                  {activeStep > step.id ? <CheckCircle className="h-5 w-5" /> : step.id}
                </div>
                <span className="text-xs font-medium">{step.name}</span>
              </div>
            ))}
          </div>
          <div className="relative">
            <div className="h-1 bg-gray-200 rounded-full">
              <div 
                className="h-1 bg-indigo-600 rounded-full transition-all duration-300"
                style={{ width: `${(activeStep - 1) * 100 / (steps.length - 1)}%` }}
              ></div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Step 1: Personal Information */}
          {activeStep === 1 && (
            <SectionCard title="Personal Information">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                <FormField 
                  label="Full Name" 
                  id="name" 
                  name="name" 
                  control={control}
                  rules={{ required: 'Full name is required' }}
                  required={true}
                />
                
                <FormField 
                  label="Father's Name" 
                  id="fathername" 
                  name="fathername" 
                  control={control}
                  rules={{ required: "Father's name is required" }}
                  required={true}
                />
                
                <FormField 
                  label="Email Address" 
                  id="email" 
                  name="email" 
                  type="email"
                  control={control}
                  rules={{ 
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address'
                    }
                  }}
                  required={true}
                />
                
                <FormField 
                  label="Phone Number" 
                  id="phone" 
                  name="phone" 
                  type="tel"
                  control={control}
                  rules={{ 
                    required: 'Phone number is required',
                    pattern: {
                      value: /^[0-9]{10,15}$/,
                      message: 'Invalid phone number'
                    }
                  }}
                  required={true}
                />
                
                <div className="md:col-span-2">
                  <FormField 
                    label="Full Address" 
                    id="address" 
                    name="address" 
                    type="textarea"
                    control={control}
                    rules={{ required: 'Address is required' }}
                    required={true}
                  />
                </div>
              </div>
              
              <div className="flex justify-end mt-6">
                <Button onClick={nextStep}>
                  <span className="flex items-center">
                    Next Step <ChevronRight className="ml-1 h-4 w-4" />
                  </span>
                </Button>
              </div>
            </SectionCard>
          )}

          {/* Step 2: Academic & Professional Information */}
          {activeStep === 2 && (
            <>
              <SectionCard title="Academic Information">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                  <FormField 
                    label="Course" 
                    id="course" 
                    name="course" 
                    type="select"
                    control={control}
                    options={courseOptions}
                    rules={{ required: 'Course selection is required' }}
                    required={true}
                  />
                  
                  <FormField 
                    label="Batch" 
                    id="batch" 
                    name="batch" 
                    type="select"
                    control={control}
                    options={batchOptions}
                    rules={{ required: 'Batch selection is required' }}
                    required={true}
                  />
                </div>
              </SectionCard>
              
              <SectionCard title="Professional Information">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                  <FormField 
                    label="Current Profession" 
                    id="profession" 
                    name="profession" 
                    type="select"
                    control={control}
                    options={professionOptions}
                    rules={{ required: 'Profession selection is required' }}
                    required={true}
                  />
                  
                  <FormField 
                    label="Organization/Company" 
                    id="organization" 
                    name="organization" 
                    control={control}
                    rules={{ required: 'Organization is required' }}
                    required={true}
                  />
                  
                  <FormField 
                    label="LinkedIn Profile URL" 
                    id="linkedin" 
                    name="linkedin" 
                    type="url"
                    control={control}
                    rules={{ 
                      pattern: {
                        value: /^(https?:\/\/)?([\w\d]+\.)?linkedin\.com\/.+/i,
                        message: 'Please enter a valid LinkedIn URL'
                      }
                    }}
                  />
                  
                  <FormField 
                    label="Personal/Company Website" 
                    id="website" 
                    name="website" 
                    type="url"
                    control={control}
                    rules={{ 
                      pattern: {
                        value: /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/i,
                        message: 'Please enter a valid website URL'
                      }
                    }}
                  />
                </div>
              </SectionCard>
              
              <div className="flex justify-between mt-6">
                <Button onClick={prevStep} variant="secondary">
                  Back
                </Button>
                <Button onClick={nextStep}>
                  <span className="flex items-center">
                    Next Step <ChevronRight className="ml-1 h-4 w-4" />
                  </span>
                </Button>
              </div>
            </>
          )}

          {/* Step 3: Skills & Photo */}
          {activeStep === 3 && (
            <>
              <SectionCard title="Skills & Expertise">
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Skills (Select Multiple) <span className="text-red-500">*</span>
                  </label>
                  <Controller
                    name="skills"
                    control={control}
                    rules={{ required: 'At least one skill is required' }}
                    render={({ field }) => (
                      <Select
                        isMulti
                        options={skillOptions.map((skill) => ({ label: skill, value: skill }))}
                        className="basic-multi-select"
                        classNamePrefix="select"
                        onChange={(selected) => {
                          const selectedValues = selected ? selected.map((s) => s.value) : [];
                          field.onChange(selectedValues);
                          setValue('skills', selectedValues);
                        }}
                        value={skillOptions
                          .filter(option => field.value?.includes(option))
                          .map(option => ({ label: option, value: option }))}
                        styles={{
                          control: (base) => ({
                            ...base,
                            borderRadius: '0.5rem',
                            padding: '2px',
                            borderColor: errors.skills ? '#ef4444' : '#d1d5db',
                            '&:hover': {
                              borderColor: errors.skills ? '#ef4444' : '#6366f1'
                            }
                          }),
                          multiValue: (base) => ({
                            ...base,
                            backgroundColor: '#ede9fe',
                            borderRadius: '0.375rem'
                          }),
                          multiValueLabel: (base) => ({
                            ...base,
                            color: '#4f46e5'
                          }),
                          multiValueRemove: (base) => ({
                            ...base,
                            color: '#4f46e5',
                            '&:hover': {
                              backgroundColor: '#ddd6fe',
                              color: '#4338ca'
                            }
                          })
                        }}
                      />
                    )}
                  />
                  {errors.skills && (
                    <p className="mt-1 text-sm text-red-600">{errors.skills.message}</p>
                  )}
                  {watch('skills')?.includes('Others') && (
                    <div className="mt-3">
                      <FormField 
                        label="Please specify other skills" 
                        id="otherSkill" 
                        name="otherSkill" 
                        control={control}
                        rules={{ 
                          required: watch('skills')?.includes('Others') ? 'Please specify your other skills' : false
                        }}
                      />
                    </div>
                  )}
                </div>
                
                <div className="mt-6 p-5 bg-indigo-50 rounded-lg border border-indigo-100">
                  <FormField 
                    label="Will you be able to deliver a talk or conduct an interaction session (Online/offline) with your alma mater's students to guide them in their careers and employment?" 
                    type="radio"
                    required={true}
                  >
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        value="Yes"
                        {...register("sessionConsent", { required: 'This selection is required' })}
                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                      />
                      <span className="text-gray-700">Yes</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        value="No"
                        {...register("sessionConsent")}
                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                      />
                      <span className="text-gray-700">No</span>
                    </label>
                  </FormField>
                  {errors.sessionConsent && (
                    <p className="mt-1 text-sm text-red-600">{errors.sessionConsent.message}</p>
                  )}
                </div>
              </SectionCard>
              
              <SectionCard title="Photo Upload">
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-indigo-100 border-dashed rounded-lg bg-indigo-50">
                  <div className="space-y-1 text-center">
                    <Upload className="mx-auto h-12 w-12 text-indigo-400" />
                    <div className="flex text-sm text-gray-600 justify-center">
                      <label
                        htmlFor="photo-upload"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500 px-4 py-2 shadow-sm"
                      >
                        <span>Upload a file</span>
                        <input
                          id="photo-upload"
                          type="file"
                          accept="image/*"
                          {...register("photo", { 
                            required: 'Photo is required',
                            validate: {
                              lessThan10MB: files => 
                                files[0]?.size < 10000000 || 'Max 10MB',
                              acceptedFormats: files => 
                                ['image/jpeg', 'image/png', 'image/gif'].includes(files[0]?.type) || 
                                'Only JPEG, PNG & GIF'
                            }
                          })}
                          className="sr-only"
                          onChange={(e) => {
                            register("photo").onChange(e);
                            setValue("photo", e.target.files[0]);
                          }}
                        />
                      </label>
                      <p className="pl-1 flex items-center">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                    {watch('photo') && (
                      <div className="mt-2 bg-white px-3 py-2 rounded-lg border border-indigo-200 inline-block">
                        <p className="text-sm text-indigo-600 font-medium flex items-center">
                          <CheckCircle className="h-4 w-4 mr-1" />
                          {watch('photo').name}
                        </p>
                      </div>
                    )}
                    {errors.photo && (
                      <p className="mt-1 text-sm text-red-600">{errors.photo.message}</p>
                    )}
                  </div>
                </div>
              </SectionCard>
              
              <div className="flex justify-between mt-6">
                <Button onClick={prevStep} variant="secondary">
                  Back
                </Button>
                <Button onClick={nextStep}>
                  Review & Submit
                </Button>
              </div>
            </>
          )}

          {/* Step 4: Review & Submit */}
          {activeStep === 4 && (
            <>
              <SectionCard title="Review Your Information">
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                    <div>
                      <h3 className="text-sm font-semibold text-gray-500">Full Name</h3>
                      <p className="text-base text-gray-800">{watch('name') || "Not provided"}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-semibold text-gray-500">Father's Name</h3>
                      <p className="text-base text-gray-800">{watch('fathername') || "Not provided"}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-semibold text-gray-500">Email Address</h3>
                      <p className="text-base text-gray-800">{watch('email') || "Not provided"}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-semibold text-gray-500">Phone Number</h3>
                      <p className="text-base text-gray-800">{watch('phone') || "Not provided"}</p>
                    </div>
                    
                    <div className="md:col-span-2">
                      <h3 className="text-sm font-semibold text-gray-500">Address</h3>
                      <p className="text-base text-gray-800">{watch('address') || "Not provided"}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-semibold text-gray-500">Course</h3>
                      <p className="text-base text-gray-800">{watch('course') || "Not provided"}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-semibold text-gray-500">Batch</h3>
                      <p className="text-base text-gray-800">{watch('batch') || "Not provided"}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-semibold text-gray-500">Current Profession</h3>
                      <p className="text-base text-gray-800">{watch('profession') || "Not provided"}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-semibold text-gray-500">Organization/Company</h3>
                      <p className="text-base text-gray-800">{watch('organization') || "Not provided"}</p>
                    </div>
                    
                    <div className="md:col-span-2">
                      <h3 className="text-sm font-semibold text-gray-500">Selected Skills</h3>
                      <div className="flex flex-wrap mt-1">
                        {watch('skills')?.length > 0 ? watch('skills').map(skill => (
                          <span key={skill} className="bg-indigo-100 text-indigo-800 text-xs font-medium mr-2 mb-2 px-2.5 py-1 rounded-full">
                            {skill}
                          </span>
                        )) : <p className="text-base text-gray-800">No skills selected</p>}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-semibold text-gray-500">Can conduct sessions?</h3>
                      <p className="text-base text-gray-800">{watch('sessionConsent') || "Not provided"}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-semibold text-gray-500">Photo</h3>
                      <p className="text-base text-gray-800">
                        {watch('photo')?.name ? watch('photo').name : "Not uploaded"}
                      </p>
                    </div>
                  </div>
                </div>
              </SectionCard>
              
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 rounded">
                <div className="flex">
                  <div className="ml-3">
                    <p className="text-sm text-yellow-700">
                      Please review your information carefully before submitting. After submission, you won't be able to make changes.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between mt-6">
                <Button onClick={prevStep} variant="secondary">
                  Back
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Submitting...' : 'Complete Registration'}
                </Button>
              </div>
            </>
          )}
        </form>
        
        {/* Footer */}
        <div className="mt-12 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} University Alumni Association. All rights reserved.</p>
          <p className="mt-1">Thank you for registering with your alma mater. Your information helps us build a stronger alumni community.</p>
        </div>
      </div>
    </div>
  );
};

export default Register;