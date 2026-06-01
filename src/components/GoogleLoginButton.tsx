// components/GoogleLoginButton.jsx
const GoogleLoginButton = () => {
    const handleGoogleLogin = () => {
        const apiUrl: string = import.meta.env.VITE_API_URL;
        window.location.href = `${apiUrl}/api/v1/users/auth/google_oauth2`;
    };

    return (
        <button onClick={handleGoogleLogin} className="flex items-center justify-center gap-3 px-5 py-2.5 bg-white border border-gray-300 rounded-lg shadow-sm hover:shadow-md hover:bg-gray-50 active:scale-[0.98] transition-all duration-150 font-medium text-gray-700">
            <svg className="w-5 h-5" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path
                    fill="#4285F4"
                    d="M24 9.5c3.54 0 6.7 1.22 9.2 3.6l6.9-6.9C35.82 2.36 30.29 0 24 0 14.62 0 6.46 5.44 2.56 13.34l8.06 6.26C12.3 13.02 17.7 9.5 24 9.5z"
                />
                <path
                    fill="#34A853"
                    d="M46.5 24.5c0-1.64-.15-3.21-.42-4.73H24v9h12.7c-.55 2.95-2.2 5.44-4.7 7.12l7.22 5.62C43.9 37.56 46.5 31.54 46.5 24.5z"
                />
                <path
                    fill="#FBBC05"
                    d="M10.62 28.6a14.5 14.5 0 010-9.2l-8.06-6.26A23.94 23.94 0 000 24c0 3.88.93 7.56 2.56 10.86l8.06-6.26z"
                />
                <path
                    fill="#EA4335"
                    d="M24 48c6.29 0 11.82-2.08 15.76-5.66l-7.22-5.62c-2 1.34-4.57 2.13-8.54 2.13-6.3 0-11.7-3.52-14.38-8.6l-8.06 6.26C6.46 42.56 14.62 48 24 48z"
                />
            </svg>

        </button>
    );
};
export default GoogleLoginButton;


