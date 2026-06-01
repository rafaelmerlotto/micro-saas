import { Mail, Globe, MapPin, Pencil } from "lucide-react";
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useAuth } from "../auth/auth";
import { userProjects } from "../api/users";
import { useEffect, useState } from "react";
import { type Project } from "../components/Card";


export default function Profile() {

    const { user } = useAuth();
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);



    useEffect(() => {
        if (!user?.id) return;

        const fetchData = async () => {
            try {
                setLoading(true);

                const data = await userProjects(user.id);

                setProjects(data.projects ?? data);

            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [user?.id]);


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
        <div className="min-h-screen bg-gray-50">

            <Header />

            {/* Cover */}
            <div className="h-52 w-full bg-gradient-to-br from-blue-600/40 to-cyan-700/40" />

            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">

                {/* Profile header */}
                <div className="relative -mt-20 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">

                    <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">

                        {/* Left */}
                        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">

                            {/* Avatar */}
                            <div className={`h-24 w-24 rounded-full ${user?.image ? '' : 'bg-gradient-to-br from-blue-600/80 to-cyan-700/80'} text-white flex items-center justify-center text-3xl font-medium shadow-md`}>
                                {user?.image ? (
                                    <img src={user.image} alt="" className="w-full h-full rounded-full object-cover" />
                                ) : (
                                    user?.email?.charAt(0).toUpperCase() || "U"
                                )}
                            </div>

                            {/* Info */}
                            <div>

                                <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                                    {user.fullName || user.name || user.email.split("@")[0]}
                                </h1>

                                <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-gray-500">

                                    <div className="flex items-center gap-2">
                                        <Mail className="h-4 w-4" />
                                        {user.email}
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <MapPin className="h-4 w-4" />
                                        {user.location}
                                    </div>

                                </div>

                                <p className="mt-4 max-w-2xl text-gray-600">
                                    {user.bio}
                                </p>

                                {/* Links */}
                                <div className="mt-5 flex flex-wrap gap-3">

                                    <a
                                        href={user.website}
                                        target="_blank"
                                        className="rounded-xl border border-gray-200 px-4 py-2 text-sm text-gray-700 transition hover:bg-gray-100"
                                    >
                                        <div className="flex items-center gap-2">
                                            <Globe className="h-4 w-4" />
                                            Website
                                        </div>
                                    </a>

                                </div>

                            </div>

                        </div>

                        {/* Right */}
                        <div className="flex items-center gap-3">

                           

                        </div>

                    </div>

                </div>

                {/* Stats */}
                {/* <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">

                    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                        <p className="text-sm text-gray-500">Projects</p>
                        <h3 className="mt-2 text-3xl font-bold text-gray-900">
                            12
                        </h3>
                    </div>

                    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                        <p className="text-sm text-gray-500">Followers</p>
                        <h3 className="mt-2 text-3xl font-bold text-gray-900">
                            248
                        </h3>
                    </div>

                    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                        <p className="text-sm text-gray-500">Collaborations</p>
                        <h3 className="mt-2 text-3xl font-bold text-gray-900">
                            18
                        </h3>
                    </div>

                </div> */}

                {/* Projects */}
                <div className="mt-8">

                    <div className="flex items-center justify-between">

                        <h2 className="text-2xl font-bold text-gray-900">
                            Projects
                        </h2>

                    </div>

                    <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">

                        {projects.map((p: any, i) => (

                            <div
                                key={i}
                                className="group bg-white backdrop-blur-sm border border-gray-200 rounded-2xl p-5 hover:bg-white/20 hover:scale-[1.02] transition-all duration-300 hover:shadow-xl"
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

            </div>
            <Footer />

        </div>
    );
}