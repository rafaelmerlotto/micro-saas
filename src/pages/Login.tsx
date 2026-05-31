import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, ArrowRight, FileText, Shield, CheckCircle } from 'lucide-react';
import { Link, useNavigate, type NavigateFunction } from 'react-router';
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
        <div className="min-h-screen bg-gradient-to-br from-blue-600/40 to-cyan-700/40 relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
            </div>

            {/* Header */}
            <header className="py-4 px-4 sm:py-5 sm:px-6 flex justify-between items-center max-w-7xl mx-auto relative z-10">
                <div className="flex items-center gap-2 group">
                    <Link to={'/'}>
                        <img
                            src={logo}
                            alt="Logo"
                            className="w-8 sm:w-10 md:w-12 transition-all duration-500 group-hover:scale-105"
                        />
                    </Link>
                </div>
            </header>

            <section className="flex items-center justify-center py-8 sm:py-12 px-4 relative z-10">
                <div className="max-w-md sm:max-w-lg w-full mx-auto">
                    <div className="bg-white/15 backdrop-blur-md rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 shadow-2xl border border-white/30">
                        <div className="text-center mb-5 sm:mb-6 md:mb-8">
                            <div className="inline-flex items-center justify-center mb-3 sm:mb-4">
                                <img
                                    src={logo}
                                    alt="Logo"
                                    className="w-16 sm:w-20 md:w-28 transition-opacity duration-500"
                                />
                            </div>
                            <h1 className="text-xl sm:text-2xl font-semibold text-neutral-800 mb-1">{t("login.welcome_back")}</h1>
                            <p className="text-xs sm:text-sm text-neutral-600">Sign in to continue</p>

                            <div className='w-full pt-6 sm:pt-8 flex justify-center items-center'>
                                <div className="transform transition-all duration-300 hover:scale-105">
                                    <GithubLoginButton />
                                </div>
                            </div>
                        </div>

                        <div className='mb-4 sm:mb-5 text-center'>
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-white/20"></div>
                                </div>
                                <div className="relative flex justify-center text-xs">
                                    <span className="px-3 bg-transparent text-neutral-600 font-medium">{t("login.login_prompt")}</span>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4 sm:space-y-5">
                            <div className="group">
                                <label className="block text-xs sm:text-sm font-medium text-neutral-700 mb-1.5 sm:mb-2">
                                    Email
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500 w-4 h-4 sm:w-5 sm:h-5" />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2.5 sm:py-3 bg-white/90 border-0 rounded-lg sm:rounded-xl text-neutral-800 placeholder-neutral-400 focus:ring-2 focus:ring-neutral-300 focus:outline-none text-sm sm:text-base"
                                        placeholder="name@example.com"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="group">
                                <label className="block text-xs sm:text-sm font-medium text-neutral-700 mb-1.5 sm:mb-2">
                                    Password
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500 w-4 h-4 sm:w-5 sm:h-5" />
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full pl-9 sm:pl-10 pr-10 sm:pr-12 py-2.5 sm:py-3 bg-white/90 border-0 rounded-lg sm:rounded-xl text-neutral-800 placeholder-neutral-400 focus:ring-2 focus:ring-neutral-300 focus:outline-none text-sm sm:text-base"
                                        placeholder="••••••••"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 text-neutral-500 hover:text-neutral-700 transition-colors"
                                    >
                                        {showPassword ? <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" /> : <Eye className="w-4 h-4 sm:w-5 sm:h-5" />}
                                    </button>
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <label className="flex items-center cursor-pointer group">
                                    <input
                                        type="checkbox"
                                        checked={rememberMe}
                                        onChange={(e) => setRememberMe(e.target.checked)}
                                        className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-neutral-600 bg-white/90 border-gray-300 rounded focus:ring-neutral-300 focus:ring-2 cursor-pointer"
                                    />
                                    <span className="ml-1.5 sm:ml-2 text-xs sm:text-sm text-neutral-600 group-hover:text-neutral-700 transition-colors">{t("login.remember_me")}</span>
                                </label>
                                <button
                                    type="button"
                                    className="text-xs sm:text-sm text-neutral-600 hover:text-neutral-800 transition-colors font-medium cursor-pointer hover:underline"
                                >
                                    {t("login.forgot_password")}
                                </button>
                            </div>

                            <button
                                onClick={handleLogin}
                                disabled={isLoading}
                                className="group w-full bg-gradient-to-br from-blue-600/80 to-cyan-700/80 hover:from-blue-600 hover:to-cyan-700 text-white font-semibold sm:font-bold py-2.5 sm:py-3 px-6 sm:px-8 rounded-lg sm:rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg text-sm sm:text-base flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                            >
                                {isLoading ? (
                                    <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                ) : (
                                    <>
                                        <span>{t("login.login")}</span>
                                        <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-300" />
                                    </>
                                )}
                            </button>

                            <p className="text-center text-xs sm:text-sm text-neutral-500 mt-6 sm:mt-8 pt-4 border-t border-white/20">
                                Don't have an account yet?{' '}
                                <button
                                    onClick={() => window.location.href = '/signup'}
                                    className="text-neutral-700 hover:text-neutral-900 hover:underline font-medium transition-colors"
                                >
                                    Create an account
                                </button>
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}