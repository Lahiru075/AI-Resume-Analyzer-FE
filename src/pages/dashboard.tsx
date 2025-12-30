import React from 'react';
import { motion } from 'framer-motion';
import { FileText, TrendingUp, CheckCircle, Clock, Plus, ArrowUpRight } from 'lucide-react';
import { useAppSelector } from '../app/hooks';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const { user } = useAppSelector((state) => state.auth);
    const navigate = useNavigate();

    const stats = [
        { label: 'Analyses Done', value: '08', icon: FileText, color: 'text-indigo-600', bg: 'bg-indigo-50' },
        { label: 'Avg Match', value: '84%', icon: TrendingUp, color: 'text-purple-600', bg: 'bg-purple-50' },
        { label: 'Skills Found', value: '112', icon: CheckCircle, color: 'text-emerald-600', bg: 'bg-emerald-50' },
        { label: 'Days Active', value: '14', icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
    ];

    return (
        <div className="space-y-10 pb-10">

            {/* --- 1. Elite Welcome Banner --- */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative rounded-[40px] p-10 md:p-12 text-white overflow-hidden shadow-2xl shadow-indigo-200/40"
            >
                {/* Deep Multi-layer Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#1e1b4b] via-[#4338ca] to-[#7c3aed]" />

                {/* Animated Mesh Patterns */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 rounded-full blur-[100px] -mr-40 -mt-40 animate-pulse" />
                <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-indigo-500/20 rounded-full blur-[80px] -ml-20 -mb-20" />

                <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex-1 text-center md:text-left">
                        <motion.h2
                            initial={{ x: -20, opacity: 0 }} 
                            animate={{ x: 0, opacity: 1 }}
                            className="text-4xl md:text-5xl font-black mb-4 tracking-tighter leading-tight"
                        >
                            Hello, {user?.name?.split(' ')[0] || 'User'}! <span className="inline-block animate-bounce">👋</span>
                        </motion.h2>
                        <p className="text-indigo-100 text-lg font-medium max-w-lg mb-8 opacity-90">
                            Your AI career command center is ready. Let's optimize your resume for your next big opportunity.
                        </p>
                        <button
                            onClick={() => navigate('/analyze')}
                            className="bg-white text-[#1e1b4b] font-black px-8 py-4 rounded-2xl flex items-center gap-3 hover:bg-indigo-50 transition-all shadow-xl active:scale-95 group"
                        >
                            <Plus className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
                            Start New Analysis
                        </button>
                    </div>

                    {/* Decoration Element */}
                    <div className="hidden lg:flex w-48 h-48 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-[40px] items-center justify-center rotate-6 shadow-2xl relative">
                        <TrendingUp className="w-24 h-24 text-white opacity-80" />
                        <div className="absolute -top-2 -right-2 w-4 h-4 bg-emerald-400 rounded-full animate-ping" />
                    </div>
                </div>
            </motion.div>

            {/* --- 2. Stats Section --- */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        // White cards on Grey background look amazing with this shadow
                        className="bg-white border border-slate-200 p-7 rounded-[35px] shadow-sm hover:shadow-xl hover:shadow-indigo-500/10 hover:-translate-y-1 transition-all duration-300 group cursor-default"
                    >
                        <div className="flex justify-between items-start mb-6">
                            <div className={`${stat.bg} ${stat.color} w-14 h-14 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                                <stat.icon className="w-7 h-7" />
                            </div>
                            <ArrowUpRight className="w-5 h-5 text-slate-300 group-hover:text-indigo-500 transition-colors" />
                        </div>
                        <h4 className="text-4xl font-black text-slate-800 tracking-tighter">{stat.value}</h4>
                        <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mt-2">{stat.label}</p>
                    </motion.div>
                ))}
            </div>

            {/* --- 3. Recent Activity Section --- */}
            <div className="bg-white rounded-[40px] border border-slate-200 shadow-xl shadow-slate-200/60 overflow-hidden">
                <div className="p-8 md:p-10 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                    <div>
                        <h3 className="text-2xl font-black text-slate-800 tracking-tight">Recent Insights</h3>
                        <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">Your latest performance reports</p>
                    </div>
                    <button 
                        onClick={() => navigate('/history')} 
                        className="text-sm font-bold text-indigo-600 hover:text-purple-600 transition-colors flex items-center gap-1 group"
                    >
                        View Full Archive <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50/80 text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">
                            <tr>
                                <th className="px-10 py-6 font-black text-slate-500">Target Position</th>
                                <th className="px-10 py-6 font-black text-slate-500">Date</th>
                                <th className="px-10 py-6 font-black text-slate-500">ATS Score</th>
                                <th className="px-10 py-6 text-right font-black text-slate-500">Details</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-sm font-bold">
                            {[
                                { job: 'Frontend Developer', date: '30 Dec, 2025', score: '92', color: 'bg-emerald-500', text: 'text-emerald-600' },
                                { job: 'Node.js Backend Engineer', date: '28 Dec, 2025', score: '74', color: 'bg-amber-500', text: 'text-amber-600' },
                                { job: 'Full Stack Engineer', date: '25 Dec, 2025', score: '61', color: 'bg-orange-500', text: 'text-orange-600' },
                            ].map((row, i) => (
                                <tr key={i} className="hover:bg-slate-50 transition-colors group">
                                    <td className="px-10 py-6 text-slate-800 font-extrabold">{row.job}</td>
                                    <td className="px-10 py-6 text-slate-400 font-medium">{row.date}</td>
                                    <td className="px-10 py-6">
                                        <div className="flex items-center gap-3">
                                            <div className="flex-1 h-2 bg-slate-100 rounded-full max-w-[80px] overflow-hidden shadow-inner">
                                                <motion.div 
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${row.score}%` }}
                                                    transition={{ duration: 1, delay: 0.5 }}
                                                    className={`h-full ${row.color}`} 
                                                />
                                            </div>
                                            <span className={`${row.text}`}>{row.score}%</span>
                                        </div>
                                    </td>
                                    <td className="px-10 py-6 text-right">
                                        <button className="p-3 bg-slate-50 text-slate-400 rounded-xl hover:bg-indigo-600 hover:text-white transition-all shadow-sm group-hover:shadow-md">
                                            <ArrowUpRight className="w-5 h-5" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
};

export default Dashboard;