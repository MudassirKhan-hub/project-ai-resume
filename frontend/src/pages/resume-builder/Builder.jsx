import React, { useState, useRef, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import { ArrowLeft, Save, Download, Sparkles, LayoutTemplate, Briefcase, GraduationCap, User, Wrench, Code, Plus, Trash2, Phone, Mail, MapPin, Globe, Loader2, Share2, Shield, Users, Edit3, CheckCircle2 } from 'lucide-react';
import html2pdf from 'html2pdf.js';
import { motion, AnimatePresence } from 'framer-motion';
import { templates } from '../../components/templates';
import { generateSummary, generateExperience } from '../../lib/gemini';
import { countryCodes } from '../../lib/countryCodes';
import ImageCropper from '../../components/ImageCropper';

const steps = [
  { id: 'personal', name: 'Personal Details', icon: <User className="w-4 h-4" /> },
  { id: 'summary', name: 'Professional Summary', icon: <Briefcase className="w-4 h-4" /> },
  { id: 'experience', name: 'Work Experience', icon: <Briefcase className="w-4 h-4" /> },
  { id: 'education', name: 'Education', icon: <GraduationCap className="w-4 h-4" /> },
  { id: 'skills', name: 'Skills', icon: <Wrench className="w-4 h-4" /> },
  { id: 'projects', name: 'Projects', icon: <Code className="w-4 h-4" /> },
  { id: 'certifications', name: 'Certifications', icon: <Shield className="w-4 h-4" /> },
  { id: 'languages', name: 'Languages', icon: <Globe className="w-4 h-4" /> },
  { id: 'social', name: 'Social Links', icon: <Share2 className="w-4 h-4" /> },
  { id: 'references', name: 'References', icon: <Users className="w-4 h-4" /> }
];

const Builder = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useUser();
  const [activeStep, setActiveStep] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isExportMode, setIsExportMode] = useState(false);
  const [isGeneratingSummary, setIsGeneratingSummary] = useState(false);
  const [generatingExperienceIdx, setGeneratingExperienceIdx] = useState(null);

  const [isSaving, setIsSaving] = useState(false);
  const [isAutoSaving, setIsAutoSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState(new Date());
  const [documentId, setDocumentId] = useState(null);
  const [imageToCrop, setImageToCrop] = useState(null);
  const [showCropper, setShowCropper] = useState(false);
  const [mobileMode, setMobileMode] = useState('edit'); // 'edit' or 'preview'
  const [showDownloadSuccess, setShowDownloadSuccess] = useState(false);
  const resumeRef = useRef(null);
  const hasLoadedRef = useRef(false);
  const autoSaveTimerRef = useRef(null);

  useEffect(() => {
    const handleFocus = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
        e.target.select();
      }
    };
    document.addEventListener('focusin', handleFocus);
    return () => document.removeEventListener('focusin', handleFocus);
  }, []);

  const handleDownloadPDF = async () => {
    setIsDownloading(true);
    const element = resumeRef.current;
    
    if (!element) {
      setIsDownloading(false);
      return;
    }

    const firstName = resumeData.personalInfo.firstName;
    const lastName = resumeData.personalInfo.lastName;
    const fileName = `${firstName || 'Resume'}_${lastName || ''}_Resume.pdf`.replace(/\s+/g, '_').toLowerCase();

    const opt = {
      margin:       0, // Use element's internal padding instead
      filename:     fileName,
      image:        { type: 'jpeg', quality: 1.0 }, // Maximum quality
      html2canvas:  { 
        scale: 4, // Ultra-high resolution to prevent blurriness
        useCORS: true, 
        letterRendering: true,
        logging: false,
        windowWidth: 794, // Force A4 width at 96 DPI for consistent layout
        scrollY: 0 // Prevent scrolling misalignment
      },
      jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' },
      pagebreak:    { mode: ['css', 'legacy'] } // Dual-mode for better section breaks
    };

    setIsExportMode(true);
    
    // Give time for UI to update to export mode (removes highlights/shadows)
    setTimeout(async () => {
      try {
        const pdf = html2pdf().from(element).set(opt);
        await pdf.save();
        setShowDownloadSuccess(true);
        setTimeout(() => setShowDownloadSuccess(false), 5000); // Hide after 5 seconds
      } catch (error) {
        console.error("PDF Export Error:", error);
      } finally {
        setIsExportMode(false);
        setIsDownloading(false);
      }
    }, 500);
  };
  
  const defaultResumeData = {
    personalInfo: { firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', phone: '+1 234 567 8900', title: 'Software Engineer', location: 'San Francisco, CA' },
    summary: 'A passionate Software Engineer with expertise in modern web technologies. Dedicated to building scalable and user-friendly applications while maintaining clean code practices.',
    experience: [
      { id: 'exp1', title: 'Frontend Developer', company: 'Tech Innovators', startDate: 'Jan 2021', endDate: 'Present', location: 'San Francisco, CA', description: '• Rebuilt the core customer portal using React, improving load times by 40%.\n• Collaborated with UI/UX designers to implement responsive web features.' }
    ],
    education: [
      { id: 'edu1', degree: 'B.S. Computer Science', school: 'University of Technology', startDate: '2014', endDate: '2018', grade: '3.8/4.0' }
    ],
    skills: 'JavaScript, React.js, Node.js, HTML/CSS, Git, Agile',
    projects: [
      { id: 'proj1', title: 'E-Commerce Dashboard', description: 'Architected a scalable e-commerce admin panel using Next.js and TailwindCSS.' }
    ],
    certifications: [
      { name: 'AWS Certified Developer', issuer: 'Amazon Web Services', date: 'Mar 2022' }
    ],
    languages: [
      { id: 'lang1', name: 'English', proficiency: 'Native' }
    ],
    socialLinks: { linkedin: 'johndoe', github: 'johndoe-dev', portfolio: '' },
    references: [],
    profileImage: null,
    themeColor: '#4f46e5',
    fontFamily: "'Inter', sans-serif",
    lineSpacing: 1.5,
    sectionSpacing: 24,
    showQrCode: false,
    qrCodeUrl: '',
    templateId: 'modern'
  };

  const [resumeData, setResumeData] = useState(defaultResumeData);

  const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || 'http://localhost:1337';

  useEffect(() => {
    const fetchResume = async () => {
      if (id && user) {
        try {
          const email = user.primaryEmailAddress.emailAddress;
          const response = await fetch(`${STRAPI_URL}/api/resumes?filters[resumeId][$eq]=${id}&filters[userEmail][$eq]=${email}`);
          const data = await response.json();
          if (data.data && data.data.length > 0) {
            const resume = data.data[0];
            const fetchedData = resume.resumeData || {};
            setResumeData({
              ...defaultResumeData,
              ...fetchedData,
              personalInfo: { ...defaultResumeData.personalInfo, ...(fetchedData.personalInfo || {}) },
              socialLinks: { ...defaultResumeData.socialLinks, ...(fetchedData.socialLinks || {}) },
              experience: fetchedData.experience || [],
              education: fetchedData.education || [],
              projects: fetchedData.projects || [],
              certifications: fetchedData.certifications || [],
              languages: fetchedData.languages || [],
              references: fetchedData.references || []
            });
            setDocumentId(resume.documentId || resume.id);
          }
        } catch (error) {
          console.error("Error fetching resume:", error);
        }
      }
    };
    if (user && id) {
      fetchResume().then(() => {
        // Mark as loaded after short delay to prevent immediate auto-save
        setTimeout(() => { hasLoadedRef.current = true; }, 1000);
      });
    } else {
      // For new resumes, wait a bit then enable auto-save
      setTimeout(() => { hasLoadedRef.current = true; }, 1000);
    }
  }, [id, user]);

  // Auto-save Effect
  useEffect(() => {
    if (!hasLoadedRef.current || !user) return;

    // Clear previous timer
    if (autoSaveTimerRef.current) clearTimeout(autoSaveTimerRef.current);

    setIsAutoSaving(true);
    
    autoSaveTimerRef.current = setTimeout(() => {
      handleSave(true); // Call save with isAutoSave = true
    }, 3000); // Save after 3 seconds of inactivity

    return () => {
      if (autoSaveTimerRef.current) clearTimeout(autoSaveTimerRef.current);
    };
  }, [resumeData, user]);

  const handleAddItem = (arrayName, defaultObject) => {
    setResumeData({...resumeData, [arrayName]: [...resumeData[arrayName], { ...defaultObject, id: Date.now().toString() }]});
  };

  const handleUpdateItem = (arrayName, index, field, value) => {
    const newArray = [...resumeData[arrayName]];
    newArray[index][field] = value;
    setResumeData({...resumeData, [arrayName]: newArray});
  };

  const handleRemoveItem = (arrayName, index) => {
    setResumeData({...resumeData, [arrayName]: resumeData[arrayName].filter((_, i) => i !== index)});
  };

  const handleGenerateSummary = async () => {
    setIsGeneratingSummary(true);
    try {
      const summary = await generateSummary(resumeData.personalInfo, resumeData.experience, resumeData.skills, resumeData.summary);
      setResumeData({ ...resumeData, summary });
    } catch (error) {
      alert(error.message || "Failed to generate summary. Please check your API key.");
      console.error(error);
    } finally {
      setIsGeneratingSummary(false);
    }
  };

  const handleGenerateExperience = async (index) => {
    setGeneratingExperienceIdx(index);
    try {
      const exp = resumeData.experience[index];
      const newDesc = await generateExperience(exp.title, exp.company, resumeData.skills, exp.description);
      handleUpdateItem('experience', index, 'description', newDesc);
    } catch (error) {
      alert(error.message || "Failed to generate experience. Please check your API key.");
      console.error(error);
    } finally {
      setGeneratingExperienceIdx(null);
    }
  };

  const handleSave = async (isAutoSave = false) => {
    if (!user) {
      if (!isAutoSave) alert("Please sign in to save your resume.");
      return;
    }

    if (!isAutoSave) setIsSaving(true);
    const email = user.primaryEmailAddress?.emailAddress;
    const name = user.fullName || user.firstName || 'User';
    
    const payload = {
      data: {
        title: resumeData.personalInfo?.title || 'My Resume',
        userEmail: email,
        userName: name,
        resumeData: resumeData,
        ...( (!id && !documentId) && { resumeId: crypto.randomUUID() } )
      }
    };

    try {
      let response;
      if ((id || documentId)) {
        // Update existing resume
        const targetId = documentId || id;
        response = await fetch(`${STRAPI_URL}/api/resumes/${targetId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      } else {
        // Create new resume
        response = await fetch(`${STRAPI_URL}/api/resumes`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      }

      if (response.ok) {
        const result = await response.json();
        setLastSaved(new Date());
        if (!isAutoSave) alert('Resume saved successfully!');
        
        if (!id && !documentId) {
          const newResumeId = result.data.resumeId;
          const newDocId = result.data.documentId || result.data.id;
          setDocumentId(newDocId);
          navigate(`/builder/${newResumeId}`, { replace: true });
        }
      } else {
        if (!isAutoSave) {
          alert('Failed to save resume. Please try again.');
          console.error("Save error:", await response.text());
        }
      }
    } catch (error) {
      console.error("Error saving resume:", error);
      if (!isAutoSave) alert('An error occurred while saving.');
    } finally {
      if (!isAutoSave) setIsSaving(false);
      setIsAutoSaving(false);
    }
  };

  const [isTemplateDropdownOpen, setIsTemplateDropdownOpen] = useState(false);
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageToCrop(reader.result);
        setShowCropper(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const onCropComplete = (croppedImage) => {
    setResumeData({ ...resumeData, profileImage: croppedImage });
    setShowCropper(false);
    setImageToCrop(null);
  };

  const ActiveTemplate = templates[resumeData.templateId]?.Component || templates['modern'].Component;

  return (
    <div className="flex flex-col h-screen bg-[#fafafa] font-sans">
      {/* Top Navbar */}
      <header className="px-4 lg:px-6 py-4 flex items-center justify-between bg-white border-b border-gray-200 z-20 shadow-sm sticky top-0 lg:static">
        <div className="flex items-center gap-3 lg:gap-6">
          <Link to="/dashboard" className="p-2 bg-gray-50 text-gray-600 hover:text-black hover:bg-gray-100 rounded-full transition-colors border border-gray-200">
            <ArrowLeft className="w-4 h-4 lg:w-5 h-5" />
          </Link>
          <div className="hidden sm:block">
            <h1 className="text-base lg:text-lg font-bold tracking-tight text-gray-900 leading-none">{resumeData.personalInfo.firstName} {resumeData.personalInfo.lastName}'s Resume</h1>
            <div className="flex items-center gap-2 mt-1">
              {isAutoSaving ? (
                <span className="flex items-center gap-1.5 text-[10px] text-indigo-500 font-bold animate-pulse">
                  <div className="w-1 h-1 rounded-full bg-indigo-500"></div>
                  Saving changes...
                </span>
              ) : (
                <span className="flex items-center gap-1.5 text-[10px] text-gray-400 font-medium">
                  <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                  Saved at {lastSaved.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-1 sm:gap-2 lg:gap-3">
          <div className="relative">
            <button 
              onClick={() => setIsTemplateDropdownOpen(!isTemplateDropdownOpen)}
              className="flex items-center gap-2 text-sm font-bold text-gray-600 hover:text-primary transition-colors px-2 sm:px-3 py-2 rounded-lg hover:bg-gray-50"
            >
              <LayoutTemplate className="w-4 h-4" /> <span className="hidden sm:inline">Templates</span>
            </button>
            
            <AnimatePresence>
              {isTemplateDropdownOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setIsTemplateDropdownOpen(false)}
                  ></div>
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full mt-2 w-64 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden z-50 origin-top-right"
                  >
                    <div className="p-2 max-h-[400px] overflow-y-auto custom-scrollbar bg-white">
                      <div className="px-3 py-2 text-xs font-black text-gray-400 uppercase tracking-wider mb-1">Select Template</div>
                      {Object.values(templates).map(t => (
                        <button
                          key={t.id}
                          onClick={() => {
                            setResumeData({...resumeData, templateId: t.id});
                            setIsTemplateDropdownOpen(false);
                          }}
                          className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-bold transition-colors flex items-center justify-between mb-1 ${resumeData.templateId === t.id ? 'bg-primary/10 text-primary' : 'text-gray-700 hover:bg-gray-100'}`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-10 rounded border ${resumeData.templateId === t.id ? 'border-primary bg-primary/5' : 'border-gray-200 bg-gray-50'} flex flex-col gap-1 p-1 overflow-hidden shadow-sm`}>
                              <div className={`h-1 w-full rounded-full ${resumeData.templateId === t.id ? 'bg-primary/40' : 'bg-gray-300'}`}></div>
                              <div className="flex gap-1">
                                <div className={`h-4 w-2 rounded-sm ${resumeData.templateId === t.id ? 'bg-primary/20' : 'bg-gray-200'}`}></div>
                                <div className="flex flex-col gap-0.5 flex-1">
                                  <div className={`h-0.5 w-full rounded-full ${resumeData.templateId === t.id ? 'bg-primary/20' : 'bg-gray-200'}`}></div>
                                  <div className={`h-0.5 w-full rounded-full ${resumeData.templateId === t.id ? 'bg-primary/20' : 'bg-gray-200'}`}></div>
                                  <div className={`h-0.5 w-3/4 rounded-full ${resumeData.templateId === t.id ? 'bg-primary/20' : 'bg-gray-200'}`}></div>
                                </div>
                              </div>
                            </div>
                            {t.name}
                          </div>
                          {resumeData.templateId === t.id && <div className="w-2 h-2 rounded-full bg-primary"></div>}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
          <div className="w-px h-6 bg-gray-200 mx-2"></div>
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-2 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors px-3 lg:px-5 py-2 lg:py-2.5 rounded-lg font-bold text-xs lg:text-sm shadow-sm disabled:opacity-50"
          >
            {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />} 
            <span className="hidden sm:inline">{isSaving ? 'Saving...' : 'Save'}</span>
          </button>
          <button 
            onClick={handleDownloadPDF} 
            disabled={isDownloading}
            className="flex items-center gap-2 bg-gradient-to-r from-primary to-blue-600 text-white hover:opacity-90 transition-opacity px-3 lg:px-5 py-2 lg:py-2.5 rounded-lg font-bold text-xs lg:text-sm shadow-md disabled:opacity-50 min-w-[100px] lg:min-w-[130px] justify-center"
          >
            {isDownloading ? (
               <>
                 <div className="w-3 h-3 lg:w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                 <span className="hidden sm:inline">Generating...</span>
               </>
            ) : (
               <>
                 <Download className="w-3 h-3 lg:w-4 h-4" /> <span className="hidden sm:inline">Export PDF</span><span className="sm:hidden">Export</span>
               </>
            )}
          </button>
        </div>
      </header>

      {/* Main Content Arena */}
      <main className="flex-1 flex overflow-hidden">
        
        {/* Left Side: Form Controls */}
        <div className={`${mobileMode === 'edit' ? 'flex' : 'hidden'} lg:flex w-full lg:w-[45%] flex-col bg-white border-r border-gray-200 shadow-xl z-10 relative`}>
          
          {/* Progress Steps Header */}
          <div className="flex gap-2 px-4 lg:px-6 py-4 lg:py-5 border-b border-gray-100 bg-gray-50/50 overflow-x-auto no-scrollbar">
            {steps.map((step, idx) => (
              <button
                key={step.id}
                onClick={() => setActiveStep(idx)}
                className={`flex items-center gap-2 flex-shrink-0 text-sm font-bold px-4 py-2 rounded-full transition-all ${
                  activeStep === idx 
                    ? 'bg-black text-white shadow-md transform scale-105' 
                    : 'bg-white text-gray-500 border border-gray-200 hover:border-gray-300 hover:text-gray-900'
                }`}
              >
                {step.icon}
                {step.name}
              </button>
            ))}
          </div>

          {/* Form Content Scrollable Area */}
          <div className="flex-1 overflow-y-auto p-5 lg:p-8 pb-32 lg:pb-32">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
              >
                <div className="mb-6 lg:mb-8">
                  <h2 className="text-2xl lg:text-3xl font-black text-gray-900">{steps[activeStep].name}</h2>
                  <p className="text-gray-500 mt-2 text-xs lg:text-sm">Provide accurate information to build your perfect resume profile.</p>
                </div>
                
                {activeStep === 0 && (
                  <div className="space-y-6">
                    {/* Profile Image Upload */}
                    <div className="flex items-center gap-6 p-4 bg-gray-50 rounded-xl border border-gray-200">
                      <div className="relative group">
                        <div className="w-20 h-20 rounded-full bg-gray-200 border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden">
                          {resumeData.profileImage ? (
                            <img src={resumeData.profileImage} alt="Profile" className="w-full h-full object-cover" />
                          ) : (
                            <User className="w-8 h-8 text-gray-400" />
                          )}
                        </div>
                        <input 
                          type="file" 
                          accept="image/*" 
                          onChange={handleImageUpload}
                          className="absolute inset-0 opacity-0 cursor-pointer" 
                        />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-gray-900">Profile Photo</h4>
                        <p className="text-xs text-gray-500 mt-1">Click to upload or drag and drop (JPG, PNG)</p>
                        {resumeData.profileImage && (
                          <button 
                            onClick={() => setResumeData({...resumeData, profileImage: null})}
                            className="text-xs text-red-500 font-bold mt-2 hover:underline"
                          >
                            Remove photo
                          </button>
                        )}
                      </div>
                    </div>

                    {/* QR Code Section */}
                    <div className="p-5 bg-blue-50/50 rounded-xl border border-blue-100 space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                            <Globe className="w-4 h-4" />
                          </div>
                          <div>
                            <h4 className="text-sm font-bold text-gray-900">Digital QR Code</h4>
                            <p className="text-[10px] text-gray-500">Link to your Portfolio or LinkedIn</p>
                          </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            checked={resumeData.showQrCode}
                            onChange={(e) => setResumeData({...resumeData, showQrCode: e.target.checked})}
                            className="sr-only peer" 
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                        </label>
                      </div>
                      
                      {resumeData.showQrCode && (
                        <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                          <input 
                            type="url" 
                            placeholder="https://your-portfolio.com"
                            value={resumeData.qrCodeUrl}
                            onChange={(e) => setResumeData({...resumeData, qrCodeUrl: e.target.value})}
                            className="w-full px-4 py-2.5 bg-white border border-blue-200 rounded-lg text-sm focus:ring-2 focus:ring-primary outline-none transition-all"
                          />
                          <p className="text-[10px] text-blue-400 mt-2 italic font-medium">This QR code will be visible on your printed/PDF resume.</p>
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <div className="flex flex-col gap-2">
                        <label className="text-sm font-bold text-gray-700">First Name</label>
                        <input 
                          type="text" 
                          value={resumeData.personalInfo.firstName}
                          onChange={(e) => {
                            const val = e.target.value.replace(/[^A-Za-z\s]/g, '');
                            setResumeData({...resumeData, personalInfo: {...resumeData.personalInfo, firstName: val}});
                          }}
                          className="flex h-11 w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-transparent transition-all shadow-sm" 
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-sm font-bold text-gray-700">Last Name</label>
                        <input 
                          type="text" 
                          value={resumeData.personalInfo.lastName}
                          onChange={(e) => {
                            const val = e.target.value.replace(/[^A-Za-z\s]/g, '');
                            setResumeData({...resumeData, personalInfo: {...resumeData.personalInfo, lastName: val}});
                          }}
                          className="flex h-11 w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-transparent transition-all shadow-sm" 
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-bold text-gray-700">Professional Title</label>
                      <input 
                        type="text" 
                        value={resumeData.personalInfo.title}
                        onChange={(e) => {
                          const val = e.target.value.replace(/[^A-Za-z\s]/g, '');
                          setResumeData({...resumeData, personalInfo: {...resumeData.personalInfo, title: val}});
                        }}
                        className="flex h-11 w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-transparent transition-all shadow-sm" 
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                      <div className="flex flex-col gap-2">
                        <label className="text-sm font-bold text-gray-700">Email Address</label>
                        <input 
                          type="email" 
                          value={resumeData.personalInfo.email}
                          onChange={(e) => setResumeData({...resumeData, personalInfo: {...resumeData.personalInfo, email: e.target.value}})}
                          className="flex h-11 w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-transparent transition-all shadow-sm" 
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-sm font-bold text-gray-700">Phone</label>
                        <div className="flex h-11 w-full rounded-lg border border-gray-300 bg-white focus-within:ring-2 focus-within:ring-primary focus-within:border-transparent transition-all shadow-sm overflow-hidden">
                          <select 
                            className="bg-gray-50 border-none outline-none px-2 text-sm text-gray-700 border-r border-gray-300 cursor-pointer min-w-[120px] max-w-[180px]"
                            value={(resumeData.personalInfo.phone || '').match(/^(\+\d{1,4})\s/)?.[1] || '+92'}
                            onChange={(e) => {
                              const num = (resumeData.personalInfo.phone || '').replace(/^\+\d{1,4}\s*/, '');
                              setResumeData({...resumeData, personalInfo: {...resumeData.personalInfo, phone: `${e.target.value} ${num}`}});
                            }}
                          >
                            {countryCodes.map(c => (
                              <option key={c.code + c.name} value={c.code}>{c.name} ({c.code})</option>
                            ))}
                          </select>
                          <input 
                            type="tel" 
                            value={(resumeData.personalInfo.phone || '').replace(/^\+\d{1,4}\s*/, '')}
                            onChange={(e) => {
                              const code = (resumeData.personalInfo.phone || '').match(/^(\+\d{1,4})\s/)?.[1] || '+92';
                              setResumeData({...resumeData, personalInfo: {...resumeData.personalInfo, phone: `${code} ${e.target.value}`}});
                            }}
                            className="flex-1 h-full px-3 text-sm text-gray-900 border-none outline-none bg-transparent" 
                            placeholder="300 1234567"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-bold text-gray-700">Location (City, Country)</label>
                      <input 
                        type="text" 
                        value={resumeData.personalInfo.location || ''}
                        onChange={(e) => setResumeData({...resumeData, personalInfo: {...resumeData.personalInfo, location: e.target.value}})}
                        className="flex h-11 w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-transparent transition-all shadow-sm" 
                      />
                    </div>
                  </div>
                )}

                {activeStep === 1 && (
                  <div className="space-y-4">
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-sm font-bold text-gray-700">Profile Summary</label>
                        <button 
                          onClick={handleGenerateSummary}
                          disabled={isGeneratingSummary}
                          className="flex items-center gap-1.5 text-xs text-white font-bold bg-gradient-to-r from-primary to-blue-600 px-3 py-1.5 rounded-full shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:transform-none"
                        >
                          {isGeneratingSummary ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />} 
                          {isGeneratingSummary ? 'Generating...' : 'AI Generate'}
                        </button>
                      </div>
                      <textarea 
                        value={resumeData.summary}
                        onChange={(e) => setResumeData({...resumeData, summary: e.target.value})}
                        className="flex min-h-[220px] w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-transparent transition-all shadow-sm resize-none leading-relaxed" 
                        placeholder="Write a brief professional summary..."
                      />
                      <p className="text-xs text-gray-500 font-medium">Tip: Use the AI Generator if you don't know where to start!</p>
                    </div>
                  </div>
                )}

                {activeStep === 2 && (
                  <div className="space-y-6">
                    {resumeData.experience.map((exp, index) => (
                      <div key={exp.id} className="p-5 border border-gray-200 rounded-xl bg-gray-50 relative group">
                        <button onClick={() => handleRemoveItem('experience', index)} className="absolute top-4 right-4 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Trash2 className="w-5 h-5" />
                        </button>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-bold text-gray-700">Job Title</label>
                            <input type="text" value={exp.title} onChange={(e) => handleUpdateItem('experience', index, 'title', e.target.value)} className="h-10 w-full rounded-lg border border-gray-300 px-3 text-sm focus:ring-2 focus:ring-primary outline-none" />
                          </div>
                          <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-bold text-gray-700">Company</label>
                            <input type="text" value={exp.company} onChange={(e) => handleUpdateItem('experience', index, 'company', e.target.value)} className="h-10 w-full rounded-lg border border-gray-300 px-3 text-sm focus:ring-2 focus:ring-primary outline-none" />
                          </div>
                          <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-bold text-gray-700">Start Date</label>
                            <input type="text" value={exp.startDate} onChange={(e) => handleUpdateItem('experience', index, 'startDate', e.target.value)} className="h-10 w-full rounded-lg border border-gray-300 px-3 text-sm focus:ring-2 focus:ring-primary outline-none" placeholder="e.g. Jan 2020" />
                          </div>
                          <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-bold text-gray-700">End Date</label>
                            <input type="text" value={exp.endDate} onChange={(e) => handleUpdateItem('experience', index, 'endDate', e.target.value)} className="h-10 w-full rounded-lg border border-gray-300 px-3 text-sm focus:ring-2 focus:ring-primary outline-none" placeholder="e.g. Present" />
                          </div>
                          <div className="flex flex-col gap-1.5 col-span-2">
                            <label className="text-sm font-bold text-gray-700">Location</label>
                            <input type="text" value={exp.location || ''} onChange={(e) => handleUpdateItem('experience', index, 'location', e.target.value)} className="h-10 w-full rounded-lg border border-gray-300 px-3 text-sm focus:ring-2 focus:ring-primary outline-none" placeholder="e.g. San Francisco, CA" />
                          </div>
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <div className="flex items-center justify-between">
                            <label className="text-sm font-bold text-gray-700">Description</label>
                            <button 
                              onClick={() => handleGenerateExperience(index)}
                              disabled={generatingExperienceIdx === index}
                              className="flex items-center gap-1 text-xs text-indigo-600 font-bold hover:text-indigo-800 disabled:opacity-50"
                            >
                              {generatingExperienceIdx === index ? <Loader2 className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3" />}
                              {generatingExperienceIdx === index ? 'Writing...' : 'Auto-write Form'}
                            </button>
                          </div>
                          <textarea value={exp.description} onChange={(e) => handleUpdateItem('experience', index, 'description', e.target.value)} className="min-h-[100px] w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-primary outline-none" placeholder="Bullet points of your achievements..." />
                        </div>
                      </div>
                    ))}
                    <button onClick={() => handleAddItem('experience', { title: '', company: '', startDate: '', endDate: '', location: '', description: '' })} className="w-full py-3 border-2 border-dashed border-gray-300 text-gray-600 font-bold rounded-xl hover:bg-gray-50 flex items-center justify-center gap-2 transition-colors">
                      <Plus className="w-4 h-4" /> Add Experience
                    </button>
                  </div>
                )}

                {activeStep === 3 && (
                  <div className="space-y-6">
                    {resumeData.education.map((edu, index) => (
                      <div key={edu.id} className="p-5 border border-gray-200 rounded-xl bg-gray-50 relative group">
                        <button onClick={() => handleRemoveItem('education', index)} className="absolute top-4 right-4 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Trash2 className="w-5 h-5" />
                        </button>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-bold text-gray-700">Degree / Program</label>
                            <input type="text" value={edu.degree} onChange={(e) => handleUpdateItem('education', index, 'degree', e.target.value)} className="h-10 w-full rounded-lg border border-gray-300 px-3 text-sm focus:ring-2 focus:ring-primary outline-none" />
                          </div>
                          <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-bold text-gray-700">University / School</label>
                            <input type="text" value={edu.school} onChange={(e) => handleUpdateItem('education', index, 'school', e.target.value)} className="h-10 w-full rounded-lg border border-gray-300 px-3 text-sm focus:ring-2 focus:ring-primary outline-none" />
                          </div>
                          <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-bold text-gray-700">Start Year</label>
                            <input type="text" value={edu.startDate} onChange={(e) => handleUpdateItem('education', index, 'startDate', e.target.value)} className="h-10 w-full rounded-lg border border-gray-300 px-3 text-sm focus:ring-2 focus:ring-primary outline-none" />
                          </div>
                          <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-bold text-gray-700">End Year</label>
                            <input type="text" value={edu.endDate} onChange={(e) => handleUpdateItem('education', index, 'endDate', e.target.value)} className="h-10 w-full rounded-lg border border-gray-300 px-3 text-sm focus:ring-2 focus:ring-primary outline-none" />
                          </div>
                          <div className="flex flex-col gap-1.5 col-span-2">
                            <label className="text-sm font-bold text-gray-700">CGPA / Marks</label>
                            <input type="text" value={edu.grade} onChange={(e) => handleUpdateItem('education', index, 'grade', e.target.value)} className="h-10 w-full rounded-lg border border-gray-300 px-3 text-sm focus:ring-2 focus:ring-primary outline-none" placeholder="e.g. 1022/1100 or 3.8/4.0" />
                          </div>
                        </div>
                      </div>
                    ))}
                    <button onClick={() => handleAddItem('education', { degree: '', school: '', startDate: '', endDate: '', grade: '' })} className="w-full py-3 border-2 border-dashed border-gray-300 text-gray-600 font-bold rounded-xl hover:bg-gray-50 flex items-center justify-center gap-2 transition-colors">
                      <Plus className="w-4 h-4" /> Add Education
                    </button>
                  </div>
                )}

                {activeStep === 4 && (
                  <div className="space-y-4">
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-bold text-gray-700">Skills (Comma separated)</label>
                      <textarea 
                        value={resumeData.skills}
                        onChange={(e) => setResumeData({...resumeData, skills: e.target.value})}
                        className="flex min-h-[150px] w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 focus:ring-2 focus:ring-primary outline-none" 
                        placeholder="e.g. React, JavaScript, Project Management, UI/UX Design"
                      />
                    </div>
                  </div>
                )}

                {activeStep === 5 && (
                  <div className="space-y-6">
                    {resumeData.projects.map((proj, index) => (
                      <div key={proj.id} className="p-5 border border-gray-200 rounded-xl bg-gray-50 relative group">
                        <button onClick={() => handleRemoveItem('projects', index)} className="absolute top-4 right-4 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Trash2 className="w-5 h-5" />
                        </button>
                        <div className="flex flex-col gap-4">
                          <div className="flex flex-col gap-1.5 w-1/2">
                            <label className="text-sm font-bold text-gray-700">Project Name</label>
                            <input type="text" value={proj.title} onChange={(e) => handleUpdateItem('projects', index, 'title', e.target.value)} className="h-10 w-full rounded-lg border border-gray-300 px-3 text-sm focus:ring-2 focus:ring-primary outline-none" />
                          </div>
                          <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-bold text-gray-700">Description</label>
                            <textarea value={proj.description} onChange={(e) => handleUpdateItem('projects', index, 'description', e.target.value)} className="min-h-[80px] w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-primary outline-none" />
                          </div>
                        </div>
                      </div>
                    ))}
                    <button onClick={() => handleAddItem('projects', { title: '', description: '' })} className="w-full py-3 border-2 border-dashed border-gray-300 text-gray-600 font-bold rounded-xl hover:bg-gray-50 flex items-center justify-center gap-2 transition-colors">
                      <Plus className="w-4 h-4" /> Add Project
                    </button>
                  </div>
                )}

                {activeStep === 6 && (
                  <div className="space-y-6">
                    {resumeData.certifications?.map((cert, index) => (
                      <div key={index} className="p-5 border border-gray-200 rounded-xl bg-gray-50 relative group">
                        <button onClick={() => handleRemoveItem('certifications', index)} className="absolute top-4 right-4 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Trash2 className="w-5 h-5" />
                        </button>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="flex flex-col gap-1.5 col-span-2 sm:col-span-1">
                            <label className="text-sm font-bold text-gray-700">Certification Name</label>
                            <input type="text" value={cert.name} onChange={(e) => handleUpdateItem('certifications', index, 'name', e.target.value)} className="h-10 w-full rounded-lg border border-gray-300 px-3 text-sm focus:ring-2 focus:ring-primary outline-none" placeholder="e.g. AWS Certified Solutions Architect" />
                          </div>
                          <div className="flex flex-col gap-1.5 col-span-2 sm:col-span-1">
                            <label className="text-sm font-bold text-gray-700">Issuing Organization</label>
                            <input type="text" value={cert.issuer} onChange={(e) => handleUpdateItem('certifications', index, 'issuer', e.target.value)} className="h-10 w-full rounded-lg border border-gray-300 px-3 text-sm focus:ring-2 focus:ring-primary outline-none" placeholder="e.g. Amazon Web Services" />
                          </div>
                          <div className="flex flex-col gap-1.5 col-span-2">
                            <label className="text-sm font-bold text-gray-700">Date Earned</label>
                            <input type="text" value={cert.date} onChange={(e) => handleUpdateItem('certifications', index, 'date', e.target.value)} className="h-10 w-full rounded-lg border border-gray-300 px-3 text-sm focus:ring-2 focus:ring-primary outline-none" placeholder="e.g. Jan 2023" />
                          </div>
                        </div>
                      </div>
                    ))}
                    <button onClick={() => handleAddItem('certifications', { name: '', issuer: '', date: '' })} className="w-full py-3 border-2 border-dashed border-gray-300 text-gray-600 font-bold rounded-xl hover:bg-gray-50 flex items-center justify-center gap-2 transition-colors">
                      <Plus className="w-4 h-4" /> Add Certification
                    </button>
                  </div>
                )}

                {activeStep === 7 && (
                  <div className="space-y-6">
                    {resumeData.languages?.map((lang, index) => (
                      <div key={lang.id} className="p-5 border border-gray-200 rounded-xl bg-gray-50 relative group">
                        <button onClick={() => handleRemoveItem('languages', index)} className="absolute top-4 right-4 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Trash2 className="w-5 h-5" />
                        </button>
                        <div className="flex flex-col gap-4">
                          <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-bold text-gray-700">Language Name</label>
                            <input type="text" value={lang.name} onChange={(e) => handleUpdateItem('languages', index, 'name', e.target.value)} className="h-10 w-full rounded-lg border border-gray-300 px-3 text-sm focus:ring-2 focus:ring-primary outline-none" placeholder="e.g. English, French, etc." />
                          </div>
                          <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-bold text-gray-700">Proficiency Level</label>
                            <select value={lang.proficiency} onChange={(e) => handleUpdateItem('languages', index, 'proficiency', e.target.value)} className="h-10 w-full rounded-lg border border-gray-300 px-3 text-sm focus:ring-2 focus:ring-primary outline-none">
                              <option value="Native">Native</option>
                              <option value="Fluent">Fluent</option>
                              <option value="Proficient">Proficient</option>
                              <option value="Intermediate">Intermediate</option>
                              <option value="Beginner">Beginner</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    ))}
                    <button onClick={() => handleAddItem('languages', { name: '', proficiency: 'Intermediate' })} className="w-full py-3 border-2 border-dashed border-gray-300 text-gray-600 font-bold rounded-xl hover:bg-gray-50 flex items-center justify-center gap-2 transition-colors">
                      <Plus className="w-4 h-4" /> Add Language
                    </button>
                  </div>
                )}

                {activeStep === 8 && (
                  <div className="space-y-6">
                    <div className="flex flex-col gap-4 p-5 border border-gray-200 rounded-xl bg-gray-50">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-bold text-gray-700">LinkedIn Profile</label>
                        <input type="text" value={resumeData.socialLinks?.linkedin || ''} onChange={(e) => setResumeData({...resumeData, socialLinks: {...(resumeData.socialLinks || {}), linkedin: e.target.value}})} className="h-10 w-full rounded-lg border border-gray-300 px-3 text-sm focus:ring-2 focus:ring-primary outline-none" placeholder="e.g. linkedin.com/in/username" />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-bold text-gray-700">GitHub Profile</label>
                        <input type="text" value={resumeData.socialLinks?.github || ''} onChange={(e) => setResumeData({...resumeData, socialLinks: {...(resumeData.socialLinks || {}), github: e.target.value}})} className="h-10 w-full rounded-lg border border-gray-300 px-3 text-sm focus:ring-2 focus:ring-primary outline-none" placeholder="e.g. github.com/username" />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-bold text-gray-700">Portfolio / Website</label>
                        <input type="text" value={resumeData.socialLinks?.portfolio || ''} onChange={(e) => setResumeData({...resumeData, socialLinks: {...(resumeData.socialLinks || {}), portfolio: e.target.value}})} className="h-10 w-full rounded-lg border border-gray-300 px-3 text-sm focus:ring-2 focus:ring-primary outline-none" placeholder="e.g. www.myportfolio.com" />
                      </div>
                    </div>
                  </div>
                )}

                {activeStep === 9 && (
                  <div className="space-y-6">
                    {resumeData.references?.map((ref, index) => (
                      <div key={index} className="p-5 border border-gray-200 rounded-xl bg-gray-50 relative group">
                        <button onClick={() => handleRemoveItem('references', index)} className="absolute top-4 right-4 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Trash2 className="w-5 h-5" />
                        </button>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="flex flex-col gap-1.5 col-span-2 sm:col-span-1">
                            <label className="text-sm font-bold text-gray-700">Reference Name</label>
                            <input type="text" value={ref.name} onChange={(e) => handleUpdateItem('references', index, 'name', e.target.value)} className="h-10 w-full rounded-lg border border-gray-300 px-3 text-sm focus:ring-2 focus:ring-primary outline-none" placeholder="e.g. Jane Smith" />
                          </div>
                          <div className="flex flex-col gap-1.5 col-span-2 sm:col-span-1">
                            <label className="text-sm font-bold text-gray-700">Job Title</label>
                            <input type="text" value={ref.title} onChange={(e) => handleUpdateItem('references', index, 'title', e.target.value)} className="h-10 w-full rounded-lg border border-gray-300 px-3 text-sm focus:ring-2 focus:ring-primary outline-none" placeholder="e.g. Senior Manager" />
                          </div>
                          <div className="flex flex-col gap-1.5 col-span-2 sm:col-span-1">
                            <label className="text-sm font-bold text-gray-700">Company</label>
                            <input type="text" value={ref.company} onChange={(e) => handleUpdateItem('references', index, 'company', e.target.value)} className="h-10 w-full rounded-lg border border-gray-300 px-3 text-sm focus:ring-2 focus:ring-primary outline-none" placeholder="e.g. Tech Corp" />
                          </div>
                          <div className="flex flex-col gap-1.5 col-span-2 sm:col-span-1">
                            <label className="text-sm font-bold text-gray-700">Contact Info</label>
                            <input type="text" value={ref.contact} onChange={(e) => handleUpdateItem('references', index, 'contact', e.target.value)} className="h-10 w-full rounded-lg border border-gray-300 px-3 text-sm focus:ring-2 focus:ring-primary outline-none" placeholder="e.g. jane@example.com" />
                          </div>
                        </div>
                      </div>
                    ))}
                    <button onClick={() => handleAddItem('references', { name: '', title: '', company: '', contact: '' })} className="w-full py-3 border-2 border-dashed border-gray-300 text-gray-600 font-bold rounded-xl hover:bg-gray-50 flex items-center justify-center gap-2 transition-colors">
                      <Plus className="w-4 h-4" /> Add Reference
                    </button>
                  </div>
                )}

              </motion.div>
            </AnimatePresence>
          </div>

          {/* Form Footer Actions Fixed */}
          <div className="absolute bottom-0 left-0 w-full bg-white border-t border-gray-200 p-6 flex justify-between z-20">
            <button 
              onClick={() => setActiveStep(prev => Math.max(0, prev - 1))}
              disabled={activeStep === 0}
              className="px-6 py-2.5 font-bold text-sm bg-gray-100 text-gray-600 hover:bg-gray-200 rounded-lg disabled:opacity-40 transition-colors"
            >
              Back
            </button>
            <button 
              onClick={() => setActiveStep(prev => Math.min(steps.length - 1, prev + 1))}
              disabled={activeStep === steps.length - 1}
              className="px-8 py-2.5 font-bold text-sm bg-black text-white hover:bg-gray-800 rounded-lg shadow-md disabled:opacity-40 transition-colors flex items-center gap-2"
            >
              Continue <ArrowLeft className="w-4 h-4 rotate-180" />
            </button>
          </div>

        </div>

        {/* Right Side: Live Preview Pane */}
        <div className={`${mobileMode === 'preview' ? 'flex' : 'hidden'} lg:flex flex-1 bg-gray-800 p-4 lg:p-8 overflow-y-auto flex flex-col items-center justify-start custom-scrollbar relative border-l border-gray-700`}>
          
          {/* Theme & Design Controls */}
          <div className="w-[210mm] max-w-full flex flex-col lg:flex-row justify-between items-center bg-gray-900 p-4 rounded-xl shadow-lg border border-gray-700 mb-6 gap-4 z-10 shrink-0">

             <div className="flex items-center gap-3 shrink-0 w-full lg:w-auto justify-between lg:justify-start">
                <span className="text-gray-300 text-xs lg:text-sm font-bold uppercase tracking-wider">Font:</span>
                <select 
                  value={resumeData.fontFamily}
                  onChange={(e) => setResumeData({...resumeData, fontFamily: e.target.value})}
                  className="bg-gray-800 border border-gray-600 text-white text-xs lg:text-sm rounded-md focus:ring-primary focus:border-primary block p-2 outline-none min-w-[120px]"
                >
                  <optgroup label="Modern Web Fonts">
                    <option value="'Inter', sans-serif" style={{ fontFamily: "'Inter', sans-serif" }}>Modern (Inter)</option>
                    <option value="'Merriweather', serif" style={{ fontFamily: "'Merriweather', serif" }}>Classic (Merriweather)</option>
                    <option value="'Roboto Mono', monospace" style={{ fontFamily: "'Roboto Mono', monospace" }}>Technical (Mono)</option>
                    <option value="'Outfit', sans-serif" style={{ fontFamily: "'Outfit', sans-serif" }}>Premium (Outfit)</option>
                  </optgroup>
                  <optgroup label="Classic Word Fonts">
                    <option value="Arial, sans-serif" style={{ fontFamily: "Arial, sans-serif" }}>Arial</option>
                    <option value="'Times New Roman', Times, serif" style={{ fontFamily: "'Times New Roman', Times, serif" }}>Times New Roman</option>
                    <option value="Calibri, sans-serif" style={{ fontFamily: "Calibri, sans-serif" }}>Calibri</option>
                    <option value="Helvetica, sans-serif" style={{ fontFamily: "Helvetica, sans-serif" }}>Helvetica</option>
                    <option value="Garamond, serif" style={{ fontFamily: "Garamond, serif" }}>Garamond</option>
                    <option value="'Courier New', Courier, monospace" style={{ fontFamily: "'Courier New', Courier, monospace" }}>Courier New</option>
                    <option value="Verdana, sans-serif" style={{ fontFamily: "Verdana, sans-serif" }}>Verdana</option>
                    <option value="Georgia, serif" style={{ fontFamily: "Georgia, serif" }}>Georgia</option>
                    <option value="Tahoma, sans-serif" style={{ fontFamily: "Tahoma, sans-serif" }}>Tahoma</option>
                    <option value="'Trebuchet MS', sans-serif" style={{ fontFamily: "'Trebuchet MS', sans-serif" }}>Trebuchet MS</option>
                    <option value="Impact, sans-serif" style={{ fontFamily: "Impact, sans-serif" }}>Impact</option>
                  </optgroup>
                </select>
             </div>
             
             <div className="flex items-center gap-3 w-full lg:w-auto justify-between lg:justify-start">
                <span className="text-gray-300 text-xs lg:text-sm font-bold uppercase tracking-wider">Accent:</span>
                <div className="flex gap-1.5 lg:gap-2 overflow-x-auto no-scrollbar pb-1">
                  {['#4f46e5', '#2563eb', '#059669', '#dc2626', '#d97706', '#475569'].map(color => (
                    <button 
                      key={color} 
                      onClick={() => setResumeData({...resumeData, themeColor: color})}
                      className={`w-6 h-6 lg:w-8 lg:h-8 rounded-full border-2 transition-transform shrink-0 ${resumeData.themeColor === color ? 'border-white scale-110 shadow-lg' : 'border-transparent hover:scale-105'}`}
                      style={{ backgroundColor: color }}
                    ></button>
                  ))}
                  <input 
                    type="color" 
                    value={resumeData.themeColor}
                    onChange={(e) => setResumeData({...resumeData, themeColor: e.target.value})}
                    className="w-6 h-6 lg:w-8 lg:h-8 rounded-full border-2 border-transparent bg-transparent cursor-pointer p-0 shrink-0"
                  />
                </div>
             </div>

             <div className="h-px w-full lg:h-8 lg:w-px bg-gray-700 mx-2"></div>

             <div className="flex items-center gap-6 w-full lg:w-auto">
                <div className="flex flex-col gap-1 flex-1 lg:flex-none">
                  <div className="flex justify-between text-[10px] text-gray-400 font-bold uppercase tracking-tighter">
                    <span>Line Space</span>
                    <span>{resumeData.lineSpacing}</span>
                  </div>
                  <input 
                    type="range" 
                    min="1" max="2" step="0.1"
                    value={resumeData.lineSpacing}
                    onChange={(e) => setResumeData({...resumeData, lineSpacing: parseFloat(e.target.value)})}
                    className="w-full lg:w-24 h-1.5 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                </div>
                <div className="flex flex-col gap-1 flex-1 lg:flex-none">
                  <div className="flex justify-between text-[10px] text-gray-400 font-bold uppercase tracking-tighter">
                    <span>Section Gap</span>
                    <span>{resumeData.sectionSpacing}px</span>
                  </div>
                  <input 
                    type="range" 
                    min="10" max="60" step="2"
                    value={resumeData.sectionSpacing}
                    onChange={(e) => setResumeData({...resumeData, sectionSpacing: parseInt(e.target.value)})}
                    className="w-full lg:w-24 h-1.5 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                </div>
             </div>
          </div>

          <div className="font-sans font-bold text-gray-500 absolute top-4 left-6 text-[10px] lg:text-xs uppercase tracking-widest flex items-center gap-2">
            <div className="w-1.5 h-1.5 lg:w-2 h-2 rounded-full bg-green-500 animate-pulse"></div> Live Preview
          </div>
          
          {/* Scaled A4 PDF Wrapper */}
          <div className="shadow-2xl rounded-sm transform origin-top shrink-0 scale-[0.35] sm:scale-[0.5] md:scale-[0.7] lg:scale-100">
            <div 
              ref={resumeRef}
              className={`bg-white ${isExportMode ? 'pdf-export-mode' : ''}`}
              style={{ 
                width: '210mm', 
                minHeight: isExportMode ? 'auto' : '297mm', // Allow height to shrink/grow in export mode
                padding: '15mm 15mm', // Slightly reduced padding for more content space
                fontFamily: resumeData.fontFamily
              }}
            >
               
               {/* Dynamic Template Component */}
               <div 
                 style={{ 
                   lineHeight: resumeData.lineSpacing,
                   '--section-spacing': `${resumeData.sectionSpacing}px` 
                 }}
                 className="template-container relative"
               >
                  <ActiveTemplate resumeData={resumeData} />
               </div>

            </div>
          </div>
        </div>

      </main>

      {/* Mobile Mode Toggle Bottom Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 p-2 flex gap-2 z-50">
        <button 
          onClick={() => setMobileMode('edit')}
          className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${mobileMode === 'edit' ? 'bg-black text-white shadow-lg' : 'bg-gray-100 text-gray-500'}`}
        >
          <Edit3 className="w-4 h-4" /> Edit
        </button>
        <button 
          onClick={() => setMobileMode('preview')}
          className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${mobileMode === 'preview' ? 'bg-black text-white shadow-lg' : 'bg-gray-100 text-gray-500'}`}
        >
          <LayoutTemplate className="w-4 h-4" /> Preview
        </button>
      </div>

      {showDownloadSuccess && (
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-24 right-8 z-[100] bg-emerald-600 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 border border-emerald-500"
        >
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-sm">Download Success!</h4>
            <p className="text-xs text-white/80">Your professional resume is ready.</p>
          </div>
          <button onClick={() => setShowDownloadSuccess(false)} className="ml-4 hover:opacity-70">
            <Plus className="w-4 h-4 rotate-45" />
          </button>
        </motion.div>
      )}

      {showCropper && (
        <ImageCropper 
          image={imageToCrop} 
          onCropComplete={onCropComplete} 
          onCancel={() => {
            setShowCropper(false);
            setImageToCrop(null);
          }} 
        />
      )}
    </div>
  );
};

export default Builder;
