import { BrowserRouter, Navigate, Route, Routes, useNavigate } from "react-router"
import Login from "./pages/Login"
import { useEffect, type JSX } from "react"
import { useAuth } from "./auth/auth"
import Dashboard from "./pages/Dashboard"
import Profile from "./pages/Profile"
import Home from "./pages/Home"
import PrivacyPolicy from "./pages/Privacy"
import TermsOfUse from "./pages/Terms"
import Register from "./pages/Register"


export default function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Register />} />
        <Route path='/privacy' element={<PrivacyPolicy />} />
        <Route path='/terms' element={<TermsOfUse />} />
        <Route path='/dashboard' element={<PrivateRoute><Dashboard /> </PrivateRoute>} />
        <Route path='/profile' element={<PrivateRoute><Profile /> </PrivateRoute>} />
        <Route path="/oauth-success" element={<OAuthSuccess />} />
      </Routes>
    </BrowserRouter>
  )
}

type PrivateRouteProps = {
  children: JSX.Element | any
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};



function OAuthSuccess() {
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    const token = new URLSearchParams(window.location.search).get("token");

    if (!token) return;

    const fetchUser = async () => {
      try {
        localStorage.setItem("token", token);

        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        const user = await res.json();

        login(token, user);

        navigate("/dashboard", { replace: true });
      } catch (err) {
        console.error("Auth error", err);
        navigate("/login");
      }
    };

    fetchUser();
  }, []);

  return <p>Logging in...</p>;
}