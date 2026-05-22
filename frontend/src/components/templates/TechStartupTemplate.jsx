import React from 'react';
import { Phone, Mail, MapPin, Link as LinkIcon, GitBranch, Globe } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

const TechStartupTemplate = ({ resumeData }) => {
  return (
    <div className="font-sans text-gray-800 bg-white">
      {/* Header */}
      <div className="flex items-center justify-between border-b-4 pb-6 mb-8" style={{ borderColor: resumeData.themeColor }}>
        <div className="flex flex-col gap-3">
          <div>
            <h1 className="text-[3.2rem] font-black tracking-tighter leading-none text-gray-900 mb-1">
              {resumeData.personalInfo.firstName} {resumeData.personalInfo.lastName}
            </h1>
            <p className="text-[1.3rem] font-bold uppercase tracking-wider" style={{ color: resumeData.themeColor }}>
              {resumeData.personalInfo.title}
            </p>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-1 text-[9.5pt] font-bold text-gray-500">
            {resumeData.personalInfo.email && <div className="flex items-center gap-2"><Mail className="w-4 h-4" style={{ color: resumeData.themeColor }}/> {resumeData.personalInfo.email}</div>}
            {resumeData.personalInfo.phone && <div className="flex items-center gap-2"><Phone className="w-4 h-4" style={{ color: resumeData.themeColor }}/> {resumeData.personalInfo.phone}</div>}
            {resumeData.personalInfo.location && <div className="flex items-center gap-2"><MapPin className="w-4 h-4" style={{ color: resumeData.themeColor }}/> {resumeData.personalInfo.location}</div>}
          </div>
        </div>
        {resumeData.profileImage && (
          <div className="shrink-0 ml-6">
            <img 
              src={resumeData.profileImage} 
              alt="Profile" 
              className="w-28 h-28 rounded-2xl object-cover shadow-lg border-2"
              style={{ borderColor: resumeData.themeColor }}
            />
          </div>
        )}
      </div>

      <div className="grid grid-cols-3 gap-10">
        <div className="col-span-2 space-y-10">
          {/* Summary */}
          <div>
            <h2 className="text-[12pt] font-black uppercase tracking-widest mb-4 flex items-center gap-3" style={{ color: resumeData.themeColor }}>
              <span className="w-3 h-3 rotate-45" style={{ backgroundColor: resumeData.themeColor }}></span> Summary
            </h2>
            <p className="text-[10.5pt] leading-relaxed text-gray-700 text-justify">
              {resumeData.summary}
            </p>
          </div>

          {/* Experience */}
          {resumeData.experience.length > 0 && (
          <div>
            <h2 className="text-[12pt] font-black uppercase tracking-widest mb-5 flex items-center gap-3" style={{ color: resumeData.themeColor }}>
              <span className="w-3 h-3 rotate-45" style={{ backgroundColor: resumeData.themeColor }}></span> Experience
            </h2>
            <div className="space-y-8">
              {resumeData.experience.map(exp => (
                <div key={exp.id} className="relative pl-6 border-l-2 border-gray-100 experience-item">
                  <div className="absolute w-3 h-3 -left-[7px] top-1.5 rotate-45 border-2 border-white" style={{ backgroundColor: resumeData.themeColor }}></div>
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="text-[12pt] font-bold text-gray-900">{exp.title}</h3>
                    <span className="text-[9.5pt] font-black text-gray-400 uppercase">{exp.startDate} — {exp.endDate}</span>
                  </div>
                  <h4 className="text-[10.5pt] font-black mb-3 uppercase tracking-wide flex justify-between items-center" style={{ color: resumeData.themeColor }}>
                    <span>{exp.company}</span>
                    {exp.location && <span className="text-[9pt] font-bold text-gray-400 normal-case tracking-tight">{exp.location}</span>}
                  </h4>
                  <ul className="list-disc list-outside ml-4 text-[10pt] text-gray-700 leading-relaxed space-y-2">
                    {exp.description && exp.description.split('\n').map((point, i) => (
                      <li key={i}>{point}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          )}
          
          {/* Projects */}
          {resumeData.projects.length > 0 && (
          <div>
            <h2 className="text-[12pt] font-black uppercase tracking-widest mb-5 flex items-center gap-3" style={{ color: resumeData.themeColor }}>
              <span className="w-3 h-3 rotate-45" style={{ backgroundColor: resumeData.themeColor }}></span> Projects
            </h2>
            <div className="grid grid-cols-2 gap-6">
              {resumeData.projects.map(proj => (
                <div key={proj.id} className="border-2 border-gray-50 p-5 rounded-2xl bg-gray-50/50 hover:bg-white hover:border-gray-200 transition-all hover:shadow-md project-item">
                  <h3 className="text-[11pt] font-bold text-gray-900 mb-2">{proj.title}</h3>
                  <p className="text-[9.5pt] text-gray-600 leading-relaxed">{proj.description}</p>
                </div>
              ))}
            </div>
          </div>
          )}
        </div>

        <div className="col-span-1 space-y-10 bg-gray-50/80 p-8 rounded-[2.5rem] border-2 border-gray-100/50">
          {/* Skills */}
          <div>
            <h2 className="text-[12pt] font-black uppercase tracking-widest mb-5 flex items-center gap-3" style={{ color: resumeData.themeColor }}>
              <span className="w-3 h-3 rotate-45" style={{ backgroundColor: resumeData.themeColor }}></span> Skills
            </h2>
            <div className="flex flex-wrap gap-2.5">
              {Array.isArray(resumeData.skills) ? (
                resumeData.skills.map((skillGroup, index) => (
                  <div key={index} className="w-full">
                    <h3 className="text-[8pt] font-black text-gray-400 uppercase tracking-widest mb-2 mt-2">{skillGroup.category}</h3>
                    <div className="flex flex-wrap gap-2">
                      {skillGroup.items.split(',').map((skill, i) => skill.trim() && (
                        <span key={i} className="text-[9pt] font-black px-3 py-1.5 rounded-xl border-2 transition-transform hover:scale-105 cursor-default" style={{ color: resumeData.themeColor, borderColor: resumeData.themeColor, backgroundColor: 'white' }}>
                          {skill.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                resumeData.skills && resumeData.skills.split(',').map((skill, i) => skill.trim() && (
                  <span key={i} className="text-[9pt] font-black px-3 py-1.5 rounded-xl border-2 transition-transform hover:scale-105 cursor-default" style={{ color: resumeData.themeColor, borderColor: resumeData.themeColor, backgroundColor: 'white' }}>
                    {skill.trim()}
                  </span>
                ))
              )}
            </div>
          </div>

          {/* Education */}
          <div>
            <h2 className="text-[12pt] font-black uppercase tracking-widest mb-5 flex items-center gap-3" style={{ color: resumeData.themeColor }}>
              <span className="w-3 h-3 rotate-45" style={{ backgroundColor: resumeData.themeColor }}></span> Education
            </h2>
            <div className="space-y-6">
              {resumeData.education.map(edu => (
                <div key={edu.id} className="education-item">
                  <h3 className="text-[11pt] font-bold text-gray-900 leading-tight">{edu.degree}</h3>
                  <div className="text-[10pt] text-gray-600 font-medium mt-1">{edu.school}</div>
                  <div className="text-[9pt] font-black text-gray-400 mt-1 uppercase tracking-tighter">{edu.startDate} — {edu.endDate}</div>
                  {edu.grade && <div className="text-[9pt] font-bold mt-1 inline-block px-2 py-0.5 rounded bg-white border border-gray-200" style={{ color: resumeData.themeColor }}>{edu.grade}</div>}
                </div>
              ))}
            </div>
          </div>

          {/* Languages */}
          {resumeData.languages?.length > 0 && (
          <div>
            <h2 className="text-[12pt] font-black uppercase tracking-widest mb-5 flex items-center gap-3" style={{ color: resumeData.themeColor }}>
              <span className="w-3 h-3 rotate-45" style={{ backgroundColor: resumeData.themeColor }}></span> Languages
            </h2>
            <div className="space-y-4">
              {resumeData.languages.map(lang => (
                <div key={lang.id} className="flex justify-between items-center bg-white p-3 rounded-xl border border-gray-100 shadow-sm language-item">
                  <span className="text-[10pt] font-bold text-gray-900">{lang.name}</span>
                  <span className="text-[8.5pt] font-black text-white px-2 py-0.5 rounded-lg uppercase tracking-tighter" style={{ backgroundColor: resumeData.themeColor }}>{lang.proficiency}</span>
                </div>
              ))}
            </div>
          </div>
          )}
        </div>
      </div>

      {/* Footer Social Links */}
      {(resumeData.socialLinks?.linkedin || resumeData.socialLinks?.github || resumeData.socialLinks?.portfolio || (resumeData.showQrCode && resumeData.qrCodeUrl)) && (
        <div className="mt-16 p-8 bg-gray-900 rounded-[2rem] text-white flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col gap-4 flex-1">
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 rotate-45 bg-white"></div>
              <span className="text-[11pt] font-black uppercase tracking-widest">Connect with me</span>
            </div>
            <div className="flex flex-wrap gap-8 text-[10pt] font-bold uppercase tracking-widest">
              {resumeData.socialLinks?.linkedin && (
                <a href={resumeData.socialLinks.linkedin.startsWith('http') ? resumeData.socialLinks.linkedin : `https://linkedin.com/in/${resumeData.socialLinks.linkedin}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:opacity-70 transition-opacity">
                  <LinkIcon className="w-4 h-4" /> LinkedIn
                </a>
              )}
              {resumeData.socialLinks?.github && (
                <a href={resumeData.socialLinks.github.startsWith('http') ? resumeData.socialLinks.github : `https://github.com/${resumeData.socialLinks.github}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:opacity-70 transition-opacity">
                  <GitBranch className="w-4 h-4" /> GitHub
                </a>
              )}
              {resumeData.socialLinks?.portfolio && (
                <a href={resumeData.socialLinks.portfolio.startsWith('http') ? resumeData.socialLinks.portfolio : `https://${resumeData.socialLinks.portfolio}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:opacity-70 transition-opacity">
                  <Globe className="w-4 h-4" /> Portfolio
                </a>
              )}
            </div>
          </div>
          {resumeData.showQrCode && resumeData.qrCodeUrl && (
            <div className="shrink-0 flex flex-col items-center gap-1.5 p-2 bg-white/10 border border-white/15 rounded-xl shadow-sm">
              <QRCodeSVG 
                value={resumeData.qrCodeUrl} 
                size={55}
                fgColor="#ffffff"
                bgColor="#111827"
                level="L"
                includeMargin={false}
              />
              <span className="text-[6.5px] font-black uppercase tracking-tighter text-white/60">Scan Profile</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TechStartupTemplate;
