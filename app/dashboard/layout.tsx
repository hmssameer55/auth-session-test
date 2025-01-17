import { ReactNode } from "react"
import { DashboardNav } from "@/components/dashboard-nav"

export default function DashboardLayout({ children }: { children: ReactNode }) {
    return (
        <div className="flex h-screen bg-gray-100">
            <DashboardNav />
            <main className="flex-1 p-8 overflow-y-auto">{children}</main>
        </div>
    )
}

