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
                    "http://localhost:3000/api/v1/projects/recent",
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
        <div className="min-h-screen bg-gradient-to-br from-blue-600/40 to-cyan-700/40 ">

            {/* Header minimal */}
            <header className="py-6 px-6 flex justify-between items-center max-w-7xl mx-auto">
                <div className="flex items-center gap-2">
                    <img src={logo} alt="Logo" className="w-10 md:w-14  transition-opacity duration-500" />
                </div>
                <div className="hidden md:flex gap-6 text-neutral-600 text-sm font-medium">
                    <a href="#how" className="hover:text-white transition">how it works</a>
                    <a href="#projects" className="hover:text-white transition">projects</a>
                    <a href="#join" className="hover:text-white transition">join</a>
                </div>
            </header>

            {/* Hero + Login Card Section */}
            <section className="flex flex-col lg:flex-row items-center justify-center gap-12 py-12 px-4 max-w-6xl mx-auto">
                {/* Left side: value proposition */}
                <div className="flex-1 text-white space-y-6 text-center lg:text-left">
                    <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 text-sm">
                        <span>🇸🇮 MicroSaaS community</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold leading-tight text-neutral-800">
                        build SaaS together.
                        <span className="block text-neutral-800 text-3xl md:text-4xl mt-2">locally. practically.</span>
                    </h1>
                    <p className="text-neutral-600 text-lg max-w-md mx-auto lg:mx-0">
                        A community platform for the Slovenian SaaS ecosystem — founders & devs share ideas, validate concepts, and find collaborators.
                    </p>
                    <div className="flex flex-wrap gap-3 justify-center lg:justify-start pt-4">
                        <div className=" text-cyan-700/80 flex items-center gap-2 text-sm bg-white/10 rounded-full px-3 py-1.5">
                            <CheckCircle className="w-4 h-4" /> 40+ founders
                        </div>
                        <div className="text-cyan-700/80 flex items-center gap-2 text-sm bg-white/10 rounded-full px-3 py-1.5">
                            <CheckCircle className="w-4 h-4" /> 15+ projects
                        </div>
                    </div>
                </div>

                <div className="flex-1 max-w-md w-full">
                    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-white/20 text-center">
                        <div className="mb-6">
                            <div className="bg-white/20 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                                <Users className="w-10 h-10 text-neutral-600" />
                            </div>
                            <h2 className="text-2xl font-bold text-neutral-700 mb-2">ready to build?</h2>
                            <p className="text-neutral-600 text-sm">
                                Join the Slovenian SaaS community. Share ideas, validate concepts, and find collaborators.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <button
                                onClick={() => window.location.href = '/login'}
                                className="w-full bg-gradient-to-br from-blue-600/70 to-cyan-700/70 hover:from-blue-600/80 hover:to-cyan-700/80 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg text-lg flex items-center justify-center space-x-2"
                            >
                                <LogIn className="w-5 h-5" />
                                <span>sign in to continue</span>
                                <ArrowRight className="w-5 h-5" />
                            </button>

                            <div className="relative my-6">

                            </div>



                            <p className="text-xs text-neutral-500 mt-4">
                                New to the community? <button onClick={() => window.location.href = '/login'} className="text-neutral-600 hover:underline">Create an account</button>
                            </p>
                        </div>
                    </div>
                </div>

            </section>

            {/* How it works section (glassmorphic minimal) */}
            <section id="how" className="py-20 px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-semibold text-neutral-800">how it works</h2>
                        <p className="text-neutral-600 text-lg">three steps, zero fluff</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            { icon: Lightbulb, title: "share ideas", desc: "post your concept & get real feedback from local founders." },
                            { icon: Compass, title: "validate concepts", desc: "test assumptions, run lean experiments together." },
                            { icon: Users, title: "find collaborators", desc: "connect with devs, designers & builders." }
                        ].map((item, idx) => (
                            <div key={idx} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 text-center hover:bg-white/15 transition">
                                <div className="bg-white/20 w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4">
                                    <item.icon className="w-7 h-7 text-neutral-700" />
                                </div>
                                <h3 className="text-xl font-medium text-neutral-700 mb-2">{item.title}</h3>
                                <p className="text-neutral-600 text-sm">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Projects preview (minimal cards) */}
            <section id="projects" className="py-12 px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="flex justify-between items-end mb-6 flex-wrap gap-2">
                        <div>
                            <h2 className="text-2xl font-semibold text-neutral-800">recent projects</h2>
                            <p className="text-neutral-600 text-sm">what the community is building right now</p>
                        </div>
                    
                    </div>
                    <div className="grid md:grid-cols-3 gap-5">
                        {projects.map((p, i) => (
                            <div key={i} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-5 hover:bg-white/15 transition">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-semibold text-neutral-800">{p.title}</h3>
                                    <span className={`text-[11px] ${getStageClass(p.stage)}  px-2 py-0.5 rounded-full`}>{p.stage}</span>
                                </div>
                                <p className="text-neutral-600 text-sm mb-3">{p.description}</p>
                                <div className="flex flex-wrap gap-1.5 mb-3">
                                    {p.tech_stack.map((t: any) => <span key={t} className="text-[11px] text-neutral-600 bg-white/10 px-2 py-0.5 rounded-full">{t}</span>)}
                                </div>
                                <p className="text-xs text-neutral-700">looking for: <span className="text-gray-500">{p.looking_for}</span></p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Join Community CTA */}
            <section id="join" className="py-16 px-4">
                <div className="max-w-2xl mx-auto">
                    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 text-center">
                        <h2 className="text-2xl font-semibold text-neutral-800 mb-2">start building today</h2>
                        <p className="text-neutral-600 text-sm max-w-md mx-auto mb-6">
                            Join the Slovenian SaaS community. Share ideas, validate concepts, and find collaborators — all in one place.
                        </p>
                        <button
                            onClick={() => window.location.href = '/login'}
                            className="bg-gradient-to-br from-blue-600/70 to-cyan-700/70 hover:from-blue-600/80 hover:to-cyan-700/80 text-white font-semibold px-8 py-3 rounded-xl text-sm transition-all duration-300 transform hover:scale-105 shadow-lg"
                        >
                            get started now →
                        </button>
                    </div>
                </div>
            </section>

           <Footer/>
        </div>
    );
};

export default Home;