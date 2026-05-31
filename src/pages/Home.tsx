import React, { useEffect, useState } from 'react';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Sparkles, Users, Compass, Lightbulb, CheckCircle, LogIn } from 'lucide-react';
import logo from '../assets/images/logo@.png';
import { t } from 'i18next';
import type { Project } from '../components/Card';
import Footer from '../components/Footer';


const Home = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [waitlistEmail, setWaitlistEmail] = useState('');
    const [waitlistSubmitted, setWaitlistSubmitted] = useState(false);
    const [projects, setProjects] = useState<Project[]>([]);




    useEffect(() => {
        const loadProjects = async () => {
            try {
                const response = await fetch(
                    `${import.meta.env.VITE_API_URL}/api/v1/projects/recent`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );

                const data = await response.json();
                setProjects(data);
                console.log(data);
            } catch (error) {
                console.error(error);
            }
        };

        loadProjects();
    }, []);



    const getStageClass = (stage: string) => {
        switch (stage) {
            case "idea":
                return "bg-yellow-100 text-yellow-700";

            case "mvp":
                return "bg-blue-100 text-blue-700";

            case "launched":
                return "bg-green-100 text-green-700";

            default:
                return "bg-gray-100 text-gray-700";
        }
    };


    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-600/40 to-cyan-700/40 relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
            </div>

            {/* Header minimal */}
            <header className="py-4 px-4 sm:py-5 sm:px-6 flex justify-between items-center max-w-7xl mx-auto relative z-10">
                <div className="flex items-center gap-2 group">
                    <img
                        src={logo}
                        alt="Logo"
                        className="w-8 sm:w-10 md:w-12 transition-all duration-500 group-hover:scale-105"
                    />
                </div>
                <div className="hidden md:flex gap-8 text-neutral-600 text-sm font-medium">
                    <a href="#how" className="hover:text-white transition-all duration-300 hover:scale-105">How it works</a>
                    <a href="#projects" className="hover:text-white transition-all duration-300 hover:scale-105">Projects</a>
                    <a href="#join" className="hover:text-white transition-all duration-300 hover:scale-105">Join</a>
                </div>
            </header>

            {/* Hero + Login Card Section */}
            <section className="flex flex-col lg:flex-row items-center justify-center gap-12 py-12 px-4 max-w-6xl mx-auto relative z-10">
                {/* Left side: value proposition */}
                <div className="flex-1 space-y-6 text-center lg:text-left animate-fade-in-up">
                    <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 text-sm mx-auto lg:mx-0 w-fit backdrop-blur-sm border border-white/20 shadow-lg">
                        <span className="animate-pulse">🇸🇮</span>
                        <span className="text-neutral-700 font-medium">MicroSaaS community</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                        <span className="bg-gradient-to-r from-neutral-800 to-neutral-700 bg-clip-text text-transparent">
                            Build SaaS Together
                        </span>
                        <span className="block text-neutral-700 text-3xl md:text-4xl mt-2">Locally. Practically.</span>
                    </h1>
                    <p className="text-neutral-600 text-lg max-w-md mx-auto lg:mx-0 leading-relaxed">
                        A community platform for the Slovenian MicroSaaS ecosystem — founders & devs share ideas, validate concepts, and find collaborators.
                    </p>
                    <div className="flex flex-wrap gap-3 justify-center lg:justify-start pt-4">
                        <div className="text-cyan-700/90 flex items-center gap-2 text-sm bg-white/15 backdrop-blur-sm rounded-full px-3 py-1.5 border border-white/20">
                            <CheckCircle className="w-4 h-4" /> 40+ founders
                        </div>
                        <div className="text-cyan-700/90 flex items-center gap-2 text-sm bg-white/15 backdrop-blur-sm rounded-full px-3 py-1.5 border border-white/20">
                            <CheckCircle className="w-4 h-4" /> 15+ projects
                        </div>
                    </div>
                </div>

                <div className="flex-1 max-w-md w-full animate-fade-in-up animation-delay-200">
                    <div className="bg-white/15 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-white/30 hover:shadow-3xl transition-all duration-500 hover:scale-[1.02]">
                        <div className="mb-6">
                            <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 border border-white/30">
                                <Users className="w-10 h-10 text-neutral-700" />
                            </div>
                            <h2 className="text-2xl font-bold text-neutral-800 mb-2">Ready to build?</h2>
                            <p className="text-neutral-600 text-sm leading-relaxed">
                                Join the Slovenian MicroSaaS community. Share ideas, validate concepts, and find collaborators.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <button
                                onClick={() => window.location.href = '/login'}
                                className="group w-full bg-gradient-to-br from-blue-600/80 to-cyan-700/80 hover:from-blue-600 hover:to-cyan-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl text-lg flex items-center justify-center space-x-3"
                            >
                                <LogIn className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                                <span>sign in to continue</span>
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>

                            <p className="text-xs text-neutral-500 mt-4">
                                New to the community?{' '}
                                <button
                                    onClick={() => window.location.href = '/login'}
                                    className="text-neutral-700 hover:text-neutral-900 hover:underline font-medium transition-all"
                                >
                                    Create an account
                                </button>
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* How it works section (glassmorphic minimal) */}
            <section id="how" className="py-20 px-4 relative z-10">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-semibold text-neutral-800 mb-2">How it works</h2>
                        <p className="text-neutral-600 text-lg">Three steps, zero fluff</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            { icon: Lightbulb, title: "Share ideas", desc: "Post your concept & get real feedback from local founders." },
                            { icon: Compass, title: "Validate concepts", desc: "Test assumptions, run lean experiments together." },
                            { icon: Users, title: "Find collaborators", desc: "Connect with devs, designers & builders." }
                        ].map((item, idx) => (
                            <div
                                key={idx}
                                className="group bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-500 hover:scale-105 hover:shadow-xl text-center animate-fade-in-up"
                                style={{ animationDelay: `${idx * 100}ms` }}
                            >
                                <div className="bg-gradient-to-br from-white/20 to-white/10 w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                                    <item.icon className="w-7 h-7 text-neutral-700" />
                                </div>
                                <h3 className="text-xl font-medium text-neutral-800 mb-2">{item.title}</h3>
                                <p className="text-neutral-600 text-sm leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Projects preview (minimal cards) */}
            <section id="projects" className="py-12 px-4 relative z-10">
                <div className="max-w-6xl mx-auto">
                    <div className="flex justify-between items-end mb-6 flex-wrap gap-2">
                        <div>
                            <h2 className="text-2xl font-semibold text-neutral-800 mb-1">Recent projects</h2>
                            <p className="text-neutral-600 text-sm">What the community is building right now</p>
                        </div>
                    </div>
                    <div className="grid md:grid-cols-3 gap-5">
                        {projects.map((p, i) => (
                            <div
                                key={i}
                                className="group bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-5 hover:bg-white/20 hover:scale-[1.02] transition-all duration-300 hover:shadow-xl"
                            >
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-semibold text-neutral-800 text-lg">{p.title}</h3>
                                    <span className={`text-[11px] font-medium ${getStageClass(p.stage)} px-2 py-0.5 rounded-full shadow-sm`}>{p.stage}</span>
                                </div>
                                <p className="text-neutral-600 text-sm mb-3 leading-relaxed">{p.description}</p>
                                <div className="flex flex-wrap gap-1.5 mb-3">
                                    {p.tech_stack.map((t: any) => (
                                        <span key={t} className="text-[11px] text-neutral-600 bg-white/20 backdrop-blur-sm px-2 py-0.5 rounded-full">
                                            {t}
                                        </span>
                                    ))}
                                </div>
                                <p className="text-xs text-neutral-700">
                                    looking for: <span className="text-neutral-500 font-medium">{p.looking_for}</span>
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Join Community CTA */}
            <section id="join" className="py-16 px-4 relative z-10">
                <div className="max-w-2xl mx-auto">
                    <div className="bg-white/15 backdrop-blur-md rounded-2xl p-8 border border-white/30 text-center hover:shadow-2xl transition-all duration-500 hover:scale-[1.01]">
                        <h2 className="text-2xl font-semibold text-neutral-800 mb-2">Start building today</h2>
                        <p className="text-neutral-600 text-sm max-w-md mx-auto mb-6 leading-relaxed">
                            Join the Slovenian MicroSaaS community. Share ideas, validate concepts, and find collaborators — all in one place.
                        </p>
                        <button
                            onClick={() => window.location.href = '/login'}
                            className="group bg-gradient-to-br from-blue-600/80 to-cyan-700/80 hover:from-blue-600 hover:to-cyan-700 text-white font-semibold px-8 py-3 rounded-xl text-sm transition-all duration-300 transform hover:scale-105 hover:shadow-xl inline-flex items-center gap-2"
                        >
                            get started now
                            <span className="group-hover:translate-x-1 transition-transform">→</span>
                        </button>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Home;