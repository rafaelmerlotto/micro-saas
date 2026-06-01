import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useAuth } from "../auth/auth";
import { User, LogOut, Settings, ChevronDown, Menu, X, Search } from "lucide-react";
import { Link, useNavigate } from "react-router";

export default function Header() {
    const { user, logout } = useAuth();
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const mobileMenuRef = useRef<HTMLDivElement>(null);


    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
            if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node) && isMobileMenuOpen) {
                setIsMobileMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isMobileMenuOpen]);

    const handleLogout = () => {
        logout();
        navigate("/login");
        setIsDropdownOpen(false);
    };

    const handleProfile = () => {
        navigate("/profile");
        setIsDropdownOpen(false);
    };

    return (
        <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/20 bg-white/90 backdrop-blur-md shadow-sm">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
                {/* Left - Logo */}
                <div className="flex items-center gap-3">
                    <Link to="/dashboard" className="flex items-center gap-2 group">
                        <h1 className="text-lg font-semibold bg-gradient-to-r from-neutral-800 to-neutral-600 bg-clip-text text-transparent whitespace-nowrap group-hover:scale-105 transition-transform">
                            MicroSaaS.si
                        </h1>
                    </Link>
                </div>



                {/* Right - Actions */}
                <div className="flex items-center gap-2 sm:gap-4">


                    {/* User Dropdown - Desktop */}
                    <div className="hidden md:block relative" ref={dropdownRef}>
                        <button
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            onMouseEnter={() => setIsDropdownOpen(true)}
                            className="flex items-center gap-2 rounded-full hover:bg-black/5 transition-colors p-1"
                        >
                            <div className="h-9 w-9 rounded-full  text-white flex items-center justify-center text-sm font-medium shadow-md">
                                <img src={user?.image || user?.email?.charAt(0).toUpperCase() || "U"} alt="" />
                            </div>
                            <ChevronDown className={`w-4 h-4 text-neutral-500 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`} />
                        </button>

                        {/* Dropdown Menu */}
                        {isDropdownOpen && (
                            <div
                                className="absolute right-0 mt-2 w-56 bg-white/95 backdrop-blur-md rounded-xl shadow-lg border border-white/30 py-1 animate-fade-in-up z-70"
                                onMouseLeave={() => setIsDropdownOpen(false)}
                            >
                                <div className="px-4 py-3 border-b border-gray-100">
                                    <p className="text-sm font-medium text-neutral-800 truncate">{user?.email}</p>
                                    <p className="text-xs text-neutral-500 mt-0.5">Founder</p>
                                </div>
                                <button
                                    onClick={handleProfile}
                                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-neutral-700 hover:bg-neutral-50 transition-colors"
                                >
                                    <User className="w-4 h-4" />
                                    <span>Profile</span>
                                </button>
                                <button
                                    onClick={handleLogout}
                                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                                >
                                    <LogOut className="w-4 h-4" />
                                    <span>Logout</span>
                                </button>
                            </div>
                        )}
                    </div>

                    {/* User Avatar - Mobile (with touch dropdown) */}
                    <div className="md:hidden relative" ref={dropdownRef}>
                        <button
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="flex items-center gap-2 rounded-full hover:bg-black/5 transition-colors p-1"
                        >
                            <div className="h-9 w-9 rounded-full bg-gradient-to-br from-blue-600 to-cyan-600 text-white flex items-center justify-center text-sm font-medium shadow-md">
                                {user?.email?.charAt(0).toUpperCase() || "U"}
                            </div>
                        </button>

                        {/* Mobile Dropdown Menu */}
                        {isDropdownOpen && (
                            <div
                                className="absolute right-0 mt-2 w-64 bg-white/95 backdrop-blur-md rounded-xl shadow-lg border border-white/30 py-1 animate-fade-in-up"
                            >
                                <div className="px-4 py-3 border-b border-gray-100">
                                    <p className="text-sm font-medium text-neutral-800 truncate">{user?.email}</p>
                                    <p className="text-xs text-neutral-500 mt-0.5">Founder</p>
                                </div>
                                <button
                                    onClick={handleProfile}
                                    className="w-full flex items-center gap-3 px-4 py-3 text-sm text-neutral-700 hover:bg-neutral-50 transition-colors"
                                >
                                    <User className="w-4 h-4" />
                                    <span>Profile</span>
                                </button>
                                <button
                                    onClick={handleLogout}
                                    className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors"
                                >
                                    <LogOut className="w-4 h-4" />
                                    <span>Logout</span>
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>



            {/* Mobile Menu - Full Screen Navigation */}
            {isMobileMenuOpen && (
                <div
                    ref={mobileMenuRef}
                    className="md:hidden fixed inset-x-0 top-16 bottom-0 bg-white/95 backdrop-blur-md z-40 animate-slide-down"
                >
                    <div className="flex flex-col p-6 space-y-4">
                        <Link
                            to="/dashboard"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="px-4 py-3 text-neutral-700 hover:bg-neutral-100 rounded-lg transition-colors"
                        >
                            Dashboard
                        </Link>
                        <Link
                            to="/projects"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="px-4 py-3 text-neutral-700 hover:bg-neutral-100 rounded-lg transition-colors"
                        >
                            Projects
                        </Link>
                        <Link
                            to="/community"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="px-4 py-3 text-neutral-700 hover:bg-neutral-100 rounded-lg transition-colors"
                        >
                            Community
                        </Link>
                        <div className="border-t border-gray-100 pt-4 mt-2">
                            <button
                                onClick={() => {
                                    handleProfile();
                                    setIsMobileMenuOpen(false);
                                }}
                                className="w-full flex items-center gap-3 px-4 py-3 text-neutral-700 hover:bg-neutral-100 rounded-lg transition-colors"
                            >
                                <User className="w-5 h-5" />
                                <span>Profile</span>
                            </button>
                            <button
                                onClick={() => {
                                    handleLogout();
                                    setIsMobileMenuOpen(false);
                                }}
                                className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            >
                                <LogOut className="w-5 h-5" />
                                <span>Logout</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}