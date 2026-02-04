import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
    History as HistoryIcon, Search, ArrowUpRight, 
    Trash2, FileText, Calendar, Zap 
} from 'lucide-react';
import { getUserHistoryAPI } from '../services/analysis';

const History = () => {
    const navigate = useNavigate();
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchHistory();
    }, []);

    const fetchHistory = async () => {
        try {
            const data = await getUserHistoryAPI();
            setHistory(data);
        } catch (error) {
            console.error("Error fetching history:", error);
        } finally {
            setLoading(false);
        }
    };

    // Filter logic
    const filteredHistory = history.filter((item: any) => 
        item.jobTitle.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-[#f8faff] -mt-8 -mx-8 relative overflow-hidden font-sans pb-16">
            
            {/* --- 1. INTENSE FUTURISTIC BACKGROUND (Added to match Profile Page) --- */}
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

            {/* --- Main Content Section (Kept Original Styles) --- */}
            <div className="max-w-6xl mx-auto space-y-8 pb-10 relative z-10 pt-10 px-4">
                
                {/* --- Header Section --- */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 px-2">
                    <div>
                        <h2 className="text-3xl font-black text-slate-800 tracking-tight">Analysis History</h2>
                        <p className="text-slate-500 font-medium mt-1 text-sm">Keep track of all your past resume optimizations.</p>
                    </div>
                    
                    {/* Search Bar */}
                    <div className="relative w-full md:w-80 group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                        <input 
                            type="text"
                            placeholder="Search by job title..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-white border border-slate-200 rounded-2xl py-3 pl-11 pr-4 text-xs font-bold text-slate-700 focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500 outline-none transition-all shadow-sm"
                        />
                    </div>
                </div>

                {/* --- Table Section --- */}
                <div className="bg-white rounded-[40px] border border-slate-200 shadow-xl shadow-slate-200/50 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-slate-50/50 text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">
                                <tr>
                                    <th className="px-10 py-6">Target Job</th>
                                    <th className="px-10 py-6">File Name</th>
                                    <th className="px-10 py-6">Date</th>
                                    <th className="px-10 py-6">ATS Score</th>
                                    <th className="px-10 py-6 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 text-sm font-bold">
                                {loading ? (
                                    [1, 2, 3].map((i) => (
                                        <tr key={i} className="animate-pulse">
                                            <td colSpan={5} className="px-10 py-6 bg-slate-50/20" />
                                        </tr>
                                    ))
                                ) : filteredHistory.length > 0 ? (
                                    filteredHistory.map((item: any, i: number) => (
                                        <motion.tr 
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: i * 0.05 }}
                                            key={item._id} 
                                            className="hover:bg-indigo-50/30 transition-colors group"
                                        >
                                            <td className="px-10 py-6">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-600">
                                                        <FileText size={16} />
                                                    </div>
                                                    <span className="text-slate-800 font-extrabold">{item.jobTitle}</span>
                                                </div>
                                            </td>
                                            <td className="px-10 py-6 text-slate-400 font-medium truncate max-w-[150px]">
                                                {item.resumeFileName}
                                            </td>
                                            <td className="px-10 py-6 text-slate-400 font-medium">
                                                {new Date(item.createdAt).toLocaleDateString()}
                                            </td>
                                            <td className="px-10 py-6">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex-1 h-2 bg-slate-100 rounded-full min-w-[60px] overflow-hidden">
                                                        <div 
                                                            className={`h-full ${item.analysisResult.matchPercentage > 70 ? 'bg-emerald-500' : 'bg-amber-500'}`}
                                                            style={{ width: `${item.analysisResult.matchPercentage}%` }}
                                                        />
                                                    </div>
                                                    <span className={item.analysisResult.matchPercentage > 70 ? 'text-emerald-600' : 'text-amber-600'}>
                                                        {item.analysisResult.matchPercentage}%
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-10 py-6 text-right space-x-2">
                                                <button 
                                                    onClick={() => navigate('/result', { state: { analysisData: item } })}
                                                    className="p-2.5 bg-slate-50 text-slate-400 rounded-xl hover:bg-indigo-600 hover:text-white transition-all shadow-sm"
                                                    title="View Report"
                                                >
                                                    <ArrowUpRight size={18} />
                                                </button>
                                                <button 
                                                    className="p-2.5 bg-slate-50 text-slate-400 rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-sm"
                                                    title="Delete"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </td>
                                        </motion.tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={5} className="px-10 py-20 text-center">
                                            <div className="flex flex-col items-center">
                                                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                                                    <HistoryIcon className="text-slate-300" size={32} />
                                                </div>
                                                <p className="text-slate-400 font-bold text-lg">No history found</p>
                                                <button onClick={() => navigate('/analyze')} className="text-indigo-600 font-black mt-2 hover:underline">Start your first analysis</button>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default History;