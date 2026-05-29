import React, { useState } from 'react'
import { currentUser } from '../api/users'
import { useAuth } from '../auth/auth';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import ProjectCard from '../components/Card';
import Feed from '../components/Feed';

export default function Dashboard() {



    return (
        <div className="min-h-screen bg-gray-50">

            {/* Header */}
            <Header />

            {/* Main Content */}
            <main className="md:max-w-7xl md:mx-auto md:px-6 py-30">
                <div className="rounded-2xl border border-gray-200 bg-white md:p-6">
                    <Feed />
                </div>

            </main>

        </div>
    )
}
