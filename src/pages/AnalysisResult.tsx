// import React from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import {
//     Award, Target, AlertTriangle, Lightbulb,
//     ArrowLeft, Download, Share2, CheckCircle2,
//     XCircle, Sparkles, Zap
// } from 'lucide-react';
// import { toPng } from 'html-to-image';
// import jsPDF from 'jspdf';


// const AnalysisResult = () => {
//     const location = useLocation();
//     const navigate = useNavigate();

//     const { analysisData } = location.state || {};

//     if (!analysisData) {
//         return (
//             <div className="flex flex-col items-center justify-center h-[60vh] text-center">
//                 <AlertTriangle className="w-16 h-16 text-amber-500 mb-4" />
//                 <h2 className="text-2xl font-bold text-slate-800">No Result Found</h2>
//                 <p className="text-slate-500 mb-6">Please analyze a resume first to see the results.</p>
//                 <button onClick={() => navigate('/analyze')} className="bg-indigo-600 text-white px-6 py-3 rounded-2xl font-bold shadow-lg">
//                     Go to Analyze
//                 </button>
//             </div>
//         );
//     }

//     const { analysisResult, jobTitle } = analysisData;



//     const exportPDF = async () => {
//         const element = document.getElementById('analysis-report');
//         if (!element) return;

//         try {
//             const dataUrl = await toPng(element, {
//                 cacheBust: true,
//                 pixelRatio: 2, 
//                 backgroundColor: '#f8fafc' 
//             });

//             const pdf = new jsPDF('p', 'px', 'a4'); 

//             const imgProps = pdf.getImageProperties(dataUrl);
//             const pdfWidth = pdf.internal.pageSize.getWidth();

//             const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

//             const finalPdf = new jsPDF({
//                 orientation: 'p',
//                 unit: 'px',
//                 format: [pdfWidth, pdfHeight] 
//             });

//             finalPdf.addImage(dataUrl, 'PNG', 0, 0, pdfWidth, pdfHeight);
//             finalPdf.save(`Resume_Analysis.pdf`);

//         } catch (err) {
//             console.error('PDF Export Error:', err);
//         }
//     };


//     return (
//         <div className="max-w-6xl mx-auto space-y-8 pb-10">

//             {/* --- Top Actions --- */}
//             <div className="flex items-center justify-between px-2">
//                 <button
//                     onClick={() => navigate('/analyze')}
//                     className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 font-bold transition-colors group"
//                 >
//                     <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" /> Back to Analyze
//                 </button>
//                 <div className="flex gap-3">
//                     <button className="p-3 bg-white border border-slate-200 rounded-2xl text-slate-600 hover:bg-slate-50 transition-all shadow-sm">
//                         <Share2 className="w-5 h-5" />
//                     </button>
//                     <button
//                         className="flex items-center gap-2 bg-white border border-slate-200 px-5 py-3 rounded-2xl text-slate-800 font-bold hover:bg-slate-50 transition-all shadow-sm"
//                         onClick={exportPDF}>

//                         <Download className="w-5 h-5" /> Export PDF
//                     </button>
//                 </div>
//             </div>

//             <div id="analysis-report" className="space-y-8 p-4 bg-slate-50 rounded-[40px]">

//                 {/* --- Hero Section: Score & Summary --- */}
//                 <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

//                     {/* Score Card */}
//                     <motion.div
//                         initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
//                         className="lg:col-span-4 bg-white p-10 rounded-[40px] border border-slate-200 shadow-xl shadow-slate-200/50 flex flex-col items-center justify-center text-center relative overflow-hidden"
//                     >
//                         <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-500 to-purple-500" />
//                         <h3 className="text-slate-500 font-black uppercase tracking-[0.2em] text-xs mb-8">ATS Match Score</h3>

//                         <div className="relative flex items-center justify-center mb-6">
//                             {/* Circular Progress Effect */}
//                             <svg className="w-48 h-48 transform -rotate-90">
//                                 <circle cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-slate-100" />
//                                 <motion.circle
//                                     cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="12" fill="transparent"
//                                     strokeDasharray={553}
//                                     initial={{ strokeDashoffset: 553 }}
//                                     animate={{ strokeDashoffset: 553 - (553 * analysisResult.matchPercentage) / 100 }}
//                                     transition={{ duration: 1.5, ease: "easeOut" }}
//                                     className="text-indigo-600"
//                                 />
//                             </svg>
//                             <div className="absolute inset-0 flex flex-col items-center justify-center">
//                                 <span className="text-5xl font-black text-slate-800">{analysisResult.matchPercentage}%</span>
//                                 <span className="text-[10px] font-black text-indigo-500 uppercase tracking-widest mt-1">Excellent</span>
//                             </div>
//                         </div>
//                         <p className="text-slate-400 text-sm font-medium">Targeting: <span className="text-slate-800 font-bold">{jobTitle}</span></p>
//                     </motion.div>

