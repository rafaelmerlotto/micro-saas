import { Link } from "react-router";

export default function Footer() {
    return (


        <footer className="w-full relative z-10 mt-10">
            <div className="max-w-7xl mx-auto py-6 sm:py-8 px-4 sm:px-6">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
                    <p className="text-neutral-600 text-xs">
                        © 2025 microsaas.si — built for founders & builders 🇸🇮
                    </p>

                    <div className="flex items-center gap-4 sm:gap-6">
                        <Link
                            to="/privacy"
                            className="text-neutral-600 hover:text-neutral-800 text-xs transition-all duration-300 hover:scale-105"
                        >
                            Privacy Policy
                        </Link>
                        <Link
                            to="/terms"
                            className="text-neutral-600 hover:text-neutral-800 text-xs transition-all duration-300 hover:scale-105"
                        >
                            Terms of Use
                        </Link>
                
                    </div>
                </div>
            </div>
        </footer>

    );
}