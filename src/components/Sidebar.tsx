import { Link, useLocation } from "react-router";
import logo from '../assets/images/logo@.png';
import { useAuth } from "../auth/auth";

export default function Sidebar() {
    const location = useLocation();
     const { logout } = useAuth()

    const menu = [
        { name: "Dashboard", path: "/dashboard" },
        { name: "Projects", path: "/projects" },
        { name: "Discover", path: "/discover" },
        { name: "Messages", path: "/messages" },
        { name: "Settings", path: "/settings" },
    ];

    return (
        <div className="h-screen w-64 bg-white border-r border-gray-200 flex flex-col">

            {/* Logo */}
            <div className="inline-flex items-center justify-center p-4 border-b border-gray-200">
                <img src={logo} alt="Logo" className="w-20 md:w-20  transition-opacity duration-500" />
            </div>

            {/* Menu */}
            <nav className="flex-1 px-4 space-y-2"> 
                {menu.map((item) => {
                    const isActive = location.pathname === item.path;

                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`block px-4 py-2 rounded-lg text-sm transition ${isActive
                                ? "bg-gradient-to-br from-blue-600/70 to-cyan-700/70 text-white"
                                : "text-gray-600 hover:bg-gray-100"
                                }`}
                        >
                            {item.name}
                        </Link>
                    );
                })}
            </nav>

            {/* Bottom */}
            <div className="p-4 border-t border-gray-200">
                <button
                    onClick={logout}
                    className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 transition"
                >
                    Logout
                </button>
            </div>
        </div>
    );
}