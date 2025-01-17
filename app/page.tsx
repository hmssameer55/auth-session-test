import { LoginForm } from "@/components/login-form"

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-md w-96">
        <h1 className="mb-6 text-2xl font-bold text-center">Login</h1>
        <LoginForm />
      </div>
    </div>
  )
}