//                     {/* AI Summary Card */}
//                     <motion.div
//                         initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
//                         className="lg:col-span-8 bg-[#1e293b] p-10 rounded-[40px] text-white relative overflow-hidden flex flex-col justify-center"
//                     >
//                         <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -mr-20 -mt-20" />
//                         <div className="flex items-center gap-2 mb-4 text-indigo-400">
//                             <Sparkles className="w-5 h-5" />
//                             <span className="text-xs font-black uppercase tracking-widest">AI Performance Review</span>
//                         </div>
//                         <h2 className="text-3xl font-black mb-4 tracking-tight">Professional Summary</h2>
//                         <p className="text-slate-300 text-lg leading-relaxed font-medium italic">
//                             "{analysisResult.overallSummary}"
//                         </p>
//                     </motion.div>
//                 </div>


//                 {/* --- Missing Keywords Section --- */}
//                 <motion.div
//                     initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
//                     className="bg-white p-8 rounded-[40px] border border-slate-200 shadow-xl shadow-slate-200/50"
//                 >
//                     <div className="flex items-center gap-3 mb-6">
//                         <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center text-amber-600">
//                             <Target size={20} />
//                         </div>
//                         <h3 className="text-xl font-black text-slate-800 tracking-tight">Missing Keywords</h3>
//                     </div>
//                     <div className="flex flex-wrap gap-3">
//                         {analysisResult.missingKeywords.map((kw: string, i: number) => (
//                             <span key={i} className="bg-slate-50 border border-slate-200 px-4 py-2 rounded-xl text-sm font-bold text-slate-600 flex items-center gap-2">
//                                 <Zap className="w-3 h-3 text-amber-500 fill-amber-500" /> {kw}
//                             </span>
//                         ))}
//                     </div>
//                 </motion.div>

//                 {/* --- Strengths, Weaknesses & Tips --- */}
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

//                     {/* Strengths */}
//                     <motion.div
//                         initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
//                         className="bg-white p-8 rounded-[40px] border border-slate-200 shadow-lg shadow-slate-200/30"
//                     >
//                         <div className="flex items-center gap-3 mb-6 text-emerald-600">
//                             <CheckCircle2 size={24} />
//                             <h4 className="font-black uppercase tracking-widest text-xs">Strengths</h4>
//                         </div>
//                         <ul className="space-y-4">
//                             {analysisResult.strengths.map((item: string, i: number) => (
//                                 <li key={i} className="text-sm font-bold text-slate-600 flex gap-3">
//                                     <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-1.5 shrink-0" /> {item}
//                                 </li>
//                             ))}
//                         </ul>
//                     </motion.div>

//                     {/* Weaknesses */}
//                     <motion.div
//                         initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
//                         className="bg-white p-8 rounded-[40px] border border-slate-200 shadow-lg shadow-slate-200/30"
//                     >
//                         <div className="flex items-center gap-3 mb-6 text-red-500">
//                             <XCircle size={24} />
//                             <h4 className="font-black uppercase tracking-widest text-xs">Weaknesses</h4>
//                         </div>
//                         <ul className="space-y-4">
//                             {analysisResult.weaknesses.map((item: string, i: number) => (
//                                 <li key={i} className="text-sm font-bold text-slate-600 flex gap-3">
//                                     <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-1.5 shrink-0" /> {item}
//                                 </li>
//                             ))}
//                         </ul>
//                     </motion.div>

//                     {/* AI Improvement Tips */}
//                     <motion.div
//                         initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
//                         className="bg-indigo-600 p-8 rounded-[40px] text-white shadow-xl shadow-indigo-200"
//                     >
//                         <div className="flex items-center gap-3 mb-6">
//                             <Lightbulb size={24} className="text-indigo-200" />
//                             <h4 className="font-black uppercase tracking-widest text-xs">AI Tips to Improve</h4>
//                         </div>
//                         <ul className="space-y-4">
//                             {analysisResult.improvementTips.map((item: string, i: number) => (
//                                 <li key={i} className="text-sm font-bold text-indigo-50 flex gap-3">
//                                     <div className="w-1.5 h-1.5 bg-indigo-300 rounded-full mt-1.5 shrink-0" /> {item}
//                                 </li>
//                             ))}
//                         </ul>
//                     </motion.div>

//                 </div>
//             </div>
//         </div>
//     );
// };

// export default AnalysisResult;


