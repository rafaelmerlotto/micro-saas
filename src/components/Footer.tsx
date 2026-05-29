import { Link } from "react-router";

export default function Footer() {
    return (
        <footer className="border-t border-gray-200 bg-white mt-16">

            <div className="mx-auto max-w-7xl px-6 py-10">

                {/* Top */}
                <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">

                    {/* Brand */}
                    <div className="max-w-sm">

                        <h2 className="text-lg font-semibold text-gray-900">
                            MicroSaaS.si
                        </h2>

                        <p className="mt-3 text-sm text-gray-500 leading-6">
                            A community-driven platform where founders and developers
                            share SaaS ideas, validate concepts and find collaborators.
                        </p>

                    </div>

                    {/* Links */}
                    <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">

                        {/* Platform */}
                        <div>

                            <h3 className="text-sm font-semibold text-gray-900">
                                Platform
                            </h3>

                            <div className="mt-4 flex flex-col gap-3 text-sm text-gray-500">

                                <Link
                                    to="/projects"
                                    className="hover:text-black transition"
                                >
                                    Projects
                                </Link>

                                <Link
                                    to="/discover"
                                    className="hover:text-black transition"
                                >
                                    Discover
                                </Link>

                                <Link
                                    to="/about"
                                    className="hover:text-black transition"
                                >
                                    About
                                </Link>

                            </div>

                        </div>

                        {/* Community */}
                        <div>

                            <h3 className="text-sm font-semibold text-gray-900">
                                Community
                            </h3>

                            <div className="mt-4 flex flex-col gap-3 text-sm text-gray-500">

                                <Link
                                    to="/founders"
                                    className="hover:text-black transition"
                                >
                                    Founders
                                </Link>

                                <Link
                                    to="/developers"
                                    className="hover:text-black transition"
                                >
                                    Developers
                                </Link>

                                <Link
                                    to="/collaborations"
                                    className="hover:text-black transition"
                                >
                                    Collaborations
                                </Link>

                            </div>

                        </div>

                        {/* Legal */}
                        <div>

                            <h3 className="text-sm font-semibold text-gray-900">
                                Legal
                            </h3>

                            <div className="mt-4 flex flex-col gap-3 text-sm text-gray-500">

                                <Link
                                    to="/privacy"
                                    className="hover:text-black transition"
                                >
                                    Privacy
                                </Link>

                                <Link
                                    to="/terms"
                                    className="hover:text-black transition"
                                >
                                    Terms
                                </Link>

                            </div>

                        </div>

                    </div>

                </div>

                {/* Bottom */}
                <div className="mt-10 border-t border-gray-100 pt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                    <p className="text-sm text-gray-400">
                        © 2026 MicroSaaS.si. All rights reserved.
                    </p>

                    <div className="flex items-center gap-4 text-sm text-gray-500">

                        <a
                            href="#"
                            className="hover:text-black transition"
                        >
                            GitHub
                        </a>

                        <a
                            href="#"
                            className="hover:text-black transition"
                        >
                            LinkedIn
                        </a>

                    </div>

                </div>

            </div>

        </footer>
    );
}