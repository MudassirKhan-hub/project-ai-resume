import React from 'react';
import { Phone, Mail, MapPin, Link as LinkIcon, GitBranch, Globe } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

const BeigeGeometricTemplate = ({ resumeData }) => {
  return (
    <div className="relative font-sans text-gray-800 bg-[#FAFAFA] min-h-screen overflow-hidden">
      {/* Geometric Background Elements */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#F3EFE7] rounded-bl-[200px] -z-0"></div>
      <div className="absolute bottom-10 -left-10 w-[150px] h-[300px] bg-[#EBE5D9] rounded-full -z-0 transform rotate-12"></div>
      <div className="absolute top-1/3 left-1/2 w-[80px] h-[80px] border-4 border-[#E2D5C4]/40 rounded-full -z-0"></div>

      <div className="relative z-10 p-4">
        {/* Header */}
        <header className="mb-10 text-center relative flex flex-col items-center">
          {resumeData.profileImage && (
            <div className="mb-6">
              <img 
                src={resumeData.profileImage} 
                alt="Profile" 
                className="w-44 h-44 rounded-full object-cover border-4 border-white shadow-xl"
              />
            </div>
          )}
          <h1 className="text-[3.5rem] font-light tracking-[0.15em] uppercase text-gray-900 leading-none mb-3">
            {resumeData.personalInfo.firstName} <span className="font-bold">{resumeData.personalInfo.lastName}</span>
          </h1>
          <div className="text-[1.2rem] text-gray-500 uppercase tracking-[0.3em] font-medium mb-6">
            {resumeData.personalInfo.title}
          </div>
          
          <div className="flex justify-center items-center gap-8 flex-wrap text-[9.5pt] text-gray-600 font-medium tracking-wide">
            {resumeData.personalInfo.email && <span className="flex items-center gap-2"><Mail className="w-3.5 h-3.5 shrink-0" style={{ color: '#B8A991', transform: 'translateY(-0.5px)' }}/>{resumeData.personalInfo.email}</span>}
            {resumeData.personalInfo.phone && <span className="flex items-center gap-2"><Phone className="w-3.5 h-3.5 shrink-0" style={{ color: '#B8A991', transform: 'translateY(-0.5px)' }}/>{resumeData.personalInfo.phone}</span>}
            {resumeData.personalInfo.location && <span className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5 shrink-0" style={{ color: '#B8A991', transform: 'translateY(-0.5px)' }}/>{resumeData.personalInfo.location}</span>}
          </div>
        </header>

        {/* Summary Box with Beige tinted background */}
        <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-sm border border-[#F3EFE7] mb-10 text-center">
           <h2 className="text-[10pt] font-black text-[#B8A991] uppercase tracking-[0.2em] mb-3">Profile</h2>
           <p className="text-[10pt] leading-[1.8] text-gray-600 max-w-3xl mx-auto">
             {resumeData.summary}
           </p>
        </div>

        <div className="grid grid-cols-12 gap-10">
          {/* Main Col */}
          <div className="col-span-7 space-y-10">
            {resumeData.experience.length > 0 && (
            <section>
              <h2 className="text-[11pt] font-black text-gray-900 uppercase tracking-[0.2em] mb-5 border-b-2 border-[#EBE5D9] inline-block pb-1">
                Experience
              </h2>
              <div className="space-y-6">
                {resumeData.experience.map(exp => (
                  <div key={exp.id} className="relative experience-item">
                    <div className="flex items-center gap-3 mb-1">
                      <div className="w-1.5 h-1.5 bg-[#B8A991] rounded-full shrink-0"></div>
                      <h3 className="text-[11pt] font-bold text-gray-900">{exp.title}</h3>
                    </div>
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      <span className="text-[10pt] text-[#B8A991] font-semibold">{exp.company}</span>
                      {exp.location && <span className="text-[9pt] text-gray-400">({exp.location})</span>}
                      <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                      <span className="text-[9pt] text-gray-400 font-medium uppercase tracking-wider">{exp.startDate} – {exp.endDate}</span>
                    </div>
                    <ul className="list-disc list-outside ml-4 text-[9.5pt] text-gray-600 leading-[1.8] space-y-1">
                      {exp.description && exp.description.split('\n').map((point, i) => (
                        <li key={i}>{point}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
            )}
            
            {resumeData.projects.length > 0 && (
              <section>
                <h2 className="text-[11pt] font-black text-gray-900 uppercase tracking-[0.2em] mb-5 border-b-2 border-[#EBE5D9] inline-block pb-1">
                  Projects
                </h2>
                <div className="space-y-4">
                  {resumeData.projects.map(proj => (
                    <div key={proj.id} className="bg-[#FAF8F5] p-5 rounded-xl border border-[#F3EFE7] project-item">
                      <h3 className="text-[10.5pt] font-bold text-gray-900 mb-1">{proj.title}</h3>
                      <p className="text-[9.5pt] text-gray-600 leading-relaxed">{proj.description}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Right Col */}
          <div className="col-span-5 space-y-10">
            <section>
              <h2 className="text-[11pt] font-black text-gray-900 uppercase tracking-[0.2em] mb-5 border-b-2 border-[#EBE5D9] inline-block pb-1">
                Education
              </h2>
              <div className="space-y-5">
                {resumeData.education.map(edu => (
                  <div key={edu.id} className="education-item">
                    <h3 className="text-[10.5pt] font-bold text-gray-900 leading-snug">{edu.degree}</h3>
                    <div className="text-[10pt] text-gray-600 mt-1">{edu.school}</div>
                    <div className="text-[9pt] text-[#B8A991] font-medium tracking-wide mt-1">{edu.startDate} – {edu.endDate}</div>
                    {edu.grade && <div className="text-[9pt] text-gray-500 mt-0.5">Grade: {edu.grade}</div>}
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-[11pt] font-black text-gray-900 uppercase tracking-[0.2em] mb-5 border-b-2 border-[#EBE5D9] inline-block pb-1">
                Expertise
              </h2>
              <div className="flex flex-wrap gap-2.5">
                {resumeData.skills && resumeData.skills.split(',').map((skill, i) => skill.trim() && (
                  <span key={i} className="bg-[#F3EFE7] text-gray-700 text-[9pt] font-medium px-3 py-1.5 rounded-lg border border-[#EBE5D9]">
                    {skill.trim()}
                  </span>
                ))}
              </div>
            </section>

            {resumeData.languages?.length > 0 && (
              <section>
                <h2 className="text-[11pt] font-black text-gray-900 uppercase tracking-[0.2em] mb-5 border-b-2 border-[#EBE5D9] inline-block pb-1">
                  Languages
                </h2>
                <div className="space-y-3">
                  {resumeData.languages.map(lang => (
                    <div key={lang.id} className="flex justify-between items-center border-b border-[#EBE5D9]/50 pb-2 last:border-0 last:pb-0 language-item">
                      <span className="text-[10pt] font-bold text-gray-900">{lang.name}</span>
                      <span className="text-[9pt] text-[#B8A991] tracking-wider uppercase font-medium">{lang.proficiency}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>

      {/* Footer Social Links */}
      {(resumeData.socialLinks?.linkedin || resumeData.socialLinks?.github || resumeData.socialLinks?.portfolio || (resumeData.showQrCode && resumeData.qrCodeUrl)) && (
        <div className="relative z-10 mt-10 p-8 border-t border-[#EBE5D9] flex justify-between items-start gap-6 text-[9.5pt] font-medium text-gray-500">
          <div className="flex-1 flex flex-col gap-5">
            <div>
              <span className="text-[11pt] font-black text-gray-900 uppercase tracking-[0.2em] border-b-2 border-[#EBE5D9] inline-block pb-1">You can also contact me on:</span>
            </div>
            <div className="flex flex-wrap gap-x-12 gap-y-2">
            {resumeData.socialLinks?.linkedin && (
              <a 
                href={resumeData.socialLinks.linkedin.startsWith('http') ? resumeData.socialLinks.linkedin : `https://linkedin.com/in/${resumeData.socialLinks.linkedin}`}
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-[#B8A991] transition-colors"
              >
                <LinkIcon className="w-4 h-4" /> LinkedIn
              </a>
            )}
            {resumeData.socialLinks?.github && (
              <a 
                href={resumeData.socialLinks.github.startsWith('http') ? resumeData.socialLinks.github : `https://github.com/${resumeData.socialLinks.github}`}
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-[#B8A991] transition-colors"
              >
                <GitBranch className="w-4 h-4" /> GitHub
              </a>
            )}
            {resumeData.socialLinks?.portfolio && (
              <a 
                href={resumeData.socialLinks.portfolio.startsWith('http') ? resumeData.socialLinks.portfolio : `https://${resumeData.socialLinks.portfolio}`}
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-[#B8A991] transition-colors"
              >
                <Globe className="w-4 h-4" /> Portfolio
              </a>
            )}
            </div>
          </div>
          {resumeData.showQrCode && resumeData.qrCodeUrl && (
            <div className="shrink-0 flex flex-col items-center gap-1 p-1 bg-white border border-[#EBE5D9] shadow-sm rounded-lg">
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

export default BeigeGeometricTemplate;
