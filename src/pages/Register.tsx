import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Eye, EyeOff, Mail, Lock, ArrowRight, User, ArrowLeft } from 'lucide-react';
import { Link, useNavigate, type NavigateFunction } from 'react-router';
import { useAuth } from '../auth/auth';
import GoogleLoginButton from '../components/GoogleLoginButton';
import GithubLoginButton from '../components/GithubLoginButton';
import { useTranslation } from 'react-i18next';
import logo from '../assets/images/logo@.png';
import { sign_up } from '../api/users';
import Footer from '../components/Footer';

interface RegisterFormData {
    fullName: string;
    email: string;
    password: string;
    confirmPassword: string;
    agreeToTerms: boolean;
}

export default function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate: NavigateFunction = useNavigate();
    const { login } = useAuth();
    const { t } = useTranslation();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<RegisterFormData>({
        defaultValues: {
            fullName: '',
            email: '',
            password: '',
            confirmPassword: '',
            agreeToTerms: false,
        },
    });

    const passwordValue = watch('password');

    const onSubmit = async (data: RegisterFormData) => {
        setIsLoading(true);

        try {
            const response = await sign_up(data.email, data.password, data.fullName);
            if (response.token) {
                login(response.token, response.user);
                navigate("/dashboard");
            } else {
                throw new Error("Missing token in response.");
            }
        } catch (err) {
            console.error("Sign up error:", err);
            alert("Sign up failed. Please try again with different credentials.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-600/40 to-cyan-700/40 relative overflow-hidden">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
            </div>

            <header className="py-4 px-4 sm:py-5 sm:px-6 flex justify-between items-center max-w-7xl mx-auto relative z-10">
                <div className="flex items-center gap-2 group">
                    <img src={logo} alt="Logo" className="w-8 sm:w-10 md:w-12 transition-all duration-500 group-hover:scale-105" />
                </div>
                <button
                    onClick={() => window.location.href = '/'}
                    className="flex items-center gap-2 text-neutral-600 hover:text-neutral-800 transition-all duration-300 text-sm font-medium bg-white/10 backdrop-blur-sm px-3 py-1.5 sm:px-4 sm:py-2 rounded-full hover:bg-white/20"
                >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back to home</span>
                </button>
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
                            <h1 className="text-xl sm:text-2xl font-semibold text-neutral-800 mb-1">Create an account</h1>
                            <p className="text-xs sm:text-sm text-neutral-600">Join the Slovenian SaaS community</p>

                            <div className='w-full pt-6 sm:pt-8 flex justify-center items-center gap-3 sm:gap-4'>
                                <div className="transform transition-all duration-300 hover:scale-105">
                                    <GithubLoginButton />
                                </div>
                                <div className="transform transition-all duration-300 hover:scale-105">
                                    <GoogleLoginButton />
                                </div>
                            </div>
                        </div>

                        <div className='mb-4 sm:mb-5 text-center'>
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-white/20"></div>
                                </div>
                                <div className="relative flex justify-center text-xs">
                                    <span className="px-3 bg-transparent text-neutral-600 font-medium">or sign up with email</span>
                                </div>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-5">
                            <div className="group">
                                <label className="block text-xs sm:text-sm font-medium text-neutral-700 mb-1.5 sm:mb-2">
                                    Full Name
                                </label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500 w-4 h-4 sm:w-5 sm:h-5" />
                                    <input
                                        type="text"
                                        {...register("fullName", {
                                            required: "Full name is required",
                                            minLength: {
                                                value: 2,
                                                message: "Name must be at least 2 characters"
                                            }
                                        })}
                                        className={`w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2.5 sm:py-3 bg-white/90 border-0 rounded-lg sm:rounded-xl text-neutral-800 placeholder-neutral-400 focus:ring-2 focus:ring-neutral-300 focus:outline-none text-sm sm:text-base ${errors.fullName ? 'ring-2 ring-red-500/50' : ''
                                            }`}
                                        placeholder="John Doe"
                                    />
                                </div>
                                {errors.fullName && (
                                    <p className="text-xs text-red-500 mt-1">{errors.fullName.message}</p>
                                )}
                            </div>

                            <div className="group">
                                <label className="block text-xs sm:text-sm font-medium text-neutral-700 mb-1.5 sm:mb-2">
                                    Email
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500 w-4 h-4 sm:w-5 sm:h-5" />
                                    <input
                                        type="email"
                                        {...register("email", {
                                            required: "Email is required",
                                            pattern: {
                                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                message: "Invalid email address"
                                            }
                                        })}
                                        className={`w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2.5 sm:py-3 bg-white/90 border-0 rounded-lg sm:rounded-xl text-neutral-800 placeholder-neutral-400 focus:ring-2 focus:ring-neutral-300 focus:outline-none text-sm sm:text-base ${errors.email ? 'ring-2 ring-red-500/50' : ''
                                            }`}
                                        placeholder="name@example.com"
                                    />
                                </div>
                                {errors.email && (
                                    <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>
                                )}
                            </div>

                            <div className="group">
                                <label className="block text-xs sm:text-sm font-medium text-neutral-700 mb-1.5 sm:mb-2">
                                    Password
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500 w-4 h-4 sm:w-5 sm:h-5" />
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        {...register("password", {
                                            required: "Password is required",
                                            minLength: {
                                                value: 6,
                                                message: "Password must be at least 6 characters"
                                            }
                                        })}
                                        className={`w-full pl-9 sm:pl-10 pr-10 sm:pr-12 py-2.5 sm:py-3 bg-white/90 border-0 rounded-lg sm:rounded-xl text-neutral-800 placeholder-neutral-400 focus:ring-2 focus:ring-neutral-300 focus:outline-none text-sm sm:text-base ${errors.password ? 'ring-2 ring-red-500/50' : ''
                                            }`}
                                        placeholder="••••••••"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 text-neutral-500 hover:text-neutral-700 transition-colors"
                                    >
                                        {showPassword ? <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" /> : <Eye className="w-4 h-4 sm:w-5 sm:h-5" />}
                                    </button>
                                </div>
                                {errors.password ? (
                                    <p className="text-xs text-red-500 mt-1">{errors.password.message}</p>
                                ) : (
                                    <p className="text-xs text-neutral-500 mt-1">Must be at least 6 characters</p>
                                )}
                            </div>

                            <div className="group">
                                <label className="block text-xs sm:text-sm font-medium text-neutral-700 mb-1.5 sm:mb-2">
                                    Confirm Password
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500 w-4 h-4 sm:w-5 sm:h-5" />
                                    <input
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        {...register("confirmPassword", {
                                            required: "Please confirm your password",
                                            validate: (value) => value === passwordValue || "Passwords do not match"
                                        })}
                                        className={`w-full pl-9 sm:pl-10 pr-10 sm:pr-12 py-2.5 sm:py-3 bg-white/90 border-0 rounded-lg sm:rounded-xl text-neutral-800 placeholder-neutral-400 focus:ring-2 focus:ring-neutral-300 focus:outline-none text-sm sm:text-base ${errors.confirmPassword ? 'ring-2 ring-red-500/50' : ''
                                            }`}
                                        placeholder="••••••••"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 text-neutral-500 hover:text-neutral-700 transition-colors"
                                    >
                                        {showConfirmPassword ? <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" /> : <Eye className="w-4 h-4 sm:w-5 sm:h-5" />}
                                    </button>
                                </div>
                                {errors.confirmPassword && (
                                    <p className="text-xs text-red-500 mt-1">{errors.confirmPassword.message}</p>
                                )}
                            </div>

                            <div className="flex items-start gap-2">
                                <input
                                    type="checkbox"
                                    {...register("agreeToTerms", {
                                        required: "You must agree to the Terms of Service"
                                    })}
                                    className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-neutral-600 bg-white/90 border-gray-300 rounded focus:ring-neutral-300 focus:ring-2 cursor-pointer mt-0.5"
                                />
                                <label className="text-xs sm:text-sm text-neutral-600 cursor-pointer">
                                    I agree to the{' '}
                                    <Link to="/terms" className="text-neutral-700 hover:text-neutral-900 hover:underline font-medium">
                                        Terms of Service
                                    </Link>
                                    {' '}and{' '}
                                    <Link to="/privacy" className="text-neutral-700 hover:text-neutral-900 hover:underline font-medium">
                                        Privacy Policy
                                    </Link>
                                </label>
                            </div>
                            {errors.agreeToTerms && (
                                <p className="text-xs text-red-500 -mt-2">{errors.agreeToTerms.message}</p>
                            )}

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="group w-full bg-gradient-to-br from-blue-600/80 to-cyan-700/80 hover:from-blue-600 hover:to-cyan-700 text-white font-semibold sm:font-bold py-2.5 sm:py-3 px-6 sm:px-8 rounded-lg sm:rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg text-sm sm:text-base flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                            >
                                {isLoading ? (
                                    <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                ) : (
                                    <>
                                        <span>Create account</span>
                                        <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-300" />
                                    </>
                                )}
                            </button>

                            <p className="text-center text-xs sm:text-sm text-neutral-500 mt-6 sm:mt-8 pt-4 border-t border-white/20">
                                Already have an account?{' '}
                                <button
                                    type="button"
                                    onClick={() => navigate('/login')}
                                    className="text-neutral-700 hover:text-neutral-900 hover:underline font-medium transition-colors"
                                >
                                    Sign in
                                </button>
                            </p>
                        </form>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}