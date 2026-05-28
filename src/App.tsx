import { BrowserRouter, Navigate, Route, Routes } from "react-router"
import Login from "./pages/Login"
import type { JSX } from "react"
import { useAuth } from "./auth/auth"
import Dashboard from "./pages/Dashboard"


export default function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/dashboard' element={<PrivateRoute><Dashboard /> </PrivateRoute>} />
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
