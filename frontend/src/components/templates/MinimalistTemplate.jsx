import React from 'react';
import { Phone, Mail, MapPin, Link as LinkIcon, GitBranch, Globe } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

const MinimalistTemplate = ({ resumeData }) => {
  return (
    <div className="font-sans text-gray-800">
      <header className="mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <div className="flex-1">
          {resumeData.profileImage && (
            <div className="mb-6">
              <img 
                src={resumeData.profileImage} 
                alt="Profile" 
                className="w-24 h-24 grayscale hover:grayscale-0 transition-all duration-500 rounded-none object-cover border border-gray-200"
              />
            </div>
          )}
          <h1 className="text-[3.5rem] font-light tracking-tight text-gray-900 leading-none mb-3">
            {resumeData.personalInfo.firstName} <span className="font-medium">{resumeData.personalInfo.lastName}</span>
          </h1>
          <div className="text-[1.1rem] text-gray-500 tracking-wide uppercase mb-4" style={{ color: resumeData.themeColor }}>
            {resumeData.personalInfo.title}
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[9.5pt] text-gray-400">
            {resumeData.personalInfo.email && <span className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5" />{resumeData.personalInfo.email}</span>}
            {resumeData.personalInfo.phone && <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5" />{resumeData.personalInfo.phone}</span>}
            {resumeData.personalInfo.location && <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" />{resumeData.personalInfo.location}</span>}
          </div>
        </div>
      </header>

      <div className="mb-10">
        <p className="text-[10.5pt] leading-[1.8] text-gray-600 max-w-3xl">
          {resumeData.summary}
        </p>
      </div>

      <div className="space-y-12">
        {resumeData.experience.length > 0 && (
        <section>
          <h2 className="text-[10pt] font-bold uppercase tracking-[0.2em] mb-6" style={{ color: resumeData.themeColor }}>Experience</h2>
          <div className="space-y-8">
            {resumeData.experience.map(exp => (
              <div key={exp.id} className="grid grid-cols-12 gap-4 experience-item">
                <div className="col-span-3 text-[9.5pt] text-gray-400 pt-1">
                  {exp.startDate} — {exp.endDate}
                </div>
                <div className="col-span-9">
                  <h3 className="text-[11pt] font-semibold text-gray-900">{exp.title}</h3>
                  <div className="text-[10pt] text-gray-500 mb-3 flex justify-between items-center">
                    <span>{exp.company}</span>
                    {exp.location && <span className="text-[9pt] text-gray-400">{exp.location}</span>}
                  </div>
                  <ul className="list-disc list-outside ml-4 text-[10pt] text-gray-600 leading-[1.7] space-y-1.5">
                    {exp.description && exp.description.split('\n').map((point, i) => (
                      <li key={i}>{point}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>
        )}

        <section className="grid grid-cols-2 gap-12">
          <div>
            <h2 className="text-[10pt] font-bold uppercase tracking-[0.2em] mb-6" style={{ color: resumeData.themeColor }}>Education</h2>
            <div className="space-y-6">
              {resumeData.education.map(edu => (
                <div key={edu.id} className="education-item">
                  <h3 className="text-[10.5pt] font-semibold text-gray-900">{edu.degree}</h3>
                  <div className="text-[10pt] text-gray-500">{edu.school}</div>
                  <div className="text-[9pt] text-gray-400 mt-1">{edu.startDate} — {edu.endDate}</div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-[10pt] font-bold uppercase tracking-[0.2em] mb-6" style={{ color: resumeData.themeColor }}>Skills</h2>
            <div className="text-[10.5pt] text-gray-600 leading-[1.8]">
              {resumeData.skills && resumeData.skills.split(',').map((skill, i) => skill.trim() && (
                <span key={i} className="block">{skill.trim()}</span>
              ))}
            </div>
            
            {resumeData.projects.length > 0 && (
              <div className="mt-8">
                <h2 className="text-[10pt] font-bold uppercase tracking-[0.2em] mb-4" style={{ color: resumeData.themeColor }}>Projects</h2>
                <div className="space-y-4">
                  {resumeData.projects.map(proj => (
                    <div key={proj.id} className="project-item">
                      <h3 className="text-[10pt] font-semibold text-gray-900">{proj.title}</h3>
                      <p className="text-[9.5pt] text-gray-500 leading-relaxed mt-1">{proj.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {resumeData.languages?.length > 0 && (
              <div className="mt-8">
                <h2 className="text-[10pt] font-bold uppercase tracking-[0.2em] mb-4" style={{ color: resumeData.themeColor }}>Languages</h2>
                <div className="space-y-2">
                  {resumeData.languages.map(lang => (
                    <div key={lang.id} className="grid grid-cols-2 gap-2 text-[9.5pt] text-gray-600">
                      <span className="font-semibold text-gray-800">{lang.name}</span>
                      <span>{lang.proficiency}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      </div>

      {/* Footer Social Links */}
      {(resumeData.socialLinks?.linkedin || resumeData.socialLinks?.github || resumeData.socialLinks?.portfolio || (resumeData.showQrCode && resumeData.qrCodeUrl)) && (
        <div className="mt-20 pt-4 border-t border-gray-100 flex justify-between items-start gap-6">
          <div className="flex-1 flex flex-col gap-4">
            <span className="text-[10pt] font-bold uppercase tracking-[0.2em]" style={{ color: resumeData.themeColor }}>You can also contact me on:</span>
            <div className="flex flex-wrap gap-x-10 gap-y-2 text-[9pt] tracking-widest uppercase text-gray-400">
            {resumeData.socialLinks?.linkedin && (
              <a 
                href={resumeData.socialLinks.linkedin.startsWith('http') ? resumeData.socialLinks.linkedin : `https://linkedin.com/in/${resumeData.socialLinks.linkedin}`}
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:text-gray-900 transition-colors"
              >
                <LinkIcon className="w-3.5 h-3.5" /> LinkedIn
              </a>
            )}
            {resumeData.socialLinks?.github && (
              <a 
                href={resumeData.socialLinks.github.startsWith('http') ? resumeData.socialLinks.github : `https://github.com/${resumeData.socialLinks.github}`}
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:text-gray-900 transition-colors"
              >
                <GitBranch className="w-3.5 h-3.5" /> GitHub
              </a>
            )}
            {resumeData.socialLinks?.portfolio && (
              <a 
                href={resumeData.socialLinks.portfolio.startsWith('http') ? resumeData.socialLinks.portfolio : `https://${resumeData.socialLinks.portfolio}`}
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:text-gray-900 transition-colors"
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
    </div>
  );
};

export default MinimalistTemplate;
