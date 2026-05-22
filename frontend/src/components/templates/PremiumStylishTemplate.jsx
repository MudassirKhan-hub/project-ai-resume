import React from 'react';
import { Phone, Mail, MapPin, Link as LinkIcon, GitBranch, Globe, Award, Briefcase, GraduationCap, Code, Shield, Users } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

const PremiumStylishTemplate = ({ resumeData }) => {
  return (
    <div className="font-sans bg-[#fbfbfb] text-gray-900 min-h-[297mm] overflow-hidden relative pb-20">
      {/* Top Accent Bar */}
      <div className="h-4 w-full" style={{ backgroundColor: resumeData.themeColor }}></div>

      {/* Header Section */}
      <header className="px-12 pt-10 pb-8 flex justify-between items-center border-b border-gray-200 bg-white">
        <div className="flex-1">
          <h1 className="text-[3.2rem] font-black uppercase tracking-tighter leading-none mb-2 text-gray-900">
            {resumeData.personalInfo.firstName} <span style={{ color: resumeData.themeColor }}>{resumeData.personalInfo.lastName}</span>
          </h1>
          <p className="text-[1.2rem] font-bold tracking-[0.15em] uppercase text-gray-500 mb-5">
            {resumeData.personalInfo.title}
          </p>
          
          <div className="flex flex-wrap items-center gap-5 text-[9pt] font-semibold text-gray-600">
            {resumeData.personalInfo.email && (
              <span className="flex items-center gap-2"><Mail className="w-4 h-4" style={{ color: resumeData.themeColor }}/> {resumeData.personalInfo.email}</span>
            )}
            {resumeData.personalInfo.phone && (
              <span className="flex items-center gap-2"><Phone className="w-4 h-4" style={{ color: resumeData.themeColor }}/> {resumeData.personalInfo.phone}</span>
            )}
            {resumeData.personalInfo.location && (
              <span className="flex items-center gap-2"><MapPin className="w-4 h-4" style={{ color: resumeData.themeColor }}/> {resumeData.personalInfo.location}</span>
            )}
          </div>
        </div>
        
        {resumeData.profileImage && (
          <div className="shrink-0 ml-8 relative">
            <div className="absolute inset-0 border-2 translate-x-2 translate-y-2 rounded-2xl" style={{ borderColor: resumeData.themeColor }}></div>
            <img 
              src={resumeData.profileImage} 
              alt="Profile" 
              className="w-36 h-36 rounded-2xl object-cover relative z-10 border border-gray-200 shadow-sm"
            />
          </div>
        )}
      </header>

      {/* Main Content */}
      <div className="p-12 flex flex-col gap-10">
        
        {/* Summary */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-gray-100"><Briefcase className="w-5 h-5" style={{ color: resumeData.themeColor }} /></div>
            <h2 className="text-[14pt] font-black uppercase tracking-widest text-gray-900">Executive Summary</h2>
          </div>
          <p className="text-[10pt] leading-[1.8] text-gray-600 text-justify pl-12 border-l-2" style={{ borderColor: resumeData.themeColor }}>
            {resumeData.summary}
          </p>
        </section>

        <div className="grid grid-cols-12 gap-12">
          {/* Left Column - 7/12 */}
          <div className="col-span-7 flex flex-col gap-10">
            {/* Experience */}
            {resumeData.experience.length > 0 && (
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-gray-100"><Award className="w-5 h-5" style={{ color: resumeData.themeColor }} /></div>
                  <h2 className="text-[14pt] font-black uppercase tracking-widest text-gray-900">Experience</h2>
                </div>
                <div className="space-y-6">
                  {resumeData.experience.map((exp, index) => (
                    <div key={exp.id} className="relative pl-6 border-l-2 border-gray-200 pb-2 experience-item">
                      <div className="absolute w-3.5 h-3.5 rounded-full -left-[8px] top-1.5 border-2 border-white" style={{ backgroundColor: resumeData.themeColor }}></div>
                      <h3 className="text-[11.5pt] font-black text-gray-900 leading-tight">{exp.title}</h3>
                      <div className="flex justify-between items-center mt-1 mb-3">
                        <span className="text-[10pt] font-bold text-gray-700 uppercase tracking-wide">{exp.company}</span>
                        <span className="text-[8.5pt] font-black text-white px-2.5 py-0.5 rounded-md shadow-sm" style={{ backgroundColor: resumeData.themeColor }}>
                          {exp.startDate} - {exp.endDate}
                        </span>
                      </div>
                      <ul className="list-disc list-outside ml-4 text-[9.5pt] text-gray-600 leading-[1.8] space-y-1.5">
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
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-gray-100"><Code className="w-5 h-5" style={{ color: resumeData.themeColor }} /></div>
                  <h2 className="text-[14pt] font-black uppercase tracking-widest text-gray-900">Projects</h2>
                </div>
                <div className="grid grid-cols-1 gap-5">
                  {resumeData.projects.map((proj, index) => (
                    <div key={proj.id} className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm relative overflow-hidden project-item">
                      <div className="absolute top-0 left-0 w-1.5 h-full" style={{ backgroundColor: resumeData.themeColor }}></div>
                      <h3 className="text-[11pt] font-black text-gray-900 mb-2">{proj.title}</h3>
                      <p className="text-[9.5pt] text-gray-600 leading-relaxed text-justify">{proj.description}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Right Column - 5/12 */}
          <div className="col-span-5 flex flex-col gap-10">
            {/* Education */}
            {resumeData.education.length > 0 && (
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-gray-100"><GraduationCap className="w-5 h-5" style={{ color: resumeData.themeColor }} /></div>
                  <h2 className="text-[14pt] font-black uppercase tracking-widest text-gray-900">Education</h2>
                </div>
                <div className="space-y-5">
                  {resumeData.education.map(edu => (
                    <div key={edu.id} className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm education-item">
                      <span className="text-[8pt] font-black uppercase tracking-wider mb-1.5 block text-gray-400">{edu.startDate} — {edu.endDate}</span>
                      <h3 className="text-[10.5pt] font-bold text-gray-900 leading-tight mb-1">{edu.degree}</h3>
                      <p className="text-[9.5pt] text-gray-600 font-medium">{edu.school}</p>
                      {edu.grade && <p className="text-[9pt] font-bold mt-2.5 inline-block px-2 py-0.5 rounded-md bg-gray-100" style={{ color: resumeData.themeColor }}>Score: {edu.grade}</p>}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Skills */}
            {resumeData.skills && (
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-gray-100"><Briefcase className="w-5 h-5" style={{ color: resumeData.themeColor }} /></div>
                  <h2 className="text-[14pt] font-black uppercase tracking-widest text-gray-900">Expertise</h2>
                </div>
                <div className="flex flex-wrap gap-2">
                  {resumeData.skills && (typeof resumeData.skills === 'string' ? resumeData.skills.split(',') : []).map((skill, i) => skill.trim() && (
                    <span key={i} className="text-[9pt] font-bold px-3 py-1.5 rounded-lg bg-gray-900 text-white shadow-sm">
                      {skill.trim()}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {/* Languages */}
            {resumeData.languages?.length > 0 && (
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-gray-100"><Globe className="w-5 h-5" style={{ color: resumeData.themeColor }} /></div>
                  <h2 className="text-[14pt] font-black uppercase tracking-widest text-gray-900">Languages</h2>
                </div>
                <div className="space-y-3">
                  {resumeData.languages.map(lang => (
                    <div key={lang.id} className="flex justify-between items-center text-[9.5pt] bg-white p-3 rounded-lg border border-gray-100 language-item">
                      <span className="font-bold text-gray-900">{lang.name}</span>
                      <span className="text-gray-500 font-medium">{lang.proficiency}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Certifications */}
            {resumeData.certifications?.length > 0 && (
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-gray-100"><Shield className="w-5 h-5" style={{ color: resumeData.themeColor }} /></div>
                  <h2 className="text-[14pt] font-black uppercase tracking-widest text-gray-900">Certificates</h2>
                </div>
                <div className="space-y-4">
                  {resumeData.certifications.map((cert, index) => (
                    <div key={index} className="flex flex-col gap-1 border-b border-gray-200 pb-3 last:border-0 last:pb-0 certification-item">
                      <h3 className="text-[10pt] font-bold text-gray-900">{cert.name}</h3>
                      <div className="flex justify-between items-center text-[9pt]">
                        <span className="text-gray-500">{cert.issuer}</span>
                        <span className="font-bold" style={{ color: resumeData.themeColor }}>{cert.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* References */}
            {resumeData.references?.length > 0 && (
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-gray-100"><Users className="w-5 h-5" style={{ color: resumeData.themeColor }} /></div>
                  <h2 className="text-[14pt] font-black uppercase tracking-widest text-gray-900">References</h2>
                </div>
                <div className="space-y-4">
                  {resumeData.references.map((ref, index) => (
                    <div key={index} className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm reference-item">
                      <h3 className="text-[10pt] font-bold text-gray-900">{ref.name}</h3>
                      <p className="text-[9pt] text-gray-500 mt-0.5">{ref.title} at {ref.company}</p>
                      <p className="text-[9pt] font-bold mt-2 flex items-center gap-2" style={{ color: resumeData.themeColor }}>
                        <Mail className="w-3.5 h-3.5" /> {ref.contact}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}

          </div>
        </div>
      </div>
      
      {/* Footer / Socials */}
      {(resumeData.socialLinks?.linkedin || resumeData.socialLinks?.github || resumeData.socialLinks?.portfolio || (resumeData.showQrCode && resumeData.qrCodeUrl)) && (
        <div className="absolute bottom-0 left-0 w-full px-8 py-4 bg-gray-900 text-white flex justify-between items-center border-t-[6px]" style={{ borderColor: resumeData.themeColor }}>
          <div className="flex justify-center gap-8 flex-wrap flex-1">
            {resumeData.socialLinks?.linkedin && (
              <a href={`https://linkedin.com/in/${resumeData.socialLinks.linkedin.replace('https://linkedin.com/in/', '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[9pt] font-bold hover:text-gray-300">
                <LinkIcon className="w-4 h-4" /> linkedin.com/in/{resumeData.socialLinks.linkedin.replace('https://linkedin.com/in/', '')}
              </a>
            )}
            {resumeData.socialLinks?.github && (
              <a href={`https://github.com/${resumeData.socialLinks.github.replace('https://github.com/', '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[9pt] font-bold hover:text-gray-300">
                <GitBranch className="w-4 h-4" /> github.com/{resumeData.socialLinks.github.replace('https://github.com/', '')}
              </a>
            )}
            {resumeData.socialLinks?.portfolio && (
              <a href={`https://${resumeData.socialLinks.portfolio.replace('https://', '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[9pt] font-bold hover:text-gray-300">
                <Globe className="w-4 h-4" /> {resumeData.socialLinks.portfolio.replace('https://', '')}
              </a>
            )}
          </div>
          {resumeData.showQrCode && resumeData.qrCodeUrl && (
            <div className="shrink-0 flex flex-col items-center gap-1 p-1 bg-white border border-gray-700 shadow-sm rounded-lg ml-4">
              <QRCodeSVG 
                value={resumeData.qrCodeUrl} 
                size={45}
                fgColor="#000000"
                bgColor="#ffffff"
                level="L"
                includeMargin={false}
              />
              <span className="text-[5.5px] font-black uppercase tracking-tighter text-gray-500">Scan Profile</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PremiumStylishTemplate;
