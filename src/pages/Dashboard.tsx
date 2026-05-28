import React from 'react'
import { currentUser } from '../api/users'
import { useAuth } from '../auth/auth';

export default function Dashboard() {

    const { user, logout } = useAuth();

    return (
        <div>Dashboard
            <div>{user?.email}</div>
            <button onClick={logout}>Logout</button>
        </div>
    )
}
