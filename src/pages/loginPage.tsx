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
            if (!name || !email || !password || !confirmPassword) return alert("Please fill all fields!");
            if (password !== confirmPassword) return alert("Passwords do not match!");

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
        // Global Background
        <div className="min-h-screen bg-slate-200 flex items-center justify-center p-4 md:p-6 relative overflow-hidden font-sans text-slate-900">

            {/* Soft Ambient Glows in Background */}
            <div className="absolute top-[-5%] left-[-5%] w-[40%] h-[40%] bg-indigo-300/30 rounded-full blur-[120px]" />
            <div className="absolute bottom-[-5%] right-[-5%] w-[40%] h-[40%] bg-blue-300/30 rounded-full blur-[120px]" />

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-5xl bg-white border border-slate-300 rounded-[40px] overflow-hidden shadow-[0_30px_100px_-20px_rgba(0,0,0,0.15)] flex flex-col md:flex-row relative z-10"
            >

                {/* --- Left Side: Sophisticated Branding --- */}
                <div className="md:w-[42%] bg-[#1e293b] p-10 md:p-14 text-white flex flex-col justify-between relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-500/20 to-transparent" />

                    <div className="relative z-10">
                        <motion.h2
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.6 }}
                            className="text-4xl font-black tracking-tighter mb-4"
                        >
                            ResumeFlow <span className="text-indigo-400">AI.</span>
                        </motion.h2>
                        <p className="text-slate-300 text-lg font-medium opacity-90 leading-relaxed">
                            Precision AI to perfect your resume and dominate your next interview.
                        </p>
                    </div>

                    {/* Robot Illustration with Float Animation */}
                    <motion.div
                        animate={{ y: [0, -15, 0] }}
                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                        className="relative z-10 flex justify-center py-6"
                    >
                        <img
                            src={robot}
                            alt="AI Illustration"
                            className="w-full max-w-[280px] drop-shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
                        />
                    </motion.div>

                    {/* Feature Badges */}
                    <div className="relative z-10 flex flex-wrap gap-2">
                        {['Smart Analysis', 'ATS Ready', 'AI Coaching'].map((item, i) => (
                            <div key={i} className="flex items-center gap-2 text-[10px] font-bold bg-white/5 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 uppercase tracking-widest">
                                <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" /> {item}
                            </div>
                        ))}
                    </div>
                </div>

                {/* --- Right Side: Clean Professional Form --- */}
                <div className="md:w-[58%] p-8 md:p-16 bg-white/90 backdrop-blur-md flex flex-col justify-center border-l border-slate-100">

                    <div className="mb-10 text-center md:text-left">
                        <h3 className="text-3xl font-black text-slate-900 mb-2 tracking-tight">
                            {isLogin ? 'Welcome Back' : 'Get Started'}
                        </h3>
                        <p className="text-slate-500 font-semibold">Please enter your details to continue.</p>
                    </div>

                    <div className="space-y-5">
                        <AnimatePresence mode='wait'>
                            {!isLogin && (
                                <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="space-y-1.5">
                                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Full Name</label>
                                    <div className="relative group">
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                                        <input
                                            type="text" value={name} onChange={(e) => setName(e.target.value)}
                                            className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 pl-12 pr-4 text-slate-900 hover:border-indigo-300 hover:bg-white focus:bg-white focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 outline-none transition-all shadow-sm"
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
                                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 pl-12 pr-4 text-slate-900 hover:border-indigo-300 hover:bg-white focus:bg-white focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 outline-none transition-all shadow-sm"
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
                                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 pl-12 pr-12 text-slate-900 hover:border-indigo-300 hover:bg-white focus:bg-white focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 outline-none transition-all shadow-sm"
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
                                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 pl-12 pr-12 text-slate-900 hover:border-indigo-300 hover:bg-white focus:bg-white focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 outline-none transition-all shadow-sm"
                                        placeholder="••••••••"
                                    />
                                    <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-600 transition-colors">
                                        {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Main Action Button */}
                        <motion.button
                            type="button"
                            disabled={loading}
                            onClick={handleAuthAction}
                            whileHover={!loading ? { scale: 1.01 } : {}} // Loading නම් hover animation නවත්වන්න
                            whileTap={!loading ? { scale: 0.99 } : {}}
                            className={`w-full py-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 shadow-xl mt-6 
        ${loading ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-100 text-white'}`}
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    <span>{isLogin ? 'Signing In...' : 'Creating Account...'}</span>
                                </>
                            ) : (
                                <>
                                    {isLogin ? 'Sign In' : 'Create Account'}
                                    <ArrowRight className="w-5 h-5" />
                                </>
                            )}
                        </motion.button>
                    </div>

                    {/* Social Logins with Advanced Hover */}
                    <div className="mt-10">
                        <div className="relative flex items-center justify-center mb-8">
                            <div className="w-full border-t border-slate-200"></div>
                            <span className="absolute bg-white px-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">OR</span>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <button
                                type="button"
                                className="flex items-center justify-center gap-3 bg-white border border-slate-200 text-slate-700 py-3.5 rounded-2xl hover:border-indigo-300 hover:shadow-md hover:-translate-y-1 transition-all duration-300 font-bold text-sm"
                            >
                                <Github className="w-5 h-5 text-slate-900" /> GitHub
                            </button>
                            <button
                                type="button"
                                className="flex items-center justify-center gap-3 bg-white border border-slate-200 text-slate-700 py-3.5 rounded-2xl hover:border-indigo-300 hover:shadow-md hover:-translate-y-1 transition-all duration-300 font-bold text-sm"
                            >
                                <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="G" className="w-5 h-5" /> Google
                            </button>
                        </div>
                    </div>

                    <p className="mt-10 text-center text-sm font-bold text-slate-400">
                        {isLogin ? "New to ResumeFlow?" : "Already have an account?"}
                        <button type="button" onClick={() => setIsLogin(!isLogin)} className="ml-2 text-indigo-600 hover:text-indigo-700 font-black transition-colors underline-offset-8 hover:underline">
                            {isLogin ? 'Create Account' : 'Log in here'}
                        </button>
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default LoginPage;