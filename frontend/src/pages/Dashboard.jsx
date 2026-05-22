import React, { useState } from 'react';
import { useUser, UserButton } from '@clerk/clerk-react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, FileText, Trash2, Edit3, Sparkles, Clock, MoreVertical, UserCircle, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const Dashboard = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [resumes, setResumes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || 'http://localhost:1337';

  const fetchResumes = async () => {
    if (!user) return;
    try {
      setIsLoading(true);
      const email = user.primaryEmailAddress.emailAddress;
      const response = await fetch(`${STRAPI_URL}/api/resumes?filters[userEmail][$eq]=${email}&sort[0]=createdAt:desc`);
      const data = await response.json();
      if (data.data) {
        setResumes(data.data.map(item => ({
          id: item.resumeId,
          internalId: item.documentId || item.id,
          title: item.title,
          lastEdited: new Date(item.updatedAt).toLocaleDateString(),
          template: item.resumeData.templateId || 'Modern'
        })));
      }
    } catch (error) {
      console.error("Error fetching resumes:", error);
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    fetchResumes();
  }, [user]);

  const handleCreateNew = () => {
    navigate(`/builder`);
  };

  const handleDelete = async (resume) => {
    if (window.confirm(`Are you sure you want to delete "${resume.title}"?`)) {
      try {
        const response = await fetch(`${STRAPI_URL}/api/resumes/${resume.internalId}`, {
          method: 'DELETE'
        });
        if (response.ok) {
          fetchResumes();
        }
      } catch (error) {
        console.error("Delete failed:", error);
        alert("Failed to delete resume.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] font-sans">
      <header className="px-4 lg:px-8 py-4 lg:py-5 flex items-center justify-between bg-white border-b border-gray-100 sticky top-0 z-30 shadow-sm">
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2 lg:gap-3 hover:opacity-80 transition-opacity">
            <div className="bg-gradient-to-br from-primary to-blue-600 p-1.5 lg:p-2 rounded-lg lg:rounded-xl text-white shadow-md">
              <Sparkles className="h-3.5 w-3.5 lg:h-4 w-4" />
            </div>
            <span className="text-lg lg:text-xl font-extrabold tracking-tight text-gray-900">ResumeAI</span>
          </Link>
        </div>
        <div className="flex items-center gap-3 lg:gap-5">
          <span className="text-[10px] lg:text-sm font-bold uppercase tracking-wider text-gray-400 hidden sm:block">
            {user?.firstName ? `Hello, ${user.firstName}` : 'Dashboard'}
          </span>
          <UserButton afterSignOutUrl="/" appearance={{ elements: { avatarBox: "w-8 h-8 lg:w-10 lg:h-10 shadow-sm border border-gray-200" } }} />
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 max-w-7xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 lg:mb-10 gap-6">
          <div>
            <h1 className="text-3xl lg:text-4xl font-black tracking-tight text-gray-900 mb-2">My Resumes</h1>
            <p className="text-sm lg:text-base text-gray-500">Manage, edit, and download your tailored resumes.</p>
          </div>
          <button
            onClick={handleCreateNew}
            className="w-full sm:w-auto bg-black text-white px-8 py-4 lg:py-3 rounded-2xl lg:rounded-full font-bold hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 inline-flex items-center justify-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Create New Resume
          </button>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
            <p className="text-gray-500 font-medium">Loading your resumes...</p>
          </div>
        ) : resumes.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center p-16 bg-white rounded-3xl border border-dashed border-gray-300 text-center shadow-sm"
          >
            <div className="p-5 bg-blue-50 text-blue-500 rounded-full mb-6">
              <FileText className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">No resumes yet</h2>
            <p className="text-gray-500 mb-8 max-w-md text-lg">You haven't created any resumes yet. Start building your AI-powered professional resume now.</p>
            <button
              onClick={handleCreateNew}
              className="bg-primary text-white px-8 py-4 rounded-full font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/30 transform hover:-translate-y-1 inline-flex items-center gap-2 text-lg"
            >
              <Plus className="w-5 h-5" /> Start Building
            </button>
          </motion.div>
        ) : (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            <motion.div variants={itemVariants}>
              <div
                onClick={handleCreateNew}
                className="bg-primary/5 border-2 border-dashed border-primary/30 rounded-[2rem] h-full min-h-[200px] lg:min-h-[280px] flex flex-col items-center justify-center gap-4 cursor-pointer hover:bg-primary/10 hover:border-primary/50 transition-all group p-6"
              >
                <div className="bg-white p-4 rounded-full shadow-md text-primary group-hover:scale-110 transition-transform border border-primary/10">
                  <Plus className="w-8 h-8" />
                </div>
                <span className="font-black text-primary uppercase tracking-wider text-sm">Create New</span>
              </div>
            </motion.div>

            {resumes.map(resume => (
              <motion.div key={resume.id} variants={itemVariants} className="bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group relative overflow-hidden">
                <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-primary to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>

                <div className="p-6 flex-1">
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 group-hover:text-primary group-hover:bg-primary/10 transition-colors border border-gray-100">
                      <FileText className="w-6 h-6" />
                    </div>
                    <button className="text-gray-400 hover:text-gray-900 p-1 transition-colors">
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </div>
                  <h3 className="font-bold text-lg text-gray-900 leading-tight mb-2 line-clamp-2">{resume.title}</h3>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-gray-100 text-gray-600 text-xs font-semibold mb-4">
                    {resume.template} Template
                  </div>
                </div>
                <div className="px-6 py-4 bg-gray-50/50 flex flex-col gap-4 border-t border-gray-100 mt-auto">
                  <div className="flex items-center gap-1.5 text-[10px] lg:text-xs text-gray-500 font-bold uppercase tracking-wider">
                    <Clock className="w-3.5 h-3.5" /> {resume.lastEdited}
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-gray-200/60">
                    <Link to={`/builder/${resume.id}`} className="flex-1 text-center bg-black text-white text-sm font-black py-3 lg:py-2 rounded-xl hover:bg-gray-800 transition-all mr-2 shadow-sm">
                      Edit
                    </Link>
                    <button onClick={() => handleDelete(resume)} className="p-3 lg:p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors border border-gray-100 hover:border-red-100">
                      <Trash2 className="w-4 h-4 lg:w-4 lg:h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
