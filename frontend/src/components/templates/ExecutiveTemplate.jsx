import React from 'react';
import { Phone, Mail, MapPin, Link as LinkIcon, GitBranch, Globe } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

const ExecutiveTemplate = ({ resumeData }) => {
  return (
    <div className="font-serif text-gray-900">
      {/* Header */}
      <div className="text-center mb-6">
        {resumeData.profileImage && (
          <div className="mb-4 flex justify-center">
            <img 
              src={resumeData.profileImage} 
              alt="Profile" 
              className="w-36 h-36 rounded-full object-cover border-4 shadow-xl"
              style={{ borderColor: resumeData.themeColor }}
            />
          </div>
        )}
        <h1 className="text-[3.5rem] font-extrabold uppercase tracking-tight leading-none mb-1 text-gray-900">
          {resumeData.personalInfo.firstName} {resumeData.personalInfo.lastName}
        </h1>
        <h2 className="text-[1.4rem] font-bold tracking-[0.2em] uppercase mb-4" style={{ color: resumeData.themeColor }}>
          {resumeData.personalInfo.title}
        </h2>
        <div className="flex justify-center flex-wrap gap-x-8 gap-y-2 text-[10.5pt] font-medium text-gray-700">
          {resumeData.personalInfo.email && <div className="flex items-center gap-2"><Mail className="w-4 h-4" />{resumeData.personalInfo.email}</div>}
          {resumeData.personalInfo.phone && <div className="flex items-center gap-2"><Phone className="w-4 h-4" />{resumeData.personalInfo.phone}</div>}
          {resumeData.personalInfo.location && <div className="flex items-center gap-2"><MapPin className="w-4 h-4" />{resumeData.personalInfo.location}</div>}
        </div>
      </div>

      <div className="border-t-[4px] border-b-[1px] border-gray-900 py-5 mb-8">
        <p className="text-[11pt] leading-relaxed text-justify text-gray-800 font-medium">
          {resumeData.summary}
        </p>
      </div>

      <div className="grid grid-cols-12 gap-10">
        <div className="col-span-8 space-y-8">
          <div>
            <h3 className="text-[13pt] font-black uppercase tracking-widest border-b-2 pb-1 mb-4" style={{ color: resumeData.themeColor, borderColor: resumeData.themeColor }}>Professional Experience</h3>
            <div className="space-y-6">
              {resumeData.experience.map(exp => (
                <div key={exp.id} className="experience-item">
                  <div className="flex justify-between items-baseline mb-1">
                    <h4 className="text-[12pt] font-bold text-gray-900">{exp.title}</h4>
                    <span className="text-[10pt] font-bold text-gray-600 uppercase tracking-wider">{exp.startDate} – {exp.endDate}</span>
                  </div>
                  <div className="text-[10.5pt] font-bold text-gray-700 italic mb-2 flex justify-between items-center" style={{ color: resumeData.themeColor }}>
                    <span>{exp.company}</span>
                    {exp.location && <span className="text-[9.5pt] font-medium text-gray-400 not-italic">{exp.location}</span>}
                  </div>
                  <ul className="list-disc list-outside ml-5 text-[10.5pt] text-gray-800 leading-relaxed text-justify space-y-1.5">
                    {exp.description && exp.description.split('\n').map((point, i) => (
                      <li key={i}>{point}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {resumeData.projects.length > 0 && (
          <div>
            <h3 className="text-[13pt] font-black uppercase tracking-widest border-b-2 pb-1 mb-4" style={{ color: resumeData.themeColor, borderColor: resumeData.themeColor }}>Notable Projects</h3>
            <div className="space-y-4">
              {resumeData.projects.map(proj => (
                <div key={proj.id} className="project-item">
                  <h4 className="text-[11pt] font-bold text-gray-900 mb-1">{proj.title}</h4>
                  <p className="text-[10.5pt] text-gray-800 leading-relaxed text-justify">{proj.description}</p>
                </div>
              ))}
            </div>
          </div>
          )}
        </div>

        <div className="col-span-4 space-y-8">
          <div>
            <h3 className="text-[13pt] font-black uppercase tracking-widest border-b-2 pb-1 mb-4" style={{ color: resumeData.themeColor, borderColor: resumeData.themeColor }}>Education</h3>
            <div className="space-y-4">
              {resumeData.education.map(edu => (
                <div key={edu.id} className="education-item">
                  <h4 className="text-[11pt] font-bold text-gray-900 leading-tight">{edu.degree}</h4>
                  <div className="text-[10.5pt] text-gray-700 mt-0.5">{edu.school}</div>
                  <div className="text-[9.5pt] font-bold mt-1" style={{ color: resumeData.themeColor }}>{edu.startDate} – {edu.endDate}</div>
                  {edu.grade && <div className="text-[9.5pt] text-gray-600 font-medium">Grade: {edu.grade}</div>}
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-[13pt] font-black uppercase tracking-widest border-b-2 pb-1 mb-4" style={{ color: resumeData.themeColor, borderColor: resumeData.themeColor }}>Core Competencies</h3>
            <ul className="list-disc list-inside text-[10.5pt] text-gray-800 space-y-2">
              {resumeData.skills && resumeData.skills.split(',').map((skill, i) => skill.trim() && (
                <li key={i}>{skill.trim()}</li>
              ))}
            </ul>
          </div>

          {resumeData.languages?.length > 0 && (
            <div>
              <h3 className="text-[13pt] font-black uppercase tracking-widest border-b-2 pb-1 mb-4" style={{ color: resumeData.themeColor, borderColor: resumeData.themeColor }}>Languages</h3>
              <ul className="text-[10.5pt] text-gray-800 space-y-2">
                {resumeData.languages.map(lang => (
                  <li key={lang.id} className="flex justify-between items-start gap-2 border-b border-gray-100 pb-1 language-item">
                    <span className="font-bold">{lang.name}</span>
                    <span className="text-gray-600 italic text-[10pt]">{lang.proficiency}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Footer Social Links */}
      {(resumeData.socialLinks?.linkedin || resumeData.socialLinks?.github || resumeData.socialLinks?.portfolio || (resumeData.showQrCode && resumeData.qrCodeUrl)) && (
        <div className="mt-12 pt-6 border-t-[3px] border-gray-900 flex justify-between items-start gap-6">
          <div className="flex-1 flex flex-col gap-4">
            <div className="text-[11pt] font-black uppercase tracking-[0.2em]" style={{ color: resumeData.themeColor }}>Executive Network:</div>
            <div className="flex flex-wrap gap-x-12 gap-y-2 text-[10pt] font-bold text-gray-700">
              {resumeData.socialLinks?.linkedin && (
                <a href={resumeData.socialLinks.linkedin.startsWith('http') ? resumeData.socialLinks.linkedin : `https://linkedin.com/in/${resumeData.socialLinks.linkedin}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-blue-700 uppercase tracking-widest transition-colors">
                  <LinkIcon className="w-4 h-4" /> LinkedIn
                </a>
              )}
              {resumeData.socialLinks?.github && (
                <a href={resumeData.socialLinks.github.startsWith('http') ? resumeData.socialLinks.github : `https://github.com/${resumeData.socialLinks.github}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-black uppercase tracking-widest transition-colors">
                  <GitBranch className="w-4 h-4" /> GitHub
                </a>
              )}
              {resumeData.socialLinks?.portfolio && (
                <a href={resumeData.socialLinks.portfolio.startsWith('http') ? resumeData.socialLinks.portfolio : `https://${resumeData.socialLinks.portfolio}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-indigo-700 uppercase tracking-widest transition-colors">
                  <Globe className="w-4 h-4" /> Portfolio
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

export default ExecutiveTemplate;
