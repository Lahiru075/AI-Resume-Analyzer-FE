import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, FileSearch, History, UserCircle, Settings, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAppDispatch } from '../app/hooks';
import { logoutSuccess } from '../features/authSlice';

const Sidebar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const menuItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
        { icon: FileSearch, label: 'Analyze Resume', path: '/analyze' },
        { icon: History, label: 'History', path: '/history' },
        { icon: UserCircle, label: 'Profile', path: '/profile' },
        { icon: Settings, label: 'Settings', path: '/settings' },
    ];

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        dispatch(logoutSuccess());
        navigate('/login');
    };

    return (
        <aside className="w-64 bg-[#0f172a] text-slate-400 hidden md:flex flex-col p-6 h-full shrink-0 shadow-2xl relative z-20 border-r border-white/5">

            {/* BRANDING UPDATE: AI. part now has the Indigo-Purple gradient */}
            <div className="mb-10 flex items-center gap-3 px-2">
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-black shadow-lg shadow-indigo-500/20 text-xl">
                    R
                </div>
                <h1 className="text-xl font-black tracking-tighter text-white">
                    ResumeFlow <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">AI.</span>
                </h1>
            </div>

            <nav className="space-y-2 flex-1 font-sans">
                {menuItems.map((item, i) => {
                    const isActive = location.pathname === item.path;
                    return (
                        <button
                            key={i}
                            onClick={() => navigate(item.path)}
                            className={`w-full flex items-center gap-3 px-4 py-4 rounded-2xl text-[13px] font-bold transition-all duration-300 group relative
                            ${isActive
                                    ? 'bg-indigo-500/15 text-white shadow-[inset_0_0_20px_rgba(99,102,241,0.05)]'
                                    : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}
                        >
                            {isActive && (
                                <motion.div
                                    layoutId="activeIndicator"
                                    className="absolute left-0 w-1 h-6 bg-indigo-400 rounded-r-full shadow-[0_0_15px_rgba(129,140,248,0.8)]"
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                />
                            )}

                            <item.icon className={`w-5 h-5 transition-colors duration-300 
                            ${isActive ? 'text-indigo-400' : 'text-slate-500 group-hover:text-indigo-400'}`}
                            />

                            <span className="transition-colors duration-300 tracking-wide">
                                {item.label}
                            </span>
                        </button>
                    );
                })}
            </nav>

            <div className="pt-6 border-t border-white/5">
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-4 rounded-2xl text-[13px] font-bold text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all group"
                >
                    <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    <span className="tracking-wide">Logout Account</span>
                </button>
            </div>

        </aside>
    );
};

export default Sidebar;