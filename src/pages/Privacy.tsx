import React from 'react';
import { Shield, Lock, Database, Cookie, Mail, Globe, AlertCircle, CheckCircle, ArrowLeft, GlobeCheck } from 'lucide-react';
import Footer from '../components/Footer';
import logo from '../assets/images/logo@.png';

export default function PrivacyPolicy() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-600/40 to-cyan-700/40 relative overflow-hidden">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
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

            <section className="py-8 sm:py-12 px-4 relative z-10">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-8 sm:mb-12 animate-fade-in-up">
                        <div className="inline-flex items-center justify-center mb-4">
                            <div className="bg-white/15 backdrop-blur-md rounded-full p-4 border border-white/30">
                                <Shield className="w-8 h-8 sm:w-10 sm:h-10 text-neutral-700" />
                            </div>
                        </div>
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-neutral-800 mb-4">
                            Privacy & Policy
                        </h1>
                        <p className="text-neutral-600 text-sm sm:text-base max-w-2xl mx-auto">
                            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </p>
                        <div className="mt-4 inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 text-xs sm:text-sm">
                            <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-600" />
                            <span className="text-neutral-600">Your privacy matters to us</span>
                        </div>
                    </div>

                    <div className="space-y-4 sm:space-y-6">
                        <div className="bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 border border-white/20 hover:bg-white/15 transition-all duration-300">
                            <h2 className="text-xl sm:text-2xl font-semibold text-neutral-800 mb-3 sm:mb-4 flex items-center gap-2">
                                <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6 text-neutral-600" />
                                Introduction
                            </h2>
                            <p className="text-neutral-600 text-sm sm:text-base leading-relaxed mb-3">
                                Welcome to MicroSaaS Community. We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform.
                            </p>
                            <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
                                By using our platform, you agree to the collection and use of information in accordance with this policy.
                            </p>
                        </div>

                        <div className="bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 border border-white/20 hover:bg-white/15 transition-all duration-300">
                            <h2 className="text-xl sm:text-2xl font-semibold text-neutral-800 mb-3 sm:mb-4 flex items-center gap-2">
                                <Database className="w-5 h-5 sm:w-6 sm:h-6 text-neutral-600" />
                                Information We Collect
                            </h2>
                            <div className="space-y-3 sm:space-y-4">
                                <div>
                                    <h3 className="font-medium text-neutral-700 text-sm sm:text-base mb-1">Personal Data</h3>
                                    <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed">
                                        While using our platform, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you. This includes:
                                    </p>
                                    <ul className="mt-2 space-y-1 list-disc list-inside text-neutral-600 text-xs sm:text-sm">
                                        <li>Email address</li>
                                        <li>First name and last name</li>
                                        <li>GitHub profile information (if you choose to connect)</li>
                                        <li>Profile picture</li>
                                        <li>Project information and contributions</li>
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="font-medium text-neutral-700 text-sm sm:text-base mb-1">Usage Data</h3>
                                    <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed">
                                        We automatically collect information about how you interact with our platform, including your IP address, browser type, pages visited, time spent on pages, and other diagnostic data.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 border border-white/20 hover:bg-white/15 transition-all duration-300">
                            <h2 className="text-xl sm:text-2xl font-semibold text-neutral-800 mb-3 sm:mb-4 flex items-center gap-2">
                                <Globe className="w-5 h-5 sm:w-6 sm:h-6 text-neutral-600" />
                                How We Use Your Information
                            </h2>
                            <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                                {[
                                    "Provide and maintain our platform",
                                    "Notify you about changes to our service",
                                    "Allow you to participate in interactive features",
                                    "Provide customer support",
                                    "Gather analysis or valuable information to improve our service",
                                    "Monitor the usage of our platform",
                                    "Detect, prevent and address technical issues",
                                    "Connect you with potential collaborators"
                                ].map((item, idx) => (
                                    <div key={idx} className="flex items-start gap-2">
                                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                                        <span className="text-neutral-600 text-xs sm:text-sm">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 border border-white/20 hover:bg-white/15 transition-all duration-300">
                            <h2 className="text-xl sm:text-2xl font-semibold text-neutral-800 mb-3 sm:mb-4 flex items-center gap-2">
                                <Cookie className="w-5 h-5 sm:w-6 sm:h-6 text-neutral-600" />
                                Cookies & Tracking Technologies
                            </h2>
                            <p className="text-neutral-600 text-sm sm:text-base leading-relaxed mb-3">
                                We use cookies and similar tracking technologies to track activity on our platform and hold certain information. Cookies are files with a small amount of data that are sent to your browser from a website and stored on your device.
                            </p>
                            <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
                                You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our platform.
                            </p>
                        </div>

                        <div className="bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 border border-white/20 hover:bg-white/15 transition-all duration-300">
                            <h2 className="text-xl sm:text-2xl font-semibold text-neutral-800 mb-3 sm:mb-4 flex items-center gap-2">
                                <Lock className="w-5 h-5 sm:w-6 sm:h-6 text-neutral-600" />
                                Data Security
                            </h2>
                            <p className="text-neutral-600 text-sm sm:text-base leading-relaxed mb-3">
                                The security of your data is important to us. We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
                            </p>
                            <div className="bg-white/5 rounded-lg p-3 sm:p-4 mt-3">
                                <p className="text-neutral-600 text-xs sm:text-sm">
                                    <strong className="text-neutral-700">Note:</strong> While we strive to use commercially acceptable means to protect your personal information, no method of transmission over the Internet or method of electronic storage is 100% secure.
                                </p>
                            </div>
                        </div>

                        <div className="bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 border border-white/20 hover:bg-white/15 transition-all duration-300">
                            <h2 className="text-xl sm:text-2xl font-semibold text-neutral-800 mb-3 sm:mb-4 flex items-center gap-2">
                                <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-neutral-600" />
                                Your Rights & Choices
                            </h2>
                            <p className="text-neutral-600 text-sm sm:text-base leading-relaxed mb-3">
                                Depending on your location, you may have certain rights regarding your personal information, including:
                            </p>
                            <ul className="space-y-2 mb-4">
                                {[
                                    "The right to access your personal information",
                                    "The right to rectify inaccurate information",
                                    "The right to request deletion of your information",
                                    "The right to restrict or object to processing",
                                    "The right to data portability",
                                    "The right to withdraw consent"
                                ].map((right, idx) => (
                                    <li key={idx} className="flex items-start gap-2">
                                        <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-600 mt-0.5 flex-shrink-0" />
                                        <span className="text-neutral-600 text-xs sm:text-sm">{right}</span>
                                    </li>
                                ))}
                            </ul>
                            <p className="text-neutral-600 text-sm sm:text-base">
                                To exercise these rights, please contact us using the information provided below.
                            </p>
                        </div>

                        <div className="bg-gradient-to-br from-blue-600/20 to-cyan-700/20 backdrop-blur-md rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 border border-white/30">
                            <h2 className="text-xl sm:text-2xl font-semibold text-neutral-800 mb-3 sm:mb-4 flex items-center gap-2">
                                <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-neutral-600" />
                                Contact Us
                            </h2>
                            <p className="text-neutral-600 text-sm sm:text-base leading-relaxed mb-3">
                                If you have any questions about this Privacy Policy, please contact us:
                            </p>
                            <div className="space-y-2 text-sm sm:text-base">
                                <p className="text-neutral-700 flex gap-2"><Mail /> <strong>Email:</strong> microsaas@oncestack.com</p>
                                <p className="text-neutral-700 flex gap-2"><GlobeCheck /> <strong>Website:</strong> www.microsaas.si</p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 sm:mt-12 text-center">
                        <p className="text-neutral-500 text-xs sm:text-sm">
                            This Privacy Policy is effective as of {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </p>
                        <p className="text-neutral-500 text-xs sm:text-sm mt-2">
                            We may update this policy from time to time. We will notify you of any changes by posting the new policy on this page.
                        </p>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

