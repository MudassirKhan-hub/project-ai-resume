import React from 'react';
import { Phone, Mail, MapPin, Link as LinkIcon, GitBranch, Globe } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

const CreativeTemplate = ({ resumeData }) => {
  return (
    <div className="flex gap-8 h-full">
      {/* Sidebar Col */}
      <div className="w-1/3 rounded-3xl p-6 text-white" style={{ backgroundColor: resumeData.themeColor }}>
        {resumeData.profileImage && (
          <div className="mb-6 flex justify-center">
            <img 
              src={resumeData.profileImage} 
              alt="Profile" 
              className="w-full aspect-square rounded-2xl object-cover border-4 border-white/20 shadow-lg"
            />
          </div>
        )}
        <div className="font-bold text-[2rem] leading-none tracking-tight mb-2 uppercase break-words">
          {resumeData.personalInfo.firstName} <br /> <span className="font-light">{resumeData.personalInfo.lastName}</span>
        </div>
        <div className="text-white/80 text-[11pt] uppercase tracking-wider mb-8 font-medium">
          {resumeData.personalInfo.title}
        </div>

        <div className="space-y-4 text-[9pt]">
          {resumeData.personalInfo.email && (
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-white/70" />
              <span className="break-all">{resumeData.personalInfo.email}</span>
            </div>
          )}
          {resumeData.personalInfo.phone && (
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-white/70" />
              <span>{resumeData.personalInfo.phone}</span>
            </div>
          )}
          {resumeData.personalInfo.location && (
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-white/70" />
              <span>{resumeData.personalInfo.location}</span>
            </div>
          )}
        </div>

        <div className="mt-10">
          <h3 className="text-[11pt] font-bold uppercase tracking-widest border-b border-white/20 pb-2 mb-4">Skills</h3>
          <div className="flex flex-wrap gap-2 text-[9pt]">
            {resumeData.skills && resumeData.skills.split(',').map((skill, i) => skill.trim() && (
              <span key={i} className="bg-white/10 px-2.5 py-1 rounded-md">{skill.trim()}</span>
            ))}
          </div>
        </div>

        <div className="mt-10">
          <h3 className="text-[11pt] font-bold uppercase tracking-widest border-b border-white/20 pb-2 mb-4">Education</h3>
          <div className="space-y-4">
            {resumeData.education.map(edu => (
              <div key={edu.id} className="education-item">
                <div className="font-bold text-[10pt]">{edu.degree}</div>
                <div className="text-white/80 text-[9pt]">{edu.school}</div>
                <div className="text-white/60 text-[8pt] mt-0.5">{edu.startDate} - {edu.endDate} {edu.grade ? `| ${edu.grade}` : ''}</div>
              </div>
            ))}
          </div>
        </div>

        {resumeData.languages?.length > 0 && (
          <div className="mt-10">
            <h3 className="text-[11pt] font-bold uppercase tracking-widest border-b border-white/20 pb-2 mb-4">Languages</h3>
            <div className="space-y-2">
              {resumeData.languages.map(lang => (
                <div key={lang.id} className="grid grid-cols-2 gap-2 items-start language-item">
                  <div className="font-bold text-[9pt]">{lang.name}</div>
                  <div className="text-white/70 text-[8pt] uppercase tracking-wider">{lang.proficiency}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Social Links */}
        {(resumeData.socialLinks?.linkedin || resumeData.socialLinks?.github || resumeData.socialLinks?.portfolio || (resumeData.showQrCode && resumeData.qrCodeUrl)) && (
          <div className="mt-10">
            <h3 className="text-[11pt] font-bold uppercase tracking-widest border-b border-white/20 pb-2 mb-4">Social</h3>
            <div className="space-y-3 text-[9pt]">
              {resumeData.socialLinks?.linkedin && (
                <a href={resumeData.socialLinks.linkedin.startsWith('http') ? resumeData.socialLinks.linkedin : `https://linkedin.com/in/${resumeData.socialLinks.linkedin}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white/100 text-white/80 transition-colors">
                  <LinkIcon className="w-4 h-4" /> LinkedIn
                </a>
              )}
              {resumeData.socialLinks?.github && (
                <a href={resumeData.socialLinks.github.startsWith('http') ? resumeData.socialLinks.github : `https://github.com/${resumeData.socialLinks.github}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white/100 text-white/80 transition-colors">
                  <GitBranch className="w-4 h-4" /> GitHub
                </a>
              )}
              {resumeData.socialLinks?.portfolio && (
                <a href={resumeData.socialLinks.portfolio.startsWith('http') ? resumeData.socialLinks.portfolio : `https://${resumeData.socialLinks.portfolio}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white/100 text-white/80 transition-colors">
                  <Globe className="w-4 h-4" /> Portfolio
                </a>
              )}
            </div>
            {resumeData.showQrCode && resumeData.qrCodeUrl && (
              <div className="mt-6 flex flex-col items-center gap-1.5 p-2 bg-white/10 border border-white/15 rounded-xl shadow-sm w-full">
                <QRCodeSVG 
                  value={resumeData.qrCodeUrl} 
                  size={55}
                  fgColor="#ffffff"
                  bgColor={resumeData.themeColor || "#000000"}
                  level="L"
                  includeMargin={false}
                />
                <span className="text-[6.5px] font-black uppercase tracking-tighter text-white/60">Scan Profile</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Main Col */}
      <div className="w-2/3 py-4">
        <div className="mb-8">
          <h3 className="text-[14pt] font-black uppercase tracking-widest mb-3 flex items-center gap-2" style={{ color: resumeData.themeColor }}>
            Profile
          </h3>
          <p className="text-[10pt] text-gray-700 leading-relaxed text-justify">
            {resumeData.summary}
          </p>
        </div>

        {resumeData.experience.length > 0 && (
        <div className="mb-8">
          <h3 className="text-[14pt] font-black uppercase tracking-widest mb-4 flex items-center gap-2" style={{ color: resumeData.themeColor }}>
            Experience
          </h3>
          <div className="space-y-5">
            {resumeData.experience.map(exp => (
              <div key={exp.id} className="relative pl-4 border-l-2 experience-item" style={{ borderColor: resumeData.themeColor }}>
                <div className="absolute w-2.5 h-2.5 rounded-full -left-[6px] top-1.5" style={{ backgroundColor: resumeData.themeColor }}></div>
                <div className="flex justify-between items-baseline mb-0.5">
                  <h4 className="text-[11pt] font-bold text-gray-900">{exp.title}</h4>
                  <span className="text-[9pt] font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded-md">{exp.startDate} - {exp.endDate}</span>
                </div>
                <div className="text-[10pt] font-medium text-gray-600 mb-2 uppercase tracking-wide flex justify-between items-center">
                  <span>{exp.company}</span>
                  {exp.location && <span className="text-[8.5pt] font-normal lowercase tracking-normal text-gray-400 italic">{exp.location}</span>}
                </div>
                <ul className="list-disc list-outside ml-4 text-[9.5pt] text-gray-700 leading-relaxed space-y-1">
                  {exp.description && exp.description.split('\n').map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        )}

        <div>
          <h3 className="text-[14pt] font-black uppercase tracking-widest mb-4 flex items-center gap-2" style={{ color: resumeData.themeColor }}>
            Projects
          </h3>
          <div className="space-y-4">
            {resumeData.projects.map(proj => (
              <div key={proj.id} className="bg-gray-50 p-4 rounded-xl border border-gray-100 project-item">
                <h4 className="text-[11pt] font-bold text-gray-900 mb-1">{proj.title}</h4>
                <p className="text-[9.5pt] text-gray-700 leading-relaxed">{proj.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreativeTemplate;
