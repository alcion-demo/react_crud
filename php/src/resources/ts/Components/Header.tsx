import { usePage } from '@inertiajs/react'

export default function Header() {
    const { auth } = usePage().props as any

    return (
    <header className="p-4 bg-gray-100 flex justify-between">
        <div>Laravel+Inertia+React+Vite+TypeScript+fotify</div>
        <div>
            {auth?.user ? `Hello, ${auth.user.name}` : 'Guest'}
        </div>
    </header>
  )
}
