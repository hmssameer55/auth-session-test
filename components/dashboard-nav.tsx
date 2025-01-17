"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { logout } from "@/lib/auth"

export function DashboardNav() {
    const router = useRouter()

    const handleLogout = async () => {
        await logout()
        router.push("/")
    }

    return (
        <nav className="w-64 bg-white h-full p-4 shadow-md">
            <ul className="space-y-2">
                <li>
                    <Link href="/dashboard" className="block p-2 hover:bg-gray-100 rounded">
                        Dashboard
                    </Link>
                </li>
                <li>
                    <Link href="/dashboard/profile" className="block p-2 hover:bg-gray-100 rounded">
                        Profile
                    </Link>
                </li>
                <li>
                    <Link href="/dashboard/settings" className="block p-2 hover:bg-gray-100 rounded">
                        Settings
                    </Link>
                </li>
            </ul>
            <div className="mt-8">
                <Button onClick={handleLogout} variant="outline" className="w-full">
                    Logout
                </Button>
            </div>
        </nav>
    )
}

