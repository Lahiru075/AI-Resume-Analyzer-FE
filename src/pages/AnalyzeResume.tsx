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

    // File Drop Handler
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
        // 1. Validation
        if (!file || !jobDescription || !jobTitle) {
            alert("Please provide a Resume, Job Title, and Job Description.");
            return;
        }

        setIsAnalyzing(true);

        try {

            const responseData = await analyzeResumeAPI(file, jobTitle, jobDescription);

            console.log("Analysis Success:", responseData);

            navigate('/result', { state: { analysisData: responseData } });

        } catch (error: any) {
            console.error("Analysis Error:", error);
            alert(error.response?.data?.message || "AI Analysis failed. Please try again later.");
        } finally {
            setIsAnalyzing(false);
        }
    };

    return (
        <div className="max-w-6xl mx-auto space-y-8 pb-10">
            
            {/* --- Header Section --- */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 px-2">
                <div>
                    <h2 className="text-3xl font-black text-slate-800 tracking-tight">Analyze Resume</h2>
                    <p className="text-slate-500 font-medium mt-1 text-sm">Upload your PDF and JD to get instant AI feedback.</p>
                </div>
                <div className="flex items-center gap-2 bg-indigo-50 px-4 py-2 rounded-2xl border border-indigo-100">
                    <Sparkles className="w-4 h-4 text-indigo-600" />
                    <span className="text-xs font-black text-indigo-600 uppercase tracking-widest">AI Powered Analysis</span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* --- Left Side: Input Form --- */}
                <div className="lg:col-span-8 space-y-6">
                    
                    {/* 1. PDF Upload Area */}
                    <div className="bg-white p-8 rounded-[40px] border border-slate-200 shadow-xl shadow-slate-200/50">
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
                                    <motion.div 
                                        key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                        className="text-center"
                                    >
                                        <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mx-auto mb-4 border border-slate-100">
                                            <UploadCloud className="w-8 h-8 text-indigo-500" />
                                        </div>
                                        <p className="text-slate-700 font-bold text-lg">Drag & Drop your resume</p>
                                        <p className="text-slate-400 text-sm font-medium mt-1">Supports PDF format only (Max 5MB)</p>
                                        <button className="mt-6 px-6 py-2.5 bg-indigo-600 text-white rounded-xl font-bold text-sm shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all">
                                            Browse Files
                                        </button>
                                    </motion.div>
                                ) : (
                                    <motion.div 
                                        key="file" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                                        className="w-full flex items-center justify-between bg-white p-4 rounded-2xl border border-indigo-100 shadow-sm"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center">
                                                <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                                            </div>
                                            <div>
                                                <p className="text-slate-800 font-bold text-sm truncate max-w-[200px]">{file.name}</p>
                                                <p className="text-slate-400 text-xs">{(file.size / 1024 / 1024).toFixed(2)} MB • Ready to analyze</p>
                                            </div>
                                        </div>
                                        <button 
                                            onClick={(e) => { e.stopPropagation(); setFile(null); }}
                                            className="p-2 hover:bg-red-50 text-slate-400 hover:text-red-500 rounded-lg transition-all"
                                        >
                                            <X className="w-5 h-5" />
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* 2. Job Title Input */}
                    <div className="bg-white p-8 rounded-[40px] border border-slate-200 shadow-xl shadow-slate-200/50">
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

                    {/* 3. Job Description Input */}
                    <div className="bg-white p-8 rounded-[40px] border border-slate-200 shadow-xl shadow-slate-200/50">
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
                            className="w-full h-48 bg-slate-50/50 border border-slate-200 rounded-[30px] p-6 text-slate-700 font-medium focus:bg-white focus:ring-4 focus:ring-purple-100 focus:border-purple-400 outline-none transition-all resize-none placeholder:text-slate-400"
                        />
                    </div>

                    {/* 4. Submit Button */}
                    <motion.button
                        whileHover={!isAnalyzing ? { scale: 1.01 } : {}} 
                        whileTap={!isAnalyzing ? { scale: 0.99 } : {}}
                        disabled={isAnalyzing}
                        onClick={handleAnalyze}
                        className={`w-full py-5 rounded-[25px] font-black text-lg transition-all flex items-center justify-center gap-3 shadow-2xl
                        ${isAnalyzing ? 'bg-slate-200 text-slate-400 cursor-not-allowed' : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-indigo-200 hover:shadow-indigo-300'}`}
                    >
                        {isAnalyzing ? (
                            <><Loader2 className="w-6 h-6 animate-spin" /> Analyzing with AI...</>
                        ) : (
                            <><Sparkles className="w-6 h-6" /> Optimize My Resume</>
                        )}
                    </motion.button>
                </div>

                {/* --- Right Side: Robot Panel --- */}
                <div className="lg:col-span-4 space-y-6">
                    <div className="bg-gradient-to-b from-[#1e1b4b] to-[#4338ca] p-8 rounded-[40px] text-white overflow-hidden relative shadow-2xl min-h-[500px] flex flex-col items-center justify-center text-center">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-20 -mt-20" />
                        
                        <motion.img 
                            src={robot} alt="AI Bot" 
                            animate={{ y: [0, -15, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="w-full max-w-[280px] drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] mb-8 z-10"
                        />
                        
                        <h4 className="text-2xl font-black mb-4 z-10 tracking-tight text-white">Let's build your future.</h4>
                        <p className="text-indigo-100/80 font-medium text-sm z-10 leading-relaxed px-2">
                            "I will scan your resume for 50+ ATS parameters and give you exact keywords to beat the algorithm."
                        </p>

                        <div className="mt-8 grid grid-cols-2 gap-3 w-full z-10 px-2">
                            <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/10 text-center">
                                <p className="text-[10px] font-black uppercase tracking-widest text-indigo-300 mb-1">Accuracy</p>
                                <p className="text-xl font-black">99.8%</p>
                            </div>
                            <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/10 text-center">
                                <p className="text-[10px] font-black uppercase tracking-widest text-indigo-300 mb-1">Parameters</p>
                                <p className="text-xl font-black">50+</p>
                            </div>
                        </div>
                    </div>

                    {/* Pro Tip Card */}
                    <div className="bg-amber-50 border border-amber-100 p-6 rounded-[30px] flex gap-4">
                        <AlertCircle className="w-6 h-6 text-amber-500 shrink-0" />
                        <div>
                            <p className="text-amber-800 font-bold text-sm uppercase tracking-widest mb-1 leading-none">Pro Tip</p>
                            <p className="text-amber-700/80 text-xs font-medium leading-relaxed mt-1">
                                Make sure your PDF is not an image-only file. AI reads text better from standard PDF documents.
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default AnalyzeResume;