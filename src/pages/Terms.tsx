import React from 'react';
import { FileText, Scale, Shield, AlertCircle, CheckCircle, ArrowLeft, Users, Lock, Smartphone, DollarSign, Gavel, GlobeCheck, Mail } from 'lucide-react';
import Footer from '../components/Footer';
import logo from '../assets/images/logo@.png';

const TermsOfUse = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-600/40 to-cyan-700/40 relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
            </div>

            {/* Header */}
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

            {/* Main Content */}
            <section className="py-8 sm:py-12 px-4 relative z-10">
                <div className="max-w-4xl mx-auto">
                    {/* Header Card */}
                    <div className="text-center mb-8 sm:mb-12 animate-fade-in-up">
                        <div className="inline-flex items-center justify-center mb-4">
                            <div className="bg-white/15 backdrop-blur-md rounded-full p-4 border border-white/30">
                                <FileText className="w-8 h-8 sm:w-10 sm:h-10 text-neutral-700" />
                            </div>
                        </div>
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-neutral-800 mb-4">
                            Terms of Use
                        </h1>
                        <p className="text-neutral-600 text-sm sm:text-base max-w-2xl mx-auto">
                            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </p>
                        <div className="mt-4 inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 text-xs sm:text-sm">
                            <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4 text-amber-600" />
                            <span className="text-neutral-600">Please read carefully before using our platform</span>
                        </div>
                    </div>

                    {/* Content Cards */}
                    <div className="space-y-4 sm:space-y-6">
                        {/* Acceptance of Terms */}
                        <div className="bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 border border-white/20 hover:bg-white/15 transition-all duration-300">
                            <h2 className="text-xl sm:text-2xl font-semibold text-neutral-800 mb-3 sm:mb-4 flex items-center gap-2">
                                <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-neutral-600" />
                                Acceptance of Terms
                            </h2>
                            <p className="text-neutral-600 text-sm sm:text-base leading-relaxed mb-3">
                                By accessing or using MicroSaaS Community platform ("we", "our", "us"), you agree to be bound by these Terms of Use. If you disagree with any part of these terms, you may not access the platform.
                            </p>
                            <div className="bg-amber-50/10 border-l-4 border-amber-500 p-3 sm:p-4 mt-3">
                                <p className="text-neutral-600 text-xs sm:text-sm">
                                    <strong className="text-neutral-700">Important:</strong> These terms apply to all users, including founders, developers, contributors, and visitors.
                                </p>
                            </div>
                        </div>

                        {/* Eligibility */}
                        <div className="bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 border border-white/20 hover:bg-white/15 transition-all duration-300">
                            <h2 className="text-xl sm:text-2xl font-semibold text-neutral-800 mb-3 sm:mb-4 flex items-center gap-2">
                                <Users className="w-5 h-5 sm:w-6 sm:h-6 text-neutral-600" />
                                Eligibility
                            </h2>
                            <p className="text-neutral-600 text-sm sm:text-base leading-relaxed mb-3">
                                By using our platform, you represent and warrant that:
                            </p>
                            <ul className="space-y-2">
                                {[
                                    "You are at least 18 years old",
                                    "You have the legal capacity to enter into binding agreements",
                                    "You are not located in a country subject to EU sanctions",
                                    "You will comply with all applicable laws and regulations",
                                    "You are not a competitor using our platform for competitive purposes"
                                ].map((item, idx) => (
                                    <li key={idx} className="flex items-start gap-2">
                                        <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-600 mt-0.5 flex-shrink-0" />
                                        <span className="text-neutral-600 text-xs sm:text-sm">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* User Accounts */}
                        <div className="bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 border border-white/20 hover:bg-white/15 transition-all duration-300">
                            <h2 className="text-xl sm:text-2xl font-semibold text-neutral-800 mb-3 sm:mb-4 flex items-center gap-2">
                                <Lock className="w-5 h-5 sm:w-6 sm:h-6 text-neutral-600" />
                                User Accounts
                            </h2>
                            <div className="space-y-3 sm:space-y-4">
                                <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
                                    When you create an account with us, you must provide accurate, complete, and current information. You are solely responsible for:
                                </p>
                                <ul className="space-y-2">
                                    {[
                                        "Maintaining the confidentiality of your password",
                                        "All activities that occur under your account",
                                        "Notifying us immediately of any unauthorized use",
                                        "Ensuring you log out after each session"
                                    ].map((item, idx) => (
                                        <li key={idx} className="flex items-start gap-2">
                                            <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                                            <span className="text-neutral-600 text-xs sm:text-sm">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Platform Rules */}
                        <div className="bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 border border-white/20 hover:bg-white/15 transition-all duration-300">
                            <h2 className="text-xl sm:text-2xl font-semibold text-neutral-800 mb-3 sm:mb-4 flex items-center gap-2">
                                <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-neutral-600" />
                                Platform Rules & Conduct
                            </h2>
                            <p className="text-neutral-600 text-sm sm:text-base leading-relaxed mb-3">
                                You agree not to use the platform to:
                            </p>
                            <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                                {[
                                    "Post false or misleading information",
                                    "Harass, abuse, or harm others",
                                    "Impersonate any person or entity",
                                    "Share unauthorized commercial content",
                                    "Upload malicious code or viruses",
                                    "Violate any intellectual property rights",
                                    "Attempt to gain unauthorized access",
                                    "Disrupt the platform's functionality"
                                ].map((item, idx) => (
                                    <div key={idx} className="flex items-start gap-2">
                                        <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4 text-red-500 mt-0.5 flex-shrink-0" />
                                        <span className="text-neutral-600 text-xs sm:text-sm">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Intellectual Property */}
                        <div className="bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 border border-white/20 hover:bg-white/15 transition-all duration-300">
                            <h2 className="text-xl sm:text-2xl font-semibold text-neutral-800 mb-3 sm:mb-4 flex items-center gap-2">
                                <Scale className="w-5 h-5 sm:w-6 sm:h-6 text-neutral-600" />
                                Intellectual Property
                            </h2>
                            <p className="text-neutral-600 text-sm sm:text-base leading-relaxed mb-3">
                                The platform and its original content, features, and functionality are owned by MicroSaaS Community and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
                            </p>
                            <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
                                You retain ownership of any content you submit, post, or display on the platform. By submitting content, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, and distribute it on the platform.
                            </p>
                        </div>

                        {/* Projects & Collaborations */}
                        <div className="bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 border border-white/20 hover:bg-white/15 transition-all duration-300">
                            <h2 className="text-xl sm:text-2xl font-semibold text-neutral-800 mb-3 sm:mb-4 flex items-center gap-2">
                                <Smartphone className="w-5 h-5 sm:w-6 sm:h-6 text-neutral-600" />
                                Projects & Collaborations
                            </h2>
                            <p className="text-neutral-600 text-sm sm:text-base leading-relaxed mb-3">
                                Our platform facilitates connections between founders and collaborators. Please note:
                            </p>
                            <ul className="space-y-2">
                                {[
                                    "We are not a party to any agreement between users",
                                    "We do not guarantee project success or outcomes",
                                    "Users are responsible for their own contracts and IP agreements",
                                    "We recommend formalizing collaborations with written agreements",
                                    "We reserve the right to remove inactive or inappropriate projects"
                                ].map((item, idx) => (
                                    <li key={idx} className="flex items-start gap-2">
                                        <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                                        <span className="text-neutral-600 text-xs sm:text-sm">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Limitation of Liability */}
                        <div className="bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 border border-white/20 hover:bg-white/15 transition-all duration-300">
                            <h2 className="text-xl sm:text-2xl font-semibold text-neutral-800 mb-3 sm:mb-4 flex items-center gap-2">
                                <Gavel className="w-5 h-5 sm:w-6 sm:h-6 text-neutral-600" />
                                Limitation of Liability
                            </h2>
                            <div className="bg-red-50/10 border-l-4 border-red-500 p-3 sm:p-4">
                                <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed">
                                    To the maximum extent permitted by law, MicroSaaS Community shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your use of the platform.
                                </p>
                            </div>
                        </div>

                        {/* Termination */}
                        <div className="bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 border border-white/20 hover:bg-white/15 transition-all duration-300">
                            <h2 className="text-xl sm:text-2xl font-semibold text-neutral-800 mb-3 sm:mb-4 flex items-center gap-2">
                                <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6 text-neutral-600" />
                                Termination
                            </h2>
                            <p className="text-neutral-600 text-sm sm:text-base leading-relaxed mb-3">
                                We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach these Terms.
                            </p>
                            <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
                                Upon termination, your right to use the platform will immediately cease. Provisions that by their nature should survive termination shall survive.
                            </p>
                        </div>

                        {/* Governing Law */}
                        <div className="bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 border border-white/20 hover:bg-white/15 transition-all duration-300">
                            <h2 className="text-xl sm:text-2xl font-semibold text-neutral-800 mb-3 sm:mb-4 flex items-center gap-2">
                                <Gavel className="w-5 h-5 sm:w-6 sm:h-6 text-neutral-600" />
                                Governing Law
                            </h2>
                            <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
                                These Terms shall be governed and construed in accordance with applicable laws, without regard to its conflict of law provisions. Any disputes arising from these terms shall be resolved through binding arbitration or in competent courts having jurisdiction over the parties.                            </p>
                        </div>

                        {/* Changes to Terms */}
                        <div className="bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 border border-white/20 hover:bg-white/15 transition-all duration-300">
                            <h2 className="text-xl sm:text-2xl font-semibold text-neutral-800 mb-3 sm:mb-4 flex items-center gap-2">
                                <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6 text-neutral-600" />
                                Changes to Terms
                            </h2>
                            <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
                                We reserve the right to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days' notice prior to any new terms taking effect. By continuing to access or use our platform after those revisions become effective, you agree to be bound by the revised terms.
                            </p>
                        </div>

                        {/* Contact Us */}
                        <div className="bg-gradient-to-br from-blue-600/20 to-cyan-700/20 backdrop-blur-md rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 border border-white/30">
                            <h2 className="text-xl sm:text-2xl font-semibold text-neutral-800 mb-3 sm:mb-4 flex items-center gap-2">
                                <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-neutral-600" />
                                Contact Us
                            </h2>
                            <p className="text-neutral-600 text-sm sm:text-base leading-relaxed mb-3">
                                If you have any questions about these Terms, please contact us:
                            </p>
                            <div className="space-y-2 text-sm sm:text-base">
                                <p className="text-neutral-700 flex gap-2"><Mail /> <strong>Email:</strong> microsaas@oncestack.com</p>
                                <p className="text-neutral-700 flex gap-2"><GlobeCheck /> <strong>Website:</strong> www.microsaas.si</p>
                            </div>
                        </div>
                    </div>

                    {/* Footer Note */}
                    <div className="mt-8 sm:mt-12 text-center">
                        <p className="text-neutral-500 text-xs sm:text-sm">
                            These Terms of Use are effective as of {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </p>
                        <p className="text-neutral-500 text-xs sm:text-sm mt-2">
                            By using MicroSaaS Community, you acknowledge that you have read and understood these terms.
                        </p>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default TermsOfUse;