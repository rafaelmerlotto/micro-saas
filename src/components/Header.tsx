import { useTranslation } from "react-i18next";
import { useAuth } from "../auth/auth";

export default function Header() {
    const { user } = useAuth();
    const { t } = useTranslation();


    return (
        <header className="fixed top-0 left-0 right-0 z-50 border-b border-gray-200 bg-white/90 backdrop-blur-sm">

            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">

                {/* Left */}
                <div className="flex items-center gap-3">

                    <h1 className="text-lg font-semibold text-gray-900 whitespace-nowrap">
                        MicroSaaS.si
                    </h1>

                </div>

                {/* Right */}
                <div className="flex items-center gap-3 sm:gap-4">

                    {/* Search */}
                    <div className="hidden md:block">
                        <input
                            type="text"
                            placeholder={t("header.search")}
                            className="w-52 lg:w-64 rounded-lg border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                        />
                    </div>

                    {/* User */}
                    <div className="flex items-center gap-3">

                        {/* Avatar */}
                        <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-full bg-black text-white flex items-center justify-center text-sm font-medium shrink-0">
                            {user?.email?.charAt(0).toUpperCase()}
                        </div>

                        {/* Info */}
                        <div className="hidden sm:block text-sm">

                            <p className="font-medium text-gray-900 max-w-[140px] truncate">
                                {user?.email}
                            </p>

                            <p className="text-gray-500 text-xs">
                                Founder
                            </p>

                        </div>

                    </div>

                </div>

            </div>

        </header>
    );
}