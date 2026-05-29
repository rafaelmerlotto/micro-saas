import { useTranslation } from "react-i18next";
import { useAuth } from "../auth/auth";

export default function Header() {
    const { user } = useAuth();
    const { t } = useTranslation();


    return (
        <header className="h-16 border-b border-gray-200 bg-white flex items-center justify-between px-6 fixed top-0 left-0 right-0 z-10">

            {/* Left */}
            <div>
                <h1 className="text-lg font-semibold text-gray-900">
                    
                </h1>
            </div>

            {/* Right */}
            <div className="flex items-center gap-4">

                {/* Search */}
                <input
                    type="text"
                    placeholder={t("header.search")}
                    className="w-64 rounded-lg border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                />

                {/* User */}
                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-black text-white flex items-center justify-center text-sm font-medium">
                        {user?.email?.charAt(0).toUpperCase()}
                    </div>

                    <div className="text-sm">
                        <p className="font-medium text-gray-900">
                            {user?.email}
                        </p>
                        <p className="text-gray-500">
                            Founder
                        </p>
                    </div>
                </div>

            </div>
        </header>
    );
}