import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDropzone } from 'react-dropzone';
import { 
    UploadCloud, FileText, X, Sparkles, 
    Briefcase, CheckCircle2, AlertCircle, Loader2 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom'; 
import { analyzeResumeAPI } from '../services/analysis'; 

// @ts-ignore
import robot from '../assets/Adobe Express - file.png';

const AnalyzeResume = () => {
    const navigate = useNavigate();

    // --- States ---
    const [file, setFile] = useState<File | null>(null);
    const [jobTitle, setJobTitle] = useState(''); 
    const [jobDescription, setJobDescription] = useState('');
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        if (acceptedFiles[0]) {
            setFile(acceptedFiles[0]);
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'application/pdf': ['.pdf'] },
        multiple: false
    });

    const handleAnalyze = async () => {
        if (!file || !jobDescription || !jobTitle) {
            alert("Please provide a Resume, Job Title, and Job Description.");
            return;
        }
        setIsAnalyzing(true);
        try {
            const responseData = await analyzeResumeAPI(file, jobTitle, jobDescription);
            navigate('/result', { state: { analysisData: responseData } });
        } catch (error: any) {
            alert(error.response?.data?.message || "AI Analysis failed. Please try again later.");
        } finally {
            setIsAnalyzing(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#f8faff] -mt-8 -mx-8 relative overflow-hidden font-sans pb-16">
            
            {/* --- 1. THE EXACT PROFILE PAGE BACKGROUND (1:1 Copy) --- */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                {/* Vibrant Glow Blobs */}
                <div className="absolute top-[-5%] right-[-5%] w-[650px] h-[650px] bg-indigo-300/40 rounded-full blur-[120px]" />
                <div className="absolute bottom-[5%] left-[-10%] w-[750px] h-[750px] bg-blue-200/50 rounded-full blur-[100px]" />
                <div className="absolute top-[30%] left-[20%] w-[500px] h-[500px] bg-purple-200/40 rounded-full blur-[130px]" />
                
                {/* Bold Mesh Lines (SVG) with Gradients - EXACT SETTINGS FROM PROFILE */}
                <svg className="absolute w-full h-full opacity-60" viewBox="0 0 1400 1000" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <linearGradient id="boldMesh" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#4f46e5" stopOpacity="0.8" />
                            <stop offset="50%" stopColor="#9333ea" stopOpacity="0.6" />
                            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.4" />
                        </linearGradient>
                    </defs>
                    <g fill="none" stroke="url(#boldMesh)" strokeWidth="2.2">
                        {/* Primary Spirograph - Top Right */}
                        {[...Array(15)].map((_, i) => (
                            <circle key={`tr-${i}`} cx="1200" cy="200" r={100 + i * 55} opacity={0.7 - i * 0.04} />
                        ))}
                        {/* Secondary Spirograph - Center Left */}
                        {[...Array(12)].map((_, i) => (
                            <circle key={`cl-${i}`} cx="100" cy="600" r={80 + i * 50} opacity={0.6 - i * 0.05} />
                        ))}
                        {/* Strong Dynamic Swooshes */}
                        <path d="M-200,400 C300,800 900,100 1600,400" strokeWidth="3.5" opacity="0.4" />
                        <path d="M-200,500 C400,900 1000,200 1600,500" strokeWidth="2.5" opacity="0.3" />
                        <path d="M400,-100 Q800,500 400,1100" strokeWidth="1.5" opacity="0.2" />
                    </g>
                </svg>
            </div>

            {/* --- 2. MAIN CONTENT SECTION --- */}
            <div className="max-w-6xl mx-auto space-y-8 pb-10 relative z-10 pt-10 px-4">
                
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 px-2">
                    <div>
                        <h2 className="text-3xl font-black text-slate-800 tracking-tight">Analyze Resume</h2>
                        <p className="text-slate-500 font-medium mt-1 text-sm">Upload your PDF and JD to get instant AI feedback.</p>
                    </div>
                    <div className="flex items-center gap-2 bg-indigo-50 px-4 py-2 rounded-2xl border border-indigo-100 shadow-sm">
                        <Sparkles className="w-4 h-4 text-indigo-600" />
                        <span className="text-xs font-black text-indigo-600 uppercase tracking-widest">AI Powered Analysis</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    
                    {/* Left Side: Input Form */}
                    <div className="lg:col-span-8 space-y-6">
                        
                        <div className="bg-white p-8 rounded-[40px] border border-slate-200 shadow-xl shadow-slate-200/50 backdrop-blur-sm">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600">
                                    <FileText size={20} />
                                </div>
                                <h3 className="text-xl font-black text-slate-800 tracking-tight">Upload Resume</h3>
                            </div>

                            <div 
                                {...getRootProps()} 
                                className={`relative border-2 border-dashed rounded-[30px] p-10 transition-all cursor-pointer flex flex-col items-center justify-center
                                ${isDragActive ? 'border-indigo-500 bg-indigo-50/50' : 'border-slate-200 bg-slate-50/50 hover:bg-slate-50 hover:border-indigo-300'}`}
                            >
                                <input {...getInputProps()} />
                                <AnimatePresence mode='wait'>
                                    {!file ? (
                                        <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center">
                                            <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mx-auto mb-4 border border-slate-100">
                                                <UploadCloud className="w-8 h-8 text-indigo-500" />
                                            </div>
                                            <p className="text-slate-700 font-bold text-lg">Drag & Drop your resume</p>
                                            <p className="text-slate-400 text-sm font-medium mt-1">Supports PDF format only (Max 5MB)</p>
                                            <button className="mt-6 px-6 py-2.5 bg-indigo-600 text-white rounded-xl font-bold text-sm shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all">Browse Files</button>
                                        </motion.div>
                                    ) : (
                                        <motion.div key="file" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="w-full flex items-center justify-between bg-white p-4 rounded-2xl border border-indigo-100 shadow-sm">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center"><CheckCircle2 className="w-6 h-6 text-emerald-500" /></div>
                                                <div>
                                                    <p className="text-slate-800 font-bold text-sm truncate max-w-[200px]">{file.name}</p>
                                                    <p className="text-slate-400 text-xs">{(file.size / 1024 / 1024).toFixed(2)} MB • Ready</p>
                                                </div>
                                            </div>
                                            <button onClick={(e) => { e.stopPropagation(); setFile(null); }} className="p-2 hover:bg-red-50 text-slate-400 hover:text-red-500 rounded-lg transition-all"><X className="w-5 h-5" /></button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>

                        <div className="bg-white p-8 rounded-[40px] border border-slate-200 shadow-xl shadow-slate-200/50 backdrop-blur-sm">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600">
                                    <Briefcase size={20} />
                                </div>
                                <h3 className="text-xl font-black text-slate-800 tracking-tight">Target Job Title</h3>
                            </div>
                            <input 
                                type="text"
                                value={jobTitle}
                                onChange={(e) => setJobTitle(e.target.value)}
                                placeholder="e.g. Senior Full Stack Developer"
                                className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 px-6 text-slate-700 font-bold focus:bg-white focus:ring-4 focus:ring-blue-100 focus:border-blue-400 outline-none transition-all shadow-sm"
                            />
                        </div>

                        <div className="bg-white p-8 rounded-[40px] border border-slate-200 shadow-xl shadow-slate-200/50 backdrop-blur-sm">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600">
                                    <Sparkles size={20} />
                                </div>
                                <h3 className="text-xl font-black text-slate-800 tracking-tight">Job Description</h3>
                            </div>
                            <textarea 
                                value={jobDescription}
                                onChange={(e) => setJobDescription(e.target.value)}
                                placeholder="Paste the job requirements, responsibilities, and qualifications here..."
                                className="w-full h-48 bg-slate-50/50 border border-slate-200 rounded-[30px] p-6 text-slate-700 font-medium focus:bg-white focus:border-purple-400 outline-none transition-all resize-none placeholder:text-slate-400"
                            />
                        </div>

                        <motion.button
                            whileHover={!isAnalyzing ? { scale: 1.01 } : {}} 
                            whileTap={!isAnalyzing ? { scale: 0.99 } : {}}
                            disabled={isAnalyzing}
                            onClick={handleAnalyze}
                            className={`w-full py-5 rounded-[25px] font-black text-lg transition-all flex items-center justify-center gap-3 shadow-2xl
                            ${isAnalyzing ? 'bg-slate-200 text-slate-400 cursor-not-allowed' : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-indigo-200'}`}
                        >
                            {isAnalyzing ? (
                                <><Loader2 className="w-6 h-6 animate-spin" /> Analyzing with AI...</>
                            ) : (
                                <><Sparkles className="w-6 h-6" /> Optimize My Resume</>
                            )}
                        </motion.button>
                    </div>

                    {/* Right Side: Robot Panel */}
                    <div className="lg:col-span-4 space-y-6">
                        <div className="bg-gradient-to-b from-[#1e1b4b] to-[#4338ca] p-8 rounded-[40px] text-white overflow-hidden relative shadow-2xl min-h-[500px] flex flex-col items-center justify-center text-center">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-20 -mt-20" />
                            <motion.img 
                                src={robot} alt="AI Bot" 
                                animate={{ y: [0, -15, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className="w-full max-w-[280px] drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] mb-8 z-10"
                            />
                            <h4 className="text-2xl font-black mb-4 z-10 tracking-tight">Let's build your future.</h4>
                            <p className="text-indigo-100/80 font-medium text-sm z-10 leading-relaxed px-2">"I will scan your resume for 50+ ATS parameters and give you exact keywords to beat the algorithm."</p>
                            <div className="mt-8 grid grid-cols-2 gap-3 w-full z-10 px-2">
                                <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/10 text-center">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-indigo-300 mb-1">Accuracy</p>
                                    <p className="text-xl font-black">99.8%</p>
                                </div>
                                <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/10 text-center">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-indigo-300 mb-1">Params</p>
                                    <p className="text-xl font-black">50+</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-amber-50/80 backdrop-blur-sm border border-amber-100 p-6 rounded-[30px] flex gap-4 shadow-sm">
                            <AlertCircle className="w-6 h-6 text-amber-500 shrink-0" />
                            <div>
                                <p className="text-amber-800 font-bold text-sm uppercase tracking-widest mb-1 leading-none">Pro Tip</p>
                                <p className="text-amber-700/80 text-xs font-medium leading-relaxed mt-1">Make sure your PDF is not an image-only file. AI reads text better from standard PDF documents.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnalyzeResume;