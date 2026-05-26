"use client";

import { useEffect, useState } from "react";

export default function DashboardPage() {

    const [user, setUser] = useState<any>(null);

    useEffect(() => {

        const storedUser = localStorage.getItem("user");

        if (storedUser) {

            setUser(JSON.parse(storedUser));
        }

    }, []);

    return (

        <div className="min-h-screen bg-black flex items-center justify-center text-white">

            <div className="text-center">

                <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-[#8B5CF6] bg-clip-text text-transparent mb-4">
                    Dashboard 🚀
                </h1>

                <p className="text-[#C4B5FD] text-lg">
                    Welcome {user?.full_name}
                </p>

            </div>

        </div>
    );
}