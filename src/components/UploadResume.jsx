import React, { useState, useRef } from 'react';

const UploadResume = ({ onBackToSignup }) => {
  const [step, setStep] = useState(2); // Start at Step 2 by default for this view
  
  // State for step 1 (Upload Resume)
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const fileInputRef = useRef(null);

  // Constants
  const months = ['Select', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const years = ['Select', '2026', '2025', '2024', '2023', '2022', '2021', '2020', '2019', '2018', '2017', '2016', '2015', '2014', '2013', '2012', '2011', '2010', '2009', '2008', '2007', '2006', '2005', '2004', '2003', '2002', '2001', '2000'];

  // State for step 2 (Setup Profile)
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    countryResidence: 'Select',
    countryCitizenship: 'Select',
    phoneCode: '+1',
    phoneNumber: '',
    englishProficiency: 'Select',
    noticePeriod: 'Select',
    jobCommitment: 'Select',
    hourlyRate: '',
    timeZone: 'Select'
  });

  // Education list (interactive)
  const [educationList, setEducationList] = useState([
    {
      id: 1,
      degree: 'Bachelor in UX Designing',
      university: 'University Of Punjab College of Art & Design',
      startMonth: 'September',
      startYear: '2013',
      endMonth: 'September',
      endYear: '2013'
    }
  ]);

  // Experience list (interactive)
  const [experienceList, setExperienceList] = useState([
    {
      id: 1,
      position: 'Network Support Engineer',
      workPlace: 'Central Texas Collage',
      startMonth: 'September',
      startYear: '2013',
      endMonth: 'September',
      endYear: '2013',
      currentlyWorking: true,
      description: ''
    },
    {
      id: 2,
      position: 'Network Support Engineer',
      workPlace: 'Central Texas Collage',
      startMonth: 'September',
      startYear: '2013',
      endMonth: 'September',
      endYear: '2013',
      currentlyWorking: false,
      description: ''
    }
  ]);

  // Certifications list (interactive)
  const [certificationsList, setCertificationsList] = useState([
    {
      id: 1,
      certificateName: 'Certificate of Appreciation',
      certificateLink: 'http://dbhceucgcjkndckjwchouwhjcuo',
      fileName: 'certificate_appreciation.pdf'
    }
  ]);

  // Portfolio list (interactive)
  const [portfolioList, setPortfolioList] = useState([
    {
      id: 1,
      title: '',
      portfolioLink: '',
      fileName: '',
      description: ''
    }
  ]);

  // State for step 3 (Skills)
  const [availableSkills, setAvailableSkills] = useState([
    'UI/UX Designer', 'Product Design', 'Wireframing', 'Prototype', 'User Flow',
    'Mobile App Design', 'Responsive Web Design', 'Accessibility', 'Adobe Creative Suite',
    'Design Principles', 'User-Centered Design Methodologies', 'Visual Communication',
    'Illustration', 'User Interviews', 'Usability Testing', 'Blockchain', 
    'Cybersecurity Engineer', 'Cloud Computing Engineer', 'Digital Marketing Expert', 
    'Software Engineering', 'E Commerce Skills'
  ]);
  const [selectedSkills, setSelectedSkills] = useState(['UI/UX Designer', 'Product Design', 'Wireframing', 'Prototype', 'User Flow']);
  const [newSkillText, setNewSkillText] = useState('');

  // State for step 4 (Wallet)
  const [connectedWallet, setConnectedWallet] = useState(null);
  const [walletAddress, setWalletAddress] = useState('');

  // State for step 5 (Complete)
  const [completed, setCompleted] = useState(false);

  // File Upload Handlers (Step 1)
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validExtensions = ['.pdf', '.doc', '.docx', '.txt'];
      const fileExt = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
      if (!validExtensions.includes(fileExt)) {
        alert('Error! This file type is not supported. Please upload a PDF or Word File.');
        return;
      }
      triggerUpload(file);
    }
  };

  const triggerUpload = (file) => {
    setSelectedFile(file);
    setIsUploading(true);
    setUploadProgress(0);
    setUploadSuccess(false);

    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          setUploadSuccess(true);
          return 100;
        }
        return prev + 10;
      });
    }, 150);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      triggerUpload(file);
    }
  };

  // Education Helpers
  const addEducation = () => {
    setEducationList(prev => [
      ...prev,
      {
        id: Date.now(),
        degree: 'Select',
        university: '',
        startMonth: 'Select',
        startYear: 'Select',
        endMonth: 'Select',
        endYear: 'Select'
      }
    ]);
  };

  const removeEducation = (id) => {
    setEducationList(prev => prev.filter(item => item.id !== id));
  };

  const updateEducation = (id, field, value) => {
    setEducationList(prev => prev.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  // Experience Helpers
  const addExperience = () => {
    setExperienceList(prev => [
      ...prev,
      {
        id: Date.now(),
        position: 'Select',
        workPlace: '',
        startMonth: 'Select',
        startYear: 'Select',
        endMonth: 'Select',
        endYear: 'Select',
        currentlyWorking: false,
        description: ''
      }
    ]);
  };

  const removeExperience = (id) => {
    setExperienceList(prev => prev.filter(item => item.id !== id));
  };

  const updateExperience = (id, field, value) => {
    setExperienceList(prev => prev.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  // Certification Helpers
  const addCertification = () => {
    setCertificationsList(prev => [
      ...prev,
      {
        id: Date.now(),
        certificateName: '',
        certificateLink: '',
        fileName: ''
      }
    ]);
  };

  const removeCertification = (id) => {
    setCertificationsList(prev => prev.filter(item => item.id !== id));
  };

  const updateCertification = (id, field, value) => {
    setCertificationsList(prev => prev.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  const triggerCertUpload = (id) => {
    const fileInput = document.getElementById(`cert-file-input-${id}`);
    if (fileInput) fileInput.click();
  };

  const handleCertFileSelect = (id, e) => {
    const file = e.target.files[0];
    if (file) {
      updateCertification(id, 'fileName', file.name);
    }
  };

  // Portfolio Helpers
  const addPortfolio = () => {
    setPortfolioList(prev => [
      ...prev,
      {
        id: Date.now(),
        title: '',
        portfolioLink: '',
        fileName: '',
        description: ''
      }
    ]);
  };

  const removePortfolio = (id) => {
    setPortfolioList(prev => prev.filter(item => item.id !== id));
  };

  const updatePortfolio = (id, field, value) => {
    setPortfolioList(prev => prev.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  const triggerPortfolioUpload = (id) => {
    const fileInput = document.getElementById(`portfolio-file-input-${id}`);
    if (fileInput) fileInput.click();
  };

  const handlePortfolioFileSelect = (id, e) => {
    const file = e.target.files[0];
    if (file) {
      const validExtensions = ['.pdf', '.jpeg', '.jpg', '.png'];
      const fileExt = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
      if (!validExtensions.includes(fileExt)) {
        alert('Only PDF or JPEG/PNG files are supported for portfolios.');
        return;
      }
      updatePortfolio(id, 'fileName', file.name);
    }
  };

  // Skill Handlers
  const toggleSkill = (skill) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(prev => prev.filter(s => s !== skill));
    } else {
      if (selectedSkills.length >= 15) {
        alert('You can only select up to 15 skills in total.');
        return;
      }
      setSelectedSkills(prev => [...prev, skill]);
    }
  };

  const handleAddCustomSkill = (e) => {
    e.preventDefault();
    const cleanSkill = newSkillText.trim();
    if (!cleanSkill) return;
    if (selectedSkills.length >= 15) {
      alert('You can only select up to 15 skills in total.');
      return;
    }
    if (!availableSkills.includes(cleanSkill)) {
      setAvailableSkills(prev => [cleanSkill, ...prev]);
    }
    if (!selectedSkills.includes(cleanSkill)) {
      setSelectedSkills(prev => [...prev, cleanSkill]);
    }
    setNewSkillText('');
  };

  // Wallet
  const connectWallet = (platform) => {
    setConnectedWallet(platform);
    const hex = '0123456789abcdef';
    let mockAddr = '0xe93';
    for (let i = 0; i < 8; i++) mockAddr += hex[Math.floor(Math.random() * 16)];
    setWalletAddress(mockAddr + '...' + hex[Math.floor(Math.random() * 16)] + hex[Math.floor(Math.random() * 16)] + hex[Math.floor(Math.random() * 16)]);
  };

  const disconnectWallet = () => {
    setConnectedWallet(null);
    setWalletAddress('');
  };

  // Navigation
  const handleBack = () => {
    if (step > 1) {
      setStep(prev => prev - 1);
    } else {
      onBackToSignup();
    }
  };

  const handleNext = () => {
    if (step < 5) {
      setStep(prev => prev + 1);
    } else {
      setCompleted(true);
    }
  };

  return (
    <div className="onboarding-viewport-container">
      {/* Outer Figma Step Title */}
      <h1 className="figma-step-info-title">
        {step === 1 && "V1.F1.4 (Upload Resume)"}
        {step === 2 && "V1.F1.1.A(U1) Setup Profile"}
        {step === 3 && "V1.F1.2 Choose Skills"}
        {step === 4 && "V1.F1.3 Connect Wallet"}
        {step === 5 && "V1.F1.5 Profile Overviews"}
      </h1>

      {/* Stepper Navigation Bar Container */}
      <div className="stepper-navigation-bar-container">
        
        {/* Left Arrow Button (Green background, white arrow) */}
        <button className="stepper-back-btn" onClick={handleBack} aria-label="Go Back">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 12H5" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 19L5 12L12 5" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* Stepper Tabs */}
        <div className="stepper-steps-wrapper">
          {/* Progress bar line along the top */}
          <div className="stepper-progress-bar-line" style={{ width: `${(step / 5) * 100}%` }}></div>
          
          <div className={`step-tab-item ${step === 1 ? 'active-step' : ''} ${step > 1 ? 'completed-step-tab' : ''}`} onClick={() => setStep(1)}>
            <div className="step-tab-num">Step 1</div>
            <div className="step-tab-label">Upload Resume</div>
          </div>

          <div className={`step-tab-item ${step === 2 ? 'active-step' : ''} ${step > 2 ? 'completed-step-tab' : ''}`} onClick={() => setStep(2)}>
            <div className="step-tab-num">Step 2</div>
            <div className="step-tab-label">Setup Profile</div>
          </div>

          <div className={`step-tab-item ${step === 3 ? 'active-step' : ''} ${step > 3 ? 'completed-step-tab' : ''}`} onClick={() => setStep(3)}>
            <div className="step-tab-num">Step 3</div>
            <div className="step-tab-label">Choose Skill</div>
          </div>

          <div className={`step-tab-item ${step === 4 ? 'active-step' : ''} ${step > 4 ? 'completed-step-tab' : ''}`} onClick={() => setStep(4)}>
            <div className="step-tab-num">Step 4</div>
            <div className="step-tab-label">Connect Wallet</div>
          </div>

          <div className={`step-tab-item ${step === 5 ? 'active-step' : ''} ${step > 5 ? 'completed-step-tab' : ''}`} onClick={() => setStep(5)}>
            <div className="step-tab-num">Step 5</div>
            <div className="step-tab-label">Complete Profile</div>
          </div>
        </div>

        {/* Logout button on far right */}
        <button className="stepper-logout-btn" onClick={onBackToSignup} aria-label="Log Out">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9" stroke="#1D2939" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M16 17L21 12L16 7" stroke="#1D2939" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M21 12H9" stroke="#1D2939" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {/* Main Content Area */}
      {!completed ? (
        <div className="onboarding-main-card wide-panel-card">
          
          {/* STEP 1: UPLOAD RESUME */}
          {step === 1 && (
            <div className="onboarding-step-content upload-resume-step">
              <div className="resume-dashed-upload-container" onDragOver={handleDragOver} onDrop={handleDrop}>
                <div className="resume-illustration-wrapper">
                  <div className="browser-mockup-frame">
                    <div className="browser-mockup-header">
                      <span className="dot dot-red"></span>
                      <span className="dot dot-yellow"></span>
                      <span className="dot dot-green"></span>
                    </div>
                    <div className="browser-mockup-body">
                      <div className="mockup-sidebar">
                        <div className="sidebar-avatar"></div>
                        <div className="sidebar-line short"></div>
                        <div className="sidebar-line"></div>
                        <div className="sidebar-line"></div>
                      </div>
                      <div className="mockup-cards-stack">
                        <div className="doc-icon-card pdf-card">
                          <svg className="doc-svg-icon" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" fill="#E2EAF8" stroke="#1E25A5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M14 2V8H20" stroke="#1E25A5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          <span className="file-tag pdf-tag">PDF</span>
                        </div>
                        <div className="doc-icon-card doc-card">
                          <svg className="doc-svg-icon" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" fill="#E2F5EF" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M14 2V8H20" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          <span className="file-tag doc-tag">DOC</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="upload-note-text">
                    <span className="bullet-teal-dot"></span>
                    You can upload any PDF or Word File
                  </p>
                </div>

                {selectedFile && (
                  <div className="upload-status-display">
                    <div className="uploaded-file-details">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8L14 2Z" fill="#2E36D7" fillOpacity="0.1" stroke="#2E36D7" strokeWidth="2"/>
                        <path d="M14 2V8H20" stroke="#2E36D7" strokeWidth="2" strokeLinejoin="round"/>
                      </svg>
                      <div className="file-info-text">
                        <span className="file-name">{selectedFile.name}</span>
                        <span className="file-size">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</span>
                      </div>
                    </div>
                    {isUploading ? (
                      <div className="upload-progress-wrapper">
                        <div className="upload-progress-track">
                          <div className="upload-progress-bar" style={{ width: `${uploadProgress}%` }}></div>
                        </div>
                        <span className="upload-percentage">{uploadProgress}% Uploading</span>
                      </div>
                    ) : uploadSuccess ? (
                      <div className="upload-done-success">
                        <span className="success-badge-mark">✓</span>
                        <span className="success-txt">Success! Resume parsed database values.</span>
                      </div>
                    ) : null}
                  </div>
                )}
                <input type="file" ref={fileInputRef} onChange={handleFileChange} accept=".pdf,.doc,.docx,.txt" style={{ display: 'none' }} />
              </div>

              <div className="upload-card-actions">
                <button className="primary-action-btn upload-resume-button" onClick={() => fileInputRef.current.click()}>
                  Upload Resume
                  <svg className="upload-action-svg" width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M17 8L12 3L7 8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 3V15" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <button className="secondary-action-btn px-manual-create" onClick={handleNext}>
                  Create Manually
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: SETUP PROFILE */}
          {step === 2 && (
            <div className="onboarding-step-content setup-profile-step flex-setup-layout">
              
              {/* Section 1: Personal Information */}
              <div className="profile-section-block">
                <h2 className="profile-section-heading">Personal Information<span className="required-star">*</span></h2>
                
                <div className="onboarding-form-grid-4col">
                  {/* First Name */}
                  <div className="form-input-box">
                    <label className="onboard-label">First Name</label>
                    <input 
                      type="text" 
                      placeholder="First Name" 
                      value={profileData.firstName} 
                      onChange={e => setProfileData(p => ({ ...p, firstName: e.target.value }))}
                      className="onboard-text-input"
                    />
                  </div>

                  {/* Last Name */}
                  <div className="form-input-box">
                    <label className="onboard-label">Last Name</label>
                    <input 
                      type="text" 
                      placeholder="Last Name" 
                      value={profileData.lastName} 
                      onChange={e => setProfileData(p => ({ ...p, lastName: e.target.value }))}
                      className="onboard-text-input"
                    />
                  </div>

                  {/* Country of Residence */}
                  <div className="form-input-box">
                    <label className="onboard-label">Country of Residence</label>
                    <select 
                      value={profileData.countryResidence} 
                      onChange={e => setProfileData(p => ({ ...p, countryResidence: e.target.value }))}
                      className="onboard-select-input-styled"
                    >
                      <option value="Select">Select</option>
                      <option value="United States">United States</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="Australia">Australia</option>
                      <option value="Canada">Canada</option>
                      <option value="Pakistan">Pakistan</option>
                    </select>
                  </div>

                  {/* Country of Citizenship */}
                  <div className="form-input-box">
                    <label className="onboard-label">Country of Citizenship</label>
                    <select 
                      value={profileData.countryCitizenship} 
                      onChange={e => setProfileData(p => ({ ...p, countryCitizenship: e.target.value }))}
                      className="onboard-select-input-styled"
                    >
                      <option value="Select">Select</option>
                      <option value="United States">United States</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="Australia">Australia</option>
                      <option value="Canada">Canada</option>
                      <option value="Pakistan">Pakistan</option>
                    </select>
                  </div>

                  {/* Phone Number */}
                  <div className="form-input-box">
                    <label className="onboard-label">Phone Number</label>
                    <div className="custom-phone-input-field">
                      <div className="flag-select-button">
                        <span className="flag-circle">🇺🇸</span>
                        <select 
                          value={profileData.phoneCode} 
                          onChange={e => setProfileData(p => ({ ...p, phoneCode: e.target.value }))}
                          className="subtle-phone-code-select"
                        >
                          <option value="+1">+1</option>
                          <option value="+44">+44</option>
                          <option value="+61">+61</option>
                          <option value="+92">+92</option>
                        </select>
                        <span className="arrow-down-indicator"></span>
                      </div>
                      <input 
                        type="text" 
                        placeholder="+1 201 555 -0123" 
                        value={profileData.phoneNumber} 
                        onChange={e => setProfileData(p => ({ ...p, phoneNumber: e.target.value }))}
                        className="raw-phone-number-field"
                      />
                    </div>
                  </div>

                  {/* English Proficiency */}
                  <div className="form-input-box">
                    <label className="onboard-label">English Proficiency</label>
                    <select 
                      value={profileData.englishProficiency} 
                      onChange={e => setProfileData(p => ({ ...p, englishProficiency: e.target.value }))}
                      className="onboard-select-input-styled"
                    >
                      <option value="Select">Select</option>
                      <option value="Native or Bilingual">Native or Bilingual</option>
                      <option value="Fluent">Fluent</option>
                      <option value="Conversational">Conversational</option>
                      <option value="Basic">Basic</option>
                    </select>
                  </div>

                  {/* Notice period to resign */}
                  <div className="form-input-box">
                    <label className="onboard-label">Notice period to resign from current job</label>
                    <select 
                      value={profileData.noticePeriod} 
                      onChange={e => setProfileData(p => ({ ...p, noticePeriod: e.target.value }))}
                      className="onboard-select-input-styled"
                    >
                      <option value="Select">Select</option>
                      <option value="Immediate">Immediate</option>
                      <option value="1 Week">1 week</option>
                      <option value="2 Weeks">2 weeks</option>
                      <option value="1 Month">1 month</option>
                      <option value="2 Months">2 months</option>
                      <option value="3 Months">3 months</option>
                    </select>
                  </div>

                  {/* Preferred commitment */}
                  <div className="form-input-box">
                    <label className="onboard-label">Which type of job commitment do you prefer?</label>
                    <select 
                      value={profileData.jobCommitment} 
                      onChange={e => setProfileData(p => ({ ...p, jobCommitment: e.target.value }))}
                      className="onboard-select-input-styled"
                    >
                      <option value="Select">Select</option>
                      <option value="Full-time">Full-time (40 hours/week)</option>
                      <option value="Part-time">Part-time (20 hours/week)</option>
                      <option value="Contract">Contract / Hourly</option>
                    </select>
                  </div>

                  {/* Preferred hourly rate */}
                  <div className="form-input-box">
                    <label className="onboard-label">What’s your preferred hourly rate in U.S. dollars?</label>
                    <input 
                      type="number" 
                      placeholder="Preferred Hourly Rate" 
                      value={profileData.hourlyRate} 
                      onChange={e => setProfileData(p => ({ ...p, hourlyRate: e.target.value }))}
                      className="onboard-text-input"
                    />
                  </div>

                  {/* Time Zone */}
                  <div className="form-input-box">
                    <label className="onboard-label">Time Zone</label>
                    <select 
                      value={profileData.timeZone} 
                      onChange={e => setProfileData(p => ({ ...p, timeZone: e.target.value }))}
                      className="onboard-select-input-styled"
                    >
                      <option value="Select">Select</option>
                      <option value="EST">GMT-05:00 (EST)</option>
                      <option value="PST">GMT-08:00 (PST)</option>
                      <option value="UTC">GMT+00:00 (UTC)</option>
                      <option value="PKT">GMT+05:00 (PKT)</option>
                      <option value="SGT">GMT+08:00 (SGT)</option>
                    </select>
                  </div>

                </div>
              </div>

              {/* Section 2: Education */}
              <div className="profile-section-block">
                <div className="section-block-header">
                  <h2 className="profile-section-heading">Education</h2>
                  <button className="add-section-pill-btn" onClick={addEducation}>
                    <span className="plus-sign">+</span> Add Education
                  </button>
                </div>

                <div className="nested-records-stack">
                  {educationList.map(edu => (
                    <div className="nested-record-row-card" key={edu.id}>
                      <button className="delete-nested-row-btn" onClick={() => removeEducation(edu.id)} aria-label="Delete education">✕</button>
                      
                      <div className="nested-record-inputs-line">
                        {/* Degree */}
                        <div className="nested-select-col">
                          <label className="nested-label">Degree</label>
                          <select 
                            value={edu.degree} 
                            onChange={e => updateEducation(edu.id, 'degree', e.target.value)}
                            className="nested-select-input"
                          >
                            <option value="Select">Select</option>
                            <option value="Bachelor in UX Designing">Bachelor in UX Designing</option>
                            <option value="Bachelor in CS">Bachelor in Computer Science</option>
                            <option value="Master in CS">Master in Computer Science</option>
                          </select>
                        </div>

                        {/* University */}
                        <div className="nested-text-col university-col">
                          <label className="nested-label">University</label>
                          <input 
                            type="text"
                            placeholder="Enter University name"
                            value={edu.university} 
                            onChange={e => updateEducation(edu.id, 'university', e.target.value)}
                            className="nested-text-input"
                          />
                        </div>

                        {/* Starting From Month & Year */}
                        <div className="nested-duration-col">
                          <label className="nested-label">Starting from</label>
                          <div className="split-duration-inputs">
                            <select 
                              value={edu.startMonth} 
                              onChange={e => updateEducation(edu.id, 'startMonth', e.target.value)}
                              className="nested-select-input split-duration-select"
                            >
                              {months.map(m => <option key={m} value={m}>{m}</option>)}
                            </select>
                            <select 
                              value={edu.startYear} 
                              onChange={e => updateEducation(edu.id, 'startYear', e.target.value)}
                              className="nested-select-input split-duration-select"
                            >
                              {years.map(y => <option key={y} value={y}>{y}</option>)}
                            </select>
                          </div>
                        </div>

                        {/* Ending Month & Year */}
                        <div className="nested-duration-col">
                          <label className="nested-label">Ending</label>
                          <div className="split-duration-inputs">
                            <select 
                              value={edu.endMonth} 
                              onChange={e => updateEducation(edu.id, 'endMonth', e.target.value)}
                              className="nested-select-input split-duration-select"
                            >
                              {months.map(m => <option key={m} value={m}>{m}</option>)}
                            </select>
                            <select 
                              value={edu.endYear} 
                              onChange={e => updateEducation(edu.id, 'endYear', e.target.value)}
                              className="nested-select-input split-duration-select"
                            >
                              {years.map(y => <option key={y} value={y}>{y}</option>)}
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Section 3: Experience */}
              <div className="profile-section-block">
                <div className="section-block-header">
                  <h2 className="profile-section-heading">Experience</h2>
                  <button className="add-section-pill-btn" onClick={addExperience}>
                    <span className="plus-sign">+</span> Add Experience
                  </button>
                </div>

                <div className="nested-records-stack">
                  {experienceList.map(exp => (
                    <div className="nested-record-row-card" key={exp.id}>
                      <button className="delete-nested-row-btn" onClick={() => removeExperience(exp.id)} aria-label="Delete experience">✕</button>
                      
                      <div className="nested-record-inputs-line">
                        {/* Position */}
                        <div className="nested-select-col">
                          <label className="nested-label">Position</label>
                          <select 
                            value={exp.position} 
                            onChange={e => updateExperience(exp.id, 'position', e.target.value)}
                            className="nested-select-input"
                          >
                            <option value="Select">Select</option>
                            <option value="Network Support Engineer">Network Support Engineer</option>
                            <option value="Frontend Engineer">Frontend Engineer</option>
                            <option value="UI/UX Designer">UI/UX Designer</option>
                          </select>
                        </div>

                        {/* Workplace */}
                        <div className="nested-text-col work-place-col">
                          <label className="nested-label">Work Place</label>
                          <input 
                            type="text" 
                            placeholder="Enter Company name"
                            value={exp.workPlace} 
                            onChange={e => updateExperience(exp.id, 'workPlace', e.target.value)}
                            className="nested-text-input"
                          />
                        </div>

                        {/* Starting From Month & Year */}
                        <div className="nested-duration-col">
                          <label className="nested-label">Starting from</label>
                          <div className="split-duration-inputs">
                            <select 
                              value={exp.startMonth} 
                              onChange={e => updateExperience(exp.id, 'startMonth', e.target.value)}
                              className="nested-select-input split-duration-select"
                            >
                              {months.map(m => <option key={m} value={m}>{m}</option>)}
                            </select>
                            <select 
                              value={exp.startYear} 
                              onChange={e => updateExperience(exp.id, 'startYear', e.target.value)}
                              className="nested-select-input split-duration-select"
                            >
                              {years.map(y => <option key={y} value={y}>{y}</option>)}
                            </select>
                          </div>
                        </div>

                        {/* Currently Working Checkbox / Ending date elements */}
                        <div className="nested-duration-col check-option-row">
                          <label 
                            className="currently-working-checkbox-label"
                            onClick={() => updateExperience(exp.id, 'currentlyWorking', !exp.currentlyWorking)}
                          >
                            <span className={`custom-checkbox-box ${exp.currentlyWorking ? 'checked' : ''}`}>
                              {exp.currentlyWorking && '✓'}
                            </span>
                            Currently Working
                          </label>
                        </div>

                        {/* Ending Date Inputs (only shown if CURRENTLY WORKING is FALSE) */}
                        {!exp.currentlyWorking && (
                          <div className="nested-duration-col">
                            <label className="nested-label">Ending</label>
                            <div className="split-duration-inputs">
                              <select 
                                value={exp.endMonth} 
                                onChange={e => updateExperience(exp.id, 'endMonth', e.target.value)}
                                className="nested-select-input split-duration-select"
                              >
                                {months.map(m => <option key={m} value={m}>{m}</option>)}
                              </select>
                              <select 
                                value={exp.endYear} 
                                onChange={e => updateExperience(exp.id, 'endYear', e.target.value)}
                                className="nested-select-input split-duration-select"
                              >
                                {years.map(y => <option key={y} value={y}>{y}</option>)}
                              </select>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Description Textarea nested in Card */}
                      <div className="nested-textarea-block">
                        <label className="nested-label">Description</label>
                        <textarea 
                          placeholder="Type your comments..."
                          value={exp.description} 
                          onChange={e => updateExperience(exp.id, 'description', e.target.value)}
                          className="nested-textarea-field"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Section 4: Certifications */}
              <div className="profile-section-block">
                <div className="section-block-header">
                  <h2 className="profile-section-heading">Certifications</h2>
                  <button className="add-section-pill-btn" onClick={addCertification}>
                    <span className="plus-sign">+</span> Add Certification
                  </button>
                </div>

                <div className="nested-records-stack">
                  {certificationsList.map(cert => (
                    <div className="nested-record-row-card" key={cert.id}>
                      <button className="delete-nested-row-btn" onClick={() => removeCertification(cert.id)} aria-label="Delete certification">✕</button>
                      
                      <div className="nested-record-inputs-line-certs">
                        {/* Cert Name */}
                        <div className="nested-text-col-medium">
                          <label className="nested-label">Certificate name</label>
                          <input 
                            type="text" 
                            placeholder="Certificate of Appreciation"
                            value={cert.certificateName} 
                            onChange={e => updateCertification(cert.id, 'certificateName', e.target.value)}
                            className="nested-text-input"
                          />
                        </div>

                        {/* Cert Link */}
                        <div className="nested-text-col-medium">
                          <label className="nested-label">Certificate Link</label>
                          <input 
                            type="text" 
                            placeholder="http/..."
                            value={cert.certificateLink} 
                            onChange={e => updateCertification(cert.id, 'certificateLink', e.target.value)}
                            className="nested-text-input"
                          />
                        </div>

                        {/* Cert Upload Trigger Card */}
                        <div className="nested-upload-container-card">
                          <div className="mini-dashed-trigger-card" onClick={() => triggerCertUpload(cert.id)}>
                            <svg className="doc-mini-icon" width="20" height="20" viewBox="0 0 24 24" fill="none">
                              <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" fill="#F2F4F7" stroke="#98A2B3" strokeWidth="1.5"/>
                            </svg>
                            <span className="txt-upload-mini">{cert.fileName || 'Upload Certificate'}</span>
                            <svg className="up-caret-mini" width="16" height="16" viewBox="0 0 24 24" fill="none">
                              <path d="M12 19V5M12 5L5 12M12 5L19 12" stroke="#475467" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </div>
                          <input 
                            type="file" 
                            id={`cert-file-input-${cert.id}`} 
                            style={{ display: 'none' }} 
                            onChange={e => handleCertFileSelect(cert.id, e)} 
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Section 5: Portfolio */}
              <div className="profile-section-block">
                <div className="section-block-header">
                  <h2 className="profile-section-heading">Portfolio</h2>
                  <button className="add-section-pill-btn" onClick={addPortfolio}>
                    <span className="plus-sign">+</span> Add Portfolio
                  </button>
                </div>

                <div className="nested-records-stack">
                  {portfolioList.map(port => (
                    <div className="nested-record-row-card" key={port.id}>
                      <button className="delete-nested-row-btn" onClick={() => removePortfolio(port.id)} aria-label="Delete portfolio">✕</button>
                      
                      <div className="nested-record-inputs-line-certs">
                        {/* Title */}
                        <div className="nested-text-col-medium">
                          <label className="nested-label">Title</label>
                          <input 
                            type="text" 
                            placeholder="Portfolio Title"
                            value={port.title} 
                            onChange={e => updatePortfolio(port.id, 'title', e.target.value)}
                            className="nested-text-input"
                          />
                        </div>

                        {/* Portfolio Link */}
                        <div className="nested-text-col-medium portfolio-link-wrapper-pos">
                          <label className="nested-label">Portfolio Link</label>
                          <div className="relative-globe-input">
                            <input 
                              type="text" 
                              placeholder="Portfolio Link"
                              value={port.portfolioLink} 
                              onChange={e => updatePortfolio(port.id, 'portfolioLink', e.target.value)}
                              className="nested-text-input globe-padded"
                            />
                            <span className="globe-input-icon">🌍</span>
                          </div>
                        </div>

                        {/* Upload Portfolio */}
                        <div className="nested-upload-container-card">
                          <div className="mini-dashed-trigger-card" onClick={() => triggerPortfolioUpload(port.id)}>
                            <svg className="doc-mini-icon" width="20" height="20" viewBox="0 0 24 24" fill="none">
                              <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" fill="#F2F4F7" stroke="#98A2B3" strokeWidth="1.5"/>
                            </svg>
                            <span className="txt-upload-mini">{port.fileName || 'Upload Portfolio'}</span>
                            <svg className="up-caret-mini" width="16" height="16" viewBox="0 0 24 24" fill="none">
                              <path d="M12 19V5M12 5L5 12M12 5L19 12" stroke="#475467" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </div>
                          <input 
                            type="file" 
                            id={`portfolio-file-input-${port.id}`} 
                            style={{ display: 'none' }} 
                            onChange={e => handlePortfolioFileSelect(port.id, e)} 
                          />
                        </div>
                      </div>

                      {/* Portfolio Description */}
                      <div className="nested-textarea-block">
                        <label className="nested-label">Description</label>
                        <textarea 
                          placeholder="Type your comments..."
                          value={port.description} 
                          onChange={e => updatePortfolio(port.id, 'description', e.target.value)}
                          className="nested-textarea-field"
                        />
                        <span className="portfolio-helper-green-text">*You can upload any PDF or JPEG</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="setup-profile-actions-bar">
                <button className="primary-action-btn wide-action px-next-btn-styled" onClick={handleNext}>
                  Next
                </button>
              </div>

            </div>
          )}

          {/* STEP 3: CHOOSE SKILLS */}
          {step === 3 && (
            <div className="onboarding-step-content choose-skills-step">
              <h2 className="step-content-heading">Select Skills</h2>
              <p className="step-content-subheading">Choose up to 15 skills. Select skills that match your experience.</p>
              
              <div className="skill-counter-badge">
                Selected: <span className="counter-accent">{selectedSkills.length}</span>/15
              </div>

              <form onSubmit={handleAddCustomSkill} className="add-custom-skill-inline">
                <input 
                  type="text" 
                  value={newSkillText}
                  onChange={e => setNewSkillText(e.target.value)}
                  placeholder="Add custom skill..."
                  className="onboard-text-input"
                />
                <button type="submit" className="add-skill-trigger-btn">Add</button>
              </form>

              <div className="skills-options-tags-grid">
                {availableSkills.map(skill => (
                  <button 
                    key={skill}
                    onClick={() => toggleSkill(skill)}
                    className={`skill-tag-toggle-btn ${selectedSkills.includes(skill) ? 'tag-selected' : ''}`}
                  >
                    {skill}
                    <span className="tag-toggle-icon">
                      {selectedSkills.includes(skill) ? '✓' : '+'}
                    </span>
                  </button>
                ))}
              </div>

              <div className="step-actions-footer">
                <button className="primary-action-btn wide-action" onClick={handleNext}>
                  Next: Connect Wallet
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: CONNECT WALLET */}
          {step === 4 && (
            <div className="onboarding-step-content connect-wallet-step">
              <h2 className="step-content-heading">Connect your Web3 Wallet</h2>
              <p className="step-content-subheading">Select a wallet you want to connect for your payment method. You can change it later.</p>

              {connectedWallet ? (
                <div className="connected-wallet-indicator-box">
                  <div className="wallet-card-brand-status">
                    <span className="wallet-logo-placeholder green-connected"></span>
                    <div className="wallet-meta-contents">
                      <div className="wallet-brand-name">{connectedWallet} Connected</div>
                      <div className="wallet-hash-address">{walletAddress}</div>
                    </div>
                  </div>
                  <button className="disconnect-wallet-trigger" onClick={disconnectWallet}>Disconnect</button>
                </div>
              ) : (
                <div className="wallet-provider-tiles-grid">
                  <button className="wallet-provider-block" onClick={() => connectWallet('MetaMask')}>
                    <span className="wallet-icon-meta mask-fox"></span>
                    <span className="provider-txt">MetaMask</span>
                  </button>
                  <button className="wallet-provider-block" onClick={() => connectWallet('CoinBase')}>
                    <span className="wallet-icon-meta coinbase-blue"></span>
                    <span className="provider-txt">CoinBase</span>
                  </button>
                  <button className="wallet-provider-block" onClick={() => connectWallet('Wallet Connect')}>
                    <span className="wallet-icon-meta walletconnect-icon"></span>
                    <span className="provider-txt">Wallet Connect</span>
                  </button>
                  <button className="wallet-provider-block" onClick={() => connectWallet('Fortmatic')}>
                    <span className="wallet-icon-meta fortmatic-purple"></span>
                    <span className="provider-txt">Fortmatic</span>
                  </button>
                </div>
              )}

              <div className="step-actions-footer">
                <button className={`primary-action-btn wide-action ${!connectedWallet ? 'skip-wallet-btn' : ''}`} onClick={handleNext}>
                  {connectedWallet ? 'Continue Steps' : 'Skip Wallet (For Now)'}
                </button>
              </div>
            </div>
          )}

          {/* STEP 5: SETUP PROFILE REVIEW */}
          {step === 5 && (
            <div className="onboarding-step-content review-complete-step">
              <h2 className="step-content-heading">Review Profile Content</h2>
              <p className="step-content-subheading">Verify everything looks correct before submitting.</p>

              <div className="profile-preview-card-view">
                <div className="profile-top-avatar-banner">
                  <div className="profile-preview-avatar">
                    <span className="initial-letters">JS</span>
                  </div>
                  <div className="profile-preview-name-details">
                    <h3>{profileData.firstName || 'John'} {profileData.lastName || 'Smith'}</h3>
                    <p className="preview-location-time">
                      🇺🇸 5:08 pm local time Dallas, {profileData.countryResidence !== 'Select' ? profileData.countryResidence : 'United States'}
                    </p>
                  </div>
                  <div className="preview-hourly-pricing-badge">
                    ${profileData.hourlyRate || '300'}/hr
                  </div>
                </div>

                <div className="profile-meta-grid-review">
                  <div className="review-meta-card">
                    <span className="label">English Level</span>
                    <span className="val">{profileData.englishProficiency !== 'Select' ? profileData.englishProficiency : 'Fluent'}</span>
                  </div>
                  <div className="review-meta-card">
                    <span className="label">Commitment</span>
                    <span className="val">{profileData.jobCommitment !== 'Select' ? profileData.jobCommitment : 'Part-time'}</span>
                  </div>
                  <div className="review-meta-card">
                    <span className="label">Crypto Staking Wallet</span>
                    <span className="val">{walletAddress || "None Connected"}</span>
                  </div>
                </div>

                <div className="review-skills-block">
                  <h4>Skills Provided</h4>
                  <div className="preview-tags-flex">
                    {selectedSkills.map(s => (
                      <span className="static-skill-chip" key={s}>{s}</span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="step-actions-footer">
                <button className="primary-action-btn wide-action finish-profile-btn" onClick={handleNext}>
                  Complete Profile creation
                </button>
              </div>
            </div>
          )}

        </div>
      ) : (
        /* CONGRATULATIONS CONFFETI VIEW */
        <div className="wizard-congrats-card">
          <div className="confetti-illustration">🎉</div>
          
          <h2 className="congrats-big-title">Congratulations! </h2>
          <p className="congrats-token-claim">You have got 500 GRL Tokens.</p>
          <div className="token-payout-box">
            <span className="token-label">Rewards rate</span>
            <span className="token-value">0.025%/ day</span>
          </div>

          <p className="join-msg">
            Your profile is all set. Together, let's explore a new era of innovative jobs and services delivery!
          </p>

          <button className="primary-action-btn wide-action launch-talent-btn" onClick={onBackToSignup}>
            Find Work & Home
          </button>
        </div>
      )}
    </div>
  );
};

export default UploadResume;