import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    Award, Target, AlertTriangle, Lightbulb,
    ArrowLeft, Download, Share2, CheckCircle2,
    XCircle, Sparkles, Zap
} from 'lucide-react';
import { toPng } from 'html-to-image';
import jsPDF from 'jspdf';


const AnalysisResult = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const { analysisData } = location.state || {};

    if (!analysisData) {
        return (
            <div className="min-h-screen bg-[#f8faff] flex flex-col items-center justify-center text-center p-6">
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

    const exportPDF = async () => {
        const element = document.getElementById('analysis-report');
        if (!element) return;

        try {
            const dataUrl = await toPng(element, {
                cacheBust: true,
                pixelRatio: 2, 
                backgroundColor: '#f8fafc' 
            });

            const pdf = new jsPDF('p', 'px', 'a4'); 

            const imgProps = pdf.getImageProperties(dataUrl);
            const pdfWidth = pdf.internal.pageSize.getWidth();

            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

            const finalPdf = new jsPDF({
                orientation: 'p',
                unit: 'px',
                format: [pdfWidth, pdfHeight] 
            });

            finalPdf.addImage(dataUrl, 'PNG', 0, 0, pdfWidth, pdfHeight);
            finalPdf.save(`Resume_Analysis.pdf`);

        } catch (err) {
            console.error('PDF Export Error:', err);
        }
    };


    return (
        <div className="min-h-screen bg-[#f8faff] -mt-8 -mx-8 relative overflow-hidden font-sans pb-16">
            
            {/* --- 1. INTENSE FUTURISTIC BACKGROUND (Added to match the System Theme) --- */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                {/* Vibrant Glow Blobs */}
                <div className="absolute top-[-5%] right-[-5%] w-[650px] h-[650px] bg-indigo-300/40 rounded-full blur-[120px]" />
                <div className="absolute bottom-[5%] left-[-10%] w-[750px] h-[750px] bg-blue-200/50 rounded-full blur-[100px]" />
                <div className="absolute top-[30%] left-[20%] w-[500px] h-[500px] bg-purple-200/40 rounded-full blur-[130px]" />
                
                {/* Bold Mesh Lines (SVG) with Gradients */}
                <svg className="absolute w-full h-full opacity-60" viewBox="0 0 1400 1000" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <linearGradient id="boldMesh" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#4f46e5" stopOpacity="0.8" />
                            <stop offset="50%" stopColor="#9333ea" stopOpacity="0.6" />
                            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.4" />
                        </linearGradient>
                    </defs>
                    <g fill="none" stroke="url(#boldMesh)" strokeWidth="2.2">
                        {[...Array(15)].map((_, i) => (
                            <circle key={`tr-${i}`} cx="1200" cy="200" r={100 + i * 55} opacity={0.7 - i * 0.04} />
                        ))}
                        {[...Array(12)].map((_, i) => (
                            <circle key={`cl-${i}`} cx="100" cy="600" r={80 + i * 50} opacity={0.6 - i * 0.05} />
                        ))}
                        <path d="M-200,400 C300,800 900,100 1600,400" strokeWidth="3.5" opacity="0.4" />
                        <path d="M-200,500 C400,900 1000,200 1600,500" strokeWidth="2.5" opacity="0.3" />
                        <path d="M400,-100 Q800,500 400,1100" strokeWidth="1.5" opacity="0.2" />
                    </g>
                </svg>
            </div>

            {/* --- 2. MAIN CONTENT AREA (Original Logic & Spacing Preserved) --- */}
            <div className="max-w-6xl mx-auto space-y-8 pb-10 relative z-10 pt-10 px-4">

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
                        <button
                            className="flex items-center gap-2 bg-white border border-slate-200 px-5 py-3 rounded-2xl text-slate-800 font-bold hover:bg-slate-50 transition-all shadow-sm"
                            onClick={exportPDF}>

                            <Download className="w-5 h-5" /> Export PDF
                        </button>
                    </div>
                </div>

                <div id="analysis-report" className="space-y-8 p-4 bg-slate-50/50 backdrop-blur-sm rounded-[40px]">

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
                            {analysisResult.missingKeywords.map((kw : any, i: any) => (
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
                                {analysisResult.strengths.map((item : any, i: any) => (
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
                                {analysisResult.weaknesses.map((item : any, i : any) => (
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
                                {analysisResult.improvementTips.map((item : any, i : any) => (
                                    <li key={i} className="text-sm font-bold text-indigo-50 flex gap-3">
                                        <div className="w-1.5 h-1.5 bg-indigo-300 rounded-full mt-1.5 shrink-0" /> {item}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnalysisResult;