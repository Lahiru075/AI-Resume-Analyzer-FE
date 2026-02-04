import React from 'react';
import { motion } from 'framer-motion';
import { FileText, TrendingUp, CheckCircle, Clock, Plus, ArrowUpRight, Sparkles, LayoutDashboard } from 'lucide-react';
import { useAppSelector } from '../app/hooks';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const { user } = useAppSelector((state) => state.auth);
    const navigate = useNavigate();

    const stats = [
        { label: 'Analyses Done', value: '08', icon: FileText, color: 'text-blue-600', bg: 'bg-blue-50' },
        { label: 'Avg Match', value: '84%', icon: TrendingUp, color: 'text-indigo-600', bg: 'bg-indigo-50' },
        { label: 'Skills Found', value: '112', icon: CheckCircle, color: 'text-emerald-600', bg: 'bg-emerald-50' },
        { label: 'Days Active', value: '14', icon: Clock, color: 'text-blue-600', bg: 'bg-blue-50' },
    ];

    return (
        <div className="min-h-screen bg-[#f8faff] -mt-8 -mx-8 relative overflow-hidden font-sans pb-16">
            
            {/* --- 1. THE CONSISTENT LIGHT BACKGROUND (Matches Profile/Analyze) --- */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-5%] right-[-5%] w-[650px] h-[650px] bg-indigo-300/40 rounded-full blur-[120px]" />
                <div className="absolute bottom-[5%] left-[-10%] w-[750px] h-[750px] bg-blue-200/50 rounded-full blur-[100px]" />
                
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
                    </g>
                </svg>
            </div>

            <div className="max-w-[1500px] mx-auto px-10 py-10 relative z-10 space-y-8">

                {/* --- 2. COMPACT LIGHT WELCOME BANNER --- */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative rounded-[40px] p-10 bg-gradient-to-br from-[#1e40af] via-[#2563eb] to-[#4f46e5] text-white shadow-[0_30px_70px_-20px_rgba(30,58,138,0.35)] overflow-hidden border border-white/10"
                >
                    <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-[80px] -mr-32 -mt-32" />
                    
                    <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="space-y-3">
                            <div className="flex items-center gap-2 text-blue-200 font-black uppercase tracking-[0.3em] text-[10px] justify-center md:justify-start">
                                <Sparkles size={14} /> AI Hub Active
                            </div>
                            <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-none text-center md:text-left">
                                Hello, {user?.name?.split(' ')[0] || 'User'}! 👋
                            </h2>
                            <p className="text-blue-100 text-lg font-medium max-w-lg opacity-80 leading-relaxed text-center md:text-left">
                                Your career command center is ready. Let's optimize something great today.
                            </p>
                        </div>
                        <button
                            onClick={() => navigate('/analyze')}
                            className="bg-white text-[#1e40af] font-black px-8 py-4 rounded-2xl flex items-center gap-3 hover:bg-blue-50 transition-all shadow-xl active:scale-95 group"
                        >
                            <Plus size={20} className="group-hover:rotate-90 transition-transform duration-300" />
                            New Analysis
                        </button>
                    </div>
                </motion.div>

                {/* --- 3. SMALL COMPACT STATS GRID --- */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-1">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className="bg-white/80 backdrop-blur-xl border border-white p-6 rounded-[35px] shadow-xl shadow-blue-100/20 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group cursor-default"
                        >
                            <div className="flex items-center gap-4">
                                <div className={`${stat.bg} ${stat.color} w-12 h-12 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-sm`}>
                                    <stat.icon size={22} />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">{stat.label}</p>
                                    <h4 className="text-2xl font-black text-slate-800 tracking-tight mt-1">{stat.value}</h4>
                                </div>
                                <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                                    <ArrowUpRight size={16} className="text-blue-500" />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* --- 4. RECENT ACTIVITY SECTION --- */}
                <div className="bg-white/80 backdrop-blur-3xl rounded-[45px] border border-white shadow-2xl shadow-blue-100/30 overflow-hidden">
                    <div className="p-8 md:p-10 border-b border-slate-50 flex justify-between items-center bg-slate-50/40">
                        <div>
                            <h3 className="text-2xl font-black text-slate-800 tracking-tight">Recent Insights</h3>
                            <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mt-2">Latest performance reports</p>
                        </div>
                        <button 
                            onClick={() => navigate('/history')} 
                            className="text-xs font-black text-blue-600 hover:text-blue-800 flex items-center gap-2 group transition-all"
                        >
                            View All <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </button>
                    </div>

                    <div className="overflow-x-auto px-4 pb-4">
                        <table className="w-full text-left">
                            <thead className="bg-slate-50/50 text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">
                                <tr>
                                    <th className="px-8 py-6">Target Role</th>
                                    <th className="px-8 py-6 text-center">Date</th>
                                    <th className="px-8 py-6 text-center">ATS Score</th>
                                    <th className="px-8 py-6 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50 text-sm font-bold">
                                {[
                                    { job: 'Frontend Developer', date: '30 Dec, 2025', score: '92', color: 'bg-emerald-500', text: 'text-emerald-600' },
                                    { job: 'Backend Engineer', date: '28 Dec, 2025', score: '74', color: 'bg-blue-600', text: 'text-blue-600' },
                                    { job: 'Full Stack Dev', date: '25 Dec, 2025', score: '61', color: 'bg-indigo-500', text: 'text-indigo-600' },
                                ].map((row, i) => (
                                    <tr key={i} className="hover:bg-blue-50/30 transition-colors group">
                                        <td className="px-8 py-6 text-slate-800 font-black">{row.job}</td>
                                        <td className="px-8 py-6 text-slate-400 font-bold text-center">{row.date}</td>
                                        <td className="px-8 py-6">
                                            <div className="flex items-center justify-center gap-3">
                                                <div className="w-20 h-2 bg-slate-100 rounded-full overflow-hidden shadow-inner">
                                                    <motion.div 
                                                        initial={{ width: 0 }}
                                                        animate={{ width: `${row.score}%` }}
                                                        className={`h-full ${row.color}`} 
                                                    />
                                                </div>
                                                <span className={`${row.text} font-black text-xs w-8`}>{row.score}%</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <button className="p-3 bg-white border border-slate-100 text-slate-300 rounded-2xl hover:bg-blue-600 hover:text-white transition-all shadow-sm group-hover:shadow-lg">
                                                <ArrowUpRight size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Dashboard;