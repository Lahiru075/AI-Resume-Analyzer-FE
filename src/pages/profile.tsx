import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import {
    User, Mail, Camera, ShieldCheck,
    BadgeCheck, Zap, Flame, Award,
    Star, Target, Save, CheckCircle2
} from 'lucide-react';
import { useAppSelector } from '../app/hooks';

const Profile = () => {
    const { user } = useAppSelector((state) => state.auth);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [name, setName] = useState('Lahiru Lakshan');
    const [email, setEmail] = useState('lahirul@gmail.com');
    const [previewImage, setPreviewImage] = useState<string | null>(null);

    useEffect(() => {
        if (user) {
            setName(user.data?.name || 'Lahiru Lakshan');
            setEmail(user.data?.email || 'lahirul@gmail.com');
        }
    }, [user]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setPreviewImage(reader.result as string);
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="min-h-screen bg-[#f8faff] -mt-8 -mx-8 relative overflow-hidden font-sans pb-16">

            {/* --- 1. INTENSE FUTURISTIC BACKGROUND (Bolder & Sharper) --- */}
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

            <div className="max-w-[1500px] mx-auto px-10 py-12 relative z-10">

                <div className="grid grid-cols-12 gap-10 items-start">

                    {/* --- LEFT SECTION (Hero + Form) --- */}
                    <div className="col-span-12 lg:col-span-9 space-y-10">

                        {/* 2. Hero Banner - Exactly as pictured with Bolder Presence */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="relative w-full max-w-4xl rounded-[45px] py-9 px-12 bg-gradient-to-br from-[#1e3a8a] via-[#2563eb] to-[#6366f1] text-white shadow-[0_35px_80px_-20px_rgba(37,99,235,0.45)] flex items-center gap-12 overflow-hidden border border-white/20"
                        >

                            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-[100px] -mr-32 -mt-32" />
                            <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-400/10 rounded-full blur-[60px]" />

                            <div className="relative shrink-0">
                                <div className="w-36 h-36 bg-white/20 backdrop-blur-xl rounded-[38px] p-2.5 border border-white/40 shadow-2xl">
                                    <div className="w-full h-full bg-white rounded-[30px] flex items-center justify-center overflow-hidden">
                                        {previewImage ? (
                                            <img src={previewImage} alt="Profile" className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="text-[#1e3a8a] text-7xl font-black italic leading-none">L</div>
                                        )}
                                    </div>
                                </div>

                                {/* Camera Upload Button */}
                                <button
                                    onClick={() => fileInputRef.current?.click()}
                                    className="absolute -bottom-1 -right-1 bg-[#4f46e5] text-white p-3.5 rounded-2xl border-4 border-white shadow-xl hover:bg-indigo-700 transition-all active:scale-95"
                                >
                                    <Camera size={18} />
                                </button>

                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    className="hidden"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                />
                            </div>

                            <div className="flex-1">
                                <div className="flex items-center gap-4 mb-2">
                                    <h2 className="text-5xl font-black tracking-tight leading-tight drop-shadow-sm">{name}</h2>
                                    <BadgeCheck className="text-blue-200 w-9 h-9 fill-blue-300/20" />
                                </div>
                                <p className="text-blue-50 text-xl font-medium opacity-90 mb-8 tracking-wide drop-shadow-sm">{email}</p>

                                <div className="flex gap-4">
                                    <div className="bg-white/15 backdrop-blur-md px-7 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest border border-white/10 shadow-sm hover:bg-white/20 transition-colors">
                                        ELITE MEMBER
                                    </div>
                                    <div className="bg-white/15 backdrop-blur-md px-7 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest border border-white/10 flex items-center gap-2 shadow-sm hover:bg-white/20 transition-colors">
                                        <Zap size={14} className="fill-yellow-400 text-yellow-400" /> PREMIUM ACCESS
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        <div className="grid grid-cols-12 gap-10 max-w-5xl">
                            {/* 3. Small Analytics Card - High Contrast */}
                            <div className="col-span-12 md:col-span-4 bg-white/80 backdrop-blur-2xl p-10 rounded-[48px] border border-white shadow-xl shadow-indigo-100/30">
                                <div className="flex items-center gap-3 mb-10">
                                    <Flame className="text-orange-500" size={24} />
                                    <h4 className="font-black text-slate-800 text-sm uppercase tracking-[0.2em]">Analytics</h4>
                                </div>
                                <div className="space-y-9">
                                    {[
                                        { label: 'Resumes Analyzed', value: '24', icon: Zap, color: 'text-indigo-600', bg: 'bg-indigo-50' },
                                        { label: 'Average Score', value: '82%', icon: Star, color: 'text-purple-600', bg: 'bg-purple-50' },
                                        { label: 'Profile Score', value: '52%', icon: ShieldCheck, color: 'text-blue-600', bg: 'bg-blue-50' },
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-center justify-between group">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center border border-slate-100 group-hover:bg-white transition-colors">
                                                    <item.icon size={16} className="text-slate-300 group-hover:text-indigo-500 transition-colors" />
                                                </div>
                                                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">{item.label}</span>
                                            </div>
                                            <span className={`px-5 py-2 rounded-2xl text-[11px] font-black ${item.color} ${item.bg} border border-slate-100 shadow-sm`}>{item.value}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* 4. Personal Details Form - Polished */}
                            <div className="col-span-12 md:col-span-8 bg-white/80 backdrop-blur-2xl p-10 rounded-[48px] border border-white shadow-xl shadow-indigo-100/30">
                                <div className="flex items-center gap-4 mb-10">
                                    <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 border border-blue-100"><User size={24} /></div>
                                    <h4 className="font-black text-slate-800 text-2xl tracking-tight">Personal Details</h4>
                                </div>
                                <div className="grid grid-cols-2 gap-8 mb-10">
                                    <div className="space-y-2.5">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-3">Full Name</label>
                                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-slate-50/50 border border-slate-200 rounded-[28px] py-4.5 px-8 text-base font-bold text-slate-700 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 outline-none transition-all shadow-sm" />
                                    </div>
                                    <div className="space-y-2.5">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-3">Email Address</label>
                                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-slate-50/50 border border-slate-200 rounded-[28px] py-4.5 px-8 text-base font-bold text-slate-700 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 outline-none transition-all shadow-sm" />
                                    </div>
                                </div>
                                <div className="flex items-center justify-between bg-indigo-50/40 p-8 rounded-[35px] border border-indigo-100/60">
                                    <div className="flex items-center gap-4">
                                        <ShieldCheck className="text-indigo-500" size={24} />
                                        <p className="text-[11px] font-bold text-indigo-900 leading-relaxed uppercase tracking-wider">AI Analysis accuracy depends on <br /> the completeness of your data.</p>
                                    </div>
                                    <button className="bg-[#1d4ed8] text-white font-black px-12 py-4 rounded-[24px] shadow-2xl shadow-blue-200 hover:bg-blue-800 hover:-translate-y-1 transition-all flex items-center gap-3 text-lg">
                                        <Save size={20} /> Save Changes
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* --- 5. RIGHT STATS COLUMN (Perfect Proportions) --- */}
                    <div className="col-span-12 lg:col-span-3 space-y-8">
                        {/* Upper Analytics Card */}
                        <div className="bg-white p-8 rounded-[40px] border border-slate-50 shadow-lg">
                            <div className="flex items-center gap-3 mb-8">
                                <Flame className="text-orange-500" size={20} />
                                <span className="font-black text-slate-800 uppercase tracking-widest text-xs">Quick Stats</span>
                            </div>
                            <div className="space-y-6">
                                <div className="flex items-center justify-between p-1">
                                    <div className="flex items-center gap-4">
                                        <Zap size={16} className="text-slate-200" />
                                        <span className="text-[10px] font-bold text-slate-400 uppercase">Resumes Analyzed</span>
                                    </div>
                                    <span className="text-sm font-black text-slate-700">34</span>
                                </div>
                                <div className="flex items-center justify-between p-1">
                                    <div className="flex items-center gap-4">
                                        <Star size={16} className="text-slate-200" />
                                        <span className="text-[10px] font-bold text-slate-400 uppercase">Avg. AI Score</span>
                                    </div>
                                    <span className="text-sm font-black text-purple-600 bg-purple-50 px-3 py-1 rounded-lg">88%</span>
                                </div>
                            </div>
                        </div>

                        {/* Tall Stats List Card - Bolder Elements */}
                        <div className="bg-white/50 backdrop-blur-2xl p-7 rounded-[55px] border border-white shadow-2xl shadow-indigo-100/20 space-y-4">
                            {[
                                { label: 'Resumes Analyzed', value: '34', color: 'bg-indigo-600', icon: Target },
                                { label: 'Average Score', value: '820', color: 'bg-emerald-500', icon: Star },
                                { label: 'High Potential', value: '82%', color: 'bg-purple-500', icon: Zap },
                                { label: 'Profile Strength', value: '820', color: 'bg-blue-500', icon: ShieldCheck },
                                { label: 'Profile Award', value: 'Save', color: 'bg-slate-900', icon: Award },
                            ].map((stat, i) => (
                                <motion.div
                                    whileHover={{ x: 10, backgroundColor: "rgba(255,255,255,1)" }}
                                    key={i}
                                    className="flex items-center justify-between p-5.5 rounded-[35px] bg-white/90 border border-slate-50 shadow-sm hover:shadow-xl transition-all cursor-pointer group"
                                >
                                    <div className="flex items-center gap-5">
                                        <div className="w-10 h-10 rounded-2xl bg-slate-50 flex items-center justify-center group-hover:bg-indigo-50 transition-colors">
                                            <stat.icon size={18} className="text-slate-200 group-hover:text-indigo-500 transition-colors" />
                                        </div>
                                        <span className="text-xs font-bold text-slate-400 group-hover:text-slate-700 transition-colors tracking-tight">{stat.label}</span>
                                    </div>
                                    <span className={`min-w-[50px] text-center px-4 py-1.5 rounded-2xl text-[10px] font-black text-white ${stat.color} shadow-lg shadow-indigo-100/10`}>
                                        {stat.value}
                                    </span>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Profile;