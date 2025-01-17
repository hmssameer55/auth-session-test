import { redirect } from "next/navigation"
import { getUser } from "@/lib/auth"
import { UserData } from "@/components/user-data"

export default async function DashboardPage() {
    const user = await getUser()
    console.log('user: ', user);

    // if (!user) { 
    //     redirect("/login")
    // }

    return (
        <div className="p-8">
            <h1 className="mb-4 text-2xl font-bold">Welcome to your Dashboard</h1>
            {/* <p>You are logged in as: {user.email}</p>  */}
            <UserData />
        </div>
    )
}

