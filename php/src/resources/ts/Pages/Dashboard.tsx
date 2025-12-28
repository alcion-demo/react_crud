import { router, usePage } from '@inertiajs/react'
import AppLayout from '@/Layouts/AppLayout'

type User = {
  name: string
  email: string
}

export default function Dashboard() {
  const page = usePage()
  const auth = (page.props as any).auth

  const logout = () => {
    router.post('/auth/logout')
  }

  return (
    <AppLayout>
      <div className="p-8">
        <h1 className="text-xl mb-4">Dashboard</h1>
        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>
    </AppLayout>
  )
}
