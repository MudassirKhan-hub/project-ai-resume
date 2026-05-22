import React from 'react';
import { Phone, Mail, MapPin, Link as LinkIcon, GitBranch, Globe } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

const AcademicTemplate = ({ resumeData }) => {
  return (
    <div className="font-serif text-black max-w-[210mm] mx-auto bg-white text-[11pt]">
      {/* Header */}
      <div className="flex justify-between items-start border-b-2 mb-6 pb-4" style={{ borderBottomColor: resumeData.themeColor }}>
        <div className="flex-1">
          <h1 className="text-[20pt] font-bold uppercase tracking-widest leading-none mb-2" style={{ color: resumeData.themeColor }}>
            {resumeData.personalInfo.firstName} {resumeData.personalInfo.lastName}
          </h1>
          <div className="text-[10pt] mt-1 flex gap-4 flex-wrap text-gray-700 font-medium">
            {resumeData.personalInfo.email && <span className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5"/>{resumeData.personalInfo.email}</span>}
            {resumeData.personalInfo.phone && <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5"/>{resumeData.personalInfo.phone}</span>}
            {resumeData.personalInfo.location && <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5"/>{resumeData.personalInfo.location}</span>}
          </div>
        </div>
        {resumeData.profileImage && (
          <div className="ml-6 shrink-0">
            <img 
              src={resumeData.profileImage} 
              alt="Profile" 
              className="w-28 h-28 rounded-full object-cover border-2 shadow-sm"
              style={{ borderColor: resumeData.themeColor }}
            />
          </div>
        )}
      </div>

      <div className="mb-5">
        <h2 className="text-[11pt] font-bold uppercase border-b-2 mb-2 pb-0.5" style={{ borderBottomColor: resumeData.themeColor, color: resumeData.themeColor }}>Summary</h2>
        <p className="text-[10pt] leading-relaxed text-justify text-gray-800">
          {resumeData.summary}
        </p>
      </div>

      <div className="mb-5">
        <h2 className="text-[11pt] font-bold uppercase border-b-2 mb-2 pb-0.5" style={{ borderBottomColor: resumeData.themeColor, color: resumeData.themeColor }}>Education</h2>
        <div className="space-y-3">
          {resumeData.education.map(edu => (
            <div key={edu.id} className="text-[10pt] education-item">
              <div className="flex justify-between font-bold text-gray-900">
                <span>{edu.school}</span>
                <span>{edu.startDate} – {edu.endDate}</span>
              </div>
              <div className="flex justify-between italic text-gray-700">
                <span>{edu.degree}</span>
                {edu.grade && <span>Grade: {edu.grade}</span>}
              </div>
            </div>
          ))}
        </div>
      </div>

      {resumeData.experience.length > 0 && (
      <div className="mb-5">
        <h2 className="text-[11pt] font-bold uppercase border-b-2 mb-2 pb-0.5" style={{ borderBottomColor: resumeData.themeColor, color: resumeData.themeColor }}>Experience</h2>
        <div className="space-y-4">
          {resumeData.experience.map(exp => (
            <div key={exp.id} className="text-[10pt] experience-item">
              <div className="flex justify-between font-bold text-gray-900">
                <span>{exp.title}</span>
                <span>{exp.startDate} – {exp.endDate}</span>
              </div>
              <div className="italic mb-1.5 font-medium text-gray-700 flex justify-between">
                <span>{exp.company}</span>
                {exp.location && <span className="text-[9pt] font-normal not-italic text-gray-400">{exp.location}</span>}
              </div>
              <ul className="list-disc list-outside ml-5 text-[10pt] leading-relaxed space-y-1 text-gray-800">
                {exp.description && exp.description.split('\n').map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      )}

      {resumeData.projects.length > 0 && (
        <div className="mb-5">
          <h2 className="text-[11pt] font-bold uppercase border-b-2 mb-2 pb-0.5" style={{ borderBottomColor: resumeData.themeColor, color: resumeData.themeColor }}>Projects</h2>
          <div className="space-y-3">
            {resumeData.projects.map(proj => (
              <div key={proj.id} className="text-[10pt] project-item">
                <div className="font-bold text-gray-900">{proj.title}</div>
                <p className="leading-relaxed text-gray-800">{proj.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {resumeData.skills && (
        <div className="mb-5">
          <h2 className="text-[11pt] font-bold uppercase border-b-2 mb-2 pb-0.5" style={{ borderBottomColor: resumeData.themeColor, color: resumeData.themeColor }}>Skills & Expertise</h2>
          <div className="text-[10pt] leading-relaxed text-gray-800">
            {typeof resumeData.skills === 'string' ? resumeData.skills : ''}
          </div>
        </div>
      )}

      {resumeData.certifications?.length > 0 && (
        <div className="mb-5">
          <h2 className="text-[11pt] font-bold uppercase border-b-2 mb-2 pb-0.5" style={{ borderBottomColor: resumeData.themeColor, color: resumeData.themeColor }}>Certifications</h2>
          <div className="space-y-2">
            {resumeData.certifications.map((cert, index) => (
              <div key={index} className="flex justify-between text-[10pt] certification-item">
                <div>
                  <span className="font-bold text-gray-900">{cert.name}</span>
                  <span className="text-gray-700">, {cert.issuer}</span>
                </div>
                <span className="text-gray-600 italic">{cert.date}</span>
              </div>
            ))}
          </div>
        </div>
      )}



      {resumeData.references?.length > 0 && (
        <div className="mb-5">
          <h2 className="text-[11pt] font-bold uppercase border-b-2 mb-2 pb-0.5" style={{ borderBottomColor: resumeData.themeColor, color: resumeData.themeColor }}>References</h2>
          <div className="grid grid-cols-2 gap-6">
            {resumeData.references.map((ref, index) => (
              <div key={index} className="text-[10pt] reference-item">
                <div className="font-bold text-gray-900">{ref.name}</div>
                <div className="text-gray-700 italic">{ref.title}, {ref.company}</div>
                <div className="text-gray-600 font-medium">{ref.contact}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {resumeData.languages?.length > 0 && (
        <div className="mb-5">
          <h2 className="text-[11pt] font-bold uppercase border-b-2 mb-2 pb-0.5" style={{ borderBottomColor: resumeData.themeColor, color: resumeData.themeColor }}>Languages</h2>
          <div className="text-[10pt] leading-relaxed flex flex-wrap gap-x-8 gap-y-1">
            {resumeData.languages.map(lang => (
              <div key={lang.id}>
                <span className="font-bold text-gray-900">{lang.name}:</span> <span className="text-gray-700">{lang.proficiency}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Footer Social Links */}
      {(resumeData.socialLinks?.linkedin || resumeData.socialLinks?.github || resumeData.socialLinks?.portfolio || (resumeData.showQrCode && resumeData.qrCodeUrl)) && (
        <div className="mt-10 pt-4 border-t border-gray-200 flex justify-between items-start gap-6">
          <div className="flex-1 flex flex-col gap-3">
            <div className="text-[10pt] font-bold uppercase tracking-wider" style={{ color: resumeData.themeColor }}>Contact & Portfolio:</div>
            <div className="flex flex-wrap gap-x-10 gap-y-2 text-[9.5pt] font-medium text-gray-600">
              {resumeData.socialLinks?.linkedin && (
                <a href={resumeData.socialLinks.linkedin.startsWith('http') ? resumeData.socialLinks.linkedin : `https://linkedin.com/in/${resumeData.socialLinks.linkedin}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-blue-600">
                  <LinkIcon className="w-3.5 h-3.5" /> LinkedIn
                </a>
              )}
              {resumeData.socialLinks?.github && (
                <a href={resumeData.socialLinks.github.startsWith('http') ? resumeData.socialLinks.github : `https://github.com/${resumeData.socialLinks.github}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-black">
                  <GitBranch className="w-3.5 h-3.5" /> GitHub
                </a>
              )}
              {resumeData.socialLinks?.portfolio && (
                <a href={resumeData.socialLinks.portfolio.startsWith('http') ? resumeData.socialLinks.portfolio : `https://${resumeData.socialLinks.portfolio}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-indigo-600">
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
    </div>
  );
};

export default AcademicTemplate;
