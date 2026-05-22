import React from 'react';
import { Phone, Mail, MapPin, Link as LinkIcon, GitBranch, Globe } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

const ModernTemplate = ({ resumeData }) => {
  return (
    <>
      <div className="border-b-2 pb-6 mb-6 flex items-center justify-between gap-6" style={{ borderColor: resumeData.themeColor }}>
        <div>
          <h1 className="text-[2.5rem] font-black text-gray-900 uppercase tracking-tighter leading-none mb-2">
            {resumeData.personalInfo.firstName} <span className="font-light">{resumeData.personalInfo.lastName}</span>
          </h1>
          <p className="text-xl font-bold tracking-wide mb-3" style={{ color: resumeData.themeColor }}>{resumeData.personalInfo.title}</p>
          <div className="flex flex-wrap items-center gap-y-2 text-sm text-gray-600 font-medium">
            {resumeData.personalInfo.email && (
              <div className="flex items-center mr-4">
                <Mail className="w-4 h-4 mr-2 shrink-0" style={{ color: resumeData.themeColor, transform: 'translateY(-0.5px)' }} />
                <span>{resumeData.personalInfo.email}</span>
              </div>
            )}
            {resumeData.personalInfo.phone && (
              <div className="flex items-center mr-4 border-l border-gray-300 pl-4">
                <Phone className="w-4 h-4 mr-2 shrink-0" style={{ color: resumeData.themeColor, transform: 'translateY(-0.5px)' }} />
                <span>{resumeData.personalInfo.phone}</span>
              </div>
            )}
            {resumeData.personalInfo.location && (
              <div className="flex items-center border-l border-gray-300 pl-4">
                <MapPin className="w-4 h-4 mr-2 shrink-0" style={{ color: resumeData.themeColor, transform: 'translateY(-0.5px)' }} />
                <span>{resumeData.personalInfo.location}</span>
              </div>
            )}
          </div>
        </div>
        {resumeData.profileImage && (
          <div className="shrink-0">
            <img 
              src={resumeData.profileImage} 
              alt="Profile" 
              className="w-32 h-32 rounded-xl object-cover shadow-md"
            />
          </div>
        )}
      </div>
      
      <div className="mb-8">
        <h2 className="text-[11pt] font-black uppercase tracking-widest mb-3 flex items-center leading-none" style={{ color: resumeData.themeColor }}>
          <span className="text-[1.8rem] mr-2" style={{ transform: 'translateY(-3.5px)' }}>•</span>
          Profile
        </h2>
        <p className="text-[10pt] text-gray-800 leading-relaxed">
          {resumeData.summary}
        </p>
      </div>

      <div className="grid grid-cols-3 gap-8">
        <div className="col-span-2 space-y-8">
          
          {resumeData.experience.length > 0 && (
          <div>
            <h2 className="text-[11pt] font-black uppercase tracking-widest mb-4 flex items-center leading-none" style={{ color: resumeData.themeColor }}>
              <span className="text-[1.8rem] mr-2" style={{ transform: 'translateY(-3.5px)' }}>•</span>
              Experience
            </h2>
            {resumeData.experience.map(exp => (
              <div key={exp.id} className="mb-4 experience-item">
                <h3 className="text-[11pt] font-bold text-gray-900 mb-0.5">{exp.title}</h3>
                <div className="flex items-center gap-4 flex-wrap mb-2">
                  <h4 className="text-[10pt] text-gray-600 font-medium uppercase tracking-wider">{exp.company}</h4>
                  {exp.location && <span className="text-[9pt] font-medium text-gray-400 flex items-center gap-1"><MapPin className="w-3 h-3" />{exp.location}</span>}
                  <span className="text-[9pt] font-bold" style={{ color: resumeData.themeColor }}>{exp.startDate} {exp.startDate && exp.endDate && '- '} {exp.endDate}</span>
                </div>
                <ul className="list-disc list-outside ml-4 text-[10pt] text-gray-800 leading-relaxed space-y-1">
                  {exp.description && exp.description.split('\n').map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          )}

          {resumeData.projects.length > 0 && (
          <div>
            <h2 className="text-[11pt] font-black uppercase tracking-widest mb-4 flex items-center leading-none" style={{ color: resumeData.themeColor }}>
              <span className="text-[1.8rem] mr-2" style={{ transform: 'translateY(-3.5px)' }}>•</span>
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

          {resumeData.certifications?.length > 0 && (
          <div>
            <h2 className="text-[11pt] font-black uppercase tracking-widest mb-4 flex items-center leading-none" style={{ color: resumeData.themeColor }}>
              <span className="text-[1.8rem] mr-2" style={{ transform: 'translateY(-3.5px)' }}>•</span>
              Certifications
            </h2>
            <div className="space-y-3">
              {resumeData.certifications.map((cert, index) => (
                <div key={index} className="certification-item">
                  <h3 className="text-[10.5pt] font-bold text-gray-900 leading-tight">{cert.name}</h3>
                  <p className="text-[9.5pt] text-gray-600 italic">{cert.issuer} {cert.date && `| ${cert.date}`}</p>
                </div>
              ))}
            </div>
          </div>
          )}
          
        </div>
        
        <div className="col-span-1 space-y-8">
          
          {resumeData.education.length > 0 && (
          <div>
            <h2 className="text-[11pt] font-black uppercase tracking-widest mb-4 flex items-center leading-none" style={{ color: resumeData.themeColor }}>
              <span className="text-[1.8rem] mr-2" style={{ transform: 'translateY(-3.5px)' }}>•</span>
              Education
            </h2>
            <div className="space-y-4">
              {resumeData.education.map(edu => (
                <div key={edu.id} className="education-item">
                  <h3 className="text-[10.5pt] font-bold text-gray-900 leading-tight">
                    {edu.degree}
                    {edu.grade ? <span className="text-[9pt] font-normal text-gray-600 ml-1">({edu.grade})</span> : null}
                  </h3>
                  <p className="text-[10pt] text-gray-600 mb-1 mt-0.5">{edu.school}</p>
                  <p className="text-[9pt] font-bold" style={{ color: resumeData.themeColor }}>{edu.startDate} {edu.startDate && edu.endDate && '- '} {edu.endDate}</p>
                </div>
              ))}
            </div>
          </div>
          )}

          {resumeData.skills && (
          <div>
            <h2 className="text-[11pt] font-black uppercase tracking-widest mb-4 flex items-center leading-none" style={{ color: resumeData.themeColor }}>
              <span className="text-[1.8rem] mr-2" style={{ transform: 'translateY(-3.5px)' }}>•</span>
              Skills
            </h2>
            <ul className="text-[10pt] text-gray-800 space-y-1.5">
              {resumeData.skills && (typeof resumeData.skills === 'string' ? resumeData.skills.split(',') : []).map((skill, i) => skill.trim() && (
                <li key={i}>{skill.trim()}</li>
              ))}
            </ul>
          </div>
          )}

          {resumeData.languages?.length > 0 && (
          <div className="pt-2">
            <h2 className="text-[11pt] font-black uppercase tracking-widest mb-4 flex items-center leading-none" style={{ color: resumeData.themeColor }}>
              <span className="text-[1.8rem] mr-2" style={{ transform: 'translateY(-3.5px)' }}>•</span>
              Languages
            </h2>
            <ul className="text-[10pt] text-gray-800 space-y-1.5">
              {resumeData.languages.map((lang) => (
                <li key={lang.id} className="grid grid-cols-2 gap-2 items-center">
                  <span className="font-medium">{lang.name}</span>
                  <span className="text-gray-500 text-[9pt]">{lang.proficiency}</span>
                </li>
              ))}
            </ul>
          </div>
          )}

          {resumeData.references?.length > 0 && (
          <div className="pt-2">
            <h2 className="text-[11pt] font-black uppercase tracking-widest mb-4 flex items-center leading-none" style={{ color: resumeData.themeColor }}>
              <span className="text-[1.8rem] mr-2" style={{ transform: 'translateY(-3.5px)' }}>•</span>
              References
            </h2>
            <div className="space-y-4">
              {resumeData.references.map((ref, index) => (
                <div key={index}>
                  <h3 className="text-[10.5pt] font-bold text-gray-900 leading-tight">{ref.name}</h3>
                  <p className="text-[9.5pt] text-gray-600">{ref.title}</p>
                  <p className="text-[9pt] font-medium" style={{ color: resumeData.themeColor }}>{ref.contact}</p>
                </div>
              ))}
            </div>
          </div>
          )}

        </div>
      </div>

      {/* Footer Social Links */}
      {(resumeData.socialLinks?.linkedin || resumeData.socialLinks?.github || resumeData.socialLinks?.portfolio || (resumeData.showQrCode && resumeData.qrCodeUrl)) && (
        <div className="mt-12 pt-6 border-t-2 border-gray-100 flex justify-between items-start gap-6">
          <div className="flex-1 flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full mb-0.5" style={{ backgroundColor: resumeData.themeColor }}></div>
              <span className="text-[11pt] font-black uppercase tracking-widest" style={{ color: resumeData.themeColor }}>You can also contact me on:</span>
            </div>
            <div className="flex flex-wrap gap-x-8 gap-y-2 text-[10pt] font-medium text-gray-600 ml-3.5">
            {resumeData.socialLinks?.linkedin && (
              <a 
                href={resumeData.socialLinks.linkedin.startsWith('http') ? resumeData.socialLinks.linkedin : `https://linkedin.com/in/${resumeData.socialLinks.linkedin}`}
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:text-blue-600 transition-colors"
              >
                <LinkIcon className="w-4 h-4" style={{ transform: 'translateY(-1px)' }} /> LinkedIn
              </a>
            )}
            {resumeData.socialLinks?.github && (
              <a 
                href={resumeData.socialLinks.github.startsWith('http') ? resumeData.socialLinks.github : `https://github.com/${resumeData.socialLinks.github}`}
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:text-black transition-colors"
              >
                <GitBranch className="w-4 h-4" style={{ transform: 'translateY(-1px)' }} /> GitHub
              </a>
            )}
            {resumeData.socialLinks?.portfolio && (
              <a 
                href={resumeData.socialLinks.portfolio.startsWith('http') ? resumeData.socialLinks.portfolio : `https://${resumeData.socialLinks.portfolio}`}
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:text-indigo-600 transition-colors"
              >
                <Globe className="w-4 h-4" style={{ transform: 'translateY(-1px)' }} /> Portfolio
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

export default ModernTemplate;
