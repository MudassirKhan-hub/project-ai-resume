import React from 'react';
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';
import { FileText, Sparkles, Layout, Download, ChevronRight, CheckCircle2, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import professionalImg from '../assets/professional.png.jpg';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-indigo-100">
      
      {/* Soft Ambient Background Gradient */}
      <div className="absolute top-0 inset-x-0 h-[600px] w-full bg-gradient-to-b from-indigo-50/80 via-purple-50/40 to-white -z-10"></div>
      
      {/* Navbar */}
      <header className="px-6 lg:px-14 py-5 flex items-center justify-between border-b border-gray-100 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="bg-indigo-600 p-2 rounded-xl text-white shadow-md shadow-indigo-200">
            <Sparkles className="h-5 w-5" />
          </div>
          <span className="text-xl font-bold tracking-tight text-gray-900">
            ResumeAI
          </span>
        </div>
        <nav className="flex items-center gap-4">
          <SignedOut>
            <SignInButton mode="modal">
              <button className="text-sm font-semibold text-gray-600 hover:text-indigo-600 transition-colors px-4 py-2">Log in</button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button className="bg-gray-900 text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-gray-800 transition-colors shadow-md">
                Sign up free
              </button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <Link to="/dashboard" className="text-sm font-semibold text-gray-600 hover:text-indigo-600 transition-colors mr-4">
              Go to Dashboard
            </Link>
            <UserButton afterSignOutUrl="/" appearance={{ elements: { avatarBox: "w-10 h-10 shadow-sm border border-gray-200" } }}/>
          </SignedIn>
        </nav>
      </header>
      
      <main className="flex-1 relative z-10">
        
        {/* HERO SECTION */}
        <section className="w-full pt-20 pb-20 md:pt-32 md:pb-24 px-4 overflow-hidden">
          <div className="container mx-auto flex flex-col items-center text-center max-w-6xl">
            
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-indigo-100 bg-indigo-50/50 text-indigo-700 mb-8 shadow-sm">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-semibold">Gemini AI integration now live</span>
            </div>
            
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight mb-8 text-gray-900 leading-[1.1]">
              A professional resume.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Built in minutes.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl leading-relaxed mb-10">
              Create an ATS-friendly, beautifully designed resume effortlessly. Let AI generate your professional summary and optimize your experience bullet points.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center">
              <SignedOut>
                <SignUpButton mode="modal">
                  <button className="w-full sm:w-auto h-14 px-8 bg-indigo-600 text-white text-lg font-semibold rounded-full hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-200">
                    Create Resume <ChevronRight className="w-5 h-5" />
                  </button>
                </SignUpButton>
              </SignedOut>
              <SignedIn>
                <Link to="/dashboard" className="w-full sm:w-auto h-14 px-8 bg-indigo-600 text-white text-lg font-semibold rounded-full hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-200">
                  Open Dashboard <ChevronRight className="w-5 h-5" />
                </Link>
              </SignedIn>
            </div>
            
            <div className="mt-6 flex items-center gap-6 text-sm text-gray-500 font-medium">
              <div className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-500"/> Free to use</div>
              <div className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-500"/> No credit card required</div>
            </div>
          </div>
            
          {/* Templates Preview Grid */}
          <div id="templates-section" className="mt-20 w-full px-4 max-w-[1500px] mx-auto relative z-20">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">Professional Templates for Every Career</h2>
                <p className="text-gray-500 text-lg max-w-2xl mx-auto">ATS-optimized designs to help you land your dream job.</p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                
                {/* Template 1: Modern Elite */}
                <motion.div whileHover={{ scale: 1.05 }} className="relative group cursor-pointer">
                  <div className="absolute inset-0 bg-indigo-600/5 rounded-2xl -rotate-1 group-hover:rotate-0 transition-transform"></div>
                  <div className="relative bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden aspect-[210/297] p-5 flex flex-col gap-3">
                    <div className="border-b-2 border-indigo-600 pb-2">
                      <h3 className="text-lg font-black text-gray-900 leading-none uppercase">JONATHAN DOE</h3>
                      <p className="text-indigo-600 font-bold mt-0.5 uppercase tracking-widest text-[8px]">Senior Software Engineer</p>
                    </div>
                    <div className="flex gap-2">
                      <div className="w-1/3 space-y-3">
                        <div className="space-y-0.5">
                          <h4 className="text-[7px] font-bold text-gray-400 uppercase tracking-tighter">Contact</h4>
                          <p className="text-[6px] text-gray-600">j.doe@email.com</p>
                          <p className="text-[6px] text-gray-600">+1 (555) 000-1234</p>
                          <p className="text-[6px] text-gray-600">San Francisco, CA</p>
                        </div>
                        <div className="space-y-0.5">
                          <h4 className="text-[7px] font-bold text-gray-400 uppercase tracking-tighter">Skills</h4>
                          <p className="text-[6px] text-gray-600">React, TypeScript</p>
                          <p className="text-[6px] text-gray-600">Node.js, GraphQL</p>
                          <p className="text-[6px] text-gray-600">AWS, Kubernetes</p>
                          <p className="text-[6px] text-gray-600">Python, Django</p>
                        </div>
                        <div className="space-y-0.5">
                          <h4 className="text-[7px] font-bold text-gray-400 uppercase tracking-tighter">Education</h4>
                          <p className="text-[6px] font-bold text-gray-700">BS Computer Science</p>
                          <p className="text-[5px] text-gray-500">MIT • 2018</p>
                        </div>
                      </div>
                      <div className="flex-1 space-y-3">
                        <div>
                          <h4 className="text-[7px] font-bold text-indigo-600 uppercase mb-1">Professional Experience</h4>
                          <div className="space-y-2">
                            <div>
                              <div className="flex justify-between items-start">
                                <p className="text-[8px] font-bold text-gray-800">Tech Solutions Inc.</p>
                                <span className="text-[6px] font-bold text-gray-400">2022 - PRES</span>
                              </div>
                              <p className="text-[7px] text-gray-500 italic">Senior Developer</p>
                              <ul className="text-[6px] text-gray-600 list-disc ml-2 mt-1 space-y-0.5">
                                <li>Led migration to microservices, reducing latency by 45%.</li>
                                <li>Mentored 10+ junior developers in best practices.</li>
                                <li>Implemented CI/CD pipelines increasing speed by 30%.</li>
                              </ul>
                            </div>
                            <div>
                              <div className="flex justify-between items-start">
                                <p className="text-[8px] font-bold text-gray-800">Global Apps Group</p>
                                <span className="text-[6px] font-bold text-gray-400">2019 - 2021</span>
                              </div>
                              <p className="text-[7px] text-gray-500 italic">Software Engineer</p>
                              <ul className="text-[6px] text-gray-600 list-disc ml-2 mt-1 space-y-0.5">
                                <li>Developed high-traffic React apps for 1M+ users.</li>
                                <li>Optimized database queries for 20% faster load.</li>
                              </ul>
                            </div>
                            <div>
                              <div className="flex justify-between items-start">
                                <p className="text-[8px] font-bold text-gray-800">StartUp Hub</p>
                                <span className="text-[6px] font-bold text-gray-400">2018 - 2019</span>
                              </div>
                              <p className="text-[7px] text-gray-500 italic">Junior Developer</p>
                              <p className="text-[6px] text-gray-600 mt-1">Built MVP features using Vue.js and Firebase for an ed-tech platform.</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-auto pt-2 border-t border-gray-100 flex justify-center">
                       <span className="text-[8px] font-black text-indigo-600 uppercase tracking-widest">Modern Elite v2.0</span>
                    </div>
                  </div>
                </motion.div>

                {/* Template 2: Creative Minimal */}
                <motion.div whileHover={{ scale: 1.05 }} className="relative group cursor-pointer">
                  <div className="absolute inset-0 bg-emerald-600/5 rounded-2xl rotate-1 group-hover:rotate-0 transition-transform"></div>
                  <div className="relative bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden aspect-[210/297] p-6 flex flex-col items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-emerald-50 border-2 border-white shadow-md flex items-center justify-center overflow-hidden">
                       <div className="w-full h-full bg-emerald-100"></div>
                    </div>
                    <div className="text-center">
                      <h3 className="text-xl font-bold text-gray-900 tracking-tight">Sarah Miller</h3>
                      <p className="text-emerald-600 font-medium tracking-widest text-[8px] mt-0.5 uppercase">Creative Brand Designer</p>
                    </div>
                    <div className="w-full space-y-4">
                      <div className="text-center">
                        <p className="text-[7px] text-gray-500 italic px-4 leading-relaxed">
                          "I specialize in building visual identities that help modern brands connect with their core audience through emotional storytelling and clean aesthetics."
                        </p>
                      </div>
                      <div className="space-y-4 pt-2">
                        <div>
                          <p className="text-[8px] font-black text-gray-400 uppercase text-center mb-2">Key Experience</p>
                          <div className="space-y-3">
                            <div className="flex flex-col items-center text-center">
                              <p className="text-[9px] font-bold text-gray-800">Lead Designer @ StudioX</p>
                              <p className="text-[7px] text-emerald-500 font-bold mb-1">2021 - PRESENT</p>
                              <p className="text-[7px] text-gray-600 leading-tight">Managed brand refresh for 50+ clients across Europe.</p>
                            </div>
                            <div className="flex flex-col items-center text-center">
                              <p className="text-[9px] font-bold text-gray-800">Visualist @ ArtHouse</p>
                              <p className="text-[7px] text-emerald-500 font-bold mb-1">2018 - 2021</p>
                              <p className="text-[7px] text-gray-600 leading-tight">Created 100+ unique motion graphic assets for TV ads.</p>
                            </div>
                          </div>
                        </div>
                        <div className="pt-2 border-t border-emerald-50 text-center">
                           <p className="text-[8px] font-black text-gray-400 uppercase mb-2">Awards</p>
                           <p className="text-[7px] text-gray-600">Golden Design Award 2023</p>
                           <p className="text-[7px] text-gray-600">Top 100 Creators - Behance</p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-auto">
                       <span className="text-[8px] font-black text-emerald-600 uppercase tracking-widest">Clean Creative</span>
                    </div>
                  </div>
                </motion.div>

                {/* Template 3: Executive Sidebar */}
                <motion.div whileHover={{ scale: 1.05 }} className="relative group cursor-pointer">
                  <div className="absolute inset-0 bg-slate-900/5 rounded-2xl -rotate-1 group-hover:rotate-0 transition-transform"></div>
                  <div className="relative bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden aspect-[210/297] flex">
                    <div className="w-[35%] bg-slate-900 h-full p-4 text-white flex flex-col gap-6">
                      <div className="w-full aspect-square bg-slate-800 rounded-xl"></div>
                      <div className="space-y-4">
                        <div className="space-y-1">
                          <h4 className="text-[7px] font-bold text-slate-500 uppercase tracking-widest border-b border-slate-700 pb-0.5">Contact</h4>
                          <p className="text-[6px] text-slate-300">m.chen@exec.com</p>
                          <p className="text-[6px] text-slate-300">+44 7700 900123</p>
                          <p className="text-[6px] text-slate-300">London, UK</p>
                        </div>
                        <div className="space-y-1">
                          <h4 className="text-[7px] font-bold text-slate-500 uppercase tracking-widest border-b border-slate-700 pb-0.5">Expertise</h4>
                          <div className="flex flex-wrap gap-1">
                             <span className="bg-slate-800 px-1 py-0.5 text-[5px] rounded">Leadership</span>
                             <span className="bg-slate-800 px-1 py-0.5 text-[5px] rounded">Scrum</span>
                             <span className="bg-slate-800 px-1 py-0.5 text-[5px] rounded">Budgeting</span>
                             <span className="bg-slate-800 px-1 py-0.5 text-[5px] rounded">Scaling</span>
                          </div>
                        </div>
                        <div className="space-y-1">
                          <h4 className="text-[7px] font-bold text-slate-500 uppercase tracking-widest border-b border-slate-700 pb-0.5">Languages</h4>
                          <p className="text-[6px] text-slate-300">English (Native)</p>
                          <p className="text-[6px] text-slate-300">Mandarin (Fluent)</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex-1 p-5 flex flex-col gap-4">
                      <div className="space-y-0.5">
                        <h3 className="text-xl font-black text-gray-900 leading-none">MICHAEL CHEN</h3>
                        <p className="text-gray-500 font-bold text-[8px] uppercase tracking-tighter">Strategic Project Director</p>
                      </div>
                      <div className="h-0.5 w-full bg-slate-100"></div>
                      <div className="space-y-4">
                         <div className="space-y-1">
                            <h4 className="text-[8px] font-black text-slate-900 uppercase">Executive Profile</h4>
                            <p className="text-[7px] text-gray-600 leading-relaxed text-justify">Proven leader with 12+ years experience in driving operational excellence and digital transformation for Fortune 500 companies.</p>
                         </div>
                         <div className="space-y-3">
                            <h4 className="text-[8px] font-black text-slate-900 uppercase">Employment History</h4>
                            <div className="border-l-2 border-indigo-600 pl-2">
                              <p className="text-[9px] font-bold text-gray-800">Horizon Capital Partners</p>
                              <p className="text-[7px] text-indigo-600 italic">Global Director of Operations • 2018 - 2024</p>
                              <p className="text-[7px] text-gray-600 mt-1">Managed $50M yearly budget and 200+ employees across 5 countries.</p>
                            </div>
                            <div className="border-l-2 border-gray-200 pl-2">
                              <p className="text-[9px] font-bold text-gray-800">TechGrowth UK</p>
                              <p className="text-[7px] text-gray-500 italic">Senior Project Manager • 2014 - 2018</p>
                              <p className="text-[7px] text-gray-600 mt-1">Led the launch of 3 flagship products in the Fintech sector.</p>
                            </div>
                         </div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute bottom-4 right-4">
                       <span className="text-[8px] font-black text-slate-900 uppercase tracking-widest">Executive v4</span>
                  </div>
                </motion.div>

                {/* Template 4: Professional Academic */}
                <motion.div whileHover={{ scale: 1.05 }} className="relative group cursor-pointer">
                  <div className="absolute inset-0 bg-amber-600/5 rounded-2xl rotate-1 group-hover:rotate-0 transition-transform"></div>
                  <div className="relative bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden aspect-[210/297] p-5 flex flex-col gap-3">
                    <div className="text-center border-b-2 border-gray-900 pb-3">
                      <h3 className="text-xl font-bold text-gray-900 leading-none">DAVID WILSON, PHD</h3>
                      <p className="text-gray-500 text-[7px] mt-1 uppercase tracking-widest font-bold">Research Scientist • Chicago, IL</p>
                      <p className="text-[6px] text-gray-400 mt-0.5">david.wilson@academic.edu • scholar.google.com/wilson</p>
                    </div>
                    <div className="space-y-4">
                       <div className="space-y-1.5">
                          <h4 className="text-[8px] font-bold text-amber-600 uppercase border-b border-amber-100">Education & Fellowships</h4>
                          <div>
                            <p className="text-[8px] font-bold text-gray-800">PhD in Advanced Data Science</p>
                            <p className="text-[7px] text-gray-600">University of Chicago • 2020</p>
                            <p className="text-[6px] text-gray-400 italic">Thesis: "Neural Networks in Bio-Informatics"</p>
                          </div>
                          <div>
                            <p className="text-[8px] font-bold text-gray-800">Postdoctoral Research Fellow</p>
                            <p className="text-[7px] text-gray-600">Stanford AI Lab • 2020-2022</p>
                          </div>
                       </div>
                       <div className="space-y-1.5">
                          <h4 className="text-[8px] font-bold text-amber-600 uppercase border-b border-amber-100">Selected Publications</h4>
                          <div className="space-y-1">
                            <p className="text-[7px] text-gray-700 leading-tight">1. <span className="italic">Neural Networks in Healthcare</span>, Nature Machine Intelligence, 2022.</p>
                            <p className="text-[7px] text-gray-700 leading-tight">2. <span className="italic">AI Ethics and Global Policy</span>, Science Journal, 2021.</p>
                            <p className="text-[7px] text-gray-700 leading-tight">3. <span className="italic">Scaling Transformers for Biology</span>, IEEE Conference, 2020.</p>
                          </div>
                       </div>
                       <div className="space-y-1">
                          <h4 className="text-[8px] font-bold text-amber-600 uppercase border-b border-amber-100">Grants & Funding</h4>
                          <p className="text-[7px] text-gray-600 leading-tight">• NSF Career Grant ($500k) - 2023</p>
                          <p className="text-[7px] text-gray-600 leading-tight">• Gates Foundation Research Funding - 2021</p>
                       </div>
                    </div>
                    <div className="mt-auto flex justify-center">
                       <span className="text-[8px] font-black text-amber-600 uppercase tracking-widest">Academic Researcher</span>
                    </div>
                  </div>
                </motion.div>

              </div>
            </div>
          </section>

        {/* ENHANCED SPLIT SECTION */}
        <div className="mt-20 w-full max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            
            {/* Left: High-Definition Sharp Image */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="w-full lg:w-1/2 relative"
            >
              <div className="absolute -top-10 -left-10 w-64 h-64 bg-indigo-100/50 rounded-full blur-3xl"></div>
              <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white">
                <img 
                  src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1000&auto=format&fit=crop" 
                  alt="Approachable Professional" 
                  className="w-full h-[600px] object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
              </div>
            </motion.div>

            {/* Right: Project Specific Writing */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="w-full lg:w-1/2 space-y-8"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-indigo-50 text-indigo-600 text-sm font-bold">
                <Sparkles className="w-4 h-4" /> AI-Powered Platform
              </div>
              <h2 className="text-4xl md:text-6xl font-black text-gray-900 leading-[1.1]">
                Craft Your Future with <span className="text-indigo-600">AI Precision</span>
              </h2>
              <p className="text-gray-600 text-xl leading-relaxed">
                Our AI Resume Builder is engineered for the modern job market. Leveraging the power of Gemini AI, you can create a high-impact, professional resume in minutes that is guaranteed to pass through ATS filters with ease.
              </p>
              
              <ul className="space-y-4">
                {[
                  "Intelligent Content Generation via Gemini AI",
                  "Expert-Crafted ATS-Friendly Layouts",
                  "Real-time PDF Previews & Instant Downloads",
                  "Unified Dashboard for Multiple Resumes"
                ].map((text, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-700 font-medium">
                    <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center text-white">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    {text}
                  </li>
                ))}
              </ul>

              <div className="pt-4 flex flex-col sm:flex-row gap-4">
                <SignedOut>
                  <SignUpButton mode="modal">
                    <button className="px-10 py-5 bg-indigo-600 text-white rounded-2xl font-black text-lg hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 hover:-translate-y-1">
                      Start Building Now
                    </button>
                  </SignUpButton>
                </SignedOut>
                <SignedIn>
                  <Link to="/dashboard" className="px-10 py-5 bg-indigo-600 text-white rounded-2xl font-black text-lg hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 hover:-translate-y-1 flex items-center justify-center">
                    Go to Dashboard
                  </Link>
                </SignedIn>
                
                <a href="#templates-section" className="px-10 py-5 bg-white text-gray-900 border border-gray-200 rounded-2xl font-bold text-lg hover:bg-gray-50 transition-all hover:-translate-y-1 flex items-center justify-center">
                  Explore Templates
                </a>
              </div>
            </motion.div>
          </div>
        </div>

        {/* FEATURES SECTION (Original Grid) */}
        <section className="w-full py-24 bg-gray-50 border-t border-gray-100 mt-32">
          <div className="container mx-auto px-6 max-w-7xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight">Everything you need to <span className="text-indigo-600">Succeed</span></h2>
              <p className="text-gray-500 text-lg max-w-2xl mx-auto">Designed specifically for university students and professionals who want to stand out.</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <motion.div 
                whileHover={{ scale: 1.05, y: -10 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white hover:bg-indigo-50 border border-gray-100 hover:border-indigo-200 p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all cursor-pointer group"
              >
                <div className="w-12 h-12 rounded-xl bg-indigo-50 group-hover:bg-indigo-600 flex items-center justify-center mb-6 text-indigo-600 group-hover:text-white transition-colors duration-300">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-indigo-900 transition-colors">AI Text Generation</h3>
                <p className="text-gray-600 group-hover:text-indigo-800/80 leading-relaxed transition-colors">
                  Never stare at a blank page again. The Gemini AI engine creates tailored, professional content for your summary and experience bullet points automatically.
                </p>
              </motion.div>

              <motion.div 
                whileHover={{ scale: 1.05, y: -10 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white hover:bg-purple-50 border border-gray-100 hover:border-purple-200 p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all cursor-pointer group"
              >
                <div className="w-12 h-12 rounded-xl bg-purple-50 group-hover:bg-purple-600 flex items-center justify-center mb-6 text-purple-600 group-hover:text-white transition-colors duration-300">
                  <Layout className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-purple-900 transition-colors">Clean Templates</h3>
                <p className="text-gray-600 group-hover:text-purple-800/80 leading-relaxed transition-colors">
                  Our designs are built to pass Applicant Tracking Systems (ATS) while maintaining a gorgeous, structured format that human recruiters appreciate.
                </p>
              </motion.div>

              <motion.div 
                whileHover={{ scale: 1.05, y: -10 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white hover:bg-emerald-50 border border-gray-100 hover:border-emerald-200 p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all cursor-pointer group"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-50 group-hover:bg-emerald-600 flex items-center justify-center mb-6 text-emerald-600 group-hover:text-white transition-colors duration-300">
                  <Download className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-emerald-900 transition-colors">1-Click PDF Export</h3>
                <p className="text-gray-600 group-hover:text-emerald-800/80 leading-relaxed transition-colors">
                  Click 'Download' and instantly receive a perfectly formatted, high-resolution PDF document ready to be submitted to your dream job applications.
                </p>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* FAQ SECTION */}
        <section className="w-full py-24 bg-white">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">Frequently Asked Questions</h2>
              <p className="text-gray-500 text-xl">Everything you need to know about our AI Resume Builder.</p>
            </div>
            
            <div className="space-y-6">
              {[
                {
                  q: "Is this resume builder really free?",
                  a: "Yes! You can create, edit, and download your professional resume as a PDF completely for free. We believe everyone deserves a great career start without financial barriers."
                },
                {
                  q: "How does the AI content generation work?",
                  a: "We use the Google Gemini AI engine. When you provide your job title and some basic details, the AI analyzes thousands of top-tier resumes to suggest professional summaries and experience bullet points tailored to your role."
                },
                {
                  q: "Are the templates ATS-friendly?",
                  a: "Absolutely. All our templates are designed with Applicant Tracking Systems in mind. We use standard fonts and clear structures to ensure your resume gets parsed correctly by recruitment software."
                },
                {
                  q: "Can I download my resume in PDF format?",
                  a: "Yes, you can download your resume in high-quality PDF format with a single click. The PDF will be perfectly formatted and ready to upload to any job application portal."
                },
                {
                  q: "Do I need to create an account?",
                  a: "Yes, creating an account allows us to save your resumes securely. This way, you can come back anytime, update your details, and download new versions as your career grows."
                }
              ].map((item, idx) => (
                <motion.div 
                  key={idx}
                  initial={false}
                  className="border border-gray-100 rounded-[2rem] overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  <button 
                    className="w-full px-10 py-8 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                    onClick={() => {
                      const el = document.getElementById(`faq-ans-${idx}`);
                      const icon = document.getElementById(`faq-icon-${idx}`);
                      if (el.style.display === 'none') {
                        el.style.display = 'block';
                        icon.style.transform = 'rotate(180deg)';
                      } else {
                        el.style.display = 'none';
                        icon.style.transform = 'rotate(0deg)';
                      }
                    }}
                  >
                    <span className="text-xl font-bold text-gray-900">{item.q}</span>
                    <ChevronDown id={`faq-icon-${idx}`} className="w-6 h-6 text-indigo-600 transition-transform duration-300" />
                  </button>
                  <div id={`faq-ans-${idx}`} className="px-10 pb-8 text-gray-600 text-lg leading-relaxed" style={{ display: 'none' }}>
                    <div className="pt-2 border-t border-gray-50">
                      {item.a}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

      </main>
      
      <footer className="py-8 bg-white border-t border-gray-100 text-center">
        <p className="text-gray-400 font-medium text-sm">© 2026 AI Resume Builder. Final Year Project.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
