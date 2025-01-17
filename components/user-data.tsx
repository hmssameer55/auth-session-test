"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

export function UserData() {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const fetchData = async () => {
        setLoading(true)
        setError("")
        try {
            const response = await fetch('https://your-backend-api.com/user-data', {
                credentials: 'include', // This ensures the session cookie is sent
            })
            if (response.ok) {
                const result = await response.json()
                setData(result)
            } else {
                setError("Failed to fetch data")
            }
        } catch (err) {
            setError("An error occurred")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="mt-4">
            <Button onClick={fetchData} disabled={loading}>
                {loading ? "Loading..." : "Fetch User Data"}
            </Button>
            {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
            {data && (
                <pre className="mt-2 p-4 bg-gray-100 rounded">
                    {JSON.stringify(data, null, 2)}
                </pre>
            )}
        </div>
    )
}

