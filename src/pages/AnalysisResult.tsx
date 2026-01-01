import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
    Award, Target, AlertTriangle, Lightbulb, 
    ArrowLeft, Download, Share2, CheckCircle2, 
    XCircle, Sparkles, Zap 
} from 'lucide-react';

const AnalysisResult = () => {
    const location = useLocation();
    const navigate = useNavigate();
    
    // AnalyzeResume පිටුවෙන් එවපු Data ටික ලබාගැනීම
    const { analysisData } = location.state || {};

    // දත්ත නැත්නම් Dashboard එකට හරවා යැවීම
    if (!analysisData) {
        return (
            <div className="flex flex-col items-center justify-center h-[60vh] text-center">
                <AlertTriangle className="w-16 h-16 text-amber-500 mb-4" />
                <h2 className="text-2xl font-bold text-slate-800">No Result Found</h2>
                <p className="text-slate-500 mb-6">Please analyze a resume first to see the results.</p>
                <button onClick={() => navigate('/analyze')} className="bg-indigo-600 text-white px-6 py-3 rounded-2xl font-bold shadow-lg">
                    Go to Analyze
                </button>
            </div>
        );
    }

    const { analysisResult, jobTitle } = analysisData;

    return (
        <div className="max-w-6xl mx-auto space-y-8 pb-10">
            
            {/* --- Top Actions --- */}
            <div className="flex items-center justify-between px-2">
                <button 
                    onClick={() => navigate('/analyze')}
                    className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 font-bold transition-colors group"
                >
                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" /> Back to Analyze
                </button>
                <div className="flex gap-3">
                    <button className="p-3 bg-white border border-slate-200 rounded-2xl text-slate-600 hover:bg-slate-50 transition-all shadow-sm">
                        <Share2 className="w-5 h-5" />
                    </button>
                    <button className="flex items-center gap-2 bg-white border border-slate-200 px-5 py-3 rounded-2xl text-slate-800 font-bold hover:bg-slate-50 transition-all shadow-sm">
                        <Download className="w-5 h-5" /> Export PDF
                    </button>
                </div>
            </div>

            {/* --- Hero Section: Score & Summary --- */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Score Card */}
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                    className="lg:col-span-4 bg-white p-10 rounded-[40px] border border-slate-200 shadow-xl shadow-slate-200/50 flex flex-col items-center justify-center text-center relative overflow-hidden"
                >
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-500 to-purple-500" />
                    <h3 className="text-slate-500 font-black uppercase tracking-[0.2em] text-xs mb-8">ATS Match Score</h3>
                    
                    <div className="relative flex items-center justify-center mb-6">
                        {/* Circular Progress Effect */}
                        <svg className="w-48 h-48 transform -rotate-90">
                            <circle cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-slate-100" />
                            <motion.circle 
                                cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="12" fill="transparent" 
                                strokeDasharray={553} 
                                initial={{ strokeDashoffset: 553 }}
                                animate={{ strokeDashoffset: 553 - (553 * analysisResult.matchPercentage) / 100 }}
                                transition={{ duration: 1.5, ease: "easeOut" }}
                                className="text-indigo-600" 
                            />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-5xl font-black text-slate-800">{analysisResult.matchPercentage}%</span>
                            <span className="text-[10px] font-black text-indigo-500 uppercase tracking-widest mt-1">Excellent</span>
                        </div>
                    </div>
                    <p className="text-slate-400 text-sm font-medium">Targeting: <span className="text-slate-800 font-bold">{jobTitle}</span></p>
                </motion.div>

                {/* AI Summary Card */}
                <motion.div 
                    initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                    className="lg:col-span-8 bg-[#1e293b] p-10 rounded-[40px] text-white relative overflow-hidden flex flex-col justify-center"
                >
                    <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -mr-20 -mt-20" />
                    <div className="flex items-center gap-2 mb-4 text-indigo-400">
                        <Sparkles className="w-5 h-5" />
                        <span className="text-xs font-black uppercase tracking-widest">AI Performance Review</span>
                    </div>
                    <h2 className="text-3xl font-black mb-4 tracking-tight">Professional Summary</h2>
                    <p className="text-slate-300 text-lg leading-relaxed font-medium italic">
                        "{analysisResult.overallSummary}"
                    </p>
                </motion.div>
            </div>

            {/* --- Missing Keywords Section --- */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                className="bg-white p-8 rounded-[40px] border border-slate-200 shadow-xl shadow-slate-200/50"
            >
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center text-amber-600">
                        <Target size={20} />
                    </div>
                    <h3 className="text-xl font-black text-slate-800 tracking-tight">Missing Keywords</h3>
                </div>
                <div className="flex flex-wrap gap-3">
                    {analysisResult.missingKeywords.map((kw: string, i: number) => (
                        <span key={i} className="bg-slate-50 border border-slate-200 px-4 py-2 rounded-xl text-sm font-bold text-slate-600 flex items-center gap-2">
                            <Zap className="w-3 h-3 text-amber-500 fill-amber-500" /> {kw}
                        </span>
                    ))}
                </div>
            </motion.div>

            {/* --- Strengths, Weaknesses & Tips --- */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                
                {/* Strengths */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                    className="bg-white p-8 rounded-[40px] border border-slate-200 shadow-lg shadow-slate-200/30"
                >
                    <div className="flex items-center gap-3 mb-6 text-emerald-600">
                        <CheckCircle2 size={24} />
                        <h4 className="font-black uppercase tracking-widest text-xs">Strengths</h4>
                    </div>
                    <ul className="space-y-4">
                        {analysisResult.strengths.map((item: string, i: number) => (
                            <li key={i} className="text-sm font-bold text-slate-600 flex gap-3">
                                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-1.5 shrink-0" /> {item}
                            </li>
                        ))}
                    </ul>
                </motion.div>

                {/* Weaknesses */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
                    className="bg-white p-8 rounded-[40px] border border-slate-200 shadow-lg shadow-slate-200/30"
                >
                    <div className="flex items-center gap-3 mb-6 text-red-500">
                        <XCircle size={24} />
                        <h4 className="font-black uppercase tracking-widest text-xs">Weaknesses</h4>
                    </div>
                    <ul className="space-y-4">
                        {analysisResult.weaknesses.map((item: string, i: number) => (
                            <li key={i} className="text-sm font-bold text-slate-600 flex gap-3">
                                <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-1.5 shrink-0" /> {item}
                            </li>
                        ))}
                    </ul>
                </motion.div>

                {/* AI Improvement Tips */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
                    className="bg-indigo-600 p-8 rounded-[40px] text-white shadow-xl shadow-indigo-200"
                >
                    <div className="flex items-center gap-3 mb-6">
                        <Lightbulb size={24} className="text-indigo-200" />
                        <h4 className="font-black uppercase tracking-widest text-xs">AI Tips to Improve</h4>
                    </div>
                    <ul className="space-y-4">
                        {analysisResult.improvementTips.map((item: string, i: number) => (
                            <li key={i} className="text-sm font-bold text-indigo-50 flex gap-3">
                                <div className="w-1.5 h-1.5 bg-indigo-300 rounded-full mt-1.5 shrink-0" /> {item}
                            </li>
                        ))}
                    </ul>
                </motion.div>

            </div>
        </div>
    );
};

export default AnalysisResult;