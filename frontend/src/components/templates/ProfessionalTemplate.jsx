import React from 'react';
import { Phone, Mail, MapPin, Link as LinkIcon, GitBranch, Globe } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

const ProfessionalTemplate = ({ resumeData }) => {
  return (
    <>
      <div className="text-center border-b-4 pb-6 mb-6 flex flex-col items-center" style={{ borderColor: resumeData.themeColor }}>
        {resumeData.profileImage && (
          <div className="mb-4">
            <img 
              src={resumeData.profileImage} 
              alt="Profile" 
              className="w-40 h-40 rounded-full object-cover border-2 shadow-sm"
              style={{ borderColor: resumeData.themeColor }}
            />
          </div>
        )}
        <h1 className="text-4xl font-serif text-gray-900 uppercase tracking-widest mb-2" style={{ color: resumeData.themeColor }}>
          {resumeData.personalInfo.firstName} {resumeData.personalInfo.lastName}
        </h1>
        <p className="text-lg font-medium text-gray-700 uppercase tracking-widest mb-3">{resumeData.personalInfo.title}</p>
        <div className="text-sm text-gray-600 flex justify-center items-center gap-4 flex-wrap">
            {resumeData.personalInfo.email && <span className="flex items-center gap-2"><Mail className="w-3.5 h-3.5 shrink-0" style={{ color: resumeData.themeColor, transform: 'translateY(-0.5px)' }}/>{resumeData.personalInfo.email}</span>}
          {(resumeData.personalInfo.email && resumeData.personalInfo.phone) && <span className="text-gray-300">|</span>}
            {resumeData.personalInfo.phone && <span className="flex items-center gap-2"><Phone className="w-3.5 h-3.5 shrink-0" style={{ color: resumeData.themeColor, transform: 'translateY(-0.5px)' }}/>{resumeData.personalInfo.phone}</span>}
          {((resumeData.personalInfo.email || resumeData.personalInfo.phone) && resumeData.personalInfo.location) && <span className="text-gray-300">|</span>}
            {resumeData.personalInfo.location && <span className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5 shrink-0" style={{ color: resumeData.themeColor, transform: 'translateY(-0.5px)' }}/>{resumeData.personalInfo.location}</span>}
        </div>
        
        {/* Social links moved to bottom */}
      </div>
      
      <div className="mb-6">
        <h2 className="text-md font-bold uppercase tracking-wider mb-2 border-b border-gray-300 pb-1 w-full" style={{ color: resumeData.themeColor }}>
          Professional Summary
        </h2>
        <p className="text-[10pt] text-gray-800 leading-relaxed text-justify">
          {resumeData.summary}
        </p>
      </div>

      <div className="space-y-6">
        {resumeData.experience.length > 0 && (
        <div>
          <h2 className="text-md font-bold uppercase tracking-wider mb-3 border-b border-gray-300 pb-1 w-full" style={{ color: resumeData.themeColor }}>
            Work Experience
          </h2>
          {resumeData.experience.map(exp => (
            <div key={exp.id} className="mb-4 experience-item">
              <div className="flex justify-between items-end mb-1">
                <h3 className="text-[11pt] font-bold text-gray-900">{exp.title}</h3>
                <span className="text-[10pt] font-medium" style={{ color: resumeData.themeColor }}>
                  {exp.startDate} {exp.startDate && exp.endDate && '- '} {exp.endDate}
                </span>
              </div>
              <h4 className="text-[10pt] text-gray-700 font-medium italic mb-2">
                {exp.company}
                {exp.location && <span className="text-gray-400 font-normal not-italic ml-2">| {exp.location}</span>}
              </h4>
              <ul className="list-disc list-outside ml-4 text-[10pt] text-gray-800 leading-relaxed space-y-1">
                {exp.description && exp.description.split('\n').map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        )}

        {resumeData.education.length > 0 && (
        <div>
          <h2 className="text-md font-bold uppercase tracking-wider mb-3 border-b border-gray-300 pb-1 w-full" style={{ color: resumeData.themeColor }}>
            Education
          </h2>
          {resumeData.education.map(edu => (
            <div key={edu.id} className="mb-3 education-item">
              <div className="flex justify-between items-end">
                <h3 className="text-[11pt] font-bold text-gray-900">
                  {edu.degree}
                  {edu.grade ? <span className="text-[10pt] font-normal text-gray-600 ml-2">GPA/Grade: {edu.grade}</span> : null}
                </h3>
                <span className="text-[10pt] font-medium" style={{ color: resumeData.themeColor }}>
                  {edu.startDate} {edu.startDate && edu.endDate && '- '} {edu.endDate}
                </span>
              </div>
              <p className="text-[10pt] text-gray-700 italic">{edu.school}</p>
            </div>
          ))}
        </div>
        )}

        {resumeData.projects.length > 0 && (
        <div>
          <h2 className="text-md font-bold uppercase tracking-wider mb-3 border-b border-gray-300 pb-1 w-full" style={{ color: resumeData.themeColor }}>
            Projects
          </h2>
          {resumeData.projects.map(proj => (
            <div key={proj.id} className="mb-3 project-item">
              <h3 className="text-[10.5pt] font-bold text-gray-900 mb-1">{proj.title}</h3>
              <p className="text-[10pt] text-gray-800 leading-relaxed text-justify">{proj.description}</p>
            </div>
          ))}
        </div>
        )}

        {resumeData.skills && (
        <div>
          <h2 className="text-md font-bold uppercase tracking-wider mb-3 border-b border-gray-300 pb-1 w-full" style={{ color: resumeData.themeColor }}>
            Skills & Expertise
          </h2>
          <div className="text-[10pt] text-gray-800 leading-relaxed">
            {resumeData.skills}
          </div>
        </div>
        )}

        {resumeData.languages?.length > 0 && (
        <div>
          <h2 className="text-md font-bold uppercase tracking-wider mb-3 border-b border-gray-300 pb-1 w-full" style={{ color: resumeData.themeColor }}>
            Languages
          </h2>
          <div className="text-[10pt] text-gray-800 leading-relaxed flex flex-wrap gap-x-6 gap-y-2">
            {resumeData.languages.map(lang => (
              <div key={lang.id} className="flex items-center gap-2">
                <span className="font-bold">{lang.name}</span>
                <span className="text-gray-500 italic text-[9.5pt]">({lang.proficiency})</span>
              </div>
            ))}
          </div>
        </div>
        )}
      </div>

      {/* Footer Social Links */}
      {(resumeData.socialLinks?.linkedin || resumeData.socialLinks?.github || resumeData.socialLinks?.portfolio || (resumeData.showQrCode && resumeData.qrCodeUrl)) && (
        <div className="mt-8 pt-6 border-t-2 border-gray-100 flex justify-between items-start gap-6">
          <div className="flex-1 flex flex-col gap-4">
            <div className="border-b border-gray-300 pb-1">
              <span className="text-[11pt] font-bold uppercase tracking-wider" style={{ color: resumeData.themeColor }}>You can also contact me on:</span>
            </div>
            <div className="flex flex-wrap gap-x-10 gap-y-2 text-[9.5pt] uppercase tracking-widest font-bold text-gray-500">
            {resumeData.socialLinks?.linkedin && (
              <a 
                href={resumeData.socialLinks.linkedin.startsWith('http') ? resumeData.socialLinks.linkedin : `https://linkedin.com/in/${resumeData.socialLinks.linkedin}`}
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-[#0077b5] transition-colors"
              >
                <LinkIcon className="w-3.5 h-3.5" /> LinkedIn
              </a>
            )}
            {resumeData.socialLinks?.github && (
              <a 
                href={resumeData.socialLinks.github.startsWith('http') ? resumeData.socialLinks.github : `https://github.com/${resumeData.socialLinks.github}`}
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-black transition-colors"
              >
                <GitBranch className="w-3.5 h-3.5" /> GitHub
              </a>
            )}
            {resumeData.socialLinks?.portfolio && (
              <a 
                href={resumeData.socialLinks.portfolio.startsWith('http') ? resumeData.socialLinks.portfolio : `https://${resumeData.socialLinks.portfolio}`}
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-indigo-600 transition-colors"
              >
                <Globe className="w-3.5 h-3.5" /> Portfolio
              </a>
            )}
            </div>
          </div>
          {resumeData.showQrCode && resumeData.qrCodeUrl && (
            <div className="shrink-0 flex flex-col items-center gap-1 p-1 bg-white border border-gray-200 shadow-sm rounded-lg">
              <QRCodeSVG 
                value={resumeData.qrCodeUrl} 
                size={55}
                fgColor="#000000"
                bgColor="#ffffff"
                level="L"
                includeMargin={false}
              />
              <span className="text-[6.5px] font-black uppercase tracking-tighter text-gray-400">Scan Profile</span>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ProfessionalTemplate;

