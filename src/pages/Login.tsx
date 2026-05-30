import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, ArrowRight, FileText, Shield, CheckCircle } from 'lucide-react';
import { useNavigate, type NavigateFunction } from 'react-router';
import { useAuth } from '../auth/auth';
import GoogleLoginButton from '../components/GoogleLoginButton';
import GithubLoginButton from '../components/GithubLoginButton';
import { useTranslation } from 'react-i18next';
import logo from '../assets/images/logo@.png';
import { sign_in } from '../api/users';
import Footer from '../components/Footer';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const navigate: NavigateFunction = useNavigate()
    const { token, login } = useAuth()
    const { t } = useTranslation();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await sign_in(email, password);
            console.log("Risposta dal server:", response.user);
            if (response.token) {
                login(response.token, response.user)
                navigate("/dashboard")
            } else {
                throw new Error("Token mancante nella risposta");
            }
        } catch (err) {
            console.error("Errore nel login:", err);
            alert("Login fallito. Verifica le credenziali.");
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-600/40 to-cyan-700/40 ">
            {/* Header */}
            <header className="py-6 px-6 flex justify-between items-center max-w-7xl mx-auto">
                <div className="flex items-center gap-2">
                    <img src={logo} alt="Logo" className="w-10 md:w-14  transition-opacity duration-500" />
                </div>

            </header>

            <section className="flex items-center justify-center py-12 px-4">
                <div className="max-w-xl w-full">
                    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-white/20">
                        <div className="text-center mb-8">
                            <div className="inline-flex items-center justify-center">
                                <img src={logo} alt="Logo" className="w-20 md:w-36  transition-opacity duration-500" />
                            </div>
                            <h1 className="text-2xl font-medium text-neutral-800 ">{t("login.welcome_back")}</h1>

                            <div className='w-full pt-10 flex justify-center items-center gap-10'>
                                <GithubLoginButton />
                            </div>

                        </div>
                        <div className='mb-5 text-center text-sm text-neutral-600 font-medium flex items-center justify-center gap-2'>
                            <span>{t("login.login_prompt")}</span>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-neutral-600 mb-2">
                                    Email
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-200 w-5 h-5" />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full pl-10 pr-4 py-4 bg-white/90 border-0 rounded-xl text-neutral-800 placeholder-neutral-500 focus:ring-4 focus:ring-neutral-300 focus:outline-none text-lg"
                                        placeholder="nome@email.com"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-neutral-600 mb-2">
                                    Password
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-200 w-5 h-5" />
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full pl-10 pr-12 py-4 bg-white/90 border-0 rounded-xl text-neutral-800 placeholder-neutral-500 focus:ring-4 focus:ring-neutral-300 focus:outline-none text-lg"
                                        placeholder="••••••••"
                                        required
                                    />
                                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-500 hover:text-neutral-700 transition-colors">
                                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <label className="flex items-center">
                                    <input type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} className="w-4 h-4 text-neutral-600 bg-white/90 border-gray-300 rounded focus:ring-neutral-300 focus:ring-2" />
                                    <span className="ml-2 text-sm text-neutral-600">{t("login.remember_me")}</span>
                                </label>
                                <button type="button" className="text-sm text-neutral-600 hover:text-neutral-700 transition-colors font-medium cursor-pointer">
                                    {t("login.forgot_password")}
                                </button>
                            </div>

                            <button
                                onClick={handleLogin}
                                disabled={isLoading}
                                className="w-full bg-gradient-to-br from-blue-600/70 to-cyan-700/70 hover:from-blue-600/80 hover:to-cyan-700/80 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg text-lg flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                            >
                                {isLoading ? (
                                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                ) : (
                                    <>
                                        <span>{t("login.login")}</span>
                                        <ArrowRight className="w-5 h-5" />
                                    </>
                                )}
                            </button>

                            <p className="text-sm text-neutral-500 mt-10">
                                Dont have an account yet? <button onClick={() => window.location.href = '/login'} className="text-neutral-700 hover:underline">Create an account</button>
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
}