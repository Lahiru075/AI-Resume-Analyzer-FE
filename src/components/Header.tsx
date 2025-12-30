import React from 'react';
import { Search } from 'lucide-react';
import { useAppSelector } from '../app/hooks';

const Header = () => {
    const { user } = useAppSelector((state) => state.auth);

    return (
        <header className="h-20 bg-slate-50/80 backdrop-blur-xl border-b border-slate-200 flex items-center justify-between px-8 shrink-0 sticky top-0 z-30 shadow-sm">
            
            {/* Search Bar */}
            <div className="relative w-80 hidden lg:block group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-indigo-600 transition-colors z-10" />
                <input
                    type="text"
                    placeholder="Search analyses..."
                    className="w-full bg-white border border-slate-200 rounded-2xl py-2.5 pl-11 pr-4 text-xs font-bold text-slate-700 focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-400 shadow-sm"
                />
            </div>

            {/* Profile Section */}
            <div className="flex items-center gap-5 ml-auto">
                <div className="text-right hidden sm:block">
                    <p className="text-sm font-black text-slate-800 leading-none mb-1.5">
                        {user?.name || 'User'}
                    </p>
                    {/* ACCENT UPDATE: Text color set to indigo-400 & updated branding style */}
                    <div className="flex items-center justify-end">
                        <span className="text-[9px] font-black text-indigo-400 border border-indigo-100 bg-indigo-50/50 px-2 py-0.5 rounded-md uppercase tracking-[0.2em]">
                            Premium Access
                        </span>
                    </div>
                </div>

                {/* Profile Avatar */}
                <div className="relative group cursor-pointer">
                    <div className="p-[2px] bg-gradient-to-tr from-indigo-500 via-purple-500 to-indigo-500 rounded-2xl shadow-md group-hover:shadow-indigo-200 transition-all duration-300">
                        <div className="w-10 h-10 bg-white rounded-[14px] flex items-center justify-center text-indigo-600 font-black text-lg border border-white/50">
                            {user?.name?.charAt(0).toUpperCase() || 'U'}
                        </div>
                    </div>
                    <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full shadow-sm" />
                </div>
            </div>

        </header>
    );
};

export default Header;