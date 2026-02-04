import React, { useState, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, User, Github, ArrowRight, CheckCircle2, Loader2 } from 'lucide-react';
import { useAppDispatch } from '../app/hooks';
import { loginSuccess } from '../features/authSlice';

// @ts-ignore
import robot from '../assets/Robotics-amico-removebg-preview.png';
import { getMyDetails, login, register } from '../services/user';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {

    const navigate = useNavigate();

    const [isLogin, setIsLogin] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    const dispatch = useAppDispatch();


    const handleAuthAction = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);

        if (isLogin) {

            if (!email || !password) {
                setLoading(false);
                return alert("Please fill all fields!");
            }

            try {
                const res: any = await login(email, password);
                await processLogin(res);
            } catch (error: any) {
                console.log(error.message)
                alert("Login faild!")
                setLoading(false);
            }

        } else {
            if (!name || !email || !password || !confirmPassword) {
                setLoading(false);
                return alert("Please fill all fields!");
            }
            if (password !== confirmPassword) {
                setLoading(false);
                return alert("Passwords do not match!");
            }

            try {
                const data = { name, email, password, confirmPassword };

                const res: any = await register(data);

                alert("Registration successfull!");

                setName('');
                setEmail('');
                setPassword('');
                setConfirmPassword('');

                setIsLogin(true);

            } catch (error: any) {
                console.log(error.message)
                alert("Registration faild!")
            } finally {
                setLoading(false);
            }

        }
    };

    const processLogin = async (res: any) => {
        await localStorage.setItem("accessToken", res.data.accessToken);
        await localStorage.setItem("refreshToken", res.data.refreshToken);

        const details: any = await getMyDetails();

        console.log(details)

        await dispatch(loginSuccess({ name: details.data.name, email: details.data.email }));

        console.log("Logging in...", { email, password });

        navigate("/dashboard");

        setLoading(false);

    }

    return (
        <div className="min-h-screen bg-slate-200 flex items-center justify-center p-4 md:p-6 relative overflow-hidden font-sans text-slate-900">

            {/* Background Glows */}
            <div className="absolute top-[-5%] left-[-5%] w-[40%] h-[40%] bg-indigo-300/30 rounded-full blur-[120px]" />
            <div className="absolute bottom-[-5%] right-[-5%] w-[40%] h-[40%] bg-blue-300/30 rounded-full blur-[120px]" />

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                // --- FIXED HEIGHT ADDED HERE (h-[650px]) ---
                className="w-full max-w-5xl h-fit md:h-[650px] bg-white border border-slate-300 rounded-[40px] overflow-hidden shadow-[0_30px_100px_-20px_rgba(0,0,0,0.15)] flex flex-col md:flex-row relative z-10"
            >

                {/* Left Side: Branding */}
                <div className="md:w-[42%] bg-[#1e293b] p-10 md:p-14 text-white flex flex-col justify-between relative overflow-hidden shrink-0">
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-500/20 to-transparent" />
                    <div className="relative z-10">
                        <motion.h2 initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="text-4xl font-black tracking-tighter mb-4">
                            ResumeFlow <span className="text-indigo-400">AI.</span>
                        </motion.h2>
                        <p className="text-slate-300 text-lg font-medium opacity-90 leading-relaxed">
                            Precision AI to perfect your resume and dominate your next interview.
                        </p>
                    </div>

                    <motion.div animate={{ y: [0, -15, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} className="relative z-10 flex justify-center py-6">
                        <img src={robot} alt="AI" className="w-full max-w-[280px] drop-shadow-[0_20px_50px_rgba(0,0,0,0.3)]" />
                    </motion.div>

                    <div className="relative z-10 flex flex-wrap gap-2">
                        {['Smart Analysis', 'ATS Ready', 'AI Coaching'].map((item, i) => (
                            <div key={i} className="flex items-center gap-2 text-[10px] font-bold bg-white/5 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 uppercase tracking-widest text-white/90">
                                <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" /> {item}
                            </div>
                        ))}
                    </div>
                </div>

                {/* --- Right Side: Clean Professional Form --- */}
                <div className="md:w-[58%] p-8 md:p-12 bg-white flex flex-col border-l border-slate-100 h-full justify-center">

                    {/* Header: Static */}
                    <div className="mb-8 shrink-0">
                        <h3 className="text-3xl font-black text-slate-900 mb-2 tracking-tight">
                            {isLogin ? 'Welcome Back' : 'Get Started'}
                        </h3>
                        <p className="text-slate-500 font-semibold">Please enter your details to continue.</p>
                    </div>

                    {/* --- SCROLLABLE INPUT AREA (Only this part scrolls) --- */}
                    <div className="flex-1 overflow-y-auto pr-2 space-y-5 mb-6 
                        [&::-webkit-scrollbar]:w-1.5 
                        [&::-webkit-scrollbar-track]:bg-transparent 
                        [&::-webkit-scrollbar-thumb]:bg-slate-200 
                        [&::-webkit-scrollbar-thumb]:rounded-full 
                        hover:[&::-webkit-scrollbar-thumb]:bg-slate-300"
                    >
                        <div className="py-1 space-y-5">
                            <AnimatePresence mode='wait'>
                                {!isLogin && (
                                    <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="space-y-1.5">
                                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Full Name</label>
                                        <div className="relative group">
                                            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                                            <input
                                                type="text" value={name} onChange={(e) => setName(e.target.value)}
                                                className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 pl-12 pr-4 text-slate-900 focus:bg-white focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 outline-none transition-all shadow-sm"
                                                placeholder="John Doe"
                                            />
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <div className="space-y-1.5">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Email Address</label>
                                <div className="relative group">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                                    <input
                                        type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 pl-12 pr-4 text-slate-900 focus:bg-white focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 outline-none transition-all shadow-sm"
                                        placeholder="name@company.com"
                                    />
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Password</label>
                                <div className="relative group">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                                    <input
                                        type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 pl-12 pr-12 text-slate-900 focus:bg-white focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 outline-none transition-all shadow-sm"
                                        placeholder="••••••••"
                                    />
                                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-600 transition-colors">
                                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>

                            {!isLogin && (
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Confirm Password</label>
                                    <div className="relative group">
                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                                        <input
                                            type={showConfirmPassword ? "text" : "password"} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                                            className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 pl-12 pr-12 text-slate-900 focus:bg-white focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 outline-none transition-all shadow-sm"
                                            placeholder="••••••••"
                                        />
                                        <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-600 transition-colors">
                                            {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                        </button>
                                    </div>
                                </div>
                            )}

                            <AnimatePresence>
                                {isLogin && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0 }}
                                        className="flex items-center justify-between px-1 mt-2"
                                    >
                                        <label className="flex items-center gap-2 cursor-pointer group">
                                            <input
                                                type="checkbox"
                                                className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 transition-all cursor-pointer"
                                                checked={rememberMe}
                                                onChange={(e) => setRememberMe(e.target.checked)}
                                            />
                                            <span className="text-[10px] font-black text-slate-500 group-hover:text-slate-700 transition-colors uppercase tracking-widest">
                                                Remember me
                                            </span>
                                        </label>

                                        <button
                                            type="button"
                                            className="text-[10px] font-black text-indigo-600 hover:text-indigo-700 transition-colors uppercase tracking-widest hover:underline underline-offset-4"
                                        >
                                            Forgot Password?
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                        </div>
                    </div>

                    {/* Action Area: Static at the bottom */}
                    <div className="shrink-0">
                        <motion.button
                            type="button"
                            disabled={loading}
                            onClick={handleAuthAction}
                            whileHover={!loading ? { scale: 1.01 } : {}}
                            whileTap={!loading ? { scale: 0.99 } : {}}
                            className={`w-full py-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 shadow-xl 
                            ${loading ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-100 text-white'}`}
                        >
                            {loading ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <>
                                    {isLogin ? 'Sign In' : 'Create Account'}
                                    <ArrowRight className="w-5 h-5" />
                                </>
                            )}
                        </motion.button>

                        <div className="mt-6">
                            <div className="relative flex items-center justify-center mb-6">
                                <div className="w-full border-t border-slate-200"></div>
                                <span className="absolute bg-white px-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">OR</span>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <button type="button" className="flex items-center justify-center gap-3 bg-white border border-slate-200 text-slate-700 py-3 rounded-2xl hover:border-indigo-300 hover:shadow-md transition-all font-bold text-sm">
                                    <Github className="w-5 h-5 text-slate-900" /> GitHub
                                </button>
                                <button type="button" className="flex items-center justify-center gap-3 bg-white border border-slate-200 text-slate-700 py-3 rounded-2xl hover:border-indigo-300 hover:shadow-md transition-all font-bold text-sm">
                                    <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="G" className="w-5 h-5" /> Google
                                </button>
                            </div>
                        </div>

                        <p className="mt-6 text-center text-sm font-bold text-slate-400">
                            {isLogin ? "New to ResumeFlow?" : "Already have an account?"}
                            <button type="button" onClick={() => setIsLogin(!isLogin)} className="ml-2 text-indigo-600 hover:text-indigo-700 font-black transition-colors underline-offset-8 hover:underline">
                                {isLogin ? 'Create Account' : 'Log in here'}
                            </button>
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );


};

export default LoginPage;



