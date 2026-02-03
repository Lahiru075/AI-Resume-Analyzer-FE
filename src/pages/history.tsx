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
        <div className="max-w-6xl mx-auto space-y-8 pb-10">
            
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
                                // Loading States
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
                                // Empty State
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
    );
};

export default History;