import { createContext, useContext, useState, type ReactNode } from "react";
import { destroySession } from "../api/users";
import { set } from "react-hook-form";


interface AuthContextType {
    token: string | null;
    login: (token: string, user: any) => void;
    logout: () => void;
    isAuthenticated: boolean;
    user: any | null;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)


export const AuthProvider = ({ children }: { children: ReactNode }) => {

    const [user, setUser] = useState(() => {
        const saved = localStorage.getItem("user");
        return saved ? JSON.parse(saved) : null;
    });

    const [token, setToken] = useState<string | null | undefined | any>(localStorage.getItem('token'))

    const login = (newToken: string, user: any) => {
        localStorage.setItem('token', newToken);
        localStorage.setItem("user", JSON.stringify(user));

        setUser(user);
        setToken(newToken);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
        destroySession(user.id);
        localStorage.clear();
    };

    const value = { token, login, logout, isAuthenticated: !!token, user };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
