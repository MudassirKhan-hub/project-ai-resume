import React from 'react';
import { Phone, Mail, MapPin, Link as LinkIcon, GitBranch, Globe, Award, Target, BookOpen, ShieldCheck, Trophy, Users } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

const ElegantSidebarTemplate = ({ resumeData }) => {
  return (
    <div className="font-sans text-gray-800 bg-white min-h-[297mm] flex overflow-hidden">
      {/* Sidebar */}
      <div className="w-[35%] bg-slate-900 text-white p-8 flex flex-col gap-8 shrink-0">
        {/* Profile */}
        <div className="text-center">
          {resumeData.profileImage && (
            <div className="mb-6 flex justify-center">
              <img 
                src={resumeData.profileImage} 
                alt="Profile" 
                className="w-40 h-40 rounded-full object-cover border-4 border-slate-700 shadow-2xl"
              />
            </div>
          )}
          <h1 className="text-[1.8rem] font-black leading-tight mb-2 tracking-tight">
            {resumeData.personalInfo.firstName} <br />
            <span style={{ color: resumeData.themeColor }}>{resumeData.personalInfo.lastName}</span>
          </h1>
          <p className="text-[1rem] font-bold text-slate-400 uppercase tracking-widest">
            {resumeData.personalInfo.title}
          </p>
        </div>

        {/* Contact */}
        <div className="space-y-4">
          <h2 className="text-[10pt] font-black uppercase tracking-[0.2em] pb-2 border-b border-slate-700" style={{ color: resumeData.themeColor }}>Contact</h2>
          <div className="space-y-3 text-[9pt]">
            {resumeData.personalInfo.email && <div className="flex items-center gap-3"><Mail className="w-4 h-4 text-slate-500 shrink-0"/> <span className="break-all">{resumeData.personalInfo.email}</span></div>}
            {resumeData.personalInfo.phone && <div className="flex items-center gap-3"><Phone className="w-4 h-4 text-slate-500 shrink-0"/> {resumeData.personalInfo.phone}</div>}
            {resumeData.personalInfo.location && <div className="flex items-center gap-3"><MapPin className="w-4 h-4 text-slate-500 shrink-0"/> {resumeData.personalInfo.location}</div>}
          </div>
        </div>

        {/* Skills */}
        <div className="space-y-4">
          <h2 className="text-[10pt] font-black uppercase tracking-[0.2em] pb-2 border-b border-slate-700" style={{ color: resumeData.themeColor }}>Expertise</h2>
          <div className="flex flex-wrap gap-2">
            {resumeData.skills && (typeof resumeData.skills === 'string' ? resumeData.skills.split(',') : []).map((skill, i) => skill.trim() && (
              <span key={i} className="text-[8.5pt] font-bold px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-300">
                {skill.trim()}
              </span>
            ))}
          </div>
        </div>

        {/* Languages */}
        {resumeData.languages?.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-[10pt] font-black uppercase tracking-[0.2em] pb-2 border-b border-slate-700" style={{ color: resumeData.themeColor }}>Languages</h2>
            <div className="space-y-3">
              {resumeData.languages.map(lang => (
                <div key={lang.id} className="flex justify-between items-center text-[9pt]">
                  <span className="font-bold text-slate-300">{lang.name}</span>
                  <span className="text-slate-500 font-medium">{lang.proficiency}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Social */}
        {(resumeData.socialLinks?.linkedin || resumeData.socialLinks?.github || resumeData.socialLinks?.portfolio || (resumeData.showQrCode && resumeData.qrCodeUrl)) && (
          <div className="mt-auto pt-6 border-t border-slate-700 space-y-4">
            <h2 className="text-[10pt] font-black uppercase tracking-[0.2em]" style={{ color: resumeData.themeColor }}>Networks</h2>
            <div className="flex flex-col gap-3 text-[9pt]">
              {resumeData.socialLinks?.linkedin && (
                <a href={resumeData.socialLinks.linkedin.startsWith('http') ? resumeData.socialLinks.linkedin : `https://linkedin.com/in/${resumeData.socialLinks.linkedin}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-white transition-colors">
                  <GitBranch className="w-4 h-4" /> LinkedIn
                </a>
              )}
              {resumeData.socialLinks?.github && (
                <a href={resumeData.socialLinks.github.startsWith('http') ? resumeData.socialLinks.github : `https://github.com/${resumeData.socialLinks.github}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-white transition-colors">
                  <GitBranch className="w-4 h-4" /> GitHub
                </a>
              )}
              {resumeData.socialLinks?.portfolio && (
                <a href={resumeData.socialLinks.portfolio.startsWith('http') ? resumeData.socialLinks.portfolio : `https://${resumeData.socialLinks.portfolio}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-white transition-colors">
                  <Globe className="w-4 h-4" /> Portfolio
                </a>
              )}
            </div>
            {resumeData.showQrCode && resumeData.qrCodeUrl && (
              <div className="mt-4 flex flex-col items-center gap-1.5 p-2 bg-slate-800 border border-slate-700 rounded-lg shadow-sm w-full">
                <QRCodeSVG 
                  value={resumeData.qrCodeUrl} 
                  size={55}
                  fgColor="#ffffff"
                  bgColor="#0f172a"
                  level="L"
                  includeMargin={false}
                />
                <span className="text-[6.5px] font-black uppercase tracking-tighter text-slate-400">Scan Profile</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 p-10 flex flex-col gap-10 overflow-y-auto">
        {/* Summary */}
        <section>
          <h2 className="flex items-center gap-3 text-[12pt] font-black uppercase tracking-widest mb-4">
            <Target className="w-5 h-5" style={{ color: resumeData.themeColor }} /> 
            Professional Summary
            <div className="flex-1 h-px bg-gray-100 ml-2"></div>
          </h2>
          <p className="text-[10.5pt] leading-[1.8] text-gray-600 text-justify">
            {resumeData.summary}
          </p>
        </section>

        {/* Experience */}
        {resumeData.experience.length > 0 && (
          <section>
            <h2 className="flex items-center gap-3 text-[12pt] font-black uppercase tracking-widest mb-6">
              <Award className="w-5 h-5" style={{ color: resumeData.themeColor }} /> 
              Work History
              <div className="flex-1 h-px bg-gray-100 ml-2"></div>
            </h2>
            <div className="space-y-8">
              {resumeData.experience.map(exp => (
                <div key={exp.id} className="relative experience-item">
                  <div className="flex justify-between items-baseline mb-2">
                    <h3 className="text-[11.5pt] font-bold text-gray-900">{exp.title}</h3>
                    <span className="text-[9pt] font-black text-gray-400 bg-gray-50 px-2.5 py-1 rounded-full uppercase tracking-tighter">
                      {exp.startDate} — {exp.endDate}
                    </span>
                  </div>
                  <h4 className="text-[10pt] font-bold mb-3 uppercase tracking-wide flex justify-between items-center" style={{ color: resumeData.themeColor }}>
                    <span>{exp.company}</span>
                    {exp.location && <span className="text-[8.5pt] font-normal text-gray-400 normal-case tracking-normal">{exp.location}</span>}
                  </h4>
                  <ul className="list-disc list-outside ml-4 text-[10pt] text-gray-600 leading-relaxed space-y-2">
                    {exp.description && exp.description.split('\n').map((point, i) => (
                      <li key={i}>{point}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {resumeData.projects.length > 0 && (
          <section>
            <h2 className="flex items-center gap-3 text-[12pt] font-black uppercase tracking-widest mb-6">
              <Award className="w-5 h-5" style={{ color: resumeData.themeColor }} /> 
              Key Projects
              <div className="flex-1 h-px bg-gray-100 ml-2"></div>
            </h2>
            <div className="grid grid-cols-1 gap-6">
              {resumeData.projects.map(proj => (
                <div key={proj.id} className="group border-l-4 p-5 bg-gray-50/50 hover:bg-white hover:shadow-xl transition-all project-item" style={{ borderColor: resumeData.themeColor }}>
                  <h3 className="text-[11pt] font-black text-gray-900 mb-2">{proj.title}</h3>
                  <p className="text-[10pt] text-gray-600 leading-relaxed">{proj.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        <section>
          <h2 className="flex items-center gap-3 text-[12pt] font-black uppercase tracking-widest mb-6">
            <BookOpen className="w-5 h-5" style={{ color: resumeData.themeColor }} /> 
            Education
            <div className="flex-1 h-px bg-gray-100 ml-2"></div>
          </h2>
          <div className="grid grid-cols-1 gap-6">
            {resumeData.education.map(edu => (
              <div key={edu.id} className="flex justify-between items-start gap-4 education-item">
                <div>
                  <h3 className="text-[10.5pt] font-bold text-gray-900 leading-tight">{edu.degree}</h3>
                  <div className="text-[10pt] text-gray-500 font-medium mt-1">{edu.school}</div>
                  {edu.grade && <div className="text-[9pt] font-bold text-gray-400 mt-1 uppercase tracking-tighter">GPA: {edu.grade}</div>}
                </div>
                <div className="text-[9pt] font-black text-gray-300 uppercase shrink-0">
                  {edu.startDate} — {edu.endDate}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Certifications */}
        {resumeData.certifications?.length > 0 && (
          <section>
            <h2 className="flex items-center gap-3 text-[12pt] font-black uppercase tracking-widest mb-6">
              <ShieldCheck className="w-5 h-5" style={{ color: resumeData.themeColor }} /> 
              Certifications
              <div className="flex-1 h-px bg-gray-100 ml-2"></div>
            </h2>
            <div className="grid grid-cols-1 gap-4">
              {resumeData.certifications.map((cert, index) => (
                <div key={index} className="flex justify-between items-center bg-gray-50 p-4 rounded-xl border border-gray-100 certification-item">
                  <div>
                    <h3 className="text-[10.5pt] font-bold text-gray-900">{cert.name}</h3>
                    <p className="text-[9.5pt] text-gray-500">{cert.issuer}</p>
                  </div>
                  <span className="text-[9pt] font-black text-gray-300 uppercase">{cert.date}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* References */}
        {resumeData.references?.length > 0 && (
          <section>
            <h2 className="flex items-center gap-3 text-[12pt] font-black uppercase tracking-widest mb-6">
              <Users className="w-5 h-5" style={{ color: resumeData.themeColor }} /> 
              References
              <div className="flex-1 h-px bg-gray-100 ml-2"></div>
            </h2>
            <div className="grid grid-cols-2 gap-6">
              {resumeData.references.map((ref, index) => (
                <div key={index} className="reference-item">
                  <h3 className="text-[10.5pt] font-bold text-gray-900">{ref.name}</h3>
                  <p className="text-[9.5pt] text-gray-500">{ref.title} at {ref.company}</p>
                  <p className="text-[9pt] font-bold mt-1" style={{ color: resumeData.themeColor }}>{ref.contact}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ElegantSidebarTemplate;
