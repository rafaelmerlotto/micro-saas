import { Mail, Globe, MapPin, Pencil } from "lucide-react";
import Header from '../components/Header';
import Footer from '../components/Footer';


export default function Profile() {

    const user = {
        name: "Rafael Merlotto",
        email: "founder@microsaas.si",
        bio: "Building micro SaaS products and connecting indie makers.",
        location: "Slovenia",
        website: "https://microsaas.si",
        github: "https://github.com/rafael",
        linkedin: "https://linkedin.com/in/rafael",
    };

    const projects = [
        {
            id: 1,
            title: "InvoiceFlow",
            description: "Simple invoicing platform for freelancers.",
        },
        {
            id: 2,
            title: "MicroJobs",
            description: "Micro job board for indie hackers.",
        },
    ];

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
                            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-cyan-600 text-4xl font-bold text-white shadow-lg">
                                R
                            </div>

                            {/* Info */}
                            <div>

                                <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                                    {user.name}
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

                            <button className="inline-flex items-center gap-2 rounded-xl bg-black px-5 py-2.5 text-sm font-medium text-white transition hover:bg-neutral-800">
                                <Pencil className="h-4 w-4" />
                                Edit profile
                            </button>

                        </div>

                    </div>

                </div>

                {/* Stats */}
                <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">

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

                </div>

                {/* Projects */}
                <div className="mt-8">

                    <div className="flex items-center justify-between">

                        <h2 className="text-2xl font-bold text-gray-900">
                            Projects
                        </h2>

                    </div>

                    <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">

                        {projects.map((project) => (

                            <div
                                key={project.id}
                                className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:border-gray-300"
                            >

                                <h3 className="text-lg font-semibold text-gray-900">
                                    {project.title}
                                </h3>

                                <p className="mt-2 text-sm text-gray-600">
                                    {project.description}
                                </p>

                                <button className="mt-4 text-sm font-medium text-blue-600 hover:text-blue-700">
                                    View project →
                                </button>

                            </div>

                        ))}

                    </div>

                </div>

            </div>
            <Footer />

        </div>
    );
}